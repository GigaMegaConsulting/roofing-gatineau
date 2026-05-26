// Bilingual long-tail SEO landing pages for the roofing niche. Each entry is
// a self-contained guide that answers a high-intent query a Gatineau-area
// homeowner is likely to type into Google ("signes toiture endommagée",
// "fuite toiture urgence", "bardeaux ou tôle québec"...).
//
// Pricing is deliberately omitted — see the no-pricing memory. We talk about
// what affects price, what to ask, and how to evaluate quotes, but never
// publish numbers that would commit the brand to a tariff.

import type { Lang } from "./site.config";

export interface LongFormSection {
  heading: string;
  paragraphs: string[];
}

export interface LongFormContent {
  title: string;
  metaDescription: string;
  intro: string;
  sections: LongFormSection[];
  closing: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. Signs your roof needs repair or replacement
// ─────────────────────────────────────────────────────────────────────────────
const DAMAGED_ROOF_SIGNS: Record<Lang, LongFormContent> = {
  fr: {
    title: "Signes qu'une toiture doit être réparée ou refaite à Gatineau",
    metaDescription: "Les 8 signes concrets qui indiquent qu'une toiture en bardeaux d'asphalte doit être inspectée ou remplacée — vus du sol, du grenier, et de l'intérieur.",
    intro: "À Gatineau et dans l'Outaouais, une toiture en bardeaux d'asphalte standard dure entre 18 et 25 ans selon la qualité du produit, la ventilation du grenier, et l'orientation au soleil. La plupart des propriétaires attendent une fuite avant d'agir — ce qui veut presque toujours dire payer plus cher pour réparer les dégâts secondaires en plus de la toiture. Voici les signes qui méritent une inspection avant que ça devienne une urgence.",
    sections: [
      {
        heading: "Ce qui se voit du sol",
        paragraphs: [
          "Bardeaux courbés, cornés, ou qui ondulent : c'est le signe le plus visible d'une toiture en fin de vie. Sur un bardeau sain, la surface est plate et le grain de granules est uniforme. Quand les bardeaux se courbent vers le haut aux coins, l'eau commence à s'infiltrer en dessous lors des grandes pluies.",
          "Bardeaux manquants ou déplacés après un coup de vent : un seul bardeau parti, ce n'est pas une catastrophe, mais c'est un avertissement. Si vous voyez trois ou quatre zones différentes où le motif est cassé, la pose initiale ou les clous arrivent en fin de vie.",
          "Plaques noires ou vertes : la mousse et les lichens retiennent l'humidité contre les bardeaux et accélèrent leur dégradation. Sur les versants nord (moins de soleil), c'est très fréquent à Gatineau après 10-12 ans.",
        ],
      },
      {
        heading: "Ce qui se voit du grenier",
        paragraphs: [
          "Lumière du jour qui filtre à travers le platelage : si vous voyez des points de lumière entre les chevrons en montant au grenier en plein jour, l'eau aussi voit ces trous. C'est une urgence.",
          "Traces brunes ou auréoles sur l'isolant et le bois du toit : signe d'infiltration passée ou en cours. Même sec aujourd'hui, c'est une fuite qui reviendra à la prochaine grosse pluie.",
          "Odeur d'humidité ou de moisi : la ventilation du grenier ne suffit plus. C'est souvent corrélé à des problèmes d'évents de toit obstrués ou mal positionnés, et c'est l'une des principales causes du raccourcissement de la durée de vie d'une toiture.",
        ],
      },
      {
        heading: "Ce qui se voit de l'intérieur de la maison",
        paragraphs: [
          "Taches au plafond ou en haut des murs : la fuite peut être au-dessus du plafond touché, mais elle peut aussi être à plusieurs mètres de distance. L'eau suit la pente du platelage avant de tomber.",
          "Peinture qui cloque ou papier peint qui se décolle près du plafond : signe d'humidité chronique entre les solives. Souvent dans les salles de bain à l'étage, mais pas toujours.",
          "Bardeaux dans les gouttières au nettoyage : si vous trouvez des fragments de granules ou des morceaux de bardeau qui se détachent, la couche protectrice s'érode et le bardeau perd sa résistance UV.",
        ],
      },
      {
        heading: "L'âge réel de votre toiture",
        paragraphs: [
          "Si vous ne connaissez pas l'âge exact de votre toiture (achat de maison, propriétaire précédent), un couvreur peut l'estimer à 2-3 ans près en regardant le type de bardeau, l'état des clous, et l'aspect du calfeutrage des sorties de toit.",
          "Règle de pouce à Gatineau : passé 15 ans, une inspection annuelle devient une bonne pratique. Passé 20 ans, vous devriez avoir un budget de remplacement prêt à activer.",
        ],
      },
      {
        heading: "Quand demander une inspection",
        paragraphs: [
          "Si vous cochez deux des signes ci-dessus, il est temps de faire venir un couvreur pour une inspection sur place. Une inspection professionnelle prend 30 à 45 minutes et confirme s'il s'agit d'une réparation ciblée (quelques bardeaux, un solin, une bouche d'aération) ou d'un remplacement complet à planifier.",
          "Couvreur Gatineau offre des inspections gratuites dans tout l'Outaouais — Hull, Aylmer, Buckingham, Pointe-Gatineau, Masson-Angers — et fournit un rapport écrit avec photos. Si la toiture est encore bonne, on vous le dit aussi.",
        ],
      },
    ],
    closing: "Une toiture qui montre des signes de fatigue ne s'améliore pas toute seule. Demandez une inspection gratuite et obtenez un avis professionnel avant que la prochaine grosse pluie révèle un problème que vous auriez pu corriger pour beaucoup moins cher.",
  },
  en: {
    title: "Signs Your Roof Needs Repair or Replacement in Gatineau",
    metaDescription: "The 8 concrete signs that an asphalt-shingle roof needs inspection or replacement — visible from the ground, the attic, and inside the house.",
    intro: "In Gatineau and the Outaouais region, a standard asphalt-shingle roof lasts 18 to 25 years depending on shingle quality, attic ventilation, and sun exposure. Most homeowners wait until a leak appears before acting — which almost always means paying extra to repair secondary water damage on top of the roof itself. Here are the signs worth catching before they become emergencies.",
    sections: [
      {
        heading: "What's visible from the ground",
        paragraphs: [
          "Curled, lifted, or waving shingles: the most visible sign of a roof at end of life. A healthy shingle is flat with a uniform granule pattern. When corners curl upward, water starts seeping underneath during heavy rain.",
          "Missing or displaced shingles after a windstorm: one lost shingle isn't a catastrophe, but it's a warning. If you see three or four areas where the pattern is broken, either the original install or the nails are giving out.",
          "Black or green patches: moss and lichen hold moisture against the shingles and speed up degradation. On north-facing slopes (less sun), it's very common in Gatineau after 10-12 years.",
        ],
      },
      {
        heading: "What's visible from the attic",
        paragraphs: [
          "Daylight through the roof deck: if you can see points of light between the rafters going into the attic on a bright day, water can find those holes too. That's an emergency.",
          "Brown stains or rings on insulation and roof wood: past or active infiltration. Even if dry today, it's a leak that will come back next major rain.",
          "Damp or musty smell: attic ventilation is no longer keeping up. Often correlated with blocked or wrongly placed roof vents, and one of the leading causes of shortened roof life.",
        ],
      },
      {
        heading: "What's visible from inside the house",
        paragraphs: [
          "Stains on ceilings or upper walls: the leak might be directly above the affected area, but it could also be metres away. Water follows the slope of the deck before dripping.",
          "Paint bubbling or wallpaper peeling near the ceiling: signs of chronic humidity between the joists. Often in upstairs bathrooms, but not always.",
          "Shingle fragments in your gutters: if cleaning turns up granule grit or chunks of shingle, the protective layer is eroding and UV resistance is dropping fast.",
        ],
      },
      {
        heading: "Your roof's actual age",
        paragraphs: [
          "If you don't know your roof's exact age (you bought the house, previous owner unknown), a roofer can estimate it within 2-3 years from the shingle type, nail condition, and the look of the flashing around vents.",
          "Rule of thumb in Gatineau: past 15 years, an annual inspection becomes a good habit. Past 20, you should have a replacement budget ready to activate.",
        ],
      },
      {
        heading: "When to call for an inspection",
        paragraphs: [
          "If you tick two of the signs above, it's time to have a roofer come out. A professional inspection takes 30-45 minutes and confirms whether it's a targeted repair (a few shingles, a flashing, a vent) or a full replacement to plan.",
          "Gatineau Roofing offers free inspections across the Outaouais — Hull, Aylmer, Buckingham, Pointe-Gatineau, Masson-Angers — and provides a written report with photos. If your roof is still good, we'll tell you that too.",
        ],
      },
    ],
    closing: "A roof showing signs of fatigue won't fix itself. Book a free inspection and get a professional read before the next big rain reveals a problem you could have addressed for far less.",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. Asphalt shingles vs. metal roofing
// ─────────────────────────────────────────────────────────────────────────────
const SHINGLES_VS_METAL: Record<Lang, LongFormContent> = {
  fr: {
    title: "Bardeaux d'asphalte ou toiture en tôle: quel matériau pour Gatineau",
    metaDescription: "Comparaison honnête entre bardeaux d'asphalte et toiture métallique pour un climat québécois: durée de vie, performance hivernale, coût, et entretien.",
    intro: "Quand vient le temps de refaire une toiture résidentielle à Gatineau, deux choix dominent: les bardeaux d'asphalte (95 % des toitures résidentielles au Québec) et la toiture métallique en acier galvanisé. Les deux fonctionnent. Le bon choix dépend de combien de temps vous comptez rester dans la maison, de la pente de votre toit, et de votre tolérance au bruit lors d'une averse.",
    sections: [
      {
        heading: "Durée de vie réelle au Québec",
        paragraphs: [
          "Bardeaux d'asphalte architecturaux de qualité (35 ans annoncés par le manufacturier): à Gatineau, comptez 22-28 ans en vie utile réelle. Les cycles gel-dégel, la grêle d'été et l'orientation au soleil raccourcissent toujours l'annonce du manufacturier.",
          "Toiture métallique en acier galvanisé avec revêtement de zinc-aluminium et peinture polymère: 40 à 50 ans facilement, parfois plus si la ventilation du grenier est bonne et qu'aucun arbre ne frotte sur la toiture.",
          "Conclusion pratique: si vous prévoyez vendre dans moins de 10 ans, l'écart de durée de vie n'a pas vraiment d'impact économique pour vous. Si vous restez 20+ ans, le métal commence à payer.",
        ],
      },
      {
        heading: "Comportement en hiver",
        paragraphs: [
          "Le métal évacue la neige par lui-même sur une pente de 4/12 ou plus — la neige glisse en plaques, ce qui élimine les surcharges et les barrages de glace. C'est un avantage majeur dans l'Outaouais, où la neige cumulée dépasse souvent 250 cm par hiver.",
          "Avec des bardeaux, la neige reste sur le toit et fond plus lentement. Une ventilation correcte du grenier devient cruciale pour éviter les barrages de glace (ice damming) qui causent des infiltrations en bord de toit. Beaucoup des fuites hivernales qu'on voit à Gatineau viennent de là.",
          "Attention: une toiture métallique qui largue 30 cm de neige d'un coup peut endommager des arbustes en dessous ou une voiture mal stationnée. Sur les versants au-dessus d'une entrée, certains propriétaires installent des arrêts à neige.",
        ],
      },
      {
        heading: "Coût et retour sur investissement",
        paragraphs: [
          "Sans donner de chiffres précis (ils varient selon la surface, la pente, et le matériel choisi), une règle de pouce pour la région: une toiture métallique installée coûte généralement 2 à 2.5 fois plus cher au pied carré qu'une toiture en bardeaux architecturaux comparables.",
          "Sur la durée: si on amortit le coût sur la durée de vie réelle, le métal devient compétitif ou avantageux à partir de 25-30 ans de propriété. Sur un horizon plus court, les bardeaux gagnent au calcul.",
          "Pour une soumission précise avec les deux options chiffrées, demandez une visite — c'est la seule façon honnête de vous donner le bon ordre de grandeur pour votre maison.",
        ],
      },
      {
        heading: "Bruit et confort",
        paragraphs: [
          "Mythe à corriger: une toiture métallique moderne posée sur un platelage de bois et une membrane n'est pas plus bruyante qu'une toiture en bardeaux lors d'une pluie. Le « bruit de toit en tôle » qu'on imagine vient des cabanons et garages où le métal est posé directement sur la structure sans isolation.",
          "Sur une maison correctement isolée et finie, la différence acoustique est marginale. La grêle est légèrement plus audible en métal, c'est tout.",
        ],
      },
      {
        heading: "Esthétique et harmonisation au quartier",
        paragraphs: [
          "Les bardeaux d'asphalte se fondent dans la majorité des quartiers résidentiels de Gatineau et offrent une palette de couleurs très large (gris, brun, noir, charbon, vert foncé, et plusieurs nuances mélangées).",
          "Le métal a un look plus marqué, plus contemporain ou plus rural selon le profil choisi. Sur certaines rues de Hull ou de Buckingham où toutes les maisons ont des bardeaux, une toiture métallique peut détonner — à vous de juger si c'est un atout ou un désavantage à la revente.",
        ],
      },
    ],
    closing: "Aucun matériau n'est universellement meilleur — chacun a son contexte. Lors d'une visite à votre domicile, nous chiffrons les deux options pour votre toit spécifique afin que vous puissiez décider avec les vrais chiffres en main. Demandez une soumission gratuite.",
  },
  en: {
    title: "Asphalt Shingles or Metal Roofing: Which Material for Gatineau",
    metaDescription: "Honest comparison between asphalt shingles and steel roofing for a Quebec climate: lifespan, winter performance, cost, and maintenance.",
    intro: "When the time comes to replace a residential roof in Gatineau, two choices dominate: asphalt shingles (95% of residential roofs in Quebec) and galvanized-steel metal roofing. Both work. The right pick depends on how long you plan to stay in the home, your roof's pitch, and your tolerance for sound during a rainstorm.",
    sections: [
      {
        heading: "Real lifespan in Quebec",
        paragraphs: [
          "Quality architectural asphalt shingles (35 years on the manufacturer label): in Gatineau, expect 22-28 years of real useful life. Freeze-thaw cycles, summer hail, and sun exposure always shorten the manufacturer's spec.",
          "Galvanized steel with zinc-aluminium coating and polymer paint: 40-50 years easily, sometimes more if attic ventilation is good and no tree is rubbing the roof.",
          "Practical takeaway: if you plan to sell within 10 years, the lifespan gap doesn't really change the math for you. If you're staying 20+ years, metal starts paying off.",
        ],
      },
      {
        heading: "Winter behaviour",
        paragraphs: [
          "Metal sheds snow on its own at a 4/12 pitch or steeper — snow slides off in slabs, which eliminates overloading and ice dams. Major advantage in the Outaouais, where seasonal snowfall often exceeds 250 cm.",
          "With shingles, snow stays on the roof and melts slowly. Proper attic ventilation becomes critical to avoid ice dams that cause edge-of-roof leaks. A lot of the winter leaks we see in Gatineau come from this.",
          "Caveat: a metal roof shedding 30 cm of snow at once can damage shrubs underneath or a poorly parked car. Above driveways, some owners install snow guards.",
        ],
      },
      {
        heading: "Cost and return on investment",
        paragraphs: [
          "Without giving exact figures (they vary by surface area, pitch, and material grade), a rule of thumb for the region: an installed metal roof typically costs 2-2.5x more per square foot than comparable architectural shingles.",
          "Over the long haul: amortizing cost over real lifespan, metal becomes competitive or favourable past 25-30 years of ownership. On shorter horizons, shingles win the math.",
          "For an exact quote with both options priced, book a site visit — that's the only honest way to give you the right order of magnitude for your specific home.",
        ],
      },
      {
        heading: "Noise and comfort",
        paragraphs: [
          "Myth to correct: a modern metal roof installed over a wooden deck and a proper membrane is not noticeably louder than shingles during rain. The 'tin-roof noise' people imagine comes from sheds and garages where metal sits directly on the structure with no insulation.",
          "On a properly insulated, finished home, the acoustic difference is marginal. Hail is slightly more audible on metal — that's about it.",
        ],
      },
      {
        heading: "Curb appeal and neighbourhood fit",
        paragraphs: [
          "Asphalt shingles blend into most Gatineau residential neighbourhoods and offer a wide colour palette (greys, browns, blacks, charcoals, dark greens, and blended hues).",
          "Metal has a stronger look, more contemporary or more rural depending on the profile. On certain streets in Hull or Buckingham where every house has shingles, metal can stand out — your call whether that's an asset or a resale drawback.",
        ],
      },
    ],
    closing: "Neither material is universally better — each has its context. During a home visit, we price both options for your specific roof so you can decide with real numbers in hand. Request a free quote.",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 3. What a roof inspection actually covers
// ─────────────────────────────────────────────────────────────────────────────
const ROOF_INSPECTION: Record<Lang, LongFormContent> = {
  fr: {
    title: "Inspection de toiture: ce qu'un couvreur regarde réellement",
    metaDescription: "Le détail d'une inspection de toiture professionnelle à Gatineau: ce qu'on vérifie de l'extérieur, du grenier, et ce que vous devriez recevoir comme rapport.",
    intro: "Une inspection de toiture professionnelle, ce n'est pas juste regarder le toit du trottoir. C'est une vérification systématique de 12 à 15 points qui prend 30 à 45 minutes et qui se conclut par un rapport écrit avec photos. Voici exactement ce qui devrait être couvert quand vous faites venir un couvreur — et les drapeaux rouges si on bâcle l'exercice.",
    sections: [
      {
        heading: "L'inspection extérieure",
        paragraphs: [
          "État général des bardeaux: courbures, granules manquantes, fissures, bardeaux soulevés ou décollés. Le couvreur monte sur le toit (ou utilise une perche d'inspection avec caméra si la pente l'interdit) et documente les zones problématiques avec des photos géolocalisées.",
          "Solins (flashings): autour des cheminées, des évents de plomberie, des sorties de hotte, des lucarnes, et aux jonctions de pentes. C'est l'endroit où 60 % des fuites commencent. Les solins se dégradent avant les bardeaux dans la majorité des cas.",
          "Faîtage et arêtes: les bardeaux de faîtage subissent le plus de vent et se relèvent en premier. Un faîtage mal scellé laisse passer l'air froid l'hiver et l'eau aux fortes pluies.",
          "Gouttières et descentes: pas la responsabilité directe du couvreur, mais leur état affecte la toiture (refoulement, glace en bord de toit). On note les zones à problèmes.",
        ],
      },
      {
        heading: "L'inspection du grenier",
        paragraphs: [
          "Sous-face du platelage: on cherche les taches d'eau, les traces de moisi, le bois noirci ou ramolli. Une infiltration laisse toujours une trace, même si elle a séché.",
          "Isolant: humidité, tassement, et couverture suffisante (au Québec, minimum R-41 recommandé pour les nouvelles toitures). Un isolant détrempé perd presque toute sa valeur thermique.",
          "Ventilation: présence et fonctionnement des évents de soffite (entrée d'air) et de toit (sortie d'air). Une mauvaise ventilation est la première cause cachée de raccourcissement de la durée de vie d'une toiture au Québec.",
          "Structure: chevrons, solives, et tout signe d'affaissement ou de pourriture. Si on suspecte un problème structural, on recommande une visite d'ingénieur.",
        ],
      },
      {
        heading: "Le rapport que vous devriez recevoir",
        paragraphs: [
          "Un rapport écrit (PDF ou imprimé) qui résume les constats par section, avec des photos numérotées et localisées. Si on vous donne juste un verbal après l'inspection, demandez le rapport écrit avant de payer.",
          "Une estimation de la vie résiduelle de la toiture (en années), basée sur l'état actuel et les conditions locales. Pas une promesse — une estimation honnête.",
          "Une liste claire des réparations recommandées avec priorités (urgent / dans les 12 mois / à surveiller). Si la toiture nécessite un remplacement complet à court terme, ce devrait être dit clairement, pas enrobé.",
        ],
      },
      {
        heading: "Les drapeaux rouges",
        paragraphs: [
          "Inspection « gratuite » qui se termine systématiquement par une recommandation de refaire la toiture complète, même quand vous saviez qu'elle avait 8 ans. Demandez l'avis d'un deuxième couvreur si vous avez un doute.",
          "Aucune photo dans le rapport ou aucun rapport du tout. Si vous ne pouvez pas voir les preuves de ce qu'on vous décrit, vous n'avez aucun moyen de comparer entre soumissionnaires.",
          "Pression pour signer le jour même avec un rabais « valide seulement maintenant ». Une vraie urgence (fuite active, bardeaux décollés en bordure) est rare et n'arrive pas tous les jours — la plupart des décisions de toiture peuvent attendre 2-3 semaines pour magasiner correctement.",
        ],
      },
      {
        heading: "Quand faire inspecter votre toiture",
        paragraphs: [
          "Après un événement météo majeur: vents forts (>80 km/h), grêle, accumulation rapide de glace. Ce sont les moments où des dommages cachés apparaissent.",
          "À l'achat d'une maison: même si une inspection préachat générale a été faite, un couvreur regarde la toiture avec un œil beaucoup plus précis.",
          "Tous les 2-3 ans après les 15 ans de la toiture. Petit investissement préventif qui évite les grosses surprises.",
        ],
      },
    ],
    closing: "Une inspection bien faite vous donne le pouvoir de planifier — pas de réagir dans la panique. Couvreur Gatineau offre des inspections gratuites avec rapport écrit et photos dans tout l'Outaouais. Demandez la vôtre sans engagement.",
  },
  en: {
    title: "Roof Inspection: What a Roofer Actually Checks",
    metaDescription: "What a professional roof inspection in Gatineau covers — outside checks, attic checks, and what your written report should include.",
    intro: "A professional roof inspection isn't just looking at the roof from the sidewalk. It's a systematic check of 12-15 points that takes 30-45 minutes and concludes with a written report and photos. Here's exactly what should be covered when you bring in a roofer — and the red flags if someone phones it in.",
    sections: [
      {
        heading: "The exterior inspection",
        paragraphs: [
          "General shingle condition: curling, missing granules, cracks, lifted or unbonded shingles. The roofer goes up on the roof (or uses an inspection pole with a camera if the pitch forbids it) and documents problem areas with geo-tagged photos.",
          "Flashings: around chimneys, plumbing vents, range hoods, dormers, and at pitch transitions. This is where 60% of leaks start. Flashings degrade before shingles in most cases.",
          "Ridges and hips: ridge shingles take the most wind and lift first. A poorly sealed ridge lets cold air through in winter and water through during heavy rain.",
          "Gutters and downspouts: not the roofer's direct responsibility, but their condition affects the roof (back-up, edge ice). Trouble zones get noted.",
        ],
      },
      {
        heading: "The attic inspection",
        paragraphs: [
          "Underside of the deck: looking for water stains, mould marks, blackened or softened wood. Infiltration always leaves a trace, even if it has dried.",
          "Insulation: dampness, settling, and adequate coverage (in Quebec, R-41 minimum is recommended for new roofs). Wet insulation loses nearly all thermal value.",
          "Ventilation: presence and function of soffit vents (intake) and roof vents (exhaust). Bad ventilation is the leading hidden cause of shortened roof life in Quebec.",
          "Structure: rafters, joists, any sign of sagging or rot. If a structural issue is suspected, we recommend an engineer's visit.",
        ],
      },
      {
        heading: "The report you should receive",
        paragraphs: [
          "A written report (PDF or printed) summarizing findings by section, with numbered, located photos. If you only get a verbal after the inspection, ask for the written report before paying.",
          "An estimate of remaining roof life (in years), based on current condition and local climate. Not a promise — an honest estimate.",
          "A clear list of recommended repairs by priority (urgent / within 12 months / monitor). If the roof needs a full replacement soon, it should be said plainly, not softened.",
        ],
      },
      {
        heading: "Red flags",
        paragraphs: [
          "A 'free' inspection that systematically ends with a recommendation to replace the whole roof, even when you know it's only 8 years old. Get a second opinion when in doubt.",
          "No photos in the report, or no report at all. If you can't see the evidence for what's described, you have no way to compare quotes.",
          "Pressure to sign that same day with a 'discount only good now.' Real emergencies (active leak, edge shingles torn) are rare — most roofing decisions can wait 2-3 weeks for proper shopping.",
        ],
      },
      {
        heading: "When to have your roof inspected",
        paragraphs: [
          "After a major weather event: strong winds (>80 km/h), hail, rapid ice accumulation. These are the moments hidden damage appears.",
          "When buying a home: even with a general pre-purchase inspection, a roofer looks at the roof with a much more precise eye.",
          "Every 2-3 years after the roof turns 15. A small preventive investment that avoids large surprises.",
        ],
      },
    ],
    closing: "A well-done inspection gives you the power to plan — not to react in panic. Gatineau Roofing offers free inspections with written reports and photos across the Outaouais. Request yours, no commitment.",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 4. Roof leak: what to do (and avoid) in an emergency
// ─────────────────────────────────────────────────────────────────────────────
const ROOF_LEAK_EMERGENCY: Record<Lang, LongFormContent> = {
  fr: {
    title: "Fuite de toiture: quoi faire en urgence (et quoi éviter)",
    metaDescription: "Plan d'action quand une toiture coule à Gatineau: protéger l'intérieur, contenir l'eau, ce qui peut attendre, et quand appeler un couvreur d'urgence.",
    intro: "Une fuite active dans le plafond pendant une grosse pluie, c'est stressant. La bonne nouvelle: les premières actions à poser sont simples et limitent presque toujours les dégâts. La mauvaise nouvelle: certaines réactions intuitives empirent la situation. Voici un plan d'action clair.",
    sections: [
      {
        heading: "Les 5 premières minutes",
        paragraphs: [
          "Déplacez tout ce qui peut s'abîmer sous la fuite: meubles, tapis, électronique. Si vous ne pouvez pas déplacer, couvrez avec une bâche en plastique épaisse — pas un drap, qui retient l'eau et la rediffuse.",
          "Placez un seau directement sous la goutte. Mettez une serviette dans le fond pour absorber l'impact (sinon les éclaboussures portent à 1-2 mètres).",
          "Si l'eau s'accumule dans un plafond et forme une cloque qui pend: percez la cloque au centre avec un tournevis et laissez l'eau s'écouler dans le seau. Contre-intuitif mais essentiel — l'eau retenue va finir par crever le plafond complet, et là c'est tout le panneau qu'il faut refaire.",
        ],
      },
      {
        heading: "Les 30 minutes suivantes",
        paragraphs: [
          "Coupez l'électricité dans la zone affectée au panneau principal. L'eau et l'électricité ne font pas bon ménage, et un plafond mouillé près d'un luminaire est un risque réel.",
          "Documentez avec votre téléphone: photos et courte vidéo de la fuite, des zones touchées, et de l'eau récupérée. Si vous faites une réclamation d'assurance, ces photos doubleront vos chances d'un règlement rapide.",
          "Contactez votre assureur pour ouvrir un dossier — même si vous n'êtes pas sûr du remboursement. Le simple fait d'avoir une réclamation ouverte au moment de l'incident protège vos droits.",
        ],
      },
      {
        heading: "Ce qu'il faut éviter",
        paragraphs: [
          "Ne montez pas sur le toit pendant une tempête active. C'est la première cause d'accidents graves liés aux fuites: chute, glissade sur un toit mouillé, électrocution si la foudre est proche. La toiture peut attendre la fin de la pluie.",
          "Ne posez pas de bâche bleue temporaire avec des clous dans les bardeaux secs adjacents. C'est tentant mais ça crée des nouveaux trous qui doivent être réparés correctement plus tard, et la bâche se libère au premier vent fort.",
          "Ne signez aucun contrat d'urgence avec un couvreur qui se présente à votre porte 30 minutes après l'incident en disant pouvoir réparer tout de suite. Les vrais professionnels sont rarement disponibles dans l'heure — sauf cas exceptionnel.",
        ],
      },
      {
        heading: "Quand appeler un couvreur d'urgence",
        paragraphs: [
          "Si la fuite débite plus d'un seau aux 30 minutes pendant une pluie modérée: la zone d'infiltration est probablement large et nécessite une intervention rapide pour limiter les dégâts intérieurs.",
          "Si l'eau s'infiltre près d'un panneau électrique, d'un luminaire, ou d'une boîte électrique au plafond: risque sérieux, intervention nécessaire dans les heures qui suivent.",
          "Si plusieurs bardeaux sont visiblement déplacés ou arrachés (visible du sol): l'urgence est de bâcher proprement la zone avant la prochaine averse, pas nécessairement de refaire la toiture le jour même.",
          "Pour les fuites mineures (quelques gouttes, plafond légèrement taché), vous pouvez planifier une visite dans les 48-72 heures suivant la fin de la pluie. C'est moins cher et permet d'obtenir une réparation soignée plutôt qu'un bâchage d'urgence.",
        ],
      },
      {
        heading: "La réparation: ciblée ou complète?",
        paragraphs: [
          "Une fuite localisée sur une toiture de moins de 12 ans = presque toujours une réparation ciblée. On enlève quelques bardeaux, on refait le solin ou on remplace une zone précise, et c'est terminé.",
          "Une fuite sur une toiture de plus de 18 ans = il faut évaluer s'il vaut mieux réparer ou planifier le remplacement à court terme. Une réparation coûte une fraction du remplacement, mais si la toiture en est à sa dernière année, dépenser sur la réparation est de l'argent jeté.",
          "Dans tous les cas: un couvreur sérieux vous donnera les deux options avec leurs coûts respectifs et leur durée de vie attendue, pour que vous puissiez décider.",
        ],
      },
    ],
    closing: "Une fuite gérée intelligemment dans la première heure coûte beaucoup moins cher qu'une fuite ignorée. Si vous avez besoin d'une visite rapide à Gatineau ou dans l'Outaouais, demandez une soumission par formulaire ou téléphone — nous évaluons gratuitement et offrons des solutions adaptées à la sévérité.",
  },
  en: {
    title: "Roof Leak: What to Do (and Avoid) in an Emergency",
    metaDescription: "Action plan when a roof leaks in Gatineau: protect the interior, contain water, what can wait, and when to call an emergency roofer.",
    intro: "An active ceiling leak during heavy rain is stressful. The good news: the first steps to take are simple and almost always limit the damage. The bad news: some intuitive reactions make things worse. Here's a clear action plan.",
    sections: [
      {
        heading: "The first 5 minutes",
        paragraphs: [
          "Move everything that can be damaged out from under the leak: furniture, rugs, electronics. If you can't move it, cover with a thick plastic tarp — not a sheet, which holds water and spreads it.",
          "Place a bucket directly under the drip. Put a towel in the bottom to absorb impact (otherwise splashes travel 1-2 metres).",
          "If water is collecting in a ceiling and forming a hanging bulge: pierce the bulge at the centre with a screwdriver and let the water drain into the bucket. Counter-intuitive but essential — held water will eventually blow out the whole ceiling, and then you're replacing the full panel.",
        ],
      },
      {
        heading: "The next 30 minutes",
        paragraphs: [
          "Cut power to the affected area at the main panel. Water and electricity don't mix, and a wet ceiling near a light fixture is a real risk.",
          "Document with your phone: photos and a short video of the leak, affected areas, and water collected. If you file an insurance claim, these photos will double your chances of a fast settlement.",
          "Contact your insurer to open a file — even if you're unsure about reimbursement. Simply having a claim open at the time of incident protects your rights.",
        ],
      },
      {
        heading: "What to avoid",
        paragraphs: [
          "Don't go on the roof during an active storm. It's the leading cause of serious leak-related accidents: falls, slipping on a wet roof, electrocution if lightning is nearby. The roof can wait for the rain to stop.",
          "Don't nail down a temporary blue tarp into dry adjacent shingles. Tempting, but it creates new holes that need proper repair later, and the tarp comes loose at the first strong gust.",
          "Don't sign any emergency contract with a roofer who shows up at your door 30 minutes after the incident claiming to fix it right now. Real professionals are rarely available within the hour — except in exceptional cases.",
        ],
      },
      {
        heading: "When to call an emergency roofer",
        paragraphs: [
          "If the leak fills more than one bucket every 30 minutes during moderate rain: the infiltration area is likely wide and needs fast intervention to limit interior damage.",
          "If water is seeping near an electrical panel, light fixture, or ceiling junction box: serious risk, intervention needed within hours.",
          "If multiple shingles are visibly displaced or torn off (visible from the ground): the urgency is to tarp the area cleanly before the next shower, not necessarily to replace the roof that day.",
          "For minor leaks (a few drops, slightly stained ceiling), you can plan a visit within 48-72 hours after the rain ends. Cheaper, and lets you get a careful repair rather than an emergency tarp.",
        ],
      },
      {
        heading: "The repair: targeted or full?",
        paragraphs: [
          "A localized leak on a roof under 12 years old = almost always a targeted repair. Remove a few shingles, redo the flashing, or replace a precise area, done.",
          "A leak on a roof over 18 years old = you have to evaluate whether to repair or plan the replacement soon. A repair costs a fraction of a replacement, but if the roof is in its last year, spending on the repair is wasted money.",
          "Either way: a serious roofer will give you both options with respective costs and expected lifespan, so you can decide.",
        ],
      },
    ],
    closing: "A leak handled smartly in the first hour costs far less than one ignored. If you need a fast visit in Gatineau or the Outaouais, request a quote by form or phone — we evaluate for free and offer solutions matched to severity.",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 5. Roof and Quebec winter
// ─────────────────────────────────────────────────────────────────────────────
const ROOF_WINTER_QUEBEC: Record<Lang, LongFormContent> = {
  fr: {
    title: "Toiture et hiver québécois: glace, neige, et ventilation",
    metaDescription: "Comment une toiture résiste à l'hiver de l'Outaouais: barrages de glace, accumulation de neige, ventilation du grenier, et entretien préventif.",
    intro: "L'hiver à Gatineau, c'est en moyenne 250 cm de neige, des cycles gel-dégel multiples, et des vents qui peuvent dépasser 90 km/h. Une toiture résidentielle subit plus de stress entre novembre et avril qu'en six mois d'été. Voici ce qui se passe au-dessus de vos têtes pendant les mois froids et comment éviter les problèmes coûteux.",
    sections: [
      {
        heading: "Le phénomène des barrages de glace",
        paragraphs: [
          "Un barrage de glace se forme quand la chaleur du grenier fait fondre la neige au centre du toit, l'eau coule vers l'avant-toit (où il fait plus froid), et y regèle. La glace s'accumule, finit par soulever les bardeaux, et l'eau qui suit s'infiltre directement dans le platelage.",
          "C'est la première cause de dégâts hivernaux sur les maisons de Gatineau, en particulier sur les bungalows et les maisons à toit peu pentu construites entre 1970 et 1995, qui ont souvent une ventilation de grenier insuffisante.",
          "Les signes visibles: glaçons épais accrochés aux gouttières, plaque de glace continue le long de l'avant-toit, taches d'humidité qui apparaissent à l'intérieur près du mur extérieur après un redoux.",
        ],
      },
      {
        heading: "Pourquoi la ventilation du grenier est critique",
        paragraphs: [
          "Un grenier bien ventilé reste à la même température que l'extérieur. La neige ne fond pas par-dessous, le barrage de glace ne se forme pas, et la toiture dure plus longtemps.",
          "Pour fonctionner, la ventilation a besoin de deux choses: une entrée d'air aux soffites (au bas du toit) et une sortie d'air en haut (évents de toit, faîtière ventilée). Si l'un ou l'autre est obstrué — par de l'isolant qui bloque les soffites, ou des évents bouchés par les feuilles — le système ne fonctionne pas.",
          "Norme québécoise actuelle: 1 pi² de ventilation par 300 pi² de surface de plancher de grenier, divisée à parts égales entre entrée et sortie. La majorité des maisons construites avant 1990 sont en dessous de cette norme.",
        ],
      },
      {
        heading: "Combien de neige une toiture peut supporter",
        paragraphs: [
          "Une toiture résidentielle moderne au Québec est conçue pour environ 1.5 kPa de charge de neige, ce qui équivaut à roughly 70-90 cm de neige humide tassée. La plupart des hivers à Gatineau ne dépassent pas cette charge en accumulation simultanée — la neige fond et glisse par segments.",
          "Le risque réel: une grosse chute de neige humide (verglas + neige), suivie d'une bordée légère qui couvre le tout. Là, on peut dépasser la charge prévue en quelques heures.",
          "Si vous voyez des fissures qui apparaissent dans les murs intérieurs, des portes intérieures qui se mettent à coincer, ou un grincement nouveau dans la structure — ce sont des signes d'une charge anormale sur le toit. C'est le moment d'envisager un déneigement professionnel.",
        ],
      },
      {
        heading: "Déneiger une toiture: quand et comment",
        paragraphs: [
          "Pour une toiture résidentielle standard, le déneigement n'est presque jamais nécessaire si la charpente est en bon état et la neige se libère naturellement. C'est surtout pour les toitures plates (commerciales) et les sections à faible pente.",
          "Si vous décidez de déneiger: ne montez pas sur le toit vous-même. Utilisez une perche à neige télescopique depuis le sol pour racler la première rangée d'avant-toit. C'est cette zone qui fait la différence pour les barrages de glace, pas le centre du toit.",
          "Pour les commerces avec toits plats ou les bungalows à toit peu pentu, faites appel à un professionnel — c'est trop risqué de monter sur une surface glacée même avec de l'expérience.",
        ],
      },
      {
        heading: "L'entretien avant l'hiver",
        paragraphs: [
          "Nettoyez les gouttières à la mi-octobre. Des gouttières pleines de feuilles favorisent les barrages de glace en bord de toit et abîment vos gouttières quand l'eau gelée déborde.",
          "Inspectez le calfeutrage des sorties de toit (évents de plomberie, hottes, cheminées). Le calfeutrage devient cassant après 8-10 ans et c'est là que l'eau commence à entrer.",
          "Si vous voyez de la mousse ou des lichens sur le versant nord, faites un traitement avant les premières neiges. Sous la neige humide, ces végétations accélèrent la dégradation des bardeaux.",
        ],
      },
    ],
    closing: "L'hiver met votre toiture à l'épreuve chaque année. Une inspection en septembre-octobre, avant les premières neiges, coûte une visite et évite des fuites en janvier qui coûtent dix fois plus à réparer. Demandez votre inspection automnale gratuite.",
  },
  en: {
    title: "Roofing and Quebec Winter: Ice, Snow, and Ventilation",
    metaDescription: "How a roof survives an Outaouais winter: ice dams, snow load, attic ventilation, and preventive maintenance for Gatineau homes.",
    intro: "Winter in Gatineau averages 250 cm of snow, multiple freeze-thaw cycles, and winds that can top 90 km/h. A residential roof takes more stress between November and April than during six months of summer. Here's what happens above your head during the cold months and how to avoid expensive problems.",
    sections: [
      {
        heading: "Ice dam phenomenon",
        paragraphs: [
          "An ice dam forms when attic heat melts snow at the middle of the roof, the water runs to the eave (where it's colder), and refreezes there. Ice builds up, eventually lifts the shingles, and water following finds its way directly into the deck.",
          "It's the leading cause of winter damage on Gatineau homes, especially bungalows and low-pitch roof homes built between 1970-1995, which often have inadequate attic ventilation.",
          "Visible signs: thick icicles hanging from gutters, a continuous slab of ice along the eave, dampness appearing inside near exterior walls after a warm spell.",
        ],
      },
      {
        heading: "Why attic ventilation is critical",
        paragraphs: [
          "A well-ventilated attic stays close to outside temperature. Snow doesn't melt underneath, the ice dam doesn't form, and the roof lasts longer.",
          "To work, ventilation needs two things: air intake at the soffits (bottom of the roof) and air exhaust at the top (roof vents, ridge vents). If either is blocked — by insulation blocking soffits, or vents plugged by leaves — the system fails.",
          "Current Quebec standard: 1 sq ft of ventilation per 300 sq ft of attic floor area, split evenly between intake and exhaust. Most homes built before 1990 are below this standard.",
        ],
      },
      {
        heading: "How much snow a roof can hold",
        paragraphs: [
          "A modern Quebec residential roof is designed for about 1.5 kPa of snow load, roughly equivalent to 70-90 cm of compacted wet snow. Most Gatineau winters don't exceed that as simultaneous accumulation — snow melts and slides off in segments.",
          "The real risk: a heavy wet snowfall (sleet + snow), followed by a light dump on top. There, you can exceed designed load within hours.",
          "If you see new cracks in interior walls, interior doors that start to stick, or new creaks in the structure — these are signs of abnormal load on the roof. Time to consider professional snow removal.",
        ],
      },
      {
        heading: "Roof snow removal: when and how",
        paragraphs: [
          "For a standard residential roof, snow removal is almost never necessary if the frame is in good shape and snow releases naturally. It's mostly for flat (commercial) roofs and low-slope sections.",
          "If you decide to clear: don't climb on the roof yourself. Use a telescoping roof rake from the ground to clear the first row at the eave. That's the zone that matters for ice dams, not the centre of the roof.",
          "For commercial buildings with flat roofs or low-pitch bungalows, call a professional — too risky to climb on an icy surface even with experience.",
        ],
      },
      {
        heading: "Pre-winter maintenance",
        paragraphs: [
          "Clean gutters in mid-October. Leaf-clogged gutters worsen edge ice dams and damage the gutters themselves when frozen water overflows.",
          "Inspect sealant around roof penetrations (plumbing vents, range hoods, chimneys). Sealant turns brittle after 8-10 years and that's where water starts entering.",
          "If you see moss or lichen on the north slope, treat before first snow. Under wet snow, this growth accelerates shingle degradation.",
        ],
      },
    ],
    closing: "Winter tests your roof every year. An inspection in September-October, before first snow, costs one visit and prevents January leaks that cost ten times more to repair. Request your free fall inspection.",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 6. Roofing warranties: what's covered
// ─────────────────────────────────────────────────────────────────────────────
const ROOF_WARRANTY: Record<Lang, LongFormContent> = {
  fr: {
    title: "Garanties d'une nouvelle toiture: ce qui est couvert (et ce qui ne l'est pas)",
    metaDescription: "Comprendre les garanties manufacturier et main-d'œuvre sur une toiture neuve à Gatineau, les différences entre 25 ans et « à vie », et les exclusions courantes.",
    intro: "Quand un couvreur vous parle de « garantie 25 ans » ou « garantie à vie », ces mots cachent des distinctions importantes. Une vraie garantie de toiture, c'est en réalité deux garanties superposées avec des couvertures très différentes — et une longue liste d'exclusions standard. Voici ce qu'il faut savoir avant de signer.",
    sections: [
      {
        heading: "Les deux garanties superposées",
        paragraphs: [
          "Garantie du manufacturier sur le matériel: couvre les défauts de fabrication des bardeaux eux-mêmes. Typiquement 25 ans à vie pour les bardeaux architecturaux. Couvre le remplacement du bardeau défectueux — mais souvent au pro-rata après quelques années, et presque jamais la main-d'œuvre de pose.",
          "Garantie du couvreur sur la main-d'œuvre: couvre les défauts de pose (clous mal placés, solins mal scellés, ventilation inadéquate). Typiquement 5 à 10 ans, parfois plus selon le couvreur. C'est cette garantie qui vous protège contre la majorité des fuites précoces.",
          "Les deux sont indépendantes: un bardeau défectueux est un problème manufacturier, mais s'il fuit à cause d'une pose ratée, c'est le couvreur qui doit corriger. En cas de litige, c'est cette frontière qui est la plus contestée.",
        ],
      },
      {
        heading: "Les types de garantie manufacturier",
        paragraphs: [
          "Garantie standard (souvent dite « 25 ans »): couvre seulement le matériel défectueux, sans frais de main-d'œuvre. Si un bardeau se désagrège après 8 ans, vous recevez quelques nouveaux bardeaux du manufacturier — mais devez payer un couvreur pour les installer.",
          "Garantie « système » ou « élite »: offerte par certains manufacturiers (IKO, GAF, BP, Owens Corning) si la pose est faite par un couvreur certifié et avec leurs accessoires (sous-couche, membrane d'avant-toit, ventilation). Cette garantie inclut souvent la main-d'œuvre pendant les 10-25 premières années.",
          "Garantie « à vie »: terme marketing. Lire les petits caractères — « à vie » signifie souvent la vie de la toiture (jusqu'au remplacement), pas la vie du propriétaire. Et le « à vie » est presque toujours au pro-rata après 5-10 ans.",
        ],
      },
      {
        heading: "Les exclusions courantes",
        paragraphs: [
          "Dommages causés par les événements météo extrêmes (vents au-dessus de 100 km/h, grêle de plus de 2 cm). Ces dommages sont couverts par votre assurance habitation, pas par la garantie du bardeau.",
          "Dommages causés par une ventilation inadéquate du grenier. Si la garantie système est conditionnelle à la pose d'évents conformes, et que ces évents ne sont pas là ou sont mal installés, la garantie tombe.",
          "Dommages causés par un changement structural (ajout d'une lucarne, perçage d'un évent supplémentaire) fait après la pose initiale, sans coordination avec le couvreur original.",
          "Décoloration normale liée à l'exposition UV. Les bardeaux foncés pâlissent avec le temps — c'est physique, pas un défaut.",
        ],
      },
      {
        heading: "La garantie main-d'œuvre du couvreur",
        paragraphs: [
          "C'est souvent la plus importante des deux pour les 10 premières années. Posez la question directement: « Quelle est votre garantie écrite sur la main-d'œuvre? » Si on vous répond « la garantie du manufacturier » sans détail sur la main-d'œuvre, c'est un signal.",
          "Un couvreur établi à Gatineau depuis plusieurs années offre normalement 10 ans de garantie main-d'œuvre par écrit. Sous 5 ans, c'est dans la moyenne basse. Aucune garantie écrite (juste verbale) = drapeau rouge.",
          "La garantie main-d'œuvre devrait être transférable au prochain propriétaire si vous vendez la maison. C'est un argument de vente concret, et c'est ce qui distingue un vrai couvreur d'un sous-traitant à courte vue.",
        ],
      },
      {
        heading: "Ce qu'il faut conserver",
        paragraphs: [
          "Le contrat signé et la facture finale avec le détail des matériaux utilisés (marque, modèle, couleur, lot).",
          "Le certificat de garantie manufacturier émis après la pose. Sans ce certificat, la garantie « système » étendue ne s'active pas.",
          "Un dossier photo avant/après. Utile pour vous, utile pour la revente, utile en cas de réclamation.",
        ],
      },
    ],
    closing: "Une garantie sérieuse, ce n'est pas le couvreur qui vous la lit, c'est celui qui vous la remet par écrit avant que vous signiez. Couvreur Gatineau fournit une garantie main-d'œuvre écrite de 10 ans, transférable, sur toute pose résidentielle. Demandez une soumission pour voir tous les détails.",
  },
  en: {
    title: "New Roof Warranties: What's Covered (and What's Not)",
    metaDescription: "Understanding manufacturer and workmanship warranties on a new roof in Gatineau, the difference between '25 years' and 'lifetime', and common exclusions.",
    intro: "When a roofer talks about '25-year warranty' or 'lifetime warranty', those words hide important distinctions. A real roof warranty is actually two layered warranties with very different coverage — and a long list of standard exclusions. Here's what to know before signing.",
    sections: [
      {
        heading: "The two layered warranties",
        paragraphs: [
          "Manufacturer warranty on materials: covers manufacturing defects in the shingles themselves. Typically 25 years to lifetime for architectural shingles. Covers replacement of defective shingle — but often prorated after a few years, and almost never the labour to install.",
          "Roofer's workmanship warranty: covers installation defects (misplaced nails, poorly sealed flashings, inadequate ventilation). Typically 5-10 years, sometimes more depending on the roofer. This warranty protects you against most early leaks.",
          "The two are independent: a defective shingle is a manufacturer issue, but if it leaks because of bad install, the roofer must fix it. In disputes, this boundary is the most contested.",
        ],
      },
      {
        heading: "Types of manufacturer warranty",
        paragraphs: [
          "Standard warranty (often called '25 years'): covers only the defective material, no labour costs. If a shingle disintegrates after 8 years, you get a few new shingles from the manufacturer — but you pay a roofer to install them.",
          "'System' or 'elite' warranty: offered by certain manufacturers (IKO, GAF, BP, Owens Corning) if the install is by a certified roofer using their accessories (underlayment, eave membrane, ventilation). Often includes labour for the first 10-25 years.",
          "'Lifetime' warranty: marketing language. Read the fine print — 'lifetime' often means the life of the roof (until replacement), not the owner's life. And 'lifetime' is almost always prorated after 5-10 years.",
        ],
      },
      {
        heading: "Common exclusions",
        paragraphs: [
          "Damage from extreme weather events (winds over 100 km/h, hail over 2 cm). That's covered by your home insurance, not the shingle warranty.",
          "Damage caused by inadequate attic ventilation. If the system warranty is conditional on proper vents, and those vents aren't there or are wrongly installed, the warranty falls.",
          "Damage from a structural change (adding a dormer, drilling an extra vent) made after the initial install without coordination with the original roofer.",
          "Normal discoloration from UV exposure. Dark shingles fade — that's physics, not a defect.",
        ],
      },
      {
        heading: "The roofer's workmanship warranty",
        paragraphs: [
          "Often the more important of the two for the first 10 years. Ask directly: 'What is your written workmanship warranty?' If the answer is 'the manufacturer's warranty' without detail on labour, that's a signal.",
          "A roofer established in Gatineau for several years normally offers 10 years of written workmanship warranty. Under 5 years is on the low end. No written warranty (verbal only) = red flag.",
          "The workmanship warranty should be transferable to the next owner if you sell. It's a concrete selling point, and what separates a real roofer from a short-term subcontractor.",
        ],
      },
      {
        heading: "What to keep",
        paragraphs: [
          "Signed contract and final invoice with detail of materials used (brand, model, colour, batch number).",
          "Manufacturer warranty certificate issued after install. Without this certificate, the extended 'system' warranty doesn't activate.",
          "A before/after photo file. Useful for you, useful for resale, useful in case of a claim.",
        ],
      },
    ],
    closing: "A serious warranty isn't what the roofer reads to you — it's what they put in writing before you sign. Gatineau Roofing provides a 10-year transferable written workmanship warranty on all residential installs. Request a quote to see all the details.",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Public accessors used by app/[lang]/<slug>/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
export function getDamagedRoofSignsGuide(lang: Lang): LongFormContent {
  return DAMAGED_ROOF_SIGNS[lang];
}
export function getShinglesVsMetalGuide(lang: Lang): LongFormContent {
  return SHINGLES_VS_METAL[lang];
}
export function getRoofInspectionGuide(lang: Lang): LongFormContent {
  return ROOF_INSPECTION[lang];
}
export function getRoofLeakEmergencyGuide(lang: Lang): LongFormContent {
  return ROOF_LEAK_EMERGENCY[lang];
}
export function getRoofWinterQuebecGuide(lang: Lang): LongFormContent {
  return ROOF_WINTER_QUEBEC[lang];
}
export function getRoofWarrantyGuide(lang: Lang): LongFormContent {
  return ROOF_WARRANTY[lang];
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. Commercial roofing
// ─────────────────────────────────────────────────────────────────────────────
const COMMERCIAL_ROOFING: Record<Lang, LongFormContent> = {
  fr: {
    title: "Toiture commerciale à Gatineau : ce qui change par rapport au résidentiel",
    metaDescription: "Différences clés entre toiture commerciale et résidentielle : membrane TPO/EPDM, toits plats, durée de vie, et ce que les propriétaires d'immeubles à Gatineau doivent savoir.",
    intro: "Une toiture commerciale n'a presque rien en commun avec une toiture résidentielle, sauf la fonction de garder l'eau dehors. Les matériaux, la pente, la durée de vie, le coût, et les obligations contractuelles sont tous différents. Si vous gérez un immeuble locatif, un commerce, ou un bâtiment industriel à Gatineau, voici ce qu'il faut comprendre avant de planifier des travaux.",
    sections: [
      {
        heading: "Les trois grands types de toiture commerciale",
        paragraphs: [
          "Membrane TPO (thermoplastique) : le plus répandu sur les nouveaux bâtiments commerciaux dans l'Outaouais depuis une quinzaine d'années. Blanc réfléchissant, résistant aux UV, durée de vie 20-30 ans selon l'épaisseur (45, 60 ou 80 mil). Soudure thermique entre les feuilles — pas de joints collés.",
          "Membrane EPDM (caoutchouc synthétique) : noir, durable, durée de vie similaire mais absorbe la chaleur (mauvais pour la facture de climatisation). Beaucoup d'immeubles construits entre 1990 et 2010 sont en EPDM.",
          "Membrane bitumineuse modifiée (deux couches) : la « vieille fiable ». Durée de vie 20-25 ans. Installation au chalumeau ou autoadhésive. C'est ce qu'on voit le plus sur les commerces de Hull, Gatineau secteur, et Buckingham construits dans les années 80-90.",
        ],
      },
      {
        heading: "Pente et drainage : la grande différence",
        paragraphs: [
          "Les toitures commerciales sont presque toujours à pente faible (« plates » au visuel — en réalité une pente de 1/4 à 1/2 pouce par pied). Cette pente subtile dirige l'eau vers les drains de toit ou les déversoirs en bordure. Si ces drains se bouchent (feuilles, débris, glace), l'eau s'accumule en piscine, ce qui ajoute des centaines de kilos de charge et peut provoquer une infiltration ou même un affaissement structurel.",
          "Conséquence : le nettoyage annuel des drains de toit est non-négociable. Beaucoup de propriétaires d'immeubles oublient ce point et découvrent le problème quand une fuite apparaît au 3ème étage après une grosse pluie.",
        ],
      },
      {
        heading: "Inspection et entretien",
        paragraphs: [
          "Pour les toitures commerciales à Gatineau, une inspection biannuelle (printemps + automne) est la norme professionnelle. Au printemps : vérifier les dégâts d'hiver (glace, accumulation de neige, dommages mécaniques). À l'automne : nettoyer les drains, sceller les joints qui ont bougé pendant l'été, préparer pour les premières neiges.",
          "Les obligations contractuelles varient : plusieurs baux commerciaux imposent au locataire l'entretien préventif de la toiture, surtout dans les sous-locations. Lisez les clauses « maintenance des structures » avant d'assumer que c'est au propriétaire.",
        ],
      },
      {
        heading: "Réparation vs réfection complète",
        paragraphs: [
          "Sur une toiture commerciale, le calcul est différent du résidentiel : la membrane peut souvent être réparée localement avec une pièce de la même membrane soudée à chaud, même sur une membrane de 15 ans. Une réparation ciblée peut prolonger la vie utile de 5-10 ans à un coût marginal.",
          "Quand envisager la réfection complète : multiples zones réparées dans les 24 derniers mois, isolant sous-jacent endommagé (qu'on découvre lors d'une réparation), ou la membrane atteint 80 % de sa durée annoncée et le propriétaire prévoit garder l'immeuble 5+ ans.",
          "Une option intermédiaire : la « membrane sur membrane » — coller une nouvelle membrane TPO par-dessus l'ancienne EPDM ou bitumineuse encore en bonne forme structurelle. Économise 30-40 % vs une réfection complète et donne 15-20 ans supplémentaires. Pas applicable si l'isolant est endommagé.",
        ],
      },
      {
        heading: "Comment demander une soumission commerciale",
        paragraphs: [
          "Pour un commerce ou un immeuble à Gatineau, demandez une soumission avec : surface mesurée et confirmée (pas estimée d'en bas), spécification précise des matériaux (marque, modèle, épaisseur), garantie main-d'œuvre écrite, calendrier d'exécution incluant les contraintes opérationnelles (ne pas bloquer l'accès aux locataires, travail hors heures si nécessaire), et certificat d'assurance responsabilité civile de l'entrepreneur (5M $ minimum pour le commercial).",
          "Couvreur Gatineau intervient en commercial dans tout l'Outaouais — réparations ciblées, réfections complètes, inspections annuelles préventives, et urgences. Visite d'évaluation sans frais avec rapport écrit et photos.",
        ],
      },
    ],
    closing: "Une toiture commerciale bien entretenue n'est pas une dépense — c'est de la prévention des sinistres. Pour une évaluation de votre immeuble à Gatineau, contactez-nous pour une visite sans frais.",
  },
  en: {
    title: "Commercial Roofing in Gatineau: What's Different From Residential",
    metaDescription: "Key differences between commercial and residential roofing: TPO/EPDM membrane, flat roofs, lifespan, and what Gatineau building owners need to know.",
    intro: "A commercial roof has almost nothing in common with a residential roof except keeping water out. Materials, slope, lifespan, cost, and contractual obligations are all different. If you manage a rental building, a business, or industrial property in Gatineau, here's what to understand before planning work.",
    sections: [
      {
        heading: "The three main types of commercial roofing",
        paragraphs: [
          "TPO membrane (thermoplastic): most common on newer commercial buildings in the Outaouais for the past 15 years. White reflective, UV-resistant, 20-30 year lifespan by thickness (45, 60, or 80 mil). Heat-welded seams — no glued joints.",
          "EPDM membrane (synthetic rubber): black, durable, similar lifespan but absorbs heat (bad for AC bills). Many buildings constructed between 1990-2010 are EPDM.",
          "Modified bitumen (two-layer): the old workhorse. 20-25 year lifespan. Torch-applied or self-adhesive installation. Most commonly seen on Hull, Gatineau sector, and Buckingham commercial buildings from the 80s-90s.",
        ],
      },
      {
        heading: "Slope and drainage: the big difference",
        paragraphs: [
          "Commercial roofs are almost always low-slope (visually 'flat' — in reality 1/4 to 1/2 inch per foot pitch). This subtle slope directs water to roof drains or edge scuppers. If those drains clog (leaves, debris, ice), water pools, adding hundreds of pounds of load and potentially causing infiltration or even structural sagging.",
          "Consequence: annual drain cleaning is non-negotiable. Many building owners forget this and discover the problem when a 3rd-floor leak appears after a heavy rain.",
        ],
      },
      {
        heading: "Inspection and maintenance",
        paragraphs: [
          "For commercial roofs in Gatineau, biannual inspections (spring + fall) are the professional standard. Spring: check winter damage (ice, snow accumulation, mechanical damage). Fall: clean drains, reseal joints that shifted in summer heat, prep for first snow.",
          "Contractual obligations vary: many commercial leases assign roof preventive maintenance to the tenant, especially in subletting situations. Read the 'structure maintenance' clauses before assuming the owner handles it.",
        ],
      },
      {
        heading: "Repair vs full replacement",
        paragraphs: [
          "On a commercial roof, the math differs from residential: the membrane can often be locally repaired with a patch of the same membrane heat-welded in, even on a 15-year-old membrane. A targeted repair can extend useful life by 5-10 years at marginal cost.",
          "When to consider full replacement: multiple repaired zones in the last 24 months, damage to underlying insulation discovered during a repair, or membrane at 80% of stated lifespan and the owner plans to hold the building 5+ years.",
          "An intermediate option: 'membrane over membrane' — glue a new TPO membrane over the still-structurally-sound EPDM or bitumen. Saves 30-40% vs full replacement and adds 15-20 years. Not applicable if insulation is compromised.",
        ],
      },
      {
        heading: "How to ask for a commercial quote",
        paragraphs: [
          "For a Gatineau commercial property, request a quote that includes: measured and confirmed surface (not eyeballed from the ground), precise material spec (brand, model, thickness), written workmanship warranty, execution timeline with operational constraints noted (not blocking tenant access, after-hours work if needed), and the contractor's liability insurance certificate ($5M minimum for commercial).",
          "Gatineau Roofing handles commercial work across the Outaouais — targeted repairs, full replacements, annual preventive inspections, and emergencies. Free assessment visit with written report and photos.",
        ],
      },
    ],
    closing: "A well-maintained commercial roof isn't an expense — it's loss prevention. For an assessment of your Gatineau building, contact us for a free visit.",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 8. Attic ventilation deep-dive
// ─────────────────────────────────────────────────────────────────────────────
const ATTIC_VENTILATION: Record<Lang, LongFormContent> = {
  fr: {
    title: "Ventilation d'entretoit à Gatineau : pourquoi c'est la cause #1 de toitures qui meurent trop tôt",
    metaDescription: "Comprendre la ventilation de grenier dans une maison québécoise : norme actuelle, signes d'une ventilation déficiente, et coût de la correction lors d'une réfection.",
    intro: "Si une toiture en bardeaux d'asphalte de Gatineau dure 15 ans au lieu des 25 attendus, la cause est presque toujours la ventilation d'entretoit. C'est invisible, c'est mal expliqué par la majorité des couvreurs au moment de la soumission, et c'est le facteur qui transforme une bonne pose en mauvaise pose. Voici ce qui se passe et comment vérifier que la vôtre fonctionne.",
    sections: [
      {
        heading: "À quoi sert vraiment la ventilation d'entretoit",
        paragraphs: [
          "L'entretoit doit rester à la température extérieure, été comme hiver. En été, ça empêche la chaleur qui monte du chauffage solaire de faire cuire les bardeaux par le dessous (qui les fragilise et raccourcit la durée de vie). En hiver, ça empêche la chaleur de la maison de monter dans l'entretoit, de faire fondre la neige sur le toit, et de causer des barrages de glace.",
          "Le système fonctionne uniquement quand l'air circule : entrée d'air froid aux soffites (en bas du toit) et sortie d'air chaud aux évents de toit ou à la faîtière ventilée (en haut). C'est un effet cheminée — l'air chaud monte naturellement, l'air froid prend sa place. Si l'un des deux est bloqué, le système ne fonctionne plus du tout.",
        ],
      },
      {
        heading: "La norme actuelle au Québec",
        paragraphs: [
          "Code de construction du Québec et bonnes pratiques 2026 : 1 pi² de ventilation par 300 pi² de surface de plancher d'entretoit, divisée à parts égales entre entrée (soffites) et sortie (évents/faîtière). Pour un bungalow standard de 1 200 pi², ça donne environ 4 pi² au total, soit 2 pi² d'entrée et 2 pi² de sortie.",
          "La majorité des maisons construites avant 1990 dans l'Outaouais sont en dessous de cette norme. Beaucoup ont des soffites « décoratifs » sans réelle perforation, ou des évents de toit bouchés par l'isolant qui a été soufflé sans déflecteurs.",
        ],
      },
      {
        heading: "Comment vérifier sans monter sur le toit",
        paragraphs: [
          "Test 1 — la main aux soffites : par une journée venteuse, placez la main près d'un soffite en regardant vers le haut. Vous devriez sentir une légère succion d'air vers l'entretoit. Aucun mouvement = soffite bouché.",
          "Test 2 — l'inspection des combles : en pleine journée d'été, montez au grenier. La température devrait être proche de l'extérieur (à 5-10 °C près). Si vous trouvez 50 °C alors qu'il fait 28 °C dehors, la ventilation est insuffisante.",
          "Test 3 — l'inspection l'hiver : après une chute de neige, comparez votre toit à celui des voisins. Si votre toit montre des plaques fondues alors que les leurs gardent une couverture uniforme, votre entretoit est plus chaud que la normale (= mauvaise ventilation ou mauvaise isolation).",
        ],
      },
      {
        heading: "Corriger la ventilation lors d'une réfection",
        paragraphs: [
          "Une réfection complète de toiture est le seul moment où on peut facilement améliorer la ventilation. Le couvreur peut : installer une faîtière ventilée (continue, beaucoup plus efficace que les évents ponctuels), ajouter des évents de toit là où il en manque, installer des déflecteurs aux soffites pour empêcher l'isolant de bloquer l'entrée d'air, et remplacer les soffites perforés trop petits par des soffites en aluminium avec perforation ASTM correcte.",
          "Coût additionnel d'une mise aux normes lors d'une réfection : généralement entre 5 et 12 % du prix de la toiture. À comparer avec : 25 % de durée de vie supplémentaire (5-7 ans), élimination des barrages de glace, et réduction de la facture de climatisation l'été.",
        ],
      },
      {
        heading: "Le piège : la ventilation mécanique",
        paragraphs: [
          "Certaines compagnies vendent des « ventilateurs d'entretoit motorisés » comme solution miracle. Réalité : ces ventilateurs créent une dépression dans l'entretoit qui peut tirer l'air chaud directement de la maison à travers l'isolant — résultat opposé du but recherché. La ventilation passive (soffites + faîtière) est presque toujours suffisante et préférable.",
          "Cas particulier où la ventilation mécanique a du sens : entretoits exceptionnellement complexes (avec retours d'angle multiples) où la convection naturelle ne suffit pas. C'est rare en résidentiel standard.",
        ],
      },
    ],
    closing: "Si vous planifiez une réfection de toiture à Gatineau, demandez explicitement quel est le plan de ventilation prévu. Un couvreur qui ne traite pas ce point ne vous installe pas une toiture qui dure. Pour une inspection ou une soumission avec analyse complète de la ventilation, contactez-nous.",
  },
  en: {
    title: "Attic Ventilation in Gatineau: The #1 Reason Roofs Die Too Soon",
    metaDescription: "Understanding attic ventilation in a Quebec home: current standard, signs of poor ventilation, and the cost of fixing it during a re-roof.",
    intro: "If an asphalt shingle roof in Gatineau lasts 15 years instead of the expected 25, attic ventilation is almost always the cause. It's invisible, poorly explained by most roofers at quote time, and the factor that turns a good install into a bad one. Here's what's happening and how to verify yours is working.",
    sections: [
      {
        heading: "What attic ventilation actually does",
        paragraphs: [
          "The attic needs to stay close to outside temperature, summer and winter. In summer, this prevents solar heat from cooking shingles from below (which weakens them and shortens lifespan). In winter, it stops house heat from rising into the attic, melting roof snow, and creating ice dams.",
          "The system only works when air circulates: cold air intake at the soffits (bottom of roof) and hot air exhaust at roof vents or ridge vent (top). It's a chimney effect — hot air rises naturally, cold air takes its place. If either side is blocked, the system fails entirely.",
        ],
      },
      {
        heading: "Current Quebec standard",
        paragraphs: [
          "Quebec building code and 2026 best practice: 1 sq ft of ventilation per 300 sq ft of attic floor area, evenly split between intake (soffits) and exhaust (vents/ridge). For a standard 1,200 sq ft bungalow, that's about 4 sq ft total, 2 in + 2 out.",
          "Most Outaouais homes built before 1990 fall short. Many have decorative soffits with no real perforation, or roof vents blocked by insulation blown in without baffles.",
        ],
      },
      {
        heading: "How to check without climbing on the roof",
        paragraphs: [
          "Test 1 — hand at the soffit: on a windy day, hold your hand near a soffit looking up. You should feel slight suction toward the attic. No movement = blocked soffit.",
          "Test 2 — attic inspection: in mid-summer, climb to the attic. Temperature should be within 5-10°C of outside. If you find 50°C while it's 28°C outside, ventilation is inadequate.",
          "Test 3 — winter inspection: after a snowfall, compare your roof to neighbours'. If yours has melted patches while theirs keep uniform cover, your attic is warmer than normal (= bad ventilation or bad insulation).",
        ],
      },
      {
        heading: "Fixing ventilation during a re-roof",
        paragraphs: [
          "A complete re-roof is the only easy time to upgrade ventilation. The roofer can: install a ridge vent (continuous, much more effective than spot vents), add roof vents where missing, install baffles at soffits to keep insulation from blocking intake, and replace too-small perforated soffits with aluminium soffits with proper ASTM perforation.",
          "Additional cost to bring it to code during a re-roof: typically 5-12% of the roof price. Compare with: 25% additional lifespan (5-7 years), elimination of ice dams, and reduced summer AC bills.",
        ],
      },
      {
        heading: "The trap: mechanical ventilation",
        paragraphs: [
          "Some companies sell 'powered attic fans' as a magic solution. Reality: these fans create depression in the attic that can pull warm air directly from the house through insulation — opposite of the intended effect. Passive ventilation (soffits + ridge) is almost always sufficient and preferable.",
          "Edge case where mechanical makes sense: exceptionally complex attics with multiple return angles where natural convection fails. Rare in standard residential.",
        ],
      },
    ],
    closing: "If you're planning a re-roof in Gatineau, explicitly ask what the ventilation plan is. A roofer who doesn't address this isn't installing a roof that lasts. For an inspection or quote with full ventilation analysis, contact us.",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 9. Insurance claims for storm/hail damage
// ─────────────────────────────────────────────────────────────────────────────
const INSURANCE_CLAIM: Record<Lang, LongFormContent> = {
  fr: {
    title: "Réclamation d'assurance pour dommages de toiture à Gatineau : ce qui se passe vraiment",
    metaDescription: "Comment fonctionne une réclamation d'assurance habitation pour des dommages de toiture au Québec : ce qui est couvert, ce qui ne l'est pas, et l'ordre des étapes.",
    intro: "Quand une grosse tempête frappe Gatineau, c'est la course aux réclamations d'assurance. La plupart des propriétaires découvrent à ce moment-là que leur compréhension de leur police n'est pas exacte. Voici comment ça fonctionne vraiment, étape par étape, et où sont les pièges.",
    sections: [
      {
        heading: "Ce qui est couvert (généralement)",
        paragraphs: [
          "Dommages soudains et accidentels causés par un événement assuré : vents violents (au-dessus du seuil de votre police, typiquement 80-100 km/h), grêle, chute d'arbre, accumulation de glace anormale. Vous voyez le dommage, vous documentez, vous appelez votre assureur dans les 24-48 h.",
          "Dommages intérieurs résultant d'une infiltration suite à un dommage de toiture couvert : plafonds, planchers, murs, biens endommagés. C'est souvent la partie la plus coûteuse de la réclamation, et c'est pourquoi le délai d'intervention compte autant.",
          "Bâchage d'urgence pour stopper l'eau pendant que la réclamation est en cours. Conservez les reçus — c'est remboursable.",
        ],
      },
      {
        heading: "Ce qui n'est PAS couvert (généralement)",
        paragraphs: [
          "Usure normale et fin de vie utile. Si votre toiture a 24 ans et que le vent en a arraché une section, l'assureur considérera que la toiture était en fin de vie. Ils peuvent refuser ou ne couvrir que partiellement (typiquement au pro-rata de la valeur résiduelle).",
          "Dommages causés par un manque d'entretien. Si l'inspection montre que des bardeaux étaient déjà soulevés depuis longtemps, ou que des solins étaient ouverts, ou que des branches frottaient sur le toit depuis des années, l'assureur peut considérer que l'événement météo a juste révélé un problème préexistant.",
          "Fuites graduelles. Une fuite qui se développe sur des mois et qu'on découvre quand le plafond commence à tacher est presque toujours exclue — c'est considéré comme de l'entretien, pas un sinistre.",
        ],
      },
      {
        heading: "L'ordre des étapes après une tempête",
        paragraphs: [
          "1. Photographier abondamment. Avant de bouger quoi que ce soit, prenez 50+ photos : vue large du toit du sol, gros plan sur chaque zone abîmée, intérieur si infiltration, débris en bas. Si l'eau entre activement, vidéo. Ces preuves valent des milliers de dollars.",
          "2. Sécuriser le bâtiment. Bâcher la zone abîmée, déplacer ce qui peut être abîmé par l'eau. Documentez aussi cette étape.",
          "3. Appeler l'assureur dans les 48 heures. Un dossier ouvert tôt est traité différemment d'une réclamation tardive. Demandez le numéro de dossier et l'identité de l'expert assigné.",
          "4. Obtenir une soumission d'un couvreur avant la visite de l'expert. C'est votre contre-référence — si l'expert propose un règlement très en dessous de votre soumission, vous avez les chiffres pour négocier.",
          "5. Faire venir l'expert. Soyez présent, montrez chaque dommage en personne. Demandez son nom, sa qualification, et son contact direct. Notez ses commentaires sur place.",
          "6. Recevoir l'évaluation écrite. Comparez avec la soumission de votre couvreur. Si l'écart est significatif (>20 %), demandez une révision avec justification détaillée.",
        ],
      },
      {
        heading: "Les pièges courants",
        paragraphs: [
          "Le « couvreur » qui frappe à votre porte 24 h après la tempête. Beaucoup sont des opportunistes qui font des réparations rapides, encaissent l'assurance, et disparaissent. Privilégiez un couvreur établi localement avec une adresse vérifiable et plusieurs années d'historique.",
          "La franchise oubliée. Votre police a probablement une franchise de 1 000-2 500 $. Si le dommage total est de 3 500 $, vous récupérez 1 500 $ et payez le reste. Vérifiez avant d'engager des travaux importants.",
          "L'oubli de la dépréciation. Les assureurs utilisent souvent un calcul « valeur dépréciée » (actual cash value) plutôt que « coût de remplacement neuf ». Sur une toiture de 18 ans, ça peut couper le règlement de 30-40 %. Si votre police inclut « replacement cost » explicitement, demandez l'application — sinon vous laissez de l'argent sur la table.",
        ],
      },
      {
        heading: "Le rôle du couvreur dans la réclamation",
        paragraphs: [
          "Un bon couvreur peut faire bien plus que la soumission : il peut rencontrer l'expert en assurance avec vous, expliquer la nature exacte des dommages, et fournir des photos comparatives qui appuient votre dossier. Plusieurs réclamations sous-payées au départ remontent significativement après une discussion entre l'expert et un vrai professionnel de la toiture.",
          "Couvreur Gatineau intervient sur les dossiers d'assurance dans tout l'Outaouais. Inspection sans frais après tempête, rapport écrit conforme au format demandé par les assureurs, et accompagnement durant la visite de l'expert si vous le souhaitez.",
        ],
      },
    ],
    closing: "Une réclamation bien gérée dans les 48 premières heures peut récupérer plusieurs milliers de dollars qui seraient autrement perdus. Pour une inspection post-tempête à Gatineau, contactez-nous — visite rapide et documentation complète, gratuit.",
  },
  en: {
    title: "Insurance Claims for Roof Damage in Gatineau: How It Actually Works",
    metaDescription: "How a Quebec home insurance claim works for roof damage: what's covered, what's not, and the step-by-step order that gets the best settlement.",
    intro: "When a major storm hits Gatineau, it's a race to file claims. Most owners learn at that moment that their understanding of their policy isn't accurate. Here's how it actually works, step by step, and where the traps are.",
    sections: [
      {
        heading: "What's covered (usually)",
        paragraphs: [
          "Sudden and accidental damage from an insured event: high winds (above your policy threshold, typically 80-100 km/h), hail, falling tree, abnormal ice accumulation. You see the damage, document, call your insurer within 24-48 hours.",
          "Interior damage from infiltration following a covered roof event: ceilings, floors, walls, damaged belongings. Often the most expensive part of the claim, and why response time matters.",
          "Emergency tarping to stop water during the claim. Keep receipts — reimbursable.",
        ],
      },
      {
        heading: "What's NOT covered (usually)",
        paragraphs: [
          "Normal wear and end of useful life. If your roof is 24 years old and wind tore off a section, the insurer will consider it was at end-of-life. They may refuse or only partially cover (typically prorated to residual value).",
          "Damage from lack of maintenance. If inspection shows shingles were already lifted for years, or flashings open, or branches rubbing the roof for ages, the insurer may consider the weather event simply revealed a preexisting problem.",
          "Gradual leaks. A leak that developed over months and was discovered when the ceiling started staining is almost always excluded — that's maintenance, not damage.",
        ],
      },
      {
        heading: "Step order after a storm",
        paragraphs: [
          "1. Photograph abundantly. Before moving anything, take 50+ photos: wide shot of roof from ground, close-up of every damaged area, interior if infiltration, debris on the ground. If water is actively entering, video. These proofs are worth thousands of dollars.",
          "2. Secure the building. Tarp the damaged area, move what could be water-damaged. Document this step too.",
          "3. Call the insurer within 48 hours. A file opened early is treated differently from a late claim. Get the claim number and the assigned adjuster's identity.",
          "4. Get a roofer's quote before the adjuster's visit. This is your counter-reference — if the adjuster proposes a settlement well below your quote, you have the numbers to negotiate.",
          "5. Meet the adjuster. Be present, show every damage in person. Get their name, qualification, and direct contact. Note their on-site comments.",
          "6. Receive the written assessment. Compare with your roofer's quote. If the gap is significant (>20%), request a review with detailed justification.",
        ],
      },
      {
        heading: "Common traps",
        paragraphs: [
          "The 'roofer' knocking on your door 24h after the storm. Many are opportunists who do quick repairs, cash the insurance, and disappear. Prefer a locally established roofer with a verifiable address and multi-year history.",
          "The forgotten deductible. Your policy probably has a $1,000-2,500 deductible. If total damage is $3,500, you receive $1,500 and pay the rest. Verify before committing to major work.",
          "Depreciation oversight. Insurers often use 'actual cash value' rather than 'replacement cost'. On an 18-year-old roof, that can cut settlement by 30-40%. If your policy explicitly includes 'replacement cost', demand its application — otherwise you're leaving money on the table.",
        ],
      },
      {
        heading: "The roofer's role in the claim",
        paragraphs: [
          "A good roofer can do far more than the quote: they can meet the insurance adjuster with you, explain the exact nature of the damage, and provide comparative photos that support your file. Many underpaid initial claims rise significantly after a real roofing professional speaks with the adjuster.",
          "Gatineau Roofing handles insurance files across the Outaouais. Free post-storm inspection, written report in the format insurers request, and accompaniment during the adjuster's visit if you want.",
        ],
      },
    ],
    closing: "A claim well-managed in the first 48 hours can recover several thousand dollars that would otherwise be lost. For a post-storm inspection in Gatineau, contact us — fast visit and complete documentation, free.",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 10. Gutters and downspouts
// ─────────────────────────────────────────────────────────────────────────────
const GUTTERS: Record<Lang, LongFormContent> = {
  fr: {
    title: "Gouttières et descentes pluviales à Gatineau : entretien, remplacement et lien avec la toiture",
    metaDescription: "Pourquoi les gouttières affectent directement la durée de vie d'une toiture : entretien automnal, signes de remplacement, et installation lors d'une réfection.",
    intro: "Les gouttières sont rarement un sujet de conversation passionnant — jusqu'au moment où elles débordent et que l'eau finit dans le sous-sol ou contre la fondation. À Gatineau, où on a 250 cm de neige et des pluies d'été intenses, les gouttières font un travail crucial : elles dirigent les eaux loin de la maison. Voici ce qu'il faut savoir.",
    sections: [
      {
        heading: "Comment les gouttières affectent la toiture",
        paragraphs: [
          "Des gouttières qui ne fonctionnent pas (bouchées, désalignées, percées) créent des refoulements d'eau en bordure de toit. Cette eau s'infiltre sous les premières rangées de bardeaux, pourrit le platelage, et finit par traverser. À Gatineau, c'est l'une des principales causes de fuites en bord de toit que les propriétaires attribuent à tort à un défaut de la toiture elle-même.",
          "Pire en hiver : des gouttières pleines de feuilles favorisent la formation de barrages de glace. La neige fond, l'eau coule dans la gouttière, gèle au contact des feuilles décomposées, et la glace s'accumule jusqu'à soulever les bardeaux de bordure.",
        ],
      },
      {
        heading: "L'entretien minimal",
        paragraphs: [
          "Nettoyage à la fin de l'automne (mi-octobre à mi-novembre selon la chute des feuilles), idéalement après que tous les arbres environnants soient nus. Si vous attendez après les premières gelées, les feuilles humides forment des bouchons compacts difficiles à déloger.",
          "Deuxième nettoyage au printemps (avril) si votre quartier a beaucoup d'arbres : la fonte des neiges peut amener des débris d'hiver dans les gouttières.",
          "Si vous avez plus d'un étage ou êtes mal à l'aise avec une échelle, faites-le faire. Le coût (typiquement 150-300 $ pour une maison résidentielle standard à Gatineau) est négligeable comparé à un dégât d'eau ou une chute.",
        ],
      },
      {
        heading: "Les protections anti-feuilles",
        paragraphs: [
          "Plusieurs systèmes existent : grillages plats, peignes, dômes, micro-mesh. Aucun n'est parfait — tous laissent passer un peu de débris, mais ils réduisent significativement la fréquence du nettoyage (1 fois par 2-3 ans au lieu de annuellement).",
          "Le micro-mesh est le meilleur compromis qualité/prix selon notre expérience à Gatineau : il bloque même les aiguilles de conifère et la pollen, sans bloquer le débit d'eau. Mais il faut un installateur qui sait ce qu'il fait — un micro-mesh mal installé peut faire pire que pas de protection.",
          "Le mauvais investissement : les protections vendues comme « lifetime guarantee, never clean again » à 3 000-5 000 $ pour une maison standard. La marge de profit du vendeur dépasse souvent la valeur réelle.",
        ],
      },
      {
        heading: "Quand remplacer les gouttières",
        paragraphs: [
          "Les gouttières en aluminium continuent (les plus courantes à Gatineau depuis 30 ans) durent 20-30 ans selon l'épaisseur et l'exposition. Signes de fin de vie : sections qui se désaligne au moindre poids de glace, perforations multiples par la corrosion, joints qui fuient malgré les calfeutrages successifs.",
          "Si votre toiture arrive à terme et que vos gouttières ont 20+ ans, le remplacement simultané fait sens : on profite de l'échafaudage et de la main-d'œuvre déjà sur place. Le coût marginal de remplacer les gouttières lors d'une réfection est typiquement 30-40 % moins cher qu'un remplacement isolé.",
        ],
      },
      {
        heading: "Les descentes pluviales : le détail qu'on oublie",
        paragraphs: [
          "Les meilleures gouttières du monde ne servent à rien si les descentes pluviales déversent l'eau directement contre la fondation. La règle : l'eau doit être éloignée de la fondation d'au moins 2 mètres, idéalement vers une pente descendante ou un drain pluvial.",
          "Si vous voyez des taches d'humidité au sous-sol en bordure des descentes pluviales, ce n'est presque jamais un problème de fondation — c'est un problème de descente. Solution simple : prolongateurs en plastique souple, ou raccordement vers un drain enterré.",
          "À Gatineau, l'eau qui s'accumule contre la fondation gèle l'hiver, ce qui crée des fissures structurelles à long terme. Ce poste d'entretien minuscule prévient des réparations majeures.",
        ],
      },
    ],
    closing: "Les gouttières font partie du système toiture, même si elles sont rarement traitées comme telles. Si vous planifiez une réfection ou avez des doutes sur l'état des vôtres, contactez Couvreur Gatineau pour une inspection complète qui inclut l'évaluation des gouttières et descentes.",
  },
  en: {
    title: "Gutters and Downspouts in Gatineau: Maintenance, Replacement, and Connection to Roofing",
    metaDescription: "Why gutters directly affect roof lifespan: fall maintenance, replacement signs, and installing during a re-roof in Gatineau, Quebec.",
    intro: "Gutters are rarely a thrilling topic — until they overflow and water ends up in the basement or against the foundation. In Gatineau, where we get 250 cm of snow and heavy summer rain, gutters do crucial work: they direct water away from the home. Here's what to know.",
    sections: [
      {
        heading: "How gutters affect the roof",
        paragraphs: [
          "Non-functioning gutters (clogged, misaligned, holed) create water backups at the roof edge. This water seeps under the first rows of shingles, rots the deck, and eventually breaks through. In Gatineau, it's one of the leading causes of edge-of-roof leaks that homeowners wrongly attribute to a roof defect.",
          "Worse in winter: gutters full of leaves promote ice dam formation. Snow melts, water runs into the gutter, freezes against decomposed leaves, and ice builds up until it lifts the edge shingles.",
        ],
      },
      {
        heading: "Minimum maintenance",
        paragraphs: [
          "Late-fall cleaning (mid-October to mid-November depending on leaf-fall), ideally after surrounding trees are bare. Waiting past the first frost means wet leaves form compact plugs hard to dislodge.",
          "Second cleaning in spring (April) if your neighbourhood is heavily wooded: snowmelt can carry winter debris into the gutters.",
          "If you have more than one storey or are uncomfortable on a ladder, hire it out. The cost (typically $150-300 for a standard Gatineau home) is negligible compared to a water-damage repair or a fall.",
        ],
      },
      {
        heading: "Leaf-protection systems",
        paragraphs: [
          "Several systems exist: flat mesh, combs, domes, micro-mesh. None is perfect — all let some debris through, but they reduce cleaning frequency significantly (once every 2-3 years instead of annually).",
          "Micro-mesh is the best quality/price compromise based on our Gatineau experience: it blocks even conifer needles and pollen without blocking water flow. But you need an installer who knows what they're doing — bad micro-mesh installs can be worse than no protection.",
          "Bad investment: protections sold as 'lifetime guarantee, never clean again' at $3,000-5,000 for a standard home. Seller margin often exceeds real value.",
        ],
      },
      {
        heading: "When to replace gutters",
        paragraphs: [
          "Seamless aluminium gutters (most common in Gatineau for 30 years) last 20-30 years depending on gauge and exposure. End-of-life signs: sections that misalign with the slightest ice weight, multiple corrosion-induced perforations, joints that leak despite successive caulking.",
          "If your roof is near end-of-life and your gutters are 20+ years, replacing both at once makes sense: you reuse the scaffolding and labour already on-site. Marginal cost of replacing gutters during a re-roof is typically 30-40% less than a standalone replacement.",
        ],
      },
      {
        heading: "Downspouts: the detail we forget",
        paragraphs: [
          "The best gutters in the world are useless if the downspouts dump water directly against the foundation. The rule: water must be moved at least 2 metres away from the foundation, ideally onto a downward slope or into a storm drain.",
          "If you see basement damp marks near the downspouts, it's almost never a foundation problem — it's a downspout problem. Simple fix: flexible plastic extenders, or connection to a buried drain.",
          "In Gatineau, water pooling at the foundation freezes in winter, creating long-term structural cracks. This tiny maintenance task prevents major repairs.",
        ],
      },
    ],
    closing: "Gutters are part of the roofing system, even if rarely treated that way. If you're planning a re-roof or have doubts about your current ones, contact Gatineau Roofing for a complete inspection that includes gutters and downspouts.",
  },
};

export function getCommercialRoofingGuide(lang: Lang): LongFormContent {
  return COMMERCIAL_ROOFING[lang];
}
export function getAtticVentilationGuide(lang: Lang): LongFormContent {
  return ATTIC_VENTILATION[lang];
}
export function getInsuranceClaimGuide(lang: Lang): LongFormContent {
  return INSURANCE_CLAIM[lang];
}
export function getGuttersGuide(lang: Lang): LongFormContent {
  return GUTTERS[lang];
}

// ─────────────────────────────────────────────────────────────────────────────
// Related-guides registry — used by LongFormPage to cross-link long-tail
// content. The order here matches the homepage Guides component intent
// (highest-intent first). getRelatedGuides() returns 3 entries excluding
// the current slug — cheap topical-cluster signal for Google.
// ─────────────────────────────────────────────────────────────────────────────
const GUIDE_REGISTRY: Array<{ slug: string; get: (lang: Lang) => LongFormContent }> = [
  { slug: "fuite-toiture-urgence", get: getRoofLeakEmergencyGuide },
  { slug: "signes-toiture-endommagee", get: getDamagedRoofSignsGuide },
  { slug: "reclamation-assurance-toiture", get: getInsuranceClaimGuide },
  { slug: "inspection-toiture", get: getRoofInspectionGuide },
  { slug: "bardeaux-vs-tole", get: getShinglesVsMetalGuide },
  { slug: "toiture-commerciale", get: getCommercialRoofingGuide },
  { slug: "ventilation-entretoit", get: getAtticVentilationGuide },
  { slug: "garantie-toiture", get: getRoofWarrantyGuide },
  { slug: "toiture-hiver-quebec", get: getRoofWinterQuebecGuide },
  { slug: "gouttieres-toiture", get: getGuttersGuide },
];

export interface RelatedGuide {
  slug: string;
  title: string;
  metaDescription: string;
}

export function getRelatedGuides(currentSlug: string, lang: Lang, count = 3): RelatedGuide[] {
  // Stable deterministic selection: skip the current slug, then take the
  // next `count` entries (wrapping around). Keeps the related list stable
  // across builds (good for CWV / cache) while still differing per page.
  const others = GUIDE_REGISTRY.filter(g => g.slug !== currentSlug);
  const startIdx = Math.abs(hashCode(currentSlug)) % others.length;
  const picked: typeof others = [];
  for (let i = 0; i < count && i < others.length; i++) {
    picked.push(others[(startIdx + i) % others.length]);
  }
  return picked.map(p => {
    const c = p.get(lang);
    return { slug: p.slug, title: c.title, metaDescription: c.metaDescription };
  });
}

function hashCode(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return h;
}
