/* Optional image viewer. All original page content remains usable without JS. */
(() => {
  const images = document.querySelectorAll('.project-gallery > img');
  if (!images.length || typeof HTMLDialogElement === 'undefined') return;

  const viewer = document.createElement('dialog');
  viewer.className = 'image-viewer';
  viewer.setAttribute('aria-label', 'Project image');
  const close = document.createElement('button');
  close.type = 'button';
  close.textContent = '×';
  close.setAttribute('aria-label', 'Close image');
  const fullImage = document.createElement('img');
  viewer.append(close, fullImage);
  document.body.append(viewer);

  let trigger;
  function show(image) {
    trigger = image;
    fullImage.src = image.src;
    fullImage.alt = image.alt;
    viewer.showModal();
  }
  images.forEach(image => {
    image.tabIndex = 0;
    image.setAttribute('role', 'button');
    image.setAttribute('aria-haspopup', 'dialog');
    image.setAttribute('aria-label', `Enlarge image: ${image.alt}`);
    image.addEventListener('click', () => show(image));
    image.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        show(image);
      }
    });
  });
  close.addEventListener('click', () => viewer.close());
  viewer.addEventListener('click', event => {
    if (event.target === viewer) {
      const box = viewer.getBoundingClientRect();
      if (event.clientX < box.left || event.clientX > box.right ||
          event.clientY < box.top || event.clientY > box.bottom) viewer.close();
    }
  });
  viewer.addEventListener('close', () => {
    fullImage.removeAttribute('src');
    trigger?.focus();
  });
})();
