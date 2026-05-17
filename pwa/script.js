const menu = document.getElementById("menu");
const titleEl = document.getElementById("title");
const categoryEl = document.getElementById("category");
const imageEl = document.getElementById("image");
const textEl = document.getElementById("text");
const factEl = document.getElementById("fact");
const audioEl = document.getElementById("audio");
const videoEl = document.getElementById("video");

const STORAGE_KEY = "instrumentExplorerCustomTopics";

let topics = [];
let defaultTopics = [];
let customTopics = loadCustomTopics();

fetch("topics.json")
  .then(response => response.json())
  .then(data => {
    defaultTopics = data.topics || [];
    topics = [...defaultTopics, ...customTopics];
    renderMenu(topics);

    if (topics.length > 0) {
      showTopic(topics[0]);
    }
  })
  .catch(error => {
    console.error("Error loading JSON:", error);
    titleEl.textContent = "Failed to load topics.";
  });

function renderMenu(items) {
  menu.innerHTML = "";

  items.forEach(topic => {
    const button = document.createElement("button");
    button.className = "topic-button";
    button.type = "button";
    button.textContent = topic.title;
    button.dataset.topicId = topic.id;

    button.addEventListener("click", () => {
      showTopic(topic);
    });

    menu.appendChild(button);
  });
}

function showTopic(topic) {
  document.querySelectorAll(".topic-button").forEach(button => {
    button.classList.toggle("active", button.dataset.topicId === String(topic.id));
  });

  titleEl.textContent = topic.title;
  categoryEl.textContent = `Category: ${topic.category}`;
  textEl.textContent = topic.text;
  factEl.textContent = `Fun Fact: ${topic.fact}`;

  if (topic.image) {
    imageEl.src = topic.image;
    imageEl.alt = topic.title;
    imageEl.style.display = "block";
  } else {
    imageEl.style.display = "none";
  }

  if (topic.audio) {
    audioEl.src = topic.audio;
    audioEl.style.display = "block";
    audioEl.load();
  } else {
    audioEl.removeAttribute("src");
    audioEl.style.display = "none";
  }

  if (topic.video) {
    videoEl.src = topic.video;
    videoEl.style.display = "block";
    videoEl.load();
  } else {
    videoEl.removeAttribute("src");
    videoEl.style.display = "none";
  }
}

function loadCustomTopics() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (error) {
    console.error("Error loading custom topics:", error);
    return [];
  }
}

 let deferredPrompt;
    const installBtn = document.getElementById("installBtn");
    window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault();
        deferredPrompt = e;
        installBtn.style.display = "inline-block";
        });
    installBtn.addEventListener("click", async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;
        console.log("User choice:", choiceResult.outcome);

        deferredPrompt = null;
        installBtn.style.display = "none";
    });


  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js")
        .then((registration) => {
          console.log("Service Worker registered:", registration);
        })
        .catch((error) => {
          console.log("Service Worker registration failed:", error);
        });
    });
  }
