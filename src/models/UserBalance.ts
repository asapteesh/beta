import { getCollateralTokenMetadata } from "../services/CollateralTokenService";
import trans from "../translation/trans";

export interface UserBalance {
    outcomeId: number;
    balance: string;
    marketId: string;
    marketDescription: string;
    marketStatus: string;
    outcomeTag: string;
}

export interface GraphUserBalancesItem {
    balance: string;
    outcome_id: number;
    pool_id: string;
    market?: {
        description: string;
        outcome_tags: string[];
        finalized: boolean;
        end_time: string;
        payout_numerator: string[] | null;
        pool: {
            collateral_token_id: string;
        }
    }
}

export interface GraphUserBalanceResponse {
    balances: GraphUserBalancesItem[];
}

function getMarketStatus(data: GraphUserBalancesItem['market']) {
    if (!data) {
        return trans('marketStatus.uknown');
    }

    const endTime = new Date(parseInt(data.end_time));
    const now = new Date();

    if (data.finalized && data.payout_numerator !== null) {
        return trans('marketStatus.finalized');
    } else if (data.finalized && data.payout_numerator === null) {
        return trans('marketStatus.invalid');
    } else if (!data.finalized && now.getTime() >= endTime.getTime()) {
        return trans('marketStatus.resoluting');
    } else {
        return trans('marketStatus.ongoing');
    }
}

export function transformToUserBalance(graphData: GraphUserBalancesItem): UserBalance {
    return {
        balance: graphData.balance,
        outcomeId: graphData.outcome_id,
        marketId: graphData.pool_id,
        marketDescription: graphData.market?.description || '',
        marketStatus: getMarketStatus(graphData.market),
        outcomeTag: graphData.market?.outcome_tags[graphData.outcome_id] || '',
    }
}
