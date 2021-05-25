import React, { useContext } from "react";
import { UserContext } from "./UserContext";

export const HomeScreen = () => {
    const { user, setUser } = useContext(UserContext);

    return (
        <div>
            <h1>Homescreen</h1>
            <hr />
            <pre>{JSON.stringify(user, null, 3)}</pre>
        </div>
    );
};
