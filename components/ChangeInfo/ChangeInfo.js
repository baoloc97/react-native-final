import React, { PureComponent } from 'react'
import { Text,Alert, View,TouchableOpacity,Image,StyleSheet,TextInput } from 'react-native'

import iconBacks from '../media/appIcon/backs.png'
import getToken from '../Main/Shop/Api/getToken'
import changeInfoApi from '../Main/Shop/Api/changInfo'
import CartsProduct from '../Main/Shop/Api/CartsProduct'
export default class ChangeInfo extends PureComponent {
    constructor(props){
        super(props)
        const {name,address,phone} =this.props.navigation.getParam('user')
        this.state = {
            txtName: name,
            txtAddres: address,
            txtPhone: phone
        }
    }
    goBackToMain() {
        const {navigation} = this.props;
        navigation.goBack()
    }
    alertSucces() {
        Alert.alert(
            'Notice',
            'update info successfully',
            [
              {text: 'Ok', onPress: this.goBackToMain.bind(this)},
            ],
            {cancelable: false},
          );
    }
    change() { 
        const {txtName,txtAddres,txtPhone} = this.state;
        console.log(txtName)
        getToken()
        .then(token => changeInfoApi(token,txtName,txtPhone,txtAddres))
        .then(user => {
            this.alertSucces();
            CartsProduct.onSignIn(user)
        })
        // .catch(err => console.log(err))
    }
    
    render() {
        const {txtName,txtAddres,txtPhone} = this.state
        const {textButton,styleButton,container,header,styleIcon,styleText,textInput,body} = styles
        return (
            <View style={container}>
                <View style = {header}>
                    <View/>
                    <Text style={styleText}>User Infomation</Text>
                    <TouchableOpacity onPress={this.goBackToMain.bind(this)}>
                        <Image source={iconBacks} style={styleIcon}/>
                    </TouchableOpacity>
                </View>
                <View style={body}>
                    <TextInput style ={textInput}
                                placeholder = 'Enter your name'
                                autoCapitalize = 'none'
                                value = {this.state.txtName}
                                onChangeText = {txtName => this.setState({...this.state,txtName})}
                    />
                    <TextInput style ={textInput}
                    placeholder = 'Enter your addres'
                    autoCapitalize = 'none'
                    value = {this.state.txtAddres}
                    onChangeText = {txtAddres => this.setState({...this.state,txtAddres})}
                    />
                    <TextInput style ={textInput}
                    placeholder = 'Enter your phone number'
                    autoCapitalize = 'none'
                    value = {this.state.txtPhone}
                    onChangeText = {txtPhone => this.setState({...this.state,txtPhone})}
                    />
                    <TouchableOpacity style = {styleButton} onPress ={ this.change.bind(this)} >
                        <Text style ={textButton}>CHANGE YOUR INFOMATION</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#eeeeee'
    },
    header:{
        height: 70,
        backgroundColor:'green',
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center'
    },
    styleText:{
        fontSize: 20,
        color:'white'
    },
    styleIcon:{
        height:30,
        width:30,
    },
    body:{
        flex:1,
        justifyContent: 'center',
        margin: 20
    },
    textInput:{
        height:50,
        borderWidth:1,
        borderColor: 'green',
        borderRadius: 30, 
        paddingLeft: 20,
        fontSize: 20 ,
        marginBottom: 20    
    },
    styleButton:{
        height:50,
        backgroundColor: 'green',
        borderRadius:30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textButton:{

    }
})