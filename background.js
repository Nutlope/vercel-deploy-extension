// * chrome      - the global namespace for Chrome's extension APIs
// * action      – the namespace of the specific API we want to use
// * onClicked   - the event we want to subscribe to
// * addListener - what we want to do with this event

chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.update({
    url: "https://vercel.com/new/git/external?repository-url=" + tab.url,
  });
});
