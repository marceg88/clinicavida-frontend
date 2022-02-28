import { Footer } from "antd/lib/layout/layout"
import "./footer.css"
export const FooterApli = () => {
    return(
        <div className="footer_ubi">
            <Footer style={{backgroundColor: "#d9d9d9", width: 1500}}>
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