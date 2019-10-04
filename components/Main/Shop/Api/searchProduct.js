import Api from './Api'

const searchProduct = (key) => {
    const url = `${Api}api/search.php?key=${key}`
    return fetch(url)
    .then(res => res.json());
}

export default searchProduct;