import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigation from './navigation';
import { ThemeProvider, useTheme } from './theme';

const ThemedStatusBar = () => {
  const { theme, mode } = useTheme();
  const barStyle = mode === 'dark' ? 'light-content' : 'dark-content';
  return (
    <StatusBar backgroundColor={theme.headerBackground} barStyle={barStyle} />
  );
};

function App() {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <ThemedStatusBar />
        <AppNavigation />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

export default App;
