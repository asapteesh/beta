import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type DialogsState = Readonly<{
    isMarketCreationOpen: boolean;
    isWrappingNearOpen: boolean;
}>;

const initialState: DialogsState = {
    isMarketCreationOpen: false,
    isWrappingNearOpen: false,
};

const dialogsSlice = createSlice({
    initialState,
    name: 'dialogs',
    reducers: {
        setMarketCreationDialogOpen(state: DialogsState, action: PayloadAction<boolean>): DialogsState {
            return ({
                ...state,
                isMarketCreationOpen: action.payload,
            });
        },
        setWrappingNearDialogOpen(state: DialogsState, action: PayloadAction<boolean>): DialogsState {
            return({
                ...state,
                isWrappingNearOpen: action.payload,
            });
        }
    },
});

export const {
    setMarketCreationDialogOpen,
    setWrappingNearDialogOpen,
} = dialogsSlice.actions;

export default dialogsSlice.reducer;
