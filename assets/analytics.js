(() => {
  const measurementId = document.currentScript?.dataset.measurementId;
  const productionPath = '/huyportfolio/';

  if (!measurementId || location.hostname !== 'quochuy2911.github.io'
      || !location.pathname.startsWith(productionPath)) return;

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }

  gtag('js', new Date());
  gtag('config', measurementId);

  const tag = document.createElement('script');
  tag.async = true;
  tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
  document.head.append(tag);
})();
