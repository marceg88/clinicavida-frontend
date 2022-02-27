import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { Layout, Menu, Button } from 'antd';
import { logout, selectUser } from '../../store/userSlice/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  LogoutOutlined,
} from '@ant-design/icons'; 
const { Header } = Layout;

export const NavBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(selectUser)

    return(
        
          <Header>
            
              <Menu 
                theme="dark" 
                mode="horizontal" 
              >
                <Menu.Item key={1}><Link to="/">INICIO</Link></Menu.Item>
                <Menu.Item key={2}><Link to="/services">SERVICIOS</Link></Menu.Item>
                <Menu.Item key={3}><Link to="/notices">NOTICIAS</Link></Menu.Item>
                {!user ?
                (<Menu.Item>
                  
                    <Button type="primary" onClick={() => navigate("/login")}>LOGIN</Button>
          
                </Menu.Item>)
                :
                (<>
                  <Menu.Item span={3} offset={8} key={4}> 
                    <Button type="secondary" >LOGIN</Button>
                  </Menu.Item>
                  <Menu.Item to="/login" onClick={() => dispatch(logout())}>
                    <i><LogoutOutlined /></i>
                  </Menu.Item>
                </>
                
                )
                }
              </Menu>
            
          </Header>
        
    )
}


