import type React from 'react';
import { BlackButton } from '../../../shared/components/buttons/BlackButton';
import type { CreateExerciseSetDto } from '../types/dto/create-exercise-set.dto';
import { exerciseSetService } from '../services/exercise-set.service';
import { ExerciseType } from 'src/features/exercise/enums/exercise-types.enum';

export function CreateExerciseSetForm({
    isHidden,
    sourceId,
    createExerciseSetDto,
    setCreateExerciseSetDto,
}: {
    isHidden: boolean;
    sourceId: string;
    createExerciseSetDto: CreateExerciseSetDto;
    setCreateExerciseSetDto: React.Dispatch<React.SetStateAction<CreateExerciseSetDto>>;
}) {
    async function createExerciseSet() {
        const response = await exerciseSetService.create(sourceId, createExerciseSetDto);
        alert(response.message);
    }

    return (
        <div
            id="create-exercise-set-form"
            className={`${isHidden ? 'invisible' : ''} absolute p-2 border bg-white rounded-[10px]
            flex flex-col justify-center items-center gap-2`}
        >
            <div className="flex justify-start items-center gap-2">
                <p>count: </p>
                <input
                    type="number"
                    value={createExerciseSetDto.count}
                    onChange={(e) =>
                        setCreateExerciseSetDto({
                            ...createExerciseSetDto,
                            count: Number(e.target.value),
                        })
                    }
                    className="w-[50px] py-[2px] px-2 border rounded-[10px]"
                />
            </div>
            <div className="flex justify-start items-center gap-2">
                <p>type: </p>
                <select
                    value={createExerciseSetDto.type}
                    onChange={(e) =>
                        setCreateExerciseSetDto({
                            ...createExerciseSetDto,
                            type: e.target.value,
                        })
                    }
                    className="py-[2px] px-2 border rounded-[10px]"
                >
                    <option value="">Select type</option>
                    <option value={ExerciseType.MCQ}>Multiple Choice</option>
                    <option value={ExerciseType.TRUE_FALSE}>True False</option>
                    <option value={ExerciseType.OPEN_ENDED}>Open Ended</option>
                    <option value={ExerciseType.SHORT}>Short Answer</option>
                </select>
            </div>
            <div className="flex justify-start items-center gap-2">
                <p>difficulty: </p>
                <select
                    value={createExerciseSetDto.difficulty}
                    onChange={(e) =>
                        setCreateExerciseSetDto({
                            ...createExerciseSetDto,
                            difficulty: e.target.value,
                        })
                    }
                    className="py-[2px] px-2 border rounded-[10px]"
                >
                    <option value="">Select difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>
            <BlackButton onClick={createExerciseSet}>Generate</BlackButton>
        </div>
    );
}
