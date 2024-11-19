import Link from "next/link";

export default function Login() {
  return (
    <main className="main login-content">
      <section className="form-login">
        <h2>Login</h2>
        <form action="principal.html">
          <div className="input-wrapper">
            <label htmlFor="username">E-mail:</label>
            <input type="text" id="username" name="username" required />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Senha:</label>
            <input type="password" id="password" name="password" required />
          </div>
          <Link type="button" href="/">
            Entrar
          </Link>
          <Link type="button" href="/cadastro">
            Criar nova conta
          </Link>
        </form>
      </section>
    </main>
  );
}
