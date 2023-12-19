import { useEffect,useState } from "react";
import {useParams} from "react-router-dom";
import { Card,Typography, TextField, Button } from "@mui/material";
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
        
        <div>
            <CourseCard course={course}></CourseCard>
            <UpdateCard course={course}></UpdateCard>
        </div>
)
}
function UpdateCard(props){
    const [title,setTitle]=useState('')
    const [description,setDescription]=useState('')
    const [image,setImage]=useState('')
    const course = props.course;
    
    
    return(
        <div>
                    <Card varient={'outlined'} >

                  <TextField id="outlined-basic" label="Title" variant="outlined" fullWidth={true}
                  onChange={(e)=>{
                    setTitle(e.target.value);
                  }}/>
                  <br /><br />
                  <TextField id="outlined-basic" label="Description" variant="outlined"  fullWidth={true}
                  onChange={(e)=>{
                    setDescription(e.target.value);
                  }}/>
                  <TextField id="outlined-basic" label="Image Link" variant="outlined"  fullWidth={true}
                  onChange={(e)=>{
                    setImage(e.target.value);
                  }}/>
                  <Button variant="contained"
        onClick={()=>{
             fetch("http://localhost:3000/admin/courses/"+course._id,{
                method:"PUT",
                body: JSON.stringify({
                    title,
                    description,
                    imageLink:image,
                    published: true
                }),
                headers:{
                    "Content-type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("token")
                }
            }).then((res)=>{
                return res.json()
            }).then((data)=>{
                // localStorage.setItem("token", data.token);
                // console.log(data);
                alert('course updated');
            })
        }}>Update Course</Button>
                    </Card>
        </div>)
}
function CourseCard(props){
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
export default Course;