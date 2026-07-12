import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  buscarNotificacoes
} from "../firebase/notificationService";

import {
  buscarUsuario
} from "../services/usuarioService";


export default function Notificacoes(){

  console.log("ENTROU NA PAGINA NOTIFICACOES");


  const navigate = useNavigate();

  const [notificacoes,setNotificacoes] = useState([]);

  const [usuario,setUsuario] = useState(null);



  async function carregar(){

    console.log("INICIANDO CARREGAMENTO");


    const usuarioSalvo = buscarUsuario();


    console.log(
      "USUARIO SALVO:",
      usuarioSalvo
    );


    setUsuario(usuarioSalvo);



    if(!usuarioSalvo){

      console.log(
        "SEM USUARIO LOGADO"
      );

      return;

    }



    const lista = await buscarNotificacoes(
      usuarioSalvo.id
    );


    console.log(
      "NOTIFICACOES ENCONTRADAS:",
      lista
    );


    setNotificacoes(lista);


  }



  useEffect(()=>{

    carregar();

  },[]);





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



        {
          usuario &&

          <div className="bg-zinc-900 rounded-xl p-3 mb-4 text-sm">

            Usuário ID:

            <br />

            {usuario.id}

          </div>
        }



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

              className="bg-zinc-900 rounded-2xl p-5 mb-4 border border-yellow-500"

            >

              <p>

                {item.mensagem}

              </p>


              <p className="text-gray-500 text-sm mt-2">

                {new Date(item.data).toLocaleString()}

              </p>


            </div>


          ))

        }


      </div>


    </div>

  );

}
