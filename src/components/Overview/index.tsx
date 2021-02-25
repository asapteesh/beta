import React, { ReactElement } from 'react';
import s from './overview.module.scss';

interface KeyValue {
    key: String,
    value: String
}

export default function Overview(data: Array<KeyValue>): ReactElement {
    return (
        <div className={s['swap-overview']}>
            {
                data.map((d, i) => (
                    <div key={i} className={s['swap-overview__info-row']}>
                        <span className={s['swap-overview__info-key']}>{d.key}</span>
                        <span className={s['swap-overview__info-value']}>{d.value}</span>
                    </div>
                ))
            }
        </div>
    );
}
