import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

//const access_token: string | undefined = Cookies.get("access_token");
//const payload = jwtDecode<{ user_id: string }>(access_token ?? "");

//axios.defaults.headers.common["Authorization"] = `Bearer ${payload.user_id}`;

const AuthServiceInstance = axios.create({
  baseURL: "http://localhost:3001/auth",
  timeout: 5000,
  withCredentials: true,
});

const RecruiterServiceInstance = axios.create({
  baseURL: "http://localhost:3002/recruiter",
  timeout: 5000,
  withCredentials: true,
});

const UserServiceInstance = axios.create({
  baseURL: "http://localhost:3003/user",
  timeout: 5000,
  withCredentials: true,
});

const JobServiceInstance = axios.create({
  baseURL: "http://localhost:3004/job",
  timeout: 5000,
  withCredentials: true,
});

const ChatServiceInstance = axios.create({
  baseURL: "http://localhost:3005/chat",
  timeout: 5000,
});

export {
  AuthServiceInstance,
  RecruiterServiceInstance,
  UserServiceInstance,
  JobServiceInstance,
  ChatServiceInstance,
};
