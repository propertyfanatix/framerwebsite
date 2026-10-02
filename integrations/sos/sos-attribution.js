/*
 * SOS first-party attribution for Framer (SOS-EXP-001-2026-SELLER-SPRINT).
 *
 * Install once: Framer -> Site Settings -> General -> Custom Code -> "End of <head>" (all pages):
 * paste this whole file inside a script tag. Per landing page, set that page's landing page ID
 * in the page's own custom code BEFORE this script, e.g. window.SOS_ATTRIBUTION = { landingPageId: 'LP-STAIRS' };
 * (This file must never contain a literal closing script tag, so it can be pasted inline.)
 *
 * What it does (no personal data is stored in the browser):
 *  1. Captures campaign parameters from the URL (utm_*, gclid, gbraid, wbraid, fbclid, sos_cid,
 *     sos_vid, sos_crid) and persists first-touch (never overwritten) and latest-touch in
 *     first-party localStorage.
 *  2. On form submit, fills/creates hidden inputs so the Framer webhook carries attribution:
 *     campaign_id, experiment_id, variant_id, creative_id, utm_*, click IDs, referrer,
 *     landing_page_id, cta_id, form_id, lead_external_id, occurred_at, sos_first_touch.
 *  3. Decorates links to book.shalinthia.com with sos_lid / campaign / variant / creative / UTMs
 *     so bookings reconcile deterministically, and with Reservation's own source code (src):
 *     googleads or metaads for a paid click, otherwise website. A link that already names its
 *     src (e.g. a referral link) keeps it.
 * SOS re-validates every value server-side; nothing here is trusted blindly.
 * Test mode: add ?sos_test=1 to a URL to mark submissions TEST_SOS_EXP_001.
 */
(function () {
  'use strict';
  var EXPERIMENT_ID = 'SOS-EXP-001-2026-SELLER-SPRINT';
  var KEYS = { first: 'sos_ft_v1', latest: 'sos_lt_v1', lead: 'sos_lid_v1', test: 'sos_test_v1' };
  var PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'gbraid', 'wbraid', 'fbclid'];
  var SOS_PARAMS = { sos_cid: 'campaign_id', sos_vid: 'variant_id', sos_crid: 'creative_id' };
  var BOOKING_HOST = 'book.shalinthia.com';

  function store(key, value) {
    try {
      if (value === undefined) return JSON.parse(window.localStorage.getItem(key) || 'null');
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      return null;
    }
    return value;
  }

  function uuid() {
    if (window.crypto && window.crypto.randomUUID) return window.crypto.randomUUID();
    return 'lx-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10);
  }

  function clean(v, max) {
    if (typeof v !== 'string') return undefined;
    v = v.replace(/[\u0000-\u001f<>]/g, '').trim();
    return v ? v.slice(0, max || 200) : undefined;
  }

  function capture() {
    var q = new URLSearchParams(window.location.search);
    var touch = {};
    var any = false;
    PARAMS.forEach(function (p) {
      var v = clean(q.get(p), 500);
      if (v) { touch[p] = v; any = true; }
    });
    Object.keys(SOS_PARAMS).forEach(function (p) {
      var v = clean(q.get(p), 80);
      if (v) { touch[SOS_PARAMS[p]] = v; any = true; }
    });
    var cfg = window.SOS_ATTRIBUTION || {};
    if (cfg.landingPageId) touch.landing_page_id = cfg.landingPageId;
    if (document.referrer && document.referrer.indexOf(window.location.host) === -1) {
      try { var r = new URL(document.referrer); touch.referrer = r.origin + r.pathname; } catch (e) { /* ignore */ }
    }
    touch.occurred_at = new Date().toISOString();
    if (q.get('sos_test') === '1') store(KEYS.test, true);
    if (any || !store(KEYS.first)) {
      if (!store(KEYS.first)) store(KEYS.first, touch); // first touch is never overwritten
      if (any) store(KEYS.latest, touch);
    }
    if (!store(KEYS.lead)) store(KEYS.lead, uuid());
  }

  function attributionFields(form) {
    var first = store(KEYS.first) || {};
    var latest = store(KEYS.latest) || first;
    var cfg = window.SOS_ATTRIBUTION || {};
    var f = {};
    PARAMS.forEach(function (p) { if (latest[p]) f[p] = latest[p]; });
    ['campaign_id', 'variant_id', 'creative_id', 'referrer'].forEach(function (p) { if (latest[p] || first[p]) f[p] = latest[p] || first[p]; });
    f.experiment_id = EXPERIMENT_ID;
    f.landing_page_id = cfg.landingPageId || latest.landing_page_id || first.landing_page_id || '';
    f.form_id = (form && (form.getAttribute('data-sos-form') || form.getAttribute('name'))) || cfg.formId || '';
    var cta = form && form.querySelector('[data-sos-cta]');
    f.cta_id = (cta && cta.getAttribute('data-sos-cta')) || cfg.ctaId || 'CTA-BOOK-CONSULT';
    f.lead_external_id = store(KEYS.lead) || uuid();
    f.occurred_at = new Date().toISOString();
    f.sos_first_touch = JSON.stringify(first);
    if (store(KEYS.test)) f.test_marker = 'TEST_SOS_EXP_001';
    return f;
  }

  function fillForm(form) {
    var fields = attributionFields(form);
    Object.keys(fields).forEach(function (name) {
      var input = form.querySelector('input[name="' + name + '"]');
      if (!input) {
        input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        form.appendChild(input);
      }
      input.value = fields[name];
    });
  }

  // Reservation keeps only its own source codes (its SOURCES list). Google adds gclid/gbraid/wbraid
  // only to ad clicks; Facebook adds fbclid to every outbound click, so Meta needs a paid medium or
  // an SOS campaign ID as well.
  function reservationSource(t) {
    if (!t) return null;
    if (t.gclid || t.gbraid || t.wbraid) return 'googleads';
    var src = String(t.utm_source || '').toLowerCase();
    var paid = /^(cpc|ppc|paid|paid_social|paidsocial|paid_search|display)$/.test(String(t.utm_medium || '').toLowerCase()) || !!t.campaign_id;
    if (paid && /google/.test(src)) return 'googleads';
    if (paid && (t.fbclid || /facebook|instagram|meta|^fb$|^ig$/.test(src))) return 'metaads';
    return null;
  }

  function decorateBookingLinks() {
    var first = store(KEYS.first) || {};
    var latest = store(KEYS.latest) || first;
    var links = document.querySelectorAll('a[href*="' + BOOKING_HOST + '"]');
    for (var i = 0; i < links.length; i++) {
      try {
        var u = new URL(links[i].href);
        u.searchParams.set('sos_lid', store(KEYS.lead) || '');
        if (latest.campaign_id || first.campaign_id) u.searchParams.set('sos_cid', latest.campaign_id || first.campaign_id);
        if (latest.variant_id || first.variant_id) u.searchParams.set('sos_vid', latest.variant_id || first.variant_id);
        if (latest.creative_id || first.creative_id) u.searchParams.set('sos_crid', latest.creative_id || first.creative_id);
        PARAMS.slice(0, 5).forEach(function (p) { if (latest[p]) u.searchParams.set(p, latest[p]); });
        if (!u.searchParams.get('src')) u.searchParams.set('src', reservationSource(first) || reservationSource(latest) || 'website');
        links[i].href = u.toString();
      } catch (e) { /* ignore malformed links */ }
    }
  }

  capture();
  // Capture-phase listener runs before Framer's own submit handler reads the form.
  document.addEventListener('submit', function (e) { if (e.target && e.target.tagName === 'FORM') fillForm(e.target); }, true);
  // Framer forms may submit via button click without a native submit event.
  document.addEventListener('click', function (e) {
    var btn = e.target && e.target.closest && e.target.closest('button[type="submit"], input[type="submit"]');
    if (btn && btn.form) fillForm(btn.form);
  }, true);
  document.addEventListener('DOMContentLoaded', decorateBookingLinks);
  new MutationObserver(decorateBookingLinks).observe(document.documentElement, { childList: true, subtree: true });
  window.SOS_ATTRIBUTION_FIELDS = attributionFields; // exposed for live verification in the browser console
})();
