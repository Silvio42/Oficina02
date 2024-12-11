import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import RegisterForm from "@/components/RegisterForm";

describe("RegisterForm Component", () => {
  it("Deve renderizar o formulário corretamente", () => {
    render(<RegisterForm />);

    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/data de nascimento/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cadastrar/i })).toBeInTheDocument();
  });

  it("Deve exibir mensagem de erro se campos obrigatórios estiverem vazios", () => {
    render(<RegisterForm />);

    fireEvent.click(screen.getByRole("button", { name: /cadastrar/i }));

    expect(screen.getByText(/todos os campos são obrigatórios/i)).toBeInTheDocument();
  });

  it("Deve limpar a mensagem de erro ao preencher os campos corretamente", () => {
    render(<RegisterForm />);

    fireEvent.click(screen.getByRole("button", { name: /cadastrar/i }));
    expect(screen.getByText(/todos os campos são obrigatórios/i)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/e-mail/i), { target: { value: "usuario@teste.com" } });
    fireEvent.change(screen.getByLabelText(/senha/i), { target: { value: "senha123" } });
    fireEvent.change(screen.getByLabelText(/data de nascimento/i), { target: { value: "2000-01-01" } });

    fireEvent.click(screen.getByRole("button", { name: /cadastrar/i }));

    expect(screen.queryByText(/todos os campos são obrigatórios/i)).toBeNull();
  });

  it("Deve simular o sucesso do cadastro", () => {
    render(<RegisterForm />);

    fireEvent.change(screen.getByLabelText(/e-mail/i), { target: { value: "usuario@teste.com" } });
    fireEvent.change(screen.getByLabelText(/senha/i), { target: { value: "senha123" } });
    fireEvent.change(screen.getByLabelText(/data de nascimento/i), { target: { value: "2000-01-01" } });

    fireEvent.click(screen.getByRole("button", { name: /cadastrar/i }));

    expect(screen.queryByText(/todos os campos são obrigatórios/i)).toBeNull();
  });
});
