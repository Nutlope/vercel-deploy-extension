// If tree is in the repoName, we know it's a subrepo. Then we want to edit the repoName to remove 'blob'
chrome.action.onClicked.addListener(async (tab) => {
  let vercelUrl =
    "https://vercel.com/new/git/external?repository-url=" + tab.url;

  const repoName = tab.url.split("https://github.com/")[1]; // The shape of this is: "leerob/leerob.io"
  let fixedRepoName;
  let envFile;

  // If repoName is a subrepo, we want to edit the repoName to remove 'tree'
  if (repoName.includes("tree/")) {
    let baseUrl = repoName.split("/");
    baseUrl.splice(2, 1);
    fixedRepoName = baseUrl.join("/");
    envFile = `https://raw.githubusercontent.com/${fixedRepoName}/`;
  } else {
    envFile = `https://raw.githubusercontent.com/${repoName}/main/`;
  }

  let finalEnvFile;

  let envFileNames = [
    ".env.example",
    ".env.local.example",
    ".env",
    ".local.env",
  ];

  for (let fileName of envFileNames) {
    const res = await fetch(envFile + fileName);
    if (res.status === 200) {
      finalEnvFile = envFile + fileName;
      let text = await res.text();
      let envArr = text
        .split("\n") // split the string into an array of lines
        .filter((line) => line.trim().length > 0 && !line.startsWith("#")) // filter out empty lines and comments
        .map((line) => line.split("=")[0].trim()); // split each line into name and value, take only the name, and remove leading/trailing whitespace
      const finalEnvVars = envArr.join(",");
      if (finalEnvVars.length > 0 && finalEnvVars[0] !== ",") {
        vercelUrl += `&env=${finalEnvVars}`;
      }
      chrome.tabs.update({
        url: vercelUrl,
      });
      break;
    }
  }

  if (!finalEnvFile) {
    chrome.tabs.update({
      url: vercelUrl,
    });
  }
});
