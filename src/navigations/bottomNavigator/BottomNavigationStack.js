import * as React from 'react';
import {View, Dimensions, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image as ImageR} from 'react-native';
import {
  TransitionSpecs,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {Colors} from '../../assets/config/Colors';
import {FontFamily} from '../../assets/fonts/FontFamily';
import {MyThemeClass} from '../../components/Theme/ThemeDarkLightColor';
import {MainNavigatorstyle} from '../../assets/css/MainNavigatorstyle';
import Dashboard from '../../screens/dashboard/Dashboard';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import MI from 'react-native-vector-icons/MaterialIcons';
import FA from 'react-native-vector-icons/FontAwesome';
import Categories from '../../screens/category/Categories';
import Cart from '../../screens/cart/Cart';
import WishList from '../../screens/wishList/WishList';
import Profile from '../../screens/profile/Profile';

const Tab = createBottomTabNavigator();
const MyTransition = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  headerStyleInterpolator: HeaderStyleInterpolators.forFade,
};

export default function BottomNavigationStack() {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 50,
          backgroundColor: themecolor.THEMECOLOR1,
          borderColor: themecolor.BOXBORDERCOLOR,
          keyboardHidesTabBar: true,
          labelStyle: MainNavigatorstyle.tab1,
          style: MainNavigatorstyle.tab2,
          animationEnabled: true,
          inactiveTintColor: Colors.gray,
          activeTintColor: themecolor.HEADERTHEMECOLOR,
          showLabel: false,
          fontFamily: FontFamily.PopinsMedium,
          headerShown: false,
          top:8,
        },
      }}>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          MyTransition,
          tabBarLabel: ' ',
          tabBarLabelStyle: {bottom: -5},
          tabBarIcon: ({color, size, focused}) =>
            focused ? (
              <>
                <MCI
                  name="home"
                  color={themecolor.HEADERTHEMECOLOR}
                  size={22}
                />
                <View style={MainNavigatorstyle.tabbarbottomborder} />
              </>
            ) : (
              <>
                <MCI name="home" size={22} />
              </>
            ),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Category"
        component={Categories}
        options={{
          MyTransition,
          tabBarLabel: ' ',
          tabBarLabelStyle: {bottom: -5},
          tabBarIcon: ({color, size, focused}) =>
            focused ? (
              <>
                <MI
                  name="category"
                  color={themecolor.HEADERTHEMECOLOR}
                  size={22}
                />
                <View style={MainNavigatorstyle.tabbarbottomborder} />
              </>
            ) : (
              <>
                <MI name="category" size={22} />
              </>
            ),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          MyTransition,
          tabBarLabel: ' ',
          tabBarLabelStyle: {bottom: -5},
          tabBarIcon: ({color, size, focused}) =>
            focused ? (
              <>
                <MCI
                  name="cart"
                  color={themecolor.HEADERTHEMECOLOR}
                  size={22}
                />
                <View style={MainNavigatorstyle.tabbarbottomborder} />
              </>
            ) : (
              <>
                <MCI name="cart" size={22} />
              </>
            ),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Wishlist"
        component={WishList}
        options={{
          MyTransition,
          tabBarLabel: ' ',
          tabBarLabelStyle: {bottom: -5},
          tabBarIcon: ({color, size, focused}) =>
            focused ? (
              <>
                <MCI
                  name="cards-heart"
                  color={themecolor.HEADERTHEMECOLOR}
                  size={22}
                />
                <View style={MainNavigatorstyle.tabbarbottomborder} />
              </>
            ) : (
              <>
                <MCI name="cards-heart" size={22} />
              </>
            ),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          MyTransition,
          tabBarLabel: ' ',
          tabBarLabelStyle: {bottom: -5},
          tabBarIcon: ({color, size, focused}) =>
            focused ? (
              <>
                <FA
                  name="user-circle"
                  color={themecolor.HEADERTHEMECOLOR}
                  size={20}
                />
                <View style={MainNavigatorstyle.tabbarbottomborder} />
              </>
            ) : (
              <>
                <FA name="user-circle-o" size={20} />
              </>
            ),
          headerShown: false,
        }}
      />

      </Tab.Navigator>
  );
}
