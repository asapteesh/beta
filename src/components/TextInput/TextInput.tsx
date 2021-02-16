import React, { ReactElement } from 'react';
import TextField from '@material-ui/core/TextField';

import s from './TextInput.module.scss';
import { InputProps } from '@material-ui/core';

export interface TextInputProps {
    multiline?: boolean;
    onChange?: (value: string) => void;
    value?: string;
    required?: boolean;
    type?: string;
    helperText?: string;
    error?: boolean;
    InputProps?: Partial<InputProps>
}

export default function TextInput({
    multiline,
    value,
    required,
    onChange = () => {},
    type = 'text',
    ...props
}: TextInputProps): ReactElement {
    return (
        <TextField
            {...props}
            id="outlined-multiline-flexible"
            multiline={multiline}
            variant="outlined"
            className={s.root}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            required={required}
            type={type}
        />
    );
}
