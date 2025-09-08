import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../../store/store';

export interface TabsState {
    tabs: string[];
    activeTabIndex: number;
}

const initialState: TabsState = {
    tabs: [],
    activeTabIndex: 0,
};

const tabsSlice = createSlice({
    name: 'tabs',
    initialState,
    reducers: {
        addByIndex: (state, action: PayloadAction<{ element: string; index?: number }>) => {
            if (!state.tabs.includes(action.payload.element)) {
                if (action.payload.index) {
                    state.tabs.splice(action.payload.index, 0, action.payload.element);
                    state.activeTabIndex = action.payload.index;
                } else {
                    state.tabs.push(action.payload.element);
                    state.activeTabIndex = state.tabs.length - 1;
                }
            } else {
                if (action.payload.index || action.payload.index === 0) {
                    const prevIndex = state.tabs.findIndex(
                        (tab) => tab === action.payload.element
                    );
                    if (prevIndex !== action.payload.index) {
                        console.log('if block');
                        const temporaryElement = state.tabs[prevIndex];
                        state.tabs.splice(prevIndex, 1);
                        state.tabs.splice(action.payload.index, 0, temporaryElement);
                    }
                    state.activeTabIndex = action.payload.index;
                } else {
                    console.log('else block');
                    console.log(action.payload.element);
                    const currentIndex = state.tabs.findIndex(
                        (tab) => tab === action.payload.element
                    );
                    console.log(`currentIndex: ${currentIndex}`);
                    state.activeTabIndex = currentIndex;
                }
            }
        },
        subtract: (state, action: PayloadAction<number>) => {
            state.tabs = state.tabs.filter((tab, index) => index !== action.payload);
        },
        changePosition: (state, action: PayloadAction<number>) => {},
        setActiveTabIndex: (state, action: PayloadAction<number>) => {
            state.activeTabIndex = action.payload;
        },
    },
});

export const tabsActions = tabsSlice.actions;

export const tabsReducer = tabsSlice.reducer;
