import { useEffect, useState } from "react";
import { ExerciseSetEvaluationPage } from "src/features/exercise-set/pages/ExerciseSetEvaluationPage";
import { exerciseSetService } from "src/features/exercise-set/services/exercise-set.service";
import type { EvaluateAnswersDto } from "src/features/exercise-set/types/dto/evaluate-answers.dto";
import type { ExerciseSet } from "src/features/exercise-set/types/exercise-set.interface";
import type { EvaluateAnswersResponse, ExerciseAnswerEvaluationResult } from "src/features/exercise-set/types/response/evaluate-answers.response";
import { ExerciseEvaluationCard } from "src/features/exercise/components/ExerciseEvaluationCard";
import { ExercisePracticeCard } from "src/features/exercise/components/ExercisePracticeCard";
import type { Exercise } from "src/features/exercise/types/exercise.interface";
import { BlackButton } from "src/shared/components/buttons/BlackButton";
import { LoadingPage } from "src/shared/pages/LoadingPage";

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
    }, [exercises]);

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
        console.log(response);
        if (response.isSuccess) {
            setEvaluation(response);
        }
    }

    return <div className={`${className ?? ''} w-full h-full`}> { exerciseSet && exercises ? (
            activeExerciseIndex === exercises.length ? (
                evaluation ?
                    <ExerciseSetEvaluationPage exercises={exercises} evaluation={evaluation} />
                :
                    <LoadingPage />
            ) : (<div 
                className={`w-full h-[50%]
                    flex justify-center items-center
                `}
            >
                <div 
                    className={`w-auto h-auto
                    flex-col justify-center items-center gap-4
                `}
                >
                    {exercises.map((exercise, index) => (
                        <ExercisePracticeCard exercise={exercise} index={index} setActiveExerciseIndex={setActiveExerciseIndex} recordAnswer={recordAnswer} className={`${!(index === activeExerciseIndex) && 'hidden'}`}/>
                    ))}
                    <div className="flex justify-start items-center gap-2">
                        <BlackButton onClick={() => setActiveExerciseIndex(prev => prev > 0 ? prev - 1 : prev)}>Back</BlackButton>
                        {!(activeExerciseIndex + 1 === exercises.length) ?
                            <BlackButton onClick={() => setActiveExerciseIndex(prev => prev + 1)}>Next</BlackButton>
                            :
                            <BlackButton onClick={async () => { setActiveExerciseIndex(prev => prev + 1); await evaluateAnswers(); }}>Finish and Evaluate Answers</BlackButton>
                        }
                    </div>
                </div>
            </div>)
        ) : <div className={``}>undefined</div>}
    </div>;
}
