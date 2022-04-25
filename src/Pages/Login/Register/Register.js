import React, { useState } from 'react';
import './Register.css'
import { Link, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import SocialLogin from '../SocialLogin/SocialLogin';
import { async } from '@firebase/util';

const Register = () => {
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const [agree, setAgree] = useState(false);
    const navigate = useNavigate();

    if (user) {
        console.log("user", user);
    }
    const handleRegister = async (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;

        await createUserWithEmailAndPassword(email, password);
        await updateProfile({ displayName: name });
        console.log('Updated profile');
        navigate("/home")
    }
    const navigateLogin = () => {
        navigate("/login")
    }
    return (

        <div className='register-form'>
            <h2 className='text-primary text-center'>This is Register</h2>
            <form onSubmit={handleRegister}>
                <input type="text" placeholder='Enter your name' />
                <input type="email" name="email" id="" placeholder='Please Enter Email' required />
                <input type="password" name="password" id="" placeholder='Place Enter Your ePassword' required />
                <input onClick={() => setAgree(!agree)} type="checkbox" name="terms" id="terms" />
                <label className={agree ? "text-primary" : "text-danger"} htmlFor="terms"> Accept Terms and Condition</label>
                <input
                    disabled={!agree}
                    className='w-100 rounded-pill btn btn-primary'
                    type="submit"
                    value="Register" />

                <p>New to Genius Car? <Link to={'/login'} className='test-primary text-decoration-none' onClick={navigateLogin}> Please Login</Link ></p>
            </form>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Register;