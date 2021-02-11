import BN from "bn.js";

import { Account, Contract } from "near-api-js";
import { DEFAULT_FEE, DEFAULT_SLIPPAGE, FUNGIBLE_TOKEN_ACCOUNT_ID, MAX_GAS, PROTOCOL_ACCOUNT_ID, STORAGE_BASE, STORAGE_DEFAULT } from "../../config";
import { toCollateralToken } from "../CollateralTokenService";
import { SwapFormValues } from "../SwapService";
import { connectWallet } from "../WalletService";

class ProtocolContract {
    contract: Contract;

    constructor(account: Account) {
        this.contract = new Contract(account, PROTOCOL_ACCOUNT_ID, {
            viewMethods: [],
            changeMethods: ['create_market', 'sell', 'exit_pool', 'claim_earnings'],
        });
    }

    async createMarket(
        description: string,
        outcomes: string[],
        categories: string[],
        endDate: Date,
        extraInfo: string = '',
    ): Promise<void> {
        // Each outcome is stored seperatly in near requiring more storage
        const storageRequired = STORAGE_BASE.mul(new BN(outcomes.length));

        // @ts-ignore
        this.contract.create_market({
            description,
            extra_info: extraInfo,
            outcomes: outcomes.length,
            outcome_tags: outcomes,
            end_time: endDate.getTime().toString(),
            collateral_token_id: FUNGIBLE_TOKEN_ACCOUNT_ID,
            categories,
            swap_fee: toCollateralToken(DEFAULT_FEE.toString(), 16),
        }, MAX_GAS, storageRequired);
    }

    async exitPool(
        marketId: string,
        totalIn: string,
    ): Promise<void> {
        // @ts-ignore
        this.contract.exit_pool({
            market_id: marketId,
            total_in: totalIn,
        }, MAX_GAS, STORAGE_BASE);
    }

    async sell(
        marketId: string,
        values: SwapFormValues
    ): Promise<void> {
        // @ts-ignore
        this.contract.sell({
            market_id: marketId,
            collateral_out: values.amountOut,
            outcome_target: values.fromToken.outcomeId,
            max_shares_in: new BN(values.amountIn).mul(new BN("100").add(new BN(DEFAULT_SLIPPAGE))).div(new BN("100")).toString()
        }, MAX_GAS, STORAGE_BASE.mul(new BN(2)))
    }

    async claimEarnings(
        marketId: string,
    ): Promise<void> {
        // @ts-ignore
        this.contract.claim_earnings({
            market_id: marketId,
        }, MAX_GAS, STORAGE_BASE)
    }
}

let protocolInstance: ProtocolContract;

export default async function createProtocolContract(): Promise<ProtocolContract> {
    if (protocolInstance) {
        return protocolInstance;
    }

    const wallet = await connectWallet();
    protocolInstance = new ProtocolContract(wallet.account());

    return protocolInstance;
}
