import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  getDoc
} from "firebase/firestore";

import { db } from "./config";

const usuariosRef = collection(db, "usuarios");

export async function criarUsuario(dados){

  const documento = await addDoc(
    usuariosRef,
    dados
  );

  return documento.id;

}

export async function buscarUsuarios(){

  const snapshot = await getDocs(
    usuariosRef
  );

  return snapshot.docs.map(item=>({
    id:item.id,
    ...item.data()
  }));

}

export async function buscarUsuarioPorEmail(email){

  const consulta = query(
    usuariosRef,
    where("email","==",email)
  );

  const resultado = await getDocs(
    consulta
  );

  if(resultado.empty){

    return null;

  }

  return {
    id:resultado.docs[0].id,
    ...resultado.docs[0].data()
  };

}

export async function buscarUsuarioPorId(id){

  const referencia = doc(
    db,
    "usuarios",
    id
  );

  const resultado = await getDoc(
    referencia
  );

  if(!resultado.exists()){

    return null;

  }

  return {
    id:resultado.id,
    ...resultado.data()
  };

}

export async function atualizarUsuario(id,dados){

  await updateDoc(
    doc(db,"usuarios",id),
    dados
  );

}

export async function aprovarUsuario(id){

  await atualizarUsuario(
    id,
    {
      status:"aprovado"
    }
  );

}

export async function bloquearUsuario(id){

  await atualizarUsuario(
    id,
    {
      status:"bloqueado"
    }
  );

}

export async function adicionarSaldo(id,valor){

  const usuario = await buscarUsuarioPorId(
    id
  );

  if(!usuario){

    return false;

  }

  const carteira = usuario.carteira || {
    saldo:0,
    transacoes:[]
  };

  carteira.saldo += valor;

  carteira.transacoes.push({

    tipo:"crédito administrativo",

    valor,

    data:new Date().toISOString()

  });

  await atualizarUsuario(
    id,
    {
      carteira
    }
  );

  return true;

}
export async function buscarUsuarioPorUid(uid){

  const consulta = query(
    usuariosRef,
    where("uid","==",uid)
  );


  const resultado = await getDocs(
    consulta
  );


  if(resultado.empty){

    return null;

  }


  const documento = resultado.docs[0];


  return {

    id: documento.id,

    ...documento.data()

  };

}
