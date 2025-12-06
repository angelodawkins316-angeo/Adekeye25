// script.js
// Lightweight JS for slider, RSVP handling, FAQ search, and simple contact form behavior.

document.addEventListener('DOMContentLoaded', function () {
  /* --- Image slider (basic) --- */
  const slides = document.querySelectorAll('.slide');
  const slidesContainer = document.querySelector('.slides');
  let idx = 0;

  function showSlide(i) {
    const len = slides.length;
    idx = (i + len) % len;
    slidesContainer.style.transform = `translateX(${ -idx * 100 }%)`;
  }

  // wrap slides into a horizontal row
  slidesContainer.style.display = 'flex';
  slidesContainer.style.width = (slides.length * 100) + '%';
  slides.forEach(s => s.style.width = (100 / slides.length) + '%');

  document.querySelectorAll('.slide-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const dir = Number(btn.dataset.dir);
      showSlide(idx + dir);
    });
  });

  // auto-play
  let autoplay = setInterval(() => showSlide(idx + 1), 5000);
  document.querySelector('#imageSlider').addEventListener('mouseenter', () => clearInterval(autoplay));
  document.querySelector('#imageSlider').addEventListener('mouseleave', () => autoplay = setInterval(() => showSlide(idx + 1), 5000));

  showSlide(0);

  /* --- RSVP form handling (client-side only) --- */
  const rsvpForm = document.getElementById('rsvpForm');
  const rsvpList = document.getElementById('rsvpList');
  const saveDraftBtn = document.getElementById('saveDraft');

  // Load saved draft (localStorage) if any
  const draft = localStorage.getItem('rsvpDraft');
  if (draft) {
    try {
      const d = JSON.parse(draft);
      document.getElementById('guestName').value = d.name || '';
      document.getElementById('guestEmail').value = d.email || '';
      document.getElementById('attending').value = d.attending || '';
      document.getElementById('guests').value = d.guests || '';
      document.getElementById('message').value = d.message || '';
    } catch(e) {}
  }

  saveDraftBtn.addEventListener('click', () => {
    const data = {
      name: document.getElementById('guestName').value,
      email: document.getElementById('guestEmail').value,
      attending: document.getElementById('attending').value,
      guests: document.getElementById('guests').value,
      message: document.getElementById('message').value
    };
    localStorage.setItem('rsvpDraft', JSON.stringify(data));
    alert('Draft saved locally in your browser.');
  });

  rsvpForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('guestName').value.trim();
    const email = document.getElementById('guestEmail').value.trim();
    const attending = document.getElementById('attending').value;
    const guests = document.getElementById('guests').value || '0';
    const message = document.getElementById('message').value.trim();

    const entry = {
      id: Date.now(),
      name, email, attending, guests, message, status: 'Pending'
    };

    // store to localStorage list of RSVPs (simulate "pending" state)
    const stored = JSON.parse(localStorage.getItem('rsvpList') || '[]');
    stored.push(entry);
    localStorage.setItem('rsvpList', JSON.stringify(stored));

    renderRsvps();
    rsvpForm.reset();
    localStorage.removeItem('rsvpDraft');
    alert('RSVP submitted — status: Pending. Thank you!');
  });

  function renderRsvps(){
    const list = JSON.parse(localStorage.getItem('rsvpList') || '[]');
    rsvpList.innerHTML = '';
    if (!list.length) {
      rsvpList.innerHTML = '<p class="muted">No RSVPs yet.</p>';
      return;
    }
    list.slice().reverse().forEach(item => {
      const div = document.createElement('div');
      div.className = 'rsvp-item';
      div.style.padding = '10px';
      div.style.borderBottom = '1px solid #eee';
      div.innerHTML = `<strong>${escapeHtml(item.name)}</strong> — ${escapeHtml(item.attending)} • guests: ${escapeHtml(item.guests)} <div style="color:var(--muted);font-size:13px;margin-top:6px">${escapeHtml(item.message || '')}</div><div style="font-size:12px;color:#888;margin-top:6px">Status: ${escapeHtml(item.status)}</div>`;
      rsvpList.appendChild(div);
    });
  }

  renderRsvps();

  /* --- FAQ search --- */
  const faqSearch = document.getElementById('faqSearch');
  const faqList = document.getElementById('faqList');

  faqSearch.addEventListener('input', () => {
    const q = faqSearch.value.trim().toLowerCase();
    Array.from(faqList.children).forEach(li => {
      const text = li.textContent.toLowerCase();
      li.style.display = text.includes(q) ? '' : 'none';
    });
  });

  /* --- Contact form (client-only demo) --- */
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    alert('Thanks — your message was recorded locally. We will respond via email.');
    contactForm.reset();
  });

  /* Utility: simple escape to prevent XSS when injecting user values */
  function escapeHtml(str){
    if (!str) return '';
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
});