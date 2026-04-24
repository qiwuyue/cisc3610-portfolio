const menu = document.getElementById("menu");
const titleEl = document.getElementById("title");
const categoryEl = document.getElementById("category");
const imageEl = document.getElementById("image");
const textEl = document.getElementById("text");
const factEl = document.getElementById("fact");
const audioEl = document.getElementById("audio");

let topics = [];

fetch("topics.json")
  .then(response => response.json())
  .then(data => {
    topics = data;
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
    button.className = "list-group-item list-group-item-action";
    button.textContent = topic.title;

    button.addEventListener("click", () => {
      showTopic(topic);
    });

    menu.appendChild(button);
  });
}

function showTopic(topic) {
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
  } else {
    audioEl.style.display = "none";
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