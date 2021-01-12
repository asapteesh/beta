import React, { ReactElement } from 'react';
import TokenSwapper from '../../containers/TokenSwapper';
import { TokenViewModel } from '../../models/TokenViewModel';

export default function TokenSwapperConnector(): ReactElement {
    const inputs: TokenViewModel[] = [
        {
            balance: '10,000.31',
            price: '2.38',
            tokenName: 'NEAR'
        }
    ];

    const outputs: TokenViewModel[] = [
        {
            balance: '4.50',
            price: '2.38',
            tokenName: 'KANYE WEST'
        },
        {
            balance: '7.92',
            price: '2.38',
            tokenName: 'NO'
        },
        {
            balance: '1',
            price: '2.38',
            tokenName: 'MAYBE'
        }
    ];

    function onConfirm() {

    }

    return (
        <TokenSwapper
            inputs={inputs}
            outputs={outputs}
            onConfirm={onConfirm}
            onRequestSwitchPairs={onConfirm}
        />
    );
}
