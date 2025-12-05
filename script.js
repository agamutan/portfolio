(function(){
  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const navToggle = document.getElementById('nav-toggle');
  const siteNav = document.getElementById('site-nav');
  const copyEmailBtn = document.getElementById('copy-email');
  const form = document.getElementById('contact-form');
  const formMessage = document.getElementById('form-message');
  const yearEl = document.getElementById('year');

  if(yearEl) yearEl.textContent = new Date().getFullYear();

  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  if(saved === 'dark' || (!saved && prefersDark)) document.documentElement.classList.add('dark');

  themeToggle && themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  navToggle && navToggle.addEventListener('click', () => {
    if(!siteNav) return;
    const visible = siteNav.style.display === 'block';
    siteNav.style.display = visible ? '' : 'block';
  });

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if(!a) return;
    const id = a.getAttribute('href');
    if(id === '#') return;
    const target = document.querySelector(id);
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth', block:'start'});
        
      if(window.innerWidth < 920 && siteNav) siteNav.style.display = '';
    }
  });

  const reveals = Array.from(document.querySelectorAll('.reveal'));
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting) e.target.classList.add('visible');
    });
  }, {threshold: 0.12});
  reveals.forEach(r => obs.observe(r));

  copyEmailBtn && copyEmailBtn.addEventListener('click', () => {
    const email = 'agamutan@mcm.edu.ph';
    navigator.clipboard?.writeText(email).then(() => {
      formMessage.textContent = 'Email copied to clipboard!';
      setTimeout(()=> formMessage.textContent = '', 2500);
    }).catch(() => {
      formMessage.textContent = 'Could not copy email. Please copy manually.';
    });
  });

  form && form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const name = fd.get('name')?.toString().trim();
    const email = fd.get('email')?.toString().trim();
    const message = fd.get('message')?.toString().trim();
    if(!name || !email || !message){
      formMessage.textContent = 'Please fill out all fields.';
      return;
    }

    formMessage.textContent = 'Thanks — message received (demo only).';
    form.reset();
    setTimeout(()=> formMessage.textContent = '', 3500);
  });

})();
