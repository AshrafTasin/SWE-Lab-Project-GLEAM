export const userReducers = (state = {authData : null},action) => {
    switch(action.type){
        case "UPDATE":
            console.log("Hello "+action?.data);
            localStorage.setItem('profile',JSON.stringify({ ...action?.data}));
            return { ...state, authData: action?.data};
        default:
            return state;
    }
}