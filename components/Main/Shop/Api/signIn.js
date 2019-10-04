import Api from '../Api/Api'

const signIn = (email,password) =>(
    fetch(`${Api}api/login.php`,
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({email,password})
    })
    .then(res => res.json())
);

module.exports = signIn;