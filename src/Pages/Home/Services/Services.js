import React, { useEffect, useState } from 'react';
import Service from '../Service/Service';
import './Services.css'
import useServices from '../../../hookes/useServices'


const Services = () => {
    const [services] = useServices();
    // const [services, setServices] = useState([]);
    // useEffect(() => {
    //     fetch('http://localhost:5000/service')
    //         .then(res => res.json())
    //         .then(data => setServices(data));
    // }, []);
    return (
        <div id='services' className='container'>
            <div className="row">
                <h2 className='text-primary text-center mt-5 mb-3'>Our Services</h2>
                <div className='services-container'>
                    {
                        services.map(service => <Service
                            key={service._id}
                            service={service}
                        ></Service>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Services;