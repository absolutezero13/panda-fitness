import React, {FC} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {assets} from '../assets';
import {themeColors} from '../theme/colors';

interface Props {
  onPress: () => void;
}

const WorkoutsEmptyState: FC<Props> = ({onPress}) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>You have no workouts for today.</Text>
      <Pressable onPress={onPress} style={styles.addButton}>
        <Image source={assets.addIcon} style={styles.addIcon} />
        <Text style={styles.addWorkoutText}>Add Workout</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: themeColors.light,
    textAlign: 'center',
  },
  addButton: {
    alignItems: 'center',
    marginTop: 36,
    borderColor: themeColors.light,
    borderRadius: 10,
    width: '70%',
    padding: 12,
  },
  addIcon: {
    width: 40,
    height: 40,
    marginBottom: 12,
  },
  addWorkoutText: {
    color: themeColors.light,
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default WorkoutsEmptyState;
