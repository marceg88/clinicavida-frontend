import React from 'react';
import { Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import './informationUser.css'
const { Meta } = Card;

export const InformationUser = ({data}) => {
    return(
        <Card
            style={{ width: 1300, height: 100, fontSize: "1.5rem" } }
            className='card-text'
        >
            <Meta
            
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title={data}
            description={`Bienvenido a Clinica Vida Sana, aquí podra encontrar toda la información de sus citas.`}
            />
        </Card>
    )
}