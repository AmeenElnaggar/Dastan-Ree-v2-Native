let modalInstance = null;

/**
 * Opens a modal dialog.
 * @param {{ title: string, content: string, onOpen?: (el: HTMLElement) => void }} options
 */
export function openModal({ title, content, onOpen }) {
  closeModal();

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true" aria-label="${title}">
      <div class="modal__header">
        <h2 class="modal__title">${title}</h2>
        <button class="modal__close" aria-label="Close modal">✕</button>
      </div>
      <div class="modal__body">${content}</div>
    </div>
  `;

  overlay.querySelector('.modal__close').addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', handleEsc);

  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => overlay.classList.add('modal-overlay--visible'));

  modalInstance = overlay;
  if (onOpen) onOpen(overlay);
}

export function closeModal() {
  if (!modalInstance) return;
  modalInstance.classList.remove('modal-overlay--visible');
  modalInstance.addEventListener('transitionend', () => {
    modalInstance?.remove();
    modalInstance = null;
    document.body.style.overflow = '';
  }, { once: true });
  document.removeEventListener('keydown', handleEsc);
}

function handleEsc(e) {
  if (e.key === 'Escape') closeModal();
}
