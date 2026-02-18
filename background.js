// Create context menu on install and startup
chrome.runtime.onInstalled.addListener(createMenu);
chrome.runtime.onStartup.addListener(createMenu);

function createMenu() {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: "inspectra-review",
      title: "Review Code with InspectraAI",
      contexts: ["selection"]
    });
  });
}

// Handle right-click click
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "inspectra-review") {

    const selectedCode = info.selectionText;

    if (!selectedCode) {
      console.log("No text selected.");
      return;
    }

    chrome.storage.local.set(
      { selectedCode: selectedCode },
      () => {
        console.log("Selected code saved successfully.");
      }
    );
  }
});
