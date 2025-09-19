import React, { useEffect, useState } from "react";
import { ProcessedSourceComprehensionLevel } from "src/features/processed-source/enums/processed-source-comprehension-level.enum";
import { ProcessedSourceLength } from "src/features/processed-source/enums/processed-source-length.enum";
import { ProcessedSourcePerspective } from "src/features/processed-source/enums/processed-source-perspective.enum";
import { ProcessedSourceStyle } from "src/features/processed-source/enums/processed-source-style.enum";
import { ProcessedSourceTone } from "src/features/processed-source/enums/processed-source-tone.enum";
import { processedSourceService } from "src/features/processed-source/services/processed-source.service";
import type { CreateProcessedSourceDto } from "src/features/processed-source/types/dto/CreateProcessedSourceDto";
import { BlackButton } from "src/shared/components/buttons/BlackButton";

export function ProcessSourceForm({ isHidden, setIsHidden, sourceId }: {
    isHidden: boolean;
    setIsHidden: React.Dispatch<React.SetStateAction<boolean>>;
    sourceId: string;
}) {
    const [createProcessedSourceDto, setCreateProcessedSourceDto] = useState<CreateProcessedSourceDto>({
        title: '',
        tone: 'formal',
        style: 'narrative',
        perspective: 'firstPerson',
        comprehensionLevel: 'intermediate',
        length: 'medium',
    });

    async function processSource() {
        const response = await processedSourceService.createBySourceId(sourceId, createProcessedSourceDto);
        alert(response.message);
    }

    return (
        <div id="process-source-form"
            className={`absolute border p-2 bg-white rounded-[10px]
            flex flex-col justify-center items-center gap-2
            ${isHidden && 'hidden'}`}
        >
            <div className="flex justify-start items-center gap-2">
                <p>title: </p>
                <input
                    data-key="userName"
                    onChange={(event) => 
                        setCreateProcessedSourceDto({
                            ...createProcessedSourceDto,
                            title: event.target.value
                        })
                    }
                    type="text"
                    value={createProcessedSourceDto.title}
                    placeholder="title..."
                    className="px-2 py-[2px] border rounded-full"
                />
            </div>
            <div className="flex justify-start items-center gap-2">
                <p>tone: </p>
                <select
                    value={createProcessedSourceDto?.tone}
                    onChange={(e) =>
                        setCreateProcessedSourceDto({
                            ...createProcessedSourceDto,
                            tone: e.target.value,
                        })
                    }
                    className="py-[2px] px-2 border rounded-[10px]"
                >
                    <option value={ProcessedSourceTone.FORMAL}>Formal</option>
                    <option value={ProcessedSourceTone.CASUAL}>Casual</option>
                    <option value={ProcessedSourceTone.FRIENDLY}>Friendly</option>
                    <option value={ProcessedSourceTone.PROFESSIONAL}>Professional</option>
                    <option value={ProcessedSourceTone.PERSUASIVE}>Persuasive</option>
                </select>
            </div>
            <div className="flex justify-start items-center gap-2">
                <p>style: </p>
                <select
                    value={createProcessedSourceDto?.tone}
                    onChange={(e) =>
                        setCreateProcessedSourceDto({
                            ...createProcessedSourceDto,
                            style: e.target.value,
                        })
                    }
                    className="py-[2px] px-2 border rounded-[10px]"
                >
                    <option value={ProcessedSourceStyle.NARRATIVE}>Narrative</option>
                    <option value={ProcessedSourceStyle.TECHNICAL}>Technical</option>
                    <option value={ProcessedSourceStyle.EXPLANATORY}>Explanatory</option>
                    <option value={ProcessedSourceStyle.CREATIVE}>Creative</option>
                </select>
            </div>
            <div className="flex justify-start items-center gap-2">
                <p>perspective: </p>
                <select
                    value={createProcessedSourceDto?.tone}
                    onChange={(e) =>
                        setCreateProcessedSourceDto({
                            ...createProcessedSourceDto,
                            perspective: e.target.value,
                        })
                    }
                    className="py-[2px] px-2 border rounded-[10px]"
                >
                    <option value={ProcessedSourcePerspective.FIRST_PERSON}>First person</option>
                    <option value={ProcessedSourcePerspective.SECOND_PERSON}>Second person</option>
                    <option value={ProcessedSourcePerspective.THIRD_PERSON}>Third person</option>
                </select>
            </div>
            <div className="flex justify-start items-center gap-2">
                <p>comprehensionLevel: </p>
                <select
                    value={createProcessedSourceDto?.tone}
                    onChange={(e) =>
                        setCreateProcessedSourceDto({
                            ...createProcessedSourceDto,
                            comprehensionLevel: e.target.value,
                        })
                    }
                    className="py-[2px] px-2 border rounded-[10px]"
                >
                    <option value={ProcessedSourceComprehensionLevel.BASIC}>Basic</option>
                    <option value={ProcessedSourceComprehensionLevel.INTERMEDIATE}>Intermediate</option>
                    <option value={ProcessedSourceComprehensionLevel.ADVANCED}>Advanced</option>
                </select>
            </div>
            <div className="flex justify-start items-center gap-2">
                <p>length: </p>
                <select
                    value={createProcessedSourceDto?.tone}
                    onChange={(e) =>
                        setCreateProcessedSourceDto({
                            ...createProcessedSourceDto,
                            length: e.target.value,
                        })
                    }
                    className="py-[2px] px-2 border rounded-[10px]"
                >
                    <option value={ProcessedSourceLength.CONCISE}>Concise</option>
                    <option value={ProcessedSourceLength.MEDIUM}>Medium</option>
                    <option value={ProcessedSourceLength.DETAILED}>Detailed</option>
                </select>
            </div>
            <BlackButton onClick={event => { processSource(); setIsHidden(prev => !prev); }}>Process the Source</BlackButton>
        </div>
    );
}
