import './Education.css';

function Education() {
    return (
        <>
            <div className="educationSection">
                <h1>Education</h1>
                <div className="educationCard">
                    <h2>Higher Education</h2>
                    <p>- Jeevan Bharti Vidhyalaya</p>
                    <p>10th - <span> 73.00% </span> 12th - <span> 77.00% </span></p>
                </div>
                <div className="educationCard">
                    <h2>Bachelor Education</h2>
                    <p>- S.D Jain International College</p>
                    <p>CGPA - 6.37</p>
                </div>
            </div>
        </>
    )
}

export default Education;