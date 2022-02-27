import { Services } from "../../utils/data/Services"
import { CardServices } from "./cardServices"
import { Col } from "antd"

export const ServiceUser = () => {
    return(
        <Col span={8} style={{marginTop: "100px", marginLeft: "180px", marginRight: "50px"}}>
            {Services?.map(service => <CardServices key={service.id} name={service.name} description={service.description} />)}         
        </Col>
                
    )
}