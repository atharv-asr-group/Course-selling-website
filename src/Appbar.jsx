import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { useEffect,useState } from 'react';
function Appbar(){
    const [userEmail, setUserEmail]=useState(null);
    const [isLoading,setIsLoading]=useState(true)
    function callback2(data){
        if(data.username){
            setUserEmail(data.username)
            setIsLoading(false)
        }
        // console.log(data);
    }
    function callback1(res){
        res.json().then(callback2)
    }
    useEffect(()=>{
        fetch('http://localhost:3000/admin/me',{
            headers:{
                'Authorization': 'Bearer '+localStorage.getItem("token")
            }
        }).then(callback1);
    },[])
    if(isLoading){
        return(
            <div></div>
        )
    }

    if(userEmail){
        return(
            <div style={{display: "flex",
            justifyContent:"space-between"}}>
                <div><Typography>Coursera</Typography></div>
                <div style={{margin:10}}>
                    {userEmail}
                <Button variant='contained'
                    onClick={()=>{
                        localStorage.setItem('token', null);
                        window.location='/signup'
                    }
                }
                >Logout</Button>
                
            </div>
            </div>
        )
    }

    return(
        <div style={{display: "flex",
        justifyContent:"space-between"}}>
            <div><Typography>Coursera</Typography></div>
            <div style={{margin:10}}>
            <Button variant='contained'
                onClick={()=>window.location="/login"
            }
            >Signin</Button>
            <Button variant='contained'
            onClick={()=>window.location="/signup"}
            >Signup</Button>
        </div>
        </div>
    )
}
export default Appbar;