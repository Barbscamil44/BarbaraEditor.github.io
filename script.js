function cardHTML(v, isShort) {
  return `
    <div class="card ${isShort ? 'card-short' : ''}" data-id="${v.id}">
      <div class="card-thumb">
        <img src="https://img.youtube.com/vi/${v.id}/hqdefault.jpg" alt="${v.title}" loading="lazy">
        <div class="play-btn">▶</div>
      </div>
      <div class="card-info">
        <span class="card-title">${v.title}</span>
        <span class="card-year">${v.year}</span>
      </div>
    </div>`;
}

function render() {
  document.getElementById('grid-long').innerHTML = LONG_VIDEOS.map(v => cardHTML(v, false)).join('');
  document.getElementById('grid-short').innerHTML = SHORT_VIDEOS.map(v => cardHTML(v, true)).join('');
}

function openModal(id, isShort) {
  const modal = document.getElementById('videoModal');
  const frame = document.getElementById('modalFrame');
  const box = document.getElementById('modalBox');
  box.classList.toggle('modal-box--short', isShort);
  frame.innerHTML = `<iframe src="https://www.youtube.com/embed/${id}?autoplay=1&rel=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('videoModal');
  document.getElementById('modalFrame').innerHTML = '';
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {
  render();

  document.getElementById('grid-long').addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (card) openModal(card.dataset.id, false);
  });
  document.getElementById('grid-short').addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (card) openModal(card.dataset.id, true);
  });

  document.getElementById('modalBackdrop').addEventListener('click', closeModal);
  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // fade-in on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('in-view');
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.card, .intro, .contact').forEach(el => observer.observe(el));
});
