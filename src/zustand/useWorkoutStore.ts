import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import {ImageSourcePropType} from 'react-native';
import {MMKVLoader} from 'react-native-mmkv-storage';
import {persist, createJSONStorage} from 'zustand/middleware';
import {create} from 'zustand';

const mmkv = new MMKVLoader().initialize();

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

// create data from week days
const createInitialState = (): Workout[] => {
  return dayjs.weekdays().map((day: string) => {
    return {
      day,
      id: day,
      exercises: [],
    };
  });
};

export type TWorkoutStore = {
  workouts: Workout[];
  setWorkouts: (workouts: Workout[]) => void;
};

const initialState = createInitialState();

const useWorkoutStore = create(
  persist<TWorkoutStore>(
    set => ({
      workouts: initialState,
      setWorkouts: (workouts: Workout[]) => set({workouts}),
    }),
    {
      name: 'workout-storage',
      storage: createJSONStorage(() => mmkv as any),
    },
  ),
);

export default useWorkoutStore;
