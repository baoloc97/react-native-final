import Api from '../Api/Api'

const changeInfo = (token, name,phone, address) =>(
    fetch(`${Api}api/change_info.php`,
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({token, name,phone, address})
    })
    .then(res => res.json())
);

module.exports = changeInfo;