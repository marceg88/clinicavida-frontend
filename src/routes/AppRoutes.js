import {Navigate, BrowserRouter, Routes, Route} from 'react-router-dom'
// import { NavBar } from '../components/Navbar/navBar'
// import {HomeMain} from '../components/home/main/homeMain'
// import { LoginForm } from '../components/login/login'
import { RegisterForm } from '../components/registerUser/registerUser'
import { NavBar } from '../components/Navbar/NavBar'
import { LoginForm } from '../components/loginUser/loginUser'
import { HomeMain } from '../components/home/homeMain/homeMain'
import { HomeUser } from '../components/home/homeUser/homeUser'
import { RequestService } from '../components/requestService/requestService'
import { useSelector } from 'react-redux'
import { selectUser } from '../store/userSlice/userSlice'
import { PrivateRoutes } from './PrivateRoutes'
import { PublicRoutes } from './PublicRoutes'
import { CardServices } from '../components/servicesUser/cardServices'
import { CardRegisterForm } from '../components/payments/paymentForm/cardRegisterForm/cardRegisterForm'
import { RegisterPaymentForm } from '../components/payments/paymentForm/registerPaymentForm/registerPaymentForm'

export const AppRoutes = () => {
    const user = useSelector(selectUser)
    return (
        <BrowserRouter>
            <header>
                <NavBar />
            </header>
            <main>
                <Routes>
                    <Route path='/login' element={
                        <PublicRoutes>
                            <LoginForm />
                        </PublicRoutes>
                    }
                    />
                    <Route path='/login/:tokenActivateUser' element={<LoginForm />} />
                    <Route path="/register" element={
                        <PublicRoutes>
                            <RegisterForm />
                        </PublicRoutes>
                    }
                    />
                    <Route path='/*' element={<PrivateRoutes />} />
                    
                    
                    
                    <Route path="/" element={<HomeMain />}/>
                    <Route path="/services" element={<CardServices />}/>
                </Routes>
                
            </main>    
                    
               
        </BrowserRouter>
    )
}