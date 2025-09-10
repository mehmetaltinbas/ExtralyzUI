import type { PropsBuilderStrategy } from "./props-builder-strategy.interface";

export const SourcesPropsBuilderStrategy: PropsBuilderStrategy = {
    build: async (exerciseSetId, setProps) => {
        setProps({});
    }
};
