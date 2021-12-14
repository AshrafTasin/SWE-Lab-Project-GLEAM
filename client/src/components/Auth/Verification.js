import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar,Button,Typography,Container,Grid } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from "@material-ui/icons/LockOpenOutlined"
import CssBaseline from '@material-ui/core/CssBaseline';
import { useDispatch } from "react-redux"; 
import { useHistory,useLocation } from 'react-router-dom';
import { verification } from '../../actions/auth';
import Input from "./Input";

import useStyles from './styles';   

const Verification = () => {
    
    const classes = useStyles();
    const [otpValue,setOtpValue] = useState('');
    const dispatch = useDispatch();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const history = useHistory();
    const location = useLocation(); 

    useEffect(() => {
        const token = user?.token;
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location])

    const handleSubmit = (event) =>{
        event.preventDefault();
        setUser(JSON.parse(localStorage.getItem('profile')));
        console.log(otpValue); 
        const data={userID:user.result._id,otp:otpValue};
        console.log(data);

        dispatch(verification(data,history));
    }

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
            <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Enter Verification Code 
          </Typography>
          <Grid>
              <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit}>
          
            <TextField id="outlined-basic" name="code" label="4 Digit Code" variant="outlined"
            onChange={(e) => setOtpValue(e.target.value)}  />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >Submit</Button>
            </form>
            </Grid>
        </div>
      </Container>
    )
}

export default Verification;