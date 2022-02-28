import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./requestService.css"
import { selectUser } from "../../store/userSlice/userSlice";
import { registerService, resetServiceMethodsMessage, selectRegisterServiceState } from "../../store/serviceSlice/serviceSlice";
import { Form, Select, DatePicker, Button, Image } from "antd"
import {SwapLeftOutlined} from "@ant-design/icons"
import { RequestServiceModal } from "./requestServiceModal";
import { Modal } from 'antd'


export const RequestService = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id: patient, full_name} = useSelector(selectUser)
    const { loading, message, status } = useSelector(selectRegisterServiceState); 
    
    const onFinish = (values) => {
        const data = {
            ...values,
            patient
        }
        console.log(data)
        dispatch(registerService(data))
    }

    useEffect(() => {
        if (status === 'OK') {
          setTimeout(() => {
            dispatch(resetServiceMethodsMessage('registerServiceState'));
            navigate(-1);
          }, 2000);
        }
      }, [dispatch, status, navigate])

    return(
        
        <div className="container_image_form">
            
                <div>
                    <h1>Bienvenid@, {full_name}</h1>
                    <p>En este lugar encontrara la información de las citas programadas</p>
                    <Form
                        className="service_container"
                        labelCol={{
                            span: 12,
                        }}
                        wrapperCol={{
                            span: 18,
                        }}
                        
                        layout="horizontal"
                        onFinish={onFinish}
                    >
            
            
                    <Form.Item 
                        label="Selecciona el servicio"
                        style={{ color: "white", fontSize: 1.5 }}
                        name="name"
                        rules={[
                            {
                                required:true,
                                message: "Seleccione un servicio"
                            }
                        ]}
                    >
                        <Select placeholder="Seleccione un servicio">
                            <Select.Option value="Medico general">Medico general</Select.Option>
                            <Select.Option value="Toma de muestra">Toma de muestras</Select.Option>
                            <Select.Option value="Urgencias">Urgencias</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item 
                        label="Selecciona fecha"
                        name="date"
                        rules={[
                        {
                            required: true,
                            message: 'Porfavor, selecciona una fecha!',
                        }
                        ]}
                    >
                        <DatePicker 
                            style={{ width: "100%" }}
                            placeholder="Fecha de la cita"
                        />
                    </Form.Item>
                    <p className='error-message mb-2'>{message}</p>
                    <Form.Item 
                        
                        wrapperCol={{
                            span: 24,
                        }}
                    >
                        <Button style={{marginLeft: "120px"}} type="primary" htmlType="submit" >
                            AGENDAR
                        </Button>
                        <Link to="/user"><i style={{marginLeft: "100px"}}><SwapLeftOutlined /> Ir al perfil </i></Link>
                    </Form.Item>
                </Form>
            </div>
            <Image style={{width: "450px"}} src="https://i.pinimg.com/564x/6a/a1/14/6aa11421e1a46d63f3b5b60604808dd5.jpg">
                    
            </Image>
        </div>
            
    )
}