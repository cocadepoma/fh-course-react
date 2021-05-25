import React from "react";
import { useForm } from "../../hooks/useForm";
import { useDispatch } from "react-redux";

import "./login.css";
import { authStartLogin, startRegister } from "../../actions/auth";
import Swal from "sweetalert2";

export const LoginScreen = () => {

    const dispatch = useDispatch();

    const [formLoginValues, handleLoginInputChange] = useForm({
        lEmail: "",
        lPassword: "",
    });

    const [formRegisterValues, handleRegisterInputChange] = useForm({
        rName: '',
        rEmail: "",
        rPassword: "",
        rPassword2: ''
    });

    const { lEmail, lPassword } = formLoginValues;
    const { rName, rEmail, rPassword, rPassword2 } = formRegisterValues;

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(authStartLogin(lEmail, lPassword));
    };

    const handleRegister = (e) => {
        e.preventDefault();

        if (rPassword !== rPassword2) {
            return Swal.fire('Error', 'Las contraseñas deben de ser iguales', 'error');
        }

        dispatch(startRegister(rEmail, rPassword, rName));
    };

    return (
        <div className='container login-container'>
            <div className='row'>
                <div className='col-md-6 login-form-1'>
                    <h3>Ingreso</h3>
                    <form onSubmit={handleLogin}>
                        <div className='mb-3'>
                            <input
                                type='email'
                                className='form-control'
                                placeholder='Correo'
                                name='lEmail'
                                onChange={handleLoginInputChange}
                                value={lEmail}
                            />
                        </div>
                        <div className='mb-3'>
                            <input
                                type='password'
                                className='form-control'
                                placeholder='Contraseña'
                                name='lPassword'
                                onChange={handleLoginInputChange}
                                value={lPassword}
                            />
                        </div>
                        <div className='form-group'>
                            <input type='submit' className='btnSubmit' value='Login' />
                        </div>
                    </form>
                </div>

                <div className='col-md-6 login-form-2'>
                    <h3>Registro</h3>
                    <form onSubmit={handleRegister}>
                        <div className='mb-3'>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Nombre'
                                onChange={handleRegisterInputChange}
                                name="rName"
                                value={rName}
                            />
                        </div>
                        <div className='mb-3'>
                            <input
                                type='email'
                                className='form-control'
                                placeholder='Correo'
                                onChange={handleRegisterInputChange}
                                name="rEmail"
                                value={rEmail}
                            />
                        </div>
                        <div className='mb-3'>
                            <input
                                type='password'
                                className='form-control'
                                placeholder='Contraseña'
                                onChange={handleRegisterInputChange}
                                name="rPassword"
                                value={rPassword}
                            />
                        </div>

                        <div className='mb-3'>
                            <input
                                type='password'
                                className='form-control'
                                placeholder='Repita la contraseña'
                                onChange={handleRegisterInputChange}
                                name="rPassword2"
                                value={rPassword2}
                            />
                        </div>

                        <div className='form-group'>
                            <input type='submit' className='btnSubmit' value='Crear cuenta' />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
