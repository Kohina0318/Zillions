import * as React from 'react';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {navigationRef} from '../../navigations/NavigationDrw/NavigationService'; 
import {isDarkMode} from '../../components/Theme/ThemeDarkLightColor';
import Login from '../../screens/auth/Login';
import Splash from '../../screens/intro/Splash'
import ViewPager from '../../screens/intro/ViewPager'
import Header from '../../components/shared/header/Header';

function MainNavigationStack(props) {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer
      theme={isDarkMode ? DarkTheme : DefaultTheme}
      ref={navigationRef}>
      <Stack.Navigator headerShown={false}>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
          <Stack.Screen
          name="ViewPager"
          component={ViewPager}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="Header"
          component={Header}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigationStack;
