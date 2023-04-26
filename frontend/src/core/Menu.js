import React, {Fragment} from "react";
import {Link, useNavigate} from 'react-router-dom';
import { signout, isAutheticated} from "../auth/helper";

const Menu = () => {
    const navigate = useNavigate();
    
    return (
    <div>
        <ul className="nav nav-tabs bg-dark">
            <li className="nav-item">
                <Link className="nav-link text-white" to ="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link text-white" to ="/cart">Cart</Link>
            </li>
            
            {isAutheticated() && isAutheticated().user.role === 0 && (
            <li className="nav-item">
                <Link className="nav-link text-white" to ="/user/dashboard">Dashboard</Link>
            </li>
            )}

            {isAutheticated() && isAutheticated().user.role === 1 && (
            <li className="nav-item">
                <Link className="nav-link text-white" to ="/admin/dashboard">A. Dashboard</Link>
            </li>
            )}

            {!isAutheticated() && (
            <Fragment>
            <li className="nav-item">
                <Link className="nav-link text-white" to ="/signup">Sign Up</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link text-white" to ="/signin">Sign in</Link>
            </li>
            </Fragment>
            )}

            

            {isAutheticated() &&(
            <li className="nav-item">
            
                <span 
                className="nav-link text-warning"
                onClick={ ()=> {
                    signout(()=>{
                        navigate.push("/");
                    });
                }}
                >Sign Out
                </span>
            </li>
            )}

        </ul>

    </div>
)};
 
export default (Menu);