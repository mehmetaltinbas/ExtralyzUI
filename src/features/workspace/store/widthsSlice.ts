import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface WidthsState {
    mainColumnWidth: number;
    exerciseSetsContainerWidth: number;
}

const initialState: WidthsState = {
    mainColumnWidth: 0,
    exerciseSetsContainerWidth: 0,
};

const widthsSlice = createSlice({
    name: 'widths',
    initialState,
    reducers: {
        update: (state, action: PayloadAction<number>) => {
            const sidebarWidth = action.payload;
            state.mainColumnWidth = window.innerWidth - sidebarWidth;
            state.exerciseSetsContainerWidth = ((window.innerWidth - sidebarWidth) * 0.9) - 64;
        }
    },
});

export const widthsActions = widthsSlice.actions;

export const widthsReducer = widthsSlice.reducer;
