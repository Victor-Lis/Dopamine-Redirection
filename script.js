const filter = {
  url: [
    {
      urlMatches: '.*',
    },
  ],
};

const urlsToRedirect = [
  "https://www.linkedin.com/in/victor-lis-bronzo/",
  "https://github.com/Victor-Lis",
  "https://victor-lis.vercel.app",
  "https://mail.google.com/mail/u/2/#inbox",
]

const redesToBlock = [
  // "youtube",
  "shorts",
  "instagram",
  "tiktok",
  "kwai",
  "facebook",
]

const getRandomIndex = () => Math.floor(Math.random() * urlsToRedirect.length);

const redirectIfBlocked = (details) => {
  const url = details.url;
  redesToBlock.forEach((rede) => {
    if (url.includes(rede)) {
      chrome.tabs.update(details.tabId, { url: urlsToRedirect[getRandomIndex()] });
    }
  });
};

// Detecta navegação normal
chrome.webNavigation.onCompleted.addListener(redirectIfBlocked, filter);

// Detecta mudança de URL sem recarregar a página (exemplo: YouTube Shorts)
chrome.webNavigation.onHistoryStateUpdated.addListener(redirectIfBlocked, filter);