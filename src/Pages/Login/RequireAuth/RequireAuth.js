import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthState, useSendEmailVerification } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { toast, ToastContainer } from 'react-toastify';

const RequireAuth = ({ children }) => {
    const [sendEmailVerification, sending, error] = useSendEmailVerification(auth);
    const [user, loading] = useAuthState(auth);
    console.log('Inside Require Auth', auth);
    let location = useLocation();

    if (loading) {
        return <p>Loading...</p>
    }
    if (!user) {

        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (user.providerData[0]?.providerId === 'password' && !user.emailVerified) {
        return <div className='text-center mt-5'>
            <h3 className='text-danger'>Your Email is not verified!!</h3>
            <h5 className='text-success'> Please Verify your email address</h5>
            <button
                className='btn btn-primary'
                onClick={async () => {
                    await sendEmailVerification();
                    toast('Sent email');
                }}
            >
                Send Verification Email Again
            </button>
            <ToastContainer></ToastContainer>
        </div>
    }

    return children;
};

export default RequireAuth;