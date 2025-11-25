import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Buscar from './pages/Buscar';
import Filmes from './pages/Filmes';
import Series from './pages/Series';
import MinhaLista from './pages/MinhaLista';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/buscar" element={<Buscar />} />
      <Route path="/filmes" element={<Filmes />} />
      <Route path="/series" element={<Series />} />
      <Route path="/minha-lista" element={<MinhaLista />} />
    </Routes>
  );
}