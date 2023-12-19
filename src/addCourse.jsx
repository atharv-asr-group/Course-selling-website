import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card'
import { useState } from 'react';
function AddCourse(){
    const [title,setTitle]=useState('')
    const [description,setDescription]=useState('')
    const [image,setImage]=useState('')
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
             fetch("http://localhost:3000/admin/courses",{
                method:"POST",
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
                alert('course added')
            })
        }}>Add Course</Button>
                    </Card>
        </div>
    )
}
export default AddCourse;