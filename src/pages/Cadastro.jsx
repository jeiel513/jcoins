import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cadastrarUsuario } from "../services/usuarioService";


export default function Cadastro() {

  const navigate = useNavigate();


  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");


  function criarConta(e){

    e.preventDefault();


    cadastrarUsuario(
      nome,
      email,
      senha
    );


    alert(
      "Cadastro realizado! Aguarde aprovação do administrador."
    );


    navigate("/login");

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
            className="w-full rounded-xl bg-yellow-500 py-3 font-bold text-black"
          >
            Criar cadastro
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