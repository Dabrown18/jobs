import React, { Component } from 'react';
import { View, StyleSheet, Button, Platform } from 'react-native';

import RegisterForm from '../components/auth/RegisterForm';
import { firebaseApp } from '../firebase/firebase';
import Spinner from '../components/Spinner';

export default class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      registered: null
    };
  }

  renderContent() {
    switch (this.state.registered) {

      case true:
        this.props.navigation.navigate('map')

      case false:
        return <RegisterForm />;

      default:
        return <Spinner size='large' />
    }
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Register',
    headerLeft:
        <Button
          title='Back'
          onPress={() => { navigation.navigate('Auth'); }}
          backgroundColor='rgba(0,0,0,0)'
          color='rgba(0,122,255,1)'
        />,
    style: {
      marginTop: Platform.OS === 'android' ? 24 : 0
    }
  })

  render() {

    return (
      <View style={styles.container}>
        <RegisterForm />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf8ec',
    width: null,
    justifyContent: 'center',
  }
});
