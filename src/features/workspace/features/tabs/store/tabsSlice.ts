import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface TabsStateElement {
    tabTitle?: string;
    section: string;
    id?: string;
    title?: string;
    mode?: string;
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
        addByIndex: (
            state,
            action: PayloadAction<{ element: TabsStateElement; index?: number }>
        ) => {
            const payload = action.payload;
            payload.element.tabTitle = payload.element.mode && payload.element.mode.length > 0 ? `${payload.element.mode}: ` : '';
            payload.element.tabTitle +=
                (payload.element.title && payload.element.title.length > 0) ||
                (payload.element.id && payload.element.id.length > 0)
                    ? (payload.element.title && payload.element.title.length > 0
                        ? payload.element.title
                        : payload.element.id)
                    : payload.element.section;
            if (
                !state.elements.some(
                    (element) => element.tabTitle === payload.element.tabTitle
                )
            ) {
                // if tabTitle exists
                if (payload.index) {
                    // if index is given
                    state.elements.splice(payload.index, 0, payload.element);
                    state.activeTabIndex = payload.index;
                } else {
                    // if index isn't given
                    state.elements.push(payload.element);
                    state.activeTabIndex = state.elements.length - 1;
                }
            } else {
                // if tabTitle doesn't exist
                if (payload.index || payload.index === 0) {
                    // if index is given
                    const prevIndex = state.elements.findIndex(
                        (element) => element.tabTitle === payload.element.tabTitle
                    );
                    if (prevIndex !== payload.index) {
                        const temporaryElement = state.elements[prevIndex];
                        state.elements.splice(prevIndex, 1);
                        state.elements.splice(payload.index, 0, temporaryElement);
                    }
                    state.activeTabIndex = payload.index;
                } else {
                    // if index isn't given
                    const currentIndex = state.elements.findIndex(
                        (element) => element.tabTitle === payload.element.tabTitle
                    );
                    state.activeTabIndex = currentIndex;
                }
            }
        },
        subtract: (state, action: PayloadAction<number>) => {
            const payload = action.payload;
            state.elements = state.elements.filter((element, index) => index !== payload);
        },
        changePosition: (state, action: PayloadAction<number>) => {},
        setActiveTabIndex: (state, action: PayloadAction<number>) => {
            const payload = action.payload;
            state.activeTabIndex = payload;
        },
    },
});

export const tabsActions = tabsSlice.actions;

export const tabsReducer = tabsSlice.reducer;
