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
    q: "Quel est un élément clé dans un contrat informatique ?",
    options: [
      "La nationalité du développeur",
      "Le type de clavier utilisé",
      "Le niveau de service attendu (SLA)",
      "Le nombre de pages du contrat"
    ],
    answer: 2
  },
  {
    q: "Pourquoi est-il important d'impliquer les utilisateurs dans un projet informatique ?",
    options: [
      "Pour les former à l'informatique",
      "Pour s'assurer que la solution réponde à leurs besoins",
      "Pour réduire les coûts de l’entreprise",
      "Pour tester leurs compétences"
    ],
    answer: 1
  }
];


let current = 0;
let good = 0;
let bad = 0;
let timer = 1500; // 25 minutes
let userAnswersOuvertes = [];
let userAnswersQCM = [];




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

userAnswersQCM.push(userAnswer); // 🟢 on stocke la réponse

if (userAnswer === correctAnswer) {
  good++;
} else {
  bad++;
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

  const recap = document.createElement("div");
recap.className = "text-left mt-8";
recap.innerHTML = `<h3 class="text-xl font-semibold mb-4">📋 Correction détaillée :</h3>`;

questions.forEach((q, i) => {
  const user = userAnswersQCM[i];
  const correct = q.answer;

  recap.innerHTML += `
    <div class="mb-2 p-3 rounded ${
      user === correct ? "bg-green-100" : "bg-red-100"
    }">
      <p class="font-semibold">${i + 1}. ${q.q}</p>
      ${
        user === correct
          ? `<p class="text-green-700">✅ Bonne réponse : ${q.options[correct]}</p>`
          : `
            <p class="text-red-700">❌ Ta réponse : ${q.options[user]}</p>
            <p class="text-green-700">✅ Bonne réponse : ${q.options[correct]}</p>
          `
      }
    </div>
  `;
});

document.getElementById("result-box").appendChild(recap);

  const score = Math.round((good / questions.length) * 20);
  document.getElementById("score").textContent = score;

  const btn = document.createElement("button");
btn.textContent = "Répondre à l'étude de cas";
btn.className = "btn btn-primary mt-4";
btn.onclick = () => {
  document.getElementById("result-box").classList.add("hidden"); // cacher le bloc
  document.getElementById("result-box").innerHTML = ""; // effacer le contenu
  showEtudeDeCas();
};
document.getElementById("result-box").appendChild(btn);

}

function showEtudeDeCas() {
  const box = document.getElementById("question-box");
  box.classList.remove("hidden");
  box.innerHTML = `
    <h2 class="text-xl font-bold mb-4">Étude de cas</h2>
    <div class="bg-blue-100 p-4 rounded mb-6">
      <p><strong>Situation :</strong><br>
      Dans un projet de refonte d’interface, les utilisateurs finaux n’ont pas été consultés. À la livraison, ils trouvent l’outil peu adapté à leurs usages quotidiens.</p>
    </div>
  `;

  etudeDeCas.forEach((item, i) => {
    const label = document.createElement("label");
    label.innerHTML = `<p class="font-semibold">${item.q}</p><textarea rows="4" style="width: 100%; margin-bottom: 20px;" class="textarea textarea-bordered w-full"></textarea>`;
    box.appendChild(label);
  });

  const btn = document.createElement("button");
  btn.textContent = "Afficher la correction";
  btn.className = "btn btn-success mt-4";
  btn.onclick = showCorrectionEtudeCas;
  box.appendChild(btn);
}

function showCorrectionEtudeCas() {
  const box = document.getElementById("question-box");
  box.innerHTML = `<h2 class="text-xl font-bold mb-4">Corrigé de l’étude de cas</h2>`;

  etudeDeCas.forEach((item, i) => {
    const div = document.createElement("div");
    div.className = "mb-4 p-4 bg-gray-100 rounded";
    div.innerHTML = `
      <p class="font-semibold">${item.q}</p>
      <p class="text-green-700 mt-2">✅ ${etudeCasCorrections[i]}</p>
    `;
    box.appendChild(div);
  });

  const btn = document.createElement("button");
  btn.textContent = "Continuer vers les questions ouvertes";
  btn.className = "btn btn-primary mt-6";
  btn.onclick = showQuestionsOuvertes;
  box.appendChild(btn);
}


function showQuestionsOuvertes() {
  const box = document.getElementById("question-box");
  box.innerHTML = `<h2 class="text-xl font-bold mb-4">Questions Ouvertes</h2>`;

  questionsOuvertes.forEach((question, index) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p><strong>Q${index + 1} :</strong> ${question}</p>
      <textarea rows="4" style="width: 100%; margin-bottom: 20px;"></textarea>
    `;
    box.appendChild(div);
  });

  // ✅ Création du bouton "Soumettre"
  const btn = document.createElement("button");
  btn.textContent = "Soumettre mes réponses";
  btn.className = "btn btn-success mt-4";
  btn.onclick = () => {
    userAnswersOuvertes = [];
    const textareas = document.querySelectorAll("textarea");
    textareas.forEach(t => userAnswersOuvertes.push(t.value.trim()));
    showCorrectionQuestionsOuvertes();
  };

  // ✅ N'OUBLIE PAS de l'ajouter au conteneur :
  box.appendChild(btn);
}

function showCorrectionQuestionsOuvertes() {
  const box = document.getElementById("question-box");
  box.innerHTML = `<h2 class="text-xl font-bold mb-4">Corrigé des questions ouvertes</h2>`;

  questionsOuvertes.forEach((q, i) => {
    const div = document.createElement("div");
    div.className = "mb-4 p-4 bg-gray-100 rounded";
    div.innerHTML = `
      <p class="font-semibold">${i + 1}. ${q}</p>
      <p class="text-blue-700"><strong>📝 Ta réponse :</strong> ${userAnswersOuvertes[i] || "(non répondu)"}</p>
      <p class="text-green-700"><strong>✅ Correction :</strong> ${correctionsOuvertes[i]}</p>
    `;
    box.appendChild(div);
  });

  // Calculer une note (facultatif)
  let note = Math.round((userAnswersOuvertes.filter(rep => rep !== "").length / questionsOuvertes.length) * 20);
  const noteEl = document.createElement("p");
  noteEl.innerHTML = `📊 <strong>Note estimée :</strong> ${note}/20`;
  noteEl.className = "text-lg text-center my-4 font-semibold text-purple-700";
  box.appendChild(noteEl);

  // Bouton de téléchargement
  const downloadBtn = document.createElement("button");
  downloadBtn.textContent = "📄 Télécharger ma copie corrigée (PDF)";
  downloadBtn.className = "btn btn-accent mt-4 mr-2";
  downloadBtn.onclick = () => {
    html2pdf().from(box).save("copie_corrigee.pdf");
  };
  box.appendChild(downloadBtn);

  // Bouton retour
  const btn = document.createElement("button");
  btn.textContent = "Terminer";
  btn.className = "btn btn-primary mt-4 ml-2";
  btn.onclick = () => window.location.reload();
  box.appendChild(btn);
}

// TIMER
function playBeep() {
  const beep = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");
  beep.play();
}

function startTimer() {
  const timeEl = document.getElementById("time");
  const progressBar = document.getElementById("progress-bar");
  const total = timer;

  const interval = setInterval(() => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    timeEl.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    // Barre de progression
    const percent = (timer / total) * 100;
    if (progressBar) progressBar.style.width = `${percent}%`;

    // Alerte à 5 min
    if (timer === 300) {
      alert("⏰ Il ne reste plus que 5 minutes !");
      if (progressBar) {
        progressBar.classList.remove("bg-blue-600");
        progressBar.classList.add("bg-red-500");
      }
    }

    if (timer <= 0) {
      clearInterval(interval);
      playBeep();
      alert("⛔ Temps écoulé !");
      showResults();
    }

    timer--;
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
const etudeCasCorrections = [
  "Il a manqué une consultation des utilisateurs finaux durant la phase de conception.",
  "L'implication des utilisateurs permet de garantir que l'outil corresponde à leurs besoins réels.",
  "À l'avenir, il faut impliquer les utilisateurs dans les étapes de conception, test et validation."
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
const correctionsOuvertes = [
  "Pour encadrer les responsabilités, les délais, le périmètre et les obligations entre les parties.",
  "Fixer les conditions d’exécution, les objectifs, les engagements mutuels.",
  "Une clause qui suspend l’exécution du contrat à la réalisation d’un événement futur.",
  "Un contrat où le fournisseur livre un produit fini prêt à l’emploi.",
  "Pour assurer un suivi technique et corriger les éventuels dysfonctionnements.",
  "Car elle permet de valider officiellement la conformité des livrables.",
  "Une remarque officielle sur une non-conformité constatée lors de la réception.",
  "Protéger contre les risques liés à des erreurs, pertes de données ou attaques.",
  "Garantir une concurrence équitable et protéger les utilisateurs.",
  "Stimuler la qualité, faire baisser les prix, favoriser l’innovation.",
  "Les acteurs présents, leurs parts de marché, les services proposés.",
  "Orange, MTN, Moov.",
  "Téléphonie, Internet, mobile money, TV, cloud, etc.",
  "Identifier les concurrents, les opportunités, les menaces.",
  "Investissements élevés, autorisations, régulation stricte.",
  "Très élevé : équipements, infrastructure, licences.",
  "Promotions, bonus, offres groupées, partenariat local.",
  "Pour se différencier et répondre à l’évolution des besoins.",
  "Assurer une offre conforme aux règles et équitable.",
  "Offre groupée Internet + TV + Téléphonie.",
  "Environ 150 % (plus d’un téléphone par habitant).",
  "Faciliter les transactions, sécuriser les paiements.",
  "Zones rurales et enclavées principalement.",
  "Elles représentent un nouveau marché à fort potentiel.",
  "Proposer des offres adaptées à leurs revenus et besoins.",
  "Les jeunes de 15-35 ans.",
  "Elle augmente la demande pour des services rapides et accessibles.",
  "Progressivement, avec la fibre, la 4G+, le satellite."
];

