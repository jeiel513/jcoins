import React from "react";
import { useNavigate } from "react-router-dom";
import { buscarUsuario } from "../services/usuarioService";
import { buscarCarteira } from "../services/carteiraService";


export default function Perfil(){

  const navigate = useNavigate();

  const usuario = buscarUsuario();

  const carteira = buscarCarteira();



  if(!usuario){

    navigate("/login");

    return null;

  }



  return (

    <div className="min-h-screen bg-black text-white p-6">


      <div className="max-w-md mx-auto">


        <button

          onClick={()=>navigate("/home")}

          className="text-yellow-400 mb-6"

        >

          ← Voltar

        </button>




        <div className="bg-zinc-900 rounded-3xl p-6 border border-yellow-500/30">


          <div className="text-center mb-6">


            <div className="text-6xl">

              👤

            </div>


            <h1 className="text-3xl font-bold text-yellow-400">

              Meu Perfil

            </h1>


          </div>




          <div className="space-y-4">


            <p>

              <strong>Nome:</strong> {usuario.nome}

            </p>



            <p>

              <strong>Email:</strong> {usuario.email}

            </p>



            <p>

              <strong>Tipo:</strong> {usuario.tipo}

            </p>



            <p>

              <strong>Status:</strong> {usuario.status}

            </p>



            <p>

              <strong>Saldo:</strong> {carteira?.saldo || 0} J Coins

            </p>



            <p className="text-gray-400 text-sm">

              Cadastro:

              {" "}

              {new Date(usuario.criadoEm).toLocaleDateString()}

            </p>



          </div>


        </div>



      </div>


    </div>

  );

}
