import type React from 'react';
import type { TabsStateElement } from 'src/features/workspace/features/tabs/store/tabsSlice';

export interface SectionBuilderStrategy {
    buildProps(tab: TabsStateElement): Promise<object>;

    // buildPopUpComponents(): Promise<React.ReactNode[]>;
}
