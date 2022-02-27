import { Card } from "../card/card";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectPayment } from '../../../store/epaycoSlice/epaycoSlice';
import { getUserCardData, resetUserMethodsMessage, selectGetUserCardData, selectUser } from "../../../store/userSlice/userSlice"

export const CardList = () => {
    const dispatch = useDispatch();
    const { id: userId, cards } = useSelector(selectUser);
    const { formType } = useSelector(selectPayment);
    const { loading, status, message } = useSelector(selectGetUserCardData);

    useEffect(() => {
        dispatch(getUserCardData(userId));
    }, [dispatch, userId, formType]);

    useEffect(() => {
        if (status) {
            setTimeout(() => {
                dispatch(resetUserMethodsMessage('getUserCardData'));
            }, 4000);
        }
    }, [dispatch, status]);
    return(
        <div>
            {cards?.map(card => <Card key={card.id} card={card} {...card.card}/>)}
        </div>

    )
}