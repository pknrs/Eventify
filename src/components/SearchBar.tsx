import { Search, X } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../theme';

type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
};

const SearchBar = ({
  value,
  onChange,
  placeholder = 'Search guests...',
}: Props) => {
  const { theme } = useTheme();
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.card, borderColor: theme.border },
      ]}
    >
      <View style={styles.iconWrap} pointerEvents="none">
        <Search color={theme.text} width={18} height={18} />
      </View>
      {value ? (
        <TouchableOpacity
          onPress={() => onChange('')}
          style={styles.iconRight}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Clear search"
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <X color={theme.text} width={18} height={18} />
        </TouchableOpacity>
      ) : null}
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={theme.text}
        style={[styles.input, { color: theme.text }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 12,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 8,
  },
  input: {
    height: 40,
    paddingLeft: 36,
  },
  iconWrap: {
    position: 'absolute',
    left: 10,
    top: '50%',
    transform: [{ translateY: -9 }],
  },
  iconRight: {
    position: 'absolute',
    zIndex: 2,
    elevation: 2,
    right: 10,
    top: '50%',
    transform: [{ translateY: -9 }],
  },
});

export default SearchBar;
