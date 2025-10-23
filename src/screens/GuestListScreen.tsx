import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import Filters from '../components/Filters';
import GuestItem from '../components/GuestItem';
import SearchBar from '../components/SearchBar';
import eventsData from '../data/events.json';
import guestsData from '../data/guests.json';
import { useTheme } from '../theme';
import { Guest } from '../types/guest';

const GuestListScreen = ({ route, navigation }: any) => {
  const { eventId } = route.params || {};
  const { theme } = useTheme();
  const [query, setQuery] = useState('');
  const [ticketType, setTicketType] = useState<string | null>(null);
  const [checkedIn, setCheckedIn] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [guests, setGuests] = useState<Guest[]>([]);

  const ITEM_HEIGHT = 72;

  // Memoized renderItem to avoid unnecessary re-renders
  const renderItem = useCallback(
    ({ item }: { item: Guest }) => <GuestItem guest={item} />,
    [],
  );

  // Provide getItemLayout for fast scroll
  const getItemLayout = useCallback(
    (_: ArrayLike<Guest> | null | undefined, index: number) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    [],
  );

  // Memoize filtered list to avoid unnecessary recalculations
  const filtered = useMemo(() => {
    return guests.filter(g => {
      if (query) {
        const q = query.toLowerCase();
        if (
          !g.name.toLowerCase().includes(q) &&
          !(g.email || '').toLowerCase().includes(q)
        )
          return false;
      }
      if (ticketType) {
        if (ticketType !== '' && g.ticketType !== ticketType) return false;
      }
      if (checkedIn) {
        if (checkedIn !== '') {
          const want = checkedIn === 'true';
          if (!!g.checkedIn !== want) return false;
        }
      }
      return true;
    });
  }, [guests, query, ticketType, checkedIn]);

  const keyExtractor = useCallback((item: Guest) => item.id, []);

  useEffect(() => {
    const all = guestsData as Guest[];
    const filteredByEvent = eventId
      ? all.filter(g => g.eventId === eventId)
      : all;
    setGuests(filteredByEvent);
  }, [eventId]);

  useEffect(() => {
    if (!navigation) return;
    if (!eventId) {
      navigation.setOptions({ title: 'Guest List' });
      return;
    }
    const events = eventsData as { id: string; title: string }[];
    const ev = events.find(e => e.id === eventId);
    const base = ev ? `${ev.title}'s Guest List` : 'Guest List';
    navigation.setOptions({ title: base });
  }, [navigation, eventId]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      const all = guestsData as Guest[];
      const filteredByEvent = eventId
        ? all.filter(g => g.eventId === eventId)
        : all;
      setGuests(filteredByEvent);
      setRefreshing(false);
    }, 600);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <SearchBar value={query} onChange={setQuery} />
      <Filters
        ticketType={ticketType ?? ''}
        setTicketType={setTicketType}
        checkedIn={checkedIn ?? ''}
        setCheckedIn={setCheckedIn}
      />

      <FlatList
        data={filtered}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        initialNumToRender={12}
        windowSize={10}
        getItemLayout={getItemLayout}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.primary}
          />
        }
        ListEmptyComponent={
          <Text style={[styles.emptyText, { color: theme.text }]}>
            No guests found.
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 4 },
  emptyText: { padding: 16 },
  footer: { padding: 16, alignItems: 'center' },
});

export default GuestListScreen;
