import 'antd/dist/antd.css';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { HomeMain } from './components/home/homeMain/homeMain';
import { HomeUser } from './components/home/homeUser/homeUser';
import { InformationUser } from './components/home/homeUser/informationUser/informationUser';
import { PendingAppointment } from './components/home/homeUser/informationUser/pendingAppointment';
import { LoginForm } from './components/loginUser/loginUser';
import { NavBar } from './components/Navbar/NavBar';
import { RegisterForm } from './components/registerUser/registerUser';
import { RequestService } from './components/requestService/requestService';
import { ServiceUser } from './components/servicesUser/serviceUser';
import { AppRoutes } from './routes/AppRoutes';

function App() {
  return (
    <div className="App">
      <AppRoutes />
      {/* <NavBar/> */}
      {/* <LoginForm /> */}
      {/* <HomeMain /> */}
      {/* <InformationUser /> */}
      {/* <PendingAppointment /> */}
      {/* <HomeUser /> */}
      {/* <RequestService /> */}
      {/* <ServiceUser /> */}
    </div>
  );
}

export default App;
