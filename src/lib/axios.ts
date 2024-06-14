import axios from "axios";

const AuthServiceInstance = axios.create({
    baseURL:"http://localhost:3001/auth",
    timeout:500,
    withCredentials:true
})

const RecruiterAuthInstance = axios.create({
    baseURL:"http://localhost:3002/auth",
    timeout:500,
    withCredentials:true,
})

const UserInstance = axios.create({
    baseURL:"http://loaclhost:3003/user",
    timeout:5000,
    withCredentials:true
})

export {AuthServiceInstance,RecruiterAuthInstance,UserInstance}