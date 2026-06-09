/* =============================================================
   Upscale Operations — global header & footer
   Include on any page with:  <script src="components.js" defer></script>
   Then drop <site-header></site-header> and <site-footer></site-footer>
   into the page. Edit the CONFIG block below to change links/contact.
   ============================================================= */
(function () {
  /* ---------- CONFIG — edit these to match your pages ---------- */
  var HOME  = "index.html";
  var EMAIL = "justin@upscale-ops.com";
  var CTA   = { label: "Book a discovery call", href: "mailto:justin@upscale-ops.com" };
  var NAV = [
    { label: "The Difference", href: "difference.html" },
    { label: "Why a Team",     href: "why-a-team.html" },
    { label: "How It Works",   href: "how-it-works.html" },
    { label: "What We Run",    href: "what-we-run.html" },
    { label: "About",          href: "about.html" }
  ];
  var TAGLINE = "Don\u2019t hire an assistant. Deploy a team.";
  /* ------------------------------------------------------------- */

  // Make sure the brand fonts are loaded (added once).
  if (!document.querySelector('link[data-uo-fonts]')) {
    var f = document.createElement('link');
    f.rel = 'stylesheet';
    f.setAttribute('data-uo-fonts', '');
    f.href = 'https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500;600;700;800&family=Inter:wght@400;500;600&display=swap';
    document.head.appendChild(f);
  }

  var current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

  function logo(uColor) {
    return '<svg viewBox="0 0 200 200" fill="none" aria-hidden="true">' +
      '<path d="M62 58 L62 116 C62 145 78 158 100 158 C122 158 138 145 138 116 L138 58" stroke="' + uColor + '" stroke-width="20" stroke-linecap="round" fill="none"/>' +
      '<path d="M74 70 L100 42 L126 70" stroke="#9A9A9A" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>';
  }

  /* ===================== HEADER ===================== */
  var headerCSS = `
    :host{display:block;font-family:'Inter',-apple-system,sans-serif;}
    *{box-sizing:border-box;margin:0;}
    .bar{position:sticky;top:0;z-index:1000;display:flex;align-items:center;justify-content:space-between;
      padding:13px 24px;background:rgba(255,255,255,.92);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);
      border-bottom:1px solid #E0E0E0;transition:box-shadow .25s;}
    .bar.scrolled{box-shadow:0 8px 24px -18px rgba(35,35,35,.4);}
    .brand{display:flex;align-items:center;gap:10px;text-decoration:none;flex:none;}
    .brand svg{width:27px;height:27px;display:block;}
    .wm{font-family:'Barlow',sans-serif;font-size:17px;letter-spacing:-.01em;color:#636363;font-weight:500;line-height:1;}
    .wm b{color:#232323;font-weight:700;}
    nav{display:flex;align-items:center;gap:26px;}
    nav a{font-size:14.5px;color:#444;text-decoration:none;letter-spacing:.005em;transition:color .2s;white-space:nowrap;}
    nav a:hover{color:#232323;}
    nav a.active{color:#232323;font-weight:600;}
    nav a.cta{background:#232323;color:#fff;padding:9px 18px;border-radius:10px;font-weight:600;}
    nav a.cta:hover{background:#000;}
    .burger{display:none;background:none;border:0;cursor:pointer;padding:6px;}
    .burger span{display:block;width:22px;height:2px;background:#232323;margin:4px 0;border-radius:2px;transition:.25s;}
    @media (max-width:880px){
      .burger{display:block;}
      nav{position:absolute;top:100%;left:0;right:0;flex-direction:column;align-items:stretch;gap:0;
        background:#fff;border-bottom:1px solid #E0E0E0;max-height:0;overflow:hidden;transition:max-height .3s ease;}
      nav.open{max-height:460px;}
      nav a{padding:15px 24px;border-top:1px solid #F3F3F2;font-size:15px;}
      nav a.cta{margin:14px 24px;border-radius:10px;text-align:center;padding:13px;}
      .burger.open span:nth-child(1){transform:translateY(6px) rotate(45deg);}
      .burger.open span:nth-child(2){opacity:0;}
      .burger.open span:nth-child(3){transform:translateY(-6px) rotate(-45deg);}
    }`;

  function navLinks() {
    var out = '';
    for (var i = 0; i < NAV.length; i++) {
      var n = NAV[i];
      var act = (n.href.toLowerCase() === current) ? ' class="active"' : '';
      out += '<a href="' + n.href + '"' + act + '>' + n.label + '</a>';
    }
    out += '<a class="cta" href="' + CTA.href + '">' + CTA.label + '</a>';
    return out;
  }

  class SiteHeader extends HTMLElement {
    connectedCallback() {
      var s = this.attachShadow({ mode: 'open' });
      s.innerHTML = '<style>' + headerCSS + '</style>' +
        '<div class="bar">' +
          '<a class="brand" href="' + HOME + '">' + logo('#232323') + '<span class="wm"><b>Upscale</b> Operations</span></a>' +
          '<button class="burger" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>' +
          '<nav>' + navLinks() + '</nav>' +
        '</div>';
      var bar = s.querySelector('.bar');
      var burger = s.querySelector('.burger');
      var nav = s.querySelector('nav');
      burger.addEventListener('click', function () {
        var open = nav.classList.toggle('open');
        burger.classList.toggle('open', open);
        burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      window.addEventListener('scroll', function () {
        bar.classList.toggle('scrolled', window.scrollY > 8);
      }, { passive: true });
    }
  }
  customElements.define('site-header', SiteHeader);

  /* ===================== FOOTER ===================== */
  var footerCSS = `
    :host{display:block;font-family:'Inter',sans-serif;}
    *{box-sizing:border-box;margin:0;}
    .ft{background:#232323;color:#C4C4C4;padding:56px 24px 30px;}
    .inner{max-width:1000px;margin:0 auto;}
    .top{display:flex;justify-content:space-between;gap:44px;flex-wrap:wrap;}
    .brand{display:flex;align-items:center;gap:11px;text-decoration:none;}
    .brand svg{width:30px;height:30px;display:block;}
    .wm{font-family:'Barlow',sans-serif;font-size:19px;letter-spacing:-.01em;color:#C4C4C4;font-weight:500;line-height:1;}
    .wm b{color:#fff;font-weight:700;}
    .tag{font-family:'Barlow',sans-serif;font-weight:300;font-size:16px;color:#9A9A9A;margin-top:14px;max-width:300px;line-height:1.4;}
    .cols{display:flex;gap:54px;flex-wrap:wrap;}
    .col h4{font-family:'Barlow',sans-serif;font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:#9A9A9A;font-weight:600;margin-bottom:14px;}
    .col a{display:block;color:#C4C4C4;text-decoration:none;font-size:14.5px;margin-bottom:10px;transition:color .2s;}
    .col a:hover{color:#fff;}
    .rule{height:1px;background:#444;margin:34px 0 20px;}
    .bottom{display:flex;justify-content:space-between;gap:14px;flex-wrap:wrap;font-size:13px;color:#9A9A9A;}
    .bottom a{color:#9A9A9A;text-decoration:none;}
    .bottom a:hover{color:#fff;}
    @media (max-width:620px){.top{gap:32px;}.cols{gap:38px;}}`;

  function footerNav() {
    var out = '';
    for (var i = 0; i < NAV.length; i++) {
      out += '<a href="' + NAV[i].href + '">' + NAV[i].label + '</a>';
    }
    return out;
  }

  class SiteFooter extends HTMLElement {
    connectedCallback() {
      var year = new Date().getFullYear();
      var s = this.attachShadow({ mode: 'open' });
      s.innerHTML = '<style>' + footerCSS + '</style>' +
        '<footer class="ft"><div class="inner">' +
          '<div class="top">' +
            '<div>' +
              '<a class="brand" href="' + HOME + '">' + logo('#FFFFFF') + '<span class="wm"><b>Upscale</b> Operations</span></a>' +
              '<p class="tag">' + TAGLINE + '</p>' +
            '</div>' +
            '<div class="cols">' +
              '<div class="col"><h4>Explore</h4>' + footerNav() + '</div>' +
              '<div class="col"><h4>Get in touch</h4>' +
                '<a href="mailto:' + EMAIL + '">' + EMAIL + '</a>' +
                '<a href="' + CTA.href + '">' + CTA.label + '</a>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="rule"></div>' +
          '<div class="bottom"><span>&copy; ' + year + ' Upscale Operations. All rights reserved.</span>' +
          '<a href="' + HOME + '">upscale-ops.com</a></div>' +
        '</div></footer>';
    }
  }
  customElements.define('site-footer', SiteFooter);
})();
