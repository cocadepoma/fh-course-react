import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { removeError, setError } from "../actions/ui";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";
import { startRegisterWithEmailPasswordName } from "../actions/auth";

export const RegisterScreen = () => {
    const dispatch = useDispatch();
    const { msgError } = useSelector((state) => state.ui);

    const defaultUser = {
        name: "Hernando",
        email: "nando@gmail.com",
        password: "123456",
        password2: "123456",
    };

    const [formValues, handleInputChange] = useForm(defaultUser);

    const { name, email, password, password2 } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            dispatch(startRegisterWithEmailPasswordName(email, password, name));
        }
    };

    const isFormValid = () => {
        if (name.trim().length <= 2) {
            dispatch(setError("The name input should be filled with a valid name"));
            return false;
        } else if (!validator.isEmail(email)) {
            dispatch(setError("The email input should be filled with a valid email"));
            return false;
        } else if (password !== password2 || password.length < 6) {
            dispatch(setError("Passwords doesn't match, or password too short"));
            return false;
        }
        dispatch(removeError());
        return true;
    };
    return (
        <div className='animate__animated animate__fadeIn animate__fast'>
            <h3 className='auth__title'>Register</h3>
            <form onSubmit={handleRegister}>
                {msgError && <div className='auth__alert-error'>{msgError}</div>}

                <input
                    className='auth__input'
                    type='text'
                    placeholder='Name'
                    name='name'
                    autoComplete='off'
                    value={name}
                    onChange={handleInputChange}
                />
                <input
                    className='auth__input'
                    type='text'
                    placeholder='Email'
                    name='email'
                    autoComplete='off'
                    value={email}
                    onChange={handleInputChange}
                />

                <input
                    className='auth__input'
                    type='password'
                    placeholder='Password'
                    name='password'
                    value={password}
                    onChange={handleInputChange}
                />
                <input
                    className='auth__input'
                    type='password'
                    placeholder='Confirm password'
                    name='password2'
                    value={password2}
                    onChange={handleInputChange}
                />

                <button className='btn btn-primary btn-block' type='submit'>
                    Register
                </button>

                <Link className='mt-5 link' to='/auth/login'>
                    Already Registered?
                </Link>
            </form>
        </div>
    );
};
