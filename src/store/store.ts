import { configureStore } from '@reduxjs/toolkit';
import { tabsReducer } from '../features/workspace/store/tabsSlice';
import { sidebarReducer } from '../features/workspace/store/sidebarWidthSlice';

const store = configureStore({
    reducer: {
        tabs: tabsReducer,
        sidebar: sidebarReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;
