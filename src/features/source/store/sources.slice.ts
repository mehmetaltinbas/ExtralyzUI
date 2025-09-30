import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { sourceService } from 'src/features/source/services/source.service';
import type { Source } from 'src/features/source/types/source.interface';

const fetchData = createAsyncThunk(
    'sources/fetch-data',
    async () => {
        const response = await sourceService.readAllByUserId();
        return response.sources;
    }
);

const initialState: Source[] = [];

const sourcesSlice = createSlice({
    name: 'sources',
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder.addCase(fetchData.fulfilled, (state, action) => {
            return action.payload;
        });
    },
});

export const sourcesActions = {
    ...sourcesSlice.actions,
    fetchData,
};

export const sourcesReducer = sourcesSlice.reducer;
