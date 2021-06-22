import React from "react";
import Chart from "../charts/Chart";
import Graph from "../charts/Graph";

class StudentView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            studentName: props.match.params.name
        }
    }

    calculateAverageAssignment(studentData, assignment) {
        let average = 0;
        let items = 0;
        studentData.forEach(item => {
            if (item.assignment === assignment) {
                average += ((item.difficult + item.fun) / 2)
                items++;
            }
        })
        return /*Math.round(*/average / items/*)*/
    }

    calculateAverageForOneStudent(studentData) {
        const averageData = studentData.map(studentItem => {
            const average = ((studentItem.difficult + studentItem.fun) / 2)
            return {
                id: studentItem.id,
                name: studentItem.name,
                assignment: studentItem.assignment,
                average: average,
            }
        })
        return averageData
    }

    calculateAverageForAllStudents(studentData) {
        const averageStudentData = []
        let filterItemId = 1
        studentData.forEach(studentItem => {
            const data = averageStudentData.find(filterItem => {
                return studentItem.assignment === filterItem.assignment
            })
            if (data === undefined) {
                const average = this.calculateAverageAssignment(studentData, studentItem.assignment)
                averageStudentData.push({
                    id: filterItemId++,
                    name: 'average',
                    assignment: studentItem.assignment,
                    average: average,
                })
            }
        })
        return averageStudentData
    }

    render() {
        const studentData = this.props.studentData.filter(item => {
            return item.name === this.state.studentName
        })
        const averageDataStudent = this.calculateAverageForOneStudent(studentData)
        const averageDataAll = this.calculateAverageForAllStudents(this.props.studentData)
        return (
            <div className="StudentView">
                <h1>Student: {this.state.studentName}</h1>
                <Chart
                    studentData={studentData}
                />
                <Graph
                    averageStudent={averageDataStudent}
                    averageAll={averageDataAll}
                />
            </div>
        )
    }
}

export default StudentView;