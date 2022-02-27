import {Card, Button} from 'antd'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { deleteServiceById, selectService } from '../../../../store/serviceSlice/serviceSlice'

export const CardAppointment = ({id, name, date}) => {
    const dispatch = useDispatch
    const navigate = useNavigate();

    const dateC = moment(date).format('DD MMM, YYYY') 
    // const handleDelete = () => {
    //     dispatch()
    // }
    return(
        <div>
            <Card type="inner"  title={name} extra={<a href={`/service/${id}`}>Detalles</a>}>
                {`Su cita esta agendada para la fecha ${dateC}`}
                <Button style={{ marginLeft: 300}} type='primary' onClick={() => navigate('/requestservice/payment')}>IR A PAGAR</Button>
            </Card>
        </div>
        
    )
}