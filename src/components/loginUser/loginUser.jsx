import React from 'react';
import 'antd/dist/antd.css';
import "./loginUser.css"

import { Form, Input, Button, Checkbox } from 'antd';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { selectEmailVerifyState, selectSignInState, signIn, verifyEmail, resetUserMethodsMessage } from '../../store/userSlice/userSlice';

export const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {tokenActivate} = useParams();
    const {loading, message} = useSelector(selectSignInState);
    const verifyEmailState = useSelector(selectEmailVerifyState);

    const onFinish = (values) => {
        const { email, password } = values
        console.log('Success:', values);
        dispatch(signIn({ email, password }))
        
    };
  
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        if (tokenActivate) {
            dispatch(verifyEmail(tokenActivate));
            navigate('/login');
        }
    }, [dispatch, tokenActivate, navigate]);

    useEffect(() => {
        if (verifyEmailState.status) {
            setTimeout(() => {
                dispatch(resetUserMethodsMessage('verifyEmailState'));
            }, 4000);
        }
    }, [dispatch, verifyEmailState])

    return (
        <div>
                <Form
                        className='login_center'
                        labelCol={{
                            span: 4,
                        }}
                        wrapperCol={{
                            span: 18,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                    <Form.Item
                        label="Email"
                        name="email"
                        style={{marginTop: 70}}
                        rules={[
                        {
                            required: true,
                            message: 'Por favor ingrese su email!',
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                        {
                            required: true,
                            message: 'Por favor ingrese contraseña!',
                        },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{
                        offset: 5,
                        span: 16,
                        }}
                    >
                        <Checkbox >Recordarme</Checkbox>
                    </Form.Item>
                    <p className='error-message mb-2'>{message}</p>
                    <Form.Item
                        wrapperCol={{
                        offset: 5,
                        span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit" >
                        INGRESAR
                        </Button>
                        <Link to="/register"> o Registrarse</Link>
                    </Form.Item>
                </Form>
        </div>
    ); 
};

