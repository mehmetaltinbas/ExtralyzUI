import { processedSourceService } from "../../../processed-source/services/processed-source.service";
import type { PropsBuilderStrategy } from "./props-builder-strategy.interface";

export const ProcessedSourcePropsBuilderStrategy: PropsBuilderStrategy = {
    build: async (id) => {
        const response = await processedSourceService.readById(id);
        if (response.processedSource) {
            return {
                processedSource: response.processedSource
            };
        }
        return {};
    }
};
