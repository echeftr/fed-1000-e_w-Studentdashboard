import React from "react";
import Chart from "../charts/Chart";
import SelectStudents from "../inputSelect/SelectStudents";

class Overview extends React.Component {
    constructor(props) {
        super(props)

        const students = props.students.map(item => {
            return {
                name: item,
                state: true
            }
        })

        this.state = {
            students: students
        }

        this.handleStudentsChange = this.handleStudentsChange.bind(this)
    }

    handleStudentsChange(name, state) {
        this.setState(prevState => {
            const students = prevState.students.map(item => {
                if (item.name === name) {
                    return {
                        name: item.name,
                        state: state
                    }
                }
                return item
            })
            return {
                students: students
            }
        })
    }

    calculateAverageDifficult(studentData, assignment) {
        let average = 0;
        let items = 0;
        studentData.forEach(item => {
            if (item.assignment === assignment) {
                average += item.difficult
                items++;
            }
        })
        return /*Math.round(*/average / items/*)*/
    }

    calculateAverageFun(studentData, assignment) {
        let average = 0;
        let items = 0;
        studentData.forEach(item => {
            if (item.assignment === assignment) {
                average += item.fun
                items++;
            }
        })
        return /*Math.round(*/average / items/*)*/
    }

    averageStudentData(studentData) {
        const averageStudentData = []
        let filterItemId = 1
        studentData.forEach(studentItem => {
            const data = averageStudentData.find(filterItem => {
                return studentItem.assignment === filterItem.assignment
            })
            if (data === undefined) {
                const averageDifficult = this.calculateAverageDifficult(studentData, studentItem.assignment)
                const averageFun = this.calculateAverageFun(studentData, studentItem.assignment)
                averageStudentData.push({
                    id: filterItemId++,
                    name: 'average',
                    assignment: studentItem.assignment,
                    difficult: averageDifficult,
                    fun: averageFun
                })
            }
        })
        return averageStudentData
    }

    filteredStudentsData() {
        const filteredStudentsData = this.props.studentData.filter(studentDataItem => {
            const student = this.state.students.find(studentItem => {
                return studentItem.name === studentDataItem.name
            })
            return (student !== undefined && student.state === true)
        })
        return filteredStudentsData
    }

    render() {
        const filteredStudentsData = this.filteredStudentsData(this.props.studentData)
        const averageStudentData = this.averageStudentData(filteredStudentsData)
        return (
            <div className="Overview">
                <h1>Dashboard Overview User-story:</h1>
                <SelectStudents
                    students={this.props.students}
                    studentsChange={this.handleStudentsChange}
                />
                <Chart
                    studentData={averageStudentData}
                />
            </div>
        )
    }
}

export default Overview;