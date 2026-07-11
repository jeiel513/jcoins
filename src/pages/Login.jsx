import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  function entrar() {
    navigate("/home");
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">

      <div className="w-full max-w-md rounded-2xl bg-zinc-900 p-8 shadow-xl">

        <div className="text-center mb-8">

          <div className="text-5xl mb-4">
            ☁️
          </div>

          <h1 className="text-3xl font-bold text-yellow-400">
            Cofre do Céu
          </h1>

          <p className="text-gray-400 mt-2">
            Entrar na sua carteira J Coins
          </p>

        </div>


        <div className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3 text-white"
          />


          <input
            type="password"
            placeholder="Senha"
            className="w-full rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3 text-white"
          />


          <button
            onClick={entrar}
            className="w-full rounded-xl bg-yellow-500 py-3 font-bold text-black"
          >
            Entrar
          </button>


        </div>


        <p className="text-center text-gray-400 mt-6">

          Ainda não tem conta?

          <Link 
            to="/cadastro"
            className="text-yellow-400 ml-2"
          >
            Criar cadastro
          </Link>

        </p>


      </div>

    </div>
  );
}