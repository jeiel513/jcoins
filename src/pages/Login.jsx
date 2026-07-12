import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { entrar } from "../firebase/authService";
import { buscarUsuarioPorEmail } from "../firebase/userService";

import { salvarUsuario } from "../services/usuarioService";

export default function Login(){

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [senha,setSenha] = useState("");
  const [carregando,setCarregando] = useState(false);


  async function fazerLogin(){

    setCarregando(true);

    try{

      // LOGIN ADMIN (temporário)

      if(
        email === "admin@cofredoceu.com" &&
        senha === "123456"
      ){

        const admin = {

          id:"admin",

          nome:"Administrador",

          email,

          tipo:"admin",

          status:"aprovado"

        };

        salvarUsuario(admin);

        navigate("/admin");

        return;

      }


      // LOGIN FIREBASE

      await entrar(email, senha);

      const usuario = await buscarUsuarioPorEmail(email);

      if(!usuario){

        alert("Usuário não encontrado.");

        return;

      }

      if(usuario.status !== "aprovado"){

        alert("Aguarde aprovação do administrador.");

        return;

      }

      salvarUsuario(usuario);

      navigate("/home");

    }catch(error){

      console.error(error);

      alert("Email ou senha inválidos.");

    }finally{

      setCarregando(false);

    }

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
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3 text-white"
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e)=>setSenha(e.target.value)}
            className="w-full rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3 text-white"
          />

          <button
            onClick={fazerLogin}
            disabled={carregando}
            className="w-full rounded-xl bg-yellow-500 py-3 font-bold text-black disabled:opacity-60"
          >
            {carregando ? "Entrando..." : "Entrar"}
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
