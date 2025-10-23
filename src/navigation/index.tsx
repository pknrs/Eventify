import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EventDetailScreen from '../screens/EventDetailScreen';
import EventListScreen from '../screens/EventListScreen';
import GuestListScreen from '../screens/GuestListScreen';
import { useTheme } from '../theme';

const AppNavigation = () => {
  const Stack = createNativeStackNavigator();
  const { theme } = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="EventList"
        screenOptions={{
          headerStyle: { backgroundColor: theme.headerBackground },
          headerTintColor: theme.headerText,
        }}
      >
        <Stack.Screen
          name="EventList"
          component={EventListScreen}
          options={{ headerTitle: 'Events List' }}
        />
        <Stack.Screen
          name="EventDetail"
          component={EventDetailScreen}
          options={{ headerTitle: 'Event Detail' }}
        />
        <Stack.Screen name="GuestList" component={GuestListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
