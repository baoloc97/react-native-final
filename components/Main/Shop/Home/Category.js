import React, { PureComponent } from 'react'
import { Text, View, Image, StyleSheet, Dimensions, ImageBackground, TouchableOpacity } from 'react-native'
import littleIcon from '../../../media/temp/little.jpg'
import maxiIcon from '../../../media/temp/maxi.jpg'
import partyIcon from '../../../media/temp/party.jpg'
const { width, height } = Dimensions.get('window');
import Api from '../Api/Api'
import Swiper from 'react-native-swiper'
export default class Category extends PureComponent {
    constructor(props) {
        super(props);
        this.goToListProduct = this.goToListProduct.bind(this);
    }
    goToListProduct(category) {
        this.props.navigation.navigate('ListProduct',{category})
    }
   
    
    render(){
            const {categoryTypes} =this.props;
            
            const { wraper, textStyle, imagestyle, textImage } = styles
            const swiper = (
                <Swiper >
                    {categoryTypes.map(e => (
                        <TouchableOpacity onPress={() => this.goToListProduct(e)} key={e.id}>
                            <ImageBackground resizeMode='stretch' source={{ uri: `${Api}api/images/type/${e.image}` }} style={imagestyle} >
                                <Text style={textImage}>{e.name}</Text>
                            </ImageBackground >
                        </TouchableOpacity>
                    ))}
                </Swiper>)
            return (
                <View style={wraper}>
                    <View style={{ flex: 1 }}>
                        <Text style={textStyle}>LIST OF CATEGORY</Text>
                    </View>
                    <View style={{ flex: 5, }}>
                        {swiper}
                    </View>
    
                </View>
            )
        }
    }
    //933 x465
    const imageWidth = width - 40
    const imageHeight = imageWidth / 800 * 400
    
    const styles = StyleSheet.create({
        wraper: {
            height: 225,
            backgroundColor: 'white',
            margin: 10,
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.2,
            padding: 10
        },
        textStyle: {
            fontSize: 20,
            color: '#9e9e9e'
        },
        imagestyle: {
            height: imageHeight,
            width: imageWidth,
            justifyContent: 'center',
            alignItems: 'center'
            // marginBottom: 50
        },
        textImage: {
            fontSize: 23,
            color: '#bdbdbd'
        }
    })
    