import {AsyncStorage} from 'react-native'

const GetCart = async () => {
    try {
        const value = await AsyncStorage.getItem('@cart');
        if (value !== null) {
            return JSON.parse(value);
        }
        return [];
    } catch (error) {
        return []
    }
}

export default GetCart