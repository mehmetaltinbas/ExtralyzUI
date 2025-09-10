import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface TabsStateElement {
    section: string;
    id?: string;
    title?: string;
}

export interface TabsState {
    elements: TabsStateElement[];
    activeTabIndex: number;
}

const initialState: TabsState = {
    elements: [],
    activeTabIndex: -1,
};

const tabsSlice = createSlice({
    name: 'tabs',
    initialState,
    reducers: {
        addByIndex: (state, action: PayloadAction<{ element: TabsStateElement; index?: number }>) => {
            if (!state.elements.includes(action.payload.element)) {
                if (action.payload.index) {
                    state.elements.splice(action.payload.index, 0, action.payload.element);
                    state.activeTabIndex = action.payload.index;
                } else {
                    state.elements.push(action.payload.element);
                    state.activeTabIndex = state.elements.length - 1;
                }
            } else {
                if (action.payload.index || action.payload.index === 0) {
                    const prevIndex = state.elements.findIndex(
                        (tab) => tab === action.payload.element
                    );
                    if (prevIndex !== action.payload.index) {
                        const temporaryElement = state.elements[prevIndex];
                        state.elements.splice(prevIndex, 1);
                        state.elements.splice(action.payload.index, 0, temporaryElement);
                    }
                    state.activeTabIndex = action.payload.index;
                } else {
                    const currentIndex = state.elements.findIndex(
                        (tab) => tab === action.payload.element
                    );
                    state.activeTabIndex = currentIndex;
                }
            }
        },
        subtract: (state, action: PayloadAction<number>) => {
            state.elements = state.elements.filter((tab, index) => index !== action.payload);
        },
        changePosition: (state, action: PayloadAction<number>) => {},
        setActiveTabIndex: (state, action: PayloadAction<number>) => {
            state.activeTabIndex = action.payload;
        },
    },
});

export const tabsActions = tabsSlice.actions;

export const tabsReducer = tabsSlice.reducer;
