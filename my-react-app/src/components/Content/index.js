import React from 'react';

function Content() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="wrap">
          <h2 id="hero-title" className="heroTitle">Bem-vindo à Aula de React do Professor Bruno</h2>
          <p className="heroSubtitle">
            Aprenda a construir aplicações modernas com React, hooks, testes e deploy. Projeto prático em cada módulo.
          </p>
        </div>
      </section>

      <section className="courses" aria-label="Módulos do curso">
        <div className="wrap grid">
          <article className="card">
            <h3 className="cardTitle">Módulo 1 — Fundamentos</h3>
            <p className="cardText">JSX, componentes, props e estado. Primeiro projeto: lista de tarefas.</p>
            <a className="cardBtn" href="#">Ver detalhes</a>
          </article>

          <article className="card">
            <h3 className="cardTitle">Módulo 2 — Hooks & Efeitos</h3>
            <p className="cardText">useState, useEffect, custom hooks e patterns para organizar lógica.</p>
            <a className="cardBtn" href="#">Ver detalhes</a>
          </article>

          <article className="card">
            <h3 className="cardTitle">Módulo 3 — Rotas e Estado Global</h3>
            <p className="cardText">React Router, Context API e introdução a bibliotecas de estado.</p>
            <a className="cardBtn" href="#">Ver detalhes</a>
          </article>

          <article className="card">
            <h3 className="cardTitle">Módulo 4 — Testes & Deploy</h3>
            <p className="cardText">Testes com Jest/React Testing Library e deploy em Vercel/Netlify.</p>
            <a className="cardBtn" href="#">Ver detalhes</a>
          </article>
        </div>
      </section>

      <section className="cta" aria-labelledby="cta-title">
        <div className="wrap">
          <h3 id="cta-title">Quer participar?</h3>
          <p className="heroSubtitle">Inscreva-se para receber notificações sobre a próxima turma.</p>
          <a className="primary" href="#">Inscrever-se</a>
        </div>
      </section>
    </>
  );
}

export default Content;