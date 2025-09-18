import type { ExerciseAnswerEvaluationResult } from "src/features/exercise-set/types/response/evaluate-answers.response";
import type { Exercise } from "src/features/exercise/types/exercise.interface";

export function MCQExerciseEvaluationCard({ exercise, evaluation, index }: {
    exercise: Exercise;
    evaluation: ExerciseAnswerEvaluationResult;
    index: number;
}) {
    const userAnswer = exercise.choices.find((choice, index) => index === Number(evaluation.userAnswer));
    const correctAnswer = exercise.choices.find((choice, index) => index === exercise.correctChoiceIndex);

    return (
        <div className="flex flex-col justify-center items-center gap-1">
            <p><span className="font-serif">Your answer</span>: <span className="text-gray-500">{userAnswer}</span></p>
            <p><span className="font-serif">Correct answer</span>: <span className="text-green-900">{correctAnswer}</span></p>
            <p><span className="font-serif">Feedback</span>: {evaluation.feedback}</p>
            <p><span className="font-serif">Sub-score</span>: {evaluation.score}</p>
        </div>
    );
}