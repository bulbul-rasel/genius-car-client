import axios from 'axios';
import React, { useState } from 'react';
import { ToastContainer } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';
import useServiceDetail from '../../../hookes/useServiceDetail';

const Checkout = () => {
    const { serviceId } = useParams();
    const [service] = useServiceDetail(serviceId);

    const [user] = useAuthState(auth)

    // const [user, setUser] = useState({
    //     name: 'Akbar The Great',
    //     email: 'akbar@momo.taj',
    //     address: 'Tajmohol Road Md.pur',
    //     phone: '01711111111'
    // });

    // const handleAddressChange = event => {
    //     console.log(event.target.value);
    //     const { address, ...rest } = user;
    //     const newAddress = event.target.value;
    //     const newUser = { address: newAddress, ...rest };
    //     console.log(newUser);
    //     setUser(newUser);
    // }
    const handlePlaceholder = event => {
        event.preventDefault();
        const order = {
            email: user.email,
            service: service.name,
            serviceId: serviceId,
            address: event.target.address.value,
            phone: event.target.phone.value
        }
        axios.post('http://localhost:5000/order', order)
            .then(response => {
                const { data } = response;
                if (data.insertedId) {
                    toast('Your order is Booked')
                    event.target.reset()
                }
            })
    }
    return (
        <div className='w-50 mx-auto'>
            <h2>Please  Book : {service.name}</h2>
            <form onSubmit={handlePlaceholder}>
                <input className='w-100 mb-2' type="text" value={user.displayName} name='name' placeholder='Enter your name' required />
                <input className='w-100 mb-2' type="email" value={user.email} name='email' placeholder='Enter your email' required />
                <input className='w-100 mb-2' type="text" value={service.name} name='service' placeholder='Enter your service' required />
                <input className='w-100 mb-2' type="text" name='address' placeholder='Enter your address' required />
                <input className='w-100 mb-2' type="text" name='phone' placeholder='Enter your phone' required />
                <input className='btn btn-primary' type="submit" value="Place Order" />
                <ToastContainer></ToastContainer>
            </form>

        </div>
    );
};

export default Checkout;