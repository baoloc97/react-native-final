import {AsyncStorage} from 'react-native'

const saveToken = async (token) => {
    try{
        await  AsyncStorage.setItem('@token', token);
        return 'thanh_cong'
    } catch(e){
        return e;
    }
} 


export default saveToken