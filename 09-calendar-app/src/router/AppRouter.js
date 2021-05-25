import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { startChecking } from "../actions/auth";
import { LoginScreen } from "../components/auth/LoginScreen";
import { CalendarScreen } from "../components/calendar/CalendarScreen";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startChecking());
    }, [dispatch]);

    const { checking, uid } = useSelector(state => state.auth)

    if (checking) {
        return (<h5>Espere</h5>);
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PrivateRoute exact path='/' isAuthenticated={!!uid} component={CalendarScreen} />
                    <PublicRoute exact path='/login' isAuthenticated={!!uid} component={LoginScreen} />
                    <Redirect to='/' />
                </Switch>
            </div>
        </Router>
    );
};
