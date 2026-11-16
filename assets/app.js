/* JNS Villa — script principal (contenu, galeries, chambres, avis, calendrier, formulaires WhatsApp, menu mobile).
   Chargé en « defer » : s'exécute après lecture de la page, avant effects.js et lang.js. */
const V=['accueil','villa','services','localisation','a-propos','contact'],$=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
/* ===== CONTACT : à remplir (ces 4 lignes suffisent) =====
   WA_NUM  : numéro WhatsApp, ex. '212612345678' ou '+212 6 12 34 56 78' (0612345678 marche aussi)
   PHONE   : numéro affiché sur la page Contact (facultatif)
   FORM_URL: (facultatif) adresse Formspree « https://formspree.io/f/xxxx » : le formulaire arrive alors dans votre boîte mail.
   Sans FORM_URL, le formulaire s'ouvre sur WhatsApp. */
const CONFIG={WA_NUM:'212680070446',PHONE:'',FORM_URL:''};
const P={
 booking:{src:'https://cf.bstatic.com/xdata/images/hotel/270x270/889034421.jpg?k=20c29efba55350d4b4e1084c95cf99178732ca8de2817a3defebc0c839f61e54&o=',alt:'Extérieur et piscine de JNS Villa — Booking.com'},
 pool:{src:'https://media.vrbo.com/lodging/134000000/133750000/133747700/133747650/ad21bb34.jpg?impolicy=resizecrop&ra=fit&rw=297',alt:'Piscine et terrasse de JNS Villa — Vrbo / Expedia'},
 bedroomView:{src:'https://media.vrbo.com/lodging/134000000/133750000/133747700/133747650/79ca032d.jpg?impolicy=resizecrop&ra=fit&rw=598',alt:'Chambre avec vue sur la piscine de JNS Villa — Vrbo / Expedia'},
 lounge:{src:'https://media.vrbo.com/lodging/134000000/133750000/133747700/133747650/1471b9af.jpg?impolicy=resizecrop&ra=fit&rw=297',alt:'Espace intérieur de JNS Villa — Vrbo / Expedia'},
 bedroom2:{src:'https://media.vrbo.com/lodging/134000000/133750000/133747700/133747650/0947ed9e.jpg?impolicy=resizecrop&ra=fit&rw=297',alt:'Chambre de JNS Villa — Vrbo / Expedia'},
 kitchen:{src:'https://media.vrbo.com/lodging/134000000/133750000/133747700/133747650/9cca3634.jpg?impolicy=resizecrop&ra=fit&rw=297',alt:'Cuisine équipée de JNS Villa — Vrbo / Expedia'},
 airbnb1:{src:'https://a0.muscache.com/im/pictures/hosting/Hosting-1715934306963869229/original/6ae4a567-016e-405c-82a4-08e22ee69a8e.jpeg?im_w=720',alt:'Vue de JNS Villa — Airbnb'},
 airbnb2:{src:'https://a0.muscache.com/im/pictures/hosting/Hosting-1715934306963869229/original/ae14bc08-3837-4bda-8472-5eaa0c32de9f.jpeg?im_w=720',alt:'Photo de JNS Villa — Airbnb'},
 airbnb3:{src:'https://a0.muscache.com/im/pictures/hosting/Hosting-1715934306963869229/original/0eae83ea-4e9f-490e-9ad4-ed6669c92542.jpeg?im_w=720',alt:'Photo de JNS Villa — Airbnb'},
 airbnb4:{src:'https://a0.muscache.com/im/pictures/hosting/Hosting-1715934306963869229/original/ed01b19c-3b82-4af4-b0ee-a46273af1cb2.jpeg?im_w=720',alt:'Photo de JNS Villa — Airbnb'},
 airbnb5:{src:'https://a0.muscache.com/im/pictures/hosting/Hosting-1715934306963869229/original/1f662d29-f051-42d7-9da1-163ae9ccfdee.jpeg?im_w=720',alt:'Photo de JNS Villa — Airbnb'},
 room1:{src:'https://a0.muscache.com/im/pictures/hosting/Hosting-1715934306963869229/original/27bdcf84-d8fa-4f47-8088-7b371696a6a7.jpeg?im_w=720',alt:'Chambre 4 de JNS Villa — Airbnb'},
 room2:{src:'https://a0.muscache.com/im/pictures/hosting/Hosting-1715934306963869229/original/3eedb640-8131-4727-bd01-4dd4c811467f.jpeg?im_w=720',alt:'Chambre 2 de JNS Villa — Airbnb'},
 room3:{src:'https://a0.muscache.com/im/pictures/hosting/Hosting-1715934306963869229/original/d1ff5a2f-1b18-43ea-ab93-3f876e5c8058.jpeg?im_w=720',alt:'Chambre 3 de JNS Villa — Airbnb'},
 room4:{src:'https://a0.muscache.com/im/pictures/hosting/Hosting-1715934306963869229/original/e1916e40-a365-4405-9d59-ddb7005eca54.jpeg?im_w=720',alt:'Chambre 1 de JNS Villa — Airbnb'},
 villaChaises:{src:'assets/villa/chaises-longues-jardin.jpg',alt:'Chaises longues en bois et corde verte, avec serviettes roulées, sous un parasol en paille face au jardin'},
 villaTerrasse:{src:'assets/villa/terrasse-piscine.jpg',alt:'Terrasse, pergola ombragée, chaises longues et piscine privée de la JNS Villa'},
 equipe:{src:'assets/services/equipe.jpg',alt:'Équipe de service souriante : chef cuisinier, personnel de maison et réceptionniste'},
 famille:{src:'assets/services/famille.jpg',alt:'Famille souriante avec son chien golden retriever, installée sur un canapé blanc'},
 host:{src:'assets/host-ayoub.jpg',alt:'Votre hôte Ayoub, au bord de l’eau, un enfant dans les bras'}
};
const imgHTML=(p)=>`<img src="${p.src}" alt="${p.alt}" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror="this.style.display='none';this.parentElement.classList.add('photo-error')">`;
const putPhoto=(el,p)=>{if(el){el.innerHTML=imgHTML(p);el.classList.add('photo-filled');}};
const photoLink=(p)=>`<a href="${p.src}" target="_blank" rel="noopener noreferrer" aria-label="${p.alt}">${imgHTML(p)}</a>`;
const IC={villa:'<svg width="40" height="40" viewBox="0 0 34 34"><path d="M17 33V15M17 15C12 9 7 10 4 13M17 15c5-6 10-5 13-2M17 15c-3-4-3-9 0-12M17 15c3-4 3-9 0-12"/></svg>',
services:'<svg width="50" height="32" viewBox="0 0 50 32"><circle cx="25" cy="16" r="13.5"/><circle cx="25" cy="16" r="8.5"/><path d="M2 3v8a3 3 0 0 0 6 0V3M5 3v9M5 14v15M47 29V3c-3 2-5 6-5 12v6h5"/></svg>',
localisation:'<svg width="42" height="39" viewBox="0 0 42 39"><path d="M5 17C5 12 8 8 12 8c3 0 5 3 8 5s5 1 6-2 2-6 4-7l3-1c2-1 4 0 5 2l2 2c1 1 0 3-2 3h-4c-2 0-3 1-3 3 0 3-1 6-2 9v15h-3V27H9v10H6V24c-1-2-1-5-1-7zM5 17c-1 1-2 3-2 5M13 27v10M22 27v10"/></svg>',
'a-propos':'<svg width="32" height="46" viewBox="0 0 32 46"><path d="M12 44.500V9a4 4 0 0 1 8 0v35.500M12 31H8a3 3 0 0 1-3-3v-8a2.500 2.500 0 0 1 5 0v5h2M20 26h4a3 3 0 0 0 3-3v-8a2.500 2.500 0 0 0-5 0v5h-2M7 44.500h18M16 5V1.500M12.500 3.200 14 5M19.500 3.200 18 5"/></svg>',
contact:'<svg width="37" height="37" viewBox="0 0 37 37"><rect x="3" y="4" width="31" height="7" rx="3.500"/><path d="M8 11 5 30.500c-.3 1.700 1 3.200 2.700 3.200h21.600c1.700 0 3-1.500 2.700-3.200L29 11"/><circle cx="18.500" cy="22.500" r="8"/><circle cx="18.500" cy="22.500" r="2.200"/><circle cx="18.500" cy="22.500" r="5.300" stroke-dasharray="0 4.160" stroke-width="2"/></svg>'};
const FL=[['a-propos','À propos'],['services','Services'],['localisation','Localisation'],['contact','Contact']];
const G=(rows,photos)=>{let n=0;return rows.map(([h,...c])=>`<div class="gr" style="grid-template-columns:${c.map(x=>Math.abs(x)+'fr').join(' ')};height:${h}vw">${c.filter(x=>x>0).map(()=>{const p=photos[n++%photos.length];return `<div>${photoLink(p)}</div>`}).join('')}</div>`).join('')};
const homePhotos=[P.booking,P.pool,P.bedroomView,P.lounge,P.bedroom2,P.kitchen,P.airbnb1,P.airbnb2,P.airbnb3,P.airbnb4,P.airbnb5,P.room1];
const servicePhotos=[P.kitchen,P.lounge,P.pool,P.bedroomView,P.airbnb2,P.airbnb3,P.room1,P.room2];
const locationPhotos=[
 {src:'assets/localisation/01-gnaoua.jpg',alt:'Musiciens gnaoua en tenues jaunes brodées, krakebs en main, dans une rue d’Essaouira'},
 {src:'assets/localisation/02-cheval-plage.jpg',alt:'Balade à cheval au bord de l’eau, sur la plage au coucher du soleil'},
 {src:'assets/localisation/03-medina-ruelle.jpg',alt:'Ruelle commerçante de la médina d’Essaouira, entre remparts de pierre et façades blanches et bleues'},
 {src:'assets/localisation/04-dromadaires-plage.jpg',alt:'Dromadaires sur la plage, sous un grand ciel bleu'},
 {src:'assets/localisation/05-port-barques.jpg',alt:'Barques de pêche bleues amarrées devant les remparts du port d’Essaouira'},
 {src:'assets/localisation/06-dromadaire-surf.jpg',alt:'Balade à dos de dromadaire avec une planche de surf, sur les dunes face à l’océan'},
 {src:'assets/localisation/07-artisanat-bois.jpg',alt:'Étal d’artisanat en bois de thuya : boîtes marquetées, sabliers, bols et mortiers'},
 {src:'assets/localisation/08-surfeurs.jpg',alt:'Deux surfeurs, planche sous le bras, sur la plage'},
 {src:'assets/localisation/09-cours-surf.jpg',alt:'Cours de surf sur la plage : planches disposées en cercle autour du moniteur et des élèves'}
];
const contactPhotos=[P.host,P.booking,P.airbnb1,P.pool,P.airbnb2,P.lounge,P.airbnb3,P.bedroom2,P.kitchen];
$('#g3').innerHTML=G([[29.7,667,562,750,562,667],[34.3,750,750,750,562]],locationPhotos);
/* Chambres : une photo par chambre + fenêtre « En savoir plus » (équipements de la chambre).
   Pour préciser une chambre (type de lit, vue, salle de douche…), ajouter une ligne dans son champ « plus ». */
const EQ=['Climatisation','Linge de lit fourni','Armoire ou penderie','Prise près du lit','Serviettes et peignoirs fournis','Sèche-cheveux dans les salles de douche','Wi-Fi gratuit','Rangement de la chambre et changement des draps inclus','Lit bébé sur demande, gratuit selon disponibilité'];
const ROOMS=[
 {t:'Chambre 1',lit:'1 lit queen size',
  d:'Chambre climatisée avec un lit queen size, de grandes baies vitrées sur la terrasse et la piscine, une télévision, une penderie avec cintres et des rideaux occultants.',
  eq:['Lit queen size','Cintres','Climatisation','Espace de rangement pour les vêtements','Linge de lit','Produits de base','Stores ou rideaux occultants','Télévision'],
  ph:[
   {src:'assets/chambres/ch1-01.jpg',alt:'Chambre 1 de JNS Villa : lit, penderie et baies vitrées sur la piscine'},
   {src:'assets/chambres/ch1-02.jpg',alt:'Chambre 1 de JNS Villa : lit queen size et porte-fenêtre sur la terrasse'},
   {src:'assets/chambres/ch1-03.jpg',alt:'Chambre 1 de JNS Villa : tête de lit en bois et décoration en paille tressée'},
   {src:'assets/chambres/ch1-04.jpg',alt:'Chambre 1 de JNS Villa : télévision, penderie et vue sur la piscine'}]},
 {t:'Chambre 2',lit:'1 lit king size',
  d:'Chambre climatisée avec un lit king size, une fenêtre ouverte sur la verdure, une télévision, une penderie avec cintres et peignoirs, et une salle de douche attenante avec douche à l’italienne.',
  eq:['Lit king size','Cintres','Climatisation','Espace de rangement pour les vêtements','Linge de lit','Produits de base','Télévision'],
  ph:[
   {src:'assets/chambres/ch2-01.jpg',alt:'Chambre 2 de JNS Villa : lit king size, chapeaux de paille au mur et fenêtre sur la verdure'},
   {src:'assets/chambres/ch2-02.jpg',alt:'Chambre 2 de JNS Villa : tête de lit en bois, coussins et chapeaux de paille tressée'},
   {src:'assets/chambres/ch2-03.jpg',alt:'Chambre 2 de JNS Villa : lit, tapis tissés, penderie et télévision'},
   {src:'assets/chambres/ch2-04.jpg',alt:'Chambre 2 de JNS Villa : grand lit, penderie et porte de la salle de douche'},
   {src:'assets/chambres/ch2-05.jpg',alt:'Chambre 2 de JNS Villa : télévision, lampe en branche d’arbre et penderie avec peignoirs'},
   {src:'assets/chambres/ch2-06.jpg',alt:'Chambre 2 de JNS Villa : penderie avec peignoirs et fenêtre sur les arbres'},
   {src:'assets/chambres/ch2-07.jpg',alt:'Chambre 2 de JNS Villa : penderie avec cintres, coussins et panier tressé'},
   {src:'assets/chambres/ch2-08.jpg',alt:'Chambre 2 de JNS Villa : coussins en laine à pompons et plaid rayé'},
   {src:'assets/chambres/ch2-09.jpg',alt:'Chambre 2 de JNS Villa : douche à l’italienne avec niche de rangement et miroir rond'},
   {src:'assets/chambres/ch2-10.jpg',alt:'Chambre 2 de JNS Villa : salle de douche avec toilettes, lavabo et miroir rond'}]},
 {t:'Chambre 3',lit:'1 lit queen size',plus:['1 lit queen size (grand lit double)'],
  d:'Chambre climatisée avec un lit queen size, une grande baie vitrée sur le jardin et des rideaux occultants, une télévision, un espace de rangement et une salle de douche attenante.',
  eq:['Lit queen size','Cintres','Climatisation','Espace de rangement pour les vêtements','Linge de lit','Produits de base','Stores ou rideaux occultants','Télévision'],
  ph:[
   {src:'assets/chambres/ch3-01.jpg',alt:'Chambre 3 de JNS Villa : lit, grande baie vitrée sur la verdure, télévision et rangement'},
   {src:'assets/chambres/ch3-02.jpg',alt:'Chambre 3 de JNS Villa : lit avec tête de lit en bois, coussins et tapis tissés'},
   {src:'assets/chambres/ch3-03.jpg',alt:'Chambre 3 de JNS Villa : lit et porte-fenêtre coulissante sur le jardin'},
   {src:'assets/chambres/ch3-04.jpg',alt:'Chambre 3 de JNS Villa : lit, télévision et portes de la chambre'},
   {src:'assets/chambres/ch3-05.jpg',alt:'Chambre 3 de JNS Villa : lit, porte-manteau en bois et salle de douche avec toilettes'}]},
 {t:'Chambre 4',lit:'2 lits simples',
  d:'Chambre climatisée avec deux lits simples, une télévision, une penderie avec cintres, un store occultant et une salle de douche attenante.',
  eq:['2 lits simples','Cintres','Climatisation','Espace de rangement pour les vêtements','Linge de lit','Produits de base','Stores ou rideaux occultants','Télévision'],
  ph:[
   {src:'assets/chambres/ch4-01.jpg',alt:'Chambre 4 de JNS Villa : deux lits simples, télévision, store et penderie'},
   {src:'assets/chambres/ch4-02.jpg',alt:'Chambre 4 de JNS Villa : deux lits simples, penderie et salle de douche avec toilettes'}]},
/* Living room : pour ajouter des photos, ajouter une ligne {src:'assets/salon/salon-02.jpg',alt:'Living room de JNS Villa : …'} dans « ph ». */
 {t:'Living room',box:'living',mt:'Équipements du living room',lit:'Canapé d’angle · Télévision · Streaming',
  d:'Grand salon lumineux avec un canapé d’angle, de grandes baies vitrées habillées de rideaux, la climatisation, une télévision à écran plat et le streaming. Un coin détente avec coussins de sol, et juste dehors, un salon en bois sur la terrasse couverte.',
  eq:['Canapé d’angle','Grandes baies vitrées avec rideaux','Climatisation','Télévision à écran plat','Streaming','Coin détente avec coussins de sol','Salon en bois sur la terrasse couverte','Wi-Fi gratuit'],
  ph:[
   {src:'assets/salon/salon-01.jpg',alt:'Living room de JNS Villa : grand canapé d’angle, baies vitrées avec rideaux, télévision et climatisation'},
   {src:'assets/salon/salon-02.jpg',alt:'Living room de JNS Villa : canapé d’angle, tapis gris, poufs et suspension en rotin'},
   {src:'assets/salon/salon-03.jpg',alt:'Living room de JNS Villa : grand canapé d’angle, table basse et rideaux légers'},
   {src:'assets/salon/salon-04.jpg',alt:'Living room de JNS Villa : télévision à écran plat, meuble en bois et baies vitrées sur la terrasse'},
   {src:'assets/salon/salon-05.jpg',alt:'Living room de JNS Villa : détail du canapé, coussins et vase décoratif'},
   {src:'assets/salon/salon-06.jpg',alt:'Coin détente du living room de JNS Villa : miroir en bois, coussins de sol et porte-fenêtre sur la terrasse'},
   {src:'assets/salon/salon-07.jpg',alt:'Salon en bois sur la terrasse couverte de JNS Villa, à côté du living room'}]},
/* Kitchen : pour ajouter des photos, ajouter une ligne {src:'assets/cuisine/kitchen-03.jpg',alt:'Cuisine de JNS Villa : …'} dans « ph ». */
 {t:'Kitchen',box:'kitchen',mt:'Équipements de la cuisine',lit:'Réfrigérateur américain · Four · Machine à café',
  d:'Cuisine entièrement équipée avec réfrigérateur américain à distributeur d’eau, plaque de cuisson, four et micro-ondes, lave-linge, machine à café expresso et coin thé-café. Le petit-déjeuner à la carte est servi sur place.',
  eq:['Réfrigérateur américain avec distributeur d’eau','Plaque de cuisson','Four','Micro-ondes','Hotte aspirante','Lave-vaisselle','Lave-linge','Machine à café expresso','Bouilloire','Évier avec robinet mitigeur','Petit-déjeuner à la carte servi sur place'],
  ph:[
   {src:'assets/cuisine/kitchen-01.jpg',alt:'Cuisine de JNS Villa : plans de travail noirs, réfrigérateur américain, four encastré, plaque de cuisson et lave-linge'},
   {src:'assets/cuisine/kitchen-02.jpg',alt:'Cuisine de JNS Villa : machine à café expresso, robinet noir, crédence en marbre et pots thé, sucre, café'}]},
/* Bathrooms : pour ajouter des photos, ajouter une ligne {src:'assets/bathrooms/bathroom-07.jpg',alt:'Salle de bain de JNS Villa : …'} dans « ph ». */
 {t:'Bathrooms',box:'bathrooms',mt:'Équipements des salles de bain',lit:'5 salles de bain · Eau chaude',
  d:'Cinq salles de bain avec eau chaude, douche à l’italienne avec pommeau de pluie, lavabo suspendu et miroir rond. Gel douche, shampoing, savon pour le corps et produits de nettoyage sont fournis.',
  eq:['5 salles de bain','Eau chaude','Gel douche','Shampoing','Savon pour le corps','Produits de nettoyage','Douche à l’italienne avec pommeau de pluie','Sèche-cheveux'],
  ph:[
   {src:'assets/bathrooms/bathroom-01.jpg',alt:'Salle de bain de JNS Villa : douche à l’italienne avec niche de rangement, WC, lavabo et miroir rond'},
   {src:'assets/bathrooms/bathroom-02.jpg',alt:'Salle de bain de JNS Villa : lavabo, miroir rond en bois, WC et douche avec pommeau de pluie'},
   {src:'assets/bathrooms/bathroom-03.jpg',alt:'Salle de bain de JNS Villa : douche avec pommeau de pluie, niche de rangement et miroir rond'},
   {src:'assets/bathrooms/bathroom-04.jpg',alt:'Salle de bain de JNS Villa : vue d’ensemble avec douche, WC et lavabo'},
   {src:'assets/bathrooms/bathroom-05.jpg',alt:'Salle de bain de JNS Villa : lavabo suspendu, miroir rond, serviette roulée et WC'},
   {src:'assets/bathrooms/bathroom-06.jpg',alt:'Salle de bain de JNS Villa : douche, niches de rangement, WC et lavabo'}]},
/* Back garden : pour ajouter des photos, ajouter une ligne {src:'assets/garden/garden-12.jpg',alt:'Back garden de JNS Villa : …'} dans « ph ». */
 {t:'Back garden',box:'bgarden',mt:'Équipements du jardin',lit:'Chaises longues · Douche extérieure · Barbecue',
  d:'Jardin et terrasse autour de la piscine : chaises longues avec parasols et serviettes, douche extérieure, grill barbecue, coin repas en plein air sous la pergola et mobilier d’extérieur en bois.',
  eq:['Chaises longues','Grill barbecue','Douche extérieure','Coin repas en plein air','Mobilier d’extérieur'],
  ph:[
   {src:'assets/garden/garden-01.jpg',alt:'Back garden de JNS Villa : piscine, terrasse couverte, chaises longues et parasols en paille'},
   {src:'assets/garden/garden-02.jpg',alt:'Back garden de JNS Villa : façade, terrasse couverte et piscine face au jardin'},
   {src:'assets/garden/garden-03.jpg',alt:'Back garden de JNS Villa : piscine, terrasse couverte, chaises longues et parasols'},
   {src:'assets/garden/garden-04.jpg',alt:'Back garden de JNS Villa : terrasse couverte avec coin repas, piscine et pelouse'},
   {src:'assets/garden/garden-05.jpg',alt:'Back garden de JNS Villa : vue du dessus sur la piscine, la pelouse, les chaises longues et la douche extérieure'},
   {src:'assets/garden/garden-06.jpg',alt:'Back garden de JNS Villa : trois chaises longues avec serviettes sous un parasol en paille'},
   {src:'assets/garden/garden-07.jpg',alt:'Back garden de JNS Villa : chaises longues tressées au bord de la piscine et terrasse couverte'},
   {src:'assets/garden/garden-08.jpg',alt:'Back garden de JNS Villa : terrasse couverte avec grande table à manger en plein air'},
   {src:'assets/garden/garden-09.jpg',alt:'Back garden de JNS Villa : fauteuils et canapé en bois autour d’une table basse sur la terrasse'},
   {src:'assets/garden/garden-10.jpg',alt:'Back garden de JNS Villa : canapé, tabourets en paille et table basse en bois sur la terrasse'},
   {src:'assets/garden/garden-11.jpg',alt:'Back garden de JNS Villa : fauteuil suspendu en rotin dans le jardin'}]},
/* Exterior : pour ajouter des photos, ajouter une ligne {src:'assets/exterior/exterior-07.jpg',alt:'Exterior de JNS Villa : …'} dans « ph ». */
 {t:'Exterior',box:'exterior',mt:'Équipements de l’extérieur',lit:'Portail privé · Parking gratuit · Entrée abritée',
  d:'L’arrivée à la JNS Villa : portail privé, grande cour en gravier avec arbres pour se garer, et entrée abritée par un auvent. Un escalier extérieur mène au toit.',
  eq:['Portail privé','Cour en gravier avec arbres','Parking privé gratuit sur place','Entrée abritée','Escalier extérieur vers le toit'],
  ph:[
   {src:'assets/exterior/exterior-01.jpg',alt:'Exterior de JNS Villa : façade et entrée, palmier et plantes en pots devant la cour en gravier'},
   {src:'assets/exterior/exterior-02.jpg',alt:'Exterior de JNS Villa : villa vue depuis la cour en gravier, arbres et parking'},
   {src:'assets/exterior/exterior-03.jpg',alt:'Exterior de JNS Villa : façade, entrée abritée, palmiers et plantes en pots'},
   {src:'assets/exterior/exterior-04.jpg',alt:'Exterior de JNS Villa : entrée abritée avec porte d’entrée, cactus et plantes en pots'},
   {src:'assets/exterior/exterior-05.jpg',alt:'Exterior de JNS Villa : portail privé et mur en pierre avec l’enseigne JNS Villa'},
   {src:'assets/exterior/exterior-06.jpg',alt:'Exterior de JNS Villa : escalier extérieur avec rampe en métal qui mène au toit'}]}
];
/* GALERIE : « ph » = photos de la chambre, la 1re est la photo principale (la plus belle).
   Pour ajouter des photos : {src:'assets/chambres/ch4-02.jpg',alt:'Chambre 4 de JNS Villa'} dans le tableau « ph ». */
const big=s=>s.replace('im_w=720','im_w=1440'),mid=s=>s.replace('im_w=720','im_w=1200'),sm=s=>s.replace('im_w=720','im_w=240');
const rImg=(p,w,alt)=>`<img src="${w(p.src)}" alt="${alt}" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror="if(!this.dataset.f){this.dataset.f=1;this.src='${p.src}'}else{this.style.display='none';this.parentElement.classList.add('photo-error')}">`;
const AL='<svg viewBox="0 0 16 30" aria-hidden="true"><path d="M13 2 3 15l10 13"/></svg>',AR='<svg viewBox="0 0 16 30" aria-hidden="true"><path d="M3 2l10 13L3 28"/></svg>',ZM='<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M2 7V2h5M13 2h5v5M18 13v5h-5M7 18H2v-5"/></svg>';
const gal=(r,i)=>{const n=r.ph.length,alt=(p,k)=>p.alt.replace(/ — Airbnb$/,'')+(n>1?' — photo '+(k+1):'');
 return `<div class="rg-w"><div class="ph rg"><div class="rg-t" tabindex="0" role="group" aria-roledescription="carrousel" aria-label="Photos de ${r.t}">${r.ph.map((p,k)=>`<div class="rg-s" data-k="${k}" role="group" aria-label="${k+1} sur ${n}">${rImg(p,mid,alt(p,k))}</div>`).join('')}</div>${n>1?`<button type="button" class="rg-ar rg-p" aria-label="Photo précédente" disabled>${AL}</button><button type="button" class="rg-ar rg-n" aria-label="Photo suivante">${AR}</button><span class="rg-c" aria-live="polite">1/${n}</span>`:''}<button type="button" class="rg-z" aria-label="Agrandir la photo">${ZM}</button></div>${n>1?`<div class="rg-th">${r.ph.map((p,k)=>`<button type="button" class="rg-tb${k?'':' on'}" data-k="${k}" aria-label="Voir la photo ${k+1}">${rImg(p,sm,'')}</button>`).join('')}</div>`:''}</div>`};
const card=(r,i)=>`<div class="rm" data-room="${i}">${gal(r,i)}<div class="t"><h3>${r.t}</h3><small>${r.box?r.lit:`<span class="sp sp-bed">${r.lit}</span><span class="sp sp-ac">Climatisation : Oui</span>`}</small><p>${r.d||'Chambre climatisée avec '+r.lit.replace(/^1 /,'un ').replace(/^2 /,'deux ')+', linge de lit fourni, armoire ou penderie et prise près du lit.'}</p><div class="rm-ac"><button type="button" class="bt rm-more" data-room="${i}" aria-haspopup="dialog">En savoir plus &gt;</button></div></div></div>`;
$('#rooms').innerHTML=ROOMS.map((r,i)=>r.box?'':card(r,i)).join('');
['living','kitchen','bathrooms','bgarden','exterior'].forEach(k=>{$('#'+k).innerHTML=ROOMS.map((r,i)=>r.box===k?card(r,i):'').join('')});
/* Galeries « Galerie photos > » (version téléphone de la page Villa) : 2 jeux de photos locales, ouverts dans la visionneuse */
(()=>{const g=(f,a)=>({src:'assets/'+f,alt:a});
const inside=[['villa/terrasse-piscine.jpg','Terrasse, pergola et piscine privée'],['salon/salon-01.jpg','Grand salon avec canapé d’angle'],['salon/salon-03.jpg','Salon lumineux'],['salon/salon-04.jpg','Salon et télévision'],['cuisine/kitchen-01.jpg','Cuisine équipée'],['cuisine/table-terrasse.jpg','Repas sur la terrasse'],['chambres/ch1-01.jpg','Chambre 1'],['chambres/ch2-01.jpg','Chambre 2'],['chambres/ch3-01.jpg','Chambre 3'],['chambres/ch4-01.jpg','Chambre 4']];
const outside=[['villa/chaises-longues-jardin.jpg','Chaises longues dans le jardin'],['garden/garden-01.jpg','La villa et la piscine'],['garden/garden-04.jpg','Façade et pergola'],['garden/garden-05.jpg','Piscine vue du dessus'],['garden/garden-06.jpg','Chaises longues au soleil'],['garden/garden-07.jpg','Terrasse sous la pergola'],['garden/garden-08.jpg','Pergola ombragée'],['garden/garden-09.jpg','Salon extérieur'],['garden/garden-10.jpg','Coin repas en plein air'],['garden/garden-11.jpg','Fauteuil suspendu dans le jardin'],['exterior/exterior-01.jpg','Cour en gravier et parking'],['exterior/exterior-04.jpg','Entrée abritée'],['exterior/exterior-05.jpg','Portail privé']];
window.GAL=[inside,outside].map(l=>ROOMS.push({t:'Galerie photos',gal:1,ph:l.map(x=>g(...x))})-1)})();
/* Alternance globale : living room à gauche, kitchen à droite, puis chambres, etc. Le titre de chaque bloc suit le côté de sa photo. */
(()=>{const ids=['living','kitchen','rooms','bathrooms','bgarden','exterior'];let n=0;ids.forEach(id=>{const box=$('#'+id);if(!box)return;const cards=[...box.querySelectorAll('.rm')];if(!cards.length)return;const head=box.previousElementSibling;if(head&&head.classList.contains('c'))head.classList.toggle('flip',n%2===1);cards.forEach(c=>{c.classList.toggle('flip',n%2===1);n++})})})();
/* Défilement de la galerie : flèches, vignettes, compteur, balayage tactile */
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const gIdx=w=>{const t=w.querySelector('.rg-t');return Math.round(t.scrollLeft/t.clientWidth)};
const gGo=(w,k,instant)=>{const t=w.querySelector('.rg-t'),n=t.children.length;k=Math.max(0,Math.min(n-1,k));t.scrollTo({left:k*t.clientWidth,behavior:instant||reduce?'auto':'smooth'})};
const gSync=w=>{const t=w.querySelector('.rg-t'),n=t.children.length,k=gIdx(w),c=w.querySelector('.rg-c');if(!c)return;c.textContent=(k+1)+'/'+n;w.querySelector('.rg-p').disabled=k<=0;w.querySelector('.rg-n').disabled=k>=n-1;const th=w.querySelector('.rg-th');[...th.children].forEach((b,j)=>{b.classList.toggle('on',j===k);if(j===k)th.scrollTo({left:b.offsetLeft-(th.clientWidth-b.clientWidth)/2,behavior:'auto'})})};
$('#spaces').addEventListener('scroll',e=>{const t=e.target;if(!t.classList||!t.classList.contains('rg-t'))return;const w=t.closest('.rg-w');cancelAnimationFrame(t._r);t._r=requestAnimationFrame(()=>gSync(w))},true);
$('#spaces').addEventListener('click',e=>{const w=e.target.closest('.rg-w');if(!w)return;const i=+w.closest('.rm').dataset.room;
 if(e.target.closest('.rg-p'))gGo(w,gIdx(w)-1);
 else if(e.target.closest('.rg-n'))gGo(w,gIdx(w)+1);
 else if(e.target.closest('.rg-tb'))gGo(w,+e.target.closest('.rg-tb').dataset.k);
 else if(e.target.closest('.rg-z'))openLb(i,gIdx(w),e.target.closest('.rg-z'));
 else if(e.target.closest('.rg-s'))openLb(i,+e.target.closest('.rg-s').dataset.k,e.target.closest('.rg-t'))});
/* Agrandissement plein écran */
(()=>{
 const L=$('#lb'),im=L.querySelector('img'),ct=L.querySelector('.lb-c'),x=L.querySelector('.lb-x'),pv=L.querySelector('.lb-p'),nx=L.querySelector('.lb-n');
 let r=0,k=0,from=null;const th=L.querySelector('.lb-th');th.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;k=+b.dataset.k;show()});
 const show=()=>{const R=ROOMS[r],p=R.ph[k],n=R.ph.length;im.dataset.f='';im.onerror=()=>{if(!im.dataset.f){im.dataset.f=1;im.src=p.src}};im.src=big(p.src);im.alt=R.t+(n>1?' — photo '+(k+1):'');ct.textContent=R.t+(n>1?' · '+(k+1)+'/'+n:'');L.classList.toggle('one',n<2);if(th){if(th.dataset.r!==String(r)){th.dataset.r=String(r);th.innerHTML=R.ph.map((q,j)=>`<button type="button" data-k="${j}" aria-label="Photo ${j+1}"><img src="${sm(q.src)}" alt="" loading="lazy"></button>`).join('')}th.querySelectorAll('button').forEach((b,j)=>b.classList.toggle('on',j===k));const a=th.querySelector('.on');if(a)th.scrollTo({left:a.offsetLeft-(th.clientWidth-a.offsetWidth)/2,behavior:'auto'})}};
 const step=d=>{const n=ROOMS[r].ph.length;if(n<2)return;k=(k+d+n)%n;show()};
 window.openLb=(i,j,btn)=>{r=i;k=j;from=btn;show();L.hidden=false;document.body.style.overflow='hidden';x.focus()};
 window.closeLb=()=>{if(L.hidden)return;L.hidden=true;document.body.style.overflow='';const w=$('#spaces .rm[data-room="'+r+'"] .rg-w');if(w)gGo(w,k,true);if(from&&document.contains(from))from.focus();from=null};
 x.addEventListener('click',closeLb);pv.addEventListener('click',()=>step(-1));nx.addEventListener('click',()=>step(1));
 L.addEventListener('click',e=>{if(e.target===L)closeLb()});
 addEventListener('keydown',e=>{if(L.hidden)return;if(e.key==='Escape')closeLb();else if(e.key==='ArrowLeft')step(-1);else if(e.key==='ArrowRight')step(1);else if(e.key==='Tab'){e.preventDefault();const f=[x,pv,nx].filter(b=>b.offsetParent!==null),i=f.indexOf(document.activeElement);f[(i+(e.shiftKey?-1:1)+f.length)%f.length].focus()}});
 let sx=null;L.addEventListener('touchstart',e=>{sx=e.touches[0].clientX},{passive:true});L.addEventListener('touchend',e=>{if(sx===null)return;const dx=e.changedTouches[0].clientX-sx;sx=null;if(Math.abs(dx)>45)step(dx<0?1:-1)},{passive:true});
 addEventListener('hashchange',closeLb);
})();
(()=>{
 const m=$('#rmd'),box=m.querySelector('.rmd-p'),ttl=$('#rmd-t'),lst=$('#rmd-l'),x=m.querySelector('.rmd-x');
 let from=null;
 const esc=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 window.closeRoom=()=>{if(m.hidden)return;m.hidden=true;document.body.style.overflow='';if(from&&document.contains(from))from.focus();from=null};
 const open=(i,btn)=>{const r=ROOMS[i];ttl.textContent=r.mt||'Équipements de la '+r.t.charAt(0).toLowerCase()+r.t.slice(1);lst.innerHTML=(r.eq||[...r.plus,...EQ]).map(e=>`<li>${esc(e)}</li>`).join('');from=btn;m.hidden=false;document.body.style.overflow='hidden';box.scrollTop=0;x.focus()};
 $('#spaces').addEventListener('click',e=>{const b=e.target.closest('.rm-more');if(b)open(+b.dataset.room,b)});
 x.addEventListener('click',closeRoom);
 m.addEventListener('click',e=>{if(e.target===m)closeRoom()});
 addEventListener('keydown',e=>{if(m.hidden)return;if(e.key==='Escape')closeRoom();else if(e.key==='Tab'){e.preventDefault();x.focus()}});
 addEventListener('hashchange',closeRoom);
})();
/* Réservation par WhatsApp : « Réserver cette chambre » → fenêtre (nom, personnes, dates) → WhatsApp avec le message prêt.
   Numéro WhatsApp : format international, chiffres uniquement, sans « + » ni espaces (ex. '212612345678'). Vide = WhatsApp demande à choisir le contact. */
const WA_NUM=(()=>{let d=CONFIG.WA_NUM.replace(/\D/g,'');if(d.slice(0,2)=='00')d=d.slice(2);else if(d[0]=='0')d='212'+d.slice(1);return d})();
(()=>{
 const m=$('#rsv'),F=$('#rsv-f'),ttl=$('#rsv-t'),err=$('#rsv-e'),nm=$('#rsv-n'),pp=$('#rsv-p'),da=$('#rsv-a'),dd=$('#rsv-d'),x=m.querySelector('.rmd-x'),sb=F.querySelector('.rsv-s');
 let r=0,from=null;
 const iso=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
 const fr=s=>s.split('-').reverse().join('/');
 const plus=(s,n)=>{const d=new Date(s+'T12:00:00');d.setDate(d.getDate()+n);return iso(d)};
 window.closeRsv=()=>{if(m.hidden)return;m.hidden=true;document.body.style.overflow='';if(from&&document.contains(from))from.focus();from=null};
 const open=(i,btn)=>{r=i;const t=i<0?'':ROOMS[i].t;ttl.textContent=i<0?'Réserver la villa':'Réserver la '+t.charAt(0).toLowerCase()+t.slice(1);err.textContent='';da.min=iso(new Date());dd.min=plus(da.value||da.min,1);from=btn;m.hidden=false;document.body.style.overflow='hidden';m.querySelector('.rmd-c').scrollTop=0;nm.focus()};
 da.addEventListener('change',()=>{if(da.value){dd.min=plus(da.value,1);if(dd.value&&dd.value<=da.value)dd.value=''}});
 F.addEventListener('submit',e=>{e.preventDefault();
  const n=nm.value.trim(),p=Math.round(+pp.value),a=da.value,d=dd.value;
  const bad=!n?['Merci d’indiquer votre nom.',nm]:!(p>=1&&p<=8)?['Indiquez le nombre de personnes (de 1 à 8).',pp]:!a?['Choisissez votre date d’arrivée.',da]:!d?['Choisissez votre date de départ.',dd]:d<=a?['La date de départ doit être après la date d’arrivée.',dd]:null;
  if(bad){err.textContent=bad[0];bad[1].focus();return}
  err.textContent='';
  const en=window.JL&&JL.lang()==='en',rn=r<0?'':ROOMS[r].t,
   msg=en?'Hello, I would like to book '+(r<0?'JNS Villa':rn.replace('Chambre','room')+' at JNS Villa')+'.\n\nName: '+n+'\nNumber of guests: '+p+'\nArrival: '+fr(a)+'\nDeparture: '+fr(d)+'\n\nCould you please confirm availability? Thank you.'
   :'Bonjour, je souhaite réserver '+(r<0?'la JNS Villa':'la '+rn+' de la JNS Villa')+'.\n\nNom : '+n+'\nNombre de personnes : '+p+'\nArrivée : '+fr(a)+'\nDépart : '+fr(d)+'\n\nPouvez-vous me confirmer la disponibilité ? Merci.';
  const l=document.createElement('a');if(!WA_NUM){closeRsv();location.hash='contact';$('#msg').value=msg;return}l.href='https://wa.me/'+WA_NUM+'?text='+encodeURIComponent(msg);l.target='_blank';l.rel='noopener noreferrer';document.body.appendChild(l);l.click();l.remove();
  closeRsv()});
 $('#spaces').addEventListener('click',e=>{const b=e.target.closest('.rm-rsv');if(b)open(+b.dataset.room,b)});
 document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-rsv]');if(b){e.preventDefault();open(-1,b)}});
 x.addEventListener('click',closeRsv);
 m.addEventListener('click',e=>{if(e.target===m)closeRsv()});
 addEventListener('keydown',e=>{if(m.hidden)return;if(e.key==='Escape')closeRsv();else if(e.key==='Tab'){const f=[nm,pp,da,dd,sb,x],i=f.indexOf(document.activeElement);e.preventDefault();f[(i+(e.shiftKey?-1:1)+f.length)%f.length].focus()}});
 addEventListener('hashchange',closeRsv);
})();
/* Photos des espaces principaux et de l'hôte */
const villaBands=$$('#villa .band .ph');
putPhoto(villaBands[0],P.villaTerrasse);
putPhoto(villaBands[1],P.villaChaises);
villaBands.forEach((b,i)=>{if(!b)return;const g=document.createElement('button');g.type='button';g.className='gal-bt';g.innerHTML='Galerie photos &gt;';g.addEventListener('click',()=>openLb(GAL[i],0,g));b.appendChild(g)});
const serviceBands=$$('#services .band .ph');
putPhoto(serviceBands[0],P.equipe);
putPhoto(serviceBands[1],P.famille);
putPhoto($('.hist .g .ph'),P.host);
putPhoto($('.ct .l .ph'),P.host);
/* Visuel principal adapté à chaque page */
const SLIDES=[
 {src:'assets/hero-01-villa.jpg',alt:'Villa moderne ensoleillée avec piscine turquoise'},
 {src:'assets/hero-02-chambre.jpg',alt:'Chambre bohème avec vue sur la piscine'},
 {src:'assets/salon/salon-02.jpg',fb:'https://a0.muscache.com/im/pictures/hosting/Hosting-1715934306963869229/original/32cf2db2-09aa-4d23-a2fb-e701265926b3.jpeg?im_w=720',alt:'Salon lumineux avec grand canapé d’angle'},
 {src:'assets/garden/garden-05.jpg',fb:P.airbnb4.src,alt:'Piscine privée, transats et jardin vus depuis la terrasse'}
];
const hi=s=>s.replace('im_w=720','im_w=1440').replace(/rw=\d+/,'rw=1200').replace('/270x270/','/max1280x900/');
let heroReady=false;const ldHero=l=>{if(l&&l._p){const p=l._p;l._p=null;heroImg(l,p)}};
addEventListener('load',()=>setTimeout(()=>{heroReady=true;$$('.hero-slide-image').forEach(ldHero)},800));
function heroImg(layer,p,first){const c=[p.src,p.fb&&hi(p.fb),p.fb].filter(Boolean);let i=0;const im=new Image();if(first)im.fetchPriority='high';im.alt='';im.referrerPolicy='no-referrer';im.decoding='async';im.onerror=()=>{if(++i<c.length)im.src=c[i];else im.remove()};im.src=c[0];layer.appendChild(im)}
let activeSlide=0,slideTimer=null;
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function buildHeroCarousels(){
 $$('.hero').forEach(hero=>{
  if(hero.querySelector('.hero-slide-stack'))return;
  const stack=document.createElement('div');
  stack.className='hero-slide-stack';
  stack.setAttribute('aria-hidden','true');
  SLIDES.forEach((photo,i)=>{
   const layer=document.createElement('div');
   layer.className='hero-slide-image'+(i===activeSlide?' active':'');
   if(i===0)heroImg(layer,photo,1);else layer._p=photo;
   stack.appendChild(layer);
  });
  const dots=document.createElement('div');
  dots.className='hero-dots';
  dots.setAttribute('role','group');
  dots.setAttribute('aria-label','Choisir une photo du carrousel');
  SLIDES.forEach((photo,i)=>{
   const dot=document.createElement('button');
   dot.type='button';
   dot.className='hero-dot'+(i===activeSlide?' active':'');
   dot.setAttribute('aria-label',`Afficher la photo ${i+1} : ${photo.alt}`);
   dot.setAttribute('aria-pressed',i===activeSlide?'true':'false');
   dot.addEventListener('click',()=>showHeroSlide(i));
   dots.appendChild(dot);
  });
  hero.prepend(stack);
  hero.appendChild(dots);
 });
}
function showHeroSlide(index){
 activeSlide=(index+SLIDES.length)%SLIDES.length;
 $$('.hero').forEach(hero=>{
  hero.querySelectorAll('.hero-slide-image').forEach((layer,i)=>{layer.classList.toggle('active',i===activeSlide);if(i===activeSlide)ldHero(layer)});
  hero.querySelectorAll('.hero-dot').forEach((dot,i)=>{
   const selected=i===activeSlide;
   dot.classList.toggle('active',selected);
   dot.setAttribute('aria-pressed',selected?'true':'false');
  });
 });
 if(slideTimer)clearTimeout(slideTimer);
 if(!reducedMotion)slideTimer=setTimeout(()=>showHeroSlide(activeSlide+1),5000);
}
buildHeroCarousels();
showHeroSlide(0);
let cm=new Date();cm.setDate(1);
const cal=()=>{const y=cm.getFullYear(),m=cm.getMonth(),t=new Date();t.setHours(0,0,0,0);let h=['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'].map(d=>`<b>${d}</b>`).join('')+'<i></i>'.repeat(new Date(y,m,1).getDay());for(let d=1,n=new Date(y,m+1,0).getDate();d<=n;d++){const x=new Date(y,m,d),p=x<t;h+=`<button class="${p?'p':+x==+t?'n':''}" ${p?'disabled':''} onclick="pk(${y},${m},${d})">${d}</button>`}$('#cg').innerHTML=h;$('#cm').textContent=cm.toLocaleDateString('fr-FR',{month:'long',year:'numeric'});$('#pv').disabled=cm<=new Date(t.getFullYear(),t.getMonth(),1)};
const mv=n=>{cm.setMonth(cm.getMonth()+n);cal()};
const pk=(y,m,d)=>{const en=window.JL&&JL.lang()==='en',D=new Date(y,m,d).toLocaleDateString(en?'en-GB':'fr-FR',{day:'numeric',month:'long',year:'numeric'});location.hash='contact';$('#msg').value=en?'Hello, I would like to check availability from '+D+'.':'Bonjour, je souhaite connaître les disponibilités à partir du '+D+'.'};
cal();
function go(){let h=location.hash.slice(1);if(!V.includes(h))h='accueil';V.forEach(v=>$('#'+v).hidden=v!=h);$$('header nav a').forEach(a=>a.classList.toggle('on',a.hash=='#'+h));$('#fl').innerHTML=FL.map(([k,n])=>k==h?['villa','Villa']:[k,n]).map(([k,n])=>`<a href="#${k}"><span class="ic">${IC[k]}</span>${n}</a>`).join('');scrollTo(0,0)}
addEventListener('hashchange',go);go();
/* ===== CUISINE & DINING (partie de la page Services) : apparition douce au défilement, défilement vers le menu, bouton « PLAN YOUR MEALS » ===== */
(()=>{
 const root=$('#cuisine');if(!root)return;
 /* Apparition au défilement (aucun effet si « réduire les animations » est activé) */
 if(!reducedMotion&&'IntersectionObserver' in window){
  root.classList.add('cu-anim');
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-in');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -6% 0px'});
  root.querySelectorAll('[data-reveal]').forEach(el=>io.observe(el));
 }
 /* Défilement doux vers le menu — sans toucher au #hash, qui sert de routeur aux pages */
 root.querySelectorAll('[data-cu-scroll]').forEach(a=>a.addEventListener('click',e=>{
  const t=document.getElementById(a.dataset.cuScroll);if(!t)return;
  e.preventDefault();
  t.scrollIntoView({behavior:reducedMotion?'auto':'smooth',block:'start'});
  const h=t.querySelector('[tabindex="-1"]');if(h)h.focus({preventScroll:true});
 }));
 /* « PLAN YOUR MEALS » réutilise le contact existant : WhatsApp si CONFIG.WA_NUM est renseigné, sinon la page Contact avec un message prérempli */
 const plan=$('#cu-plan'),MSG='Hello, I would like to plan the meals for my stay at JNS Villa.';
 if(plan){
  if(WA_NUM){plan.href='https://wa.me/'+WA_NUM+'?text='+encodeURIComponent(MSG);plan.target='_blank';plan.rel='noopener noreferrer'}
  else plan.addEventListener('click',()=>{const m=$('#msg');if(m&&!m.value.trim())m.value=MSG});
 }
})();
(()=>{const F=$('#cf'),st=$('#fm'),say=(m,c)=>{st.textContent=m;st.className=c||''};
 F.addEventListener('submit',async e=>{e.preventDefault();
  const f=new FormData(F),g=k=>(f.get(k)||'').toString().trim(),name=(g('prenom')+' '+g('nom')).trim(),msg=g('message');
  if(g('_gotcha'))return;
  if(!msg){say('Merci d’écrire votre message.','err');F.message.focus();return}
  const en=window.JL&&JL.lang()==='en',txt=(en?'Hello, I am '+(name||'a future traveller'):'Bonjour, je suis '+(name||'un futur voyageur'))+'.\n\n'+msg;
  if(CONFIG.FORM_URL){const b=F.querySelector('button');b.disabled=true;say('Envoi en cours…');
   try{const r=await fetch(CONFIG.FORM_URL,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({name,message:msg,_subject:'Demande d’information JNS Villa'})});
    if(!r.ok)throw 0;F.reset();say('Merci ! Votre message a bien été envoyé. À bientôt.','ok')}
   catch(_){say('L’envoi a échoué. Réessayez ou écrivez-nous sur WhatsApp.','err')}
   b.disabled=false;return}
  if(WA_NUM){open('https://wa.me/'+WA_NUM+'?text='+encodeURIComponent(txt),'_blank','noopener');say('WhatsApp s’ouvre : appuyez sur « Envoyer » pour finaliser.','ok');return}
  say('Le formulaire n’est pas encore disponible. Merci de nous écrire via nos annonces Booking.com ou Airbnb.','err')});
 const x=$('#cx'),L=[];
 if(WA_NUM)L.push('<a class="bt" href="https://wa.me/'+WA_NUM+'" target="_blank" rel="noopener noreferrer">Écrire sur WhatsApp</a>');
 if(CONFIG.PHONE)L.push('<a href="tel:'+CONFIG.PHONE.replace(/[^\d+]/g,'')+'">'+CONFIG.PHONE+'</a>');
 if(L.length){x.innerHTML=L.join('<br>');x.hidden=false}
 /* Bouton WhatsApp flottant : ouvre la conversation WhatsApp du propriétaire (CONFIG.WA_NUM). Sans numéro, il mène au formulaire de contact. */
 const fab=$('#wa-fab');
 if(fab&&WA_NUM){fab.href='https://wa.me/'+WA_NUM+'?text='+encodeURIComponent('Bonjour, je souhaite des informations sur la JNS Villa.');fab.target='_blank';fab.rel='noopener noreferrer'}
})();
/* Avis voyageurs : carrousel du Livre d’or (4 avis Google, affichés dans l’ordre de la liste RV, rotation toutes les 5 s) */
const RV=[
 {n:'Fatimazahra Hamsi',img:'assets/avis-fatimazahra.jpg',lang:'fr',t:'Nous avons passé un excellent séjour à JNS Villa. Nous avons particulièrement apprécié le calme et la beauté du jardin, très reposant. La villa était d’une grande propreté, avec des équipements neufs et de qualité. Un grand merci également à la cuisinière, qui nous a préparé de délicieux plats, ainsi qu’à notre hôte Mr. Ayoub, très attentionné, disponible et toujours à l’écoute. Une très belle expérience que nous recommandons vivement. Nous reviendrons avec grand plaisir 🥰🥰'},
 {n:'Hamza Ahrach',img:'assets/avis-hamza.jpg',lang:'fr',t:'Villa magnifique, très bien entretenue. Le quartier est calme et idéal pour se détendre. L’accueil était chaleureux.'},
 {n:'Abdeslam Benaddi',img:'assets/avis-abdeslam.jpg',lang:'fr',t:'Cadre magnifique, ambiance calme et équipements de qualité. Une excellente adresse pour des vacances réussies.'},
 {n:'Mouhssine Bakhdil',c:'#512da8',lang:'en',t:'Had a wonderful stay at JNS Villa. The villa is beautiful, peaceful, and very comfortable. Everything was perfect, and I really enjoyed my time there. I highly recommend it for a relaxing stay.'}
];
/* Cartes d'avis : reprises de RV (page À propos, inchangée). Accueil = 1 avis ; Villa, Services, Localisation, Contact = 1 autre avis (aucun doublon). */
const TMPICK={home:[0,2],other:[1]},
 tmEx=t=>{if(t.length<=230)return t;const c=t.slice(0,230),k=Math.max(c.lastIndexOf('. '),c.lastIndexOf('! '));return (k>90?c.slice(0,k):c.replace(/\s+\S*$/,''))+'…'};
$$('.tms').forEach(e=>e.innerHTML=TMPICK[e.closest('#accueil')?'home':'other'].map(i=>`<div class="tc"${RV[i].lang!='fr'?` lang="${RV[i].lang}"`:''}>${tmEx(RV[i].t)}<i>${RV[i].n}</i></div>`).join(''));
(()=>{
 const root=$('#avis');if(!root)return;
 const MS=5000,track=root.querySelector('.rv-track'),dots=root.querySelector('.hero-dots');
 track.innerHTML=RV.map((r,i)=>`<figure class="rv-s${r.t.length>220?' rv-l':''}" role="group" aria-roledescription="slide" aria-label="${i+1} sur ${RV.length}"><span class="rv-av" data-i="${r.n[0]}"${r.c?` style="--c:${r.c}"`:''}>${r.img?`<img src="${r.img}" alt="" width="52" height="52" decoding="async" onerror="this.remove()">`:''}</span><em>${r.n}</em><q lang="${r.lang}">${r.t}</q></figure>`).join('');
 dots.innerHTML=RV.map(r=>`<button type="button" class="hero-dot" aria-label="Afficher l’avis de ${r.n}"></button>`).join('');
 const S=[...track.children],D=[...dots.children];
 let cur=0,tm=0,hov=false,vis=false,x0=null;
 const run=()=>{clearTimeout(tm);if(!reducedMotion&&vis&&!hov&&!document.hidden)tm=setTimeout(()=>show(cur+1),MS)};
 function show(i){cur=(i+S.length)%S.length;S.forEach((s,k)=>{s.classList.toggle('on',k===cur);s.setAttribute('aria-hidden',k!==cur)});D.forEach((d,k)=>{d.classList.toggle('active',k===cur);d.setAttribute('aria-pressed',k===cur)});run()}
 D.forEach((d,k)=>d.addEventListener('click',()=>show(k)));
 root.querySelector('.rv-p').addEventListener('click',()=>show(cur-1));
 root.querySelector('.rv-n').addEventListener('click',()=>show(cur+1));
 root.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')show(cur-1);else if(e.key==='ArrowRight')show(cur+1)});
 if(matchMedia('(hover:hover)').matches){root.addEventListener('mouseenter',()=>{hov=true;run()});root.addEventListener('mouseleave',()=>{hov=false;run()})}
 root.addEventListener('touchstart',e=>{x0=e.touches[0].clientX},{passive:true});
 root.addEventListener('touchend',e=>{if(x0===null)return;const dx=e.changedTouches[0].clientX-x0;x0=null;if(Math.abs(dx)>45)show(cur+(dx<0?1:-1))},{passive:true});
 new IntersectionObserver(([e])=>{vis=e.isIntersecting;run()},{threshold:.3}).observe(root);
 document.addEventListener('visibilitychange',run);
 show(0);
})();

/* Services : photos en haute définition dans la mosaïque (repli sur la version d’origine si elle n’est pas disponible) */
$$('#g2 img').forEach(im=>{const s=im.getAttribute('src'),b=hi(s);if(b===s)return;im.onerror=()=>{im.onerror=()=>{im.style.display='none';im.parentElement.classList.add('photo-error')};im.src=s};im.src=b});

/* Accueil : photos des annonces (Airbnb, Vrbo / Expedia) en haute définition.
   Les photos sont d'abord mesurées (petite version), puis placées selon leur orientation dans le collage :
   les plus « portrait » dans les cases hautes, les plus « paysage » dans les grandes cases.
   Les photos basse définition (miniature Booking 270 px, cuisine) ne sont pas utilisées ici. */
(()=>{
 const g=$('#g1');if(!g)return;
 const HR=[[22.3,451,451,200,201],[26.6,540,240,539],[27.6,600,600,280]];
 /* par ordre de priorité : les premières sont les mieux placées, les dernières servent de réserve */
 const CAND=[P.airbnb1,P.pool,P.bedroomView,P.airbnb2,P.airbnb3,P.airbnb4,P.airbnb5,P.lounge,P.room2,P.room4,P.bedroom2,P.room3,P.room1];
 const slots=[];
 g.innerHTML=HR.map(([h,...c])=>{const t=c.reduce((a,x)=>a+x,0);return `<div class="gr" style="grid-template-columns:${c.map(x=>x+'fr').join(' ')};height:${h}vw">${c.map(x=>{slots.push({r:x/t*100/h});return '<div></div>'}).join('')}</div>`}).join('');
 const cells=[...g.querySelectorAll('.gr>div')];
 const ratio=p=>new Promise(done=>{const im=new Image(),t=setTimeout(()=>done(0),10000);im.referrerPolicy='no-referrer';im.onload=()=>{clearTimeout(t);done(im.naturalWidth&&im.naturalHeight?im.naturalWidth/im.naturalHeight:0)};im.onerror=()=>{clearTimeout(t);done(0)};im.src=p.src});
 const fill=(cell,p)=>{const big={src:hi(p.src),alt:p.alt};cell.innerHTML=photoLink(big);const im=cell.querySelector('img');im.onerror=()=>{im.onerror=()=>{im.style.display='none';im.parentElement.classList.add('photo-error')};im.src=p.src};cell.classList.add('photo-filled')};
 const run=()=>Promise.all(CAND.map(ratio)).then(R=>{
  const ps=CAND.map((p,i)=>({p,i,q:Math.round(R[i]*4)})).filter((_,i)=>R[i]).slice(0,slots.length).sort((a,b)=>a.q-b.q||b.i-a.i);
  const ss=slots.map((s,i)=>({i,q:Math.round(s.r*4)})).sort((a,b)=>a.q-b.q||b.i-a.i).slice(slots.length-ps.length);
  ps.forEach((o,k)=>fill(cells[ss[k].i],o.p));
  cells.forEach(c=>{if(!c.firstChild)c.classList.add('photo-error')});
 });
 if('IntersectionObserver' in window){const io=new IntersectionObserver(([e])=>{if(e.isIntersecting){io.disconnect();run()}},{rootMargin:'300px 0px'});io.observe(g)}else run();
})();

/* ----- menu mobile ----- */
(()=>{const h=document.querySelector('header'),b=h.querySelector('.mb'),set=o=>{h.classList.toggle('mo',o);b.setAttribute('aria-expanded',o);document.body.style.overflow=o?'hidden':''};b.onclick=()=>set(!h.classList.contains('mo'));h.addEventListener('click',e=>{if(e.target===h)set(false)});h.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>set(false)));addEventListener('hashchange',()=>set(false));addEventListener('keydown',e=>{if(e.key==='Escape')set(false)});matchMedia('(min-width:801px)').addEventListener('change',e=>e.matches&&set(false))})()
