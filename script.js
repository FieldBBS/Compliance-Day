let perguntasOriginal = [
  { pergunta: "Situação: Um fornecedor envia um presente caro antes da renovação de contrato. \n\Isso é uma red flag? ✅ Sim / ❌ Não", redflag: true, opcoes: ["Baixa produtividade","Conflito de interesses","Nenhum","Erro operacional"], respostaRisco: 1 },
  { pergunta: "Situação: Um gestor dá feedback crítico, em particular, de forma respeitosa. \n\Isso é uma red flag? ✅ Sim / ❌ Não", redflag: false, opcoes: ["Conflito de interesses","Nenhum","Assédio moral","Fraude"], respostaRisco: 1 },
  { pergunta: "Situação: Compartilhamento de login para agilizar atividade. \n\Isso é uma red flag? ✅ Sim / ❌ Não", redflag: true, opcoes: ["Segurança da informação","Nenhum","Engajamento baixo","Cortesia corporativa"], respostaRisco: 0 },
  { pergunta: "Situação: Uso do canal de denúncia para relatar situação inadequada.\n\Isso é uma red flag? ✅ Sim / ❌ Não", redflag: false, opcoes: ["Vazamento de dados","Assédio","Nenhum","Fraude"], respostaRisco: 2 },
  { pergunta: "Situação: Ajustar números do relatório para bater meta. \n\Isso é uma red flag? ✅ Sim / ❌ Não", redflag: true, opcoes: ["Conflito","Nenhum","Inovação","Fraude / manipulação"], respostaRisco: 3 },
  { pergunta: "Situação: Reconhecimento público de bom desempenho. \n\Isso é uma red flag? ✅ Sim / ❌ Não", redflag: false, opcoes: ["Conflito","Fraude","Nenhum","Assédio"], respostaRisco: 2 },
  { pergunta: "Situação: Pedido para alterar data de documento. \n\Isso é uma red flag? ✅ Sim / ❌ Não", redflag: true, opcoes: ["Nenhum","Comunicação","Falsificação documental","Mercado"], respostaRisco: 2 },
  { pergunta: "Situação: Discussão firme em reunião com respeito. \n\Isso é uma red flag? ✅ Sim / ❌ Não", redflag: false, opcoes: ["Assédio","Nenhum","Conflito","Fraude"], respostaRisco: 1 },
  { pergunta: "Situação: Piadas constrangedoras recorrentes. \n\Isso é uma red flag? ✅ Sim / ❌ Não", redflag: true, opcoes: ["Nenhum","Lavagem","Assédio moral","Conflito"], respostaRisco: 2 },
  { pergunta: "Situação: Recusa em participar de prática irregular e reporte. \n\Isso é uma red flag? ✅ Sim / ❌ Não", redflag: false, opcoes: ["Fraude","Conflito","Nenhum","Assédio"], respostaRisco: 2 },
  { pergunta: "Situação: Despesa incompatível com comprovantes. \n\Isso é uma red flag? ✅ Sim / ❌ Não", redflag: true, opcoes: ["Nenhum","Alinhamento","Fraude em reembolso","Agenda"], respostaRisco: 2 },
  { pergunta: "Situação: Brinde institucional dentro da política. \n\Isso é uma red flag? ✅ Sim / ❌ Não", redflag: false, opcoes: ["Assédio","Conflito","Lavagem","Nenhum"], respostaRisco: 3 },
  { pergunta: "Situação: Pressão para aprovar sem seguir fluxo. \n\Isso é uma red flag? ✅ Sim / ❌ Não", redflag: true, opcoes: ["Nenhum","Equipe","Não conformidade","Governança"], respostaRisco: 2 },
  { pergunta: "Situação: Discordância respeitosa entre áreas. \n\Isso é uma red flag? ✅ Sim / ❌ Não", redflag: false, opcoes: ["Nenhum","Assédio","Fraude","Conflito"], respostaRisco: 0 },
  { pergunta: "Situação: Envio de contrato para e-mail pessoal. \n\Isso é uma red flag? ✅ Sim / ❌ Não", redflag: true, opcoes: ["Nenhum","Segurança da informação","Inadimplência","Produtividade"], respostaRisco: 1 },
  { pergunta: "Situação: Influência em contratação por amizade. \n\Isso é uma red flag? ✅ Sim / ❌ Não", redflag: true, opcoes: ["LGPD","Nenhum","Conflito de interesses","Cambial"], respostaRisco: 2 },
  { pergunta: "Situação: Reuniões com decisões registradas e transparentes. \n\Isso é uma red flag? ✅ Sim / ❌ Não", redflag: false, opcoes: ["Nenhum","Fraude","Assédio","Conflito"], respostaRisco: 0 },
  { pergunta: "Situação: Líder pede para ignorar due diligence. \n\Isso é uma red flag? ✅ Sim / ❌ Não", redflag: true, opcoes: ["Nenhum","Ergonômico","Desmotivação","Risco de integridade"], respostaRisco: 3 },
  { pergunta: "Situação: Gestor orienta não seguir denúncia para evitar desgaste. \n\Isso é uma red flag? ✅ Sim / ❌ Não", redflag: true, opcoes: ["Nenhum","Organização","Comportamento inadequado","Prioridade"], respostaRisco: 2 },
  { pergunta: "Situação: Durante uma reunião, uma pessoa discorda da proposta de outra de forma bastante firme. Não há ofensas, ironias nem exposição vexatória, e o debate permanece restrito ao tema técnico. \n\Isso é uma red flag? ✅ Sim / ❌ Não", redflag: false, opcoes: ["Assédio","Nenhum","Conflito","Discriminação"], respostaRisco: 1 }
];

let perguntas = [];
let indice = 0;
let score = 0;
let nomeJogador = "";
let etapa = "redflag";

function embaralhar(array) {
  return array.sort(() => Math.random() - 0.5);
}

// INICIAR
function comecar() {
  nomeJogador = document.getElementById("nome").value.trim();

  if (!nomeJogador) {
    alert("Digite um nome!");
    return;
  }

  let ranking = JSON.parse(localStorage.getItem("ranking")) || [];

  if (ranking.some(r => r.nome.toLowerCase() === nomeJogador.toLowerCase())) {
    alert("Esse nome já jogou!");
    return;
  }

  perguntas = embaralhar([...perguntasOriginal]).slice(0, 5);
  indice = 0;
  score = 0;
  etapa = "redflag";

  document.getElementById("inicio").style.display = "none";
  document.getElementById("quiz").style.display = "block";

  mostrarPergunta();
}

// MOSTRAR
function mostrarPergunta() {
  let p = perguntas[indice];

  document.getElementById("pergunta").innerHTML = `
  <div class="card">
    <div class="tag">SITUAÇÃO</div>
    <div class="card-title">${p.pergunta}</div>
  </div>
`;


  if (etapa === "redflag") {
    document.getElementById("opcoes").innerHTML = `
      <button onclick="responderRedflag(true)">✅ Sim</button><br>
      <button onclick="responderRedflag(false)">❌ Não</button>
    `;
  } else {
    let html = "<h3>Qual o risco?</h3>";
    p.opcoes.forEach((op, i) => {
      html += `<button onclick="responderRisco(${i})">${op}</button><br>`;
    });
    document.getElementById("opcoes").innerHTML = html;
  }
}

// FEEDBACK
function mostrarFeedback(texto, cor) {
  let div = document.createElement("div");

  div.innerText = texto;
  div.style.position = "fixed";
  div.style.top = "40%";
  div.style.left = "50%";
  div.style.transform = "translate(-50%, -50%)";
  div.style.fontSize = "28px";
  div.style.padding = "15px";
  div.style.background = cor;
  div.style.borderRadius = "10px";
  div.style.zIndex = 999;

  document.body.appendChild(div);

  setTimeout(() => div.remove(), 700);
}

// ETAPA 1
function responderRedflag(resp) {
  let correta = perguntas[indice].redflag;

  if (resp === correta) {
    score += 10;
    mostrarFeedback("+10 ✅", "green");
  } else {
    mostrarFeedback("❌", "red");
  }

  etapa = "risco";
  setTimeout(mostrarPergunta, 600);
}

// ETAPA 2
function responderRisco(opcao) {
  let correta = perguntas[indice].respostaRisco;

  if (opcao === correta) {
    score += 20;
    mostrarFeedback("+20 ✅", "green");
  } else {
    mostrarFeedback("❌", "red");
  }

  indice++;
  etapa = "redflag";

  if (indice < perguntas.length) {
    setTimeout(mostrarPergunta, 600);
  } else {
    setTimeout(finalizar, 600);
  }
}

// CLASSIFICAÇÃO
function getClassificacao(score) {
  if (score >= 120) return "🥇 Guardião do Compliance";
  if (score >= 90) return "🥈 Radar de Riscos";
  if (score >= 60) return "🥉 Olhar Atento";
  if (score >= 30) return "📘 Em Desenvolvimento";
  return "⚠️ Atenção";
}

// CONFETE
function soltarConfete() {
  for (let i = 0; i < 100; i++) {
    let c = document.createElement("div");
    c.style.position = "fixed";
    c.style.width = "8px";
    c.style.height = "8px";
    c.style.background = `hsl(${Math.random()*360},100%,50%)`;
    c.style.left = Math.random()*100 + "vw";
    c.style.top = "0";
    c.style.zIndex = 999;

    c.animate([{transform:"translateY(0)"},{transform:"translateY(100vh)"}], {
      duration: 2000 + Math.random()*2000
    });

    document.body.appendChild(c);
    setTimeout(()=>c.remove(),3000);
  }
}

// FINAL
function finalizar() {
  document.getElementById("quiz").style.display = "none";
  document.getElementById("resultado").style.display = "block";

  document.getElementById("placar").innerText =
    `${nomeJogador}\n${score} pontos\n${getClassificacao(score)}`;

  if (score >= 510) soltarConfete();

  salvarRanking(nomeJogador, score);
}

// RANKING
function salvarRanking(nome, pontos) {
  let ranking = JSON.parse(localStorage.getItem("ranking")) || [];
  ranking.push({ nome, pontos });
  ranking.sort((a, b) => b.pontos - a.pontos);
  localStorage.setItem("ranking", JSON.stringify(ranking.slice(0, 50)));
}

function mostrarRanking() {
  let ranking = JSON.parse(localStorage.getItem("ranking")) || [];
  let lista = document.getElementById("ranking");
  lista.innerHTML = "";

  ranking.forEach((r, i) => {
    let li = document.createElement("li");

    let medalha = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : "🎯";

    li.innerHTML = `
      <div class="nome">${medalha} ${r.nome}</div>
      <div class="pontos">${r.pontos}</div>
    `;

    lista.appendChild(li);
  });
}

function reiniciar() {
  document.getElementById("resultado").style.display = "none";
  document.getElementById("inicio").style.display = "block";
  mostrarRanking();
}

mostrarRanking();


// ✅ bolinhas
function criarBolinhas() {
  const bg = document.querySelector(".background");

  for (let i = 0; i < 30; i++) {
    const span = document.createElement("span");

    span.style.left = Math.random() * 100 + "vw";
    span.style.animationDuration = (5 + Math.random() * 10) + "s";
    span.style.opacity = Math.random();

    bg.appendChild(span);
  }
}

criarBolinhas();