import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { UserPic } from '../ui/UserPic'

//const baseURL = process.env.REACT_APP_API_URL

export const User = () => {

    const { name, lastname, profile, company } = useSelector(state => state.auth)

    return (
        <div className="content text-center edit">

            <main className="container">
                <UserPic profile={profile} editable={false} />

                <Link to="/" className="return">
                    <svg version="1.1" viewBox="0 0 200 200" >
                        <style type="text/css">
                        </style>
                        <polygon points="140.8,27.1 129.7,16 45.7,100 45.7,100 45.7,100 129.7,184 140.8,172.9 67.9,100 " />
                    </svg>
                </Link>

                <div className="mb-1">
                    <h2 className="main-title text-center pt-2">{name} {lastname.charAt() + "."}</h2>
                    {company && <p>{company}</p>}
                    <Link to="/edit-user" className="edit__profile">edit profile</Link>
                </div>

                <div className="edit__input">
                    <Link className="btn-primary my-1 outline btn-block__80" to="/intakes">Intakes</Link>
                    <Link className="btn-primary my-1 outline btn-block__80" to="/newintake">Add Intake</Link>
                    <Link className="btn-primary my-1 outline btn-block__80" to="/upload">New Report</Link>
                    <Link className="btn-primary my-1 outline btn-block__80" to="/history">History</Link>
                </div>
            </main>

        </div>
    );
}
