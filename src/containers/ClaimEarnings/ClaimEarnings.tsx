import React, { ReactElement } from 'react';
import Button from '../../components/Button';
import { MarketViewModel } from '../../models/Market';
import { PoolToken } from '../../models/PoolToken';
import { formatCollateralToken } from '../../services/CollateralTokenService';
import trans from '../../translation/trans';

import s from './ClaimEarnings.module.scss';
import FinalizedMarketOutcomes from './components/FinalizedMarketOutcomes';
import { calculatePayout } from './services/calculatePayout';

interface Props {
    poolToken?: PoolToken;
    market: MarketViewModel;
    onClaim: () => void;
}

export default function ClaimFees({
    poolToken,
    market,
    onClaim,
}: Props): ReactElement {
    const hasBalance = market.outcomeTokens.some(token => token.balance !== '0');
    // const payout = calculatePayout(market.outcomeTokens, market.payoutNumerator, poolToken);

    return (
        <div>
            {market.invalid && (
                <p>{trans('market.claimEarnings.invalidMarket')}</p>
            )}

            {!market.invalid && (
                <>
                    <p>
                        {trans('market.claimEarnings.validMarket')}
                    </p>
                    <FinalizedMarketOutcomes market={market} />
                </>
            )}

            {market.claim && (
                <p>
                    {trans('market.claimEarnings.alreadyClaimed', {
                        payout: market.claim.payoutFormatted,
                        tokenName: market.collateralToken.tokenName,
                    })}
                </p>
            )}

            {!market.claim && poolToken && (
                <p>
                    {trans('exitPool.label.feesEarned', {
                        amount: formatCollateralToken(poolToken.fees, market.collateralToken.decimals, 8),
                    })}
                </p>
            )}

            <Button disabled={!poolToken || !hasBalance || Boolean(market.claim)} onClick={onClaim} className={s.confirm}>
                {trans('market.action.claimEarnings')}
            </Button>
        </div>
    );
}
