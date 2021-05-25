import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { DcScreen } from "../components/dc/DcScreen";
import { MarvelScreen } from "../components/marvel/MarvelScreen";
import { NavBar } from "../components/ui/NavBar";
import { HeroeScreen } from "../components/heroes/HeroeScreen";
import { SearchScreen } from "../components/search/SearchScreen";

export const DashboardRoutes = () => {
    return (
        <>
            <NavBar />
            <div className='container mt-2'>
                <Switch>
                    <Route exact path='/marvel' component={MarvelScreen} />
                    <Route exact path='/hero/:heroeId' component={HeroeScreen} />
                    <Route exact path='/dc' component={DcScreen} />
                    <Route exact path='/search' component={SearchScreen} />

                    <Redirect to='/marvel' />
                </Switch>
            </div>
        </>
    );
};
