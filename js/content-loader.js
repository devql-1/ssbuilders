(function() {
  'use strict';
  async function loadJSON(path) {
    try {
      const r = await fetch(path);
      if (!r.ok) return null;
      return await r.json();
    } catch (e) { return null; }
  }
  function setText(sel, val) {
    if (!val) return;
    const els = document.querySelectorAll(sel);
    els.forEach(el => {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.value = val;
      else el.innerHTML = val;
    });
  }
  function setAttr(sel, attr, val) {
    if (!val) return;
    document.querySelectorAll(sel).forEach(el => el.setAttribute(attr, val));
  }
  async function init() {
    const hero = await loadJSON('content/hero-about.json');
    if (hero) {
      setText('[data-cms="heroTitle"]', hero.heroTitle);
      setText('[data-cms="heroSubtitle"]', hero.heroSubtitle);
      setText('[data-cms="aboutTitle"]', hero.aboutTitle);
      setText('[data-cms="aboutDesc"]', hero.aboutDesc);
    }
    const contact = await loadJSON('content/contact.json');
    if (contact) {
      setText('[data-cms="address"]', contact.address);
      setText('[data-cms="phone"]', contact.phone);
      setText('[data-cms="email"]', contact.email);
      setText('[data-cms="hours"]', contact.hours);
      setAttr('[data-cms="phoneLink"]', 'href', 'tel:' + contact.phone.replace(/[^0-9]/g, ''));
      setAttr('[data-cms="emailLink"]', 'href', 'mailto:' + contact.email);
    }
    const props = await loadJSON('content/properties/properties.json');
    if (props && Array.isArray(props.properties)) {
      const slider = document.querySelector('.property-slider');
      if (slider) {
        const template = document.getElementById('property-template');
        if (template) {
          slider.innerHTML = '';
          props.properties.forEach((p, i) => {
            const clone = template.cloneNode(true);
            clone.classList.remove('d-none');
            clone.id = '';
            const img = clone.querySelector('[data-cms="property-image"]');
            if (img) img.setAttribute('src', p.image || 'images/img_1.jpg');
            const price = clone.querySelector('[data-cms="property-price"]');
            if (price) price.textContent = p.price;
            const loc = clone.querySelector('[data-cms="property-location"]');
            if (loc) loc.textContent = p.location;
            const city = clone.querySelector('[data-cms="property-city"]');
            if (city) city.textContent = 'Jaipur, Rajasthan';
            const beds = clone.querySelector('[data-cms="property-beds"]');
            if (beds) beds.textContent = (p.beds || 0) + ' BHK';
            const baths = clone.querySelector('[data-cms="property-baths"]');
            if (baths) baths.textContent = (p.baths || 0) + ' Bath';
            const link = clone.querySelector('a');
            if (link) link.setAttribute('href', 'property-single.html');
            slider.appendChild(clone);
          });
        }
      }
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();