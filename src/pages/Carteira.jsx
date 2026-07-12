import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { buscarCarteira } from "../firebase/walletService";
import { buscarUsuario } from "../services/usuarioService";

export default function Carteira(){

  const [carteira,setCarteira] = useState(null);

  const navigate = useNavigate();

  async function carregarCarteira(){

    const usuario = buscarUsuario();

    if(!usuario){

      navigate("/login");

      return;

    }

    const dados = await buscarCarteira(usuario.id);

    setCarteira(dados);

  }

  useEffect(()=>{

    carregarCarteira();

  },[]);

  if(!carteira){

    return(

      <div className="min-h-screen bg-black text-white flex items-center justify-center">

        Carregando...

      </div>

    );

  }

  return(

    <div className="min-h-screen bg-black text-white p-6">

      <div className="max-w-md mx-auto">

        <button
          onClick={()=>navigate("/home")}
          className="mb-6 text-yellow-400"
        >
          ← Voltar
        </button>

        <div className="text-center mb-8">

          <div className="text-6xl">
            🪙
          </div>

          <h1 className="text-3xl font-bold text-yellow-400">
            Minha Carteira
          </h1>

          <p className="text-gray-400">
            Saldo em J Coins
          </p>

        </div>

        <div className="bg-zinc-900 rounded-3xl p-6 border border-yellow-500/30">

          <p className="text-center text-gray-400">
            Saldo atual
          </p>

          <h2 className="text-5xl text-center font-bold text-yellow-400 mt-3">
            {carteira.saldo}
          </h2>

          <p className="text-center text-yellow-400">
            J Coins
          </p>

        </div>

        <button
          onClick={()=>navigate("/transferencia")}
          className="w-full mt-6 bg-blue-500 rounded-xl py-3 font-bold"
        >
          💸 Enviar J Coins
        </button>

        <div className="mt-6 bg-zinc-900 rounded-3xl p-5">

          <h3 className="font-bold mb-4 text-yellow-400">
            📜 Histórico
          </h3>

          {
            carteira.transacoes.length === 0
            ? (
              <p className="text-gray-400">
                Nenhuma movimentação
              </p>
            )
            : carteira.transacoes.map((item,index)=>(

              <div
                key={index}
                className="border-b border-zinc-700 py-3"
              >

                <div className="flex justify-between">

                  <span>
                    {item.tipo}
                  </span>

                  <span className="text-yellow-400">
                    {item.valor} JC
                  </span>

                </div>

                <p className="text-gray-500 text-sm mt-1">
                  {new Date(item.data).toLocaleString()}
                </p>

              </div>

            ))
          }

        </div>

      </div>

    </div>

  );

}
