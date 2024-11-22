
// Wait for the element to appear in the DOM
export function waitForElement<T>(selector: () => T | null | undefined) {
  return new Promise<T>(resolve => {
    const initialValue = selector();
    if (initialValue) {
      return resolve(initialValue);
    }

    const observer = new MutationObserver(_ => {
      const observedValue = selector();
      if (observedValue) {
        observer.disconnect();
        resolve(observedValue);
      }
    });

    // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
}
