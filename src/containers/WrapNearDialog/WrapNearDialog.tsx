import React, { ReactElement } from 'react';
import Dialog from '../../compositions/Dialog';
import { TokenViewModel } from '../../models/TokenViewModel';
import trans from '../../translation/trans';
import TokenSelect from '../TokenSelect';

interface Props {
    open: boolean;
    onRequestClose: () => void;
    onSubmit: () => void;
    input: TokenViewModel;
    output: TokenViewModel;
}

export default function WrapNearDialog({
    open,
    onRequestClose,
    onSubmit,
    input,
    output,
}: Props): ReactElement {
    return (
        <Dialog
            title={trans('wrapNearDialog.title')}
            open={open}
            onRequestClose={onRequestClose}
            onSubmitClick={onSubmit}
        >
            <p>{trans('wrapNearDialog.description')}</p>
            <div>
                <TokenSelect
                    onTokenSwitch={() => {}}
                    selectedToken={input}
                    tokens={[input]}
                    value="0"
                    showPrice={false}
                />
            </div>
        </Dialog>
    );
}
