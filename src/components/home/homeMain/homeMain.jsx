import React from 'react';
import 'antd/dist/antd.css';
import './homeMain.css'
import { Carousel, Row, Col, Card, Button, Image } from 'antd';
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
                <h3><Image style={{width: 800, height: 300}} src="https://i.pinimg.com/564x/fd/75/c3/fd75c30daa24046520cca39d8d517929.jpg"></Image></h3>
                </div>
                <div>
                    <h3><Image style={{width: 800, height: 300}} src="https://i.pinimg.com/564x/b2/db/92/b2db92ea5db352e910fcf7da2a6ac8f4.jpg"></Image></h3>
                </div>
                <div>
                    <h3><Image style={{width: 800, height: 300}} src='https://i.pinimg.com/564x/11/72/99/117299cac9663cabf16d2ba3adef87bd.jpg'></Image></h3>
                </div>
                <div>
                    <h3><Image style={{width: 800, height: 300}} src="https://i.pinimg.com/564x/79/0d/04/790d04355a61b3a40e9ad28fd71ea4fd.jpg"></Image></h3>
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
           
        </div>
    )
}