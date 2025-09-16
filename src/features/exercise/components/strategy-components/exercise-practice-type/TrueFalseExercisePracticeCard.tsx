import type React from "react";
import type { Exercise } from "src/features/exercise/types/exercise.interface";

export function TrueFalseExercisePracticeCard({ exercise, index, recordAnswer, className }: {
    exercise: Exercise;
    index: number;
    recordAnswer: (exerciseId: string, answer: string | number) => void; 
    className?: string;
}) {
    return (
        <div className="w-full h-full">
            <p>Exercise {index + 1} - {exercise.prompt}</p>
            <div>
                <button 
                    onClick={event => recordAnswer(exercise._id, 1)}
                    className="text-sm px-2 py-1 cursor-pointer 
                    border-1 border-white rounded-full
                    hover:border-black"
                >
                    true
                </button>
                <button 
                    onClick={event => recordAnswer(exercise._id, 0)}
                    className="text-sm px-2 py-1 cursor-pointer 
                    border-1 border-white rounded-full
                    hover:border-black"
                >
                    false
                </button>
            </div>
        </div>
    );
}