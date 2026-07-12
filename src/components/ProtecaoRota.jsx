import React from "react";
import { Navigate } from "react-router-dom";
import { buscarUsuario } from "../services/usuarioService";


export default function ProtecaoRota({ children, admin=false }){


  const usuario = buscarUsuario();




  if(!usuario){

    return <Navigate to="/login" />;

  }




  if(admin && usuario.tipo !== "admin"){

    return <Navigate to="/home" />;

  }





  return children;


}
