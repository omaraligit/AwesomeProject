import React, {Component} from 'react';
import {Text, View, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-community/async-storage';
import {useIsFocused} from '@react-navigation/native';

export default class Liked extends Component {
  state = {
    cadcamLabs: [],
  };

  //Define your componentDidMount lifecycle hook that will retrieve data.
  //Also have the async keyword to indicate that it is asynchronous.
  async componentDidMount() {
    this.props.navigation.setOptions({
      title: 'this.props.route.params.finderText',
    });
    this.props.navigation.addListener('focus', () => {
      // The screen is focused
      AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys, (err, stores) => {
          var links = [];
          stores.map((result, i, store) => {
            // get at each store's key/value so you can work with it
            let key = store[i][0];
            let value = store[i][1];
            links.push(JSON.parse(value));
            console.log(key, value);
          });

          this.setState({cadcamLabs: links});
        });
      });
      // Call any action
    });
  }

  deleteItem(index, item) {
    AsyncStorage.removeItem('liked_' + item.id, err => {
      try {
        var likeddata = this.state.cadcamLabs;
        console.log(likeddata);
        likeddata.splice(index, 1);
        this.setState({cadcamLabs: likeddata});
      } catch (error) {
        throw error;
      }
    });
  }
  render() {
    const {cadcamLabs} = this.state;
    return (
      <View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={cadcamLabs}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => {
            return (
              <View
                onPress={() => {
                  this.props.navigation.navigate('Details', {
                    foo: 'Lab name here',
                    lab_data: item,
                  });
                }}>
                <View style={styles.card} key={item}>
                  {/* <ImageBackground style={[styles.cardImage]} source={ {uri: 'https://images.unsplash.com/photo-1584652292544-31a77c49abe5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=720&q=20'} }></ImageBackground> */}
                  <Text style={styles.cardTitle}>{item.lab_name}</Text>
                  <Text style={styles.cardSubTite}>{item.lab_email}</Text>
                  <View style={styles.address}>
                    <Icon name="map-marker-alt" size={14} color="red" />
                    <Text style={styles.cardInfo}>
                      {item.lab_address}, {item.lab_city}
                    </Text>
                  </View>
                  <View style={styles.actionButtons}>
                    <TouchableOpacity
                      onPress={() => {
                        this.deleteItem(index, item);
                      }}
                      style={styles.delete}>
                      <Icon name="trash" size={12} color="gray" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate('Details', {
                          foo: 'Lab name here',
                          lab_data: item,
                        });
                      }}
                      style={styles.more}>
                      <Icon name="info-circle" size={12} color="gray" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    marginLeft: 12,
    paddingBottom: 15,
    marginRight: 10,
    padding: 10,

    borderRadius: 5,
    backgroundColor: '#ffffff',
    margin: 10,
  },
  cardImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#EDEDED',
  },
  cardTitle: {
    marginLeft: 10, // if image is there change to 15
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 6,
    marginBottom: 3,
  },
  cardSubTite: {
    marginLeft: 10,
    fontSize: 12,
    fontWeight: 'normal',
    color: '#363636',
  },
  cardInfo: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: 'normal',
    color: '#77858C',
  },
  address: {
    marginLeft: 10,
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 6,
  },
  more: {
    marginTop: 10,
    padding: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
    overflow: 'hidden',
    borderColor: '#e1e1e1',
    borderWidth: 1,
  },
  delete: {
    marginTop: 10,
    padding: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
    overflow: 'hidden',
    borderColor: '#e1e1e1',
    borderRightWidth: 0,
    borderWidth: 1,
  },
  actionButtons: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
