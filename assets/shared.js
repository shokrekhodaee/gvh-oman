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

// Reveal each content group once; never hide content while waiting for an observer.
// Groups avoid nested animations and remain accessible when focused or deep-linked.
(() => {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  if (reducedMotion.matches || !('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      observer.unobserve(entry.target);
      if (reducedMotion.matches || entry.target.contains(document.activeElement)) continue;
      entry.target.classList.add('motion-enter');
      entry.target.addEventListener('animationend', () => {
        entry.target.classList.remove('motion-enter');
      }, { once: true });
    }
  }, { threshold: 0, rootMargin: '0px 0px -24px 0px' });
  document.querySelectorAll('.section > .wrap, .formbox, .info').forEach(element => observer.observe(element));
  reducedMotion.addEventListener('change', event => {
    if (!event.matches) return;
    observer.disconnect();
    document.querySelectorAll('.motion-enter').forEach(element => element.classList.remove('motion-enter'));
  });
})();

