import { configureStore } from '@reduxjs/toolkit';
import { tabsReducer } from '../features/workspace/store/tabsSlice';
import { sidebarReducer } from '../features/workspace/store/sidebarSlice';
import { widthsReducer } from '../features/workspace/store/widthsSlice';

const store = configureStore({
    reducer: {
        tabs: tabsReducer,
        sidebar: sidebarReducer,
        widths: widthsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;
