// * chrome      - the global namespace for Chrome's extension APIs
// * action      – the namespace of the specific API we want to use
// * onClicked   - the event we want to subscribe to
// * addListener - what we want to do with this event

chrome.action.onClicked.addListener((tab) => {
  let vercelUrl =
    "https://vercel.com/new/git/external?repository-url=" + tab.url;
  let repoName = tab.url.substr(19);
  let envFile = `https://raw.githubusercontent.com/${repoName}/main/.env.example`;

  fetch(envFile)
    .then((res) => res.text())
    // if the .env file exists, open Vercel deploy with required env variables
    .then((text) => {
      let replaced = text.replace(/\s/g, "");
      let newReplaced = replaced.replace(/=/g, ",");
      vercelUrl += `&env=${newReplaced}`;
      chrome.tabs.update({
        url: vercelUrl,
      });
    })
    // if the .example.env file doesn't exist, open Vercel deploy with no env variables
    .catch((err) => {
      chrome.tabs.update({
        url: vercelUrl,
      });
    });
});
