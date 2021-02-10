import Big from "big.js";
import { PoolToken } from "../../../models/PoolToken";
import { TokenViewModel } from "../../../models/TokenViewModel";

export function calculatePayout(tokens: TokenViewModel[], payoutNumerator: string[] | null, poolToken?: PoolToken): Big {
    let claimable = new Big(0);

    // First add fees
    if (poolToken) {
        claimable = claimable.add(poolToken.fees);
    }

    // Token balance * payout numerator
    if (payoutNumerator) {
        const numerators = payoutNumerator.map(n => new Big(n));
        numerators.forEach((num, outcome) => {
            const token = tokens.find(token => token.outcomeId === outcome);
            if (!token) return;

            const payout = new Big(token.balance).mul(num.div('1e18'));

            claimable = claimable.add(payout);
        });
    }

    // TODO: Add escrow

    return claimable;
}
