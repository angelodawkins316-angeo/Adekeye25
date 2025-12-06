// LOVE STORY SCROLL
const openScrollBtn = document.getElementById('openScrollBtn');
const scrollOpen = document.querySelector('.scroll-open');

openScrollBtn.addEventListener('click', () => {
  scrollOpen.style.display = 'flex';
  openScrollBtn.parentElement.style.display = 'none';
});

// GALLERY SLIDER
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

// ACCORDION
const accordionHeaders = document.querySelectorAll('.accordion-header');
accordionHeaders.forEach(header => {
  header.addEventListener('click', () => {
    const body = header.nextElementSibling;
    body.style.display = body.style.display === 'block' ? 'none' : 'block';
  });
});

// FAQ SEARCH
const faqSearch = document.getElementById('faqSearch');
faqSearch.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  document.querySelectorAll('.accordion-item').forEach(item => {
    const text = item.querySelector('.accordion-header').textContent.toLowerCase();
    item.style.display = text.includes(query) ? 'block' : 'none';
  });
});

// RSVP & CONTACT FORM
document.getElementById('rsvpForm').addEventListener('submit', e => {
  e.preventDefault();
  alert('RSVP submitted! Thank you.');
  e.target.reset();
});
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  alert('Message sent! Thank you.');
  e.target.reset();
});