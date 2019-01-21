const defaultState = {
    user: null,
    login: true,
}

export default (state = defaultState, action) => {
    if(action.type === "SET_USER_INFO"){
        return {
            ...state,
            user: action.user,
            login: false,
        };
    }
    return state;
}