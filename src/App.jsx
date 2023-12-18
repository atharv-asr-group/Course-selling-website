import { useState } from 'react'
import Signup from './signup.jsx'
import './App.css'
import Signin from './signin.jsx'
import Appbar from './Appbar.jsx'
import AddCourse from './addCourse.jsx'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {

  return (
    <div style={{width:"100vw", height: "100vh", backgroundColor:"#eeeeee"}}>
      <Appbar/>
      <Router>
        <Routes>
          <Route path="/addcourse" element={<AddCourse/>}></Route>
          <Route path="/login" element={<Signin/>}/>
          <Route path="/signup" element={<Signup/>}/>

        </Routes>
      </Router>
      {/* <Signup/> */}
      {/* <Signin/> */}
    </div>
  )
}

export default App
