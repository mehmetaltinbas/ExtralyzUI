import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from '../../store';

export interface TabsState {
    tabs: string[];
    activeTabIndex: number;
}

const initialState: TabsState = {
    tabs: [],
    activeTabIndex: 0
};

export const tabsSlice = createSlice({
    name: 'tabs',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<string>) => {
            if (!state.tabs.includes(action.payload)) {
                state.tabs.push(action.payload);
                state.activeTabIndex = state.tabs.length - 1;
            } else {
                state.activeTabIndex = state.tabs.findIndex(tab => tab === action.payload);
            }
        },
        subtract: (state, action: PayloadAction<string>) => {
            state.tabs = state.tabs.filter((tab) => tab !== action.payload);
        },
        setActiveTabIndex: (state, action: PayloadAction<number>) => {
            state.activeTabIndex = action.payload;
        }
    }
});

export const tabsActions = tabsSlice.actions;

export default tabsSlice.reducer;
