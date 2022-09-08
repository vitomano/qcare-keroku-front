import React from 'react'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast';

import useForm from '../../hooks/useForm'
import { startLogin } from '../../store/asyncMethods/authMethods';

export const Login = () => {

    const dispatch = useDispatch();

    // const [formVal, handleInputChange, reset] = useForm({
    const [formVal, handleInputChange] = useForm({
        email: "",
        password: ""
    })

    const { email, password } = formVal

    const userLogin = async (e) => {
        e.preventDefault()

        dispatch(startLogin(email, password, toast))
        // reset()
    }


    return (
        <>
            <div className="login-bg">
                <img src="../assets/img/qc-logo.png" className="logo" alt="logo-qc" />

                <div className="l-form">

                    <form onSubmit={userLogin} className="form">
                        <h1 className="mb-2 text-center text-white"> Login </h1>
                        <div className="form__div mb-2">
                            <input
                                type="email"
                                name="email"
                                className="form__input"
                                placeholder="email"
                                value={email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form__div mb-2">
                            <input
                                type="password"
                                name="password"
                                className="form__input"
                                placeholder="password"
                                value={password}
                                onChange={handleInputChange}
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn-primary outline-2"
                            >
                            Login
                                </button>
                    </form>
                </div>
            </div>
        </>
    )
}
