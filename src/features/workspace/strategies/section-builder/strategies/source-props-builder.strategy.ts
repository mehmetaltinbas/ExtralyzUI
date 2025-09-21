import { sourceService } from 'src/features/source/services/source.service';
import type { SectionBuilderStrategy } from '../section-builder-strategy.interface';

export const SourcePropsBuilderStrategy: SectionBuilderStrategy = {
    buildProps: async (tab) => {
        const response = await sourceService.readById(tab.id!);
        if (response.source) {
            return {
                source: response.source,
            };
        }
        return {};
    },
};
