import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card'
import { useState } from 'react';
function Signup(){
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('')
    return (
    <div >
        <div style={{
                paddingTop: 140
            }}>
        <Card varient={'outlined'} >
        <center>
            
            Welcome to Coursera
        <br /><br /><br />
        <TextField  label="Username" variant="outlined" fullWidth={true}
        onChange={(e)=>{setEmail(e.target.value)}}/>
        <br/><br />
        <TextField  label="Password" variant="outlined" type='password' fullWidth={true}
        onChange={(e)=>{setPassword(e.target.value)}}/>
        <br /> <br /> <br />
        <Button variant="contained"
        onClick={()=>{
             fetch("http://localhost:3000/admin/signup",{
                method:"POST",
                body: JSON.stringify({
                    username:email,password:password
                }),
                headers:{
                    "Content-type":"application/json"
                }
            }).then((res)=>{
                return res.json()
            }).then((data)=>{
                localStorage.setItem("token", data.token);
                console.log(data);
            })
        }}>Sign up</Button>
        
        </center>
        
        </Card>
        </div>
    </div>
    
    )
}
export default Signup;