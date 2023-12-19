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
                // console.log(data);
            })
        })
        
    },[])
    let course=null;
    for(let i=0;i<courses.length;i++){
        // console.log(courses[i]._id)
        
        if(courses[i]._id==courseId){
            // console.log("in here")
            course=courses[i]
        }
    }
    if(!course){
        return <>
        {/* {course.id} */}
        No Course available with the ID.
        </>
    }
    return ( 
        
        <div>
            {/* {courses[0]._id} */}
            <CourseCard course={course}></CourseCard>
            
            <UpdateCard course={course} setCourses={setCourses} courses={courses}></UpdateCard>
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
                let updatedCourses=[];
                for(let i=0;i<props.courses.length;i++){
                    // {props.courses[0].id}
                    // console.log(props.courses[i]._id)
                    // console.log(course._id)
                    // {props.courses[i]._id}
                    if(props.courses[i]._id==course._id){
                        console.log(typeof(course._id))
                        updatedCourses.push({
                            _id:course._id,
                            title:title,
                            description:description,
                            imageLink: image
                        })  
                        // console.log(course._id)
                        // console.log(updatedCourses[i]._id)
                    }
                    else{
                        updatedCourses.push(props.courses[i])
                    }
                }
                // console.log(updatedCourses[0]._id)
                props.setCourses(updatedCourses);
                // alert('course updated');
            })
        }}>Update Course</Button>
                    </Card>
        </div>)
}
function CourseCard(props){
    return ( 
        <div style={{display:"flex", justifyContent:"center"}}>
        <Card style={{
            minHeight:200,
            width: 300,
            margin:10

        }}>
            <Typography textAlign={"center"} variant="h3">{props.course.title}</Typography>
        <Typography textAlign={"center"}>{props.course.description}</Typography>
        <img src={props.course.imageLink} alt="" style={{width:300}}/>
        </Card>
        </div>
)
}
export default Course;