import type { Exercise } from '../types/exercise.interface';

export function ExerciseCard({
    exercise,
    fetchExercises,
}: {
    exercise: Exercise;
    fetchExercises: () => void;
}) {
    return (
        <div>
            <p>{exercise.type}</p>
            <p>{exercise.prompt}</p>
        </div>
    );
}
