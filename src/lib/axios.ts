import axios from "axios";

const AuthServiceInstance = axios.create({
    baseURL:"http://localhost:3001/auth",
    timeout:500,
    withCredentials:true,
})

const RecruiterServiceInstance = axios.create({
    baseURL:"http://localhost:3002/recruiter",
    timeout:500,
    withCredentials:true,
})

const UserServiceInstance = axios.create({
    baseURL:"http://localhost:3003/user",
    timeout:5000,
    withCredentials:true
})

const JobServiceInstance = axios.create({
    baseURL:"http://localhost:3004/job",
    timeout:5000,
    withCredentials:true,
})

export {AuthServiceInstance,RecruiterServiceInstance,UserServiceInstance,JobServiceInstance}