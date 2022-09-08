import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route,
} from "react-router-dom";
import { Login } from '../components/auth/Login';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { error404 } from '../components/ui/error404';
import { startChecking } from '../store/asyncMethods/authMethods';
import { Report } from '../components/pages/Report';
import { Reports } from '../components/pages/Reports';
import { CreateReport } from '../components/pages/CreateReport';
import { NewBB } from '../components/pages/NewBB';
import { User } from '../components/profile/User';
import { NewIntake } from '../components/pages/NewIntake';
import { Intakes } from '../components/pages/Intakes';
import { UpdateUser } from '../components/profile/UpdateUser';
import { History } from '../components/pages/History';
import { NewReportIntake } from '../components/pages/NewReportIntake';
import { Spinner } from '../components/ui/Spinner';
import { ViewPdf } from '../components/pages/ViewPdf';
import { SharePdf } from '../components/pages/SharePdf';
import { SharePdfImages } from '../components/pages/SharePdfImages';
import { LifeTestPage } from '../components/pages/LifeTestPage';
import { SingleLifeTest } from '../components/pages/SingleLifeTest';
import { PreReports } from '../components/pages/PreReports';
import { NewPreReport } from '../components/pages/NewPreReport';
import { SinglePreReport } from '../components/pages/SinglePreReport';

export const AppRoutes = () => {

    const dispatch = useDispatch();
    const { uid, checking } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(startChecking())
    }, [dispatch])

    if (checking) {
        return (
            <Spinner />
        )
    }

    return (
        <Router>
            <div>
                <Switch>

                    <PublicRoute
                        path="/login"
                        component={Login}
                        isAuthenticated={!!uid}
                    />

                    <Route path="/404" component={error404} />

                    <PrivateRoute
                        path="/"
                        exact component={Reports}
                        isAuthenticated={!!uid}
                    />

                    <PrivateRoute
                        path="/report/:id"
                        component={Report}
                        isAuthenticated={!!uid}
                    />

                    <PrivateRoute
                        path="/upload"
                        component={CreateReport}
                        isAuthenticated={!!uid}
                    />

                    <PrivateRoute
                        path="/newbb/:id"
                        component={NewBB}
                        isAuthenticated={!!uid}
                    />

                    <PrivateRoute
                        path="/new-report/:id"
                        component={NewReportIntake}
                        isAuthenticated={!!uid}
                    />

                    <PrivateRoute
                        path="/new-prereport/:id"
                        component={NewPreReport}
                        isAuthenticated={!!uid}
                    />

                    <PrivateRoute
                        path="/prereports"
                        component={PreReports}
                        isAuthenticated={!!uid}
                    />

                    <PrivateRoute
                        path="/prereport/:id"
                        component={SinglePreReport}
                        isAuthenticated={!!uid}
                    />

                    <PrivateRoute
                        path="/newintake"
                        component={NewIntake}
                        isAuthenticated={!!uid}
                    />

                    <PrivateRoute
                        path="/intakes"
                        component={Intakes}
                        isAuthenticated={!!uid}
                    />

                    <PrivateRoute
                        path="/user"
                        component={User}
                        isAuthenticated={!!uid}
                    />

                    <PrivateRoute
                        path="/life"
                        component={LifeTestPage}
                        isAuthenticated={!!uid}
                    />

                    <PrivateRoute
                        path="/life-test/:id"
                        component={SingleLifeTest}
                        isAuthenticated={!!uid}
                    />

                    <PrivateRoute
                        path="/edit-user"
                        component={UpdateUser}
                        isAuthenticated={!!uid}
                    />

                    <PrivateRoute
                        path="/history"
                        component={History}
                        isAuthenticated={!!uid}
                    />

                    <Route
                        path="/view-pdf/:id"
                        component={ViewPdf}
                    />

                    <Route
                        path="/share-report/:id"
                        component={SharePdf}
                    />

                    <Route
                        path="/share-report-qc/:id"
                        component={SharePdfImages}
                    />

                    <Redirect to="/404" />

                </Switch>
            </div>
        </Router>
    )
}
