import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WrapNearDialog from '../../containers/WrapNearDialog';
import { loadNearBalances } from '../../redux/account/accountActions';
import { setWrappingNearDialogOpen } from '../../redux/dialogs/dialogs';
import { Reducers } from '../../redux/reducers';
import { depositWrappedNearStorage, unwrapNear, wrapNear, WrapNearFormValues } from '../../services/NearService';


export default function WrapNearDialogConnector() {
    const dispatch = useDispatch();
    const [switched, setSwitched] = useState(false);
    const isDialogOpen = useSelector((store: Reducers) => store.dialogs.isWrappingNearOpen);
    const nearToken = useSelector((store: Reducers) => store.account.nearToken);
    const wrappedNearToken = useSelector((store: Reducers) => store.account.wrappedNearToken);
    const requiredDeposit = useSelector((store: Reducers) => store.account.requiredWrappedNearDeposit);

    const handleRequestCloseDialog = useCallback(() => {
        dispatch(setWrappingNearDialogOpen(false));
    }, [dispatch]);

    useEffect(() => {
        dispatch(loadNearBalances());
    }, [dispatch, isDialogOpen]);

    const handleRequestSwitchPairs = useCallback(() => {
        setSwitched(!switched);
    }, [switched]);

    const handleSubmit = useCallback((formValues: WrapNearFormValues) => {
        if (formValues.type === 'wrap') {
            wrapNear(formValues.amountIn);
        } else {
            unwrapNear(formValues.amountIn);
        }
    }, []);

    const handleDepositClick = useCallback(() => {
        if (!requiredDeposit) return;

        depositWrappedNearStorage(requiredDeposit);
    }, [requiredDeposit]);

    if (!nearToken || !wrappedNearToken) {
        return <div />;
    }

    return (
        <WrapNearDialog
            open={isDialogOpen}
            onRequestClose={handleRequestCloseDialog}
            onSubmit={handleSubmit}
            onRequestSwitchPairs={handleRequestSwitchPairs}
            input={switched ? wrappedNearToken : nearToken}
            output={switched ? nearToken : wrappedNearToken}
            requiredDeposit={requiredDeposit ?? '0'}
            onDepositClick={handleDepositClick}
        />
    );
}
