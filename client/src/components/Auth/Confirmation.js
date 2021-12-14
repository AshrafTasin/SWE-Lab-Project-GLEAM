import React from 'react';
import {Grid} from '@material-ui/core';

import './Confirmation.css'

const Confirmation = () => {
    return (
       <Grid container>
           <Grid item lg={12} id="confirm">
                <h1>Email Sent!</h1>
                <p>Please Check Your Inbox</p>
           </Grid>
       </Grid>
    )
}

export default Confirmation;
