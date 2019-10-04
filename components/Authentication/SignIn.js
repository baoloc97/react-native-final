import React, { PureComponent } from 'react'
import { Text, View,TouchableOpacity,StyleSheet,TextInput } from 'react-native'
import signIn from '../Main/Shop/Api/signIn';
import CartsProduct from '../Main/Shop/Api/CartsProduct'

import saveToken from '../Main/Shop/Api/saveToken'

export default class SignIn extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    onSignIn() {
        const {email,password} = this.state;
        signIn(email,password)
        .then(res => {
            CartsProduct.onSignIn(res.user);
            this.props.goBackToMain();
            saveToken(res.token)
        })
        // .catch(err => console.log(err));
    }

    render() {
        const {email, password} = this.state
        const {  buttonText,bigButton,inputstyle} =styles
        return (
            <View>
                <TextInput 
                    style={inputstyle} 
                    placeholder='Enter your email' 
                    value ={email}
                    onChangeText={text => this.setState({email: text})}
                />
                <TextInput 
                    style={inputstyle} 
                    placeholder='Enter your password' 
                    value = {password}
                    onChangeText = {text => this.setState({password: text})}
                    secureTextEntry
                />
                <TouchableOpacity style={bigButton} onPress={this.onSignIn.bind(this)}>
                    <Text style={buttonText}>SIGN IN NOW</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputstyle: {
        height: 50,
        backgroundColor: 'white',
        marginBottom: 10,
        borderRadius: 30,
        paddingLeft: 30
    },
    bigButton: {
        height: 50,
        borderWidth: 1,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30
    },
    buttonText: {
        color: '#f5f5f5',
        fontSize: 20
    }
})