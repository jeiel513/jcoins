import React from "react";
import { useNavigate } from "react-router-dom";
import { buscarUsuario } from "../services/usuarioService";
import { buscarAvatar } from "../services/perfilService";


export default function Perfil(){

  const navigate = useNavigate();

  const usuario = buscarUsuario();

  const avatar = buscarAvatar();



  if(!usuario){

    return (

      <div className="min-h-screen bg-black text-white flex items-center justify-center">

        Usuário não encontrado

      </div>

    );

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






        <div className="bg-zinc-900 rounded-3xl p-6 border border-yellow-500/30">





          <div className="text-center mb-8">



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






            <h1 className="text-3xl font-bold text-yellow-400 mt-4">

              Meu Perfil

            </h1>



          </div>







          <button

            onClick={()=>navigate("/editar-perfil")}

            className="w-full mb-6 bg-yellow-500 text-black rounded-xl py-3 font-bold"

          >

            ✏️ Editar Perfil

          </button>


<button

  onClick={()=>navigate("/alterar-senha")}

  className="w-full mb-6 bg-blue-500 rounded-xl py-3 font-bold"

>

  🔐 Alterar Senha

</button>




          <div className="space-y-5">



            <div>

              <p className="text-gray-400">

                Nome

              </p>

              <p className="text-xl font-bold">

                {usuario.nome}

              </p>

            </div>






            <div>

              <p className="text-gray-400">

                Email

              </p>

              <p>

                {usuario.email}

              </p>

            </div>






            <div>

              <p className="text-gray-400">

                Tipo de conta

              </p>

              <p className="text-yellow-400">

                {usuario.tipo}

              </p>

            </div>






            <div>

              <p className="text-gray-400">

                Status

              </p>

              <p>

                {usuario.status}

              </p>

            </div>






            <div>

              <p className="text-gray-400">

                Data de cadastro

              </p>

              <p>

                {new Date(usuario.criadoEm).toLocaleDateString()}

              </p>

            </div>



          </div>





        </div>



      </div>


    </div>

  );

}
