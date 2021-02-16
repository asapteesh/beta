import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WrapNearDialog from '../../containers/WrapNearDialog';
import { loadNearBalances } from '../../redux/account/accountActions';
import { setWrappingNearDialogOpen } from '../../redux/dialogs/dialogs';
import { Reducers } from '../../redux/reducers';


export default function WrapNearDialogConnector() {
    const dispatch = useDispatch();
    const isDialogOpen = useSelector((store: Reducers) => store.dialogs.isWrappingNearOpen);
    const nearToken = useSelector((store: Reducers) => store.account.nearToken);
    const wrappedNearToken = useSelector((store: Reducers) => store.account.wrappedNearToken);

    const handleRequestCloseDialog = useCallback(() => {
        dispatch(setWrappingNearDialogOpen(false));
    }, [dispatch]);

    useEffect(() => {
        dispatch(loadNearBalances());
    }, [dispatch, isDialogOpen]);

    if (!nearToken || !wrappedNearToken) {
        return <div />;
    }

    return (
        <WrapNearDialog
            open={isDialogOpen}
            onRequestClose={handleRequestCloseDialog}
            onSubmit={() => {}}
            input={nearToken}
            output={wrappedNearToken}
        />
    );
}
