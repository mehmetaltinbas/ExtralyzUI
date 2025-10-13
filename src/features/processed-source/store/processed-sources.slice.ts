import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { processedSourceService } from 'src/features/processed-source/services/processed-source.service';
import type { ProcessedSource } from 'src/features/processed-source/types/processed-source.interface';

const fetchData = createAsyncThunk('processed-sources/fetch-data', async () => {
    const response = await processedSourceService.readAllByUserId();
    return response.processedSources;
});

const initialState: ProcessedSource[] = [];

const processedSourcesSlice = createSlice({
    name: 'processedSources',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchData.fulfilled, (state, action) => {
            if (state.length === 1 && action.payload === undefined) return [];
            return action.payload;
        });
    },
});

export const processedSourcesActions = {
    ...processedSourcesSlice.actions,
    fetchData,
};

export const processedSourcesReducer = processedSourcesSlice.reducer;
