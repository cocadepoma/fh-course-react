import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { startGoogleLogin, startLoginEmailPassword } from "../actions/auth";
import validator from "validator";
import { removeLoginError, setLoginError } from "../actions/login";

export const LoginScreen = () => {
    const dispatch = useDispatch();
    const { msgError, loading } = useSelector((state) => state.login);

    const [formValues, handleInputChange] = useForm({
        email: "nando@gmail.com",
        password: "123456",
    });

    const { email, password } = formValues;

    const handleLogin = (e) => {
        e.preventDefault();
        if (isLoginValid()) {
            dispatch(startLoginEmailPassword(email, password));
        }
    };

    const isLoginValid = () => {
        if (!validator.isEmail(email)) {
            dispatch(setLoginError("Email is not valid"));
            return false;
        }
        if (password.length < 6) {
            dispatch(setLoginError("Password length should be at least 6 characters"));
            return false;
        }
        dispatch(removeLoginError());
        return true;
    };

    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin());
    };

    return (
        <div className='animate__animated animate__fadeIn animate__fast'>
            <h3 className='auth__title'>Login</h3>
            <form onSubmit={handleLogin}>
                {msgError && <div className='auth__alert-error'>{msgError}</div>}
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
                <button className='btn btn-primary btn-block' disabled={loading} type='submit'>
                    Login
                </button>

                <div className='auth__social-networks'>
                    <p>Login with social networks</p>
                    <div className='google-btn' onClick={handleGoogleLogin}>
                        <div className='google-icon-wrapper'>
                            <img
                                className='google-icon'
                                src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
                                alt='google button'
                            />
                        </div>
                        <p className='btn-text'>
                            <b>Sign in with google</b>
                        </p>
                    </div>
                    <Link className='mt-5 link' to='/auth/register'>
                        Create new account
                    </Link>
                </div>
            </form>
        </div>
    );
};
