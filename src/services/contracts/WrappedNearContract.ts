import { Account, Contract } from "near-api-js";
import { MAX_GAS, WRAPPED_NEAR_ACCOUNT_ID } from "../../config";
import cache from "../../utils/cache";
import { connectWallet } from "../WalletService";

export class WrappedNearContract {
    contract: Contract;

    constructor(account: Account) {
        this.contract = new Contract(account, WRAPPED_NEAR_ACCOUNT_ID, {
            changeMethods: ['near_deposit', 'near_withdraw'],
            viewMethods: [],
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
}

export default async function createWrappedNearContract(): Promise<WrappedNearContract> {
    return cache('wrapped_near_contract', async () => {
        const wallet = await connectWallet();

        return new WrappedNearContract(wallet.account());
    });
}
