import type React from 'react';
import { BlackButton } from '../../../shared/components/buttons/BlackButton';
import type { CreateExerciseSetDto } from '../types/dto/create-exercise-set.dto';
import { exerciseSetService } from '../services/exercise-set.service';
import { ExerciseType } from 'src/features/exercise/enums/exercise-types.enum';
import { useEffect, useState } from 'react';
import { ClaretButton } from 'src/shared/components/buttons/ClaretButton';

export function CreateExerciseSetForm({
    isHidden,
    setIsHidden,
    setIsPopUpActive,
    toggle,
    sourceId,
    setIsLoadingPageHidden,
}: {
    isHidden: boolean;
    setIsHidden: React.Dispatch<React.SetStateAction<boolean>>;
    setIsPopUpActive: React.Dispatch<React.SetStateAction<boolean>>;
    toggle: () => void;
    sourceId: string;
    setIsLoadingPageHidden: React.Dispatch<React.SetStateAction<boolean>>;

}) {
    const [createExerciseSetDto, setCreateExerciseSetDto] = useState<CreateExerciseSetDto>({
        count: 5,
        type: '',
        difficulty: '',
    });

    useEffect(() => {
        setCreateExerciseSetDto({
            count: 5,
            type: '',
            difficulty: '',
        });
    }, [isHidden]);

    async function createExerciseSet() {
        setIsHidden(true);
        setIsLoadingPageHidden(false);
        const response = await exerciseSetService.create(sourceId, createExerciseSetDto);
        setIsLoadingPageHidden(true);
        alert(response.message);
        setIsPopUpActive(false);
    }

    return (
        <div
            className={`${isHidden ? 'hidden' : ''} relative border px-2 py-4 bg-white rounded-[10px]
            flex flex-col justify-center items-center gap-2`}
        >
            <div className="absolute top-1 right-1 w-full flex justify-end items-center">
                <ClaretButton onClick={event => toggle()}>X</ClaretButton>
            </div>
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
                    <option value="">select</option>
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
                    <option value="">select</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>
            <BlackButton onClick={async (event) => { 
                await createExerciseSet();
            }}>Generate</BlackButton>
        </div>
    );
}
