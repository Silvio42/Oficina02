"use client";

import { UserService } from "../../services/UserService";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");

  const login = async () => {
    const email = (document?.getElementById("email") as HTMLInputElement)!
      .value;
    const password = (document?.getElementById("password") as HTMLInputElement)!
      .value;

    try {
      const response = await new UserService().login(email, password);

      if (response.status === 200) {
        window.location.href = "/workshops";
      } else {
        setErrorMessage("Algo deu errado. Tente novamente mais tarde.");
      }
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          setErrorMessage(
            error.response.data?.error || "Erro desconhecido ao fazer login."
          );
        } else {
          setErrorMessage("Erro inesperado. Tente novamente mais tarde.");
        }
      }
    }
  };

  return (
    <main className="main login-content">
      <section className="form-login">
        <h2>Login</h2>
        <form action="principal.html">
          <div className="input-wrapper">
            <label htmlFor="email">E-mail:</label>
            <input type="text" id="email" name="email" required />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Senha:</label>
            <input type="password" id="password" name="password" required />
          </div>
          {errorMessage && (
            <p id="error-message" style={{ color: "red" }}>
              {errorMessage}
            </p>
          )}
          <button type="button" onClick={login}>
            Entrar
          </button>
          <Link href="/cadastro">Criar nova conta</Link>
        </form>
      </section>
    </main>
  );
}