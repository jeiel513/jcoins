import Perfil from "./pages/Perfil";
import Transferencia from "./pages/Transferencia";
import Carteira from "./pages/Carteira";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Splash from "./pages/Splash";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Home from "./pages/Home";
import Admin from "./pages/Admin";

export default function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

<Route path="/perfil" element={<Perfil />} />

        <Route path="/" element={<Splash />} />

        <Route path="/login" element={<Login />} />

        <Route path="/cadastro" element={<Cadastro />} />

        <Route path="/home" element={<Home />} />

       <Route path="/carteira" element={<Carteira />} />

<Route path="/transferencia" element={<Transferencia />} />

 <Route path="/admin" element={<Admin />} />

      </Routes>

    </BrowserRouter>
  );
}
