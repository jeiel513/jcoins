import {
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";

import { db } from "./config";

export async function buscarCarteira(usuarioId){

  const documento = await getDoc(
    doc(db, "usuarios", usuarioId)
  );

  if(!documento.exists()){

    return {
      saldo: 0,
      transacoes: []
    };

  }

  const dados = documento.data();

  return dados.carteira || {
    saldo: 0,
    transacoes: []
  };

}

export async function salvarCarteira(usuarioId, carteira){

  await updateDoc(
    doc(db, "usuarios", usuarioId),
    {
      carteira
    }
  );

}

export async function adicionarSaldo(usuarioId, valor){

  const carteira = await buscarCarteira(usuarioId);

  carteira.saldo += valor;

  carteira.transacoes.push({
    tipo: "crédito",
    valor,
    data: new Date().toISOString()
  });

  await salvarCarteira(usuarioId, carteira);

  return carteira;

}
