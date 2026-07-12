import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

import { auth } from "./config";

export async function cadastrar(email, senha){

  const credencial = await createUserWithEmailAndPassword(
    auth,
    email,
    senha
  );

  return credencial.user;
}

export async function entrar(email, senha){

  const credencial = await signInWithEmailAndPassword(
    auth,
    email,
    senha
  );

  return credencial.user;
}

export async function sair(){

  await signOut(auth);

}
