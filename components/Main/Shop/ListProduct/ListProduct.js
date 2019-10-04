import React, { PureComponent } from 'react'
import { ScrollView,Text, View, TouchableOpacity, StyleSheet,Image,FlatList,RefreshControl } from 'react-native'
import backList from '../../../media/appIcon/backList.png'
import sp1 from '../../../media/temp/sp1.jpeg'
import Api from '../Api/Api'
import getListProduct from '../Api/getListProduct'
import iconBack from '../../../media/appIcon/back.png'
function toTitleCase(str) {
    return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}
export default class ListProduct extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            listProducts: [],
            refreshing: false,
            page: 1
        };
        this.arr = []
    }
    componentDidMount() {
        const { id } = this.props.navigation.getParam('category')  
        getListProduct(id,1)
        .then(arrProduct => {
            this.arr = arrProduct;
            this.setState({listProducts: this.arr})
        })
        .catch(err => console.log(err))
    }
    
    goToDetail(productItem) {
        this.props.navigation.navigate('ProductDetail', { productItem });
    }
    render() {
        const { constainer, header, inContainer, styleShow, colorStyle,
            iconStyle, textIcon, styleBody, styleParty, informationStyle
            , styleNameSp1, styleMoney, materialStyle, styleTextColor
            , styleTouopcity } = styles
        const { name } = this.props.navigation.getParam('category')
        return (
            <View style={constainer}>
                <View style={inContainer}>
                    <View style={header}>
                        <TouchableOpacity onPress={() => { this.props.navigation.goBack() }}>
                            <Image source={iconBack} style={iconStyle} />
                        </TouchableOpacity>
                        <Text style={textIcon}>{name}</Text>
                    </View>
                    <FlatList
                        keyExtractor={item => item.id}
                        data={this.state.listProducts}
                        renderItem={({ item }) => (
                            <View style={styleBody}>
                                <Image source={{uri: `${Api}api/images/product/${item.images[0]}`}} style={styleParty} />
                                <View style={informationStyle}>
                                    <Text style={styleNameSp1}>{toTitleCase(item.name)}</Text>
                                    <Text style={styleMoney}>{item.price}$</Text>
                                    <Text style={materialStyle}>Material {item.material}</Text>
                                    <View style={styleTouopcity}>
                                        <Text style={styleTextColor}>Color {item.color}</Text>
                                        <View style={{height: 20,
                                                    width: 20,
                                                    borderRadius: 10,
                                                    backgroundColor: item.color.toLowerCase(),
                                                    marginRight: 5,
                                                    marginLeft: 5}} />
                                        <TouchableOpacity onPress={() => this.goToDetail(item)}>
                                            <Text style={styleShow}>SHOW DETAILS</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )}
                        refreshControl = {
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={()=>{
                                    this.setState({refreshing: true});
                                    const newPage = this.state.page +1
                                    const { id } = this.props.navigation.getParam('category')
                                    getListProduct(id,newPage)
                                    .then(arrProduct =>{
                                        this.arr=arrProduct.concat(this.arr)
                                        this.setState({
                                        listProducts: this.arr,
                                        refreshing: false
                                    })})
                                }}
                            />
                        }
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    constainer: {
        flex: 1,
        backgroundColor: '#e0e0e0'
    },
    inContainer: {
        flex: 1,
        backgroundColor: 'white',
        margin: 12,
        borderRadius: 10
    },
    header: {
        height: 50,
        borderBottomWidth: 1,
        borderColor: '#efebe9',
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
    },
    iconStyle: {
        height: 30,
        width: 30
    },
    textIcon: {
        color: '#ec407a',
        fontSize: 20,
        marginRight: 100
    },
    styleBody: {
        height: 150,
        borderBottomWidth: 1,
        borderColor: '#efebe9',
        marginRight: 10,
        marginLeft: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    styleParty: {
        width: 80,
        height: 120,
        marginTop: 10
    },
    informationStyle: {
        justifyContent: 'space-between'
    },
    styleNameSp1: {
        fontSize: 25,
        color: '#efebe9'
    },
    styleMoney: {
        color: '#ec407a'
    },
    materialStyle: {
        fontSize: 15
    },
    styleTouopcity: {
        height: 45,
        flexDirection: 'row',
    },
    styleTextColor: {
        fontSize: 15
    },
    colorStyle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        backgroundColor: 'gainsboro',
        marginRight: 5,
        marginLeft: 5
    },
    styleShow: {
        fontSize: 12,
        color: '#ec407a'
    }
})

