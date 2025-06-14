const questions = [
  {
    q: "Quel est l’objectif principal d’une négociation informatique ?",
    options: [
      "Imposer son point de vue au fournisseur",
      "Obtenir un accord équilibré sur un produit ou un service informatique",
      "Acheter au prix le plus bas, quel que soit le service",
      "Remplacer les commerciaux"
    ],
    answer: 1
  },
  {
    q: "Lequel des éléments suivants est un enjeu spécifique de la négociation informatique ?",
    options: [
      "La langue utilisée",
      "La sécurité des données",
      "Le design du matériel",
      "Le nombre de vendeurs"
    ],
    answer: 1
  },
  {
    q: "Quelle est la première étape d’une négociation réussie ?",
    options: [
      "La signature du contrat",
      "La conclusion",
      "La préparation",
      "La discussion"
    ],
    answer: 2
  },
  {
    q: "Qu’est-ce qu’un SLA dans un contrat informatique ?",
    options: [
      "Un logiciel libre",
      "Une licence gratuite",
      "Un engagement de niveau de service",
      "Une clause de confidentialité"
    ],
    answer: 2
  },
  {
    q: "Quel risque est lié à une mauvaise négociation informatique ?",
    options: [
      "Un surcoût de main-d'œuvre uniquement",
      "Des conséquences uniquement juridiques",
      "Une dépendance technique et financière à un prestataire",
      "Un problème de compatibilité linguistique"
    ],
    answer: 2
  },
  {
    q: "Quel élément est essentiel dans une négociation collaborative ?",
    options: [
      "Le silence",
      "Le conflit",
      "Le rapport de force",
      "Le compromis gagnant-gagnant"
    ],
    answer: 3
  },
  {
    q: "Dans la négociation d’un logiciel SaaS, quel point est crucial ?",
    options: [
      "Le poids de l’application",
      "Le taux d’humidité du data center",
      "Les modalités de disponibilité et de support",
      "Le style graphique de l’interface"
    ],
    answer: 2
  },
  {
    q: "L’écoute active permet de :",
    options: [
      "D'interrompre son interlocuteur",
      "D'imposer son avis",
      "De mieux comprendre les attentes de l'autre partie",
      "De réduire la durée de la négociation"
    ],
    answer: 2
  },
  {
    q: "Exemples de négociation en informatique ?",
    options: [
      "Choix d'un fournisseur cloud",
      "Organisation d'une réunion",
      "Achat de matériel informatique",
      "Formation interne"
    ],
    answer: [0, 2] // QCM multiple (sera géré plus tard si tu veux)
  }
];

let current = 0;
let good = 0;
let bad = 0;
let timer = 2700; // 10 minutes

function loadQuestion() {
  const q = questions[current];
  document.getElementById("question-title").innerText = `Question ${current + 1} : ${q.q}`;
  const form = document.getElementById("answers-form");
  form.innerHTML = "";
  q.options.forEach((opt, i) => {
    const label = document.createElement("label");
    label.innerHTML = `<input type="radio" name="answer" value="${i}"> ${opt}`;
    form.appendChild(label);
  });
}
document.getElementById("next-btn").addEventListener("click", () => {
  const selected = document.querySelector('input[name="answer"]:checked');
  if (!selected) {
    alert("Sélectionne une réponse avant de continuer !");
    return;
  }

  const userAnswer = parseInt(selected.value);
  const correctAnswer = questions[current].answer;

  if (Array.isArray(correctAnswer)) {
    // Gérer les QCM multiples plus tard si nécessaire
  } else {
    if (userAnswer === correctAnswer) {
      good++;
    } else {
      bad++;
    }
  }

  current++;
  if (current < questions.length) {
    loadQuestion();
  } else {
    showResults();
  }
});
function showResults() {
  document.getElementById("question-box").classList.add("hidden");
  document.getElementById("result-box").classList.remove("hidden");

  document.getElementById("good-count").textContent = good;
  document.getElementById("bad-count").textContent = bad;

  const score = Math.round((good / questions.length) * 20);
  document.getElementById("score").textContent = score;

  const btn = document.createElement("button");
  btn.textContent = "Répondre à l'étude de cas";
  btn.onclick = showEtudeDeCas;
  document.getElementById("result-box").appendChild(btn);
}

function showEtudeDeCas() {
  const box = document.getElementById("question-box");
  box.classList.remove("hidden");
  box.innerHTML = `<h2>Étude de cas</h2>`;
  
  etudeDeCas.forEach((item, i) => {
    const label = document.createElement("label");
    label.innerHTML = `<p>${item.q}</p><textarea rows="4" style="width: 100%; margin-bottom: 20px;"></textarea>`;
    box.appendChild(label);
  });

  const btn = document.createElement("button");
  btn.textContent = "Continuer vers les questions ouvertes";
  btn.onclick = showQuestionsOuvertes;
  box.appendChild(btn);
}


function showQuestionsOuvertes() {
  const box = document.getElementById("question-box");
  box.innerHTML = `<h2>Questions Ouvertes</h2>`;

  questionsOuvertes.forEach((question, index) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p><strong>Q${index + 1} :</strong> ${question}</p>
      <textarea rows="4" style="width: 100%; margin-bottom: 20px;"></textarea>
    `;
    box.appendChild(div);
  });

  const btn = document.createElement("button");
  btn.textContent = "Soumettre mes réponses";
  btn.onclick = () => {
    alert("Merci ! Tes réponses aux questions ouvertes ont été saisies.");
    window.location.reload(); // ou afficher un récap plus tard
  };
  box.appendChild(btn);
}



// TIMER
function startTimer() {
  const timeEl = document.getElementById("time");
  const interval = setInterval(() => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    timeEl.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    timer--;

    if (timer < 0) {
      clearInterval(interval);
      alert("Temps écoulé !");
      showResults();
    }
  }, 1000);
}

loadQuestion();
startTimer();
// Étude de cas (affichée à la fin)
const etudeDeCas = [
  {
    q: "1. Qu’a-t-il manqué dans le processus projet ?"
  },
  {
    q: "2. Pourquoi l’implication des utilisateurs est-elle importante ?"
  },
  {
    q: "3. Que faire à l’avenir ?"
  }
];
const questionsOuvertes = [
  "Pourquoi est-il important de conclure un contrat dans un projet informatique ?",
  "Quel est l'objectif du contrat ?",
  "Qu’est-ce qu’une condition suspensive ?",
  "Qu’est-ce qu’un contrat clé en main ?",
  "Pourquoi prévoir la maintenance dans un contrat ?",
  "Pourquoi la réception est-elle une étape clé dans un projet informatique ?",
  "Que signifie 'réserve' lors d'une réception ?",
  "Quel est le rôle des assurances dans un projet informatique ?",
  "Quel est l’objectif principal de la réglementation des télécommunications ?",
  "Que permet la concurrence dans le secteur des télécoms ?",
  "Qu’étudie-t-on du côté de l’offre ?",
  "Quels sont les trois principaux opérateurs en Côte d’Ivoire ?",
  "Quels types de services offrent-ils ?",
  "Que permet la cartographie des acteurs ?",
  "Quelles sont les barrières principales à l’entrée sur le marché ?",
  "Quel est le type d’investissement nécessaire pour un nouvel entrant ?",
  "Quelles stratégies utilisent les opérateurs pour attirer des clients ?",
  "Pourquoi l’innovation est-elle clé pour les opérateurs ?",
  "Quel est le rôle de la régulation dans l’offre ?",
  "Qu’est-ce qu’une offre triple play ?",
  "Quel est le taux de pénétration mobile en Côte d’Ivoire ?",
  "Quelle est l’importance du mobile money dans le pays ?",
  "Quelles zones ont encore un accès limité à Internet haut débit ?",
  "Pourquoi les zones rurales sont-elles stratégiques ?",
  "Quel est le facteur clé pour séduire les consommateurs ruraux ?",
  "Quelle est la tranche d'âge dominante sur le marché ivoirien ?",
  "Quel est l’impact de la jeunesse sur la demande de services ?",
  "Comment évolue l’offre Internet en Côte d'Ivoire ?"
];

