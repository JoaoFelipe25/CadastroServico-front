import React from "react";
import {Routes, Route} from "react-router-dom";
import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./components/login.component"
import Register from "./components/register.component";
import Formulario from "./components/Formulario";

import './styles/login.css'

const App = () => {

  return (

    <div>

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


