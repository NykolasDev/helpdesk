import React, { useState } from 'react';

export default function FormChamado({ onChamadoCriado }) {
  const [solicitante, setSolicitante] = useState('');
  const [setor, setSetor] = useState('');
  const [tipo, setTipo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [prioridade, setPrioridade] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [erros, setErros] = useState({});

  function validar() {
    const novosErros = {};
    if (solicitante.trim().length < 3) {
      novosErros.solicitante = 'O nome do solicitante deve ter no mínimo 3 caracteres.';
    }
    if (!setor) novosErros.setor = 'Selecione o setor.';
    if (!tipo) novosErros.tipo = 'Selecione o tipo de problema.';
    if (descricao.trim().length < 10) {
      novosErros.descricao = 'A descrição deve conter pelo menos 10 caracteres.';
    }
    if (!prioridade) novosErros.prioridade = 'Selecione a prioridade.';
    
    return novosErros;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errosValidacao = validar();
    setErros(errosValidacao);

    if (Object.keys(errosValidacao).length > 0) return;

    setSubmitting(true);

    const novoChamado = {
      solicitante: solicitante.trim(),
      setor,
      tipo,
      descricao: descricao.trim(),
      prioridade
    };

    fetch('http://localhost:3000/chamados', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoChamado)
    })
      .then((res) => {
        if (!res.ok) throw new Error('Falha ao salvar no servidor');
        return res.json();
      })
      .then((chamadoSalvo) => {
        onChamadoCriado(chamadoSalvo);
        setSolicitante('');
        setSetor('');
        setTipo('');
        setDescricao('');
        setPrioridade('');
        setSubmitting(false);
      })
      .catch((err) => {
        alert(err.message);
        setSubmitting(false);
      });
  }

  return (
    <div className="card-box">
      <h2>Abrir Chamado Técnico</h2>
      <form onSubmit={handleSubmit} className="form-helpdesk">
        <div className="form-group">
          <label htmlFor="solicitante">Nome do Solicitante *</label>
          <input 
            id="solicitante"
            type="text" 
            placeholder="Digite seu nome"
            value={solicitante}
            onChange={(e) => setSolicitante(e.target.value)}
            disabled={submitting}
          />
          {erros.solicitante && <span className="error-text">{erros.solicitante}</span>}
        </div>

        <div className="grid-2">
          <div className="form-group">
            <label htmlFor="setor">Setor *</label>
            <select 
              id="setor"
              value={setor}
              onChange={(e) => setSetor(e.target.value)}
              disabled={submitting}
            >
              <option value="">Selecione...</option>
              <option value="TI">TI</option>
              <option value="RH">RH</option>
              <option value="Financeiro">Financeiro</option>
              <option value="Operações">Operações</option>
              <option value="Comercial">Comercial</option>
            </select>
            {erros.setor && <span className="error-text">{erros.setor}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="tipo">Tipo de Problema *</label>
            <select 
              id="tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              disabled={submitting}
            >
              <option value="">Selecione...</option>
              <option value="Hardware">Hardware</option>
              <option value="Software">Software</option>
              <option value="Rede">Rede</option>
              <option value="Acesso">Acesso</option>
            </select>
            {erros.tipo && <span className="error-text">{erros.tipo}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="prioridade">Prioridade *</label>
          <select 
            id="prioridade"
            value={prioridade}
            onChange={(e) => setPrioridade(e.target.value)}
            disabled={submitting}
          >
            <option value="">Selecione...</option>
            <option value="Baixa">Baixa</option>
            <option value="Média">Média</option>
            <option value="Alta">Alta</option>
          </select>
          {erros.prioridade && <span className="error-text">{erros.prioridade}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="descricao">Descrição do Problema *</label>
          <textarea 
            id="descricao"
            rows="4"
            placeholder="Descreva o problema com detalhes..."
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            disabled={submitting}
          ></textarea>
          {erros.descricao && <span className="error-text">{erros.descricao}</span>}
        </div>

        <button type="submit" className="btn-primary" disabled={submitting}>
          {submitting ? 'Enviando...' : 'Enviar Chamado'}
        </button>
      </form>
    </div>
  );
}