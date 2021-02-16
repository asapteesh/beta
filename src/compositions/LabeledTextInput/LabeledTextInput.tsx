import React, { ReactElement } from 'react';
import Label from '../../components/Label';
import TextInput, { TextInputProps } from '../../components/TextInput/TextInput';

interface Props extends TextInputProps {
    label: string;
}

export default function LabeledTextInput({
    label,
    ...props
}: Props): ReactElement {
    return (
        <div>
            <Label text={label} />
            <TextInput {...props} />
        </div>
    );
}
