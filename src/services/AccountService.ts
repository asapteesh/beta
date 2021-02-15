import { gql } from "@apollo/client";
import { Account } from "../models/Account";
import { EarnedFeesGraphData, GraphAcountBalancesResponse, PoolToken, transformToPoolToken } from "../models/PoolToken";
import { GraphUserBalanceResponse, transformToUserBalance, UserBalance } from "../models/UserBalance";
import { getCollateralTokenMetadata } from "./CollateralTokenService";
import { graphqlClient } from "./GraphQLService";
import { connectSdk } from "./WalletService";

export async function signUserIn() {
    const sdk = await connectSdk();
    sdk.signIn();
}

export async function getAccountInfo(): Promise<Account | null> {
    const sdk = await connectSdk();

    if (!sdk.isSignedIn()) {
        return null;
    }

    return {
        accountId: sdk.getAccountId() ?? '',
        balance: (await sdk.getNearBalance()).available,
    };
}

export async function signUserOut() {
    const sdk = await connectSdk();
    sdk.signOut();
}

interface AccountBalancesInfo {
    poolTokens: PoolToken[];
    marketBalances: UserBalance[];
}

export async function getAccountBalancesInfo(accountId: string): Promise<AccountBalancesInfo> {
    try {
        const result = await graphqlClient.query({
            query: gql`
                query Account($accountId: String!) {
                    account: getAccount(accountId: $accountId) {
                        earned_fees {
                            fees
                            outcomeId
                            poolId
                            balance
                            market {
                                description

                                pool {
                                    collateral_token_id
                                }
                            }
                        }
                        balances {
                            balance
                            outcome_id
                            pool_id
                            market {
                                description
                                outcome_tags
                                end_time
                                finalized
                                payout_numerator
                            }
                        }
                    }
                }
            `,
            variables: {
                accountId,
            }
        });

        const accountBalances: GraphAcountBalancesResponse = result.data.account;
        const tokensMetadata = await Promise.all(accountBalances.earned_fees.map(item => getCollateralTokenMetadata(item.market?.pool.collateral_token_id || '')));

        const poolTokens = accountBalances.earned_fees.map((data) => {
            const tokenMetadata = tokensMetadata.find(metadata => metadata.collateralTokenId === data.market?.pool.collateral_token_id);
            return transformToPoolToken(data, tokenMetadata!);
        });

        return {
            poolTokens,
            marketBalances: accountBalances.balances.map((data) => transformToUserBalance(data)),
        };
    } catch (error) {
        console.error('[getPoolTokensByAccountId]', error);
        return {
             poolTokens: [],
             marketBalances: [],
        };
    }
}

export async function getBalancesForMarketByAccount(accountId: string, marketId: string): Promise<UserBalance[]> {
    try {
        const result = await graphqlClient.query({
            query: gql`
                query AccountMarketBalances($accountId: String!, $marketId: String) {
                    account: getAccount(accountId: $accountId) {
                        balances(poolId: $marketId) {
                            balance
                            outcome_id
                            pool_id,

                            market {
                                outcome_tags
                            }
                        }
                    }
                }
            `,
            variables: {
                accountId,
                marketId,
            }
        });

        const data: GraphUserBalanceResponse = result.data.account;
        return data.balances.map((balance) => transformToUserBalance(balance));
} catch (error) {
    console.error('[getBalancesForMarketByAccount]', error);
        return [];
    }
}

export async function getPoolBalanceForMarketByAccount(accountId: string, marketId: string): Promise<PoolToken | null> {
    try {
        const result = await graphqlClient.query({
            query: gql`
                query AccountMarketPoolBalances($accountId: String!, $marketId: String) {
                    account: getAccount(accountId: $accountId) {
                        earned_fees(poolId: $marketId) {
                            balance
                            fees
                            outcomeId
                            poolId

                            market {
                                pool {
                                    collateral_token_id
                                }
                            }
                        }
                    }
                }
            `,
            variables: {
                accountId,
                marketId,
            }
        });

        const data: EarnedFeesGraphData[] = result.data.account.earned_fees;

        if (!data.length) {
            return null;
        }

        const collateralTokenMetadata = await getCollateralTokenMetadata(data[0].market?.pool.collateral_token_id || '');

        return transformToPoolToken(data[0], collateralTokenMetadata);
    } catch (error) {
        console.error('[getBalancesForMarketByAccount]', error);
        return null;
    }
}
