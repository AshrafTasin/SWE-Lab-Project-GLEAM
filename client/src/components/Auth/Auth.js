import React, {useState,useEffect} from 'react'
import { Avatar,Button,Grid,Paper,Typography,Container, Icon } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOpenOutlined"
import CssBaseline from '@material-ui/core/CssBaseline';
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux"; 
import { useHistory,Link } from 'react-router-dom';
import { signin,signup } from '../../actions/auth';
import Input from "./Input";
// import icon from "./Icon"

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
    const [isSignUp,setIsSignUp] = useState(false);
    const [formData,setFormData] = useState(initialState);

    const dispatch = useDispatch();
    const history = useHistory(); 

    const handleShowPassword =() => setShowPassword((prevShowPassword) => !prevShowPassword);

    const handleSubmit =(event) => {
        event.preventDefault(); 
        if(isSignUp){
            dispatch(signup(formData,history));  
              
        }else{
            dispatch(signin(formData,history));
        }
    };

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
        setShowPassword(false); 
    };

    return (
            <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
              {isSignUp ? "Sign Up" : "Sign In"}
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {
                isSignUp && (
                    <>
                        <Input name="firstname" label="First Name" handleChange={(e) => setFormData({ ...formData,firstName: e.target.value})} autoFocus half />
                        <Input name="lastname" label="Last Name" handleChange={(e) => setFormData({ ...formData,lastName: e.target.value})} half />
                    </>
                         )
            }
            <Input name="email" label="Email Address" handleChange={(e) => setFormData({ ...formData,email: e.target.value})} type="email"/>
            <Input name="password" label="Password" handleChange={(e) => setFormData({ ...formData,password: e.target.value})} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />

            {
                isSignUp && 
                <Input name="confirmPassword" label="Confirm Password" handleChange={(e) => setFormData({ ...formData,confirmPassword: e.target.value})} type="password" />
            }
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>
            <Grid container>
            <Grid item xs>
              <Link to="/reset-password" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2" onClick={switchMode}>
              {isSignUp ? "Already have an account ? Sign In" : "Need an account ? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          </form>
        </div>
      </Container>
    );
}

export default Auth
