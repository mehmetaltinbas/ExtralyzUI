import type { TabsStateElement } from 'src/features/workspace/features/tabs/store/tabsSlice';

export interface PropsBuilderStrategy {
    build: (tab: TabsStateElement) => Promise<object>;
}
