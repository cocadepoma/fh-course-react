import React, { useEffect, useState } from 'react'
import { Message } from './Message';
import './effects.css';


export const SimpleForm = () => {

    const [formState, setFormState] = useState({ name: '', email: '' })

    const { name, email } = formState;

    useEffect(() => {
        console.log('hey!');
    }, []);

    useEffect(() => {
        console.log('formState ha cambiado!');
    }, [formState]);

    useEffect(() => {
        console.log('email ha cambiado!');
    }, [email]);

    const handleInputChange = ({ target }) => {
        setFormState({ ...formState, [target.name]: target.value })
    }


    return (
        <div>
            <h1>useEffect</h1>
            <hr />

            <div className="form-group">
                <input type="text"
                    name="name"
                    className="form-control"
                    placeholder="Tu nombre"
                    autoComplete="off"
                    value={name}
                    onChange={handleInputChange} />
                <br />
                <input type="text"
                    name="email"
                    className="form-control"
                    placeholder="email@gmail.mac"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange} />
            </div>
            {(name === '123') && <Message />}
        </div>
    )
}
