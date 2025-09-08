import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../../store/store';

interface SidebarState {
    isOpen: boolean;
    width: number;
}

const initialState: SidebarState = {
    isOpen: false,
    width: 50
};

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        open: (state) => {
            // state = {
            //     isOpen: true,
            //     width: 300
            // };
            state.isOpen = true;
            state.width = 300;
        },
        close: (state) => {
            state.isOpen = false;
            state.width = 50;
        }
    },
});

export const sidebarActions = sidebarSlice.actions;

export const sidebarReducer = sidebarSlice.reducer;
