export default (comments=[], action) => {
    switch (action.type) {

    case 'FETCH_ALL_COMMENT':
        return action.payload;
    case 'CREATE_COMMENT':
        return [... comments,action.payload];
    default: return comments;

    }
}