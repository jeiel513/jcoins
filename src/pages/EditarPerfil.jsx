import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth } from "../firebase/config";

import {
  buscarUsuarioPorUid,
  atualizarUsuario
} from "../firebase/userService";

import {
  salvarAvatar,
  buscarAvatar
} from "../firebase/perfilService";


export default function EditarPerfil(){

  const navigate = useNavigate();


  const [usuario,setUsuario] = useState(null);

  const [nome,setNome] = useState("");

  const [avatar,setAvatar] = useState(null);



  useEffect(()=>{


    async function carregar(){

      const usuarioLogado = auth.currentUser;


      if(!usuarioLogado){

        navigate("/login");

        return;

      }


      const dados = await buscarUsuarioPorUid(
        usuarioLogado.uid
      );


      setUsuario(dados);


      setNome(
        dados?.nome || ""
      );


      const foto = await buscarAvatar(
        dados.id
      );


      setAvatar(foto);


    }


    carregar();


  },[]);






  function escolherImagem(e){


    const arquivo = e.target.files[0];


    if(!arquivo){

      return;

    }



    const leitor = new FileReader();



    leitor.onload = ()=>{

      setAvatar(
        leitor.result
      );

    };



    leitor.readAsDataURL(
      arquivo
    );


  }







  async function salvar(){


    if(!usuario){

      return;

    }



    await atualizarUsuario(

      usuario.id,

      {
        nome
      }

    );



    if(avatar){

      await salvarAvatar(

        usuario.id,

        avatar

      );

    }



    alert(
      "Perfil atualizado!"
    );


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
