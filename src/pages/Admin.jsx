import React, { useEffect, useState } from "react";

import {
  buscarUsuarios,
  aprovarUsuario,
  bloquearUsuario,
  adicionarSaldo
} from "../firebase/userService";

import {
  adicionarNotificacao
} from "../firebase/notificationService";


export default function Admin(){

  const [usuarios,setUsuarios] = useState([]);

  const [valores,setValores] = useState({});

  const [busca,setBusca] = useState("");


  async function carregarUsuarios(){

    const lista = await buscarUsuarios();

    console.log("USUARIOS:", lista);

    setUsuarios(lista);

  }



  useEffect(()=>{

    carregarUsuarios();

  },[]);




  async function aprovar(id){

    await aprovarUsuario(id);


    const usuario = usuarios.find(
      item => item.id === id
    );


    if(usuario){

      await adicionarNotificacao(
        usuario.id,
        "Seu cadastro foi aprovado pelo administrador."
      );

    }


    await carregarUsuarios();

    alert("Usuário aprovado!");

  }





  async function bloquear(id){

    await bloquearUsuario(id);


    const usuario = usuarios.find(
      item => item.id === id
    );


    if(usuario){

      await adicionarNotificacao(
        usuario.id,
        "Seu cadastro foi bloqueado."
      );

    }


    await carregarUsuarios();

    alert("Usuário bloqueado!");

  }





  async function adicionarCoins(id){

    const valor = Number(valores[id]);


    if(!valor || valor <= 0){

      alert("Digite uma quantidade válida.");

      return;

    }



    await adicionarSaldo(
      id,
      valor
    );



    const usuario = usuarios.find(
      item => item.id === id
    );



    console.log(
      "USUARIO NOTIFICACAO:",
      usuario
    );



    if(usuario){

      await adicionarNotificacao(
        usuario.id,
        `Você recebeu ${valor} J Coins do administrador.`
      );

    }



    await carregarUsuarios();



    setValores({

      ...valores,

      [id]:""

    });



    alert("J Coins adicionados!");

  }





  return (

    <div className="min-h-screen bg-black p-6 text-white">


      <div className="max-w-xl mx-auto">


        <h1 className="text-3xl font-bold text-yellow-400 mb-6">

          Painel Administrador

        </h1>



        <input

          type="text"

          placeholder="🔎 Buscar por nome ou e-mail"

          value={busca}

          onChange={(e)=>setBusca(e.target.value)}

          className="w-full mb-6 bg-zinc-800 rounded-xl px-4 py-3"

        />



        <div className="space-y-5">


        {

          usuarios

          .filter(usuario=>{


            const nome =
              (usuario.nome || "").toLowerCase();


            const email =
              (usuario.email || "").toLowerCase();


            const texto =
              busca.toLowerCase();



            return (

              nome.includes(texto) ||

              email.includes(texto)

            );


          })


          .map(usuario=>(


            <div

              key={usuario.id}

              className="bg-zinc-900 rounded-2xl p-5"

            >


              <p>

                <strong>Nome:</strong> {usuario.nome}

              </p>


              <p>

                <strong>Email:</strong> {usuario.email}

              </p>


              <p>

                <strong>ID:</strong> {usuario.id}

              </p>


              <p>

                <strong>Status:</strong> {usuario.status}

              </p>


              <p>

                <strong>Saldo:</strong>{" "}

                {usuario.carteira?.saldo || 0}

                {" "}J Coins

              </p>




              <input

                type="number"

                placeholder="Quantidade J Coins"

                value={valores[usuario.id] || ""}

                onChange={(e)=>

                  setValores({

                    ...valores,

                    [usuario.id]: e.target.value

                  })

                }

                className="w-full mt-4 bg-zinc-800 rounded-xl px-4 py-3"

              />




              <button

                onClick={()=>adicionarCoins(usuario.id)}

                className="w-full mt-3 bg-yellow-500 text-black py-3 rounded-xl font-bold"

              >

                🪙 Adicionar J Coins

              </button>




              <div className="flex gap-3 mt-4">


                <button

                  onClick={()=>aprovar(usuario.id)}

                  className="flex-1 bg-green-500 text-black py-3 rounded-xl font-bold"

                >

                  Aprovar

                </button>



                <button

                  onClick={()=>bloquear(usuario.id)}

                  className="flex-1 bg-red-500 py-3 rounded-xl font-bold"

                >

                  Bloquear

                </button>


              </div>


            </div>


          ))

        }


        </div>


      </div>


    </div>


  );

}
