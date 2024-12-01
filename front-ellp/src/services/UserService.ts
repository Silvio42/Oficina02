import axios from "axios";

export class UserService {
  async register(
    username: string,
    password: string,
    dateOfBirth: string,
    role: string
  ) {
    return axios.post("http://localhost:3333/api/users/register", {
      username,
      password,
      dateOfBirth,
      role,
    });
  }

  async login(
    email: string,
    password: string
  ) {
    return axios.post("http://localhost:3333/api/users/login", {
      email,
      password
    });
  }
}
