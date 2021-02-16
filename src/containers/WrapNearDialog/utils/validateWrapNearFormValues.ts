import Big from "big.js";
import { TokenViewModel } from "../../../models/TokenViewModel";
import { WrapNearFormValues } from "../../../services/NearService";
import trans from "../../../translation/trans";

interface WrapNearFormErrors {
    amountIn: string;
    canSubmit: boolean;
}


export default function validateWrapNearFormValues(formValues: WrapNearFormValues, inputToken: TokenViewModel): WrapNearFormErrors {
    const errors: WrapNearFormErrors = {
        amountIn: '',
        canSubmit: true,
    };

    if (formValues.type === 'wrap' && formValues.amountIn === inputToken.balance) {
        errors.amountIn = trans('wrapNearDialog.errors.amountIn.exactBalance');
        errors.canSubmit = false;
    }

    if (formValues.amountIn !== '' && inputToken.balance !== '') {
        if (new Big(formValues.amountIn).lte(0)) {
            errors.canSubmit = false;
        }

        if (new Big(formValues.amountIn).gt(inputToken.balance)) {
            errors.canSubmit = false;
            errors.amountIn = trans('wrapNearDialog.errors.amountIn.notEnoughBalance');
        }
    }

    return errors;
}
