import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NoWrappedNearCard from '../../containers/NoWrappedNearCard';
import { setWrappingNearDialogOpen } from '../../redux/dialogs/dialogs';
import { Reducers } from '../../redux/reducers';


export default function NoWrappedNearCardConnector() {
    const dispatch = useDispatch();
    const market = useSelector((store: Reducers) => store.market.marketDetail);
    const account = useSelector((store: Reducers) => store.account.account);

    const handleOpenDialogClick = useCallback(() => {
        dispatch(setWrappingNearDialogOpen(true));
    }, [dispatch]);

    if (!market) return null;

    return (
        <NoWrappedNearCard
            market={market}
            account={account}
            onDialogOpenClick={handleOpenDialogClick}
        />
    );
}
