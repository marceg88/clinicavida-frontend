import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './registerUser.css';
import {Button, Form, Input, Upload, Image, Select} from 'antd';
import {ToTopOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { resetUserMethodsMessage, selectSignUpState, signUp } from '../../store/userSlice/userSlice';

export const RegisterForm = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, message, status } = useSelector(selectSignUpState);

    /* FORM VALIDATIONS */
    const onFinish = (values) => {
        let avatar_url
        if(values.avatar_url){
            if(values.avatar_url.status !== "removed"){
                avatar_url = values.avatar_url
            }
        }
        const data = {
            avatar_url,
            ...values
        }
        console.log(data)
        dispatch(signUp(data));
    };
    /* FORM VALIDATIONS */

    useEffect(() => {
        if (status === 'OK') {
            setTimeout(() => {
                dispatch(resetUserMethodsMessage('signUpState'));
                navigate('/login');
            }, 3500)
        }
    }, [dispatch, status, navigate]);

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.file;
    };

    return(
        <div className='Container_form_img'>
            
            
                <Form
                    className="Container_register"
                    
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    autoComplete='off'
                >
                    <Form.Item 
                        name="full_name"
                        label="Nombre"
                        style={{marginTop: 50, marginRight: 30}}
                        rules={[
                            {
                                required: true,
                                message: "El nombre es requerido para el registro.",
                            },
                            {
                                min: 3,
                                message: 'Porfavor, su nombre debe tener 2 caracteres como mínimo'
                            }
                        ]}
                    >
                        <Input placeholder="Ingrese su nombre"/>
                    </Form.Item>
                    <Form.Item 
                        name="address"
                        label="Dirección"
                        style={{marginRight: 30}}
                        rules={[
                            {
                                required: true,
                                message: "La dirección es requerida"
                            }
                        ]}
                    >
                        <Input placeholder="Ingrese su dirección"/>
                    </Form.Item>
                    <Form.Item 
                        name="email"
                        label="Correo electronico"
                        style={{marginRight: 30}}
                        rules={[
                            {
                                required: true,
                                message: "Ingrese su dirección de correo electronico"
                            }
                        ]}
                    >
                        <Input placeholder="example@test.com"/>
                    </Form.Item>
                    <Form.Item 
                        name="password"
                        label="Contraseña"
                        style={{marginRight: 30}}
                        rules={[
                            {
                                required: true,
                                message: "Ingrese una contraseña valida"
                            },
                            {
                                min: 8,
                                message: 'Se requiere 8 caracteres como mínimo!',
                            }
                        ]}
                    >
                        <Input placeholder="Contraseña minímo 8 caracteres"/>
                    </Form.Item>
                    <Form.Item 
                        name="confirmed_password"
                        style={{marginRight: 30}}
                        dependencies={["password"]}
                        label="Confirmar contraseña"
                        rules={[
                            {
                                required: true,
                                message: "Ingrese una contraseña valida"
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value){
                                    if(!value || getFieldValue('password') === value ){
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error("Las contraseñas no coinciden!"))
                                }
                            })
                        ]}
                    >
                        <Input placeholder="Confirmar contraseña"/>
                    </Form.Item>
                    <Form.Item
                        name="avatar_url"
                        wrapperCol={{
                            offset: 8,
                            span: 12,
                        }}
                        valuePropName='file'
                        getValueFromEvent={normFile}
                    >
                        <Upload
                            listType="picture"
                            maxCount={1}
                            accept=".png,.jpeg,.jpg"
                            beforeUpload={(file) => {
                                return false;
                            }}
                        >
                            <Button icon={<ToTopOutlined />}>Subir foto de perfil</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 5,
                            span: 16,
                        }}
                    >
                    <Form.Item style={{marginBottom: 30}}>
                        <Button type="primary" htmlType="submit">Registrar</Button> 
                        <Link to="/login"> o Regresar</Link>
                    </Form.Item>
                        
                    </Form.Item>
                    
                </Form>
            
                <Image style={{width: "500px"}} src='https://i.pinimg.com/564x/89/be/e6/89bee6abfa7316b2d8088fc332c72ef0.jpg' />
            
        </div>
        
    )
}