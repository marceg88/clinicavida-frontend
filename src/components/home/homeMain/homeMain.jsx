import React from 'react';
import 'antd/dist/antd.css';
import './homeMain.css'
import { Carousel, Row, Col, Card, Button } from 'antd';
import { Content, Footer } from 'antd/lib/layout/layout';
import { Link } from 'react-router-dom';
import { selectUser } from '../../../store/userSlice/userSlice';
import { useSelector } from 'react-redux';

export const HomeMain = () => {
    const user = useSelector(selectUser);

    return(
        <div>
             <Carousel className='contentStyle' autoplay>
                <div>
                    <h3>1</h3>
                </div>
                <div>
                    <h3>2</h3>
                </div>
                <div>
                    <h3>3</h3>
                </div>
                <div>
                    <h3>4</h3>
                </div>
            </Carousel>
            <Content style={{backgroundColor: "#002766", height: "550px"}}>
                <Row gutter={16} >
                    
                    <Col span={8} style={{marginTop: "100px", marginLeft: "180px", marginRight: "50px"}}>
                        {user ?
                        <Card title="Solicitar citas" bordered={false}>
                            Clinica vida esta esperandolo: 
                            <Link to="/requestservice"> Ingrese aquí para solicitar, cambiar o cancelar citas</Link>
                        </Card>
                        :
                        <Card title="Solicitar citas" bordered={false}>
                            Clinica vida esta esperandolo:
                            <Link to="/login"> Ingrese aquí para solicitar, cambiar o cancelar citas</Link>
                        </Card>
                        }
                    </Col>
                    <Col span={8} style={{marginTop: "100px", marginLeft: "50px", marginRight: "50px"}}>
                        <Card title="Horarios de atención" bordered={false}>
                        De Lunes a Viernes de 6:00a.m a 8:00pm. El servicio de urgencias lo prestamos las 24horas.
                        </Card>
                    </Col>
                </Row>
            </Content>
            <Footer style={{backgroundColor: "#d9d9d9"}}>
                <div>
                    CLINICA VIDA SANA
                </div>
                <div>
                    DIRECCIÓN: CALLE 87 # 31- 80 MEDELLÍN-ANTIOQUIA 
                </div>
                
            </Footer>
        </div>
    )
}