import axios from 'axios';

const API = axios.create({baseURL : "http://localhost:5000"});

API.interceptors.request.use( (req) => {
    
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;

});


export const fetchBlogs = () => API.get('/blogs/getBlog');
export const fetchUserBlogs = (id) => API.get(`/blogs/user/${id}`);
export const createBlog = (newBlog) => API.post('/blogs/createBlog',newBlog);
export const fetchSingleBlog = (id) => API.get('/blogs/'+id);
export const upload = (data) => API.post('/blogs/upload',data);
export const deleteBlog = (id) => API.delete(`/blogs/${id}`)
export const updateBlog = (blog) => API.put(`/blogs/${blog._id}`, blog);
export const likeBlog = (id) => API.patch(`/blogs/${id}/likeBlog`);
export const removeLike = (id) => API.patch(`/blogs/${id}/likeBlog`);

export const signIn = (formData) => API.post('/users/signin',formData);
export const signUp = (formData) => API.post('/users/signup',formData);
export const updateUser = (updatedInfo) => API.put('/users/'+updatedInfo.id,updatedInfo);
export const verifyUser = (userData) => API.post('/users/verify-email',userData);

export const fetchDiscList = () => API.get('/discussion/getDisc');
export const createDisc = (newDisc) => API.post('/discussion/createDisc',newDisc);
export const fetchADiscussion = (id) => API.get('/discussion/'+id);
export const uploadDisc = (data) => API.post('/discussion/upload',data);
export const deleteDisc = (id) => API.delete(`/discussion/${id}`)
export const updateDisc = (disc) => API.put(`/discussion/${disc._id}`, disc);
export const updateUpVoteDisc = (disc) => API.put(`/discussion/update/${disc._id}`, disc);
export const createComment = (newComm) => API.post('/comment/saveComment',newComm);
export const getComments = () => API.get('/comment/getComments');
