import React from "react";
import { useFetch } from "../../hooks/useFetch";
import { useCounter } from "../../hooks/useCounter";

import "../02-useEffect/effects.css";

export const MultipleCustomHooks = () => {
    const { counter, decrement, increment } = useCounter(1);
    const { loading, data } = useFetch(`https://www.breakingbadapi.com/api/quotes/${counter}`);

    // !null = true, !!null = false, Si hay datos, guarda data[0]
    const { author, quote } = !!data && data[0];

    return (
        <div>
            <h1>BreakingBad Quotes</h1>
            <hr />

            {loading ? (
                <div className='alert alert-info text-center'>Loading...</div>
            ) : (
                <blockquote className='blockquote text-end'>
                    <p className='parrafo'>{quote}</p>
                    <footer className='blockquote-footer'>{author}</footer>
                </blockquote>
            )}

            {counter > 1 && (
                <button className='btn btn-danger me-3' onClick={decrement}>
                    Prev quote
                </button>
            )}
            {counter <= 102 && (
                <button className='btn btn-primary' onClick={increment}>
                    Next quote
                </button>
            )}
        </div>
    );
};
