import { useEffect,useState } from "react";
import {useParams} from "react-router-dom";
import { Card,Typography, TextField, Button } from "@mui/material";
import { atom,useSetRecoilState,useRecoilState,useRecoilValue } from "recoil";
// import Typography from "@mui/material";
function Course(){
    let {courseId}=useParams();
    // const [courses,setCourses]=useState([]);
    const setCourses=useSetRecoilState(coursesState);

    useEffect(()=>{
        fetch('http://localhost:3000/admin/courses/',
        {method:"GET",
        headers:{
            "Authorization":  "Bearer "+ localStorage.getItem('token')
        }}
        ).then((res)=>{
            res.json().then((data)=>{
                setCourses(data.courses);
                
            })
        })
        
    },[])
    
    
    return ( 
        
        <div>
            {/* {courses[0]._id} */}
            <CourseCard courseId={courseId}></CourseCard>
            
            <UpdateCard courseId={courseId}></UpdateCard>
        </div>
)
}
function UpdateCard(props){
    const [title,setTitle]=useState('')
    const [description,setDescription]=useState('')
    const [image,setImage]=useState('')
    const [courses,setCourses]=useRecoilState(coursesState)
    // const course = props.course;
    
    
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
             fetch("http://localhost:3000/admin/courses/"+props.courseId,{
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
                
                let updatedCourses=[];
                for(let i=0;i<courses.length;i++){
                    if(courses[i]._id==props.courseId){
                        updatedCourses.push({
                            _id:props.courseId,
                            title:title,
                            description:description,
                            imageLink: image
                        })  
                         }
                    else{
                        updatedCourses.push(courses[i])
                    }
                }
                 setCourses(updatedCourses);
                // alert('course updated');
            })
        }}>Update Course</Button>
                    </Card>
        </div>)
}
function CourseCard(props){
    const courses=useRecoilValue(coursesState)
    let course=null;
    for(let i=0;i<courses.length;i++){
       
        if(courses[i]._id==props.courseId){
            
            course=courses[i]
        }
    }
    if(!course){
        return (
            <>
             No course with ID.
            </>
        )
    }
    return ( 
        <div style={{display:"flex", justifyContent:"center"}}>
        <Card style={{
            minHeight:200,
            width: 300,
            margin:10

        }}>
            <Typography textAlign={"center"} variant="h3">{course.title}</Typography>
        <Typography textAlign={"center"}>{course.description}</Typography>
        <img src={course.imageLink} alt="" style={{width:300}}/>
        </Card>
        </div>
)
}

export default Course;
const coursesState=atom({
    key:'coursesState',
    default:'',
})