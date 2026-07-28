let etapa = "redflag"; // controle de etapa
let acertouRedflag = false;
``

let perguntasOriginal = [
  {
    pergunta: "Um fornecedor envia um presente caro antes da renovação de contrato.",
    redflag: true,
    opcoes: ["Baixa produtividade", "Conflito de interesses", "Nenhum", "Erro operacional"],
    respostaRisco: 1
  },
  {
    pergunta: "Um gestor dá feedback crítico, em particular, de forma respeitosa.",
    redflag: false,
    opcoes: ["Conflito de interesses", "Nenhum", "Assédio moral", "Fraude"],
    respostaRisco: 1
  },
  {
    pergunta: "Compartilhamento de login para agilizar atividade.",
    redflag: true,
    opcoes: ["Segurança da informação", "Nenhum", "Engajamento baixo", "Cortesia corporativa"],
    respostaRisco: 0
  },
  {
    pergunta: "Uso do canal de denúncia para relatar situação inadequada.",
    redflag: false,
    opcoes: ["Vazamento de dados", "Assédio", "Nenhum", "Fraude"],
    respostaRisco: 2
  },
  {
    pergunta: "Ajustar números do relatório para bater meta.",
    redflag: true,
    opcoes: ["Conflito", "Nenhum", "Inovação", "Fraude / manipulação"],
    respostaRisco: 3
  }
];


let perguntas = [];
let indice = 0;
let score = 0;
let nomeJogador = "";

// ✅ EMBARALHAR PERGUNTAS
function embaralhar(array) {
  return array.sort(() => Math.random() - 0.5);
}

// iniciar
function comecar() {
  nomeJogador = document.getElementById("nome").value.trim();

  if (!nomeJogador) {
    alert("Digite um nome!");
    return;
  }

  let ranking = JSON.parse(localStorage.getItem("ranking")) || [];

  //NÃO REPETIR NOME
  if (ranking.some(r => r.nome.toLowerCase() === nomeJogador.toLowerCase())) {
    alert("Esse nome já jogou!");
    return;
  }

  perguntas = embaralhar([...perguntasOriginal]);

  indice = 0;
  score = 0;

  document.getElementById("inicio").style.display = "none";
  document.getElementById("quiz").style.display = "block";

  mostrarPergunta();
}

// mostrar pergunta
function mostrarPergunta() {
  let p = perguntas[indice];

  document.getElementById("pergunta").innerText = p.pergunta;

  if (etapa === "redflag") {
    document.getElementById("opcoes").innerHTML = `
      <button onclick="responderRedflag(true)">✅ Sim</button><br>
      <button onclick="responderRedflag(false)">❌ Não</button>
    `;
  } else {
    let opcoesHTML = "<h3>Qual o risco?</h3>";
    p.opcoes.forEach((op, i) => {
      opcoesHTML += `<button onclick="responderRisco(${i})">${op}</button><br>`;
    });

    document.getElementById("opcoes").innerHTML = opcoesHTML;
  }
}

// ✅ FEEDBACK VISUAL
function mostrarFeedback(texto, cor) {
  let div = document.createElement("div");
  div.innerText = texto;
  div.style.position = "fixed";
  div.style.top = "40%";
  div.style.left = "50%";
  div.style.transform = "translate(-50%, -50%)";
  div.style.fontSize = "40px";
  div.style.padding = "20px";
  div.style.background = cor;
  div.style.borderRadius = "10px";
  div.style.zIndex = 999;

  document.body.appendChild(div);

  setTimeout(() => div.remove(), 800);
}

// responder
function responder(opcao) {
  let acertou = opcao === perguntas[indice].resposta;

  if (acertou) {
    score++;
    mostrarFeedback("✅ ACERTOU!", "green");
  } else {
    mostrarFeedback("❌ ERROU!", "red");
  }

  indice++;

  if (indice < perguntas.length) {
    setTimeout(mostrarPergunta, 800);
  } else {
    setTimeout(finalizar, 800);
  }
}

// CONFETE
function soltarConfete() {
  for (let i = 0; i < 100; i++) {
    let confete = document.createElement("div");
    confete.style.position = "fixed";
    confete.style.width = "10px";
    confete.style.height = "10px";
    confete.style.background = `hsl(${Math.random() * 360},100%,50%)`;
    confete.style.top = "0px";
    confete.style.left = Math.random() * 100 + "vw";
    confete.style.opacity = 0.8;
    confete.style.zIndex = 999;

    confete.animate(
      [
        { transform: "translateY(0)" },
        { transform: "translateY(100vh)" }
      ],
      {
        duration: 2000 + Math.random() * 2000,
        iterations: 1
      }
    );

    document.body.appendChild(confete);

    setTimeout(() => confete.remove(), 3000);
  }
}

// finalizar
function finalizar() {
  document.getElementById("quiz").style.display = "none";
  document.getElementById("resultado").style.display = "block";

  document.getElementById("placar").innerText =
    `${nomeJogador}, você acertou ${score} de ${perguntas.length}`;

  // 🎉 se acertou tudo
  if (score === perguntas.length) {
    soltarConfete();
  }

  salvarRanking(nomeJogador, score);
}

// salvar ranking
function salvarRanking(nome, pontos) {
  let ranking = JSON.parse(localStorage.getItem("ranking")) || [];

  ranking.push({ nome, pontos });

  ranking.sort((a, b) => b.pontos - a.pontos);

  ranking = ranking.slice(0, 50);

  localStorage.setItem("ranking", JSON.stringify(ranking));
}

// ✅ MEDALHAS
function getMedalha(index) {
  if (index === 0) return "🥇";
  if (index === 1) return "🥈";
  if (index === 2) return "🥉";
  return "🎯";
}

// mostrar ranking
function mostrarRanking() {
  let ranking = JSON.parse(localStorage.getItem("ranking")) || [];

  let lista = document.getElementById("ranking");
  lista.innerHTML = "";

  ranking.forEach((r, i) => {
    let li = document.createElement("li");

    // classes para top
    if (i === 0) li.classList.add("top1");
    if (i === 1) li.classList.add("top2");
    if (i === 2) li.classList.add("top3");

    let medalha = getMedalha(i);

    li.innerHTML = `
      <div class="nome">
        ${medalha} ${r.nome}
      </div>
      <div class="pontos">
        ${r.pontos}
      </div>
    `;

    lista.appendChild(li);
  });
}

// reiniciar
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