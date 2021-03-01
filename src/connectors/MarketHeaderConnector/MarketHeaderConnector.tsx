import React, { ReactElement, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import MarketHeader from '../../containers/MarketHeader';
import MarketHeaderLoader from '../../containers/MarketHeader/MarketHeaderLoader';
import { Reducers } from '../../redux/reducers';
import { routePaths } from '../../routes';

interface Props {
    className?: string;
}

interface LocationState {
    canGoBack?: boolean;
}

export default function MarketHeaderConnector({
    className,
}: Props): ReactElement {
    const market = useSelector((store: Reducers) => store.market.marketDetail);
    const history = useHistory();
    const location = useLocation<LocationState>();
    const canGoBack = location.state?.canGoBack ?? false;

    const handleGoBackClick = useCallback(() => {
        if (canGoBack) {
            history.goBack();
        } else {
            history.push(routePaths.root());
        }
    }, [canGoBack, history]);

    if (!market) {
        return <MarketHeaderLoader />;
    }


    return (
        <MarketHeader
            market={market}
            className={className}
            onGoBackClick={handleGoBackClick}
        />
    );
}
