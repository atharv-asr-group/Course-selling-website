import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card'
function Signin(){
    return (
        <div >
        <div style={{
                paddingTop: 140
            }}>
        <Card varient={'outlined'} >
        <center>
            
            Welcome to Coursera
        <br /><br /><br />
        <TextField id="outlined-basic" label="Username" variant="outlined" fullWidth={true}/>
        <br/><br />
        <TextField id="outlined-basic" label="Password" variant="outlined" type='password' fullWidth={true}/>
        <br /> <br /> <br />
        <Button variant="contained">Sign in</Button>
        </center>
        
        </Card>
        </div>
    </div>
    )
}
export default Signin;