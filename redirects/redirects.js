const redirectListEl = document.getElementById("blockList");
const redirectForm = document.getElementById("blockForm");
const urlInput = document.getElementById("siteInput");

const defaultRedirects = [];

function renderList(urls) {
  redirectListEl.innerHTML = "";
  urls.forEach((url, idx) => {
    const li = document.createElement("li");
    li.textContent = url;
    const btn = document.createElement("button");
    btn.textContent = "✕";
    btn.onclick = () => removeUrl(idx);
    li.appendChild(btn);
    redirectListEl.appendChild(li);
  });
}

function loadUrls() {
  chrome.storage.sync.get({ redirectUrls: [] }, (data) => {
    renderList(data.redirectUrls);
  });
}

function addUrl(url) {
  chrome.storage.sync.get({ redirectUrls: [] }, (data) => {
    const urls = data.redirectUrls;
    if (url && !urls.includes(url)) {
      urls.push(url);
      chrome.storage.sync.set({ redirectUrls: urls }, loadUrls);
    }
  });
}

function removeUrl(idx) {
  chrome.storage.sync.get({ redirectUrls: [] }, (data) => {
    const urls = data.redirectUrls;
    urls.splice(idx, 1);
    chrome.storage.sync.set({ redirectUrls: urls }, loadUrls);
  });
}

redirectForm.onsubmit = (e) => {
  e.preventDefault();
  const url = urlInput.value.trim();
  if (url) {
    addUrl(url);
    urlInput.value = "";
  }
};

loadUrls();