import React, { PureComponent } from 'react';
import Drawer from 'react-native-drawer';
import Menu from './Menu/Menu';
import Shop from './Shop/Shop';
import checkLogin from '../Main/Shop/Api/checkLogin'
import getToken from '../Main/Shop/Api/getToken'
import CartsProduct from '../Main/Shop/Api/CartsProduct'
export default class Main extends PureComponent {
  
  // <Text style={{ backgroundColor: 'coral' }}> Main </Text>
  // <TouchableOpacity
  //   style={{ backgroundColor: 'yellow' }}
  //   onPress={() => this.props.navigation.navigate('Authentication')}
  // >
  //   <Text>Go to Authentication</Text>
  // </TouchableOpacity>
  // <TouchableOpacity
  //   style={{ backgroundColor: 'orange' }}
  //   onPress={() => this.props.navigation.navigate('OrderHistory')}
  // >
  //   <Text>Go to OrderHistory</Text>
  // </TouchableOpacity>
  // <TouchableOpacity
  //   style={{ backgroundColor: 'green' }}
  //   onPress={() => this.props.navigation.navigate('ChangeInfo')}
  // >
  //   <Text>Go to ChangeInfo</Text>
  // </TouchableOpacity>
  componentDidMount() {
    getToken()
    .then(token => checkLogin(token))
    .then(res => CartsProduct.onSignIn(res.user))
    .catch(err => console.log('loi check login',err));
}
  closeControlPanel = () => {
    this.drawer.close()
  };
  openControlPanel = () => {
    this.drawer.open()
  };
  

  render() {
    return (
      <Drawer
        ref={ref => { this.drawer = ref; }}
        content={<Menu navigation = {this.props.navigation}  />}
        openDrawerOffset={0.5}
        tapToClose={true}
      >
        
        <Shop openMenu= {this.openControlPanel.bind(this)}  navigation = {this.props.navigation} />
      </Drawer>
    );
  }
}
