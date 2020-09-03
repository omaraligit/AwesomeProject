import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';

const dimensions = Dimensions.get('window');
const imageWidth = dimensions.width / 1.4;

export default class Splash extends Component {
  state = {
    fadeAnim: new Animated.Value(0),
    zoomAnim: new Animated.Value(0.5),
  };

  animateIn = () => {
    // Will change fadeAnim value to 0 in 5 seconds
    const fadIn = Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 1800,
      useNativeDriver: false, // Add This line
    });
    const zoomIn = Animated.timing(this.state.zoomAnim, {
      toValue: 1,
      duration: 650,
      useNativeDriver: false, // Add This line
    });
    Animated.parallel([fadIn, zoomIn]).start();
  };

  render() {
    this.animateIn();

    return (
      <View style={styles.container}>
        <Animated.Image
          source={require('./../assets/images/snpdm.png')}
          style={[
            {
              opacity: this.state.fadeAnim, // Bind opacity to animated value
              width: Animated.multiply(this.state.zoomAnim, imageWidth),
              height: Animated.multiply(this.state.zoomAnim, imageWidth),
            },
            styles.imageSpash,
          ]}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  imageSpash: {},
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
