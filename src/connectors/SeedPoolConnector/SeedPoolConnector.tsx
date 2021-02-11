import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SeedPool from '../../containers/SeedPool';
import { SeedPoolFormValues } from '../../services/PoolService';
import { Reducers } from '../../redux/reducers';
import { seedPoolAction } from '../../redux/market/marketActions';

export default function SeedPoolConnector() {
    const dispatch = useDispatch();
    const account = useSelector((store: Reducers) => store.account.account);
    const market = useSelector((store: Reducers) => store.market.marketDetail);

    const handleSeedPool = useCallback((formValues: SeedPoolFormValues) => {
        if (!market) return;

        dispatch(seedPoolAction(market.id, market.collateralTokenId, formValues));
    }, [dispatch, market]);

    if (!market) {
        return <div />;
    }

    return (
        <SeedPool
            account={account}
            market={market}
            mainToken={market.collateralToken}
            onSeedPool={handleSeedPool}
        />
    );
}
