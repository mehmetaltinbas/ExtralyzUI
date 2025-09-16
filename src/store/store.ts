import { configureStore } from '@reduxjs/toolkit';
import { tabsReducer } from '../features/workspace/features/tabs/store/tabsSlice';
import { sidebarReducer } from '../features/workspace/store/sidebarSlice';
import { layoutDimensionsReducer } from '../features/workspace/store/layoutDimensionsSlice';

const store = configureStore({
    reducer: {
        tabs: tabsReducer,
        sidebar: sidebarReducer,
        layoutDimensions: layoutDimensionsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;
