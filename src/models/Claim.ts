import { formatCollateralToken } from "../services/CollateralTokenService";
import { TokenViewModel } from "./TokenViewModel";

export interface GraphClaimResponse {
    payout: string;
}

export interface ClaimViewModel {
    payout: string;
    payoutFormatted: string;
}

export function transformToClaimViewModel(graphData: GraphClaimResponse, collateralToken: TokenViewModel): ClaimViewModel {
    return {
        payout: graphData.payout,
        payoutFormatted: formatCollateralToken(graphData.payout, collateralToken.decimals),
    }
}
