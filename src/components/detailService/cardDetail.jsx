import { Card, Button } from "antd"
import { Navigate } from "react-router-dom"

export const CardDetail = ({full, name, date }) => {
    return(
        <Card title="Card title" bordered={false} style={{ width: 550 }} extra={<a href={`/service`}>Regresar</a>}>
                <h3>{full}</h3>
                <p>{`Tu cita para el servicio de  de  esta programada para el día `}</p>
                <p>Recuerda que debes llegar 15 minutos antes, en caso de no poder asistir
                puedes cancelar tu cita en los telefonos: 3429850-2659874 o por medio de
                la plataforma.</p>
                
        </Card>
    )
}