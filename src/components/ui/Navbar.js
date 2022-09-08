import React from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'

import { startLogout } from '../../store/asyncMethods/authMethods';


export const Navbar = () => {

    const dispatch = useDispatch();
    const { profile } = useSelector(state => state.auth);


    const handleLogout = () => {
        dispatch(startLogout())
    }

    const checkedBtn = () => {
        document.getElementById("menu").checked = false
    }


    return (

        <nav className="navbar">
            <div className="navbar__container">
                <Link to="/" className="navbar__logo">
                    <img src="/assets/img/qc-logo.png" alt="logo" />
                </Link>

                <div className="navbar__menu">

                    <label htmlFor="menu" className="lines-icon">
                        <img src="/assets/img/menu-icon.svg" alt="menu-icon" />
                    </label>
                    <input type="checkbox" name="menu" id="menu" />
                    <ul className="navbar__list" name="navbarbar">
                        <label htmlFor="menu" className="close-icon">
                            <img src="/assets/img/close-icon.svg" alt="close-icon" />
                            <input type="checkbox" name="menu" id="menu" />
                        </label>
                        <li className="navbar__profile mb-1" onClick={checkedBtn} >
                            <Link to="/user" className='profile-img'>
                                <img src={profile} alt="nav-report" />
                            </Link>
                        </li>
                        <li className="navbar__item mb-4" onClick={checkedBtn} ><Link to="/user">Edit Profile</Link></li>
                        <li className="navbar__item mb-2" onClick={checkedBtn} ><Link to="/intakes">Intakes</Link></li>
                        <li className="navbar__item mb-2" onClick={checkedBtn} ><Link to="/newintake">Add Intake</Link></li>
                        <li className="navbar__item mb-2" onClick={checkedBtn} ><Link to="/upload">New Report</Link></li>
                        <li className="navbar__item mb-2" onClick={checkedBtn} ><Link to="/history">History</Link></li>
                        <button
                            onClick={handleLogout}
                            className="btn-primary outline-2 mt-2">Logout
                        </button>
                    </ul>

                </div>
            </div>
        </nav>
    )
}
