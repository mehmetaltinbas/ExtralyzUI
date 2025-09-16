import { useEffect, useState } from "react";
import { exerciseSetService } from "src/features/exercise-set/services/exercise-set.service";
import type { EvaluateAnswersDto } from "src/features/exercise-set/types/dto/evaluate-answers.dto";
import type { ExerciseSet } from "src/features/exercise-set/types/exercise-set.interface";
import type { EvaluateAnswersResponse, ExerciseAnswerEvaluationResult } from "src/features/exercise-set/types/response/evaluate-answers.response";
import { ExercisePracticeCard } from "src/features/exercise/components/ExercisePracticeCard";
import type { Exercise } from "src/features/exercise/types/exercise.interface";
import { NavyBlueButton } from "src/shared/components/buttons/NavyBlueButton";

export function ExerciseSetPracticePage({
    exerciseSet,
    exercises,
    className,
}: {
    exerciseSet?: ExerciseSet;
    exercises?: Exercise[];
    className?: string;
}) {
    const [activeExerciseIndex, setActiveExerciseIndex] = useState<number>(0);
    const [evaluateAnswersDto, setEvaluateAnswersDto] = useState<EvaluateAnswersDto>({
        exercises: []
    });
    const [evaluation, setEvaluation] = useState<EvaluateAnswersResponse>();

    useEffect(() => {
        const dto = { ...evaluateAnswersDto };
        exercises?.map(exercise => {
            if (!dto.exercises.some(element => element.id === exercise._id)) {
                dto.exercises.push({ id: exercise._id });
            }
        });
        setEvaluateAnswersDto(dto);
    }, []);

    useEffect(() => {
        console.log(evaluateAnswersDto);
    }, [evaluateAnswersDto]);

    useEffect(() => {
        console.log(evaluation?.exerciseAnswerEvaluationResults);
    }, [evaluation?.exerciseAnswerEvaluationResults]);

    function recordAnswer(exerciseId: string, answer: string | number) {
        const newEvaluateAnswersDto = { ...evaluateAnswersDto };
        const exercise = newEvaluateAnswersDto.exercises.find(exercise => exercise.id === exerciseId);
        if (exercise) {
            exercise.answer = typeof answer === 'number' ? String(answer) : answer;
        }
        setEvaluateAnswersDto(newEvaluateAnswersDto);
    }

    async function evaluateAnswers() {
        const response = await exerciseSetService.evaluateAnswers(evaluateAnswersDto);
        if (response.isSuccess) {
            setEvaluation(response);
        }
    }

    return <div className={`${className ?? ''}`}> { exerciseSet && exercises ? (
            activeExerciseIndex === exercises.length ? (
                evaluation ?
                <div className="flex flex-col justify-start items-center gap-4">
                    <p>Overall Score: {evaluation?.overallScore}</p>
                    {evaluation.exerciseAnswerEvaluationResults.map((element, index) => {
                        const matchingExercise = exercises.find(exercise => exercise._id === element.exerciseId);
                        return (
                            <div className="border flex flex-col justify-center items-center gap-1">
                                <p>Exercise {index} - {matchingExercise?.prompt}</p>
                                <p>Your answer: {element.userAnswer}</p>
                                <p>Correct answer: {matchingExercise?.correctChoiceIndex ? matchingExercise?.correctChoiceIndex : matchingExercise?.solution}</p>
                                <p>Feedback: {element.feedback}</p>
                                <p>Sub-score: {element.score}</p>
                            </div>
                        );
                    })}
                </div>
                :
                <div>Loading...</div>
            ) : (<div 
                className={`w-full h-full
                    flex justify-center items-start
                `}
            >
                <div 
                    className={`w-[50%] h-[50%]
                    flex-col justify-center items-center gap-2
                `}
                >
                    {exercises.map((exercise, index) => (
                        <ExercisePracticeCard exercise={exercise} index={index} setActiveExerciseIndex={setActiveExerciseIndex} recordAnswer={recordAnswer} className={`${!(index === activeExerciseIndex) && 'hidden'}`}/>
                    ))}
                    <div className="flex justify-start items-center gap-2">
                        <NavyBlueButton onClick={() => setActiveExerciseIndex(prev => prev > 0 ? prev - 1 : prev)}>Back</NavyBlueButton>
                        {!(activeExerciseIndex + 1 === exercises.length) ?
                            <NavyBlueButton onClick={() => setActiveExerciseIndex(prev => prev + 1)}>Next</NavyBlueButton>
                            :
                            <NavyBlueButton onClick={async () => { setActiveExerciseIndex(prev => prev + 1); await evaluateAnswers(); }}>Finish and Evaluate Answers</NavyBlueButton>
                        }
                    </div>
                </div>
            </div>)
        ) : <div className={``}>undefined</div>}
    </div>;
}
