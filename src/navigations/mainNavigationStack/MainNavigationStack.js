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
import ViewPager from '../../screens/intro/ViewPager'
import Header from '../../components/shared/header/Header';
import Splash from '../../screens/intro/Splash';
import Dashboard from '../../screens/dashboard/Dashboard';
import BottomNavigationStack from '../bottomNavigator/BottomNavigationStack';
import Categories from '../../screens/category/Categories';
import Cart from '../../screens/cart/Cart';
import WishList from '../../screens/wishList/WishList';
import Profile from '../../screens/profile/Profile';
import Order from '../../screens/order/Order';
import Products from '../../screens/category/Products';
import SubCategories from '../../screens/category/SubCategories';
import DrawerNavigation from '../drawer/DrawerNavigation';
import LatestFeaturedProducts from '../../screens/dashboard/LatestFeaturedProducts';
import BestSelling from '../../screens/dashboard/BestSelling';
import RecentlyViewed from '../../screens/dashboard/RecentlyViewed';
import MostViewed from '../../screens/dashboard/MostViewed';
import Brands from '../../screens/dashboard/Brands';
import ProductDetail from '../../screens/category/ProductDetail';
import Register from '../../screens/auth/Register';
import ForgotPassword from '../../screens/auth/ForgotPassword';

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
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
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
        <Stack.Screen
          name="Dashboard"
          component={DrawerNavigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Categories"
          component={Categories}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SubCategories"
          component={SubCategories}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Products"
          component={Products}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetail}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Brands"
          component={Brands}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LatestFeaturedProducts"
          component={LatestFeaturedProducts}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BestSelling"
          component={BestSelling}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RecentlyViewed"
          component={RecentlyViewed}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MostViewed"
          component={MostViewed}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="WishList"
          component={WishList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Order"
          component={Order}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigationStack;
