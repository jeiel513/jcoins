export function cadastrarUsuario(
  nome,
  email,
  senha
){

  const usuario = {

    id: Date.now(),

    nome,

    email,

    senha,

    tipo: "usuario",

    status: "pendente",

    saldo: 0,

    criadoEm: new Date().toISOString()

  };


  salvarUsuario(usuario);


  return usuario;

}



export function salvarUsuario(usuario){

  localStorage.setItem(
    "usuario",
    JSON.stringify(usuario)
  );

}



export function buscarUsuario(){

  const dados =
    localStorage.getItem("usuario");


  if(!dados){

    return null;

  }


  return JSON.parse(dados);

}



export function atualizarSaldo(valor){

  const usuario = buscarUsuario();


  if(usuario){

    usuario.saldo += valor;


    salvarUsuario(usuario);

  }

}