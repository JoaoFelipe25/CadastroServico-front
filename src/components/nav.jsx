import React, {useEffect, useState} from "react";
import AuthService from '../services/auth.service'

import EventBus from '../common/event-bus'

import {Link} from "react-router-dom";

function Nav (){

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

    return(
       
        <nav className="nav-user">

            {currentUser ? (

            <div className="nav-items">

                <li className="">
                
                    <Link to={"/home"} className="">
                        <strong>{currentUser.username}</strong>  
                    </Link>

                </li>
            
                <li className="">
                    <a href="/" className="" onClick={logOut}>
                        Sair
                    </a>
                </li>
                
            </div>
            
            ) : (

                <div className="">
    
                    <li className="">
                    <Link to={"/"} className="">
                        Login
                    </Link>
                    </li>
    
                    <li className="">
                    <Link to={"/register"} className="">
                        Sign Up
                    </Link>
                    </li>
                </div>
                
                )}

        </nav>
    )

}

export default Nav