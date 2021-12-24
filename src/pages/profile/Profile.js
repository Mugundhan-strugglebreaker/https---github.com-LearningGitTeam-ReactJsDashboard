import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../App'
import "./profile.css"

function Profile() {
    const navigate = useNavigate()
    const userDetails = useContext(UserContext)
    const [user,setUser] = useState(userDetails)
    const [updateUser,setUpdateUser] = useState(user)
    const [errors,setErrors] = useState({})
    const [isSubmit,setSubmit] = useState(false)
    const changeHandler = (e)=>{
        setUser({...user,[e.target.name]:e.target.value})
        setErrors({...errors,[e.target.name]:''})
    }
    const validate = (values) => {
        const errors = {};
        if (!values.emp_name) {
          errors.emp_name = "Name is required!";
        }
        if(!values.dept){
            errors.dept = "Department is required"
        }
        if(!values.email){
            errors.email= "Email is required"
        }
        if(!values.phone_number){
            errors.phone_number = "Phone Number is required"
        }
        return errors;
      };
    const submitHandler = (e)=>{
        e.preventDefault()
        setErrors(validate(user))
        setSubmit(true)
        setUpdateUser(user)
    }
    useEffect(()=>{
        if(Object.keys(errors).length===0 && isSubmit){
            axios.post("http://localhost:9000/update/profile",updateUser)
            .then(response=>{
                console.log(response)
                // navigate("/")
                window.location.href = "/";
                //window.location.reload("/")
            })
            .catch(err=>{
                alert('Error ',err)
                navigate("/events")
            })
        }
    },[updateUser])
    return (
        <div className='profile'>
            <h1 className='profileTitle'>Profile</h1>
            <form className='profileForm' onSubmit={submitHandler}>
                <div className='profileItem'>
                    <label>Name</label>
                    <div className='profileItemtxt'>
                        <input type='text' name="emp_name" value={user.emp_name}  onChange={changeHandler}/>
                        <p className='error'>{errors.emp_name}</p>
                    </div>
                </div>
                <div className='profileItem'>
                    <label>Department</label>
                    <div className='profileItemtxt'>
                        <input type='text' name="dept" value={user.dept} onChange={changeHandler}/>
                        <p className='error'>{errors.dept}</p>
                    </div>
                </div>
                <div className='profileItem'>
                    <label>Email</label>
                    <div className='profileItemtxt'>
                        <input type='text' name="email" value={user.email} onChange={changeHandler}/>
                        <p className='error'>{errors.email}</p>
                    </div>
                </div>
                <div className='profileItem'>
                    <label>Phone</label>
                    <div className='profileItemtxt'>
                        <input type='text' name="phone_number" value={user.phone_number} onChange={changeHandler}/>
                        <p className='error'>{errors.phone_number}</p>
                    </div>
                </div>
                <div className='profileItem'>
                    <label>Role</label>
                    <div className='profileItemtxt'>
                        <input type='text' value={user.role} disabled/>
                    </div>
                </div>
                <button className='profileSaveButton'>Save</button>
            </form>
        </div>
    )
}

export default Profile
