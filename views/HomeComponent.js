import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  TouchableHighlight,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LabController from '../controllers/LabController';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default class HomeComponent extends React.Component {
  state = {
    modalVisible: false,
    cadcamLabs: [],
    Pro_Con_Labs: [],
    Pro_Adj_Labs: [],
    OrthodontieLabs: [],
    counter: 0,
    finderText: '',
  };

  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };

  //Define your componentDidMount lifecycle hook that will retrieve data.
  //Also have the async keyword to indicate that it is asynchronous.
  async componentDidMount() {
    //Have a try and catch block for catching errors.
    try {
      //Assign the promise unresolved first then get the data using the json method.
      var _LabController = new LabController();
      _LabController
        .getCadCam()
        .then(response => response.json())
        .then(json => {
          var links = [];
          json.map((item, i) => {
            if (i < 10) {
              links.push(item);
            }
          });
          this.setState({cadcamLabs: links});
        })
        .catch(err => console.log(err));

      _LabController
        .getPA_Labs()
        .then(response => response.json())
        .then(json => {
          var links = [];
          json.map((item, i) => {
            if (i < 10) {
              links.push(item);
            }
          });
          this.setState({Pro_Adj_Labs: links});
        })
        .catch(err => console.log(err));

      _LabController
        .getPC_Labs()
        .then(response => response.json())
        .then(json => {
          var links = [];
          json.map((item, i) => {
            if (i < 10) {
              links.push(item);
            }
          });
          this.setState({Pro_Con_Labs: links});
        })
        .catch(err => console.log(err));

      _LabController
        .getOP_Labs()
        .then(response => response.json())
        .then(json => {
          var links = [];
          json.map((item, i) => {
            if (i < 10) {
              links.push(item);
            }
          });
          this.setState({OrthodontieLabs: links});
        })
        .catch(err => console.log(err));
      _LabController
        .getLabsCouter()
        .then(response => response.json())
        .then(json => {
          this.setState({counter: json.counter});
        })
        .catch(err => console.log(err));
    } catch (err) {
      console.log('Error fetching data-----------', err);
    }
  }
  renderLoader(dataLoading) {
    if (dataLoading.length == 0) {
      return (
        <View style={styles.loaderHolder}>
          <ActivityIndicator size="small" color="#4d59f7" />
        </View>
      );
    }
    return null;
  }

  renderSections(data, title, callbackFun) {
    return (
      <View>
        <View style={styles.navbar}>
          <Text
            style={([styles.sdataCouter], {fontSize: 18, fontWeight: 'bold'})}>
            {title}
          </Text>
          <TouchableOpacity onPress={callbackFun}>
            <Text
              style={([styles.sdataCouter], {fontSize: 14, color: '#B1ADAD'})}>
              Voire plus
            </Text>
          </TouchableOpacity>
        </View>
        {this.renderLoader(data)}
        <View style={[styles.cardsHolder]}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={data}
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
        <View style={styles.separator} />
      </View>
    );
  }
  render() {
    var _LabController_Inst = new LabController();
    //Destruct pokeList and Loading from state.
    const {
      cadcamLabs,
      Pro_Con_Labs,
      Pro_Adj_Labs,
      OrthodontieLabs,
      counter,
      finderText,
    } = this.state;
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.searchConatiner}>
            <TextInput
              onChangeText={text => this.setState({finderText: text})}
              value={finderText}
              style={styles.searchInput}
              placeholder="Chercher des laboratoires..."
            />
            <TouchableOpacity
              style={styles.searchButton}
              onPress={() => {
                this.props.navigation.navigate('SearchResult', {
                  finderText: finderText,
                });
              }}>
              <Icon
                name="search"
                size={20}
                style={styles.searchIcon}
                color="#B1ADAD"
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.sub_search}>
            {counter} Laboratoires lister sur la platforme
          </Text>
          {/* ------------------------ */}
          {/* CADCAM - info */}
          {/* ------------------------ */}
          {this.renderSections(cadcamLabs, 'CAD/CAM', () => {
            this.props.navigation.navigate('viewMore', {
              title: 'CAD/CAM',
              data: _LabController_Inst.getCadCam(1000),
            });
          })}
          {/* ------------------------ */}
          {/* Conj - info */}
          {/* ------------------------ */}
          {this.renderSections(Pro_Con_Labs, 'Prothèses Conjointes', () => {
            this.props.navigation.navigate('viewMore', {
              title: 'Prothèses Conjointes',
              data: _LabController_Inst.getPC_Labs(1000),
            });
          })}
          {/* ------------------------ */}
          {/* Adj - info */}
          {/* ------------------------ */}
          {this.renderSections(Pro_Adj_Labs, 'Prothèses Adjointes', () => {
            this.props.navigation.navigate('viewMore', {
              title: 'Prothèses Adjointes',
              data: _LabController_Inst.getPA_Labs(1000),
            });
          })}
          {/* ------------------------ */}
          {/* Adj - info */}
          {/* ------------------------ */}
          {this.renderSections(OrthodontieLabs, 'Orthodontie', () => {
            this.props.navigation.navigate('viewMore', {
              title: 'Orthodontie',
              data: _LabController_Inst.getOP_Labs(1000),
            });
          })}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 10,
    paddingBottom: 40,
  },
  cardsHolder: {
    marginTop: 15,
  },
  card: {
    width: 250,
    marginLeft: 12,
    paddingBottom: 15,
    marginRight: 10,
  },
  cardImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#EDEDED',
  },
  cardTitle: {
    marginLeft: 10, // if image is there change to 15
    fontSize: 14,
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
  separator: {
    backgroundColor: 'lightgray',
    height: 1,
    marginVertical: 15,
  },
  cardInfo: {
    marginLeft: 10,
    fontSize: 12,
    fontWeight: 'normal',
    color: '#77858C',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  address: {
    marginLeft: 10,
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 6,
  },
  navbarData: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
  },
  headerCard: {
    height: 260,
    borderRadius: 20,
    overflow: 'hidden',
    marginHorizontal: 16,
    marginVertical: 30,
    backgroundColor: 'rgba(0,0,0,0.5)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  headerInnerCard: {
    height: 260,
    position: 'relative',
  },
  cardHeaderText: {
    position: 'absolute',
    fontWeight: 'bold',
    bottom: 80,
    left: 30,
    color: '#fff',
  },
  cardHeaderBigText: {
    position: 'absolute',
    fontWeight: 'bold',
    bottom: 30,
    left: 30,
    color: '#fff',
    fontSize: 40,
  },
  subcontainer: {
    paddingHorizontal: 25,
    paddingTop: 15,
  },
  latest: {
    fontWeight: '400',
    fontSize: 20,
    color: '#000',
  },
  dataView: {
    flexDirection: 'row',
    height: 260,
  },
  dataCouter: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#B1ADAD',
  },
  sdataCouter: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#000',
    marginBottom: 0,
    marginLeft: 10,
  },
  dataCouterView: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flex: 1,
    height: '100%',
    marginBottom: 18,
    paddingHorizontal: 34,
  },
  dataCouterViewItem: {
    width: 30,
    borderRadius: 30,
    backgroundColor: '#E5E5E5',
    marginLeft: 8,
  },
  dataCouterViewItemText: {
    width: 30,
    borderRadius: 30,
    marginLeft: 8,
    color: '#A2A2A2',
    textAlign: 'center',
    backgroundColor: 'transparent',
    marginTop: 15,
    fontWeight: 'bold',
  },
  dataCouterFade: {
    color: '#A2A2A2',
    fontSize: 18,
  },
  dataViwerCal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 30,
    paddingHorizontal: 34,
  },
  dataline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 34,
  },
  datalineHeader: {
    fontSize: 28,
    color: '#A2A2A2',
    marginTop: 20,
  },
  inlineTextIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  boldText: {
    fontWeight: 'normal',
    fontSize: 18,
  },
  icon: {
    marginRight: 10,
  },
  hr: {
    width: '100%',
    height: 3,
    backgroundColor: '#F6F6F6',
    marginBottom: 20,
  },
  chart: {
    padding: 25,
  },
  searchConatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    height: 40,
    justifyContent: 'space-between',
    borderRadius: 5,
    marginHorizontal: 20,
    overflow: 'hidden',
    paddingHorizontal: 15,
    marginVertical: 20,
    borderColor: '#EDEDED',
    borderWidth: 1,
    marginBottom: 0,
  },
  sub_search: {
    marginHorizontal: 20,
    fontSize: 10,
    marginBottom: 20,
    marginTop: 5,
  },
  searchInput: {
    fontFamily: 'CircularStd-Bold',
    flex: 1,
    fontSize: 14,
    color: '#444D61',
  },
  searchButton: {
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    margin: 0,
    backgroundColor: 'white',
    borderRadius: 0,
    padding: 0,
    height: '100%',
    paddingTop: 35,
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
  openButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5,
    paddingHorizontal: 15,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'right',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'right',
    fontSize: 25,
  },
  loaderHolder: {
    paddingVertical: 40,
  },
});
