import { processedSourceService } from 'src/features/processed-source/services/processed-source.service';
import type { PropsBuilderStrategy } from '../props-builder-strategy.interface';

export const ProcessedSourcePropsBuilderStrategy: PropsBuilderStrategy = {
    build: async (tab) => {
        const response = await processedSourceService.readById(tab.id!);
        if (response.processedSource) {
            return {
                processedSource: response.processedSource,
            };
        }
        return {};
    },
};
