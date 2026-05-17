const STORAGE_KEY = "instrumentExplorerCustomTopics";

const topicDialog = document.getElementById("topicDialog");
const openTopicModalBtn = document.getElementById("openTopicModal");
const closeTopicModalBtn = document.getElementById("closeTopicModal");
const cancelTopicModalBtn = document.getElementById("cancelTopicModal");
const topicForm = document.getElementById("topicForm");
const clearCustomTopicsBtn = document.getElementById("clearCustomTopics");
const formMessage = document.getElementById("formMessage");
const customTopicList = document.getElementById("customTopicList");
const dialogTitle = document.getElementById("dialogTitle");
const saveTopicButton = document.getElementById("saveTopicButton");
const deleteDialog = document.getElementById("deleteDialog");
const deleteDialogText = document.getElementById("deleteDialogText");
const confirmDeleteTopicBtn = document.getElementById("confirmDeleteTopic");
const cancelDeleteTopicBtn = document.getElementById("cancelDeleteTopic");

let customTopics = loadCustomTopics();
let editingTopicId = "";
let deletingTopicId = "";

renderCustomTopics();

openTopicModalBtn.addEventListener("click", () => {
  openTopicDialog();
});

closeTopicModalBtn.addEventListener("click", closeTopicDialog);
cancelTopicModalBtn.addEventListener("click", closeTopicDialog);

topicDialog.addEventListener("click", event => {
  if (event.target === topicDialog) {
    closeTopicDialog();
  }
});

deleteDialog.addEventListener("click", event => {
  if (event.target === deleteDialog) {
    closeDeleteDialog();
  }
});

cancelDeleteTopicBtn.addEventListener("click", closeDeleteDialog);

confirmDeleteTopicBtn.addEventListener("click", () => {
  customTopics = customTopics.filter(item => item.id !== deletingTopicId);
  saveCustomTopics();
  renderCustomTopics();
  closeDeleteDialog();
  formMessage.textContent = "Topic deleted.";
});

topicForm.addEventListener("submit", async event => {
  event.preventDefault();
  formMessage.textContent = "Saving topic...";

  const imageFile = document.getElementById("customImage").files[0];
  const mediaFile = document.getElementById("customMedia").files[0];

  try {
    const image = await readFileAsDataUrl(imageFile);
    const media = await readFileAsDataUrl(mediaFile);
    const isVideo = mediaFile && mediaFile.type.startsWith("video/");
    const existingTopic = customTopics.find(topic => topic.id === editingTopicId);
    const topic = {
      id: existingTopic ? existingTopic.id : `custom-${Date.now()}`,
      title: document.getElementById("customTitle").value.trim(),
      category: document.getElementById("customCategory").value.trim(),
      text: document.getElementById("customText").value.trim(),
      image: image || existingTopic?.image || "",
      audio: media ? (isVideo ? "" : media) : existingTopic?.audio || "",
      video: media ? (isVideo ? media : "") : existingTopic?.video || "",
      fact: document.getElementById("customFact").value.trim(),
      custom: true
    };

    if (existingTopic) {
      customTopics = customTopics.map(item => item.id === topic.id ? topic : item);
    } else {
      customTopics.push(topic);
    }

    saveCustomTopics();
    renderCustomTopics();
    closeTopicDialog();
    formMessage.textContent = existingTopic ? "Topic updated." : "Topic added to your custom learning set.";
  } catch (error) {
    console.error("Error saving custom topic:", error);
    formMessage.textContent = "The topic could not be saved. Try a smaller media file.";
  }
});

clearCustomTopicsBtn.addEventListener("click", () => {
  if (customTopics.length === 0) {
    formMessage.textContent = "There are no custom topics to delete.";
    return;
  }

  if (!window.confirm("Delete all custom topics from local storage?")) {
    return;
  }

  customTopics = [];
  saveCustomTopics();
  renderCustomTopics();
  formMessage.textContent = "Custom topics cleared from local storage.";
});

function openTopicDialog(topic) {
  editingTopicId = topic ? topic.id : "";
  dialogTitle.textContent = topic ? "Edit Topic" : "Add Topic";
  saveTopicButton.textContent = topic ? "Update Topic" : "Save Topic";

  document.getElementById("customTitle").value = topic?.title || "";
  document.getElementById("customCategory").value = topic?.category || "";
  document.getElementById("customText").value = topic?.text || "";
  document.getElementById("customFact").value = topic?.fact || "";
  document.getElementById("customImage").value = "";
  document.getElementById("customMedia").value = "";

  topicDialog.showModal();
  document.getElementById("customTitle").focus();
}

function closeTopicDialog() {
  topicForm.reset();
  editingTopicId = "";
  topicDialog.close();
}

function openDeleteDialog(topic) {
  deletingTopicId = topic.id;
  deleteDialogText.textContent = `This will delete "${topic.title}" from your custom learning set.`;
  deleteDialog.showModal();
}

function closeDeleteDialog() {
  deletingTopicId = "";
  deleteDialog.close();
}

function loadCustomTopics() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (error) {
    console.error("Error loading custom topics:", error);
    return [];
  }
}

function saveCustomTopics() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(customTopics));
}

function renderCustomTopics() {
  customTopicList.innerHTML = "";

  if (customTopics.length === 0) {
    const emptyState = document.createElement("p");
    emptyState.className = "empty-state";
    emptyState.textContent = "No custom topics yet.";
    customTopicList.appendChild(emptyState);
    return;
  }

  customTopics.forEach(topic => {
    const card = document.createElement("article");
    card.className = "custom-topic-card";

    const title = document.createElement("h2");
    title.textContent = topic.title;

    const category = document.createElement("p");
    category.className = "category-pill";
    category.textContent = topic.category;

    const text = document.createElement("p");
    text.className = "docs-text";
    text.textContent = topic.text;

    const actions = document.createElement("div");
    actions.className = "form-actions topic-card-actions";

    const editButton = document.createElement("button");
    editButton.className = "secondary-button";
    editButton.type = "button";
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => openTopicDialog(topic));

    const deleteButton = document.createElement("button");
    deleteButton.className = "danger-button";
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => openDeleteDialog(topic));

    actions.append(editButton, deleteButton);
    card.append(title, category, text, actions);
    customTopicList.appendChild(card);
  });
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve("");
      return;
    }

    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result));
    reader.addEventListener("error", () => reject(reader.error));
    reader.readAsDataURL(file);
  });
}
