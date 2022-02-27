import { Button, InputNumber, Form } from "antd"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";

import { registerCard, selectRegisterCardForm, selectRegisterCardState, setRegisterCardFormValues } from "../../../../store/epaycoSlice/epaycoSlice"
import { selectUser } from "../../../../store/userSlice/userSlice";

export const CardRegisterForm = () => {
    const dispatch = useDispatch;
    const navigate = useNavigate;
    const registerCardFormValues = useSelector(selectRegisterCardForm);
    const { id: customerId, customerPaymentId } = useSelector(selectUser)

    const onFinish = () => {
        const newValues = {};
        for(let val of registerCardFormValues){
            newValues[val] = registerCardFormValues[val].toString(); 
        }
        console.log(newValues)
        dispatch(registerCard({
            ...newValues,
            customerId,
            customerPaymentId
        }));
    }

    return(
        <Form
            name="card-register-form"
            initialValues={{
                remember: true,
            }}
            onValuesChange={nameValue => dispatch(setRegisterCardFormValues(nameValue))}
            onFinish={onFinish}
        >

            <Form.Item 
                name="number"
                label="Numero de la tarjeta"
                rules= {[
                    {
                        type: "number",
                        required: true,
                        message: "Ingrese un número de tarjeta válido"
                    }
                ]}>
                <InputNumber 
                    placeholder='4575623182290326'
                    minLength={16}
                    maxLength={16}
                    controls={false}
                />
            </Form.Item>
            <Form.Item
                name="month"
                label="mes vencimiento"
                rules={[
                    {
                        type: "number",
                        required: true,
                        message: "ingrese mes de vencimiento"
                    }
                ]}
            >
                <InputNumber 
                    min={1}
                    max={12}
                    formatter={value => `${(value > 0 && value < 10) ? '0' : ''}${value}`}
                    controls={false}
                />
            </Form.Item>
            <Form.Item
                name="expYear"
                label="año vencimiento"
                rules={[
                    {
                        type: "number",
                        required: true,
                        message: "ingrese año de vencimiento de la tarjeta"
                    }
                ]}
            >
                <InputNumber 
                    min={new Date().getFullYear()}
                    max={new Date().getFullYear() + 5}
                    controls={false}
                /> 
            </Form.Item>
            <Form.Item
                name="cvc"
                label="cvc"
                rules={[
                    {
                        type: 'number',
                        required: true,
                        message: 'Ingrese el codigo de verificación cvc',
                    },
                ]}
            >
                <InputNumber 
                    min={100}
                    max={999}
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