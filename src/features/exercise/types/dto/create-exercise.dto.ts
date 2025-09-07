export interface CreateExerciseDto {
    type: string;
    difficulty: string;
    prompt: string;
    solution?: string;
    choices?: string[];
    correctChoiceIndex?: number;
}
