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

const getRandomIndex = () => Math.floor(Math.random()*(urlsToRedirect.length))
chrome.webNavigation.onCompleted.addListener((details) => {
  const url = details.url
  redesToBlock.map((rede) => {
    if(url.includes(rede)) chrome.tabs.update(details.tabId, { url: urlsToRedirect[getRandomIndex()] });
  })
}, filter);