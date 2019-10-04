import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { fromLeft } from 'react-navigation-transitions';
import Authentication from '../Authentication/Authentication';
import OrderHistory from '../OrderHistory/OrderHistory';
import ChangeInfo from '../ChangeInfo/ChangeInfo';
import Main from '../Main/Main';
import Home from '../Main/Shop/Home/Home'
import Shop from '../Main/Shop/Shop'
import Cart from '../Main/Shop/Cart/Cart'
import ListProduct from '../Main/Shop/ListProduct/ListProduct'
import ProductDetail from '../Main/Shop/ProductDetail/ProductDetail'
import React, { PureComponent } from 'react'
import { Text, View } from 'react-native'

export default class A extends PureComponent {
  
    render(){
      
      const Appnavigator = createStackNavigator(
        {
            Authentication: { screen: Authentication },
            OrderHistory: { screen: OrderHistory, },
           
            ChangeInfo: { screen: ChangeInfo },
            ProductDetail: {screen:ProductDetail},
            ListProduct: {screen: ListProduct},
            Main: { screen: Main }
        },
        {
            initialRouteName: 'Main',
            transitionConfig: ()=>fromLeft(500),
            headerMode: 'none'
        }
    )
    const A = createAppContainer(Appnavigator)
    return(
        <A/>
    )
  }
  
}


