import { Account, Contract } from "near-api-js";
import { MAX_GAS, WRAPPED_NEAR_ACCOUNT_ID } from "../../config";
import cache from "../../utils/cache";
import { connectWallet } from "../WalletService";

export class WrappedNearContract {
    contract: Contract;

    constructor(account: Account) {
        this.contract = new Contract(account, WRAPPED_NEAR_ACCOUNT_ID, {
            changeMethods: ['near_deposit', 'near_withdraw', 'storage_deposit'],
            viewMethods: ['storage_balance_of', 'storage_minimum_balance', 'ft_balance_of'],
        });
    }

    wrapNear(amountIn: string) {
        // @ts-ignore
        this.contract.near_deposit({}, MAX_GAS, amountIn);
    }

    unwrapNear(amountIn: string) {
        // @ts-ignore
        this.contract.near_withdraw({
            amount: amountIn,
        }, MAX_GAS, '1');
    }

    depositStorage(amountIn: string) {
        // @ts-ignore
        return this.contract.storage_deposit({}, MAX_GAS, amountIn);
    }

    getStorageBalance(accountId: string): Promise<{ total: string, available: string }> {
        // @ts-ignore
        return this.contract.storage_balance_of({
            account_id: accountId,
        });
    }

    getBalance(accountId: string): Promise<string> {
        // @ts-ignore
        return this.contract.ft_balance_of({
            account_id: accountId,
        });
    }

    getMinimumRequiredStorageBalance(): Promise<string> {
        // @ts-ignore
        return this.contract.storage_minimum_balance({});
    }
}

export default async function createWrappedNearContract(): Promise<WrappedNearContract> {
    return cache('wrapped_near_contract', async () => {
        const wallet = await connectWallet();

        return new WrappedNearContract(wallet.account());
    });
}
