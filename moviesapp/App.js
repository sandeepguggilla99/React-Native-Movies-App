// Author - Sandeep Guggilla

import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import MainNav from './src/navigation/MainNav'


/**
 * Functional component that renders the main application.
 * It wraps the content with SafeAreaProvider and NavigationContainer.
 * @returns JSX element representing the main application layout.
 */
export default function App() {
  return (
    <SafeAreaProvider initialRouteName="Home">
      <NavigationContainer>
        <MainNav/>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
