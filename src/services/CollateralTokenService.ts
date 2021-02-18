// import { utils } from 'near-api-js';
import Big from 'big.js';

import { FUNGIBLE_TOKEN_ACCOUNT_ID, WRAPPED_NEAR_ACCOUNT_ID } from "../config";
import { isFetchResultSuccesful } from "../models/FetchResult";
import { TokenMetadata } from '../models/TokenMetadata';
import cache from '../utils/cache';
import { getTokenPriceByTicker } from "./TokenPriceService";
import { connectNear, connectSdk } from "./WalletService";
import wrappedNearIcon from '../assets/images/icons/wrapped-near.svg';

export function formatCollateralToken(amount: string, decimals: number, dp = 2): string {
    const denominator = new Big(10).pow(decimals);
    return new Big(amount).div(denominator).toFixed(dp);
}

export function toCollateralToken(amount: string, decimals: number): string {
    const denominator = new Big(10).pow(decimals);
    return new Big(amount).mul(denominator).toFixed(0);
}

export interface AccountTokenBalance {
    balance: string;
    balanceFormatted: string;
}

export async function getCollateralTokenBalance(tokenAccountId: string, accountId: string): Promise<string> {
    try {
        const sdk = await connectSdk();
        return sdk.getTokenBalance(tokenAccountId, accountId);
    } catch (error) {
        console.error('[getCollateralTokenBalance]', error);
        return '0';
    }
}

export async function getCollateralTokenPrice(tokenAccountId: string): Promise<number> {
    if (tokenAccountId === FUNGIBLE_TOKEN_ACCOUNT_ID) {
        const response = await getTokenPriceByTicker('near');

        if (isFetchResultSuccesful(response)) {
            return response.data;
        }
    }

    return 0;
}


export async function getCollateralTokenMetadata(collateralTokenId: string): Promise<TokenMetadata> {
    const defaultMetadata = {
        decimals: 18,
        name: collateralTokenId,
        reference: '',
        symbol: collateralTokenId,
        version: '0',
        collateralTokenId,
    };

    try {
        if (!collateralTokenId) return defaultMetadata;

        const metadata = await cache(`metadata_${collateralTokenId}`, async () => {
            const sdk = await connectSdk();
            return sdk.getTokenMetadata(collateralTokenId);
        });

        let tokenImage: string | undefined;

        if (collateralTokenId === WRAPPED_NEAR_ACCOUNT_ID) {
            tokenImage = wrappedNearIcon;
        }

        return {
            ...metadata,
            collateralTokenId,
            tokenImage,
        };
    } catch (error) {
        console.error('[getCollateralTokenMetadata]', error);

        return defaultMetadata;
    }
}
