import React, { useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { types } from "../../types/types";

export const LoginScreen = ({ history }) => {
    const { dispatch } = useContext(AuthContext);

    const handleLogin = () => {
        const lastPath = localStorage.getItem("lastPath") || "/";
        // history.push("/");
        // Replace reemplaza el history, con lo que una vez redireccionado, si volvemos a atrás
        // volverá a una página default, evitando así el acceso a login por ejemplo
        const action = {
            type: types.login,
            payload: {
                name: "Paco",
            },
        };

        dispatch(action);
        history.replace(lastPath);
    };

    return (
        <div className='container mt-5'>
            <h1>Login Screen</h1>
            <hr />
            <button className='btn btn-primary' onClick={handleLogin}>
                Login
            </button>
        </div>
    );
};
