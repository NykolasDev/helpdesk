import React, { useState } from 'react';
import useFetch from './hooks/useFetch';
import NavBar from './components/NavBar';
import FormChamado from './components/FormChamado';
import ListaChamados from './components/ListaChamados';
import './App.css';

export default function App() {
  const [paginaAtiva, setPaginaAtiva] = useState('lista');

  const { data: chamados, setData: setChamados, loading, error } = useFetch(
    'http://localhost:3000/chamados'
  );

  function handleChamadoCriado(novoChamado) {
    setChamados((prev) => [...prev, novoChamado]);
    setPaginaAtiva('lista');
  }

  return (
    <div className="app-container">
      <header>
        <NavBar paginaAtiva={paginaAtiva} onMudarPagina={setPaginaAtiva} />
      </header>

      <main className="main-content">
        {error ? (
          <div className="card-box error-banner">
            Erro de conexão com o servidor: {error}
          </div>
        ) : (
          <>
            {paginaAtiva === 'lista' && (
              <ListaChamados chamados={chamados} loading={loading} />
            )}
            {paginaAtiva === 'form' && (
              <FormChamado onChamadoCriado={handleChamadoCriado} />
            )}
          </>
        )}
      </main>
    </div>
  );
}