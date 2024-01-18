import React, {FC} from 'react';
import {Image, Pressable, StyleSheet, Text} from 'react-native';
import {assets} from '../assets';
import {themeColors} from '../theme/colors';

interface Props {
  onPress: () => void;
}

export const AddWorkoutButton: FC<Props> = ({onPress}) => {
  return (
    <Pressable onPress={onPress} style={styles.addButton}>
      <Image source={assets.addIcon} style={styles.addIcon} />
      <Text style={styles.addWorkoutText}>Add Workout</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  addButton: {
    alignItems: 'center',
    marginTop: 36,
    borderColor: themeColors.light,
    borderRadius: 10,
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

export default AddWorkoutButton;
