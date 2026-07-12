import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { transferirJCoins } from "../services/transferenciaService";


export default function Transferencia(){

  const navigate = useNavigate();

  const [destino,setDestino] = useState("");
  const [valor,setValor] = useState("");

  const [mensagem,setMensagem] = useState("");



  function enviar(){

    const resultado = transferirJCoins(
      destino,
      Number(valor)
    );


    setMensagem(resultado.mensagem);


    if(resultado.sucesso){

      setDestino("");
      setValor("");

    }

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



        <div className="text-center mb-8">


          <div className="text-6xl">
            💸
          </div>


          <h1 className="text-3xl font-bold text-yellow-400">

            Enviar J Coins

          </h1>


          <p className="text-gray-400">

            Transferência entre usuários

          </p>


        </div>




        <div className="bg-zinc-900 rounded-3xl p-6 space-y-4">


          <input

            value={destino}

            onChange={(e)=>setDestino(e.target.value)}

            placeholder="Usuário destino"

            className="w-full rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3 text-white"

          />



          <input

            type="number"

            value={valor}

            onChange={(e)=>setValor(e.target.value)}

            placeholder="Quantidade de J Coins"

            className="w-full rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3 text-white"

          />



          <button

            onClick={enviar}

            className="w-full bg-yellow-500 text-black rounded-xl py-3 font-bold"

          >

            Enviar

          </button>



          {

            mensagem &&

            <p className="text-center text-yellow-400">

              {mensagem}

            </p>

          }


        </div>


      </div>


    </div>

  );

}
