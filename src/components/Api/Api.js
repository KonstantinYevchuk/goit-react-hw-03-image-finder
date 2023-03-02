// const axios = require('axios').default;
const KEY = '32830280-cd5d8cae887a4565b5001e89e';
const BASE_URL = 'https://pixabay.com/api/';

export const makeFetch = async (name, page=1) => {
    try {
        const resp = await fetch(`${BASE_URL}?q=${name}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`)
        const parsed = resp.json()
        return parsed
    } catch (error) {
        console.log(error);
    }
    
}