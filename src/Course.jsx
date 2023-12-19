import { useEffect,useState } from "react";
import {useParams} from "react-router-dom";
import { Card,Typography } from "@mui/material";
// import Typography from "@mui/material";
function Course(){
    let {courseId}=useParams();
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
    let course;
    for(let i=0;i<courses.length;i++){
        if(courses[i]._id==courseId){
            course=courses[i]
        }
    }
    if(!course){
        return <>
        No Course available with the ID.
        </>
    }
    return ( 
        
        <Card style={{
            minHeight:200,
            width: 300,
            margin:10

        }}>
            <Typography textAlign={"center"} variant="h3">{course.title}</Typography>
        <Typography textAlign={"center"}>{course.description}</Typography>
        <img src={course.imageLink} alt="" style={{width:300}}/>
        </Card>
   
)
}
export default Course;