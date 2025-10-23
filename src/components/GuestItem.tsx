import { CheckCircle, User, XCircle } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../theme';
import { Guest } from '../types/guest';

type Props = {
  guest: Guest;
  onPress?: () => void;
};

const GuestItem = ({ guest, onPress }: Props) => {
  const { theme, mode } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.row,
        { backgroundColor: theme.card, borderColor: theme.border },
      ]}
    >
      <View style={styles.left}>
        {/* Guest name */}
        <View style={styles.nameRow}>
          <User
            color={theme.text}
            width={18}
            height={18}
            style={styles.leftIcon}
          />
          <Text style={[styles.name, { color: theme.text }]}>{guest.name}</Text>
        </View>
        {/* Company */}
        <Text style={[styles.meta, { color: theme.text }]}>
          {guest.company ?? ''}
        </Text>
      </View>
      <View style={styles.right}>
        {/* Ticket type */}
        <Text style={[styles.meta, { color: theme.text }]}>
          {guest.ticketType}
        </Text>
        {/* Status */}
        <View style={styles.statusRow}>
          <View
            style={[
              styles.badge,
              {
                backgroundColor: guest.checkedIn
                  ? mode === 'dark'
                    ? '#4ADE80'
                    : '#86EFAC'
                  : mode === 'dark'
                  ? '#FCA5A5'
                  : '#FCA5A5',
              },
            ]}
          >
            {guest.checkedIn ? (
              <CheckCircle
                color="#064E3B"
                width={14}
                height={14}
                style={styles.badgeIcon}
              />
            ) : (
              <XCircle
                color="#7F1D1D"
                width={14}
                height={14}
                style={styles.badgeIcon}
              />
            )}
            <Text
              style={[
                styles.badgeText,
                guest.checkedIn
                  ? styles.badgeTextChecked
                  : styles.badgeTextNotChecked,
              ]}
            >
              {guest.checkedIn ? 'Checked' : 'Not checked'}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    padding: 12,
    marginHorizontal: 12,
    marginVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  left: { flex: 1 },
  right: { alignItems: 'flex-end' },
  name: { fontSize: 16, fontWeight: '600' },
  meta: { fontSize: 12 },
  nameRow: { flexDirection: 'row', alignItems: 'center' },
  leftIcon: { marginRight: 8 },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  statusIcon: { marginRight: 6 },
  badge: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 10,
    minWidth: 64,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  badgeIcon: { marginRight: 6 },
  badgeTextChecked: { color: '#042E16' },
  badgeTextNotChecked: { color: '#3B0F0F' },
});

export default GuestItem;
