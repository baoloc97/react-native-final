import React, { PureComponent } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import map from '../../../media/temp/map.jpg'
import location from '../../../media/appIcon/location.png'
import phone from '../../../media/appIcon/phone.png'
import mail from '../../../media/appIcon/mail.png'
import massage from '../../../media/appIcon/message.png'

function toTitleCase(str) {
    return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}
export default class Contact extends PureComponent {
    render() { 
    const { container, text, styleMap, bodyMap, bodyContact, icon, contack } = styles
    return (
        <View style={container}>
        <View style={bodyMap}>
            <MapView style ={styleMap}
                provider={PROVIDER_GOOGLE}
               
                region={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                  }}
            >
            </MapView>
        </View>     
            <View style={bodyContact}>
                <View style={contack}>
                    <Image source={location} style={icon} />
                    <Text style={text}>67 Luy Ban Bich/Tan Phu</Text>
                </View>
                <View style={contack}>
                    <Image source={phone} style={icon} />
                    <Text style={text}>(+84)352804047</Text>
                </View>
                <View style={contack}>
                    <Image source={mail} style={icon} />
                    <Text style={text}>garapho85@gmail.com</Text>
                </View>
                <View style={contack}>
                    <Image source={massage} style={icon} />
                    <Text style={text}>(+84)9877067707</Text>
                </View>
            </View>
        </View>
    )
                }
            }
const styles = StyleSheet.create({
container: {
    flex: 1,
    // backgroundColor: '#eeeeee'
    
},

bodyMap: {
    height: 260,
    // backgroundColor: '#eeeeee',
    justifyContent: 'center',
    alignItems: 'center'
},
styleMap: {
   
    height: 250,
    width: 330,
    
},
bodyContact: {
    flex: 1,
    margin: 10,
    backgroundColor: 'white',
    justifyContent: 'space-around',
},
icon: {
    height: 30,
    width: 30,
},
contack: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 15,
    borderBottomWidth: 1,
    borderColor: '#bdbdbd'
},
text: {
    color: '#ec407a'
}
})