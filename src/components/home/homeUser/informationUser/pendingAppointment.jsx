import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './pendingAppointment.css';
import { Table, Radio, Divider, Button } from 'antd';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { getServices, resetUserMethodsMessage, selectGetServicesState, selectUser } from '../../../../store/userSlice/userSlice'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectService } from '../../../../store/serviceSlice/serviceSlice';
import { CardAppointment } from './cardAppointment';
const { Column } = Table;


export const PendingAppointment = () =>{
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const userId = user.id;
    const services = user.services
    // const id = services._id
    console.log('services', services)
    
    
    const { loading, message, status } = useSelector(selectGetServicesState);

    useEffect(() => {
        dispatch(getServices(userId));
    }, [dispatch, userId]);

    useEffect(() => {
        if (status === 'Failed') {
            setTimeout(() => {
                dispatch(resetUserMethodsMessage('getServicesState'));
            }, 3000);
        }
    }, [dispatch, status]);

    return(
        <div 
            className="container_list"
            // onClick={() => navigate(`/service/${id}`)}
        >
            <div className="button_appointment">
                <h2>CITAS PENDIENTES</h2>
                <Button style={{marginLeft: 410}} type="primary" onClick={() => navigate('/requestservice')}>Solicitar nuevo servicio</Button>
            </div>
            {services?.map(service => <CardAppointment id={service._id} name={service.name} date={service.date} />)}
        </div>
        
    )
}
