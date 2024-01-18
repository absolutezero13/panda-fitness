import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import {ImageSourcePropType} from 'react-native';
import {create} from 'zustand';

dayjs.extend(localeData);

export type UserExercise = {
  id: string;
  name: string;
  sets: number;
  image: ImageSourcePropType;
};

export type Workout = {
  exercises: UserExercise[];
  day: string;
  id: string;
};

// create data from wee kdays
const createInitialState = (): Workout[] => {
  return dayjs.weekdays().map((day: string) => {
    return {
      day,
      id: day,
      exercises: [],
    };
  });
};

type TWorkoutStore = {
  workouts: Workout[];
  setWorkouts: (workouts: Workout[]) => void;
  todaysWorkout: Workout;
  setTodaysWorkout: (workout: Workout) => void;
};

const initialState = createInitialState();

const useWorkoutStore = create<TWorkoutStore>(set => ({
  workouts: initialState,
  setWorkouts: (workouts: Workout[]) => set({workouts}),
  todaysWorkout: initialState[0],
  setTodaysWorkout: (workout: Workout) => set({todaysWorkout: workout}),
}));

export default useWorkoutStore;
