import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  buscarNotificacoes,
  marcarComoLida
} from "../services/notificacaoService";
import { buscarUsuario } from "../services/usuarioService";


export default function Notificacoes(){

  const navigate = useNavigate();

  const [notificacoes,setNotificacoes] = useState([]);



  function carregar(){

    const usuario = buscarUsuario();


    const lista = buscarNotificacoes();


    const minhas = lista.filter(

      item => item.usuarioId === usuario.id

    );


    setNotificacoes(minhas);


  }





  useEffect(()=>{

    carregar();

  },[]);






  function ler(id){

    marcarComoLida(id);

    carregar();

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




        <h1 className="text-3xl font-bold text-yellow-400 mb-6">

          🔔 Notificações

        </h1>






        <div className="space-y-4">



        {

          notificacoes.length === 0 ?


          (

            <div className="bg-zinc-900 rounded-2xl p-5 text-gray-400">

              Nenhuma notificação

            </div>

          )


          :


          notificacoes.map(item=>(


            <div

              key={item.id}

              className={

                `bg-zinc-900 rounded-2xl p-5 border ${

                  item.lida

                  ? "border-zinc-700"

                  : "border-yellow-500"

                }`

              }

            >


              <p>

                {item.mensagem}

              </p>



              <p className="text-sm text-gray-500 mt-2">

                {new Date(item.data).toLocaleString()}

              </p>



              {

                !item.lida &&


                <button

                  onClick={()=>ler(item.id)}

                  className="mt-3 text-yellow-400"

                >

                  Marcar como lida

                </button>


              }



            </div>


          ))

        }



        </div>



      </div>


    </div>

  );

}
