// Applies a stored colour theme before first paint. Without a stored choice
// the page follows prefers-color-scheme.
(function () {
  var d = document.documentElement;
  d.classList.add('js');
  try {
    var t = localStorage.getItem('theme');
    if (t === 'light' || t === 'dark') d.setAttribute('data-theme', t);
  } catch (e) {
    /* storage unavailable: follow the system setting */
  }
})();
