import React, {FC, useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {DefaultWorkout} from '../zustand/useDefaultWorkouts';
import {TextInput} from 'react-native-gesture-handler';
import {themeColors} from '../theme/colors';
import {assets} from '../assets';
import {UserExercise} from '../zustand/useWorkoutStore';

const ITEM_HEIGHT = 80;

interface Props {
  item: DefaultWorkout | UserExercise;
  addMode?: boolean;
  onPress?: (item: DefaultWorkout | UserExercise, sets: number) => void;
  onAddOrMinusPress?: (
    item: DefaultWorkout | UserExercise,
    value: number,
  ) => void;
}

export const Workout: FC<Props> = ({
  item: workout,
  addMode = true,
  onPress,
  onAddOrMinusPress,
}) => {
  const [sets, setSets] = useState(workout.sets);

  const onPressHandler = () => {
    if (sets === 0) {
      Alert.alert('Error', 'Please enter a valid number of sets');
      return;
    }

    if (addMode && onPress) {
      onPress(workout, sets);
    }
  };
  return (
    <View>
      <TouchableOpacity
        onPress={onPressHandler}
        activeOpacity={0.5}
        disabled={!addMode}
        style={styles.itemWrapper}>
        <View style={styles.imageWrapper}>
          <Image source={workout.image} style={styles.image} />
        </View>
        <Text style={styles.itemName}>{workout.name}</Text>
        {addMode ? (
          <Image source={assets.addIcon} style={styles.addIcon} />
        ) : (
          <View style={styles.setsSection}>
            <Text
              onPress={() => onAddOrMinusPress?.(workout, -1)}
              style={styles.addOrMinus}>
              -
            </Text>
            <View style={{marginHorizontal: 6}}>
              <Text style={styles.sets}>{workout.sets}</Text>
              <Text style={styles.setsText}>Sets</Text>
            </View>
            <Text
              onPress={() => onAddOrMinusPress?.(workout, 1)}
              style={styles.addOrMinus}>
              +
            </Text>
          </View>
        )}
      </TouchableOpacity>
      {addMode && (
        <View style={styles.inputsWrapper}>
          <Text style={styles.inputText}> Sets </Text>
          <TextInput
            style={styles.input}
            value={sets.toString()}
            placeholderTextColor={themeColors.light}
            onChangeText={(text: string) =>
              setSets(text ? parseInt(text, 10) : 0)
            }
            keyboardType="numeric"
            autoCapitalize="none"
            cursorColor={themeColors.light}
          />
        </View>
      )}
    </View>
  );
};

export const styles = StyleSheet.create({
  itemWrapper: {
    flexDirection: 'row',
    height: ITEM_HEIGHT,
    borderWidth: 1,
    borderColor: themeColors.light,
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  imageWrapper: {
    width: ITEM_HEIGHT,
    height: ITEM_HEIGHT,
    backgroundColor: themeColors.light,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  itemName: {
    fontSize: 18,
    alignSelf: 'center',
    color: themeColors.light,
    marginLeft: 20,
    fontWeight: 'bold',
  },
  addIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    position: 'absolute',
    right: 20,
    flexDirection: 'row',
  },
  setsSection: {
    flexDirection: 'row',
    position: 'absolute',
    right: 20,
    alignItems: 'center',
  },
  inputsWrapper: {alignSelf: 'center'},
  input: {
    borderWidth: 1,
    borderColor: themeColors.secondary,
    borderRadius: 8,
    color: themeColors.light,
    paddingVertical: 12,
    marginBottom: 24,
    fontSize: 18,
    fontWeight: 'bold',
    width: 60,
    textAlign: 'center',
  },
  inputText: {
    color: themeColors.light,
    marginBottom: 2,
    textAlign: 'center',
  },
  sets: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: themeColors.light,
  },
  setsText: {
    color: themeColors.light,
    textAlign: 'center',
  },
  addOrMinus: {
    color: themeColors.light,
    fontSize: 24,
    fontWeight: 'bold',
  },
});
