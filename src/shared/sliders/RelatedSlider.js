import { projects } from '../../data/projects.data.js';
import { renderProjectCard } from '../components/project-card/ProjectCard.js';
import { RELATED_SLIDER_CONFIG } from './swiper.config.js';

/**
 * Initializes the related projects slider.
 * @param {string} selector
 * @param {{ id: string, type: string }} currentProject
 */
export function initRelatedSlider(selector, currentProject) {
  const root = document.querySelector(selector);
  if (!root) return;

  const related = projects
    .filter(p => p.id !== currentProject.id && p.type === currentProject.type)
    .slice(0, 6);

  if (related.length === 0) {
    root.remove();
    return;
  }

  root.innerHTML = `
    <div class="swiper related-swiper" style="padding-bottom: 2rem;">
      <div class="swiper-wrapper">
        ${related.map(p => `
          <div class="swiper-slide">
            ${renderProjectCard(p)}
          </div>
        `).join('')}
      </div>
      <button class="related-swiper-prev swiper-btn-icon" aria-label="Previous">‹</button>
      <button class="related-swiper-next swiper-btn-icon" aria-label="Next">›</button>
    </div>
  `;

  new Swiper('.related-swiper', RELATED_SLIDER_CONFIG);
}
