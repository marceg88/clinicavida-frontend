import { Card } from 'antd'

export const CardServices = ( name, description) => {
    return(
        <Card type="inner"  title={name} extra={<a href={'/requestservices'}>Detalles</a>}>
                {description}
            </Card>
    )
}