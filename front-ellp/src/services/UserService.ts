import axios from "axios";

export class UserService {
  async register(
    email: string,
    password: string,
    dateOfBirth: string
  ) {
    return axios.post("http://localhost:3333/api/users/register", {
      email,
      password,
      dateOfBirth,
    });
  }

  async login(
    username: string,
    password: string
  ) {
    return axios.post("http://localhost:3333/api/users/login", {
      username,
      password
    });
  }
}
