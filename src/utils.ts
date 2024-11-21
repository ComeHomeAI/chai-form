
// Wait for the element to appear in the DOM
function waitForElement(selector: () => any) {
  return new Promise(resolve => {
    if (selector()) {
      return resolve(selector());
    }

    const observer = new MutationObserver(_ => {
      if (selector()) {
        observer.disconnect();
        resolve(selector());
      }
    });

    // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
}
