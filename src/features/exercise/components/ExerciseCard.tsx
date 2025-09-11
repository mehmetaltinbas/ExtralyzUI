import type { Exercise } from '../types/exercise.interface';

export function ExerciseCard({
    exercise,
    fetchExercises,
}: {
    exercise: Exercise;
    fetchExercises?: () => void;
}) {
    return (
        <div className={`w-[175px] h-[200px] border rounded-[10px] p-2`}>
            <p className='text-sm'>{exercise.prompt}</p>
        </div>
    );
}
