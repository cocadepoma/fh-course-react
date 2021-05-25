import React from "react";
import { HeroeList } from "../heroes/HeroeList";

export const MarvelScreen = () => {
    const publisher = "Marvel Comics";
    return (
        <div>
            <h1>MarvelScreen</h1>
            <HeroeList publisher={publisher} />
        </div>
    );
};
