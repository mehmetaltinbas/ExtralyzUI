import { Sections } from "../../enums/sections.enum";
import type { PropsBuilderStrategy } from "./props-builder-strategy.interface";
import { ExerciseSetsPropsBuilderStrategy } from "./exercise-sets-props-builder.strategy";
import { ExerciseSetPropsBuilderStrategy } from "./exercise-set-props-builder.strategy";
import { ProcessedSourcesPropsBuilderStrategy } from "./processed-sources-props-builder.strategy";
import { ProcessedSourcePropsBuilderStrategy } from "./processed-source-props-builder.strategy";
import { SourcesPropsBuilderStrategy } from "./sources-props-builder.strategy";
import { SourcePropsBuilderStrategy } from "./source-props-builder.strategy";

const map: Map<string, PropsBuilderStrategy> = new Map([
    [Sections.SOURCES, SourcesPropsBuilderStrategy],
    [Sections.SOURCE, SourcePropsBuilderStrategy],
    [Sections.PROCESSED_SOURCES, ProcessedSourcesPropsBuilderStrategy],
    [Sections.PROCESSED_SOURCE, ProcessedSourcePropsBuilderStrategy],
    [Sections.PROCESSED_SOURCES, ExerciseSetsPropsBuilderStrategy],
    [Sections.EXERCISE_SET, ExerciseSetPropsBuilderStrategy]
]);

export function selectPropsBuilderStrategy(section: string): PropsBuilderStrategy | undefined {
    const strategy = map.get(section);
    if (!strategy) return undefined;
    return strategy;
}