// Blue vortex/galaxy background animation
(function () {
  const canvas = document.getElementById('vortex-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, cx, cy;
  let particles = [];
  const COUNT = 260;

  function resize() {
    w = canvas.width = canvas.offsetWidth * devicePixelRatio;
    h = canvas.height = canvas.offsetHeight * devicePixelRatio;
    cx = w / 2;
    cy = h * 0.42;
  }

  function rand(min, max) { return Math.random() * (max - min) + min; }

  function makeParticle(initial) {
    const angle = rand(0, Math.PI * 2);
    const radius = initial ? rand(0, Math.max(w, h) * 0.6) : rand(0, 40);
    return {
      angle,
      radius,
      speed: rand(0.0015, 0.004) * (rand(0, 1) > 0.5 ? 1 : -1),
      drift: rand(0.4, 1.6),
      size: rand(0.6, 2.2),
      hue: rand(190, 220),
      alpha: rand(0.25, 0.9)
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: COUNT }, () => makeParticle(true));
  }

  function draw() {
    ctx.fillStyle = 'rgba(6, 10, 18, 0.22)';
    ctx.fillRect(0, 0, w, h);

    const maxR = Math.max(w, h) * 0.62;

    for (const p of particles) {
      p.angle += p.speed;
      p.radius += p.drift;
      if (p.radius > maxR) {
        p.radius = rand(0, 30);
        p.angle = rand(0, Math.PI * 2);
      }

      const x = cx + Math.cos(p.angle) * p.radius;
      const y = cy + Math.sin(p.angle) * p.radius * 0.55; // elliptical for galaxy tilt
      const dist = p.radius / maxR;
      const alpha = p.alpha * (1 - dist * 0.7);

      ctx.beginPath();
      ctx.fillStyle = `hsla(${p.hue}, 90%, ${55 + dist * 20}%, ${Math.max(alpha, 0)})`;
      ctx.arc(x, y, p.size * devicePixelRatio, 0, Math.PI * 2);
      ctx.fill();
    }

    // central glow
    const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR * 0.35);
    glow.addColorStop(0, 'rgba(70, 140, 255, 0.18)');
    glow.addColorStop(1, 'rgba(70, 140, 255, 0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, w, h);

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  init();
  requestAnimationFrame(draw);
})();
