const screens = Array.from(document.querySelectorAll('.app-screen'));
const DEFAULT_SCREEN = document.body.dataset.defaultScreen || screens[0]?.id || 'login';

function getRequestedScreen(){
  return window.location.hash.replace('#', '') || DEFAULT_SCREEN;
}

function showScreen(){
  const requestedScreen = getRequestedScreen();
  const targetScreen = screens.find((screen) => screen.id === requestedScreen);

  if (!targetScreen) {
    if (!screens.length) return;
    window.history.replaceState(null, '', `#${DEFAULT_SCREEN}`);
    showScreen();
    return;
  }

  screens.forEach((screen) => {
    const isActive = screen === targetScreen;
    screen.classList.toggle('active', isActive);
    screen.setAttribute('aria-hidden', String(!isActive));
  });

  document.querySelectorAll('.bottom a').forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${requestedScreen}`);
  });

  document.querySelectorAll('.desktop-nav a').forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${requestedScreen}`);
  });

  window.scrollTo({top:0, behavior:'auto'});
}

if (!window.location.hash) {
  window.history.replaceState(null, '', `#${DEFAULT_SCREEN}`);
}

showScreen();
window.addEventListener('hashchange', showScreen);
