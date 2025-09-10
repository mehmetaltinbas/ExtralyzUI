import { sourceService } from "../../../source/services/source.service";
import type { PropsBuilderStrategy } from "./props-builder-strategy.interface";

export const SourcePropsBuilderStrategy: PropsBuilderStrategy = {
    build: async (id, setProps) => {
        const response = await sourceService.readById(id);
        if (response.source) {
            setProps({
                source: response.source
            });
        }
    }
};
