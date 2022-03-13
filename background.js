// * chrome      - the global namespace for Chrome's extension APIs
// * action      – the namespace of the specific API we want to use
// * onClicked   - the event we want to subscribe to
// * addListener - what we want to do with thsis event

// If tree is in the repoName, we know it's a subrepo. Then we want to edit the repoName to remove 'blob'
chrome.action.onClicked.addListener((tab) => {
  let vercelUrl =
    "https://vercel.com/new/git/external?repository-url=" + tab.url;

  let repoName = tab.url.substr(19);

  // If repoName is a subrepo, we want to edit the repoName to remove 'tree'
  if (repoName.includes("tree/")) {
    repoName = repoName.substr(0, repoName.indexOf("tree/") - 1);
  }

  // Grab .env.example filepath from repo
  let envFile = `https://raw.githubusercontent.com/${repoName}/main/.env.example`;

  fetch(envFile)
    .then((res) => res.text())
    // if the .env file exists, open Vercel deploy with required env variables
    .then((text) => {
      let arr = text.replace(/\s/g, "*").split("*"); // delete all whitespace
      let newReplaced = ""; // get finalized string
      for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].substr(0, arr[i].indexOf("="));
        newReplaced += arr[i] + ",";
      }
      const finalEnvVars = newReplaced.slice(0, -1);
      vercelUrl += `&env=${finalEnvVars}`;
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
