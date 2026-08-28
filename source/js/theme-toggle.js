// 导航栏 light/dark/auto 三态切换（与 Butterfly 的 localStorage['theme'] JSON 格式兼容）
(function () {
  const KEY = 'theme';
  const ORDER = ['light', 'dark', 'auto'];
  const ICONS = { light: '☀️', dark: '🌙', auto: '⛅' };
  const root = document.documentElement;

  function save(key, value) {
    try { localStorage.setItem(key, JSON.stringify({ value })); } catch (e) {}
  }
  function read(key) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return undefined;
      const data = JSON.parse(raw);
      return data && data.value;
    } catch (e) { return undefined; }
  }
  function systemDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  function effective(mode) {
    return mode === 'auto' ? (systemDark() ? 'dark' : 'light') : mode;
  }
  function apply(mode) {
    root.setAttribute('data-theme', effective(mode));
    root.setAttribute('data-theme-mode', mode);
    save(KEY, mode);
    const btn = document.getElementById('theme-toggle-btn');
    if (btn) btn.textContent = ICONS[mode] || '⛅';
  }
  function cycle() {
    const cur = root.getAttribute('data-theme-mode') || 'light';
    const next = ORDER[(ORDER.indexOf(cur) + 1) % ORDER.length];
    apply(next);
  }
  function injectButton() {
    const menus = document.getElementById('menus');
    if (!menus || document.getElementById('theme-toggle-btn')) return;
    const btn = document.createElement('a');
    btn.id = 'theme-toggle-btn';
    btn.className = 'site-page';
    btn.title = '切换主题';
    btn.style.cursor = 'pointer';
    btn.style.marginLeft = '8px';
    btn.addEventListener('click', cycle);
    btn.textContent = ICONS[root.getAttribute('data-theme-mode') || 'auto'] || '⛅';
    const toggle = document.getElementById('toggle-menu');
    if (toggle) menus.insertBefore(btn, toggle); else menus.appendChild(btn);
  }
  function init() {
    const saved = read(KEY);
    apply(saved === 'auto' || saved === 'light' || saved === 'dark' ? saved : 'auto');
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
        if (root.getAttribute('data-theme-mode') === 'auto') apply('auto');
      });
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    init();
    injectButton();
  });
  document.addEventListener('pjax:complete', function () {
    injectButton();
  });
})();
