import React from 'react';

export const UserPic = ({profile, editable=true}) => {

    return (
        <>
        <div className="user">
            <img src={profile} alt="profile" className="user__pic"/>
            {
                editable &&
                <label htmlFor="edit" className="edit__button mb-1">
                <svg viewBox="0 0 100 100">
                    <path d="M90.8,16.1L49.6,57.3c-1.2,1.2-2.5,2.2-4,2.9l-6.4,3.2c-1.2,0.6-2.5-0.7-1.9-1.9l3.3-6.5c0.8-1.4,1.8-2.8,2.9-4L84.7,9.7
	c2-2,5.2-1.7,6.8,0.8C92.7,12.3,92.3,14.6,90.8,16.1z M80.2,39.9l-5.6,5.6c-1,1-1.5,2.3-1.5,3.6c0,0,0,31.3,0,31.3h-54V27.7h32.4
	c1.3,0,2.6-0.6,3.6-1.5l5.6-5.6c0.7-0.7,0.2-1.7-0.7-1.7H14.7c-2.4,0-4.4,2-4.4,4.4v61.5c0,2.4,2,4.4,4.4,4.4h62.8
	c2.4,0,4.4-2,4.4-4.4V40.6C81.9,39.7,80.9,39.3,80.2,39.9z"/>
                </svg>
            </label>
            }
        </div>

        
        </>
        
    )
}
