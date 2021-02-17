import React from 'react';
import { useSelector } from 'react-redux';

import Redeem from '../../containers/Redeem';
import { Reducers } from '../../redux/reducers';
import { getEligibleAmountForRedeeming } from '../../services/MarketService';

export default function RedeemConnector() {
    const market = useSelector((store: Reducers) => store.market.marketDetail);
    const toRedeem = getEligibleAmountForRedeeming(market?.outcomeTokens || []);

    if (!market) {
        return <div />;
    }

    return (
        <Redeem
            amountRedeemable={toRedeem.toString()}
            market={market}
        />
    );
}
