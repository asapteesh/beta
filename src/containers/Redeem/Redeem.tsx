import React from 'react';
import FluxSdk from '@fluxprotocol/amm-sdk';
import Button from '../../components/Button';
import { MarketViewModel } from '../../models/Market';
import trans from '../../translation/trans';
import RedeemOverview from './components/RedeemOverview/RedeemOverview';
import s from './Redeem.module.scss';

export interface Props {
    amountRedeemable: string;
    market: MarketViewModel;
    onRedeemClick: () => void;
}

export default function Redeem({
    market,
    amountRedeemable,
    onRedeemClick,
}: Props) {
    return (
        <div>
            <p>
                {trans('redeem.description', {
                    amount: FluxSdk.utils.formatToken(amountRedeemable, market.collateralToken.decimals),
                    tokenSymbol: market.collateralToken.tokenSymbol,
                })}
            </p>

            <RedeemOverview amountRedeemable={amountRedeemable} market={market}/>
            <Button className={s.confirmButton} onClick={onRedeemClick}>
                {trans('redeem.action.submit', {
                    amount: FluxSdk.utils.formatToken(amountRedeemable, market.collateralToken.decimals),
                    tokenSymbol: market.collateralToken.tokenSymbol,
                })}
            </Button>
        </div>
    );
}
