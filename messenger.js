(function () {
  const MESSENGER_USERNAME = 'WOODOMA';
  const BASE = 'https://m.me/' + MESSENGER_USERNAME;

  const PRESETS = {
    default:   'Szia!',
    otlet:     'Szia! Van egy elképzelésem, amit szeretnék megmutatni.',
    kepkuldes: 'Szia! Küldenék pár képet és kíváncsi vagyok, mit lehetne kihozni belőle.',
    regibutor: 'Szia! Van egy régi bútorom, és kíváncsi vagyok, lehet-e kezdeni vele valamit.',
    helyiseg:  'Szia! Küldenék pár képet egy helyiségről, amin gondolkodom.',
    nemtudom:  'Szia! Még nem tudom pontosan, mire lenne szükségünk, de szeretném átgondolni.',
    konyha:    'Szia! Konyhában gondolkodom — megmutatnám a teret, kíváncsi vagyok, mi férne el.',
    menthetoe: 'Szia! Van valami, amit nem szívesen dobnék ki — kíváncsi vagyok, menthető-e.',
    nemmukodik:'Szia! Van valami nálunk, ami nem működik most jól — megmutatnám.',
    jatekok:   'Szia! A gyerekjátékok érdekelnek, körülnéznék közelebbről.',
    targyak:   'Szia! A kisebb fa tárgyak érdekelnek, körülnéznék.',
    hasonlot:  'Szia! Láttam egy munkádat, és kíváncsi vagyok, csinálnál-e hozzá hasonlót.'
  };

  function buildUrl(key) {
    const text = PRESETS[key] || PRESETS.default;
    return BASE + '?text=' + encodeURIComponent(text);
  }

  function bind() {
    document.querySelectorAll('[data-msg]').forEach(el => {
      const key = el.getAttribute('data-msg') || 'default';
      const url = buildUrl(key);
      if (el.tagName === 'A') {
        el.setAttribute('href', url);
        el.setAttribute('target', '_blank');
        el.setAttribute('rel', 'noopener');
      } else {
        el.addEventListener('click', () => window.open(url, '_blank', 'noopener'));
        el.style.cursor = 'pointer';
      }
    });
  }

  window.Messenger = { url: buildUrl, presets: PRESETS, username: MESSENGER_USERNAME };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind);
  } else {
    bind();
  }

  // Floating bubble
  function injectBubble() {
    if (document.querySelector('.msg-bubble')) return;
    const a = document.createElement('a');
    a.className = 'msg-bubble';
    a.setAttribute('href', buildUrl('otlet'));
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener');
    a.setAttribute('aria-label', 'Beszélgetés Messengeren');
    a.innerHTML = '<span class="msg-bubble-icon" aria-hidden="true">' +
      '<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12 2C6.5 2 2 6.1 2 11.2c0 2.9 1.5 5.5 3.8 7.2v3.4l3.5-1.9c.9.2 1.8.4 2.7.4 5.5 0 10-4.1 10-9.1C22 6.1 17.5 2 12 2zm1 12.3l-2.6-2.7-5 2.7L11 8l2.6 2.7 5-2.7-5.6 6.3z"/></svg>' +
      '</span><span class="msg-bubble-text">Van egy ötleted? Készítsük el!</span>';
    document.body.appendChild(a);
    setupBubbleLanding(a);
  }

  // Land the floating bubble in the cta-landing zone when scrolled near page bottom
  function setupBubbleLanding(bubble) {
    const landing = document.getElementById('ctaLanding');
    if (!landing) return;
    function update() {
      const rect = landing.getBoundingClientRect();
      // Land when the landing zone is at least partially in lower half of viewport
      const shouldLand = rect.top < window.innerHeight * 0.75 && rect.bottom > 0;
      bubble.classList.toggle('landed', shouldLand);
    }
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectBubble);
  } else {
    injectBubble();
  }
})();
