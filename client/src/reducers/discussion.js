export default (discussion=[], action) => {
    switch (action.type) {

    case 'FETCH_ALL_DISCUSSION':
        return action.payload;
    case 'CREATE_DISCUSSION':
        return [... discussion,action.payload];
    case 'UPDATE_DISCUSSION':
    return discussion.map((discussion) => (discussion._id === action.payload._id ? action.payload : discussion));

    case 'DELETE_DISCUSSION':
    return discussion.filter((discussion) => discussion._id ===! action.payload);

    case 'UPDATE_UP_DISCUSSION':   
         discussion.map((discussion) => (discussion._id === action.payload._id ? action.payload : discussion));
    default: return discussion;
    }
}