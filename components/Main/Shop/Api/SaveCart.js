import {AsyncStorage} from 'react-native'

const SaveCart = async (cartArray) => {
    await  AsyncStorage.setItem('@cart', JSON.stringify(cartArray))
}

export default SaveCart