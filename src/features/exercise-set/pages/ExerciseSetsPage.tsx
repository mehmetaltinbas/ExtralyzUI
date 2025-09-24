import { useEffect, useState } from 'react';
import { exerciseSetService } from '../services/exercise-set.service';
import { ExerciseSetCard } from '../components/ExerciseSetCard';
import type { ExtendedSource } from '../../source/types/extended-source-document.interface';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { LoadingPage } from 'src/shared/pages/LoadingPage';

export function ExerciseSetsPage({ className }: { className?: string }) {
    const dispatch = useAppDispatch();
    const layoutDimensions = useAppSelector((state) => state.layoutDimensions);
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
        <div
            className={`w-full h-full p-4
            flex flex-col justify-start items-center ${className ?? ''}`}
        >
                <div
                    className="w-full h-[auto]
                    flex flex-col justify-center items-center p-4"
                >
                    <p className='text-2xl font-bold'>Exercise Sets</p>
                </div>
            <div
                className="w-full h-auto p-4 
                flex flex-col justify-start items-start gap-10"
            >
                {sources.length === 0 ? (
                    <LoadingPage />
                ) : (
                    sources.map((source) =>
                        (source.exerciseSets?.length ?? 0) > 0 ? (
                            <>
                                {(source.exerciseSets && source.exerciseSets.length > 0) && (
                                    <>
                                        <div
                                            className="w-full h-auto p-4
                                        flex flex-col justify-start items-start gap-2"
                                        >
                                            <div className="flex justify-start items-center gap-2">
                                                <p className='font-serif font-semibold'>Source: </p>
                                                <p>
                                                    {source.title || source.title.length > 0
                                                        ? source.title
                                                        : source._id}
                                                </p>
                                                <p className='font-serif italic'>{source.type}</p>
                                            </div>
                                            <div
                                                className={`w-[${layoutDimensions.exerciseSetsContainer.width}px] flex justify-start items-center gap-4 overflow-x-auto`}
                                            >
                                                {source.exerciseSets &&
                                                    source.exerciseSets.map((exerciseSet) => (
                                                        <ExerciseSetCard
                                                            exerciseSet={exerciseSet}
                                                            fetchExerciseSets={fetchExerciseSets}
                                                        />
                                                    ))}
                                            </div>
                                        </div>
                                    </>
                                )}
                                {source.processedSources?.map((processedSource) => (
                                    <>
                                        {(processedSource.exerciseSets && processedSource.exerciseSets?.length > 0) && (
                                            <div
                                                className="w-full h-auto p-4
                                            flex flex-col justify-start items-start gap-2"
                                            >
                                                <div className="flex justify-start items-center gap-2">
                                                    <p className='font-serif font-semibold'>Processed Source: </p>
                                                    <p>
                                                        {processedSource.title || processedSource.title.length > 0
                                                            ? processedSource.title
                                                            : processedSource._id}
                                                    </p>
                                                </div>
                                                <div
                                                    className={`w-[${layoutDimensions.exerciseSetsContainer.width}px] flex justify-start items-center gap-4 overflow-x-auto`}
                                                >
                                                    {processedSource.exerciseSets &&
                                                        processedSource.exerciseSets.map((exerciseSet) => (
                                                            <ExerciseSetCard
                                                                exerciseSet={exerciseSet}
                                                                fetchExerciseSets={fetchExerciseSets}
                                                            />
                                                        ))}
                                                </div>
                                            </div>
                                        )}
                                    </>
                                ))}
                            </>
                        ) : (
                            <></>
                        )

                    )
                )}
            </div>
        </div>
    );
}
