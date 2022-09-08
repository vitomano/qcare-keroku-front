import React from 'react';
import { Link } from 'react-router-dom'


export const New = () => {
    return (
        <Link to="/upload" className="new">
            <svg version="1.1"viewBox="0 0 200 200">
                <polygon points="180.1,91.7 108.3,91.7 108.3,19.9 91.7,19.9 91.7,91.7 19.9,91.7 19.9,108.3 91.7,108.3 91.7,180.1 
                    108.3,180.1 108.3,108.3 180.1,108.3 "/>
            </svg>
        </Link>
    )
}
