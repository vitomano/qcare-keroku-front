import React from 'react';
import { Link } from 'react-router-dom'


export const Bar = () => {
    return (
        <div className="bar">
            <div className="bar__grid">
                <Link to="/" className="bar__container mt-05">
                    <img className="img-icon" src="/assets/img/nav-reports.svg" alt="nav-report" />
                    <p>All reports</p>
                </Link>
                <Link to="/intakes" className="bar__container mt-05">
                    <img className="img-icon" src="/assets/img/nav-intakes.svg" alt="nav-report" />
                    <p>Intakes</p>
                </Link>
                <Link to="/upload" className="bar__container">
                    <img src="/assets/img/nav-mas.svg" alt="nav-report" className="mas-icon"/>
                </Link>
                <Link to="/prereports" className="bar__container mt-05">
                    <img className="img-icon" src="/assets/img/nav-prereports.svg" alt="nav-report" />
                    <p>Pre Reports</p>
                </Link>
                <Link to="/life" className="bar__container mt-05">
                    <img className="img-icon" src="/assets/img/nav-life-test.svg" alt="nav-report" />
                    <p>Life Test</p>
                </Link>
                {/* <Link to="/history" className="bar__container mt-05">
                    <img className="img-icon" src="/assets/img/nav-history.svg" alt="nav-report" />
                    <p>History</p>
                </Link> */}
            </div>
        </div>
    )
}
