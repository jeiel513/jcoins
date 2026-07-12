export function cadastrarUsuario(
  nome,
  email,
  senha
){

  const usuarios = buscarUsuarios();


  const existe = usuarios.find(

    usuario => usuario.email === email

  );



  if(existe){

    alert("Este email já está cadastrado.");

    return null;

  }





  const novoUsuario = {

    id: Date.now(),

    nome,

    email,

    senha,

    tipo:"usuario",

    status:"pendente",

    carteira:{

      saldo:0,

      transacoes:[]

    },

    criadoEm:new Date().toISOString()

  };





  usuarios.push(novoUsuario);



  localStorage.setItem(

    "usuarios",

    JSON.stringify(usuarios)

  );



  salvarUsuario(novoUsuario);



  return novoUsuario;

}








export function buscarUsuarios(){


  const dados = localStorage.getItem("usuarios");



  if(!dados){

    return [];

  }



  return JSON.parse(dados);


}








export function buscarUsuario(){


  const dados = localStorage.getItem("usuario");



  if(!dados){

    return null;

  }



  return JSON.parse(dados);


}








export function salvarUsuario(usuario){



  localStorage.setItem(

    "usuario",

    JSON.stringify(usuario)

  );





  const usuarios = buscarUsuarios();





  const atualizados = usuarios.map(item=>{



    if(item.id === usuario.id){


      return usuario;


    }



    return item;



  });






  localStorage.setItem(

    "usuarios",

    JSON.stringify(atualizados)

  );



}








export function atualizarUsuario(usuarioAtualizado){



  const usuarios = buscarUsuarios();





  const atualizados = usuarios.map(usuario=>{



    if(usuario.id === usuarioAtualizado.id){


      return usuarioAtualizado;


    }



    return usuario;



  });






  localStorage.setItem(

    "usuarios",

    JSON.stringify(atualizados)

  );





  salvarUsuario(usuarioAtualizado);



}
