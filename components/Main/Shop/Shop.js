import React, { PureComponent } from 'react';
import { Text, View, TouchableOpacity, Dimensions, Image, TextInput, StyleSheet } from 'react-native';
import Home from './Home/Home'
import Cart from './Cart/Cart'
import TabNavigator from 'react-native-tab-navigator';
import iconHomeS from '../../media/appIcon/home0.png'
import iconHome from '../../media/appIcon/home.png'
import cartS from '../../media/appIcon/cart0.png'
import cart from '../../media/appIcon/cart.png'
import searchS from '../../media/appIcon/search0.png'
import search from '../../media/appIcon/search.png'
import contactS from '../../media/appIcon/contact0.png'
import contact from '../../media/appIcon/contact.png'
import Search from './Search/Search';
import Contact from './Contact/Contact';
import Header from './Header';
import Api from './Api/Api'
import CartsProduct from './Api/CartsProduct'
import InitData from './Api/InitData'
import GetCart from './Api/GetCart'
import SaveCart from './Api/SaveCart'
const { height } = Dimensions.get('window');
export default class Shop extends PureComponent {
  constructor(props) {
      super(props)
      this.state = {
           selectedTab: 'Home',
           categoryTypes: [],
           topProducts: [],
           cartArray: []
   }; 
   CartsProduct.addProductToCart = this.addProductToCart.bind(this);
   CartsProduct.incrQuantity = this.incrQuantity.bind(this);  
   CartsProduct.decrQuantity = this.decrQuantity.bind(this);
   CartsProduct.removeProduct = this.removeProduct.bind(this);
   CartsProduct.gotoSearch = this.gotosearch.bind(this);
  }
  componentDidMount() {
      InitData()
      .then(resJSON => {
          this.setState({ categoryTypes: resJSON.type, topProducts: resJSON.product });
      });
      GetCart()
      .then(cartArray => this.setState({ cartArray }))
  }
  gotosearch() {
    this.setState({ selectedTab: 'Search'})
}
addProductToCart(product) {
    const isExist = this.state.cartArray.some(e => e.product.id === product.id)
    if(isExist) return false;
    this.setState({ cartArray: this.state.cartArray.concat({ product, quantity: 1 }) },
        () => SaveCart(this.state.cartArray)
    )
}

  incrQuantity(productId) {
      const newCart = this.state.cartArray.map( item =>{
          if ( item.product.id !== productId) return item;
          return { product: item.product, quantity: item.quantity +1}
      });
      this.setState({ cartArray: newCart},
      () => SaveCart(this.state.cartArray))
  }

  decrQuantity(productId) {
    const newCart = this.state.cartArray.map(e => {
        if (e.product.id !== productId) return e;
        return { product: e.product, quantity: e.quantity - 1 }
    });
    this.setState({ cartArray: newCart },
        () => SaveCart(this.state.cartArray))
}
removeProduct (productId) {
    const newCart = this.state.cartArray.filter(e => e.product.id !== productId);    
    this.setState({ cartArray: newCart },
        () => SaveCart(this.state.cartArray))
}

  render() {
      const { iconStyle } = styles
      const {categoryTypes, selectedTab,topProducts,cartArray} = this.state
      
      return (
          <View style={{ flex: 1 }}>
              <Header openMenu={this.props.openMenu}
              />

              <TabNavigator>
                  <TabNavigator.Item
                      selected={selectedTab === 'Home'}
                      title="Home"
                      renderIcon={() => <Image source={iconHomeS} style={iconStyle} />}
                      renderSelectedIcon={() => <Image source={iconHome} style={iconStyle} />}
                      onPress={() => this.setState({ selectedTab: 'Home' })}>
                      <Home categoryTypes = {categoryTypes} topProducts = {topProducts}  navigation={this.props.navigation}/>
                  </TabNavigator.Item>
                  <TabNavigator.Item
                      selected={selectedTab === 'Cart'}
                      title="Cart"
                      renderIcon={() => <Image source={cartS} style={iconStyle} />}
                      renderSelectedIcon={() => <Image source={cart} style={iconStyle} />}
                      onPress={() => this.setState({ selectedTab: 'Cart' })}
                      badgeText={cartArray.length}
                  >
                      <Cart navigation={this.props.navigation} cartArray={cartArray}/>
                  </TabNavigator.Item>
                  <TabNavigator.Item
                      selected={selectedTab === 'Search'}
                      title="Search"
                      renderIcon={() => <Image source={searchS} style={iconStyle} />}
                      renderSelectedIcon={() => <Image source={search} style={iconStyle} />}
                      onPress={() => this.setState({ selectedTab: 'Search' })}>
                      <Search navigation={this.props.navigation}/>
                  </TabNavigator.Item>
                  <TabNavigator.Item
                      selected={selectedTab === 'Contact'}
                      title="Contact"
                      renderIcon={() => <Image source={contactS} style={iconStyle} />}
                      renderSelectedIcon={() => <Image source={contact} style={iconStyle} />}
                      onPress={() => this.setState({ selectedTab: 'Contact' })}>
                      <Contact />
                  </TabNavigator.Item>
              </TabNavigator>


          </View>
      )
  }
}

const styles = StyleSheet.create({
  iconStyle: {
      width: 25, height: 25
  }
})