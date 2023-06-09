import React, {useState} from 'react';
import Base from '../core/Base';
import { isAutheticated } from '../auth/helper';
import { Link } from 'react-router-dom';
import { createCategory } from './helper/adminapicall';

const AddCategory = () => {
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const {user, token} = isAutheticated();

    const handleChange = event => {
        setError("");
        setName(event.target.value)

    };
    const onSubmit = event =>{
        
        event.preventDefault();
        setError("");
        setSuccess(false)
        // console.log(user)
        createCategory(user._id, token, {name}).then(data => {
            if(data.error){
                setError(true);
            }else{
                setError("");
                setSuccess(true);
                setName("")
                
            }
        })

    }

    const successMessage = () =>{
        if(success){
            return <h4 className='text-success'>Event was created successfully</h4>
        }
    }

    const warningMessage = () =>{
        if(error){
            return <h4 className='text-success'>Event creation failed</h4>
        }
    }

    const myCategoryForm = () =>(
        <form>
            <div className='form-group'>
                <p className='lead'> Enter the event name</p>
                <input
                type="text"
                className='form-control my-3'
                onChange={handleChange}
                value={name}
                autoFocus
                required
                placeholder='For Ex. CSE'
                />
                <button onClick={onSubmit} className='btn btn-outline-info'>Create Event</button>
            </div>
        </form>
    )
    return (       



        <Base title='Create event' 
        description='To create new event enter the event name '
        className='container bg-info p-4'
        > 
            <div className='row bg-white rounded'>
                <div className='col-md-8 offset-md-2'>
                    {successMessage()}
                    {warningMessage()}
                    {myCategoryForm()}
                    
                </div>
            </div>        
        
        </Base>

    )

}

export default AddCategory;