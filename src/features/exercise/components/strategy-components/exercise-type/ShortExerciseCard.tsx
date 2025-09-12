import { useEffect } from "react";
import type { Exercise } from "../../../types/exercise.interface";

export function ShortExerciseCard({ exercise, isAnswersHidden }: {
    exercise: Exercise;
    isAnswersHidden: boolean;
}) {

    return (
        <div className="w-full h-full flex flex-col gap-2">
            <p>{exercise.prompt}</p>
            {isAnswersHidden ? <></> : <p className="text-green-900">Answer: {exercise.solution}</p>}
        </div>
    );
}
