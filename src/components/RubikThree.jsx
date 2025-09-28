import React, { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Environment, Html } from '@react-three/drei';
import * as THREE from 'three';
import { TextureLoader } from 'three';

const ICON_PATHS = [
    '/svg/bootstrap.svg',
    '/svg/css.svg',
    '/svg/db.svg',
    '/svg/git.svg',
    '/svg/html.svg',
    '/svg/js.svg',
    '/svg/node.svg',
    '/svg/python.svg',
    '/svg/react.svg',
    '/svg/tailwind.svg',
    '/svg/vs.svg'
];

// ✅ Reusable hook for media query
function useMediaQuery(query) {
    const [matches, setMatches] = React.useState(() =>
        typeof window !== "undefined" ? window.matchMedia(query).matches : false
    );

    React.useEffect(() => {
        const media = window.matchMedia(query);
        const listener = () => setMatches(media.matches);
        media.addEventListener("change", listener);
        return () => media.removeEventListener("change", listener);
    }, [query]);

    return matches;
}

function useIconTextures() {
    const textures = useLoader(TextureLoader, ICON_PATHS);
    textures.forEach((t) => {
        t.minFilter = THREE.LinearMipMapLinearFilter;
        t.magFilter = THREE.LinearFilter;
        t.colorSpace = THREE.SRGBColorSpace;
        t.needsUpdate = true;
    });
    return textures;
}

function Cubie({ position, textures, idx, stickerSize = 0.86 }) {
    const [x, y, z] = position;
    const boxSize = 0.98;

    const faces = [
        { dir: [1, 0, 0], rot: [0, Math.PI / 2, 0] },
        { dir: [-1, 0, 0], rot: [0, -Math.PI / 2, 0] },
        { dir: [0, 1, 0], rot: [-Math.PI / 2, 0, 0] },
        { dir: [0, -1, 0], rot: [Math.PI / 2, 0, 0] },
        { dir: [0, 0, 1], rot: [0, 0, 0] },
        { dir: [0, 0, -1], rot: [0, Math.PI, 0] },
    ];

    return (
        <group position={[x, y, z]}>
            <mesh>
                <boxGeometry args={[boxSize, boxSize, boxSize]} />
                <meshPhysicalMaterial
                    color={'#111'}
                    metalness={0.6}
                    roughness={0.3}
                    clearcoat={0.9}
                    clearcoatRoughness={0.1}
                />
            </mesh>

            {faces.map((f, faceIndex) => {
                const [dx, dy, dz] = f.dir;
                const isOuter =
                    (dx !== 0 && Math.abs(x) === 1) ||
                    (dy !== 0 && Math.abs(y) === 1) ||
                    (dz !== 0 && Math.abs(z) === 1);
                if (!isOuter) return null;

                const tex = textures[(idx + faceIndex) % textures.length];
                return (
                    <mesh
                        key={faceIndex}
                        position={[
                            dx * (boxSize / 2 + 0.001),
                            dy * (boxSize / 2 + 0.001),
                            dz * (boxSize / 2 + 0.001),
                        ]}
                        rotation={f.rot}
                    >
                        <planeGeometry args={[stickerSize, stickerSize]} />
                        <meshPhysicalMaterial
                            map={tex}
                            transparent
                            side={THREE.DoubleSide}
                            metalness={0.8}
                            roughness={0.15}
                            clearcoat={1}
                            clearcoatRoughness={0}
                        />
                    </mesh>
                );
            })}
        </group>
    );
}

function RubikGroup({ textures }) {
    const groupRef = useRef();

    const coords = [-1, 0, 1];
    const cubies = useMemo(() => {
        const arr = [];
        let id = 0;
        for (let xi = 0; xi < coords.length; xi++) {
            for (let yi = 0; yi < coords.length; yi++) {
                for (let zi = 0; zi < coords.length; zi++) {
                    arr.push({ pos: [coords[xi], coords[yi], coords[zi]], id: id++ });
                }
            }
        }
        return arr;
    }, []);

    useFrame((state, delta) => {
        const g = groupRef.current;
        if (!g) return;
        g.rotation.y += delta * 0.25;
        g.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.08;
    });

    return (
        <group ref={groupRef}>
            {cubies.map((c) => (
                <Cubie key={c.id} position={c.pos} textures={textures} idx={c.id} />
            ))}
        </group>
    );
}

function Scene() {
    const textures = useIconTextures();
    return (
        <>
            <RubikGroup textures={textures} />
            <Environment background={false} preset="city" />
        </>
    );
}

export default function RubikThree({ size = 650 }) {
    // ✅ Responsive breakpoints
    const isMobileSmall = useMediaQuery('(max-width: 480px)');
    const isTablet = useMediaQuery('(max-width: 768px)');
    const isLaptop = useMediaQuery('(max-width: 1024px)');

    let finalSize = size;
    if (isMobileSmall) {
        finalSize = 490;
    } else if (isTablet) {
        finalSize = 550;
    } else if (isLaptop) {
        finalSize = 650;
    }

    const canvasStyle = { width: finalSize, height: finalSize };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Canvas style={canvasStyle} camera={{ position: [4, 4, 6], fov: 50 }}>
                <ambientLight intensity={0.6} />
                <directionalLight
                    position={[5, 10, 7]}
                    intensity={0.9}
                    castShadow
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                />
                <pointLight position={[-6, -3, -6]} intensity={0.5} />

                <Suspense fallback={<Html center>Loading textures...</Html>}>
                    <Scene />
                </Suspense>

                {/* ✅ OrbitControls only for desktop/laptop */}
                {!isTablet && !isMobileSmall && (
                    <OrbitControls enablePan={false} enableZoom={false} />
                )}
            </Canvas>
        </div>
    );
}
