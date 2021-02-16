import React, { ReactElement, useState } from 'react';
import classnames from 'classnames';
import Error from '../../components/Error';
import IconButton from '../../components/IconButton';
import TextButton from '../../components/TextButton';
import Dialog from '../../compositions/Dialog';
import { TokenViewModel } from '../../models/TokenViewModel';
import { formatCollateralToken, toCollateralToken } from '../../services/CollateralTokenService';
import { WrapNearFormValues } from '../../services/NearService';
import trans from '../../translation/trans';
import TokenSelect from '../TokenSelect';
import swap from "./../../assets/images/icons/swap.svg";
import createDefaultWrapNearFormValues from './utils/createDefaultWrapNearFormValues';
import validateWrapNearFormValues from './utils/validateWrapNearFormValues';

import s from './WrapNearDialog.module.scss';

interface Props {
    open: boolean;
    onRequestClose: () => void;
    onRequestSwitchPairs: () => void;
    onSubmit: (formValues: WrapNearFormValues) => void;
    input: TokenViewModel;
    output: TokenViewModel;
}

export default function WrapNearDialog({
    open,
    onRequestClose,
    onRequestSwitchPairs,
    onSubmit,
    input,
    output,
}: Props): ReactElement {
    const [formValues, setFormValues] = useState(createDefaultWrapNearFormValues());

    function handleSwitchTokenPlaces() {
        const wrapType = formValues.type === 'unwrap' ? 'wrap' : 'unwrap';

        setFormValues({
            ...formValues,
            amountIn: '0',
            type: wrapType,
        });

        onRequestSwitchPairs();
    }

    function handleBalanceClick() {
        setFormValues({
            ...formValues,
            amountIn: input.balance,
        });
    }

    function handleInputChange(value: string) {
        setFormValues({
            ...formValues,
            amountIn: value !== '' ? toCollateralToken(value, input.decimals) : '0',
        });
    }

    function handleSubmit() {
        onSubmit(formValues);
    }

    const errors = validateWrapNearFormValues(formValues, input);

    return (
        <Dialog
            title={trans('wrapNearDialog.title')}
            open={open}
            onRequestClose={onRequestClose}
            onSubmitClick={handleSubmit}
            canSubmit={errors.canSubmit}
        >
            <p>{trans('wrapNearDialog.description')}</p>
            <div className={s.token}>
                <div className={classnames(s.tokenHeader, s.noMargin)}>
                    <span>{trans('market.label.youPay')}</span>
                    <TextButton onClick={handleBalanceClick} className={s.balanceButton}>
                        {trans('global.balance', {}, true)}: {input.balanceFormatted}
                    </TextButton>
                </div>
                <TokenSelect
                    onTokenSwitch={() => {}}
                    value={formatCollateralToken(formValues.amountIn, input.decimals)}
                    tokens={[input]}
                    selectedToken={input}
                    onValueChange={(v) => handleInputChange(v)}
                    showPrice={false}
                />
            </div>

            <div className={s.switchTokens}>
                <IconButton onClick={handleSwitchTokenPlaces} icon={swap} alt={trans('market.action.switchTokens')} />
            </div>

            <div className={s.token}>
                <div className={s.tokenHeader}>
                    <span>{trans('market.label.youReceive')}</span>
                </div>
                <TokenSelect
                    onTokenSwitch={() => {}}
                    value={formatCollateralToken(formValues.amountIn, output.decimals)}
                    tokens={[output]}
                    selectedToken={output}
                    disabledInput
                    showPrice={false}
                />
            </div>

            <Error error={errors.amountIn} />
        </Dialog>
    );
}
