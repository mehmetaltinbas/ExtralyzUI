import type React from "react";
import { useState } from "react";
import type { Exercise } from "src/features/exercise/types/exercise.interface";

export function OpenEndedExercisePracticeCard({ exercise, index, recordAnswer, className }: {
    exercise: Exercise;
    index: number;
    recordAnswer: (exerciseId: string, answer: string | number) => void; 
    className?: string;
}) {
    const [answer, setAnswer] = useState<string>('');

    function onChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setAnswer(event.currentTarget.value);
        recordAnswer(exercise._id, event.currentTarget.value);
    }

    return (
        <div className="w-full h-full">
            <p>Exercise {index + 1} - {exercise.prompt}</p>
            <textarea
                onChange={event => onChange(event)}
                value={answer}
                placeholder="answer..."
                className="w-full p-2 border rounded"
            />
        </div>
    );
}