export function renderFilterBanner(selector) {
  const el = document.querySelector(selector);
  if (!el) return;

  el.innerHTML = `
    <section class="filter-banner">
      <div class="filter-banner__watermark" aria-hidden="true">
        <img src="../../assets/images/logo-pattern.png" alt="" />
      </div>
      <div class="filter-banner__container">
        <div class="filter-banner__inner">
          <div class="filter-banner__tabs" role="tablist" aria-label="Property purpose">
            <button class="filter-banner__tab filter-banner__tab--active" role="tab" aria-selected="true" data-purpose="buy">Buy</button>
            <button class="filter-banner__tab" role="tab" aria-selected="false" data-purpose="rent">Rent</button>
            <button class="filter-banner__tab" role="tab" aria-selected="false" data-purpose="offplan">Off-Plan</button>
          </div>
          <form class="filter-banner__form" aria-label="Property search filters">
            <div class="filter-banner__field">
              <label class="filter-banner__label" for="filterLocation">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                Location
              </label>
              <div class="filter-banner__select-wrap">
                <select class="filter-banner__select" id="filterLocation" aria-label="Select location">
                  <option value="">All Locations</option>
                  <option value="new-cairo">New Cairo</option>
                  <option value="downtown">Downtown Cairo</option>
                  <option value="new-alamein">New Alamein Coast</option>
                  <option value="new-capital">New Administrative Capital</option>
                  <option value="zamalek">Zamalek</option>
                  <option value="mehwar">Mehwar Road District</option>
                  <option value="smart-village">Smart Village</option>
                </select>
                <svg class="filter-banner__chevron" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </div>
            </div>

            <select id="filterPurpose" aria-label="Select purpose" style="display:none">
              <option value="buy">For Sale</option>
              <option value="rent">For Rent</option>
              <option value="offplan">Off-Plan</option>
            </select>

            <div class="filter-banner__divider" aria-hidden="true"></div>

            <div class="filter-banner__field">
              <label class="filter-banner__label" for="filterType">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="3" width="20" height="18" rx="2"/>
                  <path d="M8 21V10h8v11"/>
                  <path d="M12 3v7"/>
                </svg>
                Property Type
              </label>
              <div class="filter-banner__select-wrap">
                <select class="filter-banner__select" id="filterType" aria-label="Select property type">
                  <option value="">Any Type</option>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="townhouse">Townhouse</option>
                  <option value="penthouse">Penthouse</option>
                  <option value="studio">Studio</option>
                  <option value="office">Office Space</option>
                  <option value="retail">Retail</option>
                </select>
                <svg class="filter-banner__chevron" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </div>
            </div>

            <div class="filter-banner__divider" aria-hidden="true"></div>

            <div class="filter-banner__field filter-banner__field--price">
              <label class="filter-banner__label" for="bannerPriceMin">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23"/>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
                Price Range
              </label>
              <div class="filter-banner__price-wrap">
                <input type="number" class="filter-banner__price-input" id="bannerPriceMin" placeholder="Min" min="0" aria-label="Minimum price" />
                <span class="filter-banner__price-sep">–</span>
                <input type="number" class="filter-banner__price-input" id="bannerPriceMax" placeholder="Max" min="0" aria-label="Maximum price" />
              </div>
            </div>

            <button type="submit" class="filter-banner__search-btn" aria-label="Search properties">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <span>Search</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  `;

  const tabs = el.querySelectorAll('.filter-banner__tab');
  const purposeSelect = el.querySelector('#filterPurpose');

  tabs.forEach(tab => {
    tab.addEventListener('click', function () {
      tabs.forEach(t => {
        t.classList.remove('filter-banner__tab--active');
        t.setAttribute('aria-selected', 'false');
      });
      this.classList.add('filter-banner__tab--active');
      this.setAttribute('aria-selected', 'true');
      if (purposeSelect) purposeSelect.value = this.dataset.purpose;
    });
  });

  const form = el.querySelector('.filter-banner__form');
  if (form) form.addEventListener('submit', e => e.preventDefault());
}
