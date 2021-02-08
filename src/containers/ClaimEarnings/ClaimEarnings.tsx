import React, { ReactElement } from 'react';
import Button from '../../components/Button';
import { MarketViewModel } from '../../models/Market';
import trans from '../../translation/trans';

import s from './ClaimEarnings.module.scss';
import FinalizedMarketOutcomes from './components/FinalizedMarketOutcomes';

interface Props {
    market: MarketViewModel;
    onClaim: () => void;
}

export default function ClaimFees({
    market,
    onClaim,
}: Props): ReactElement {
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

            <Button onClick={onClaim} className={s.confirm}>
                {trans('market.action.claimEarnings')}
            </Button>
        </div>
    );
}
