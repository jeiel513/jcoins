import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Home(){

  const navigate = useNavigate();

  const [usuario,setUsuario] = useState(null);


  useEffect(()=>{

    const dados = localStorage.getItem("usuario");

    if(dados){

      setUsuario(JSON.parse(dados));

    }else{

      navigate("/login");

    }

  },[]);



  function sair(){

    localStorage.removeItem("usuario");

    navigate("/login");

  }



  if(!usuario){

    return (

      <div style={{
        background:"#000",
        color:"#fff",
        minHeight:"100vh",
        display:"flex",
        alignItems:"center",
        justifyContent:"center"
      }}>
        Carregando...
      </div>

    );

  }



  return (

    <div className="min-h-screen bg-black text-white p-6">


      <div className="max-w-md mx-auto">


        <div className="text-center mb-8">

          <div className="text-6xl">
            ☁️
          </div>

          <h1 className="text-3xl font-bold text-yellow-400">
            Cofre do Céu
          </h1>

          <p className="text-gray-400">
            Sua carteira de J Coins
          </p>

        </div>



        <div className="bg-zinc-900 rounded-3xl p-6 border border-yellow-500/30">


          <p className="text-gray-400">
            Bem-vindo
          </p>


          <h2 className="text-2xl font-bold">
            {usuario.nome}
          </h2>



          <div className="mt-8 text-center">


            <p className="text-gray-400">
              Seu saldo
            </p>


            <h3 className="text-5xl font-bold text-yellow-400 mt-2">
              {usuario.saldo || 0}
            </h3>


            <p className="text-yellow-400">
              J Coins
            </p>


          </div>


        </div>



        <button

          onClick={sair}

          className="w-full mt-6 bg-red-500 rounded-xl py-3 font-bold"

        >

          Sair

        </button>



      </div>


    </div>

  );

}