import { openTab } from 'src/features/workspace/features/tabs/utilities/openTab.utility';
import { NavyBlueButton } from 'src/shared/components/buttons/NavyBlueButton';
import { Section } from 'src/features/workspace/enums/sections.enum';
import { useAppDispatch } from 'src/store/hooks';
import type { ExerciseSet } from 'src/features/exercise-set/types/exercise-set.interface';
import { ExerciseSetMode } from 'src/features/exercise-set/enums/ExerciseSetMode.enum';


export function ExerciseSetCard({
    exerciseSet,
    fetchExerciseSets,
}: {
    exerciseSet: ExerciseSet;
    fetchExerciseSets: () => void;
}) {
    const dispatch = useAppDispatch();

    return (
        <div
            onClick={(event) =>
                openTab(dispatch, {
                    section: Section.EXERCISE_SET,
                    id: exerciseSet._id,
                    title: exerciseSet.title,
                })
            }
            className="w-[200px] cursor-pointer
            flex-shrink-0 flex flex-col justify-start items-center gap-1
            border p-1
            hover:bg-gray-100"
        >
            <p>{exerciseSet.type}</p>
            <p>{exerciseSet.count}</p>
            <p>{exerciseSet.difficulty}</p>
            <NavyBlueButton
                onClick={(event) => {
                    event.stopPropagation();
                    openTab(dispatch, {
                        section: Section.EXERCISE_SET_PRACTICE,
                        id: exerciseSet._id,
                        title: exerciseSet.title,
                        mode: ExerciseSetMode.PRACTICE
                    });
                }
                }
            >
                Start Practice
            </NavyBlueButton>
        </div>
    );
}
