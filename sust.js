// Set the wedding date/time here (YYYY, MM-1, DD, HH, MM, SS)
// Months are 0-based (0=Jan, 11=Dec)
const weddingDate = new Date(2025, 11, 27, 9, 0, 0); // Nov 28, 2025 09:00:00

function updateCountdown() {
  const now = new Date();
  let diff = weddingDate - now;

  if (diff <= 0) {
    ['days', 'hours', 'minutes', 'seconds'].forEach(id => {
      const el = document.getElementById(id);
      if (el && el.querySelector('span')) el.querySelector('span').textContent = "00";
    });
    clearInterval(interval);
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  updateFlip('days', days);
  updateFlip('hours', hours);
  updateFlip('minutes', minutes);
  updateFlip('seconds', seconds);
}

function updateFlip(id, value) {
  const el = document.getElementById(id);
  if (!el) return;
  const span = el.querySelector('span');
  if (!span) return;
  const newVal = value < 10 ? '0' + value : String(value);

  if (span.textContent !== newVal) {
    span.textContent = newVal;
    el.classList.add('flip');
    setTimeout(() => el.classList.remove('flip'), 600);
  }
}

const interval = setInterval(updateCountdown, 1000);
updateCountdown(); // run action start immediately

// Quote Slider
const quotes = document.querySelectorAll('.quote');
let current = 0;
let autoSlide;
function showQuote(index) {
  quotes.forEach((q, i) => { q.classList.remove('active'); if (i === index) q.classList.add('active'); });
}
function nextQuote() { if (quotes.length === 0) return; current = (current + 1) % quotes.length; showQuote(current); resetAutoSlide(); }
function prevQuote() { if (quotes.length === 0) return; current = (current - 1 + quotes.length) % quotes.length; showQuote(current); resetAutoSlide(); }
function startAutoSlide() { if (quotes.length === 0) return; autoSlide = setInterval(nextQuote, 5000); }
function resetAutoSlide() { clearInterval(autoSlide); startAutoSlide(); }
startAutoSlide();

// Floating Hearts
const heartsContainer = document.getElementById("hearts-container");
function createHeart(){
  if (!heartsContainer) return;
  const heart = document.createElement("div");
  heart.classList.add("heart"); heart.innerHTML = "❤";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = (Math.random() * 20 + 15) + "px";
  heart.style.animationDuration = (Math.random() * 5 + 5) + "s";
  const colors = ['#D4AF37', '#800020', '#8E4585'];
  heart.style.color = colors[Math.floor(Math.random() * colors.length)];
  heartsContainer.appendChild(heart);
  setTimeout(() => { heart.remove(); }, 10000);
}
setInterval(createHeart, 800);

// ===== NEW ACCORDION (FAQ) CODE =====
const faqItems = document.querySelectorAll(".accordion-item");
faqItems.forEach(item => {
  const header = item.querySelector(".accordion-header");
  const body = item.querySelector(".accordion-body");
  if (!header || !body) return;

  body.style.maxHeight = item.classList.contains('active') ? body.scrollHeight + "px" : "0px";
  body.style.transition = "max-height 0.4s ease";

  header.addEventListener("click", () => {
    // Close other items
    faqItems.forEach(i => {
      if (i !== item) {
        i.classList.remove("active");
        const b = i.querySelector(".accordion-body");
        if (b) b.style.maxHeight = "0px";
      }
    });

    // Toggle current
    item.classList.toggle("active");
    if (item.classList.contains("active")) {
      body.style.maxHeight = body.scrollHeight + "px";
    } else {
      body.style.maxHeight = "0px";
    }
  });
});

// Optional: FAQ Search
const faqSearchInput = document.getElementById("faqSearch");
if (faqSearchInput) {
  faqSearchInput.addEventListener("input", () => {
    const query = faqSearchInput.value.toLowerCase();
    faqItems.forEach(item => {
      const question = item.querySelector(".accordion-header").textContent.toLowerCase();
      const answer = item.querySelector(".accordion-body").textContent.toLowerCase();
      item.style.display = (question.includes(query) || answer.includes(query)) ? "" : "none";
    });
  });
}

// Audio (play on click)
const audio = document.getElementById("mySong");
document.body.addEventListener("click", () => {
  try { if (audio && typeof audio.play === 'function') audio.play(); } catch(e) { }
});

// Audible popup
window.onload = function() {
  setTimeout(function(){
    const p = document.getElementById('audiblePopup');
    if (p) p.style.display = 'block';
  }, 2500);
};

// Love carousel
const track = document.getElementById('track');
const cards = track ? Array.from(track.children) : [];
const dotsWrap = document.getElementById('dots');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalSubtitle = document.getElementById('modalSubtitle');
const modalBody = document.getElementById('modalBody');
const closeModal = document.getElementById('closeModal');

const stories = [
  { title: 'How It Started', subtitle: 'The first meeting', body: 'They met by chance at a rainy bus stop. A crowded platform, a missed bus, and a too-small umbrella. A small misunderstanding turned into a shared shelter, a conversation about music, and two shy smiles that lingered longer than the rain.' },
  { title: 'The First Date', subtitle: 'A coffee and a long walk', body: 'On the first date they chose a cozy corner table at a little cafe. Talk spilled easily; they lost track of time and ended the evening with a walk through the market where string lights made the stalls feel like stars.' },
  { title: 'Growing Together', subtitle: 'Small adventures', body: 'From cooking lessons to movie marathons, and from silly arguments about playlists to deep talks at 2 a.m., they built a life of inside jokes and mutual support. Small adventures turned into a shared home of memories.' },
  { title: 'The Proposal', subtitle: 'A quiet, perfect moment', body: 'On a clear night beneath a canopy of stars, one knee bent on a familiar stone path. A single question, a tear, and a joyful yes — the world seemed to pause and bless the moment.' },
  { title: 'Today', subtitle: 'The wedding day', body: 'Surrounded by family and friends, with vows exchanged and laughter all around, they promised to keep the adventure alive. From this day forward, they step into a new chapter together.' }
];

// Create dots if track exists
if (dotsWrap && cards.length) {
  cards.forEach((c, i) => {
    const d = document.createElement('button');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    d.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(d);
  });
}

let index = 0, startX = 0, currentX = 0, isDown = false;
const gap = 18;

function update(){
  if (!track || cards.length === 0) return;
  const card = cards[index];
  const containerWidth = document.querySelector('.carousel-wrap').clientWidth;
  const center = (containerWidth - card.offsetWidth) / 2;
  let offset = 0;
  for (let i = 0; i < index; i++) offset += cards[i].offsetWidth + gap;
  const tx = -offset + center;
  track.style.transform = `translateX(${tx}px)`;

  cards.forEach((c, i) => c.classList.toggle('show', i === index));
  if (dotsWrap) Array.from(dotsWrap.children).forEach((d, di) => d.classList.toggle('active', di === index));
}

function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
function goTo(i) { index = clamp(i, 0, cards.length - 1); update(); }

if (track) {
  track.addEventListener('pointerdown', (e) => {
    isDown = true; startX = e.clientX; currentX = startX;
    track.style.transition = 'none';
  });
  track.addEventListener('pointermove', (e) => {
    if (!isDown) return;
    currentX = e.clientX;
    const dx = currentX - startX;
    const base = getCurrentTranslate();
    track.style.transform = `translateX(${base + dx}px)`;
  });
  track.addEventListener('pointerup', (e) => {
    if (!isDown) return;
    isDown = false;
    const dx = e.clientX - startX;
    track.style.transition = '';
    if (Math.abs(dx) > 60) { if (dx < 0) goTo(index + 1); else goTo(index - 1); }
    else update();
  });
  track.addEventListener('pointerleave', (e) => {
    if (!isDown) return;
    isDown = false;
    track.style.transition = '';
    update();
  });
}

function getCurrentTranslate(){
  if (!track) return 0;
  const style = window.getComputedStyle(track);
  const matrix = new DOMMatrixReadOnly(style.transform || style.webkitTransform);
  return matrix.m41 || 0;
}

cards.forEach(c => {
  c.addEventListener('click', () => openStory(Number(c.dataset.index)));
});

function openStory(i){
  const s = stories[i];
  if (!modal) return;
  modalTitle.textContent = s ? s.title : '';
  modalSubtitle.textContent = s ? s.subtitle : '';
  modalBody.textContent = s ? s.body : '';
  modal.classList.add('open');
}
function close() { if (modal) modal.classList.remove('open'); }
if (closeModal) closeModal.addEventListener('click', close);
if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) close(); });

window.addEventListener('load', () => { setTimeout(update, 80); });
window.addEventListener('resize', update);

// Back to top button
const backToTopBtn = document.getElementById("backToTop");
window.onscroll = function() {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    if (backToTopBtn) backToTopBtn.style.display = "block";
  } else {
    if (backToTopBtn) backToTopBtn.style.display = "none";
  }
};
if (backToTopBtn) backToTopBtn.onclick = function() {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// Cursor trail & burst
const cursor = document.querySelector('.cursor');
const themeColors = ['#F5E5C0', '#FFEEC6','#FAF3E0','#F9F5D7','#FFFDD0','#7B3F00','#CC5500','#A94400','#E36414','#8B5A2B','#4E2A1E', '#FF6A00', '#C16935'];

function createTrail(x, y) {
  const trail = document.createElement('div');
  trail.classList.add('trail');
  const color = themeColors[Math.floor(Math.random() * themeColors.length)];
  trail.style.background = color;
  trail.style.left = x + 'px';
  trail.style.top = y + 'px';
  trail.style.boxShadow = `0 0 10px ${color}, 0 0 20px ${color}`;
  document.body.appendChild(trail);
  setTimeout(() => trail.remove(), 800);
}

document.addEventListener('mousemove', (e) => {
  if (cursor) { cursor.style.left = e.pageX + 'px'; cursor.style.top = e.pageY + 'px'; }
  createTrail(e.pageX, e.pageY);
});

document.addEventListener('click', (e) => {
  const color = themeColors[Math.floor(Math.random() * themeColors.length)];
  for (let i = 0; i < 10; i++) {
    const burst = document.createElement('div');
    burst.classList.add('burst');
    burst.style.background = color;
    burst.style.left = e.pageX + 'px';
    burst.style.top = e.pageY + 'px';
    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * 60 + 20;
    burst.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(1)`;
    document.body.appendChild(burst);
    setTimeout(() => burst.remove(), 600);
  }
});

document.addEventListener('wheel', (e) => {
  const x = window.innerWidth / 2 + (Math.random() * 100 - 50);
  const y = window.scrollY + window.innerHeight / 2;
  createTrail(x, y);
});

document.addEventListener('touchmove', (e) => {
  const touch = e.touches[0];
  const x = touch.pageX;
  const y = touch.pageY;
  createTrail(x, y);
}, { passive: true });

document.addEventListener('touchstart', (e) => {
  const touch = e.touches[0];
  const x = touch.pageX;
  const y = touch.pageY;
  for (let i = 0; i < 8; i++) {
    const burst = document.createElement('div');
    burst.classList.add('burst');
    const color = themeColors[Math.floor(Math.random() * themeColors.length)];
    burst.style.background = color;
    burst.style.left = x + 'px';
    burst.style.top = y + 'px';
    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * 60 + 10;
    burst.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(1)`;
    document.body.appendChild(burst);
    setTimeout(() => burst.remove(), 600);
  }
});

// Book pages
let currentPage = 0;
const pages = document.querySelectorAll('.page');

function flipPage() {
  if (currentPage < pages.length) {
    pages[currentPage].classList.add('flipped');
    currentPage++;
  } else {
    pages.forEach(p => p.classList.remove('flipped'));
    currentPage = 0;
  }
}

// Love story scroll
const openScrollBtn = document.getElementById('openScrollBtn');
const scrollOpen = document.querySelector('.scroll-open');
openScrollBtn.addEventListener('click', () => {
  scrollOpen.style.display = 'flex';
  openScrollBtn.parentElement.style.display = 'none';
});

// Gallery slider
let slideIndex = 0;
const slides = document.querySelectorAll('.slides img');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

function showSlide(n) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if(i === n) slide.classList.add('active');
  });
}
showSlide(slideIndex);

prevBtn.addEventListener('click', () => {
  slideIndex = (slideIndex === 0) ? slides.length-1 : slideIndex-1;
  showSlide(slideIndex);
});
nextBtn.addEventListener('click', () => {
  slideIndex = (slideIndex === slides.length-1) ? 0 : slideIndex+1;
  showSlide(slideIndex);
});