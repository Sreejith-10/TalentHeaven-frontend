import axios from "axios";

const AuthServiceInstance = axios.create({
    baseURL:"http://localhost:3001/auth",
    timeout:3000
})

export {AuthServiceInstance}