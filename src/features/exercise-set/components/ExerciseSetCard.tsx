import type { ExerciseSet } from '../types/exercise-set.interface';

export function ExerciseSetCard({
    exerciseSet,
    fetchExerciseSets,
}: {
    exerciseSet: ExerciseSet;
    fetchExerciseSets: () => void;
}) {
    return (
        <div
            className="w-[200px] flex-shrink-0 flex flex-col justify-start items-center gap-1
        border p-1"
        >
            <p>{exerciseSet.type}</p>
            <p>{exerciseSet.count}</p>
            <p>{exerciseSet.difficulty}</p>
        </div>
    );
}
