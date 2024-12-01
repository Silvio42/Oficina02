"use client";

import { UserService } from "@/services/UserService";

export default function RegisterForm() {
  const register = async (email: string, password: string, dateOfBirth: string) => {
    // Lógica para registrar o usuário
    await new UserService().register(email, password, dateOfBirth);
    window.location.href = "/login";
  };

  const handleSubmit = async () => {
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;
    const confirmPassword = (document.getElementById("confirmPassword") as HTMLInputElement).value;
    const dateOfBirth = (document.getElementById("dateOfBirth") as HTMLInputElement).value;

    if (password !== confirmPassword) {
      alert("As senhas não coincidem. Por favor, tente novamente.");
      return;
    }

    try {
      await register(email, password, dateOfBirth);
    } catch (error) {
      alert("Ocorreu um erro ao tentar registrar. Por favor, tente novamente.");
      console.error(error);
    }
  };

  return (
    <section className="form-login">
      <h2>Cadastro</h2>
      <form action="principal.html">
        <div className="input-wrapper">
          <label htmlFor="email">E-mail:</label>
          <input type="text" id="email" name="email" required />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Senha:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <div className="input-wrapper">
          <label htmlFor="confirmPassword">Confirmar Senha:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            required
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="dateOfBirth">Data de Nascimento:</label>
          <input type="date" id="dateOfBirth" name="dateOfBirth" required />
        </div>
        <button type="button" onClick={handleSubmit}>
          Criar nova conta
        </button>
      </form>
    </section>
  );
}
