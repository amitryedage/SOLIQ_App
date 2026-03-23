import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, AppState } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './src/screens/HomeScreen';
import SplashScreen from './src/screens/SplashScreen';

export default function App() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    let timer;
    const triggerSplash = () => {
      setIsSplashVisible(true);
      timer = setTimeout(() => {
        setIsSplashVisible(false);
      }, 3500);
    };

    // Show splash on initial load
    triggerSplash();

    const subscription = AppState.addEventListener('change', nextAppState => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        // App has come to the foreground
        clearTimeout(timer);
        triggerSplash();
      }
      appState.current = nextAppState;
    });

    return () => {
      clearTimeout(timer);
      subscription.remove();
    };
  }, []);

  if (isSplashVisible) {
    return <SplashScreen />;
  }

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <HomeScreen />
        <StatusBar style="auto" />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
