import React, {useState, useRef} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {isEmail} from "validator";

import {Routes, Route, Link} from "react-router-dom";

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

const validEmail = (value) => {
    if (!isEmail(value)) {
        <div className="invalid-feedback d-block">
                Email inválido
            </div>
    }
};

const validUsername = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="invalid-feedback d-block">
                Usuário deve ter entre 3 e 20 caracteres de tamanho
            </div>
        );
    }
}

const validPassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="invalid-feedback d-block">
                A senha deve ter entre 6 e 40 caracteres
            </div>
        );
    }
}

const Register = (props) => {

    const form = useRef();
    const checkBtn = useRef();

    

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleRegister = (e) => {

        e.preventDefault();

        setMessage("");
        setSuccessful(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            
            AuthService.register(username, email, password).then(
                (response) => {
                    setMessage(response.data.message);
                    setSuccessful(true);
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setMessage(resMessage);
                    setSuccessful(false);
                }
            );
        }
    };

    return (
        <div className="body-login">

            <div>

                <div className="title-login">
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro e construa sua agenda</p>
                </div>

                <div className="body-centro">
                    <img
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                        className="profile-img-card"
                    />
                    <Form onSubmit={handleRegister} ref={form}>
                        {
                            !successful && (
                                <div >
                                    <div className="form-group">
                                        <label htmlFor="username">Nome</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="username"
                                            value={username}
                                            onChange={onChangeUsername}
                                            validations={[required, validUsername]}
                                            placeholder="Nome"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="email"
                                            value={email}
                                            onChange={onChangeEmail}
                                            validations={[required, validEmail]}
                                            placeholder="Email"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password">Senha</label>
                                        <Input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            value={password}
                                            onChange={onChangePassword}
                                            validations={[required, validPassword]}
                                            placeholder="Senha"
                                        />
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <button className="btn btn-primary btn-block">Cadastrar</button>
                                    </div>
                                </div>
                            )}

                            {message && (
                            <div className="form-group">
                                <div
                                    className={
                                        successful ? "alert alert-success" : "alert alert-danger"
                                    }
                                    role="alert"
                                >
                                    {message}
                                </div>
                            </div>
                        )}

                        <CheckButton style={{ display: "none" }} ref={checkBtn} />

                        <div className="new">
                            <span className="txt"> Registrou sua conta ? </span>
                            <Link to={"/"} className="nav-re">
                                Entrar
                            </Link>
                        </div>

                        <br />

                    </Form>
                </div>
            
            </div>
        </div>
    )
};

export default Register;