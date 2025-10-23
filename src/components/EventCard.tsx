import { Calendar, MapPin } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../theme';
import { Event } from '../types/event';

type Props = {
  event: Event;
  onPress?: () => void;
  compact?: boolean;
};

const EventCardComponent = ({ event, onPress, compact = false }: Props) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.card,
        { backgroundColor: theme.card, borderColor: theme.border },
      ]}
    >
      <View>
        {/* Title */}
        <Text style={[styles.title, { color: theme.text }]}>{event.title}</Text>
        {/* Date */}
        <View style={styles.metaRow}>
          <Calendar
            color={theme.text}
            width={14}
            height={14}
            style={styles.icon}
          />
          <Text style={[styles.meta, { color: theme.text }]}>
            {new Date(event.date).toLocaleString()}
          </Text>
        </View>
        {/* Location */}
        {!compact && event.location ? (
          <View style={styles.metaRow}>
            <MapPin
              color={theme.text}
              width={14}
              height={14}
              style={styles.icon}
            />
            <Text style={[styles.meta, { color: theme.text }]}>
              {event.location}
            </Text>
          </View>
        ) : null}
        {/* Description */}
        {!compact && event.description ? (
          <Text style={[styles.desc, { color: theme.text }]} numberOfLines={2}>
            {event.description}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  meta: {
    fontSize: 12,
    marginBottom: 2,
  },
  metaRow: { flexDirection: 'row', alignItems: 'center' },
  icon: { marginRight: 6 },
  desc: {
    marginTop: 6,
    fontSize: 13,
  },
});

export const EventCard = React.memo(EventCardComponent);
export default EventCard;
