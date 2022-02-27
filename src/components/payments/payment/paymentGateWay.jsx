import { useSelector } from "react-redux";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { CardRegisterForm } from "../paymentForm/cardRegisterForm/cardRegisterForm"
import { RegisterPaymentForm } from "../paymentForm/registerPaymentForm/registerPaymentForm"

import { selectService } from "../../../store/serviceSlice/serviceSlice";
import { selectPayment, selectRegisterCardState, selectRegisterPaymentState,  } from "../../../store/epaycoSlice/epaycoSlice";
import { useEffect } from "react";
import { CardList } from "../cardList/cardList";

export const PaymentGateWay = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const services = useSelector(selectService);
    const { formType } = useSelector(selectPayment);
    const registerCardState = useSelector(selectRegisterCardState);
    const registerPaymentState = useSelector(selectRegisterPaymentState);
    // const serviceState = useSelector(selectServiceState);

    useEffect(() => {
        if (registerCardState.status) {
            setTimeout(() => {
                dispatch(resetPaymentMethods('registerCardState'));
            }, 4000)
        }
    }, [dispatch, registerCardState]);

    useEffect(() => {
        if (registerPaymentState.status) {
            setTimeout(() => {
                dispatch(resetPaymentMethods('registerPaymentState'));
            }, 4000)
        }
    }, [dispatch, registerPaymentState])

    // useEffect(() => {
    //     if (serviceState.status) {
    //         setTimeout(() => {
    //             dispatch(resetServiceMethods('requestServiceState'));
    //         }, 4000)
    //     }
    // }, [dispatch, requestServiceState])

    // useEffect(() => {
    //     if (serviceState.status === 'OK') {
    //         dispatch(setCurrentCard(null));
    //         dispatch(setServiceSelected(null));
    //         dispatch(setService(null));
    //         navigate('/services');
    //     }
    // }, [dispatch, requestServiceState, navigate])

    return(
        <div>
            <CardList />
                {formType === 'registerCard' && <CardRegisterForm />}
                {formType === 'registerPayment' && <RegisterPaymentForm />}
        </div>
    )
}