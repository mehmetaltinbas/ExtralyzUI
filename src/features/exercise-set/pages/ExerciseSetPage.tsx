import type { ExerciseSet } from "../types/exercise-set.interface";
import { ExerciseCard } from "../../exercise/components/ExerciseCard";
import type { Exercise } from "../../exercise/types/exercise.interface";
import { useEffect, useState } from "react";
import { NavyBlueButton } from "../../../shared/components/buttons/NavyBlueButton";

export function ExerciseSetPage({ exerciseSet, exercises }: {
    exerciseSet?: ExerciseSet;
    exercises?: Exercise[];
}) {
    const [isAnswersHidden, setIsAnswersHidden] = useState<boolean>(true);

    function toggleAnswerVisibility() {
        setIsAnswersHidden(prev => !prev);
    }

    return (
        <div className="w-full h-full
            flex flex-col justify-start items-start gap-4
            p-4
        ">
            <div className="w-full h-auto
                flex flex-col justif-center items-start gap-2"
            >
                <p>Type: {exerciseSet?.type}</p>
                <p>Count: {exerciseSet?.count}</p>
                <p>Difficulty: {exerciseSet?.difficulty}</p>
                <NavyBlueButton onClick={toggleAnswerVisibility}>
                    {isAnswersHidden ? 'Show Answers' : 'Hide Answers'}
                </NavyBlueButton>
            </div>
            <div className="w-full h-full
                grid grid-cols-3 gap-4"
            >
                {exercises?.map(exercise => (
                    <ExerciseCard exercise={exercise} isAnswersHidden={isAnswersHidden}/>
                ))}
            </div>
        </div>
    );
}
