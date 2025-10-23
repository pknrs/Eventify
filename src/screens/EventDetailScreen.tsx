import { Calendar, MapPin, Users } from 'lucide-react-native';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import eventsData from '../data/events.json';
import { useTheme } from '../theme';
import { Event } from '../types/event';

const EventDetailScreen = ({ route, navigation }: any) => {
  const { id } = route.params || {};
  const { theme } = useTheme();

  const event = (eventsData as Event[]).find(e => e.id === id);

  if (!event) {
    return (
      <View style={[styles.empty, { backgroundColor: theme.background }]}>
        <Text style={{ color: theme.text }}>Event not found</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View
        style={[
          styles.card,
          { backgroundColor: theme.card, borderColor: theme.border },
        ]}
      >
        <Text style={[styles.title, { color: theme.text }]}>{event.title}</Text>
        <View style={styles.metaRow}>
          <Calendar
            color={theme.text}
            width={16}
            height={16}
            style={styles.icon}
          />
          <Text style={[styles.meta, { color: theme.text }]}>
            {new Date(event.date).toLocaleString()}
          </Text>
        </View>
        <View style={styles.metaRow}>
          <MapPin
            color={theme.text}
            width={16}
            height={16}
            style={styles.icon}
          />
          <Text style={[styles.meta, { color: theme.text }]}>
            Location: {event.location ?? 'TBA'}
          </Text>
        </View>
        <View style={styles.metaRow}>
          <Users
            color={theme.text}
            width={16}
            height={16}
            style={styles.icon}
          />
          <Text style={[styles.meta, { color: theme.text }]}>
            Capacity: {event.capacity ?? '—'}
          </Text>
        </View>
        <Text style={[styles.desc, { color: theme.text }]}>
          {event.description}
        </Text>
      </View>
      <View style={styles.footerButton}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('GuestList', { eventId: event.id })
          }
          activeOpacity={0.8}
          style={[styles.guestButton, { backgroundColor: theme.primary }]}
        >
          <Text style={[styles.guestButtonText, styles.guestButtonTextWhite]}>
            See Guests
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: {
    margin: 16,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  meta: { fontSize: 14, marginBottom: 6 },
  desc: { fontSize: 15, marginBottom: 8 },
  footerButton: { marginHorizontal: 16, marginTop: 12 },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  guestButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  guestButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  metaRow: { flexDirection: 'row', alignItems: 'center' },
  icon: { marginRight: 8 },
  guestButtonTextWhite: { color: '#fff' },
});

export default EventDetailScreen;
