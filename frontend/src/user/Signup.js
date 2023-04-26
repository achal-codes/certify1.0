import React, {useState} from "react";
import Base from '../core/Base'
import { Link } from "react-router-dom";
import {signup} from "../auth/helper";

const Signup =() =>{

    //setting up state
    const [values, setValues] = useState({
        name: "",
        email:"",
        password:"",
        error:"",
        success: false
    });

    //destructuring

    const {name, email, password, error, success} = values;
    console.log(name);

    //Handling change

    const handleChange = name => event =>{
        setValues({...values, error : false, [name]: event.target.value});
    };

    const onSubmit = event => {
        event.preventDefault()
        setValues({...values, error: false})
        signup({name, email, password})
        .then(data=>{
            console.log(data);
            if(data.error){
                setValues({...values, error: data.error, success: false})
            }else{
                setValues({...values, name : "", email :"", password:"", error:"", success:true})
            }
        })
        .catch(console.log("Error in signup"));
    }

    const signUpForm = () =>{
        return(
            <div className="row">
                <div className="col-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Name</label>
                            <input className="form-control" 
                            onChange ={handleChange("name")} 
                            type ="text" 
                            value={name}
                        />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input className="form-control" 
                            onChange ={handleChange("email")}
                            type ="text" 
                            value={email}
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input className="form-control" 
                            onChange ={handleChange("password")}
                            type ="password" 
                            value={password}
                        />
                        </div>
                        <button onClick = {onSubmit} className="btn btn-success btn-block">Submit</button>
                    </form>
                </div>
            </div>
        )
    }

    const successMessage = () => {
        return(
        <div className="alert alert-success"
        style={{display: success ? "":"none"}}
        >New account was created. Please
        <Link to="/signin">Login here</Link>
        </div>
        )
    }

    const errorMessage = () => {
        return(
        <div className="alert alert-danger"
        style={{display: error ? "":"none"}}>
            {error}
        </div>)
    }

    return(
        <Base title="Sign Up" description="A page for user to Sign up">
            {successMessage()}
            {errorMessage()}            
            {signUpForm()}
            <p className="text-white text-center">{JSON.stringify(values)}</p>
            
        </Base>
    )
}

export default Signup;