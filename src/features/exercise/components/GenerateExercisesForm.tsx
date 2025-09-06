import type React from "react";
import type { CreateMultipleExerciseDto } from "../types/exercise-dtos";
import { NavyBlueButton } from "../../../shared/components/buttons/NavyBlueButton";
import { exerciseService } from "../services/exercise.service";

export function GenerateExercisesForm({ isHidden, sourceId, createMultipleExerciseDto, setCreateMultipleExerciseDto }: {
    isHidden: boolean;
    sourceId: string;
    createMultipleExerciseDto: CreateMultipleExerciseDto;
    setCreateMultipleExerciseDto: React.Dispatch<React.SetStateAction<CreateMultipleExerciseDto>>;
}) {

    async function generateMultipleExercises() {
        const response = await exerciseService.createMultiple(sourceId, createMultipleExerciseDto);
        alert(response.message);
    }

    return (
        <div id="generate-exercises-form"
            className={`${isHidden ? 'invisible' : ''} absolute p-2 border bg-white rounded-[10px]
            flex flex-col justify-center items-center gap-2`}
        >
            <div className="flex justify-start items-center gap-2">
                <p>intended exercise count: </p>
                <input 
                    type="number" 
                    value={createMultipleExerciseDto.intendedExerciseCount} 
                    onChange={(e) => setCreateMultipleExerciseDto({ ...createMultipleExerciseDto, intendedExerciseCount: Number(e.target.value) })}
                    className="w-[50px] py-[2px] px-2 border rounded-[10px]"
                />
            </div>
            <div className="flex justify-start items-center gap-2">
                <p>type: </p>
                <select
                    value={createMultipleExerciseDto.type}
                    onChange={(e) => setCreateMultipleExerciseDto({ ...createMultipleExerciseDto, type: e.target.value })}
                    className="py-[2px] px-2 border rounded-[10px]"
                >
                    <option value="">Select type</option>
                    <option value="mcq">Multiple Choice</option>
                    <option value="trueFalse">True False</option>
                    <option value="short">Short Answer</option>
                    <option value="openEnded">Open Ended</option>
                </select>
            </div>
            <div className="flex justify-start items-center gap-2">
                <p>difficulty: </p>
                <select
                    value={createMultipleExerciseDto.difficulty}
                    onChange={(e) => setCreateMultipleExerciseDto({ ...createMultipleExerciseDto, difficulty: e.target.value })}
                    className="py-[2px] px-2 border rounded-[10px]"
                >
                    <option value="">Select difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>
            <NavyBlueButton onClick={generateMultipleExercises}>Generate</NavyBlueButton>
        </div>
    );
}