import React from 'react';
import Button from '../../components/Button';
import Dialog from '../../compositions/Dialog';
import trans from '../../translation/trans';

import s from './DisclaimerDialog.module.scss';

interface Props {
    open: boolean;
    onRequestClose: () => void;
}

export default function DisclaimerDialog({
    open,
    onRequestClose,
}: Props) {
    return (
        <Dialog paperClassName={s.dialog} title={trans('disclaimer.title')} hideButtons open={open} onRequestClose={() => {}} onSubmitClick={() => {}}>
            <p className={s.description}>{trans('disclaimer.description')}</p>
            <Button className={s.button} onClick={onRequestClose}>{trans('disclaimer.action.accept')}</Button>
        </Dialog>
    );
}
