import Big from "big.js";
import { WRAPPED_NEAR_ACCOUNT_ID } from "../config";
import { TokenViewModel } from "../models/TokenViewModel";
import { toCollateralToken } from "./CollateralTokenService";
import { connectSdk } from "./WalletService";

export async function getNearToken(): Promise<TokenViewModel> {
    const defaults: TokenViewModel = {
        decimals: 24,
        isCollateralToken: false,
        odds: new Big(0),
        outcomeId: NaN,
        poolBalance: '0',
        poolWeight: new Big(0),
        tokenName: 'NEAR',
        price: 0,
        priceSymbol: '$',
        priceSymbolPosition: 'left',
        tokenSymbol: 'NEAR',
        weight: 0,
        balance: '0',
        balanceFormatted: '0',
    }

    try {
        const sdk = await connectSdk();
        const balance = await sdk.getNearBalance();

        return {
            ...defaults,
            balance: balance.available,
            balanceFormatted: toCollateralToken(balance.available, 24),
        }
    } catch (error) {
        console.error('[getNearToken]', error);
        return defaults;
    }
}

export async function getWrappedNearToken(): Promise<TokenViewModel> {
    const defaults: TokenViewModel = {
        decimals: 24,
        isCollateralToken: false,
        odds: new Big(0),
        outcomeId: NaN,
        poolBalance: '0',
        poolWeight: new Big(0),
        tokenName: 'wNEAR',
        price: 0,
        priceSymbol: '$',
        priceSymbolPosition: 'left',
        tokenSymbol: 'wNEAR',
        weight: 0,
        balance: '0',
        balanceFormatted: '0',
    }

    try {
        const sdk = await connectSdk();
        const accountId = sdk.getAccountId();
        const balance = await sdk.getTokenBalance(WRAPPED_NEAR_ACCOUNT_ID, accountId);

        return {
            ...defaults,
            balance,
            balanceFormatted: toCollateralToken(balance, 24),
        }
    } catch (error) {
        console.error('[getWrappedNearToken]', error);
        return defaults;
    }
}
