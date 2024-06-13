import axios from "axios";

const AuthServiceInstance = axios.create({
    baseURL:"http://localhost:3001/auth",
    timeout:3000,
    withCredentials:true
})

const RecruiterAuthInstance = axios.create({
    baseURL:"http://localhost:3002/auth",
    timeout:3000,
    withCredentials:true,
})

export {AuthServiceInstance,RecruiterAuthInstance}