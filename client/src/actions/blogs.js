import * as api from '../api';


export const getBlogs = () => async (dispatch) => {
    try {
        const {data} = await api.fetchBlogs();
        dispatch({type: 'FETCH_ALL',payload: data})
        
    } catch (error) {
        console.log(error.message);
    }
}

export const getUserBlogs = (id) => async (dispatch) => {
    try {
        const {data} = await api.fetchUserBlogs(id);
        dispatch({type: 'FETCH_ALL',payload: data});
         
    } catch (error) {
        console.log(error.message);
    }
}


export const createBlog = (blog) => async (dispatch) => {
    try {
        const {data} = await api.createBlog(blog);
        dispatch({type:'CREATE',payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteBlog = (id) => async(dispatch) => {
    try {
        await api.deleteBlog(id);
        dispatch({type:'DELETE',payload: id});
      } catch (error) {
        console.log(error.message);
      }
}

export const likeBlog = (id) => async(dispatch) => {
    try {
        const {data} = await api.likeBlog(id);
        dispatch({type:'LIKE',payload: data});
    } catch (error) {
        console.log(error.message);
    }
}

export const removeLike = (id) => async(dispatch) => {
    try {
        const {data} = await api.likeBlog(id);
        dispatch({type:'REMOVE_LIKE',payload: data});
    } catch (error) {
        console.log(error.message);
    }
}