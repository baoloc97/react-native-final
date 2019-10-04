import React, { PureComponent } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import profileIcon from '../../media/temp/profile.png'
import CartsProduct from '../Shop/Api/CartsProduct'
import saveToken from '../Shop/Api/saveToken'
export default class Menu extends PureComponent {
  constructor(props)
  {
    super(props);
    this.state = {user:null};
    CartsProduct.onSignIn = this.onSignIn.bind(this)
  }
  onSignIn(user) {
    this.setState({ user});
   
}
onSignOut() {
  this.setState({user: null})
  saveToken('');
}
goToChangeInfo() {
  const {navigation} = this.props;
  navigation.navigate('ChangeInfo', {user: this.state.user})
}



  gotoOrderHistory() {
    this.props.navigation.navigate('OrderHistory');
  }
   gotoAuthentication() {
    this.props.navigation.navigate('Authentication');
  }
  render() {
    const { container, profile, buttonSignIn, userName,
      textSignIn, btnSignInStyle, loginContainer } = styles

  const logoutJSX = (
      <View>

          <TouchableOpacity 
          style={buttonSignIn}
          onPress = {()=>{this.props.navigation.navigate('Authentication')}}
          >
              <Text style={textSignIn}>Sign In</Text>
          </TouchableOpacity>
      </View>
  );
  const {user} = this.state
  const loginJSX = (
      <View>

          <View style={loginContainer}>
              <Text style={userName}>{user ? user.name : ''}</Text>
              <View style={{ marginBottom: 130 }}>
                  <TouchableOpacity
                      style={btnSignInStyle}
                      onPress={() => { this.props.navigation.navigate('OrderHistory') }}
                  >
                      <Text style={textSignIn}>Order History</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      style={btnSignInStyle}
                      onPress={this.goToChangeInfo.bind(this)}
                  >
                      <Text style={textSignIn}>Change Info</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={btnSignInStyle} onPress={this.onSignOut.bind(this)}>
                      <Text style={textSignIn}>Sign out</Text>
                  </TouchableOpacity>
              </View>
          </View>
      </View>
  )
  const mainJSx = this.state.user ? loginJSX : logoutJSX;
  return (
      <View style={container}>
          <Image source={profileIcon} style={profile} />
          {mainJSx}
      </View>
  )
}
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#00e676',
  borderRightWidth: 3,
  borderColor: 'white',
  alignItems: 'center'
},
profile: {
  width: 150,
  height: 150,
  borderRadius: 75,
  marginBottom: 20,
  marginTop: 20
},
buttonSignIn: {
  height: 50,
  width: 200,
  backgroundColor: 'white',
  borderRadius: 15,
  justifyContent: 'center',
  alignItems: 'center'
},
btnSignInStyle: {
  height: 50,
  width: 200,
  backgroundColor: 'white',
  borderRadius: 15,
  marginBottom: 10,
  justifyContent: 'center',
  paddingLeft: 10
},
textSignIn: {
  color: '#00e676',
  fontSize: 15,
},
loginContainer: {
  flex: 1,
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 150
},
userName: {
  color: 'white',
  fontSize: 20
}
})