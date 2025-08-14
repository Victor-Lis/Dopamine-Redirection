const defaultBlockedSites = [
  "https://www.youtube.com/",
  "https://www.facebook.com/",
  "https://www.instagram.com/",
  "https://www.tiktok.com/",
  "https://www.kwai.com/",
  "https://www.twitter.com/",
  "https://www.reddit.com/",
  "https://www.pinterest.com/",
  "https://www.snapchat.com/",
  "https://www.linkedin.com/"
];

const defaultRedirects = [
  "https://www.linkedin.com/in/victor-lis-bronzo/",
  "https://github.com/Victor-Lis",
  "https://victor-lis.vercel.app",
  "https://mail.google.com/mail/u/2/#inbox",
];

function getRandomUrl(urls) {
  const randomIndex = Math.floor(Math.random() * urls.length);
  return urls[randomIndex];
}

function redirectIfBlocked(details) {
  chrome.storage.sync.get(
    {
      blockedSites: defaultBlockedSites,
      redirectUrls: defaultRedirects,
    },
    (data) => {
      const url = details.url;
      const isBlocked = data.blockedSites.some((site) => url.includes(site));

      if (isBlocked) {
        const redirectUrl = getRandomUrl(data.redirectUrls);
        if (redirectUrl) {
          chrome.tabs.update(details.tabId, { url: redirectUrl });
        }
      }
    }
  );
}

const filter = { url: [{ urlMatches: ".*" }] };

chrome.webNavigation.onCompleted.addListener(redirectIfBlocked, filter);
chrome.webNavigation.onHistoryStateUpdated.addListener(redirectIfBlocked, filter);