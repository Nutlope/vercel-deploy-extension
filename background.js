// * chrome      - the global namespace for Chrome's extension APIs
// * action      – the namespace of the specific API we want to use
// * onClicked   - the event we want to subscribe to
// * addListener - what we want to do with thsis event

const githubUrl = 'https://github.com/'

const is_github_repo = (url) => {
  return (
    url.includes(githubUrl) && url.replace(githubUrl, '').split('/').length >= 2
  )
}

const dynamically_change_icon = (tab) => {
  if (tab.url == undefined) {
    return
  }

  if (is_github_repo(tab.url)) {
    console.log(chrome.action)

    chrome.action.setPopup({ popup: '' })
    chrome.action.setIcon({ path: { 38: 'icons/vercel-enabled.png' } })
  } else {
    chrome.action.setPopup({ popup: 'popups/invalid_url.html' })
    chrome.action.setIcon({ path: { 38: 'icons/vercel-disabled.png' } })
  }
}

// Trigger dynamic icon change on tab activation
chrome.tabs.onActivated.addListener((info) => {
  chrome.tabs.get(info.tabId, dynamically_change_icon)
})

// Trigger dynamic icon change on URL update
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  dynamically_change_icon(tab)
})

// If tree is in the repoName, we know it's a subrepo. Then we want to edit the repoName to remove 'blob'
chrome.action.onClicked.addListener((tab) => {
  let repoUrl = tab.url

  if (!is_github_repo(repoUrl)) {
    return
  }

  let repoName = repoUrl.replace(githubUrl, '')

  // If repoUrl is a subrepo, we want to edit the repoUrl & repoUrl to remove the nested paths from the URL
  let is_subrepo = repoUrl.replace(githubUrl, '').split('/')[2] == 'tree'
  if (is_subrepo) {
    repoName = repoUrl.replace(githubUrl, '').split('/').slice(0, 2).join('/')
    repoUrl = githubUrl + repoName
  }

  let vercelUrl =
    'https://vercel.com/new/git/external?repository-url=' + repoUrl

  // Grab .env.example filepath from repo
  let envFile = `https://raw.githubusercontent.com/${repoName}/main/.env.example`

  fetch(envFile)
    .then((res) => res.text())
    // if the .env file exists, open Vercel deploy with required env variables
    .then((text) => {
      let arr = text.replace(/\s/g, '*').split('*') // delete all whitespace
      let newReplaced = '' // get finalized string
      for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].substr(0, arr[i].indexOf('='))
        newReplaced += arr[i] + ','
      }
      const finalEnvVars = newReplaced.slice(0, -1)
      if (finalEnvVars.length > 0 && finalEnvVars[0] !== ',') {
        vercelUrl += `&env=${finalEnvVars}`
      }

      chrome.tabs.update({
        url: vercelUrl,
      })
    })
    // if the .example.env file doesn't exist, open Vercel deploy with no env variables
    .catch((err) => {
      chrome.tabs.update({
        url: vercelUrl,
      })
    })
})
