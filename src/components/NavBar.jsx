import React from 'react';

export default function NavBar({ paginaAtiva, onMudarPagina }) {
  return (
    <nav className="helpdesk-nav">
      <div className="nav-logo">💻 Support Helpdesk TI</div>
      <div className="nav-links">
        <button 
          className={`nav-btn ${paginaAtiva === 'lista' ? 'active' : ''}`}
          onClick={() => onMudarPagina('lista')}
        >
          Chamados Abertos
        </button>
        <button 
          className={`nav-btn ${paginaAtiva === 'form' ? 'active' : ''}`}
          onClick={() => onMudarPagina('form')}
        >
          + Abrir Chamado
        </button>
      </div>
    </nav>
  );
}