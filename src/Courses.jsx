import { useState, useEffect } from "react";
function Courses(){
    const [courses,setCourses]=useState([]);
    useEffect(()=>{
        fetch('http://localhost:3000/admin/courses/',
        {method:"GET",
        headers:{
            "Authorization":  "Bearer "+ localStorage.getItem('token')
        }}
        ).then((res)=>{
            res.json().then((data)=>{
                setCourses(data);
                console.log(data);
            })
        })
        
    },[])
    return (
        <div>
            COURSES
            {JSON.stringify(courses)}
        </div>
    )
}



export default Courses;