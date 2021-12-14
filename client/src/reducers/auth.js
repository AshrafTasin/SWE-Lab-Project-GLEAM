import { AUTH, LOGOUT } from "../constants/actionTypes";

export const authReducers = (state = {authData : null},action) => {
    switch (action.type) {
        case AUTH:
            console.log(action?.data);
            localStorage.setItem('profile',JSON.stringify({ ...action?.data}));
            return { ...state, authData: action?.data};
        
        case LOGOUT:
            localStorage.clear();
            return { ...state, authData: null};
        
        case 'VERIFY':
            localStorage.setItem('profile',JSON.stringify({ ...action?.data}));
            return { ...state, authData: action?.data};
        default:
            return state;
    }
}