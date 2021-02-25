import React, { ReactElement } from 'react';
import { DEFAULT_SLIPPAGE } from '../../../../config';
import { SwapFormValues } from '../../../../services/SwapService';
import trans from '../../../../translation/trans';
import Overview from "./../../../../components/Overview";
import mutateFormValues from './utils/overviewMutation';

interface SwapOverviewProps {
    formValues: SwapFormValues
}

export default function SwapOverview({formValues}: SwapOverviewProps): ReactElement {
    let formattedFormValues = mutateFormValues(formValues);
    const collateralToken = formValues.fromToken.isCollateralToken ? formValues.fromToken : formValues.toToken;
    const overViewData = [
        {
            key: trans('market.overview.rate'),
            value: `${formattedFormValues.rateInOut} ${formValues.fromToken.tokenSymbol} / ${formValues.toToken.tokenSymbol}`
        },
        {
            key: trans('market.overview.inverseRate'),
            value: `${formattedFormValues.rateOutIn} ${formValues.toToken.tokenSymbol} / ${formValues.fromToken.tokenSymbol}`
        },
        {
            key: trans('market.overview.estimatedFee'),
            value: `${formattedFormValues.feePaid} ${collateralToken.tokenSymbol}`
        },
        {
            key: trans('market.overview.maxSlippage'),
            value: `${DEFAULT_SLIPPAGE}%`
        },
    ]
    return <Overview data={overViewData} />;
}
