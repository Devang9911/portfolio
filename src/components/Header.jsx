import './Header.css'

function Header() {
    return (
        <>
            <nav className='navbar'>
                <ul className="nav-list">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#skills">Skills</a></li>
                    <li><a href="">Projects</a></li>
                    <li><a href="">Education</a></li>
                    <li><a href="">Contact</a></li>
                </ul>
            </nav>
        </>
    )
}

export default Header;