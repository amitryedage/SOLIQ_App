import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, AppState, BackHandler } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './src/screens/HomeScreen';
import SplashScreen from './src/screens/SplashScreen';
import JourneyScreen from './src/screens/JourneyScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import VirtualSolarMarketScreen from './src/screens/VirtualSolarMarketScreen';

export default function App() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [isJourneyCompleted, setIsJourneyCompleted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentAuthScreen, setCurrentAuthScreen] = useState('login');
  const [userType, setUserType] = useState(null); // 'owner' | 'renter'
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
        // App has come to the foreground — reset to require login again
        clearTimeout(timer);
        triggerSplash();
        setIsJourneyCompleted(false);
        setIsLoggedIn(false);
        setCurrentAuthScreen('login');
        setUserType(null);
      }
      appState.current = nextAppState;
    });

    return () => {
      clearTimeout(timer);
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    const backAction = () => {
      if (!isLoggedIn) {
        if (currentAuthScreen === 'signup') {
          setCurrentAuthScreen('login');
          return true; // Prevent default Android exit
        }
        if (isJourneyCompleted) {
          setIsJourneyCompleted(false);
          return true; // Go back to journey screen
        }
      }
      return false; // Let default behavior happen
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [isLoggedIn, currentAuthScreen, isJourneyCompleted]);

  if (isSplashVisible) {
    return <SplashScreen />;
  }

  if (!isJourneyCompleted) {
    return (
      <JourneyScreen
        onComplete={(type) => {
          setUserType(type);
          setIsJourneyCompleted(true);
        }}
      />
    );
  }

  if (!isLoggedIn) {
    if (currentAuthScreen === 'signup') {
      return <SignUpScreen onSignUp={() => setIsLoggedIn(true)} onNavigateToLogin={() => setCurrentAuthScreen('login')} />;
    }
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} onNavigateToSignUp={() => setCurrentAuthScreen('signup')} />;
  }

  // Renter: show Virtual Solar Marketplace exclusively
  if (userType === 'renter') {
    return <VirtualSolarMarketScreen onProceed={() => setIsLoggedIn(false)} />;
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

