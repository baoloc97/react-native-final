import React, { PureComponent } from 'react'
import { Text, View,TouchableOpacity,StyleSheet,Image,ScrollView } from 'react-native'

import iconBacks from '../media/appIcon/backs.png'
import getOrderHistory from '../Main/Shop/Api/getOrderHistory'
import getToken from '../Main/Shop/Api/getToken'
export default class OrderHistory extends PureComponent {
    constructor(props)
    {
        super(props);
        this.state = {arrOrder:[]}
    }
    componentDidMount()
    {
        getToken()
        .then(token => getOrderHistory(token))
        .then(arrOrder => this.setState({ arrOrder }))
        .catch(err => console.log(err))
    }
    
    
    render() {
        const { arrOrder } = this.state
        const { container, header, styleText, styleIcon, History,
            o1, o2, styleTextO1 } = styles
        return (
            <ScrollView style={container}>
                <View style={header}>
                    <View />
                    <Text style={styleText}>Order History</Text>
                    <TouchableOpacity onPress={() => { this.props.navigation.goBack() }}>
                        <Image source={iconBacks} style={styleIcon} />
                    </TouchableOpacity>
                </View>
                {arrOrder.map(e => (
                    <View style={History}  key = {e.id}>
                        <View style={o1}>
                            <Text style={styleTextO1}>Order id:</Text>
                            <Text style={styleTextO1}>OrderTime:</Text>
                            <Text style={styleTextO1}>Status:</Text>
                            <Text style={styleTextO1}>Total:</Text>
                        </View>
                        <View style={o2}>
                            <Text style={{ color: '#00bcd4' }}>ORD{e.id}</Text>
                            <Text style={{ color: '#f48fb1' }}>{e.date_order}</Text>
                            <Text style={{ color: '#00bcd4' }}>{e.status ? 'Completed' : 'Pending'}</Text>
                            <Text style={{ color: '#e91e63' }}>{e.total}$</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eeeeee',
    },
    header: {
        height: 70,
        backgroundColor: 'green',
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center'
    },
    styleText: {
        fontSize: 20,
        color: 'white'
    },
    styleIcon: {
        height: 30,
        width: 30,
    },
    History: {
        height: 120,
        backgroundColor: 'white',
        margin: 13,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    o1: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginLeft: 7
    },
    o2: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginRight: 7
    },
    styleTextO1: {
        color: '#9e9e9e',
        fontSize: 15
    }
})