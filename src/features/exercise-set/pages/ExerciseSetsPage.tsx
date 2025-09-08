import { useEffect, useState } from 'react';
import { exerciseSetService } from '../services/exercise-set.service';
import { ExerciseSetCard } from '../components/ExerciseSetCard';
import type { ExtendedSource } from '../../source/types/extended-source-document.interface';

export function ExerciseSetsPage() {
    const [sources, setSources] = useState<ExtendedSource[]>([]);

    async function fetchExerciseSets() {
        const response = await exerciseSetService.readAllByUserIdGroupedBySources();
        if (response.isSuccess && response.sources) {
            setSources(response.sources);
        } else {
            alert(response.message);
        }
    }

    useEffect(() => {
        fetchExerciseSets();
    }, []);

    return (
        <div className="w-full h-full flex flex-col justify-start items-center">
            <div className="w-[95%] h-auto border flex flex-col justify-start items-start gap-6">
                {sources.length === 0 ? (
                    <p>Loading...</p>
                ) : (
                    sources.map((source) => (
                        <div className="w-full flex flex-col justify-start items-start gap-2 p-4">
                            <div className="flex justify-start items-center gap-4">
                                <p>{source.title}</p>
                                <p>{source.type}</p>
                            </div>
                            <div className="w-[200px] flex justify-start items-center gap-4 overflow-x-auto">
                                {source.exerciseSets &&
                                    source.exerciseSets.map((exerciseSet) => (
                                        <ExerciseSetCard
                                            exerciseSet={exerciseSet}
                                            fetchExerciseSets={fetchExerciseSets}
                                        />
                                    ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
