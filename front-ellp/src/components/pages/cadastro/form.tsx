"use client";

import { UserService } from "@/services/UserService";

export default function RegisterForm() {
  const register = async () => {
    const username = (document?.getElementById("username") as HTMLInputElement)!
      .value;
    const password = (document?.getElementById("password") as HTMLInputElement)!
      .value;
    const dateOfBirth = (document?.getElementById(
      "dateOfBirth"
    ) as HTMLInputElement)!.value;
    const role = (document?.querySelector(
      'input[name="role"]:checked'
    ) as HTMLInputElement)!.value;

    await new UserService().register(username, password, dateOfBirth, role);
    window.location.href = "/login";
  };

  return (
    <section className="form-login">
      <h2>Cadastro</h2>
      <form action="principal.html">
        <div className="input-wrapper">
          <label htmlFor="username">Usuário:</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Senha:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <div className="input-wrapper">
          <label htmlFor="dateOfBirth">Data de Nascimento:</label>
          <input type="date" id="dateOfBirth" name="dateOfBirth" required />
        </div>
        <div className="input-wrapper">
          <input type="radio" id="voluntario" name="role" value="Voluntário" />
          <label htmlFor="voluntario">Voluntário</label>
          <input type="radio" id="aluno" name="role" value="Aluno" />
          <label htmlFor="aluno">Aluno</label>
        </div>
        <button type="button" onClick={register}>
          Criar nova conta
        </button>
      </form>
    </section>
  );
}
