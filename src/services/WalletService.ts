import {
    Near,
    WalletConnection,
} from "near-api-js";

import FluxSdk from '@fluxprotocol/amm-sdk';

import { NETWORK } from '../config';

let sdkInstance = new FluxSdk({
    network: NETWORK,
});

export async function connectSdk(): Promise<FluxSdk> {
    await sdkInstance.connect();
    return sdkInstance;
}

export async function connectNear(): Promise<Near> {
    const sdk = await connectSdk();
    return sdk.near!;
}

export async function connectWallet(): Promise<WalletConnection> {
    const sdk = await connectSdk();
    return sdk.walletConnection!;
}




