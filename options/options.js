const blockListEl = document.getElementById("blockList");
const blockForm = document.getElementById("blockForm");
const siteInput = document.getElementById("siteInput");

function renderList(sites) {
  blockListEl.innerHTML = "";
  sites.forEach((site, idx) => {
    const li = document.createElement("li");
    li.textContent = site;
    const btn = document.createElement("button");
    btn.textContent = "✕";
    btn.onclick = () => removeSite(idx);
    li.appendChild(btn);
    blockListEl.appendChild(li);
  });
}

function loadSites() {
  chrome.storage.sync.get({ blockedSites: [] }, (data) => {
    renderList(data.blockedSites);
  });
}

function addSite(site) {
  chrome.storage.sync.get({ blockedSites: [] }, (data) => {
    const sites = data.blockedSites;
    if (site && !sites.includes(site)) {
      sites.push(site);
      chrome.storage.sync.set({ blockedSites: sites }, loadSites);
    }
  });
}

function removeSite(idx) {
  chrome.storage.sync.get({ blockedSites: [] }, (data) => {
    const sites = data.blockedSites;
    sites.splice(idx, 1);
    chrome.storage.sync.set({ blockedSites: sites }, loadSites);
  });
}

blockForm.onsubmit = (e) => {
  e.preventDefault();
  const site = siteInput.value.trim();
  if (site) {
    addSite(site);
    siteInput.value = "";
  }
};

loadSites();
