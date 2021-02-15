import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ExitPool from '../../containers/ExitPool';
import { ExitPoolFormValues } from '../../containers/ExitPool/services/createDefaultExitPoolFormValues';
import { exitPoolAction } from '../../redux/market/marketActions';
import { Reducers } from '../../redux/reducers';


export default function ExitPoolConnector() {
    const poolToken = useSelector((store: Reducers) => store.market.poolTokenBalance);
    const market = useSelector((store: Reducers) => store.market.marketDetail);
    const dispatch = useDispatch();

    const handleExitPool = useCallback((formValues: ExitPoolFormValues) => {
        if (!poolToken) return;

        dispatch(exitPoolAction(poolToken.marketId, formValues.amountIn));
    }, [poolToken, dispatch]);

    if (!poolToken || !market) {
        return <div />
    }

    return (
        <ExitPool
            poolToken={poolToken}
            market={market}
            onExitPool={handleExitPool}
        />
    );
}
