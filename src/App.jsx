import React, {useEffect, useState} from "react";
import {Routes, Route, Link} from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component"
import Register from "./components/register.component";
import Formulario from "./components/Formulario";

import EventBus from "./common/event-bus";

import './styles/login.css'

const App = () => {

  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user){
      setCurrentUser(user);
    }

    EventBus.on("logout", () => {
      logOut();
    });


  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  }

  return (

    <div>
      
      {/* <nav className="navbar navbar-expand">

        {currentUser ? (
          <div className="navbar-nav ml-auto">

            <li className="nav-item">
              
              <Link to={"/"} className="nav-link">
                <strong>{currentUser.username}</strong>  
              </Link>
            </li>
          
            <li className="nav-item">
              <a href="/logout" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
            
          </div>
        ) : (

          <div className="navbar-nav ml-auto">

            <li className="nav-item">
              <Link to={"/"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}

      </nav> */}

      <div>

          <Routes>
            <Route exact path={"/home"} element={<Formulario />} />
            <Route exact path="/" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
          </Routes>

      </div>

    </div>
  )
}

export default App;


