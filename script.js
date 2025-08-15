(function(){
  var root = document.documentElement;
  var themeToggle = document.getElementById('theme-toggle');
  var navToggle = document.querySelector('.nav-toggle');
  var navList = document.getElementById('nav-list');
  var yearEl = document.getElementById('year');

  function setTheme(theme){
    if(theme === 'light'){
      root.setAttribute('data-theme', 'light');
    }else{
      root.removeAttribute('data-theme');
    }
    localStorage.setItem('theme', theme);
    if(themeToggle){ themeToggle.querySelector('.icon').textContent = theme === 'light' ? '☀️' : '🌙'; }
  }

  var saved = localStorage.getItem('theme');
  if(saved){
    setTheme(saved);
  }else{
    var prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    setTheme(prefersLight ? 'light' : 'dark');
  }

  if(themeToggle){
    themeToggle.addEventListener('click', function(){
      var isLight = root.getAttribute('data-theme') === 'light';
      setTheme(isLight ? 'dark' : 'light');
    });
  }

  if(navToggle && navList){
    navToggle.addEventListener('click', function(){
      var open = navList.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
    navList.querySelectorAll('a').forEach(function(link){
      link.addEventListener('click', function(){
        navList.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function(anchor){
    anchor.addEventListener('click', function(e){
      var id = this.getAttribute('href');
      if(id.length > 1){
        var target = document.querySelector(id);
        if(target){
          e.preventDefault();
          target.scrollIntoView({behavior:'smooth', block:'start'});
          history.pushState(null, '', id);
        }
      }
    });
  });

  if(yearEl){ yearEl.textContent = new Date().getFullYear(); }
})();