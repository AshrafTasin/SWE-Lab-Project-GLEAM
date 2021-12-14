import React from 'react';
import Disc from './Discussion/Discussion.js';
import {Grid,CircularProgress} from '@material-ui/core';
import { useSelector } from 'react-redux';

const DiscussionList = () => {
    
    const discussionList= useSelector((state) => state.discussion  );
    return (
        !discussionList.length ?<CircularProgress size={40}
        left={-20}
        top={10}
        status={'loading'}
        style={{marginLeft: '50%',marginTop:'20%'}} /> :(
            <Grid container direction="coloumn">
                {discussionList.map((disc)=>(
                    <Grid key={disc._id} item xs={12} sm={12}>
                        <Disc disc={disc}/>  
                    </Grid>
                ))}
            </Grid>
        )
    );
}

export default DiscussionList;
