import { processedSourceService } from "../../../processed-source/services/processed-source.service";
import type { PropsBuilderStrategy } from "./props-builder-strategy.interface";

export const ProcessedSourcePropsBuilderStrategy: PropsBuilderStrategy = {
    build: async (id, setProps) => {
        const response = await processedSourceService.readById(id);
        if (response.processedSource) {
            setProps({
                processedSource: response.processedSource
            });
        }
    }
};
