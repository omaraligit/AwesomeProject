import React from 'react';

import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import Details from './Details';
import HomeComponent from './HomeComponent';
import SearchResult from './SearchResult';
import ViewMore from './ViewMore';

const Stack = createStackNavigator();
export default class Home extends React.Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="HomeComponent"
          component={HomeComponent}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="SearchResult" component={SearchResult} />
        <Stack.Screen name="viewMore" component={ViewMore} />
      </Stack.Navigator>
    );
  }
}
