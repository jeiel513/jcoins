import React, { useEffect, useState } from "react";


export default function Admin() {

  const [usuario, setUsuario] = useState(null);


  useEffect(() => {

    const dados =
      localStorage.getItem("usuario");


    if(dados){

      setUsuario(
        JSON.parse(dados)
      );

    }

  }, []);



  function aprovarUsuario(){

    const atualizado = {
      ...usuario,
      status: "aprovado"
    };


    localStorage.setItem(
      "usuario",
      JSON.stringify(atualizado)
    );


    setUsuario(atualizado);


    alert(
      "Usuário aprovado!"
    );

  }



  function bloquearUsuario(){

    const atualizado = {
      ...usuario,
      status: "bloqueado"
    };


    localStorage.setItem(
      "usuario",
      JSON.stringify(atualizado)
    );


    setUsuario(atualizado);


    alert(
      "Usuário bloqueado!"
    );

  }



  if(!usuario){

    return (

      <div className="min-h-screen flex items-center justify-center bg-black text-white">

        Nenhum usuário cadastrado.

      </div>

    );

  }



  return (

    <div className="min-h-screen bg-black p-6 text-white">


      <div className="max-w-xl mx-auto bg-zinc-900 rounded-2xl p-8">


        <h1 className="text-3xl font-bold text-yellow-400 mb-6">

          Painel Administrador

        </h1>



        <div className="space-y-3">


          <p>
            <strong>Nome:</strong> {usuario.nome}
          </p>


          <p>
            <strong>Email:</strong> {usuario.email}
          </p>


          <p>
            <strong>Status:</strong>{" "}

            <span className="text-yellow-400">

              {usuario.status}

            </span>

          </p>


          <p>
            <strong>Saldo:</strong> {usuario.saldo} J Coins
          </p>


        </div>



        <div className="flex gap-3 mt-8">


          <button

            onClick={aprovarUsuario}

            className="flex-1 bg-green-500 text-black py-3 rounded-xl font-bold"

          >

            Aprovar

          </button>




          <button

            onClick={bloquearUsuario}

            className="flex-1 bg-red-500 text-white py-3 rounded-xl font-bold"

          >

            Bloquear

          </button>



        </div>



      </div>


    </div>

  );

}