import qcareApi from '../../api/qcareApi';


export const startRegister = (name, email, password, toast) => {
    return async (dispatch, getState) => {


        try {

            const { data } = await qcareApi.post('/auth/register', { name, email, password })

            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            toast.success('Register Ok!')

            dispatch(login({
                uid: data.uid,
                name: data.name,
                lastname: data.lastname,
                profile: data.profile,
                company: data.company
            }))

        } catch (errors) {

            dispatch({ type: 'REGISTER_ERROR', payload: errors.response.data.errors })
            const err = getState().auth.registerErrors
            
            err.map(erry => (
                 toast.error(erry.msg)
            ))
        }
    }
}

export const startLogin = (email, password, toast) => {
    return async (dispatch) => {

        try {

            const { data } = await qcareApi.post('/auth/login', { email, password })

            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: data.uid,
                name: data.name,
                lastname: data.lastname,
                profile: data.profile,
                company: data.company 
            }))

            toast.success('Login Ok!')

        } catch (errors) {
            toast.error('Email or password incorrect')
        }
    }
}

export const startChecking = () => {
    return async (dispatch) => {

        try {

            //if(!localStorage.getItem('x-token')){return dispatch(checkingFinish())}

            const { data } = await qcareApi.get('/auth/me')

            dispatch(login({
                uid: data.uid,
                name: data.name,
                lastname: data.lastname,
                profile: data.profile,
                company: data.company
            }))

        } catch (errors) {
            dispatch(checkingFinish())
            // console.log(errors.response.data.msg)
        }
    }
}


const checkingFinish = () => ({ type: "CHECKING_OFF" });


const login = (user) => ({
    type: 'START_LOGIN',
    payload: user
})

export const startLogout = () => {

    return (dispatch) => {
        
        localStorage.clear()
        dispatch(logout())
    }
}


const logout = () => ({
    type: 'LOGOUT',
})

