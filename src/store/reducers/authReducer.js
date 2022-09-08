
const initialState = {
    loading: false,
    checking: true,
    registerErrors: [],
    uid: "",
    name: "",
    lastname: "",
    profile: "",
    company: ""
}


export const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'SET_LOADER':
            return {...state, loading: true}
        case 'CLOSE_LOADER':
            return {...state, loading: false}
        case 'REGISTER_ERROR':
            return {...state, registerErrors: action.payload}
        case 'START_LOGIN':
            return {...state, ...action.payload, checking: false}
        case 'CHECKING_OFF':
            return {...state, checking: false}
        case 'LOGOUT':
            return {...initialState, checking: false}

        default:
            return state;
    }

}