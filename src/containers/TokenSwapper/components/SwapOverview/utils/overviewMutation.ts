import { formatCollateralToken } from "../../../../../services/CollateralTokenService";
import { SwapFormValues } from "../../../../../services/SwapService";
import Big from "big.js";
import { BUY, DEFAULT_FEE } from "../../../../../config";

export interface OverviewValues {
    rateInOut: string,
    rateOutIn: string,
    feePaid: string,

}

export default function mutateFormValues(formValues: SwapFormValues): OverviewValues {
    // Check if amountIn / amountOut are valid for calculation
    if (formValues.amountIn === "" || formValues.amountIn === "0" || formValues.amountOut === "0" || formValues.amountIn === "") {
        return {
            rateInOut: "0",
            rateOutIn: "0",
            feePaid: "0",
        }
    }

    const one = new Big(`1e${formValues.fromToken.decimals}`);
    const collateralToken = formValues.fromToken.isCollateralToken ? formValues.fromToken : formValues.toToken;
    const amountInBN = new Big(formValues.amountIn);
    const amountOutBN = new Big(formValues.amountOut);
    const rateInOut = formatCollateralToken(amountInBN.mul(one.toString()).div(amountOutBN).toString(), formValues.fromToken.decimals);
    const rateOutIn = formatCollateralToken(amountOutBN.mul(one.toString()).div(amountInBN).toString(), formValues.toToken.decimals);
    const feedAmount = formValues.type === BUY ? formValues.amountIn : formValues.amountOut;
    const feePaid = formatCollateralToken(new Big(feedAmount).mul(new Big(DEFAULT_FEE)).div(new Big("100")).toString(), collateralToken.decimals);

    return {
        rateInOut,
        rateOutIn,
        feePaid,
    }
}
