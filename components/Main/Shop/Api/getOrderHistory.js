import Api from '../Api/Api'

const getOrderHistory = (token) =>(
    fetch(`${Api}api/order_history.php`,
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({token})
    })
    .then(res => res.json())
);

module.exports = getOrderHistory;