import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://personio-fe-test.herokuapp.com/api/v1/'
});

export default instance;