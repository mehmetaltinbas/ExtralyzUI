import type { PropsBuilderStrategy } from "./props-builder-strategy.interface";

export const ProcessedSourcesPropsBuilderStrategy: PropsBuilderStrategy = {
    build: async (exerciseSetId, setProps) => {
        setProps({});
    }
};
