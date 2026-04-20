import { projects } from '../../data/projects.data.js';
import { amenities } from '../../data/amenities.data.js';
import { renderNavbar } from '../../shared/components/navbar/Navbar.js';
import { renderFooter } from '../../shared/components/footer/Footer.js';
import { openModal } from '../../shared/components/modal/Modal.js';
import { initRelatedSlider } from '../../shared/sliders/RelatedSlider.js';
import { formatNumber } from '../../utils/format.js';
import { qs } from '../../utils/dom.js';
import { getParam } from '../../utils/router.js';

document.addEventListener('DOMContentLoaded', () => {
  renderNavbar('#navbar-root');
  renderFooter('#footer-root');

  const id = getParam('id') || projects[0]?.id;
  const project = projects.find(p => p.id === id) || projects[0];

  if (!project) {
    document.body.innerHTML = '<p class="text-center py-20 text-gray-500">Project not found.</p>';
    return;
  }

  renderProject(project);
  bindActions(project);
  initRelatedSlider('#related-slider-root', project);
});

function renderProject(p) {
  document.title = `${p.name} — Dastan Real Estate`;

  qs('#property-breadcrumb').innerHTML =
    `<a href="../home/index.html">Home</a>
     <span class="breadcrumb-sep">/</span>
     <a href="../projects/index.html">Properties</a>
     <span class="breadcrumb-sep">/</span>
     <span>${p.name}</span>`;

  qs('#property-title').textContent = p.name;
  qs('#property-address-text').textContent = p.location;

  qs('#property-actions').innerHTML =
    `<button class="property-action-btn" id="save-btn">
       <i class="fa-regular fa-heart"></i> Save
     </button>
     <button class="property-action-btn" id="share-btn">
       <i class="fa-solid fa-share-nodes"></i> Share
     </button>`;

  qs('#property-stats').innerHTML =
    `<div class="property-stat-item">${p.bedrooms} <span>BD</span></div>
     <div class="property-stat-item">${p.bathrooms} <span>BA</span></div>
     <div class="property-stat-item">${p.area} <span>M²</span></div>`;

  qs('#property-price').innerHTML = `${formatNumber(p.price)} <span>AED</span>`;

  const images = p.images.slice(0, 5);
  const galleryEl = qs('#property-gallery');
  if (images.length === 1) galleryEl.classList.add('property-gallery--single');
  else if (images.length <= 3) galleryEl.classList.add('property-gallery--compact');
  galleryEl.innerHTML = images.map((img, i) =>
    `<figure class="property-gallery-item${i === 0 ? ' property-gallery-item--main' : ''}">
       <a class="property-gallery-cover" href="${img}" target="_blank"
          style="background-image:url('${img}')"></a>
     </figure>`
  ).join('');

  qs('#gallery-btn').addEventListener('click', e => {
    e.preventDefault();
    window.open(images[0], '_blank');
  });

  const capitalize = s => s.charAt(0).toUpperCase() + s.slice(1);
  const details = [
    { label: 'Status',      value: p.status },
    { label: 'Type',        value: capitalize(p.type) },
    { label: 'Year Built',  value: p.year },
    { label: 'Total Units', value: p.units },
    { label: 'Bedrooms',    value: p.bedrooms },
    { label: 'Bathrooms',   value: p.bathrooms },
  ];
  qs('#property-details').innerHTML = details.map(d =>
    `<div class="property-detail-item">
       <div class="property-detail-label">${d.label}</div>
       <div class="property-detail-value">${d.value}</div>
     </div>`
  ).join('');

  qs('#property-overview').innerHTML = `<p>${p.description}</p>`;

  const projectAmenities = amenities.filter(a => p.amenityIds.includes(a.id));
  qs('#property-amenities').innerHTML = projectAmenities.map(a =>
    `<div class="property-amenity-item">
       <span>${a.icon}</span> ${a.name}
     </div>`
  ).join('');

  qs('#property-agent').innerHTML =
    `<div class="property-agent-card">
       <h3 class="property-section-title">Listed By</h3>
       <div class="agent-profile">
         <div class="agent-avatar"
              style="background-image:url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200')">
         </div>
         <div class="agent-info">
           <div class="agent-name">Sarah Al-Hassan</div>
           <div class="agent-rating">★★★★★</div>
           <div class="agent-email">
             <a href="mailto:sarah@dastan.ae">sarah@dastan.ae</a>
           </div>
           <div class="agent-phone">
             <i class="fa-solid fa-phone"></i> +971 50 123 4567
           </div>
         </div>
       </div>
       <button class="agent-contact-btn" id="contact-agent-btn">
         <i class="fa-regular fa-envelope"></i> Contact Agent
       </button>
     </div>`;
}

function bindActions(project) {
  document.addEventListener('click', e => {
    if (e.target.closest('#save-btn')) {
      const btn = e.target.closest('#save-btn');
      btn.classList.toggle('is-saved');
      btn.innerHTML = btn.classList.contains('is-saved')
        ? '<i class="fa-solid fa-heart"></i> Saved'
        : '<i class="fa-regular fa-heart"></i> Save';
    }

    if (e.target.closest('#contact-agent-btn')) {
      openModal({
        title: `Contact Agent`,
        content: `
          <form id="contact-form" class="flex flex-col gap-4">
            <input type="text" placeholder="Your Name" required class="input" />
            <input type="email" placeholder="Email Address" required class="input" />
            <input type="tel" placeholder="Phone Number" class="input" />
            <textarea placeholder="Message about ${project.name}..."
                      rows="4" class="input resize-none"></textarea>
            <button type="submit" class="btn-primary">Send Message</button>
          </form>`,
        onOpen: (modal) => {
          modal.querySelector('#contact-form').addEventListener('submit', ev => {
            ev.preventDefault();
            modal.querySelector('#contact-form').innerHTML =
              '<p class="text-center text-green-600 font-medium py-4">Message sent! We\'ll be in touch soon.</p>';
          });
        },
      });
    }
  });
}
