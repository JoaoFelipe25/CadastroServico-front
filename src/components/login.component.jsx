import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import {Link} from "react-router-dom";

import AuthService from "../services/auth.service";

const required = (value) => {
    if (!value) {
        return (
            <div className="invalid-feedback d-block">
                Campo obrigatório
            </div>
        );
    }

};

const Login = () => {
    
    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleLogin = (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            AuthService.login(username, password).then(
                () => {
                    navigate("/home");
                    window.location.reload();
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setLoading(false);
                    setMessage(resMessage);
                }
            );
        } else {
            setLoading(false);
        }
    };

    return (

        <div className="body-login">

            <div>

                <div className="title-login">
                    <h1>Agenda de Trabalho</h1>
                    <p>Construa sua agenda e se matenha organizado</p>
                </div>
            
                <div className="body-centro">

                    <img
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                        className="profile-img-card"
                    />

                    <Form onSubmit={handleLogin} ref={form}>

                        <div>

                            <label htmlFor="username">Nome</label>
                            <Input
                                type="text"
                                className="input-login"
                                name="username"
                                value={username}
                                onChange={onChangeUsername}
                                validations={[required]}
                                placeholder='Nome'
                            />

                        </div>

                        <br />

                        <div>

                            <label htmlFor="password">Senha</label>
                            <Input
                                type="password"
                                className="input-login"
                                name="password"
                                value={password}
                                onChange={onChangePassword}
                                validations={[required]}
                                placeholder='Senha'
                            />

                        </div>

                        <br />

                        <div className="form-group">
                            <button className="button-login" disabled={loading}>
                                {loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Login</span>
                            </button>
                        </div>

                        {message && (
                            <div>
                                <div className="message" role="alert">
                                    {message}
                                </div>
                            </div>
                        )}

                        <CheckButton style={{ display: "none" }} ref={checkBtn} />

                        <div className="new-re">
                            <span className="txt">Não possui conta ? </span>
                            <Link to={"/register"} className="nav-re">
                                Criar conta
                            </Link>
                        </div>

                        <br />

                    </Form>

                </div>
            </div>
        </div>
    );
};

export default Login;
