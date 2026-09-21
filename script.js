let perguntasOriginal = [
  { pergunta: "Um fornecedor envia um presente caro antes da renovação de contrato.", redflag: true, opcoes: ["Baixa produtividade","Conflito de interesses","Nenhum","Erro operacional"], respostaRisco: 1 },
  { pergunta: "Um gestor dá feedback crítico, em particular, de forma respeitosa.", redflag: false, opcoes: ["Conflito de interesses","Nenhum","Assédio moral","Fraude"], respostaRisco: 1 },
  { pergunta: "Compartilhamento de login para agilizar atividade.", redflag: true, opcoes: ["Segurança da informação","Nenhum","Engajamento baixo","Cortesia corporativa"], respostaRisco: 0 },
  { pergunta: "Uso do canal de denúncia para relatar situação inadequada.", redflag: false, opcoes: ["Vazamento de dados","Assédio","Nenhum","Fraude"], respostaRisco: 2 },
  { pergunta: "Ajustar números do relatório para bater meta.", redflag: true, opcoes: ["Conflito","Nenhum","Inovação","Fraude / manipulação"], respostaRisco: 3 },
  { pergunta: "Reconhecimento público de bom desempenho.", redflag: false, opcoes: ["Conflito","Fraude","Nenhum","Assédio"], respostaRisco: 2 },
  { pergunta: "Pedido para alterar data de documento.", redflag: true, opcoes: ["Nenhum","Comunicação","Falsificação documental","Mercado"], respostaRisco: 2 },
  { pergunta: "Discussão firme em reunião com respeito.", redflag: false, opcoes: ["Assédio","Nenhum","Conflito","Fraude"], respostaRisco: 1 },
  { pergunta: "Piadas constrangedoras recorrentes.", redflag: true, opcoes: ["Nenhum","Lavagem","Assédio moral","Conflito"], respostaRisco: 2 },
  { pergunta: "Recusa em participar de prática irregular e reporte.", redflag: false, opcoes: ["Fraude","Conflito","Nenhum","Assédio"], respostaRisco: 2 },
  { pergunta: "Despesa incompatível com comprovantes.", redflag: true, opcoes: ["Nenhum","Alinhamento","Fraude em reembolso","Agenda"], respostaRisco: 2 },
  { pergunta: "Brinde institucional dentro da política.", redflag: false, opcoes: ["Assédio","Conflito","Lavagem","Nenhum"], respostaRisco: 3 },
  { pergunta: "Pressão para aprovar sem seguir fluxo.", redflag: true, opcoes: ["Nenhum","Equipe","Não conformidade","Governança"], respostaRisco: 2 },
  { pergunta: "Discordância respeitosa entre áreas.", redflag: false, opcoes: ["Nenhum","Assédio","Fraude","Conflito"], respostaRisco: 0 },
  { pergunta: "Envio de contrato para e-mail pessoal.", redflag: true, opcoes: ["Nenhum","Segurança da informação","Inadimplência","Produtividade"], respostaRisco: 1 },
  { pergunta: "Influência em contratação por amizade.", redflag: true, opcoes: ["LGPD","Nenhum","Conflito de interesses","Cambial"], respostaRisco: 2 },
  { pergunta: "Reuniões com decisões registradas e transparentes.", redflag: false, opcoes: ["Nenhum","Fraude","Assédio","Conflito"], respostaRisco: 0 },
  { pergunta: "Líder pede para ignorar due diligence.", redflag: true, opcoes: ["Nenhum","Ergonômico","Desmotivação","Risco de integridade"], respostaRisco: 3 },
  { pergunta: "Gestor orienta não seguir denúncia para evitar desgaste.", redflag: true, opcoes: ["Nenhum","Organização","Comportamento inadequado","Prioridade"], respostaRisco: 2 },
  { pergunta: "Durante uma reunião, uma pessoa discorda da proposta de outra de forma bastante firme. Não há ofensas, ironias nem exposição vexatória, e o debate permanece restrito ao tema técnico.", redflag: false, opcoes: ["Assédio","Nenhum","Conflito","Discriminação"], respostaRisco: 1 }
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
    alert("Digite seu nome, sobrenome e setor");
    return;
  }

  let ranking = JSON.parse(localStorage.getItem("ranking")) || [];

  if (ranking.some(r => r.nome.toLowerCase() === nomeJogador.toLowerCase())) {
    alert("Ei, você já jogou, deixe o próximo da fila jogar também!");
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

  document.getElementById("pergunta").innerHTML =  `
  <div class="card">
    <div class="tag">SITUAÇÃO</div>
    <div class="card-title">${p.pergunta}</div>
  </div>`;
  document.getElementById("perguntared").hidden = true; //Esconder "ISSO É UMA RED FLAG?"


  if (etapa === "redflag") {
    document.getElementById("perguntared").hidden = false; //Mostrar "ISSO É UMA RED FLAG?"
    document.getElementById("")
    document.getElementById("opcoes").innerHTML = `
      <button onclick="responderRedflag(true)">Sim 😁👌</button><br>
      <button onclick="responderRedflag(false)">Não 😶👎</button>
    `;
  } else {
    let html = "<h2>Qual o risco?</h2>";
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
