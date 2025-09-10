import type { ExerciseSet } from "../types/exercise-set.interface";
import { ExerciseCard } from "../../exercise/components/ExerciseCard";
import type { Exercise } from "../../exercise/types/exercise.interface";
import { useEffect } from "react";

export function ExerciseSetPage({ exerciseSet, exercises }: {
    exerciseSet?: ExerciseSet;
    exercises?: Exercise[];
}) {

    useEffect(() => {

    });

    return (
        <div className="w-full h-full
            flex flex-col justify-start items-start gap-4
        ">
            <div className="w-full h-auto
                flex justif-start items-center gap-2"
            >
                <p>{exerciseSet?.type}</p>
                <p>{exerciseSet?.count}</p>
                <p>{exerciseSet?.difficulty}</p>
            </div>
            <div className="w-full h-full
                grid "
            >
                {exercises?.map(exercise => (
                    <ExerciseCard exercise={exercise}/>
                ))}
            </div>
        </div>
    );
}
