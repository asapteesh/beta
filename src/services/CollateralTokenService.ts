// import { utils } from 'near-api-js';
import Big from 'big.js';

import { FUNGIBLE_TOKEN_ACCOUNT_ID } from "../config";
import { isFetchResultSuccesful } from "../models/FetchResult";
import { TokenMetadata } from '../models/TokenMetadata';
import cache from '../utils/cache';
import { getTokenPriceByTicker } from "./TokenPriceService";
import { connectNear, connectSdk } from "./WalletService";

export function formatCollateralToken(amount: string, decimals = 18, dp = 2): string {
    const denominator = new Big(10).pow(decimals);
    return new Big(amount).div(denominator).toFixed(dp);
}

export function toCollateralToken(amount: string, decimals = 18): string {
    const denominator = new Big(10).pow(decimals);
    return new Big(amount).mul(denominator).toFixed(0);
}

export interface AccountTokenBalance {
    balance: string;
    balanceFormatted: string;
}

export async function getCollateralTokenBalance(tokenAccountId: string, accountId: string): Promise<string> {
    try {
        const near = await connectNear();
        const account = await near.account(accountId);

        // if (tokenAccountId === FUNGIBLE_TOKEN_ACCOUNT_ID) {
        //     const result = await account.getAccountBalance();

        //     return {
        //         balance: result.available,
        //         balanceFormatted: utils.format.formatNearAmount(result.available, 3),
        //     };
        // }

        const result = await account.viewFunction(tokenAccountId, 'get_balance', {
            account_id: accountId,
        });

        return result;
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

        return {
            ...metadata,
            collateralTokenId,
        };
    } catch (error) {
        console.error('[getCollateralTokenMetadata]', error);

        return defaultMetadata;
    }
}
