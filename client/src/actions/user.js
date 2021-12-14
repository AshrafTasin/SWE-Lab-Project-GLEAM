import * as api from '../api/index';

export const updateuser = (updatedInfo,id) => async(dispatch) => {
    try {
        console.log("DI");
        const { data } = await api.updateUser(updatedInfo,id);
        console.log("ID");
        dispatch({type: "UPDATE",payload:data});

    } catch (error) {
        console.log(error);
    }
}