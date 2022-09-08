import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import qcareApi from '../../api/qcareApi'
import useForm from '../../hooks/useForm'
import { startChecking } from '../../store/asyncMethods/authMethods'
import { UserPic } from '../ui/UserPic'



export const UpdateUser = ({ history }) => {

    const { name: name2, lastname: lastname2, profile, company: company2, uid } = useSelector(state => state.auth)

    const dispatch = useDispatch()

    const [profileImg, setProfileImg] = useState()
    const [src, setImg] = useState(profile);

    const handleImg = (e) => {
        if (e.target.files[0]) {
            setImg(URL.createObjectURL(e.target.files[0]));
            setProfileImg(e.target.files[0])
        }
    }

    const [inputVal, handleInputChange] = useForm({
        name: name2,
        lastname: lastname2,
        company: company2
    })

    const { name, lastname, company } = inputVal


    const handleEdit = async (e) => {
        e.preventDefault()

        const formData = new FormData();

        (profileImg) && formData.append('profile', profileImg);

        formData.append('name', name)
        formData.append('lastname', lastname)
        formData.append('company', company)


        await qcareApi.put(`/auth/profile/${uid}`, formData)

        dispatch(startChecking())

        history.push('/user')
    }


    return (
        <div className="content edit">
            <main className="container">
                <UserPic profile={src} className="edit__userPic" />

                <Link to="/user" className="return">
                    <svg version="1.1" viewBox="0 0 200 200" >
                        <style type="text/css">
                        </style>
                        <polygon points="140.8,27.1 129.7,16 45.7,100 45.7,100 45.7,100 129.7,184 140.8,172.9 67.9,100 " />
                    </svg>
                </Link>

                <h2 className="main-title text-center pt-2">Edit Profile</h2>

                <input
                    id="edit"
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    onChange={handleImg}
                />

                <form
                    onSubmit={handleEdit}
                    className="edit__input pt-1">
                    <div>
                        <label>Name</label>
                        <input
                            type="text"
                            className="input-large"
                            name="name"
                            value={name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Last name</label>
                        <input
                            type="text"
                            name="lastname"
                            value={lastname}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Company</label>
                        <input
                            type="text"
                            name="company"
                            value={company}
                            onChange={handleInputChange}
                        />
                    </div>

                    <button className="btn-primary btn-block m-auto mt-2">Save Changes</button>
                </form>
            </main>

        </div>
    )
}
