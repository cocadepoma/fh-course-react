import React, { useMemo } from "react";
// Libreria para obtener los params de la url de forma sencilla
// queryString.parse(location.search); Muestra todos los params que hay en la url
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { HeroeCard } from "../heroes/HeroeCard";
import { getHeroesByName } from "../../selectors/getHeroesByName";

export const SearchScreen = ({ history }) => {
    const location = useLocation();
    const { q = "" } = queryString.parse(location.search);

    const [formValues, handleInputChange] = useForm({ searchText: q });
    const { searchText } = formValues;

    const heroesFiltered = useMemo(() => getHeroesByName(q), [q]);

    const handleSearch = (e) => {
        e.preventDefault();
        history.push(`?q=${searchText}`);
    };

    return (
        <div>
            <h1>SearchScreen</h1>
            <hr />
            <div className='row'>
                <div className='col-5'>
                    <h4>Search Form</h4>
                    <hr />
                    <form onSubmit={handleSearch}>
                        <input
                            type='text'
                            name='searchText'
                            className='form-control'
                            placeholder='Find your hero'
                            value={searchText}
                            onChange={handleInputChange}
                            autoComplete='off'
                        />
                        <button type='submit' className='btn btn-outline-primary mt-3 w-100'>
                            Search...
                        </button>
                    </form>
                </div>
                <div className='col-7'>
                    <h4>Results</h4>
                    <hr />

                    {q === "" && <p className='alert alert-info'>Search a Hero</p>}
                    {q !== "" && heroesFiltered.length === 0 && (
                        <p className='alert alert-danger'>
                            The hero <b>{q}</b> doesn't exists
                        </p>
                    )}

                    {heroesFiltered.map((hero) => (
                        <HeroeCard key={hero.id} {...hero} />
                    ))}
                </div>
            </div>
        </div>
    );
};
