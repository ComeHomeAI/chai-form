(()=> {
  const newScript = document.createElement('script');
  newScript.src = 'https://cdn.app.comehome.ai/chai-form-inner.v1.js';
  newScript.type = 'module';
  newScript.async = true;

  newScript.src += `?v=${Date.now()}`;
  const firstScriptInDocument = document.getElementsByTagName('script')[0];
  firstScriptInDocument.parentNode?.insertBefore(newScript, firstScriptInDocument);
})();
