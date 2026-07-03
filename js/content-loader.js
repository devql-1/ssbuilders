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
      props.properties.forEach((p, i) => {
        setText(`[data-cms="property-${i}-title"]`, p.title);
        setText(`[data-cms="property-${i}-location"]`, p.location);
        setText(`[data-cms="property-${i}-price"]`, p.price);
        setText(`[data-cms="property-${i}-type"]`, p.type);
        setText(`[data-cms="property-${i}-beds"]`, p.beds + ' BHK');
        setText(`[data-cms="property-${i}-baths"]`, p.baths + ' Bath');
        setText(`[data-cms="property-${i}-area"]`, p.area + ' sq ft');
        setText(`[data-cms="property-${i}-description"]`, p.description);
        if (p.image) setAttr(`[data-cms="property-${i}-image"]`, 'src', p.image);
      });
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
