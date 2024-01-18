import React, {FC} from 'react';
import {ActivityIndicator, StyleSheet, Text} from 'react-native';
import {themeColors} from '../theme/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface Props {
  title: string;
  onPress: () => void;
  style?: any;
  textStyle?: any;
  disabled?: boolean;
  loading?: boolean;
  loadingColor?: string;
  loadingSize?: number | 'small' | 'large';
  loadingStyle?: any;
}

const AppButton: FC<Props> = ({
  title,
  onPress,
  style,
  textStyle,
  disabled,
  loading,
  loadingColor,
  loadingSize,
  loadingStyle,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.button,
        style,
        {
          backgroundColor: disabled ? themeColors.disabled : themeColors.light,
        },
      ]}
      onPress={onPress}
      disabled={disabled}>
      {loading ? (
        <ActivityIndicator
          color={loadingColor || themeColors.light}
          size={loadingSize || 'small'}
          style={[styles.loading, loadingStyle]}
        />
      ) : (
        <Text
          style={[
            styles.text,
            textStyle,
            {
              color: disabled ? themeColors.disabledText : themeColors.primary,
            },
          ]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  loading: {
    marginVertical: 4,
  },
});
