import * as api from '../api';

export const fetchADiscussion = (id) => async (dispatch) => {
    try {
        const {data} = await api.fetchADiscussion(id);
        dispatch({type: 'FETCH_SINGLE_DISCUSSION',payload: data});
   } 
    catch (error) {console.log(error.message);}
}
export const getDisc = () => async (dispatch) => {
    try {
        const {data} = await api.fetchDiscList();
        dispatch({type: 'FETCH_ALL_DISCUSSION',payload: data})
    } catch (error) {
        console.log(error.message);
    }
}

export const createDisc = (disc) => async (dispatch) => {
    try {
        const data = await api.createDisc(disc);
        dispatch({type:'CREATE_DISCUSSION',payload: data});
    } catch (error) {
        
    }
}

export const deleteDisc = (id) => async(dispatch) => {
    try {
        await api.deleteDisc(id);
        dispatch({type:'DELETE_DISCUSSION',payload: id});
      } catch (error) {
        console.log(error.message);
      }
}

export const updateDisc = (disc) => async (dispatch) => {
    try {
      const data = await api.updateDisc(disc);
      dispatch({ type: 'UPDATE_DISCUSSION', payload: data });
    } catch (error) {
      console.log(error);
    }
  };


export const updateUpVoteDisc= (disc)=> async (dispatch) => {
    try {
      const data = await api.updateUpVoteDisc(disc);
      dispatch({ type: 'UPDATE_DISCUSSION', payload: data });
    } catch (error) {
      console.log(error);
    }
}