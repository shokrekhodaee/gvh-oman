// Shared language controller; request-form callbacks are optional.
function setLang(language) {
  const lang = language === 'en' ? 'en' : 'fa';
  const root = document.documentElement;
  root.dataset.lang = root.lang = lang;
  root.dir = lang === 'fa' ? 'rtl' : 'ltr';
  for (const code of ['fa', 'en']) {
    const button = document.getElementById(code + 'Btn');
    button.classList.toggle('active', code === lang);
    button.setAttribute('aria-pressed', String(code === lang));
  }
  try { localStorage.setItem('gvhLang', lang); } catch {}
  document.querySelectorAll('[data-fa]').forEach(element => {
    if (element.matches('input,textarea')) element.placeholder = element.dataset[lang];
    else element.textContent = element.dataset[lang];
  });
  document.querySelector('nav')?.setAttribute('aria-label', lang === 'fa' ? 'ناوبری اصلی' : 'Main navigation');
  window.updateContact?.();
  window.clearValidation?.();
  window.renderStatus?.();
}

document.querySelectorAll('[data-language]').forEach(button => {
  button.addEventListener('click', () => setLang(button.dataset.language));
});
let saved = 'fa';
try { saved = localStorage.getItem('gvhLang') || 'fa'; } catch {}
setLang(saved);

