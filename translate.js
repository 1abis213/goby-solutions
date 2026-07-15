const fs = require('fs');
const file = "c:\\Users\\abis\\Desktop\\Electro Legendre — Premium Appliances in Montreal_files\\rebuilt_site\\index.html";

let content = fs.readFileSync(file, 'utf-8');

// 1. Extract everything between <main and </main>
const mainRegex = /(<main[\s\S]*?<\/main>)/;
const match = content.match(mainRegex);
if (!match) {
    console.log("Main not found");
    process.exit(1);
}

let mainEn = match[1];

// 2. Fix images to external Unsplash placeholders so it is fully independent
mainEn = mainEn.replace(/src="\.\/Electro Legendre [^"]+"/g, (match) => {
    // Return a random appliance unsplash image based on an index
    const images = [
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80', // fridge/kitchen
        'https://images.unsplash.com/photo-1588854337115-1c67d9247e4d?w=800&q=80', // laundry
        'https://images.unsplash.com/photo-1623114112815-74a4b9fe505d?w=800&q=80', // stove
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80',
        'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=800&q=80'
    ];
    return `src="${images[Math.floor(Math.random() * images.length)]}"`;
});

// Also replace any other remaining local files or Webpack scripts just in case
mainEn = mainEn.replace(/href="\.\/[^"]+"/g, 'href="#"');

// 3. Create the French version
let mainFr = mainEn;

const translations = [
    ["Premium Appliances", "Électroménagers haut de gamme"],
    ["for Modern Living.", "pour une vie moderne."],
    ["Montreal · Trusted local service", "Montréal · Service local de confiance"],
    ["Discover new and certified pre-owned appliances backed by exceptional customer service, professional delivery, and trusted after-sales support.", "Découvrez des électroménagers neufs et d'occasion certifiés avec un service client exceptionnel, une livraison professionnelle et un service après-vente de confiance."],
    ["Shop Appliances", "Magasiner les Électroménagers"],
    ["Call Now", "Appelez maintenant"],
    ["Professional Delivery", "Livraison Professionnelle"],
    ["New &amp; Used", "Neuf et Usagé"],
    ["New & Used", "Neuf et Usagé"],
    ["After-Sales Support", "Service Après-Vente"],
    ["Featured Products", "Produits en Vedette"],
    ["Curated for your home.", "Sélectionnés pour votre maison."],
    ["A glimpse of what is currently on the floor. Call us for live inventory and pricing.", "Un aperçu de ce qui est actuellement en magasin. Appelez-nous pour l'inventaire en direct et les prix."],
    ["French-Door Refrigerator", "Réfrigérateur à Portes Françaises"],
    ["Spacious · Energy-efficient", "Spacieux · Écoénergétique"],
    ["Call for price", "Appelez pour le prix"],
    ["Stainless Range", "Cuisinière en Acier Inoxydable"],
    ["5-burner · Convection oven", "5 brûleurs · Four à convection"],
    ["Front-Load Washer", "Laveuse à Chargement Frontal"],
    ["High-efficiency · Quiet", "Haute efficacité · Silencieux"],
    ["Built-in Dishwasher", "Lave-vaisselle Encastré"],
    ["Stainless tub · 44 dB", "Cuve en acier inoxydable · 44 dB"],
    ["Appliances", "Électroménagers"],
    ["Everything for the modern home.", "Tout pour la maison moderne."],
    ["A curated selection of new and certified pre-owned appliances from the brands you already trust.", "Une sélection minutieuse d'électroménagers neufs et d'occasion certifiés des marques en lesquelles vous avez déjà confiance."],
    ["Refrigerators", "Réfrigérateurs"],
    ["Washers", "Laveuses"],
    ["Dryers", "Sécheuses"],
    ["Dishwashers", "Lave-vaisselles"],
    ["Stoves", "Cuisinières"],
    ["Ovens", "Fours"],
    ["Microwaves", "Micro-ondes"],
    ["Freezers", "Congélateurs"],
    ["Why Electro Legendre", "Pourquoi Electro Legendre"],
    ["Built on service. Backed by trust.", "Bâti sur le service. Soutenu par la confiance."],
    ["We believe buying an appliance should be straightforward, honest, and supported long after the sale.", "Nous croyons que l'achat d'un électroménager devrait être simple, honnête et soutenu longtemps après la vente."],
    ["Premium Selection", "Sélection Premium"],
    ["Hand-picked new and certified pre-owned appliances from the brands you already trust.", "Électroménagers neufs et d'occasion certifiés, choisis avec soin parmi vos marques de confiance."],
    ["Honest Pricing", "Prix Honnêtes"],
    ["Transparent, fair prices with no surprises. We tell you exactly what you are paying for.", "Des prix transparents et justes sans surprises. Nous vous disons exactement ce que vous payez."],
    ["Fast Delivery", "Livraison Rapide"],
    ["Professional delivery throughout Montreal and Quebec, scheduled around your day.", "Livraison professionnelle à travers Montréal et le Québec, planifiée selon votre horaire."],
    ["Exceptional Service", "Service Exceptionnel"],
    ["A knowledgeable team that listens, advises, and helps you choose the right appliance.", "Une équipe compétente qui écoute, conseille et vous aide à choisir le bon électroménager."],
    ["Real support after you buy — because the relationship begins with the purchase.", "Un vrai soutien après votre achat — car la relation commence avec l'achat."],
    ["Experienced Team", "Équipe Expérimentée"],
    ["Years of experience serving Quebec families with appliances built to last.", "Des années d'expérience au service des familles québécoises avec des appareils conçus pour durer."],
    ["Featured Brands", "Marques en Vedette"],
    ["The brands you already trust.", "Les marques en lesquelles vous avez déjà confiance."],
    ["We carry models from leading manufacturers, both in new and certified pre-owned condition.", "Nous proposons des modèles de fabricants reconnus, à la fois neufs et d'occasion certifiés."],
    ["Customer Reviews", "Avis Clients"],
    ["Real stories from Montreal customers.", "De vraies histoires de clients montréalais."],
    ["Showroom", "Salle de montre"],
    ["Quick Links", "Liens Rapides"],
    ["Hours", "Heures d'ouverture"],
    ["Mon - Fri", "Lun - Ven"],
    ["Saturday", "Samedi"],
    ["Sunday", "Dimanche"],
    ["Closed", "Fermé"],
    ["All rights reserved.", "Tous droits réservés."],
    [">Home<", ">Accueil<"],
    [">Brands<", ">Marques<"],
    [">About<", ">À propos<"],
    [">Reviews<", ">Avis<"],
    [">Contact<", ">Contact<"],
    ["New", "Nouveau"],
    ["Certified Pre-owned", "Occasion Certifié"],
    ["Email", "Courriel"],
    ["Call", "Appeler"]
];

for (let [en, fr] of translations) {
    // Replace globally
    mainFr = mainFr.split(en).join(fr);
}

// Modify IDs so they don't clash
mainEn = mainEn.replace('<main class=', '<main id="main-en" class=');
mainFr = mainFr.replace('<main class=', '<main id="main-fr" style="display: none;" class=');

// Replace the old main with both mains
const bothMains = mainEn + '\n' + mainFr;
content = content.replace(mainRegex, bothMains);

// Update JS for Language Toggle
const oldScriptRegex = /<script>[\s\S]*?function setLang[\s\S]*?<\/script>/;

const newScript = `
<script>
function setLang(lang) {
    const mainEn = document.getElementById('main-en');
    const mainFr = document.getElementById('main-fr');
    
    // Toggle main content visibility
    if (lang === 'FR') {
        if(mainEn) mainEn.style.display = 'none';
        if(mainFr) mainFr.style.display = 'block';
    } else {
        if(mainEn) mainEn.style.display = 'block';
        if(mainFr) mainFr.style.display = 'none';
    }

    // Update active state of buttons in BOTH mains
    const enBtns = document.querySelectorAll('.lang-btn-en, [aria-label="English"]');
    const frBtns = document.querySelectorAll('.lang-btn-fr, [aria-label^="Fran"]');
    
    if (lang === 'FR') {
        enBtns.forEach(btn => {
            btn.className = "bg-transparent text-neutral-600 hover:text-neutral-900 px-2.5 py-1 transition-colors";
        });
        frBtns.forEach(btn => {
            btn.className = "bg-neutral-900 text-white px-2.5 py-1 transition-colors";
        });
    } else {
        enBtns.forEach(btn => {
            btn.className = "bg-neutral-900 text-white px-2.5 py-1 transition-colors";
        });
        frBtns.forEach(btn => {
            btn.className = "bg-transparent text-neutral-600 hover:text-neutral-900 px-2.5 py-1 transition-colors";
        });
    }
}

// Mobile menu script for BOTH mains
function setupMobileMenu(mainElem) {
    if(!mainElem) return;
    const mobileMenuBtn = mainElem.querySelector('[aria-label="Menu"]');
    const mobileMenu = mainElem.querySelector('#mobile-menu');
    const mobileLinks = mainElem.querySelectorAll('.mobile-link');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.onclick = () => {
            mobileMenu.classList.toggle('hidden');
        };
        mobileLinks.forEach(link => {
            link.onclick = () => {
                mobileMenu.classList.add('hidden');
            };
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Setup mobile menu
    setupMobileMenu(document.getElementById('main-en'));
    setupMobileMenu(document.getElementById('main-fr'));
    
    // Default to EN
    setLang('EN');
});
</script>
`;

if (content.match(oldScriptRegex)) {
    content = content.replace(oldScriptRegex, newScript);
} else {
    // Just inject before </body>
    content = content.replace('</body>', newScript + '\n</body>');
}

fs.writeFileSync(file, content, 'utf-8');
console.log("Translated and images fixed!");
