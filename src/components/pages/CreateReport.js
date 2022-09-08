import React from 'react';
import { Link } from 'react-router-dom'


export const CreateReport = () => {

    return (
        <div className="upload content">

            <main className="container">
                <h2 className="main-title mb-2">Create report</h2>

                <Link to="/intakes" className="card-intake">
                    <img src="/assets/img/file.svg" alt="file-icon" />
                    <h4 className="fruit__title">Create from Intake</h4>
                </Link>

                <div className="fruit">

                    <Link to="/newbb/blueberries" className="card-fruit">
                        <div className="fruit__container">
                            <div className="fruit__img mb-1">
                                <img src="/assets/img/new-bb.jpg" alt="bb" />
                            </div>
                            <h4 className="fruit__title">Blueberries</h4>
                        </div>
                    </Link>

                    <Link to="/newbb/raspberries" className="card-fruit">
                        <div className="fruit__container">
                            <div className="fruit__img mb-1">
                                <img src="/assets/img/new-rb.jpg" alt="bb" />
                            </div>
                            <h4 className="fruit__title">Raspberries</h4>
                        </div>
                    </Link>

                    <Link to="/newbb/blackberries" className="card-fruit">
                        <div className="fruit__container">
                            <div className="fruit__img mb-1">
                                <img src="/assets/img/new-blb.jpg" alt="bb" />
                            </div>
                            <h4 className="fruit__title">Blackberries</h4>
                        </div>
                    </Link>

                    <Link to="/newbb/strawberries" className="card-fruit">
                        <div className="fruit__container">
                            <div className="fruit__img mb-1">
                                <img src="/assets/img/new-sb.jpg" alt="bb" />
                            </div>
                            <h4 className="fruit__title">Strawberries</h4>
                        </div>
                    </Link>
                    <Link to="/newbb/pears" className="card-fruit">
                        <div className="fruit__container">
                            <div className="fruit__img mb-1">
                                <img src="/assets/img/new-cp.jpg" alt="cp" />
                            </div>
                            <h4 className="fruit__title">Pears</h4>
                        </div>
                    </Link>
                    <Link to="/newbb/cherries" className="card-fruit">
                        <div className="fruit__container">
                            <div className="fruit__img mb-1">
                                <img src="/assets/img/new-ch.jpg" alt="bb" />
                            </div>
                            <h4 className="fruit__title">Cherries</h4>
                        </div>
                    </Link>
                    <Link to="/newbb/apples" className="card-fruit">
                        <div className="fruit__container">
                            <div className="fruit__img mb-1">
                                <img src="/assets/img/new-apples.jpg" alt="bb" />
                            </div>
                            <h4 className="fruit__title">Apples</h4>
                        </div>
                    </Link>
                    <Link to="/newbb/kiwiberries" className="card-fruit">
                        <div className="fruit__container">
                            <div className="fruit__img mb-1">
                                <img src="/assets/img/new-kw.jpg" alt="bb" />
                            </div>
                            <h4 className="fruit__title">Kiwiberries</h4>
                        </div>
                    </Link>

                </div>

            </main>

        </div>
    )
}
