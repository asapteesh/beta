import React, { ReactElement } from 'react';
import Big from "big.js";
import { MarketViewModel } from '../../../../models/Market';
import { PoolToken } from '../../../../models/PoolToken';
import Overview from '../../../../components/Overview';


interface ExitOverviewProps {
    market: MarketViewModel
    poolToken: PoolToken
}

export default function ExitOverview({
    market,
    poolToken
}: ExitOverviewProps): ReactElement {
    console.log(poolToken);
    console.log(market)

    const poolTokenTotalSupply = new Big(market.poolTokenInfo.totalSupply);
    const userPoolTokenBalance = new Big(poolToken.balance);
    const relativeBal = userPoolTokenBalance.div(poolTokenTotalSupply);

    return (
        <Overview data={[{key: "test", value: "test"}]} />
    )
}
