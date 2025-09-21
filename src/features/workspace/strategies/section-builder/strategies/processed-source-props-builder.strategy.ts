import { processedSourceService } from 'src/features/processed-source/services/processed-source.service';
import type { SectionBuilderStrategy } from '../section-builder-strategy.interface';

export const ProcessedSourcePropsBuilderStrategy: SectionBuilderStrategy = {
    buildProps: async (tab) => {
        const response = await processedSourceService.readById(tab.id!);
        if (response.processedSource) {
            return {
                processedSource: response.processedSource,
            };
        }
        return {};
    },
};
