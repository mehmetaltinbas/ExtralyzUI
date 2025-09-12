import { useEffect, useState } from 'react';
import { exerciseSetService } from '../services/exercise-set.service';
import { ExerciseSetCard } from '../components/ExerciseSetCard';
import type { ExtendedSource } from '../../source/types/extended-source-document.interface';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

export function ExerciseSetsPage() {
    const dispatch = useAppDispatch();
    const widths = useAppSelector(state => state.layoutDimensions);
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
        <div className="w-full h-full 
            flex flex-col justify-start items-center"
        >
            <div className="w-full h-auto p-4 
                flex flex-col justify-start items-start gap-10"
            >
                {sources.length === 0 ? (
                    <p>Loading...</p>
                ) : (
                    sources.map((source) => (
                        <div className="w-full h-auto p-4
                            flex flex-col justify-start items-start gap-2"
                        >
                            <div className="flex justify-start items-center gap-4">
                                <p>{source.title}</p>
                                <p>{source.type}</p>
                            </div>
                            <div className={`w-[${widths.exerciseSetsContainer}px] flex justify-start items-center gap-4 overflow-x-auto`}>
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
