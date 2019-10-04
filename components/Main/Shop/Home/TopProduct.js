import React, { PureComponent } from 'react'
import { Text, View, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native'

import sp1 from '../../../media/temp/sp1.jpeg'
import sp2 from '../../../media/temp/sp2.jpeg'
import sp3 from '../../../media/temp/sp3.jpeg'
import sp4 from '../../../../media/temp/sp4.jpeg'

import Api from '../Api/Api'

export default class TopProduct extends PureComponent {
    constructor(props) {
        super(props);
        this.navigateDetail = this.navigateDetail.bind(this);
    }
    navigateDetail(productItem) {
        this.props.navigation.navigate('ProductDetail', { productItem });
    }
    render() {
        const {topProducts} = this.props
        const { container, title, titleContainer,
            body, titleBody, image, productName, productPrice } = styles
        return (
            <View style={container}>
                <View style={titleContainer}>
                    <Text style={title}> Top  Product </Text>
                </View>
                <FlatList
                    contentContainerStyle={body}
                    data={topProducts}
                    keyExtractor={item => item.id}
                    numColumns={2}
                    renderItem={({ item }) => (
                          < TouchableOpacity onPress={() => {
                            this.navigateDetail(item)
                        }}>
                            <View style={{ titleBody }}>
                                {/* <Text style={productName}>{item.images[0]}</Text> */}
                                <Image source={{ uri: `${Api}api/images/product/${item.images[0]}` }}  style={image}/>
                                <Text style={productName}>{item.name.toUpperCase()}</Text>
                                <Text style={productPrice}>{item.price}$</Text>
                            </View>
                        </TouchableOpacity >
                    )}
                />
            </View>
        )
    }
}

const { width } = Dimensions.get('window');
const produtWidth = (width - 50) / 2;
const productImageHeight = produtWidth / 361 * 452

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        margin: 10
    },
    titleContainer: {
        height: 50,
        justifyContent: 'center',
        paddingLeft: 10
    },
    title: {
        color: '#ff8a80',
        fontSize: 20
    },
    body: {
        alignItems:'center',
        justifyContent: 'space-around',
        flex:1
    },
    titleBody: {
        width: produtWidth,        
    },
    image: {
        width: produtWidth,
        height: productImageHeight,
        marginRight:5,
        marginLeft:5
    },
    productName: {
        paddingLeft: 10,
    },
    productPrice: {
        paddingLeft: 10
    }
})