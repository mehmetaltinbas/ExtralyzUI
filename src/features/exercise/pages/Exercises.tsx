import { useEffect, useState } from "react";
import type { Exercise } from "../types/Exercise";
import { exerciseService } from "../services/exercise.service";
import { ExerciseCard } from "../components/ExerciseCard";

export function Exercises() {
    const [exercises, setExercises] = useState<Exercise[]>([]);

    async function fetchExercises() {
        const response = await exerciseService.readAll();
        if (response.isSuccess && response.exercises) {
            setExercises(response.exercises);
        } else {
            alert(response.message);
        }
    }

    useEffect(() => {
        fetchExercises();
    }, []);

    return (
        <div className='w-full h-full flex flex-col justify-start items-center'>
            <div className='w-[95%] h-auto border grid grid-cols-3 gap-8'>
                {exercises.length === 0 ? <p>Loading...</p> :  exercises.map(exercise => (
                    <ExerciseCard exercise={exercise} fetchExercises={fetchExercises}/>
                ))}
            </div>
        </div>
    );
}
