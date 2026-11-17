import React from 'react';

export default function ListaChamados({ chamados = [], loading }) {
  if (loading) {
    return (
      <div className="card-box text-center">
        <p className="loading-text">Carregando chamados...</p>
      </div>
    );
  }

  if (!chamados || chamados.length === 0) {
    return (
      <div className="card-box text-center">
        <p className="empty-text">Nenhum chamado registrado no momento.</p>
      </div>
    );
  }

  function getBadgeClass(prioridade) {
    if (prioridade === 'Alta') return 'badge-alta';
    if (prioridade === 'Média') return 'badge-media';
    return 'badge-baixa';
  }

  return (
    <div className="card-box">
      <h2>Chamados Abertos ({chamados.length})</h2>
      <div className="chamados-grid">
        {chamados.map((item) => (
          <div key={item.id} className="chamado-card">
            <div className="chamado-header">
              <span className="chamado-id">#{item.id}</span>
              <span className={`badge-prioridade ${getBadgeClass(item.prioridade)}`}>
                {item.prioridade}
              </span>
            </div>
            <h3 className="chamado-title">{item.tipo}</h3>
            <p className="chamado-desc">{item.descricao}</p>
            <div className="chamado-footer">
              <span>👤 <strong>{item.solicitante}</strong></span>
              <span>🏢 {item.setor}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}