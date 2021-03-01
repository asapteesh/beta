import React, { ReactElement } from 'react';
import trans from '../../../../translation/trans';
import Overview from "./../../../../components/Overview";
import Big from 'big.js';
import { MarketViewModel } from '../../../../models/Market';
import { formatCollateralToken } from '../../../../services/CollateralTokenService';

interface Props {
    market: MarketViewModel,
    amountRedeemable: string
}

export default function SwapOverview({
    market,
    amountRedeemable
}: Props ): ReactElement {
    const totalAvgPrice = market.outcomeTokens.reduce((sum, token) => {
        const spent = new Big(token.spent);
        const balance = new Big(token.balance);
        if (!balance || balance.eq("0")) {
            return sum;
        }

        const avgSpent = spent.div(balance);
        return sum.add(avgSpent);
    }, new Big("0"));

    const data = []
    if (totalAvgPrice.gt("1")) {

        // Claimable if invalid
        const priceDelta = totalAvgPrice.minus("1");
        const toEscrow = new Big(amountRedeemable).mul(priceDelta);
        const formattedToEscrow = formatCollateralToken(toEscrow.toString(), market.collateralToken.decimals);
        data.push(...[
            {
                key: trans('redeem.overview.escrowInvalid'),
                value: `${formattedToEscrow} ${market.collateralToken.tokenSymbol}`
            },
            {
                key: trans('redeem.overview.paidNow'),
                value: `${formatCollateralToken(new Big(amountRedeemable).toString(), market.collateralToken.decimals)}`
            }
        ]);
    } else if (totalAvgPrice.lt("1")) {
        // Claimable if valid
        const priceDelta = new Big("1").minus(totalAvgPrice);
        const toEscrow = new Big(amountRedeemable).mul(priceDelta);
        const formattedToEscrow = formatCollateralToken(toEscrow.toString(), market.collateralToken.decimals);

        data.push(...[
            {
                key: trans('redeem.overview.escrowValid'),
                value: `~${formattedToEscrow} ${market.collateralToken.tokenSymbol}`
            },
            {
                key: trans('redeem.overview.paidNow'),
                value: `${formatCollateralToken(new Big(amountRedeemable).minus(toEscrow).toString(), market.collateralToken.decimals)}`
            }
        ]);
    }

    return <Overview data={data} header={trans('market.label.overview', {}, true)} />;
}
