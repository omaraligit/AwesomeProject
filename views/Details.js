import React, {Component} from 'react';
import {Text, View, StyleSheet, ImageBackground} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Card from './Card';
import LabController from '../controllers/LabController';

export default class Details extends Component {
  state = {
    userInfo: {},
  };
  //Define your componentDidMount lifecycle hook that will retrieve data.
  //Also have the async keyword to indicate that it is asynchronous.
  async componentDidMount() {
 
    
    //Have a try and catch block for catching errors.
    try {
      //Assign the promise unresolved first then get the data using the json method.
      var _LabController = new LabController();
      _LabController
        .getUserInfo(this.props.route.params.lab_data.user_id)
        .then(response => response.json())
        .then(json => {
          this.setState({userInfo: json});
        })
        .catch(err => console.log(err));
    } catch (err) {
      console.log('Error fetching data-----------', err);
    }
  }
  render() {
    const title = this.props.route.params.foo;
    const lab_data = this.props.route.params.lab_data;
    this.props.navigation.setOptions({
      title: lab_data.lab_name,
    });

    return (
      <View style={styles.container}>
        <ScrollView>
          {/* ------------------------ */}
          {/* lab name - info          */}
          {/* ------------------------ */}
          <View style={styles.Labcard}>
            <View style={styles.LabsideIcon}>
              <Icon name="teeth-open" size={20} color="#4d59f7" />
            </View>
            <View>
              <Text style={styles.LabNameStyle}>{lab_data.lab_name}</Text>
              <Text style={styles.SubLabName}>{lab_data.lab_email}</Text>
            </View>
          </View>
          {/* ------------------------ */}
          {/* lab can do - info        */}
          {/* ------------------------ */}
          <View style={styles.LabCancard}>
            <View
              style={[
                styles.LabCanRow,
                {borderBottomWidth: 1, borderColor: '#eaedf2'},
              ]}>
              <View
                style={[
                  styles.LabCanCell,
                  {borderRightWidth: 1, borderColor: '#eaedf2'},
                ]}>
                <Text style={[styles.LabCanCellText]}>
                  Prothèses Conjointes
                </Text>
                {lab_data.lab_pc == '1' ? (
                  <Icon name="check" size={20} color="#4d59f7" />
                ) : (
                  <Icon name="times" size={20} color="red" />
                )}
              </View>
              <View style={[styles.LabCanCell]}>
                <Text style={[styles.LabCanCellText]}>Prothèses Adjointes</Text>
                {lab_data.lab_pa == '1' ? (
                  <Icon name="check" size={20} color="#4d59f7" />
                ) : (
                  <Icon name="times" size={20} color="red" />
                )}
              </View>
            </View>
            <View style={styles.LabCanRow}>
              <View
                style={[
                  styles.LabCanCell,
                  {borderRightWidth: 1, borderColor: '#eaedf2'},
                ]}>
                <Text style={[styles.LabCanCellText]}>Orthodontie</Text>
                {lab_data.lab_op == '1' ? (
                  <Icon name="check" size={20} color="#4d59f7" />
                ) : (
                  <Icon name="times" size={20} color="red" />
                )}
              </View>
              <View style={styles.LabCanCell}>
                <Text style={[styles.LabCanCellText]}>CAD/CAM</Text>
                {lab_data.lab_cad == '1' ? (
                  <Icon name="check" size={20} color="#4d59f7" />
                ) : (
                  <Icon name="times" size={20} color="red" />
                )}
              </View>
            </View>
          </View>
          {/* ------------------------ */}
          {/* lab address - info       */}
          {/* ------------------------ */}
          <View style={[styles.Labcard, {backgroundColor: '#4d59f7'}]}>
            <View style={styles.LabsideIcon}>
              <Icon name="map-marker-alt" size={20} color="#4d59f7" />
            </View>
            <View>
              <Text style={[styles.LabNameStyle, {color: '#fff'}]}>
                {lab_data.lab_address}
              </Text>
              <Text style={[styles.SubLabName, {color: '#fff'}]}>
                {lab_data.lab_city}
              </Text>
            </View>
          </View>
          {/* ------------------------ */}
          {/* lab phones               */}
          {/* ------------------------ */}
          <View style={[styles.Labcard, {backgroundColor: '#4d59f7'}]}>
            <View style={styles.LabsideIcon}>
              <Icon name="phone" size={20} color="#4d59f7" />
            </View>
            <View>
              <Text style={[styles.LabNameStyle, {color: '#fff'}]}>
                Fix - Alternative
              </Text>
              <Text style={[styles.SubLabName, {color: '#fff'}]}>
                {lab_data.lab_phone} - {lab_data.lab_phone_alt}
              </Text>
            </View>
          </View>
          {/* ------------------------ */}
          {/* lab email                */}
          {/* ------------------------ */}
          <View style={[styles.Labcard, {backgroundColor: '#4d59f7'}]}>
            <View style={styles.LabsideIcon}>
              <Icon name="envelope" size={20} color="#4d59f7" />
            </View>
            <View>
              <Text style={[styles.LabNameStyle, {color: '#fff'}]}>
                {lab_data.lab_email}
              </Text>
              <Text style={[styles.SubLabName, {color: '#fff'}]}>
                {lab_data.lab_email}
              </Text>
            </View>
          </View>
          {/* ------------------------ */}
          {/* lab name - info          */}
          {/* ------------------------ */}
          <View style={[styles.Labcard, {backgroundColor: '#fff'}]}>
            <View style={styles.LabsideIcon}>
              <Icon name="user-alt" size={20} color="#4d59f7" />
            </View>
            <View>
              <Text style={[styles.LabNameStyle, {color: '#000'}]}>
                DT. {this.state.userInfo.nom + ' ' + this.state.userInfo.prenom}
              </Text>
              <Text style={[styles.SubLabName, {color: '#000'}]}>
                {this.state.userInfo.email}
              </Text>
              <Text style={[styles.SubLabName, {color: '#000'}]}>
                {this.state.userInfo.telephone}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e8ebf1',
    flex: 1,
    paddingTop: 0,
    paddingBottom: 10,
  },
  cardsHolder: {
    marginTop: 15,
  },
  card: {
    marginLeft: 0,
    paddingBottom: 0,
    marginRight: 0,
  },
  cardImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#EDEDED',
  },
  cardTitle: {
    marginLeft: 0, // if image is there change to 15
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 6,
    marginBottom: 3,
  },
  address: {
    marginLeft: 40,
    alignItems: 'center',
    backgroundColor: '#4d59f7',
    flexDirection: 'row',
    marginTop: 10,
    padding: 10,
    borderTopStartRadius: 50,
    borderBottomLeftRadius: 50,
  },
  cardInfo: {
    marginLeft: 0,
    fontSize: 16,
    fontWeight: 'normal',
    color: '#ffffff',
  },
  sideIcon: {
    padding: 10,
    marginRight: 10,
  },
  cardSubTite: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'normal',
    color: '#363636',
  },
  Labcard: {
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 30,
    backgroundColor: '#ffffff',
    margin: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  LabsideIcon: {
    marginRight: 15,
    marginLeft: 10,
    backgroundColor: '#ffffff',
    color: '#4d59f7',
    padding: 10,
    borderRadius: 50,
    width: 50,
    height: 50,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  LabNameStyle: {
    fontSize: 16,
    textTransform: 'capitalize',
  },
  SubLabName: {
    fontSize: 12,
  },
  LabCancard: {
    borderRadius: 5,
    backgroundColor: '#ffffff',
    margin: 10,
    alignItems: 'center',
    flexDirection: 'column',
  },
  LabCanRow: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  LabCanCell: {
    width: '50%',
    paddingHorizontal: 10,
    paddingVertical: 10,
    height: 90,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  LabCanCellText: {
    marginBottom: 5,
  },
});
