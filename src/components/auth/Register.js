import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import toast from 'react-hot-toast';

import useForm from '../../hooks/useForm'
import { startRegister } from '../../store/asyncMethods/authMethods'

export const Register = () => {

    const dispatch = useDispatch();
    const {loading} = useSelector( state => state.auth );

    const [formVal, handleInputChange, reset] = useForm({
        name: "",
        email: "",
        password: ""
    })

    const { name, email, password } = formVal

    const userRegister = async(e) => {
        e.preventDefault()

        dispatch(startRegister(name, email, password, toast))
        reset()
    }

    return (
        <>
            <div className="row body-height">
                <div className="col-7 bg-register bg-img"></div>

                <div className="col-5">
                    <div className="account">
                        <div className="account__section pb-5">
                            <h1 className="mb-2">Register</h1>

                            <form onSubmit={userRegister}>
                                <div className="group mb-1">
                                    <input
                                        type="text"
                                        name="name"
                                        className="group__control"
                                        placeholder="Name"
                                        value={name}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="group mb-1">
                                    <input
                                        type="email"
                                        name="email"
                                        className="group__control"
                                        placeholder="Email"
                                        value={email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="group mb-2">
                                    <input
                                        type="password"
                                        name="password"
                                        className="group__control"
                                        placeholder="Password"
                                        value={password}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <button 
                                type="submit"
                                className={loading ?"btn-primary outline btn-block desactive":"btn-primary outline btn-block"}>
                                    Register
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
