const fs = require('fs');

// Read current index.html and extract the main block
let html = fs.readFileSync("index.html", 'utf-8');

// Extract just the main content (strip outer boilerplate)
const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/);
if (!mainMatch) { console.error("No main found"); process.exit(1); }
let mainContent = mainMatch[1];

// ---- Full translation map ----
const T = {
  EN: [
    // 0-6: NAV
    "Home", "Appliances", "Brands", "About", "Reviews", "Contact", "Call Now",
    // 7-14: HERO
    "Montreal · Trusted local service",
    "Premium Appliances",
    "for Modern Living.",
    "Discover new and certified pre-owned appliances backed by exceptional customer service, professional delivery, and trusted after-sales support.",
    "Shop Appliances",
    "5.0 Google Rating",
    "Rated by local customers",
    "Professional Delivery",
    // 15
    "After-Sales Support",
    // 16-25: FEATURED
    "Featured Products",
    "Curated for your home.",
    "A glimpse of what is currently on the floor. Call us for live inventory and pricing.",
    "French-Door Refrigerator",
    "Spacious · Energy-efficient",
    "Call for price",
    "Certified Pre-owned",
    "Stainless Range",
    "5-burner · Convection oven",
    "Front-Load Washer",
    // 26-30
    "High-efficiency · Quiet",
    "Built-in Dishwasher",
    "Stainless tub · 44 dB",
    // 29-38: APPLIANCES
    "Everything for the modern home.",
    "A curated selection of new and certified pre-owned appliances from the brands you already trust.",
    "Refrigerators", "Washers", "Dryers", "Dishwashers", "Stoves", "Ovens", "Microwaves", "Freezers",
    // 39-47: WHY
    "Why Electro Legendre",
    "Built on service. Backed by trust.",
    "We believe buying an appliance should be straightforward, honest, and supported long after the sale.",
    "Premium Selection",
    "Hand-picked new and certified pre-owned appliances from the brands you already trust.",
    "Honest Pricing",
    "Transparent, fair prices with no surprises. We tell you exactly what you are paying for.",
    "Fast Delivery",
    "Professional delivery throughout Montreal and Quebec, scheduled around your day.",
    // 48-50
    "Exceptional Service",
    "A knowledgeable team that listens, advises, and helps you choose the right appliance.",
    "Real support after you buy — because the relationship begins with the purchase.",
    // 51-52
    "Experienced Team",
    "Years of experience serving Quebec families with appliances built to last.",
    // 53-55: BRANDS
    "Featured Brands",
    "The brands you already trust.",
    "We carry models from leading manufacturers, both in new and certified pre-owned condition.",
    // 56-70: REVIEWS
    "Customer Reviews",
    "Real stories from Montreal customers.",
    "23+ Google Reviews",
    "We are proud of the relationships we've built with our customers — and of the reviews they've taken the time to leave us.",
    "Great service before purchase and after. Genuinely refreshing.",
    "Refrigerator buyer",
    "Excellent after-sales support. They actually pick up the phone.",
    "Washer & dryer set",
    "Honest team — no upsell, just sound advice for our budget.",
    "Dishwasher buyer",
    "Fast delivery and the crew was careful with our floors.",
    "Stove + range hood",
    "Bought a used appliance in excellent condition. Looks brand new.",
    "Pre-owned freezer",
    "Highly recommended. Will be back for our next kitchen project.",
    // 71-72
    "Full kitchen package",
    "Read Google Reviews",
    // 73-74: ABOUT
    "A local Montreal business built on doing things the right way.",
    "Reliable after-sales support",
    // 75-78: CONTACT
    "Talk to a real person.",
    "We'd love to help you find the right appliance. Reach us by phone, WhatsApp, or email — or visit us in Montreal.",
    "Primary Line",
    "Secondary Line",
    // 79: 
    "Showroom",
    // 80-86: FOOTER
    "Premium new and certified pre-owned appliances, serving Montreal and Quebec with honest advice and reliable after-sales support.",
    "Quick Links",
    "Hours",
    "Mon - Fri",
    "Saturday",
    "Sunday",
    "Closed",
    // 87
    "All rights reserved.",
    // 88-89: misc
    "Opens in a new tab",
    "New",
    // 90-93: about section bullets
    "Serving Montreal & Quebec families",
    "Honest advice — no pressure",
    "Quality new & pre-owned appliances",
    "Call",
    // 94: review intro
    "Email",
  ],
  FR: [
    // 0-6: NAV
    "Accueil", "Électroménagers", "Marques", "À propos", "Avis", "Contact", "Appelez maintenant",
    // 7-14: HERO
    "Montréal · Service local de confiance",
    "Électroménagers premium",
    "pour la maison moderne.",
    "Découvrez des électroménagers neufs et d'occasion certifiés, soutenus par un service client exceptionnel, une livraison professionnelle et un service après-vente fiable.",
    "Voir les électroménagers",
    "5,0 note Google",
    "Noté par les clients locaux",
    "Livraison professionnelle",
    // 15
    "Service après-vente",
    // 16-25: FEATURED
    "Produits en vedette",
    "Sélectionnés pour votre maison.",
    "Un aperçu de ce qui est en magasin. Appelez-nous pour l'inventaire et les prix en temps réel.",
    "Réfrigérateur à portes françaises",
    "Spacieux · Écoénergétique",
    "Appelez pour le prix",
    "Occasion certifié",
    "Cuisinière en acier inoxydable",
    "5 brûleurs · Four à convection",
    "Laveuse à chargement frontal",
    // 26-30
    "Haute efficacité · Silencieuse",
    "Lave-vaisselle encastré",
    "Cuve inox · 44 dB",
    // 29-38: APPLIANCES
    "Tout pour la maison moderne.",
    "Une sélection soignée d'électroménagers neufs et d'occasion certifiés des marques auxquelles vous faites confiance.",
    "Réfrigérateurs", "Laveuses", "Sécheuses", "Lave-vaisselles", "Cuisinières", "Fours", "Micro-ondes", "Congélateurs",
    // 39-47: WHY
    "Pourquoi Electro Legendre",
    "Fondé sur le service. Soutenu par la confiance.",
    "Nous croyons que l'achat d'un électroménager devrait être simple, honnête et accompagné bien après la vente.",
    "Sélection premium",
    "Électroménagers neufs et d'occasion certifiés, sélectionnés avec soin parmi les marques auxquelles vous faites confiance.",
    "Prix honnêtes",
    "Des prix transparents et équitables, sans mauvaises surprises. Nous vous disons exactement ce que vous payez.",
    "Livraison rapide",
    "Livraison professionnelle dans tout Montréal et le Québec, planifiée selon votre horaire.",
    // 48-50
    "Service exceptionnel",
    "Une équipe compétente qui écoute, conseille et vous aide à choisir le bon électroménager.",
    "Un vrai soutien après votre achat — car la relation commence avec l'achat.",
    // 51-52
    "Équipe expérimentée",
    "Des années d'expérience au service des familles québécoises avec des appareils conçus pour durer.",
    // 53-55: BRANDS
    "Marques vedettes",
    "Les marques auxquelles vous faites déjà confiance.",
    "Nous proposons des modèles des principaux fabricants, en version neuve et d'occasion certifiée.",
    // 56-70: REVIEWS
    "Avis des clients",
    "Témoignages réels de clients montréalais.",
    "23+ avis Google",
    "Nous sommes fiers des relations établies avec nos clients — et des avis qu'ils ont pris le temps de nous laisser.",
    "Excellent service avant et après l'achat. Vraiment rafraîchissant.",
    "Acheteur de réfrigérateur",
    "Excellent service après-vente. Ils répondent vraiment au téléphone.",
    "Ensemble laveuse & sécheuse",
    "Équipe honnête — pas de vente forcée, juste de bons conseils pour notre budget.",
    "Acheteur de lave-vaisselle",
    "Livraison rapide et l'équipe a été soigneuse avec nos planchers.",
    "Cuisinière + hotte",
    "Acheté un appareil usagé en excellent état. Il semble tout neuf.",
    "Congélateur d'occasion",
    "Fortement recommandé. Nous reviendrons pour notre prochain projet de cuisine.",
    // 71-72
    "Ensemble cuisine complet",
    "Lire les avis Google",
    // 73-74: ABOUT
    "Une entreprise montréalaise bâtie sur des pratiques honnêtes et de qualité.",
    "Service après-vente fiable",
    // 75-78: CONTACT
    "Parlez à une vraie personne.",
    "Nous serions ravis de vous aider à trouver le bon appareil. Contactez-nous par téléphone, WhatsApp ou courriel — ou venez nous rendre visite à Montréal.",
    "Ligne principale",
    "Ligne secondaire",
    // 79:
    "Salle de montre",
    // 80-86: FOOTER
    "Électroménagers neufs et d'occasion certifiés, au service de Montréal et du Québec avec des conseils honnêtes et un soutien après-vente fiable.",
    "Liens rapides",
    "Heures d'ouverture",
    "Lun - Ven",
    "Samedi",
    "Dimanche",
    "Fermé",
    // 87
    "Tous droits réservés.",
    // 88-89: misc
    "Ouvre dans un nouvel onglet",
    "Nouveau",
    // 90-93
    "Au service des familles de Montréal & du Québec",
    "Conseils honnêtes — sans pression",
    "Appareils neufs & d'occasion de qualité",
    "Appeler",
    // 94
    "Courriel",
  ]
};

// --- CORE APPROACH ---
// Find every text node in the HTML (between > and <), normalize its whitespace,
// check against EN keys, and replace the raw text with a tagged span.

function normalizeWS(str) {
  return str.replace(/\s+/g, ' ').trim();
}

// Build a map: normalizedKey -> index (sorted by length desc to avoid partial replacements)
const lookup = {};
T.EN.forEach((key, idx) => {
  lookup[normalizeWS(key)] = idx;
});

// Process HTML: find text nodes, tag them
// We match everything between > and < that contains at least one letter
// Use multiline matching
let tagged = mainContent;

// Replace multi-line text nodes with tagged spans
// Strategy: replace >...< segments where the text content matches a translation
tagged = tagged.replace(/>([^<]{2,})</g, (match, rawText) => {
  const normalized = normalizeWS(rawText);
  if (normalized.length < 2) return match;
  
  if (lookup[normalized] !== undefined) {
    const idx = lookup[normalized];
    const indent = rawText.match(/^\s+/) ? rawText.match(/^\s+/)[0] : '';
    const trail = rawText.match(/\s+$/) ? rawText.match(/\s+$/)[0] : '';
    return `>${indent}<span data-i18n="${idx}">${normalized}</span>${trail}<`;
  }
  return match;
});

// Handle &amp; entities — they appear as HTML-encoded & in text nodes
tagged = tagged.replace(/>([ \t\n]*)Washer &amp; dryer set([ \t\n]*)</g, (_, a, b) => {
  const idx = T.EN.indexOf("Washer & dryer set");
  return `>${a}<span data-i18n="${idx}">Washer &amp; dryer set</span>${b}<`;
});
tagged = tagged.replace(/>([ \t\n]*)New &amp; Used([ \t\n]*)</g, (_, a, b) => {
  const idx = T.EN.indexOf("New & Used");
  if (idx >= 0) return `>${a}<span data-i18n="${idx}">New &amp; Used</span>${b}<`;
  return _;
});
tagged = tagged.replace(/>([ \t\n]*)Quality new &amp; pre-owned appliances([ \t\n]*)</g, (_, a, b) => {
  const idx = T.EN.indexOf("Quality new & pre-owned appliances");
  if (idx >= 0) return `>${a}<span data-i18n="${idx}">Quality new &amp; pre-owned appliances</span>${b}<`;
  return _;
});
tagged = tagged.replace(/>([ \t\n]*)Serving Montreal &amp; Quebec families([ \t\n]*)</g, (_, a, b) => {
  const idx = T.EN.indexOf("Serving Montreal & Quebec families");
  if (idx >= 0) return `>${a}<span data-i18n="${idx}">Serving Montreal &amp; Quebec families</span>${b}<`;
  return _;
});

// Count how many were tagged
const tagCount = (tagged.match(/data-i18n=/g) || []).length;
console.log(`Tagged ${tagCount} text nodes with data-i18n`);

// Lang buttons — ensure they have proper classes
const addLangClasses = (html) => {
  const lines = html.split('\n');
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    if (line.includes('aria-label="English"')) {
      // look back 1-2 lines for class
      for (let j = out.length - 1; j >= Math.max(0, out.length - 4); j--) {
        if (out[j].includes('class="') && !out[j].includes('lang-en-btn') && out[j].includes('px-2.5')) {
          out[j] = out[j].replace('class="', 'class="lang-en-btn ');
          break;
        }
        if (line.includes('class="') && !line.includes('lang-en-btn') && line.includes('px-2.5')) {
          line = line.replace('class="', 'class="lang-en-btn ');
          break;
        }
      }
    }
    if (line.includes('aria-label="Fran')) {
      for (let j = out.length - 1; j >= Math.max(0, out.length - 4); j--) {
        if (out[j].includes('class="') && !out[j].includes('lang-fr-btn') && out[j].includes('px-2.5')) {
          out[j] = out[j].replace('class="', 'class="lang-fr-btn ');
          break;
        }
        if (line.includes('class="') && !line.includes('lang-fr-btn') && line.includes('px-2.5')) {
          line = line.replace('class="', 'class="lang-fr-btn ');
          break;
        }
      }
    }
    out.push(line);
  }
  return out.join('\n');
};

tagged = addLangClasses(tagged);

// Verify buttons
const enBtns = (tagged.match(/lang-en-btn/g) || []).length;
const frBtns = (tagged.match(/lang-fr-btn/g) || []).length;
console.log(`lang-en-btn: ${enBtns}, lang-fr-btn: ${frBtns}`);

// Build JS
const script = `<script>
  var T_EN = ${JSON.stringify(T.EN)};
  var T_FR = ${JSON.stringify(T.FR)};

  function setLang(lang) {
    var T = lang === 'FR' ? T_FR : T_EN;
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
      var idx = parseInt(el.getAttribute('data-i18n'), 10);
      if (T[idx] !== undefined) el.textContent = T[idx];
    });
    document.querySelectorAll('.lang-en-btn').forEach(function(btn) {
      btn.className = lang === 'EN'
        ? 'lang-en-btn bg-neutral-900 text-white px-2.5 py-1 transition-colors'
        : 'lang-en-btn bg-transparent text-neutral-600 hover:text-neutral-900 px-2.5 py-1 transition-colors';
    });
    document.querySelectorAll('.lang-fr-btn').forEach(function(btn) {
      btn.className = lang === 'FR'
        ? 'lang-fr-btn bg-neutral-900 text-white px-2.5 py-1 transition-colors'
        : 'lang-fr-btn bg-transparent text-neutral-600 hover:text-neutral-900 px-2.5 py-1 transition-colors';
    });
    document.documentElement.lang = lang === 'FR' ? 'fr' : 'en';
  }

  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.lang-en-btn').forEach(function(btn) {
      btn.addEventListener('click', function() { setLang('EN'); });
    });
    document.querySelectorAll('.lang-fr-btn').forEach(function(btn) {
      btn.addEventListener('click', function() { setLang('FR'); });
    });
    var menuBtn = document.querySelector('[aria-label="Menu"]');
    var mobileMenu = document.getElementById('mobile-menu');
    if (menuBtn && mobileMenu) {
      menuBtn.addEventListener('click', function() { mobileMenu.classList.toggle('hidden'); });
      document.querySelectorAll('.mobile-link').forEach(function(l) {
        l.addEventListener('click', function() { mobileMenu.classList.add('hidden'); });
      });
    }
    setLang('EN');
  });
<\/script>`;

const finalHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Electro Legendre — Premium Appliances in Montreal | Électroménagers Montréal</title>
    <meta name="description" content="Electro Legendre — Premium new and certified pre-owned appliances in Montreal. Samsung, LG, Bosch, Whirlpool. Professional delivery & after-sales support. ⭐ 5.0/5 Google." />
    <script src="https://cdn.tailwindcss.com"><\/script>
    <style>
      @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap");
      body { font-family: "Inter", sans-serif; background-color: #ffffff; color: #171717; }
      .hairline { border-color: #e5e5e5; }
      .container-x { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }
      .display { font-family: "Inter", sans-serif; }
      html { scroll-behavior: smooth; }
    </style>
  </head>
  <body class="font-sans antialiased bg-white text-neutral-900">
<main class="min-h-screen bg-white text-neutral-900">
${tagged}
</main>
${script}
  </body>
</html>`;

fs.writeFileSync("index.html", finalHtml, 'utf-8');
console.log(`Final file: ${(Buffer.byteLength(finalHtml, 'utf-8')/1024).toFixed(1)} KB`);
console.log("Done!");
