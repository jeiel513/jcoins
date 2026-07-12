import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { transferirJCoins } from "../services/transferenciaService";
import { buscarUsuarios, buscarUsuario } from "../services/usuarioService";


export default function Transferencia(){

  const navigate = useNavigate();


  const [usuarios,setUsuarios] = useState([]);

  const [destino,setDestino] = useState("");

  const [valor,setValor] = useState("");

  const [mensagem,setMensagem] = useState("");




  useEffect(()=>{


    const usuarioAtual = buscarUsuario();


    const lista = buscarUsuarios();


    const outrosUsuarios = lista.filter(

      usuario =>

        usuario.id !== usuarioAtual.id &&

        usuario.status === "aprovado"

    );


    setUsuarios(outrosUsuarios);


  },[]);





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





          <select

            value={destino}

            onChange={(e)=>setDestino(e.target.value)}

            className="w-full rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3 text-white"

          >

            <option value="">

              Escolha o destinatário

            </option>



            {

              usuarios.map(usuario=>(


                <option

                  key={usuario.id}

                  value={usuario.id}

                >

                  {usuario.nome}

                </option>


              ))

            }


          </select>






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
