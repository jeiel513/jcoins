import React, { useEffect, useState } from "react";
import { buscarCarteira } from "../services/carteiraService";
import { useNavigate } from "react-router-dom";


export default function Carteira(){

  const [carteira,setCarteira] = useState(null);

  const navigate = useNavigate();


  useEffect(()=>{

    const dados = buscarCarteira();

    setCarteira(dados);

  },[]);



  if(!carteira){

    return null;

  }


  return (

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


          <p className="text-gray-400 text-center">
            Saldo atual
          </p>


          <h2 className="text-5xl text-center font-bold text-yellow-400 mt-3">

            {carteira.saldo}

          </h2>


          <p className="text-center text-yellow-400">
            J Coins
          </p>


        </div>



        <div className="mt-6 bg-zinc-900 rounded-3xl p-5">


          <h3 className="font-bold mb-4">
            Histórico
          </h3>


          {
            carteira.transacoes.length === 0 ?

            <p className="text-gray-400">
              Nenhuma movimentação
            </p>

            :

            carteira.transacoes.map((item,index)=>(

              <div
                key={index}
                className="border-b border-zinc-700 py-3"
              >

                {item.tipo}

                <span className="float-right text-yellow-400">
                  {item.valor} JC
                </span>

              </div>

            ))

          }


        </div>


      </div>

    </div>

  );

}
