import React from "react";
import { Link } from "react-router-dom";

const StudentsView = (props) => {
    const studentLinks = props.students.map(item => {
        const studentLink = "/Students/Student/" + item
        return (
            <li key={item}>
                <Link to={studentLink}>{item}</Link>
            </li>
        )
    })
    return (
        <div className="StudentsView">
            <h1>Dashboard Overview Student-story:</h1>
            <div className="StudentsListBlock">
                <ul className="StudentsViewList">
                    <h3>Kies student voor overview</h3>
                    {studentLinks}
                </ul>
            </div>
        </div>
    )
}

export default StudentsView;