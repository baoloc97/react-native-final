import React, { PureComponent } from 'react';
import { TextInput,Text, View, TouchableOpacity,Image,StyleSheet } from 'react-native';
import icBack from '../media/appIcon/back_white.png'
import iconLogo from '../media/appIcon/ic_logo.png'
import register from '../Main/Shop/Api/register'
import SignIn from './SignIn'
import SignUp from './SignUp'
export default class Authentication extends PureComponent {
  constructor(props)
  {
    super(props);
    this.state={isSignIn: true};
  }
  gotoSignIn()
  {
    this.setState({isSignIn:true});
  }
  
  signUp()
  {
    this.setState({isSignIn:false});
  }
  goBackToMain() {
    const { navigation } = this.props;
    navigation.navigate('Main');
}

render() {
  const { icon1, iconStyle, styleTitle,
      inactiveStyle, activeStyle,
      container, controlStyle, 
      signInstyle, signUpStyle, } = styles

 
  const {isSignIn} = this.state
  const mainJSX = isSignIn ? <SignIn goBackToMain = {this.goBackToMain.bind(this)}/> : <SignUp gotoSignIn={this.gotoSignIn.bind(this)}/>
  return (
      <View style={container}>
          <View style={icon1}>
              <TouchableOpacity onPress={() => { this.props.navigation.navigate('Main') }}>
                  <Image
                      source={icBack}
                      style={iconStyle}
                  />
              </TouchableOpacity>
              <Text style={styleTitle}>Wearing A Dress</Text>
              <Image
                  source={iconLogo}
                  style={iconStyle}
              />
          </View>
          {mainJSX}
          <View style={controlStyle}>
              <TouchableOpacity 
              style={signInstyle} 
              onPress ={() =>{this.setState({isSignIn : true})}}
              >
                  <Text style={isSignIn ? activeStyle : inactiveStyle}>SIGN IN</Text>
              </TouchableOpacity>
              <TouchableOpacity 
              style={signUpStyle}
              onPress ={() =>{this.setState({isSignIn : false})}}
              >
                  <Text style={!isSignIn ? activeStyle : inactiveStyle}>SIGN UP</Text>
              </TouchableOpacity>
          </View>
      </View>
  )
}
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: 'green',
  padding: 20,
  justifyContent: 'space-between'
},
icon1: {
  flexDirection: 'row', justifyContent: 'space-between'
},
iconStyle: {
  width: 25, height: 25
},
styleTitle: {
  color: 'white', fontSize: 25
},
controlStyle: {
  flexDirection: 'row',
  width: 300
},
inactiveStyle: {
  color: '#eeeeee'
},
activeStyle: {
  color: 'green'
},
signInstyle: {
  backgroundColor: 'white',
  alignItems: 'center',
  flex: 1,
  paddingVertical: 20,
  marginRight: 5,
  marginLeft:17,
  borderTopLeftRadius: 30,
  borderBottomLeftRadius: 30
},
signUpStyle: {
  backgroundColor: 'white',
  alignItems: 'center',
  flex: 1,
  paddingVertical: 20,
  borderTopRightRadius: 30,
  borderBottomRightRadius: 30
},

})