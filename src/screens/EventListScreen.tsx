import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import EventCard from '../components/EventCard';
import eventsData from '../data/events.json';
import { useTheme } from '../theme';
import { Event } from '../types/event';

const EventListScreen = ({ navigation }: any) => {
  const { theme } = useTheme();
  const [events, setEvents] = useState<Event[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const ITEM_HEIGHT = 96;

  // Memoized renderItem to avoid unnecessary re-renders
  const renderItem = useCallback(
    ({ item }: { item: Event }) => (
      <EventCard
        event={item}
        compact
        onPress={() => navigation.navigate('EventDetail', { id: item.id })}
      />
    ),
    [navigation],
  );

  // Provide fixed item height for fast scroll
  const getItemLayout = useCallback(
    (_: ArrayLike<Event> | null | undefined, index: number) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    [],
  );

  // Key extractor for efficient list diffing
  const keyExtractor = useCallback((item: Event) => item.id, []);

  useEffect(() => {
    setEvents(eventsData as Event[]);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setEvents(eventsData as Event[]);
      setRefreshing(false);
    }, 600);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={events}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        // Remove offscreen items to reduce memory usage
        removeClippedSubviews={true}
        // Limit render batch size for smoother scrolling
        maxToRenderPerBatch={8}
        updateCellsBatchingPeriod={50}
        // Render initial items once for performance
        initialNumToRender={8}
        windowSize={9}
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
            No events found.
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 8 },
  emptyText: {
    padding: 16,
  },
});

export default EventListScreen;
