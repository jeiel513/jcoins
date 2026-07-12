import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  buscarUsuario,
  atualizarUsuario
} from "../services/usuarioService";
import {
  salvarAvatar,
  buscarAvatar
} from "../services/perfilService";


export default function EditarPerfil(){

  const navigate = useNavigate();

  const usuarioAtual = buscarUsuario();

  const [nome,setNome] = useState(
    usuarioAtual?.nome || ""
  );


  const [avatar,setAvatar] = useState(
    buscarAvatar()
  );





  function escolherImagem(e){


    const arquivo = e.target.files[0];


    if(!arquivo){

      return;

    }



    const leitor = new FileReader();



    leitor.onload = ()=>{

      setAvatar(leitor.result);

    };



    leitor.readAsDataURL(arquivo);


  }







  function salvar(){


    const atualizado = {

      ...usuarioAtual,

      nome

    };



    atualizarUsuario(atualizado);



    if(avatar){

      salvarAvatar(avatar);

    }



    alert("Perfil atualizado!");



    navigate("/perfil");


  }







  return (

    <div className="min-h-screen bg-black text-white p-6">


      <div className="max-w-md mx-auto">



        <button

          onClick={()=>navigate("/perfil")}

          className="text-yellow-400 mb-6"

        >

          ← Voltar

        </button>







        <div className="bg-zinc-900 rounded-3xl p-6">



          <h1 className="text-3xl font-bold text-yellow-400 mb-6">

            Editar Perfil

          </h1>







          <div className="text-center mb-6">



            {

              avatar ? (

                <img

                  src={avatar}

                  className="w-24 h-24 rounded-full mx-auto object-cover"

                />

              ) : (

                <div className="text-6xl">

                  👤

                </div>

              )

            }







            <label className="block mt-4 bg-blue-500 rounded-xl py-3 cursor-pointer font-bold">


              📸 Alterar foto



              <input

                type="file"

                accept="image/*"

                onChange={escolherImagem}

                className="hidden"

              />


            </label>



          </div>







          <label className="text-gray-400">

            Nome

          </label>



          <input

            value={nome}

            onChange={(e)=>setNome(e.target.value)}

            className="w-full mt-2 bg-zinc-800 rounded-xl px-4 py-3"

          />








          <button

            onClick={salvar}

            className="w-full mt-6 bg-yellow-500 text-black rounded-xl py-3 font-bold"

          >

            Salvar alterações

          </button>





        </div>



      </div>



    </div>

  );

}
