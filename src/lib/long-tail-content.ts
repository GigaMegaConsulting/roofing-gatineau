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
