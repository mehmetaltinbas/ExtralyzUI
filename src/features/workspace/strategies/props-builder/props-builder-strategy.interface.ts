import type { TabsStateElement } from "../../store/tabsSlice";

export interface PropsBuilderStrategy {
    build: (tab: TabsStateElement) => Promise<object>
}