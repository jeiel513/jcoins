import {
  doc,
  updateDoc,
  getDoc
} from "firebase/firestore";

import { db } from "./config";


export async function salvarAvatar(
  usuarioId,
  imagem
){

  await updateDoc(

    doc(
      db,
      "usuarios",
      usuarioId
    ),

    {
      avatar:imagem
    }

  );

}



export async function buscarAvatar(
  usuarioId
){

  const resultado = await getDoc(

    doc(
      db,
      "usuarios",
      usuarioId
    )

  );


  if(!resultado.exists()){

    return null;

  }


  return resultado.data().avatar || null;

}
