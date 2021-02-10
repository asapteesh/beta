import React, { ReactElement } from 'react';
import classnames from 'classnames';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import s from './TabBar.module.scss';
export interface TabBarItem {
    id: string;
    label: string;
    show: boolean;
}

interface Props {
    items: TabBarItem[];
    activeId: string;
    onTabClick: (item: TabBarItem) => void;
    className?: string;
    tabClassName?: string;
    variant?: 'standard' | 'scrollable' | 'fullWidth';
}

export default function TabBar({
    items,
    onTabClick,
    activeId,
    variant = 'standard',
    tabClassName = '',
    className = '',
}: Props): ReactElement {
    return (
        <Tabs
            classes={{ indicator: s.indicator }}
            className={classnames(s.root, className)}
            variant={variant}
            value={activeId}
        >
            {items.filter(tab => tab.show).map(tab => (
                <Tab
                    key={tab.id}
                    onClick={() => onTabClick(tab)}
                    className={classnames(s.tab, tabClassName)}
                    label={tab.label}
                    value={tab.id}
                />
            ))}
        </Tabs>
    );
}
