import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  AsyncStorage,
  Animated,
  Keyboard,
  StyleSheet,
  Button
} from 'react-native';
import { connect } from 'react-redux';

import { firebaseApp } from '../../firebase/firebase';
import Spinner from '../Spinner';
import { setUser } from '../../actions/actions';
import { USER_TOKEN } from '../../actions/types';
import * as actions from '../../actions/types';
import DualPicker from '../DualPicker';

import AuthScreen from '../../screens/AuthScreen';
import RegistrationScreen from '../../screens/RegistrationScreen';

const logo = require('../../images/logo.png');

export default class RegisterForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      age: 10,
      email: '',
      password: '',
      error: '',
      loading: false,
      showForm: false,
      tokenExists: false
    };
  }

  register() {
    let { firstname, lastname, age, email, password } = this.state
    let sex = this.refs.sexPicker.state.selected.toLowerCase()
    let user = { firstname, lastname, age, email, password }

    console.log('called signup with ', email, password);

    firebaseApp.auth().createUserWithEmailAndPassword(email, password)
      .then(user => {
        addUser({ firstname, lastname, age, email, password }, user.uid)
      })
      .catch(error => {this.setState({feedback: error.message})})
  }

  render() {

    return (
      <View style={RegisterStyles.container}>

          <View style={RegisterStyles.content}>

            <Image source={logo} style={RegisterStyles.logo}/>

            <View style={RegisterStyles.inputContainer}>

              <TextInput
                value={this.state.firstname}
                onChangeText={firstname => this.setState({ firstname })}
                autoCorrect={false}
                placeholder="First Name"
                style={RegisterStyles.input}
              />

              <TextInput
                value={this.state.lastname}
                onChangeText={lastname => this.setState({ lastname })}
                placeholder="Last Name"
                style={RegisterStyles.input}
              />

              <TextInput
                placeholder='Age'
                style={RegisterStyles.input}
                onChangeText={age => this.setState({ age })}
                keyboardType={'number-pad'}
              />

              <DualPicker
                title='Gender'
                options={[{symbol: '♂', title: 'Male'}, {symbol: '♀', title: 'Female'}]}
                ref="sexPicker"
              />

              <TextInput
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
                autoCorrect={false}
                placeholder="Email"
                style={RegisterStyles.input}
              />

              <TextInput
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
                secureTextEntry={true}
                placeholder="Password"
                style={RegisterStyles.input}
              />

            </View>

            <TouchableOpacity
              style ={RegisterStyles.registerContainer}
              onPress={() => this.props.navigator.push({ name : 'signup' })}
              onPress={() => this.register()}
            >
              <Text style={RegisterStyles.registerText}>Level Up</Text>
            </TouchableOpacity>

          </View>

      </View>
    );
  }
}

const RegisterStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf8ec',
    width: null,
    justifyContent: 'center'
  },
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
    justifyContent: 'center'
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 95
  },
  logo: {
    width: 350,
    height: 100,
    alignItems: 'flex-start',
    justifyContent: 'center',
    resizeMode: 'contain'
  },
  inputContainer: {
    margin: 20,
    marginBottom: 0,
    padding: 20,
    paddingBottom: 10,
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'rgba(137,178,224,0.2)',
  },
  input: {
    fontSize: 16,
    height: 40,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'rgba(255,255,255,1)',
    textAlign: 'center'
  },
  buttonContainer: {
    marginBottom: 10,
    padding: 10,
    borderColor: '#fff',
    backgroundColor: '#89b2e0'
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff'
  },
  registerContainer: {
    alignSelf: 'stretch',
    margin: 20,
    padding: 20,
    borderColor: '#fff',
    backgroundColor: '#89b2e0'
  },
  registerText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: "#fff"
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
});