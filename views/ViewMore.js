import React, {Component} from 'react';
import {Text, View, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import LabController from '../controllers/LabController';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class ViewMore extends Component {
  state = {
    moreLabs: [],
  };

  //Define your componentDidMount lifecycle hook that will retrieve data.
  //Also have the async keyword to indicate that it is asynchronous.
  async componentDidMount() {
    this.props.navigation.setOptions({
      title: this.props.route.params.title,
    });
    this.props.route.params.data
      .then(response => response.json())
      .then(json => {
        this.setState({moreLabs: json});
      })
      .catch(err => console.log(err));
  }


  render() {
    const {moreLabs} = this.state;
    return (
      <View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={moreLabs}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
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
                    <Icon name="map-marker-alt" size={12} color="red" />
                    <Text style={styles.cardInfo}>
                      {item.lab_address}, {item.lab_city}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
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
});
