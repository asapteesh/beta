import React, { FormEvent, ReactElement, ReactNode } from 'react';
import { default as MuiButton } from '@material-ui/core/Button';

import s from './Button.module.scss';

interface ButtonProps {
    children: ReactNode | string;
    className?: string;
    onClick?: (event: FormEvent<HTMLButtonElement>) => void;
    variant?: "text" | "outlined" | "contained";
    disabled?: boolean;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
};

export default function Button({
    className = '',
    children,
    ...props
}: ButtonProps) {
    return (
        <MuiButton {...props} className={`${s.button} ${className}`}>{children}</MuiButton>
    );
}
