import React, { useRef } from "react";
import "../02-useEffect/effects.css";

export const FocusScreen = () => {
    const inputRef = useRef();

    const handleClick = () => {
        // document.querySelector('input').focus();
        //document.querySelector("input").select();
        inputRef.current.select();
    };

    return (
        <div>
            <h1>Focus Screen</h1>
            <hr />
            <input ref={inputRef} className="form-control" placeholder="su nombre" />
            <button className="btn btn-outline-primare mt-5" onClick={handleClick}>
                Focus
            </button>
        </div>
    );
};
