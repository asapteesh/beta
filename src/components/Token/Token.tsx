import React, { ReactElement } from 'react';
import classnames from 'classnames';

import { generateTokenName } from '../../models/TokenViewModel';

import s from './Token.module.scss';

interface Props {
    className?: string;
    tokenImage?: string;
    tokenName: string;
    colorVar?: string;
}

export default function Token({
    tokenName,
    tokenImage,
    colorVar = '--c-primary',
    className = '',
}: Props): ReactElement {
    return (
        <div style={{ backgroundColor: `var(${colorVar})`, }} className={classnames(s.token, className)}>
            {tokenImage && <img className={s.tokenImage} src={tokenImage} alt={tokenName} />}
            {!tokenImage && generateTokenName(tokenName)}
        </div>
    );
}
