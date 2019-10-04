import React, { PureComponent } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions, ListView, Alert } from 'react-native'
import sp1 from '../../../media/temp/sp1.jpeg'
import Api from '../Api/Api'
import CartsProduct from '../Api/CartsProduct';
import ProductDetail from '../ProductDetail/ProductDetail'
import sendOrder from '../Api/sendOrder'
import getToken from '../Api/getToken'

function toTitleCase(str) {
    return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}
export default class Cart extends PureComponent {

    incrQuantity(id) {
        CartsProduct.incrQuantity(id);
    }

    decrQuantity(id) {
        CartsProduct.decrQuantity(id)
    }

    removeProduct(id) {
        CartsProduct.removeProduct(id);
    }

    navigateDetail(productItem) {
        this.props.navigation.navigate('ProductDetail', { productItem });
    }
    alertSucces() {
        Alert.alert(
            'Confirm',
            'Do you want to send this order?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },

                { text: 'OK', onPress: this.onSendOrder.bind(this) },
            ],
            { cancelable: false },
        );
    }

    async onSendOrder() {
        try {
            const token = await getToken();
            const arrayDetail = this.props.cartArray.map(e => ({
                id: e.product.id,
                quantity: e.quantity
            }))
            const kq = await sendOrder(token, arrayDetail);
            console.log(kq)

            if (kq === 'THEM_THANH_CONG') {
                console.log('THEM THANH CONG')
            } else {
                console.log('them that bai')
            }
        } catch (e) {
            console.log(e);
        }
    }
    render() {

        const { cartArray } = this.props
        const { container, styleDress, styleImage, stylecA3,
            styleNumber, styleA2, body, styleLast } = styles
        const arrTotal = cartArray.map(e => e.product.price * e.quantity);
        const total = arrTotal.length ? arrTotal.reduce((a, b) => a + b) : 0;
        return (
            <View style={container}>
                <ScrollView style={body}>
                    {cartArray.map(cartItem => (
                        <View style={styleDress}>
                            <Image source={{ uri: `${Api}api/images/product/${cartItem.product.images[0]}` }} style={styleImage} />
                            <View style={styleA2}>
                                <Text style={{ fontSize: 16, color: '#9e9e9e' }}>{toTitleCase(cartItem.product.name)}</Text>
                                <Text style={{ fontSize: 17, color: '#e91e63' }}>{cartItem.product.price}$</Text>
                                <View style={styleNumber}>
                                    <TouchableOpacity onPress={() => this.incrQuantity(cartItem.product.id)}>
                                        <Text style={{ fontSize: 20, marginTop: 5 }} >+</Text>
                                    </TouchableOpacity>
                                    <Text style={{ fontSize: 20, marginTop: 5 }}>{cartItem.quantity}</Text>
                                    <TouchableOpacity onPress={() => this.decrQuantity(cartItem.product.id)}>
                                        <Text style={{ fontSize: 30 }}>-</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={stylecA3}>
                                <TouchableOpacity onPress={() => this.removeProduct(cartItem.product.id)}>
                                    <Text style={{ fontSize: 20 }}>X</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.navigateDetail(cartItem.product)}>
                                    <Text style={{ color: '#f06292' }}>SHOW DETAILS</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}

                </ScrollView>

                <TouchableOpacity style={styleLast}
                    onPress={this.alertSucces.bind(this)}
                >
                    <Text> TOTAL {total}$ CHECKOUT NOW</Text>
                </TouchableOpacity>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eeeeee'
    },
    styleDress: {
        height: 150,
        backgroundColor: 'white',
        borderRadius: 3,
        flexDirection: 'row',
        padding: 10,
        marginBottom: 15
    },
    styleImage: {
        height: 120,
        width: 80,
        marginTop: 5
    },
    styleA2: {
        justifyContent: 'space-between',
        marginLeft: 5
    },
    styleNumber: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    stylecA3: {
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginLeft: 15
    },
    body: {
        height: 100,
        backgroundColor: '#eeeeee',
        marginTop: 9,
        marginRight: 9,
        marginLeft: 9,
    },
    styleLast: {
        height: 50,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        margin: 10
    }
})
