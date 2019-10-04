import Api from '../Api/Api'
import getToken from './getToken'
import saveToken from '../Api/saveToken'

const getNewToken = (token) => (
    fetch(`${Api}api/refresh_token.php`,
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({token})
    })
    .then(res => res.text())
)
const refreshToken = async () => {
    try {
        const token = getToken();
        if (token === '' || token === 'TOKEN_KHONG_HOP_LE') {
            console.log('chua co token')
        }
        const newToken = await getNewToken(token);
        await saveToken(newToken);
        console.log('TOKEN MOI:' + newToken)
    } catch (c) {
        console.log(e)
    }
};

export default refreshToken;