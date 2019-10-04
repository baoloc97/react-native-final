import Api from '../Api/Api'

const url = `${Api}api/`
const initData = () => (  
        fetch(url)
        .then(response => response.json())
)
export default initData;