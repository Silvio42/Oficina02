import axios from "axios";

export class UserService {
  async register(email: string, password: string, dateOfBirth: string) {
    return axios.post("http://localhost:3333/api/users/register", {
      email,
      password,
      dateOfBirth,
    });
  }

  async login(email: string, password: string) {
    return axios.post("http://localhost:3333/api/users/login", {
      email,
      password,
    });
  }

  async getUser(id: string) {
    const { data } = await axios.get(`http://localhost:3333/api/users/${id}`);

    return data;
  }
}
