import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  buscarUsuario,
  atualizarUsuario
} from "../services/usuarioService";


export default function AlterarSenha(){

  const navigate = useNavigate();

  const usuario = buscarUsuario();


  const [senhaAtual,setSenhaAtual] = useState("");
  const [novaSenha,setNovaSenha] = useState("");
  const [confirmarSenha,setConfirmarSenha] = useState("");





  function salvar(){


    if(senhaAtual !== usuario.senha){

      alert("Senha atual incorreta");

      return;

    }



    if(novaSenha.length < 4){

      alert("A nova senha deve ter pelo menos 4 caracteres");

      return;

    }



    if(novaSenha !== confirmarSenha){

      alert("As senhas não conferem");

      return;

    }



    const atualizado = {

      ...usuario,

      senha:novaSenha

    };



    atualizarUsuario(atualizado);



    alert("Senha alterada com sucesso!");



    navigate("/perfil");


  }







  return (

    <div className="min-screen bg-black text-white p-6">


      <div className="max-w-md mx-auto">



        <button

          onClick={()=>navigate("/perfil")}

          className="text-yellow-400 mb-6"

        >

          ← Voltar

        </button>





        <div className="bg-zinc-900 rounded-3xl p-6">



          <h1 className="text-3xl font-bold text-yellow-400 mb-6">

            🔐 Alterar Senha

          </h1>





          <input

            type="password"

            placeholder="Senha atual"

            value={senhaAtual}

            onChange={(e)=>setSenhaAtual(e.target.value)}

            className="w-full mb-4 bg-zinc-800 rounded-xl px-4 py-3"

          />





          <input

            type="password"

            placeholder="Nova senha"

            value={novaSenha}

            onChange={(e)=>setNovaSenha(e.target.value)}

            className="w-full mb-4 bg-zinc-800 rounded-xl px-4 py-3"

          />





          <input

            type="password"

            placeholder="Confirmar nova senha"

            value={confirmarSenha}

            onChange={(e)=>setConfirmarSenha(e.target.value)}

            className="w-full mb-4 bg-zinc-800 rounded-xl px-4 py-3"

          />





          <button

            onClick={salvar}

            className="w-full bg-yellow-500 text-black rounded-xl py-3 font-bold"

          >

            Salvar nova senha

          </button>





        </div>



      </div>


    </div>

  );

}
