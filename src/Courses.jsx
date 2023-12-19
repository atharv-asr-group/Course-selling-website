import { useState, useEffect } from "react";
import { Card, Typography } from "@mui/material";
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
                setCourses(data.courses);
                console.log(data);
            })
        })
        
    },[])
    return (
        <div style={{display:'flex', flexWrap:'wrap',justifyContent:'center'}}>
            {/* COURSES */}
            {/* {JSON.stringify(courses)} */}
            {courses.map(course=>{
                return <Course course={course}/>
            })}
        </div>
    )
}

function Course(props){
    return ( 
        
            <Card style={{
                minHeight:200,
                width: 300,
                margin:10

            }}>
                <Typography textAlign={"center"} variant="h3">{props.course.title}</Typography>
            <Typography textAlign={"center"}>{props.course.description}</Typography>
            <img src={props.course.imageLink} alt="" style={{width:300}}/>
            </Card>
       
    )
}


export default Courses;