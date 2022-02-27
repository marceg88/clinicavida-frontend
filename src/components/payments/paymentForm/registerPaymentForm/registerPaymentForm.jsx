import { Form, InputNumber, Input, Button } from 'antd'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { registerPayment, selectPayment, selectRegisterCardState, selectRegisterPaymentState, setCurrentCard, setPaymentFormType } from '../../../../store/epaycoSlice/epaycoSlice';
import { registerService, selectServiceState, selectService, setService } from '../../../../store/serviceSlice/serviceSlice';
import { selectUser } from '../../../../store/userSlice/userSlice';

export const RegisterPaymentForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id: customerId } = useSelector(selectUser)
    const { currentCard } = useSelector(selectPayment);
    // const {name} = useSelector(selectService);
    // const registerCardState = useSelector(selectRegisterCardState);
    // const registerPaymentState = useSelector(selectRegisterPaymentState);
    // const serviceState = useSelector(selectServiceState);

    
    const onFinish = (values) => {
        const finalValues = {
            ...values,
            customerId,
            cardToken: currentCard.id,
            // ...service,
            docNumber: values.docNumber.toString()
        }
        console.log(finalValues)

        dispatch(registerPayment(finalValues));
    }
    // useEffect(() => {
    //     if (registerPaymentState.status === 'OK') {
    //         dispatch(service({
    //             name: service.name,
    //             date: service.date,
    //             price: 150000   
    //         }))
    //     }
    // }, [registerPaymentState, dispatch, serviceSelected]);

    return(
        <Form
            name="card-register-form"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
        >

            <Form.Item 
                name="name"
                label="Nombre titular de la tarjeta"
                rules= {[
                    {
                        required: true,
                        message: "Ingrese el nombre"
                    }
                ]}>
                <Input placeholder="Nombre"
                />
            </Form.Item>
            <Form.Item 
                name="lastName"
                label="Primer apellido"
                rules= {[
                    {
                        required: true,
                        message: "Ingrese el apellido"
                    }
                ]}>
                <Input placeholder="Apellido"
                />
            </Form.Item>
            <Form.Item
                name="email"
                label="Ingrese el email"
                rules={[
                    {
                        required: true,
                        message: "ingrese su correo electronico"
                    }
                ]}
            >
                <Input placeholder="example@test.com" />
            </Form.Item>
            <Form.Item
                name="docNumber"
                label="Ingrese el número de documento de identificación"
                rules={[
                    {
                        required: true,
                        message: "ingrese su número de identificación"
                    }
                ]}
            >
                <InputNumber
                    placeholder="Cedula ciudadania"
                    min={10000000}
                    max={9999999999}
                    minLength={8}
                    maxLength={10}
                    controls={false}
                /> 
            </Form.Item>
            <Form.Item>
                <Button type="submit">AGREGAR</Button>
                <Button >CANCELAR</Button>
            </Form.Item>
        </Form>
    )
}