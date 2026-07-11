import React from "react";
import { useNavigate } from "react-router-dom";

export default function Splash() {

  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-black text-white"
    >

      <div className="text-center">

        <div className="text-6xl mb-6">
          ☁️
        </div>


        <h1 className="text-4xl font-bold text-yellow-400">
          Cofre do Céu
        </h1>


        <p className="mt-3 text-gray-400">
          Sua carteira de J Coins
        </p>


        <button
          onClick={() => navigate("/login")}
          className="
            mt-8
            rounded-xl
            bg-yellow-500
            px-10
            py-3
            font-bold
            text-black
            hover:bg-yellow-400
          "
        >
          Entrar
        </button>


      </div>

    </div>
  );
}