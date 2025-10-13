import { configureStore } from '@reduxjs/toolkit';
import { tabsReducer } from '../features/workspace/features/tabs/store/tabsSlice';
import { sidebarReducer } from '../features/workspace/store/sidebar.slice';
import { layoutDimensionsReducer } from '../features/workspace/store/layout-dimensions.slice';
import { sourcesReducer } from 'src/features/source/store/sources.slice';
import { extendedSourcesReducer } from 'src/features/source/store/extended-sources.slice';
import { processedSourcesReducer } from 'src/features/processed-source/store/processed-sources.slice';
import { exerciseSetsReducer } from 'src/features/exercise-set/store/exercise-sets.slice';

export const store = configureStore({
    reducer: {
        tabs: tabsReducer,
        sidebar: sidebarReducer,
        layoutDimensions: layoutDimensionsReducer,
        sources: sourcesReducer,
        extendedSources: extendedSourcesReducer,
        processedSources: processedSourcesReducer,
        exerciseSets: exerciseSetsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;
