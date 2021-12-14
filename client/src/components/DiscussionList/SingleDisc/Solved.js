import React, {useState} from 'react'
import './Solved.css'
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@material-ui/core';

const Solved = (props) => {
   
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [solved, setsolved] = useState(false);
  const [open, setOpen] = useState(false);
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  let  f=true;

   const submitSolve = () => {
    setsolved(!solved);
    setOpen(true);
     console.log( "SOLVED "+solved + props.auth) ; 
};
console.log(" SOLVED e asi "+ (user?.result.firstName+user?.result.lastName) +"X"+   props.auth );

if ( props.auth != (user?.result.firstName+" "+user?.result.lastName) ){
   f=false;
}

return <>
          <div>
             <div>  

      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Solved Status Toggled."
        action={action}
      />

           { solved && f &&
             <><img  class="rotate" src="/solved.png" height={'80px'} width={'80px'} alt="image"  onClick={ submitSolve}/><b>  solved</b></>
            }

           { !solved && f &&
            <><img class="rotate"src="/question.png" height={'80px'} width={'80px'} alt="iqmage"  onClick={ submitSolve} /><b>  unsolved</b></> }
        </div>
        </div>

        </>
    
}

export default Solved
