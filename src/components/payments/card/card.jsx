import { useDispatch, useSelector } from 'react-redux';

import { selectPayment, setCurrentCard, setPaymentFormType } from "../../../store/epaycoSlice/epaycoSlice"

export const Card = ({ card, mask, name, exp_month, exp_year }) => {
    const dispatch = useDispatch();
    const { currentCard } = useSelector(selectPayment);

    const handleCardClick = () => {
        dispatch(setCurrentCard(card));
        dispatch(setPaymentFormType('registerPayment'));
    }

    return(
        <div onClick={handleCardClick}>
            <Card type="inner"  title="Tarjeta" extra={<a href={`/service/${id}`}>Detalles</a>}>
                <p>{mask}</p>
                <p>VENC: {exp_month}/{exp_year}</p>
                <p>{name}</p>
            </Card>
        </div>
    )
}