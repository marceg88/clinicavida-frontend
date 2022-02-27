import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

import { selectUser } from "../store/userSlice/userSlice";

import { HomeMain } from "../components/home/homeMain/homeMain";
import { HomeUser } from "../components/home/homeUser/homeUser";
import { RequestService } from "../components/requestService/requestService";
import { EditService } from "../components/editService/editService";
import { DetailService } from "../components/detailService/detailService";
import { RegisterPaymentForm } from "../components/payments/paymentForm/registerPaymentForm/registerPaymentForm";
import { CardRegisterForm } from "../components/payments/paymentForm/cardRegisterForm/cardRegisterForm";
import {PaymentGateWay} from "../components/payments/payment/paymentGateWay"

export const PrivateRoutes = () => {
    const user = useSelector(selectUser);

    return user ? (
        <Routes>
            <Route path="/*" element={<HomeMain />} />
            <Route path="/user" element={<HomeUser />} />
            <Route path="/requestservice" element={<RequestService />} />
            {/* <Route path="/requestservice/payment" element={<PaymentGateWay/>} /> */}
            
            <Route path="/service/:serviceId" element={<DetailService />} />
            <Route path="/service/:serviceId/edit" element={<EditService />} />
        </Routes>
    )
    :
    (
        <Navigate to='/login' />
    )
}