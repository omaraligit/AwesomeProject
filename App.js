/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './views/Home';
import {StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from './views/Splash';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

export default class App extends React.Component {
  state = {
    homeActive: false,
  };

  goHomeAfterSplash = visible => {
    this.setState({homeActive: visible});
  };

  render() {
    setTimeout(() => {
      this.goHomeAfterSplash(true);
    }, 2000);
    if (this.state.homeActive) {
      return (
        <NavigationContainer>
          <StatusBar backgroundColor="#4d59f7" barStyle="light-content" />
          <Tab.Navigator
            screenOptions={({route}) => ({
              tabBarIcon: ({focused, color, size}) => {
                var iconName = '';

                if (route.name == 'Home') {
                  iconName = 'home';
                }
                if (route.name == 'Liked') {
                  iconName = 'heart';
                }
                if (route.name == 'Blog') {
                  iconName = 'tag';
                }
                if (route.name == 'Profile') {
                  iconName = 'user';
                }

                // You can return any component that you like here!
                var color = focused ? '#4d59f7' : '#333333';
                var selectdeStyle = focused ? {fontSize: 24} : {};
                return (
                  <Icon
                    name={iconName}
                    size={16}
                    color={color}
                    style={({paddingTop: 10}, selectdeStyle)}
                  />
                );
              },
            })}
            tabBarOptions={{
              showLabel: false,
              activeTintColor: 'red',
              inactiveTintColor: 'green',
              labelStyle: {
                fontFamily: 'CircularStd-Bold',
              },
              style: {
                backgroundColor: '#fff',
                height: 55,
                paddingBottom: 10,
                paddingTop: 10,
              },
            }}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Liked" component={Home} />
            {/* <Tab.Screen name="Blog" component={Home} /> */}
            <Tab.Screen name="Profile" component={Home} />
          </Tab.Navigator>
        </NavigationContainer>
      );
    } else {
      return <Splash />;
    }
  }
}
