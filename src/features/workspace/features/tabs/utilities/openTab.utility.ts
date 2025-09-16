import type { AppDispatch } from '../../../../../store/store';
import { tabsActions, type TabsStateElement } from '../store/tabsSlice';

export function openTab(dispatch: AppDispatch, element: TabsStateElement) {
    dispatch(tabsActions.addByIndex({ element }));
}
