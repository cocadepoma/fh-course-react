import React, { useCallback, useState } from "react";
import { ShowIncrement } from "./ShowIncrement";

import "../02-useEffect/effects.css";

export const CallbackHook = () => {
    const [counter, setCounter] = useState(10);

    // const increment = () => {
    //     setCounter(counter + 1);
    // };

    // Versión memorizada de la anterior, para que cada vez que se
    // renderiza este componente, el hijo no se vuelva a regenerar
    const increment = useCallback(
        (num) => {
            setCounter((c) => c + num);
        },
        [setCounter]
    );

    return (
        <div>
            <h1>useCallbackHook: {counter}</h1>
            <hr />
            <ShowIncrement increment={increment} />
        </div>
    );
};
