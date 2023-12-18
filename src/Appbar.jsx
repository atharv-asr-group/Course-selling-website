import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
function Appbar(){
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