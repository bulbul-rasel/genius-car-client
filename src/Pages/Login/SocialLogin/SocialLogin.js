import React from 'react';
import glogo from '../../../images/glogo.png'
import flogo from '../../../images/facebook.png'
import gitlogo from '../../..//images/github.png'
import { useSignInWithGoogle, useSignInWithGithub, useSignInWithFacebook } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { useLocation, useNavigate } from 'react-router-dom';

const SocialLogin = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const [signInWithGithub, user1, loading1, error1] = useSignInWithGithub(auth);
    const [signInWithFacebook, user2, loading2, error2] = useSignInWithFacebook(auth);
    const navigate = useNavigate();
    let errorElement;
    const location = useLocation();

    let from = location.state?.from?.pathname || "/";

    if (error || error1 || error2) {
        errorElement = <p className='text-danger'>Error: {error?.message}  {error1?.message}</p>
    }
    if (loading || loading1 || loading2) {
        return <p>Loading...</p>
    }
    if (user || user1 || user2) {
        navigate(from, { replace: true });
    }
    return (
        <div>
            <div className='d-flex align-items-center'>
                <div style={{ height: "1px" }} className='w-50 bg-primary'></div>
                <p className='mb-2 mx-2'>or</p>
                <div style={{ height: "1px" }} className='w-50 bg-primary'></div>
            </div>
            <div>
                {errorElement}
                <button
                    onClick={() => signInWithGoogle()}
                    className='btn btn-info w-100 rounded-pill mb-3'>
                    <img style={{ width: "30px" }} src={glogo} alt="" />
                    Google Sign in
                </button>
                <button
                    onClick={() => signInWithFacebook()}
                    className='btn btn-primary w-100 rounded-pill mb-3'>
                    <img style={{ width: "30px" }} src={flogo} alt="" />
                    FaceBook Sign in
                </button>
                <button
                    onClick={() => signInWithGithub()}
                    className='btn btn-dark w-100 rounded-pill'>
                    <img style={{ width: "30px" }} src={gitlogo} alt="" />
                    GitHub Sign in
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;