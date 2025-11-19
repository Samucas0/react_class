import { BrowserRouter, Routes, Route } from "react-router-dom";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/series" element={<Series />} />
        <Route path="/filmes" element={<Filmes />} />
        <Route path="/minha-lista" element={<MinhaLista />} />
        <Route path="/buscar" element={<Buscar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;