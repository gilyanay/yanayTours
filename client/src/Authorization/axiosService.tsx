// axiosService. Used in order to have a form of an interceptor like the one we have in Angular.

import axios from 'axios';
import { store } from '../redux/store';

const instance = axios.create({
    baseURL: "http://localhost:3001/"
});

let token = sessionStorage.getItem("token")
console.log(token)
instance.defaults.headers.common['Authorization'] = "Bearer " + token;

// console.log(instance.defaults.headers.common['Authorization']);

axios.interceptors.request.use(request => {
    // console.log(request);
    return request;
}, error => {
    // console.log(error);
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    // console.log(response);
    return response;
}, error => {
    // console.log(error);
    return Promise.reject(error);
});

export function setAxiosHeaders () {
    let token = sessionStorage.getItem("token")
   
    instance.defaults.headers.common['Authorization'] = "Bearer " + token;
}

export default instance;
