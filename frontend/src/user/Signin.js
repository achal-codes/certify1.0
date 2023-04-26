import React, {useState} from "react";
import Base from '../core/Base'
import { Link, Navigate } from "react-router-dom";
import {signin, authenticate, isAutheticated} from "../auth/helper";

const Signin =() =>{
    const [values, setValues] = useState({
        email : "",
        password: "",
        error: "",
        loading : false,
        didRedirect : false
    });

    const {email, password, error, loading, didRedirect} = values;
    const {user} = isAutheticated();

    //Handling change

    const handleChange = name => event =>{
        setValues({...values, error : false, [name]: event.target.value});
    };

    const loadingMessage = () => {
        return (
            loading && (
                <div className="alert alert-info">
                    <h2>Loading......</h2>
                </div>
            )
        )
    }

    const errorMessage = () => {
        return(
            <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
        <div className="alert alert-danger"
        style={{display: error ? "":"none"}}>
            {error}
        </div>
        </div>
        </div>
        );
    }

    const onSubmit = event => {
        event.preventDefault();
        setValues({...values, error: false, loading: true})
        signin({email, password})
        .then(data=>{
            if(data.error){
                setValues({...values, error: data.error, loading: false})
            }
            else{
                authenticate(data, ()=>{
                    setValues({...values, didRedirect: true})
                })
            }
        }
        )
        .catch(console.log("Signin failed"))
    }
    const performRedirect = ()=>{

        // Redirection here come back
        if(didRedirect){
            if(user && user.role === 1){
                return <Navigate to="/admin/dashboard" />;
            }else{
                return <Navigate to="/user/dashboard" />;
            }

        }
        if(isAutheticated()){
            return <Navigate to="/" />
        }
    }


    const signInForm = () =>{
        return(
            <div className="row">
                <div className="col-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input 
                            value = {email}
                            onChange={handleChange("email")} 
                            className="form-control" 
                            type ="email" />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input 
                            value = {password}
                            onChange={handleChange("password")} 
                            className="form-control"
                            type ="password" />
                        </div>
                        <button onClick={onSubmit} className="btn btn-success btn-block">Submit</button>
                    </form>
                </div>
            </div>
        );
    };


    return(
        <Base title="Sign in" description="A page for user to Sign in">
        {loadingMessage()}
        {errorMessage()}
        {signInForm()}
        {performRedirect()}
        <p className="text-white text-center">{JSON.stringify(values)}</p>
        </Base>
    )
}

export default Signin;