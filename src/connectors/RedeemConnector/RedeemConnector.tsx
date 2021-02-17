import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';

import Redeem from '../../containers/Redeem';
import { Reducers } from '../../redux/reducers';
import { burnOutcomeTokensRedeemCollateral, getEligibleAmountForRedeeming } from '../../services/MarketService';

export default function RedeemConnector() {
    const market = useSelector((store: Reducers) => store.market.marketDetail);
    const toRedeem = getEligibleAmountForRedeeming(market?.outcomeTokens || []);

    const handleRedeemClick = useCallback(() => {
        if (!market) return;

        burnOutcomeTokensRedeemCollateral(market.id, toRedeem.toString());
    }, [market, toRedeem]);

    if (!market) {
        return <div />;
    }

    return (
        <Redeem
            amountRedeemable={toRedeem.toString()}
            market={market}
            onRedeemClick={handleRedeemClick}
        />
    );
}
