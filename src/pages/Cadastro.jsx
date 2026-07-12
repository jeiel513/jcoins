import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { cadastrar } from "../firebase/authService";
import { criarUsuario } from "../firebase/userService";

export default function Cadastro() {

  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function criarConta(e){

    e.preventDefault();

    setCarregando(true);

    try{

      const authUser = await cadastrar(email, senha);

      await criarUsuario({
        uid: authUser.uid,
        nome,
        email,
        tipo: "usuario",
        status: "pendente",
        criadoEm: new Date().toISOString(),
        carteira: {
          saldo: 0,
          transacoes: []
        }
      });

      alert(
        "Cadastro realizado! Aguarde aprovação do administrador."
      );

      navigate("/login");

    }catch(error){

      console.error(error);

      alert("Erro ao criar conta: " + error.message);

    }finally{

      setCarregando(false);

    }

  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-black px-4">

      <div className="w-full max-w-md bg-zinc-900 rounded-2xl p-8">

        <div className="text-center mb-8">

          <div className="text-5xl">
            ☁️
          </div>

          <h1 className="text-3xl font-bold text-yellow-400">
            Criar conta
          </h1>

          <p className="text-gray-400 mt-2">
            Entre para o Cofre do Céu
          </p>

        </div>

        <form
          onSubmit={criarConta}
          className="space-y-4"
        >

          <input
            value={nome}
            onChange={(e)=>setNome(e.target.value)}
            placeholder="Nome"
            className="w-full rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3 text-white"
            required
          />

          <input
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="Email"
            className="w-full rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3 text-white"
            required
          />

          <input
            type="password"
            value={senha}
            onChange={(e)=>setSenha(e.target.value)}
            placeholder="Senha"
            className="w-full rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3 text-white"
            required
          />

          <button
            type="submit"
            disabled={carregando}
            className="w-full rounded-xl bg-yellow-500 py-3 font-bold text-black disabled:opacity-60"
          >
            {carregando ? "Criando conta..." : "Criar cadastro"}
          </button>

        </form>

        <p className="text-center text-gray-400 mt-6">

          Já possui conta?

          <Link
            to="/login"
            className="text-yellow-400 ml-2"
          >
            Entrar
          </Link>

        </p>

      </div>

    </div>

  );

}
