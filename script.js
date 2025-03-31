const initialSongs = [
  { id: 1, title: "song 1", rating: 0 },
  { id: 2, title: "song 2", rating: 0 },
];

let songs = [...initialSongs];
let completed = false;
let currentPairIndex = 0;
let totalComparisons = 0;
const totalComparisonsNeeded = (songs.length * (songs.length - 1)) / 2;

function getNextPair() {
  const pairs = [];
  for (let i = 0; i < songs.length; i++) {
    for (let j = i + 1; j < songs.length; j++) {
      pairs.push([i, j]);
    }
  }
  return pairs.sort(() => Math.random() - 0.5);
}

const pairs = getNextPair();
let currentPair = pairs[currentPairIndex];

function loadContent() {
  document.getElementById("loading").style.display = "none";
  document.getElementById("content").style.display = "block";
  setPair(currentPair);
}

function setPair(pair) {
  const choice1 = document.getElementById("choice1");
  const choice2 = document.getElementById("choice2");
  choice1.textContent = songs[pair[0]].title;
  choice2.textContent = songs[pair[1]].title;

  choice1.onclick = () => handleChoice("first");
  choice2.onclick = () => handleChoice("second");
}

function handleChoice(choice) {
  if (choice === "first") {
    songs[currentPair[0]].rating += 1;
  } else {
    songs[currentPair[1]].rating += 1;
  }

  totalComparisons++;
  currentPairIndex++;

  updateProgressBar();

  if (totalComparisons >= totalComparisonsNeeded) {
    completed = true;
    showRanking();
    document.getElementById("choices").style.display = "none";
  } else {
    currentPair = pairs[currentPairIndex];
    setPair(currentPair);
  }
}

function updateProgressBar() {
  const percentage = (totalComparisons / totalComparisonsNeeded) * 100;

  const progressBar = document.getElementById("progress");
  progressBar.style.width = percentage + "%";
  progressBar.textContent = Math.round(percentage) + "%";
}

function showRanking() {
  const ranking = document.getElementById("ranking");
  const completedDiv = document.getElementById("completed");
  completedDiv.style.display = "block";

  songs.sort((a, b) => b.rating - a.rating);
  songs.forEach((song, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${song.title}</td>
  `;
    ranking.appendChild(tr);
  });
}

setTimeout(loadContent, 1000);
