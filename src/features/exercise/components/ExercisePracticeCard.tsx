import type React from "react";
import { MCQExercisePracticeCard } from "src/features/exercise/components/strategy-components/exercise-practice-type/MCQExercisePracticeCard";
import { OpenEndedExercisePracticeCard } from "src/features/exercise/components/strategy-components/exercise-practice-type/OpenEndedExercisePracticeCard";
import { ShortExercisePracticeCard } from "src/features/exercise/components/strategy-components/exercise-practice-type/ShortExercisePracticeCard";
import { TrueFalseExercisePracticeCard } from "src/features/exercise/components/strategy-components/exercise-practice-type/TrueFalseExercisePracticeCard";
import { ExerciseType } from "src/features/exercise/enums/exercise-types.enum";
import type { Exercise } from "src/features/exercise/types/exercise.interface";
import { BlackButton } from "src/shared/components/buttons/BlackButton";

export function ExercisePracticeCard({ exercise, index, setActiveExerciseIndex, recordAnswer, className }: {
    exercise: Exercise;
    index: number;
    setActiveExerciseIndex: React.Dispatch<React.SetStateAction<number>>;
    recordAnswer: (exerciseId: string, answer: string | number) => void;
    className?: string;
}) {
    const componentsMap: Map<
        ExerciseType,
        React.ComponentType<{ 
            exercise: Exercise; 
            index: number; 
            recordAnswer: (exerciseId: string, answer: string | number) => void;
        }>
    > = new Map([
        [ExerciseType.MCQ, MCQExercisePracticeCard],
        [ExerciseType.TRUE_FALSE, TrueFalseExercisePracticeCard],
        [ExerciseType.OPEN_ENDED, OpenEndedExercisePracticeCard],
        [ExerciseType.SHORT, ShortExercisePracticeCard],
    ]);
    const Component = componentsMap.get(exercise.type as ExerciseType);

    return (
        <div 
            className={`w-full h-full
                ${className ?? ''}
            `}
        >
            {Component && <Component exercise={exercise} index={index} recordAnswer={recordAnswer} />}
        </div>
    );
}