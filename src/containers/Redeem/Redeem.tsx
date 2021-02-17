import React from 'react';
import FluxSdk from '@fluxprotocol/amm-sdk';
import Button from '../../components/Button';
import { MarketViewModel } from '../../models/Market';
import trans from '../../translation/trans';

import s from './Redeem.module.scss';

export interface Props {
    amountRedeemable: string;
    market: MarketViewModel;
}

export default function Redeem({
    market,
    amountRedeemable,
}: Props) {
    return (
        <div>
            <p>
                {trans('redeem.description', {
                    amount: FluxSdk.utils.formatToken(amountRedeemable, market.collateralToken.decimals),
                    tokenSymbol: market.collateralToken.tokenSymbol,
                })}
            </p>
            <Button className={s.confirmButton}>
                {trans('redeem.action.submit', {
                    amount: FluxSdk.utils.formatToken(amountRedeemable, market.collateralToken.decimals),
                    tokenSymbol: market.collateralToken.tokenSymbol,
                })}
            </Button>
        </div>
    );
}
