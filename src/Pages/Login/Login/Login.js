import React, { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSignInWithEmailAndPassword, useUpdatePassword } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import SocialLogin from '../SocialLogin/SocialLogin';
import { async } from '@firebase/util';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { sendPasswordResetEmail } from 'firebase/auth';
import axios from 'axios';
import { logRoles } from '@testing-library/react';

const Login = () => {

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const [updatePassword, updating] = useUpdatePassword(auth);


    const emailRef = useRef('');
    const passwordRef = useRef('');
    const navigate = useNavigate();
    const location = useLocation();

    let from = location.state?.from?.pathname || "/";
    let errorElement;

    if (error) {
        errorElement = <p className='text-danger'>Error: {error?.message} </p>
    }

    if (user) {
        navigate(from, { replace: true });
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        signInWithEmailAndPassword(email, password);
        //     const { data } = await axios.post('http://localhost:5000/login', { email });
        //     localStorage.setItem('accessToken', data.accessToken);
        //     navigate(from, { replace: true });

    }

    const navigateRegister = () => {
        navigate('/register');

    }

    const resetPassword = async () => {
        const email = emailRef.current.value;

        if (email) {
            updatePassword(email);
            toast("Email Sent");
        } else {
            toast("Enter Your Email");
        }
    }


    return (
        <div className='container w-50 mx-auto '>
            <h2 className='text-primary text-center mt-2'>This is Login</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control ref={emailRef} type="email" placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control ref={passwordRef} type="password" placeholder="Password" required />
                </Form.Group>
                <Button className='mx-auto w-100 rounded-pill' variant="primary" type="submit">
                    Login
                </Button>
                {errorElement}
                <p>New to Genius Car? <Link to={'/register'} className='test-danger text-decoration-none' onClick={navigateRegister}> Please Register</Link ></p>
                <p>Forget Password? <button className='btn btn-link text-primary text-decoration-none ' onClick={resetPassword}> Reset Password </button ></p>
            </Form>
            <SocialLogin></SocialLogin>
            <ToastContainer />
        </div>
    );
};

export default Login;