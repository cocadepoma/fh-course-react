import React, { useMemo, useState } from "react";
import { useCounter } from "../../hooks/useCounter";
import { procesoPesado } from "../../helpers/procesoPesado";

import "../02-useEffect/effects.css";

export const MemoHook = () => {
    const { counter, increment } = useCounter(5000);
    const [show, setShow] = useState(true);

    const memoPesado = useMemo(() => procesoPesado(counter), [counter]);

    return (
        <div>
            <h3>
                Counter: <small>{counter}</small>
            </h3>
            <hr />
            <p> memoPesado </p>
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
