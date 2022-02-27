import { PendingAppointment } from "./informationUser/pendingAppointment"
import { InformationUser } from "./informationUser/informationUser"
import "./homeUser.css"
import { useNavigate } from "react-router-dom"

import { getServices, resetUserMethodsMessage, selectGetServicesState, selectUser } from '../../../store/userSlice/userSlice'
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useEffect } from "react"

export const HomeUser = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const userId = user.id;
    const full_name = user.full_name;
    
    const { loading, message, status } = useSelector(selectGetServicesState);
    useEffect(() => {
        dispatch(getServices(userId));
    }, [dispatch, userId]);

    useEffect(() => {
        if (status === 'Failed') {
            setTimeout(() => {
                dispatch(resetUserMethodsMessage('getServicesState'));
            }, 3000);
        }
    }, [dispatch, status]);

    return(
        <div className="container_primary">
            <div className="container_user_info">
                <div className="container_info">
                    <InformationUser data={full_name}/>
                </div>
                <PendingAppointment />
            </div>
        </div>
        
    )
}