import './Main.css'
import RubikThree from './RubikThree';

function Main(){
    return (
        <>
            <section id="home" className="home-section stars">
                <div className="left">
                    <h1>hello!</h1>
                    <h1>i am <span>devang</span></h1>
                    <p>❮ FRONT-END DEVELOPER /❯</p>
                </div>
                <div className="right">
                    <RubikThree/>
                </div>

            </section>
        </>
    )
}

export default Main;