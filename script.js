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

const getRandomIndex = () => Math.floor(Math.random()*(urlsToRedirect.length))

chrome.webNavigation.onCompleted.addListener((details) => {
  const url = details.url
  if(url.includes("youtube") || url.includes("instagram") || url.includes("tiktok") || url.includes("facebook")) chrome.tabs.update(details.tabId, { url: urlsToRedirect[getRandomIndex()] });
}, filter);