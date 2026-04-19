import { projects } from '../../data/projects.data.js';
import { amenities } from '../../data/amenities.data.js';
import { renderNavbar } from '../../shared/components/navbar/Navbar.js';
import { renderFooter } from '../../shared/components/footer/Footer.js';
import { openModal } from '../../shared/components/modal/Modal.js';
import { initRelatedSlider } from '../../shared/sliders/RelatedSlider.js';
import { formatPrice } from '../../utils/format.js';
import { qs } from '../../utils/dom.js';
import { getParam } from '../../utils/router.js';

document.addEventListener('DOMContentLoaded', () => {
  renderNavbar('#navbar-root');
  renderFooter('#footer-root');

  const id = getParam('id') || projects[0]?.id;
  const project = projects.find(p => p.id === id) || projects[0];

  if (!project) {
    document.body.innerHTML = '<p class="p-10 text-center text-gray-500">Project not found.</p>';
    return;
  }

  renderProject(project);
  bindInquiry(project);
  initRelatedSlider('#related-slider-root', project);
});

function renderProject(p) {
  document.title = `${p.name} — Dastan Real Estate`;

  // Gallery
  const slidesContainer = qs('#gallery-slides');
  slidesContainer.innerHTML = p.images.map(img =>
    `<div class="swiper-slide">
       <div class="w-full h-[55vh] bg-cover bg-center" style="background-image:url('${img}')"></div>
     </div>`
  ).join('');

  new Swiper('.gallery-swiper', {
    loop: true,
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
  });

  // Text fields
  qs('#project-title').textContent = p.name;
  qs('#project-location-text').textContent = p.location;
  qs('#project-price').textContent = formatPrice(p.price);
  qs('#project-description').textContent = p.description;
  qs('#project-breadcrumb').innerHTML =
    `<a href="../home/index.html" class="hover:text-primary-500">Home</a>
     <span class="mx-2">/</span>
     <a href="../projects/index.html" class="hover:text-primary-500">Projects</a>
     <span class="mx-2">/</span>
     <span class="text-gray-700">${p.name}</span>`;

  // Stats
  const stats = [
    { label: 'Type',     value: p.type },
    { label: 'Units',    value: p.units },
    { label: 'Status',   value: p.status },
    { label: 'Year',     value: p.year },
  ];
  qs('#project-stats').innerHTML = stats.map(s =>
    `<div class="bg-gray-50 rounded-2xl p-4">
       <p class="text-xs text-gray-400 uppercase tracking-wide mb-1">${s.label}</p>
       <p class="font-semibold text-gray-800">${s.value}</p>
     </div>`
  ).join('');

  // Amenities
  const projectAmenities = amenities.filter(a => p.amenityIds.includes(a.id));
  qs('#project-amenities').innerHTML = projectAmenities.map(a =>
    `<div class="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 rounded-xl px-4 py-3">
       <span>${a.icon}</span><span>${a.name}</span>
     </div>`
  ).join('');
}

function bindInquiry(project) {
  qs('#inquiry-btn').addEventListener('click', () => {
    openModal({
      title: `Inquire about ${project.name}`,
      content: `
        <form id="inquiry-form" class="flex flex-col gap-4">
          <input type="text" placeholder="Your Name" required class="input" />
          <input type="email" placeholder="Email Address" required class="input" />
          <input type="tel" placeholder="Phone Number" class="input" />
          <textarea placeholder="Your message..." rows="4" class="input resize-none"></textarea>
          <button type="submit" class="btn-primary">Send Inquiry</button>
        </form>`,
      onOpen: (modal) => {
        modal.querySelector('#inquiry-form').addEventListener('submit', e => {
          e.preventDefault();
          modal.querySelector('#inquiry-form').innerHTML =
            '<p class="text-center text-green-600 font-medium py-4">Thank you! We\'ll be in touch soon.</p>';
        });
      },
    });
  });

  qs('#schedule-btn').addEventListener('click', () => {
    openModal({
      title: 'Schedule a Site Visit',
      content: `
        <form id="schedule-form" class="flex flex-col gap-4">
          <input type="text" placeholder="Your Name" required class="input" />
          <input type="email" placeholder="Email Address" required class="input" />
          <input type="date" required class="input" min="${new Date().toISOString().split('T')[0]}" />
          <input type="time" class="input" />
          <button type="submit" class="btn-primary">Confirm Visit</button>
        </form>`,
      onOpen: (modal) => {
        modal.querySelector('#schedule-form').addEventListener('submit', e => {
          e.preventDefault();
          modal.querySelector('#schedule-form').innerHTML =
            '<p class="text-center text-green-600 font-medium py-4">Visit scheduled! We\'ll confirm by email.</p>';
        });
      },
    });
  });
}
