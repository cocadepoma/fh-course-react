import React, { useLayoutEffect, useRef, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useCounter } from "../../hooks/useCounter";

import "./layout.css";

export const LayoutEffect = () => {
    const { counter, decrement, increment } = useCounter(1);
    const { data } = useFetch(`https://www.breakingbadapi.com/api/quotes/${counter}`);

    // !null = true, !!null = false, Si hay datos, guarda data[0]
    const { quote } = !!data && data[0];

    const pTag = useRef();
    const [boxSize, setBoxSize] = useState({});

    useLayoutEffect(() => {
        setBoxSize(pTag.current.getBoundingClientRect());
    }, [quote]);

    return (
        <div>
            <h1>LayoutEffect</h1>
            <hr />

            <blockquote className="blockquote text-end">
                <p ref={pTag}>{quote}</p>
            </blockquote>

            <pre>{JSON.stringify(boxSize, null, 3)}</pre>
            {counter > 1 && (
                <button className="btn btn-danger me-3" onClick={decrement}>
                    Prev quote
                </button>
            )}
            {counter <= 102 && (
                <button className="btn btn-primary" onClick={increment}>
                    Next quote
                </button>
            )}
        </div>
    );
};
