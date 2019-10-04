import React, { PureComponent } from 'react'
import { Text, View,TouchableOpacity,StyleSheet,Image,ScrollView } from 'react-native'
import CartsProduct from '../Api/CartsProduct';

import backIcon from '../../../media/appIcon/back.png'
import cartfullIcon from '../../../media/appIcon/cartfull.png'
import Api from '../Api/Api'
export default class ProductDetail extends PureComponent {
    addProductToCart() {
        const product = this.props.navigation.getParam('productItem');
        CartsProduct.addProductToCart(product);
    }
    render() {
        const { container, styleDetail,txtbotton,styleSP,moneny,information
            ,header,txtMoney,styleInformation,botton,colorStyle, imageIcon,imageStyle} = styles
            const { name, price, color, material, description, images } = this.props.navigation.getParam('productItem')
       return (
           <View style={container}>
               <View style={styleDetail}>
                   <View style={header}>
                       <TouchableOpacity onPress = {() =>{
                           this.props.navigation.goBack()
                       }}>
                           <Image source={backIcon} style={imageIcon} />
                       </TouchableOpacity>
                       <TouchableOpacity onPress = {this.addProductToCart.bind(this)}>
                           <Image source={cartfullIcon} style={imageIcon} />
                       </TouchableOpacity>
                   </View>
                   <View style = {styleSP}>
                       <Image source={{ uri: `${Api}api/images/product/${images[0]}` }} style ={imageStyle}/>
                       <Image source={{ uri: `${Api}api/images/product/${images[1]}` }} style ={imageStyle}/>
                   </View>
                   <View style={moneny}>
                       <Text style={{fontSize: 20}}>{name.toUpperCase()}</Text>
                       <Text style={txtMoney}> / {price}$</Text>
                   </View>
                   <View style={information}>
                       <Text  style={styleInformation}>
                       {description}
                       </Text>
                   </View>
                   <View style={botton}>
                       <Text style = {txtbotton}>Material {material}</Text>
                       <View style={{flexDirection:'row'}}>
                       <Text style = {txtbotton}>Color {color}</Text>
                       <View style={colorStyle}/>
                       </View>                      
                   </View>
               </View>
           </View>
       )
   }
}

const styles = StyleSheet.create({
   container: {
       flex: 1,
       backgroundColor: '#bdbdbd'
   },
   styleDetail: {
       flex: 1,
       backgroundColor: 'white',
       margin: 10,
       borderRadius: 5
   },
   header: {
       justifyContent: 'space-between',
       flexDirection: 'row',
       marginLeft: 15,
       marginTop: 20,
       marginRight: 15
   },
   imageIcon: {
       height: 25,
       width: 25
   },
   imageStyle:{
       height:230,
       width:160
   },
   styleSP:{
       flexDirection:'row',
       justifyContent:'space-around',
       marginTop: 20
   },
   moneny:{
       flexDirection:'row',
       justifyContent:'center',
       alignItems:'center',
       marginTop: 10
   },
   information:{
       marginTop: 30,
       marginLeft:17,
       marginRight: 17
   },
   styleInformation:{
       color:'#9e9e9e',
       fontSize: 15
   },
   colorStyle:{
       height:20,
       width:20,
       borderRadius:10,
       borderWidth:1,
       borderColor:'#e91e63',
       backgroundColor: 'orange'
   },
   botton:{
       flexDirection:'row',
       marginTop: 21,
       marginRight: 17,
       marginLeft:19,
       justifyContent:'space-between'
   },
   txtMoney:{
       color:'#9e9e9e',
       fontSize:18
   },
   txtbotton:{
       color: '#e91e63',
       marginRight: 10
   }
})