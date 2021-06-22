import React from "react";
import Overview from "./components/view/Overview";
import StudentsPage from "./components/view/StudentsView";
import StudentPage from "./components/view/StudentView";
import StudentData from "./data/StudentData";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


const filterOnWeek = (studentData, filter) => {
  return studentData.filter(item => {
    return item.assignment.includes(filter)
  })
}

const filterStudents = (studentData) => {
  const students = []
  studentData.forEach(item => {
    if (!students.includes(item.name)) {
      students.push(item.name)
    }
  })
  return students
}

function Container() {
  const studentData = filterOnWeek(StudentData, 'W1')
  const students = filterStudents(StudentData)
  return (
    <Router>
      <header className="App-header">
        <h5>Student</h5>
        <h1>Dashboard</h1>
      </header>
      <nav className="nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Students">Studenten</Link>
          </li>
        </ul>
      </nav>
      <main>
        <Switch>
          <Route
            path="/Students/Student/:name"
            render={(props) => <StudentPage {...props} studentData={studentData} />}
          />
          <Route path="/Students/">
            <StudentsPage students={students} />
          </Route>
          <Route path="/">
            <Overview
              studentData={studentData}
              students={students}
            />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default Container;