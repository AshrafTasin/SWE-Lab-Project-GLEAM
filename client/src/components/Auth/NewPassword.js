import React, {useState,useEffect} from 'react'
import { Avatar,Button,Grid,Paper,Typography,Container, Icon } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOpenOutlined"
import CssBaseline from '@material-ui/core/CssBaseline';
import { useDispatch } from "react-redux"; 
import { useHistory,Link } from 'react-router-dom';
import { signin,signup } from '../../actions/auth';
import Input from "./Input";

import useStyles from './styles';   

const initialState ={firstName: '', lastName: '', email: '', password: '', confirmPassword: ''};

const Auth = () => {


    useEffect(()=>{
        if(localStorage.getItem('profile')){
            history.push('/');
        }
    })

    const classes = useStyles();       
    const [showPassword,setShowPassword] = useState(false);
    const [formData,setFormData] = useState(initialState);

    const dispatch = useDispatch();
    const history = useHistory(); 

    const handleShowPassword =() => setShowPassword((prevShowPassword) => !prevShowPassword);

    const handleSubmit =(event) => {
        event.preventDefault(); 
    };

    return (
            <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            
            <Input name="newPassword" label="New Password" handleChange={(e) => setFormData({ ...formData,email: e.target.value})} type={showPassword ? "text" : "password"}/>
            <Input name="confirmPassword" label="Confirm Password" handleChange={(e) => setFormData({ ...formData,password: e.target.value})} handleShowPassword={handleShowPassword} />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
             Submit
            </Button>
          </form>
        </div>
      </Container>
    );
}

export default Auth;
