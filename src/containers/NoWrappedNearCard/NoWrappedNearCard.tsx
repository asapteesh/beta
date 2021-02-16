import React from 'react';
import ActionsCard from '../../components/ActionsCard';
import trans from '../../translation/trans';
import wrappedNearIcon from '../../assets/images/icons/wrapped-near.svg';

import s from './NoWrappedNearCard.module.scss';
import Button from '../../components/Button';
import { MarketViewModel } from '../../models/Market';
import { WRAPPED_NEAR_ACCOUNT_ID } from '../../config';
import { Account } from '../../models/Account';

interface Props {
    market: MarketViewModel;
    account: Account | null;
    onDialogOpenClick: () => void;
}

export default function NoWrappedNearCard({
    market,
    account,
    onDialogOpenClick,
}: Props) {
    if (!account) {
        return null;
    }

    if (market.collateralTokenId !== WRAPPED_NEAR_ACCOUNT_ID) {
        return null;
    }

    if (market.collateralToken.balance !== '0') {
        return null;
    }

    return (
        <ActionsCard className={s.actionsCard}>
            <img src={wrappedNearIcon} alt="" className={s.icon} />
            <div className={s.content}>
                <p>{trans('noWrappedNear.description', { accountId: account.accountId })}</p>
                <Button onClick={onDialogOpenClick}>{trans('noWrappedNear.action.openDialog')}</Button>
            </div>
        </ActionsCard>
    );
}
