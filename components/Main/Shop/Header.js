import React, { PureComponent } from 'react'
import { Text, View,StyleSheet,Image,Dimensions,TouchableOpacity,TextInput } from 'react-native'

import MenuIcon from '../../media/appIcon/ic_menu.png'

import LogoIcon from '../../media/appIcon/ic_logo.png'
import CartsProduct from '../Shop/Api/CartsProduct'
import search from '../Shop/Api/searchProduct'
const { height } = Dimensions.get('window');
export default class Header extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            txtSearch: []
        }
    }
    
    onSearch() {
        const {txtSearch} = this.state;
        search(txtSearch)
        .then(arrProduct =>CartsProduct.setSearchArray(arrProduct))
        .catch(err => console.log(err))
    }
    
    render() {
        const { wrapper, icon1, textInput, iconStyle, styleTitle } = styles
        return (
            <View style={wrapper}>
                <View style={icon1}>
                    <TouchableOpacity onPress={() => { this.props.openMenu('Menu') }}>
                        <Image
                            source={MenuIcon}
                            style={iconStyle}
                        />
                    </TouchableOpacity>
                    <Text style={styleTitle}>Wearing A Dress</Text>
                    <Image
                        source={LogoIcon}
                        style={iconStyle}
                    />
                </View>
                <View >
                    <TextInput style={textInput}
                        placeholder='What do you want to buy?'
                        onChangeText = {text => this.setState({txtSearch: text})}
                        onFocus={()=>CartsProduct.gotoSearch()}
                        onSubmitEditing={this.onSearch.bind(this)}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        height: height / 8, backgroundColor: 'green', padding: 10, justifyContent: 'space-around'
    },
    icon1: {
        flex: 1, flexDirection: 'row', justifyContent: 'space-between'
    },
    textInput: {
        backgroundColor: 'white', height: height / 20, padding: 5, paddingLeft: 10
    },
    iconStyle: {
        width: 25, height: 25
    },
    styleTitle: {
        color: 'white', fontSize: 25
    }
})
