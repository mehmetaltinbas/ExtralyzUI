export interface Exercise {
    _id: string;
    sourceId: string;
    processedSourceId: string;
    type: string;
    choices: string[];
    correctChoiceIndex: number;
    difficulty: string;
    prompt: string;
    solution: string;
}
