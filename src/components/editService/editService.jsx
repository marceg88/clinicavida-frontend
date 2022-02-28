import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import '../requestService/requestService.css'
import { selectUser } from "../../store/userSlice/userSlice";
import { getServiceById, resetServiceMethodsMessage, selectService, selectUpdateServiceState, updateServiceById } from "../../store/serviceSlice/serviceSlice";
import { Form, Select, DatePicker, Button, Image } from "antd"
import {SwapLeftOutlined} from "@ant-design/icons"

export const EditService = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { serviceId } = useParams();
    const {id: patient, full_name} = useSelector(selectUser)
    const services = useSelector(selectUser);  
    // const {name} = services.name
    const { loading, status, message } = useSelector(selectUpdateServiceState);
    console.log(services)
    useEffect(() => {
        dispatch(getServiceById(serviceId))
    }, [dispatch, serviceId]);

    useEffect(() => {
        if (status === 'OK') {
            setTimeout(() => {
                dispatch(resetServiceMethodsMessage('updateServiceState'));
                navigate(`/user`);
            }, 2500);
        }
    }, [dispatch, status, navigate, serviceId])
    
    const onFinish = async (values) => {
        
        const data = {
            serviceId,
            newData: {
                ...values,
            }
        };
        dispatch(updateServiceById(data));
    };

    return(
    
        <div className="container_update">
            
                <div>
                    <h1>{full_name}</h1>
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
                        name="name"
                        initialValue={services.name}
                        rules={[
                            {
                                required:true,
                                message: "Seleccione un servicio"
                            }
                        ]}
                    >
                        <Select>
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
                        <Button style={{marginLeft: "20px"}} type="primary" htmlType="submit">EDITAR</Button>
                        <Link to="/user"><i style={{marginLeft: "50px"}}><SwapLeftOutlined /> Regresar </i></Link>
                    </Form.Item>
                </Form>
            </div>
            <div>
               
            </div>
            <Image style={{width: "500px"}} src="https://i.pinimg.com/564x/22/c2/81/22c28174cfa1b7f9318c0456607b7f9a.jpg">
                    
            </Image>
        </div>
    )
}