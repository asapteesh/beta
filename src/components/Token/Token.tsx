import React, { ReactElement } from 'react';
import classnames from 'classnames';

import { generateTokenName } from '../../models/TokenViewModel';

import s from './Token.module.scss';

interface Props {
    className?: string;
    tokenName: string;
    colorVar?: string;
}

export default function Token({
    tokenName,
    colorVar = '--c-primary',
    className = '',
}: Props): ReactElement {
    return (
        <div style={{ backgroundColor: `var(${colorVar})`, }} className={classnames(s.token, className)}>
            {generateTokenName(tokenName)}
        </div>
    );
}
