import type { ExerciseSet } from "../types/exercise-set.interface";
import { ExerciseCard } from "../../exercise/components/ExerciseCard";
import type { Exercise } from "../../exercise/types/exercise.interface";
import { useEffect } from "react";

export function ExerciseSetPage({ exerciseSet, exercises }: {
    exerciseSet?: ExerciseSet;
    exercises?: Exercise[];
}) {

    useEffect(() => {
        console.log(exerciseSet);
    });

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
            </div>
            <div className="w-full h-full
                grid grid-cols-3 gap-4"
            >
                {exercises?.map(exercise => (
                    <ExerciseCard exercise={exercise}/>
                ))}
            </div>
        </div>
    );
}
