import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  buscarUsuarios,
  atualizarUsuario,
  buscarUsuario
} from "../services/usuarioService";
import { adicionarNotificacao } from "../services/notificacaoService";


export default function Admin(){

  const navigate = useNavigate();

  const [usuarios,setUsuarios] = useState([]);

  const [valores,setValores] = useState({});



  function carregarUsuarios(){

    setUsuarios(buscarUsuarios());

  }




  useEffect(()=>{


    const usuarioLogado = buscarUsuario();



    if(!usuarioLogado || usuarioLogado.tipo !== "admin"){

      navigate("/login");

      return;

    }


    carregarUsuarios();


  },[]);






  function aprovar(id){


    const usuario = usuarios.find(

      item=>item.id === id

    );


    atualizarUsuario({

      ...usuario,

      status:"aprovado"

    });


    adicionarNotificacao(

      usuario.id,

      "Seu cadastro foi aprovado pelo administrador"

    );


    carregarUsuarios();


  }







  function bloquear(id){


    const usuario = usuarios.find(

      item=>item.id === id

    );


    atualizarUsuario({

      ...usuario,

      status:"bloqueado"

    });


    adicionarNotificacao(

      usuario.id,

      "Seu cadastro foi bloqueado"

    );


    carregarUsuarios();


  }








  function adicionarCoins(id){


    const usuario = usuarios.find(

      item=>item.id === id

    );



    const valor = Number(valores[id]);



    if(!valor || valor <= 0){

      alert("Digite uma quantidade válida");

      return;

    }





    if(!usuario.carteira){


      usuario.carteira = {

        saldo:0,

        transacoes:[]

      };


    }





    usuario.carteira.saldo += valor;





    usuario.carteira.transacoes.push({

      tipo:"crédito administrativo",

      valor,

      data:new Date().toISOString()

    });







    atualizarUsuario(usuario);





    adicionarNotificacao(

      usuario.id,

      `Você recebeu ${valor} J Coins do administrador`

    );





    carregarUsuarios();



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





        <div className="space-y-5">



        {

        usuarios.map(usuario=>(


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
              <strong>Status:</strong>{" "}

              <span className="text-yellow-400">

                {usuario.status}

              </span>

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

                  [usuario.id]:e.target.value

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
