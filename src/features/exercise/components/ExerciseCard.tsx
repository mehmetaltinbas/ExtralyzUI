import type { Exercise } from '../types/exercise.interface';

export function ExerciseCard({
    exercise,
    fetchExercises,
}: {
    exercise: Exercise;
    fetchExercises?: () => void;
}) {
    return (
        <div className={`w-[200px] h-[200px]`}>
            <p>{exercise.prompt}</p>
        </div>
    );
}
