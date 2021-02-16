import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Account } from '../../models/Account';
import { PoolToken } from '../../models/PoolToken';
import { TokenViewModel } from '../../models/TokenViewModel';
import { UserBalance } from '../../models/UserBalance';

export type AccountState = Readonly<{
    account: Account | null;
    loading: boolean;
    poolTokens: PoolToken[];
    balances: UserBalance[];
    poolTokenLoading: boolean;
    nearToken?: TokenViewModel;
    wrappedNearToken?: TokenViewModel;
    requiredWrappedNearDeposit?: string;
    errors: string[];
}>;

const initialState: AccountState = {
    account: null,
    loading: false,
    poolTokenLoading: false,
    poolTokens: [],
    errors: [],
    balances: [],
};

const accountSlice = createSlice({
    initialState,
    name: 'account',
    reducers: {
        setAccount(state: AccountState, action: PayloadAction<Account | null>): AccountState {
            return ({
                ...state,
                account: action.payload,
            });
        },
        setNearToken(state: AccountState, action: PayloadAction<TokenViewModel | undefined>): AccountState {
            return ({
                ...state,
                nearToken: action.payload,
            });
        },
        setWrappedNearToken(state: AccountState, action: PayloadAction<TokenViewModel | undefined>): AccountState {
            return ({
                ...state,
                wrappedNearToken: action.payload,
            });
        },
        setRequiredWrappedNearDeposit(state: AccountState, action: PayloadAction<string | undefined>): AccountState {
            return ({
                ...state,
                requiredWrappedNearDeposit: action.payload,
            });
        },
        setAccountPoolTokens(state: AccountState, action: PayloadAction<PoolToken[]>): AccountState {
            return ({
                ...state,
                poolTokens: action.payload,
            });
        },
        setAccountLoading(state: AccountState, action: PayloadAction<boolean>): AccountState {
            return ({
                ...state,
                loading: action.payload,
            });
        },
        setAccountPoolTokenLoading(state: AccountState, action: PayloadAction<boolean>): AccountState {
            return ({
                ...state,
                poolTokenLoading: action.payload,
            });
        },
        setAccountBalances(state: AccountState, action: PayloadAction<UserBalance[]>): AccountState {
            return ({
                ...state,
                balances: action.payload,
            });
        },
        setAccountErrors(state: AccountState, action: PayloadAction<string[]>): AccountState {
            return ({
                ...state,
                errors: action.payload,
            });
        },
    },
});

export const {
    setAccount,
    setAccountErrors,
    setAccountLoading,
    setAccountPoolTokenLoading,
    setAccountPoolTokens,
    setAccountBalances,
    setNearToken,
    setWrappedNearToken,
    setRequiredWrappedNearDeposit,
} = accountSlice.actions;

export default accountSlice.reducer;
