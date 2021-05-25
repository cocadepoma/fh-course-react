import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { JournalScreen } from "../journal/JournalScreen";
import { AuthRouter } from "./AuthRouter";
import { firebase } from "../../firebase/firebase-config";
import { useDispatch } from "react-redux";
import { login } from "../actions/auth";
import { LoadingScreen } from "../loading/LoadingScreen";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { startLoadingNotes } from "../actions/notes";

export const AppRouter = () => {
    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(async (user) => {
            if (user?.uid) {
                // If the user is already logged, set credentials
                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn(true);

                // Load notes on init
                dispatch(startLoadingNotes(user.uid));
            } else {
                setIsLoggedIn(false);
            }
            setChecking(false);
        });
    }, [dispatch, setChecking, setIsLoggedIn]);

    if (checking) {
        return <LoadingScreen />;
    }
    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        path='/auth/'
                        component={AuthRouter}
                        isAuthenticated={isLoggedIn}
                    />

                    <PrivateRoute
                        exact
                        path='/'
                        component={JournalScreen}
                        isAuthenticated={isLoggedIn}
                    />
                </Switch>
            </div>
        </Router>
    );
};
