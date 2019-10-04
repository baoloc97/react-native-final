import Api from '../Api/Api'

const sendOrder = (token,arrayDetail) =>(
    fetch(`${Api}api/cart.php`,
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({token,arrayDetail})
    })
    .then(res => res.text())
);

module.exports = sendOrder;