import Api from './Api'

const getListProduct = (idType, page) => {
    let url;
    if (idType === 'COLLECTION') {
         url = `${Api}api/product_by_type.php?id_type=${idType}&page=${page}`
    } else {
        url = `${Api}api/get_collection.php?page=${page}`
    }
   
    return fetch(url)
    .then(res => res.json());
}

export default getListProduct;