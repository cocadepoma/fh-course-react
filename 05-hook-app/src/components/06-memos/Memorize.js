import React, { useState } from "react";
import { useCounter } from "../../hooks/useCounter";
import { Small } from "./Small";

import "../02-useEffect/effects.css";

export const Memorize = () => {
    const { counter, increment } = useCounter(10);
    const [show, setShow] = useState(true);

    return (
        <div>
            <h1>
                Counter: <Small value={counter} />
            </h1>

            <button className="btn btn-warning" onClick={increment}>
                Incrementar
            </button>
            <button
                className="btn btn-outline-primary"
                onClick={() => {
                    setShow(!show);
                }}
            >
                Show/Hide {JSON.stringify(show)}
            </button>
        </div>
    );
};
