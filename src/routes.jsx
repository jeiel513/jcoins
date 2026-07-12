import { BrowserRouter, Routes, Route } from "react-router-dom";

import Splash from "./pages/Splash";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Home from "./pages/Home";
import Carteira from "./pages/Carteira";
import Admin from "./pages/Admin";
import Transferencia from "./pages/Transferencia";
import Notificacoes from "./pages/Notificacoes";
import Perfil from "./pages/Perfil";
import EditarPerfil from "./pages/EditarPerfil";
import AlterarSenha from "./pages/AlterarSenha";

import ProtecaoRota from "./components/ProtecaoRota";



export default function AppRoutes(){

  return (

    <BrowserRouter>

      <Routes>


        <Route path="/" element={<Splash />} />


        <Route path="/login" element={<Login />} />


        <Route path="/cadastro" element={<Cadastro />} />



        <Route

          path="/home"

          element={

            <ProtecaoRota>

              <Home />

            </ProtecaoRota>

          }

        />




        <Route

          path="/carteira"

          element={

            <ProtecaoRota>

              <Carteira />

            </ProtecaoRota>

          }

        />




        <Route

          path="/transferencia"

          element={

            <ProtecaoRota>

              <Transferencia />

            </ProtecaoRota>

          }

        />




        <Route

          path="/notificacoes"

          element={

            <ProtecaoRota>

              <Notificacoes />

            </ProtecaoRota>

          }

        />




        <Route

          path="/perfil"

          element={

            <ProtecaoRota>

              <Perfil />

            </ProtecaoRota>

          }

        />




        <Route

          path="/editar-perfil"

          element={

            <ProtecaoRota>

              <EditarPerfil />

            </ProtecaoRota>

          }

        />




        <Route

          path="/alterar-senha"

          element={

            <ProtecaoRota>

              <AlterarSenha />

            </ProtecaoRota>

          }

        />




        <Route

          path="/admin"

          element={

            <ProtecaoRota admin>

              <Admin />

            </ProtecaoRota>

          }

        />



      </Routes>


    </BrowserRouter>

  );

}
