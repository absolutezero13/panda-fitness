import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import {create} from 'zustand';

dayjs.extend(localeData);

type Exercise = {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
};

type Workout = {
  exercises: Exercise[];
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
};

const useWorkoutStore = create<TWorkoutStore>(set => ({
  workouts: createInitialState(),
  setWorkouts: (workouts: Workout[]) => set({workouts}),
}));

export default useWorkoutStore;
