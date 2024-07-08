const wrapperUrl = document.currentScript?.getAttribute('src') ?? import.meta.url;
(() => {
  let innerScriptUrl;
  if (wrapperUrl) {
    console.log(wrapperUrl);
    innerScriptUrl = wrapperUrl.replace('chai-form.v1', 'chai-form-inner.v1');
  } else {
    innerScriptUrl = 'https://cdn.app.comehome.ai/chai-form-inner.v1.js';
  }
  const newScript = document.createElement('script');
  newScript.src = innerScriptUrl;
  newScript.type = 'module';
  newScript.async = true;

  newScript.src += `?v=${Date.now()}`;
  const firstScriptInDocument = document.getElementsByTagName('script')[0];
  firstScriptInDocument.parentNode?.insertBefore(newScript, firstScriptInDocument);
})();
