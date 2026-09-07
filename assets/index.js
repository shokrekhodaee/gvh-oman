const toggle=document.querySelector('.menu-toggle'),menu=document.querySelector('.menu'),nav=document.querySelector('.nav');
function setNavHeight(){if(!menu.classList.contains('open'))document.documentElement.style.setProperty('--nav-height',nav.offsetHeight+'px')}
function closeMenu(){menu.classList.remove('open');toggle.setAttribute('aria-expanded','false');setNavHeight()}
function goToSection(hash){const target=document.getElementById(hash.slice(1));if(!target)return;closeMenu();requestAnimationFrame(()=>requestAnimationFrame(()=>{const offset=nav.offsetHeight+16;const anchor=target.querySelector('.eyebrow')||target;const top=anchor.getBoundingClientRect().top+window.scrollY-offset;window.scrollTo({top:Math.max(0,top),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});if(location.hash!==hash)history.pushState(null,'',hash);target.setAttribute('tabindex','-1');target.focus({preventScroll:true})}))}
toggle.addEventListener('click',()=>{const open=menu.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));if(!open)setNavHeight()});
menu.querySelectorAll('a,button').forEach(item=>item.addEventListener('click',e=>{const href=item.getAttribute('href');if(href&&href.startsWith('#')){e.preventDefault();goToSection(href)}else closeMenu()}));
document.querySelectorAll('a.brand[href^="#"],.skip-link[href^="#"]').forEach(link=>link.addEventListener('click',e=>{e.preventDefault();goToSection(link.getAttribute('href'))}));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.classList.contains('open')){closeMenu();toggle.focus()}});
document.addEventListener('click',e=>{if(!e.target.closest('.nav'))closeMenu()});
new ResizeObserver(setNavHeight).observe(nav);setNavHeight();

