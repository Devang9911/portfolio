import './Skills.css'

const cardData = [
    {
        svgLink: "/svg/html.svg",
        name: "HTML"
    },
    {
        svgLink: "/svg/css.svg",
        name: "CSS"
    },
    {
        svgLink: "/svg/bootstrap.svg",
        name: "BOOTSTRAP"
    },
    {
        svgLink: "/svg/js.svg",
        name: "JAVASCRIPT"
    },
    {
        svgLink: "/svg/react.svg",
        name: "REACT.JS"
    },
    {
        svgLink: "/svg/tailwind.svg",
        name: "TAILWIND CSS"
    },
    {
        svgLink: "/svg/python.svg",
        name: "PYTHON"
    },
    {
        svgLink: "/svg/git.svg",
        name: "GIT"
    }
]


function Skills() {
    return (
        <>
            <section id='skills' className='skills-section'>
                <h1>Skills</h1>
                <div className="cardContainer" id='cardContainer'>
                    {
                        cardData.map((card, index) => (
                            <div className="card" key={index}>
                                <img src={card.svgLink} alt={card.name} />
                                <h3>{card.name}</h3>
                            </div>
                        ))
                    }
                </div>
            </section>
        </>
    )

}

export default Skills;