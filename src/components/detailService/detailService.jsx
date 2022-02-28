import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import './detailService.css'
import moment from 'moment';

import { selectService, getServiceById, deleteServiceById } from "../../store/serviceSlice/serviceSlice";
import { selectUser } from "../../store/userSlice/userSlice";
import { Button, Card, Image } from "antd"

import { CardDetail } from "./cardDetail";

export const DetailService = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { serviceId } = useParams();
    const user = useSelector(selectUser);
    const userId = user.id;
    const full_name = user.full_name
    console.log(serviceId)
    const services = useSelector(selectUser)
    const { name, date} = services
    // const dateM = moment(date).format('DD-MMM, YYYY') 
    console.log('detalle', services)  
    
    useEffect(() => {
        dispatch(getServiceById(serviceId))
    }, [dispatch, serviceId]);

    const handleDelete = () => {
        dispatch(deleteServiceById(serviceId));
        navigate('/user');
    }

    return(
        <div className="container_detail_service">
            <div className="detail_container">
                <CardDetail full={full_name} name={name} date={date}  />)
                <div className="button_edit">
                    <Button type="primary" onClick={() => navigate(`/service/${serviceId}/edit`)}>EDITAR</Button> 
                    <Button style={{marginLeft:380}} type="primary" onClick={handleDelete}>ELIMINAR</Button>
                </div>
            </div>
            <div>
                <Image style={{width: 450, marginTop: 120, marginLeft: 100}} src="https://i.pinimg.com/564x/fd/75/c3/fd75c30daa24046520cca39d8d517929.jpg"></Image>
            </div>
            
        </div>  
        
    )
}