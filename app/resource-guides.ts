// Short lab guides shown above the links on the Resources page, keyed by topic id (see resources.ts).
// Written in our own words.
// Kept separate from resources.ts so regenerating the links never touches the guides.

export type Guide = {
  summary: string;
  steps: string[];
  tips: string[];
  mistakes: string[];
};

export const guides: Record<string, Guide> = {
  column: {
    summary: 'Separates compounds by polarity on silica. Gravity columns need no equipment; flash (air pressure) is faster and sharper.',
    steps: [
      'Pick the eluent by TLC: product Rf 0.2–0.35, ≥ 0.1 from the nearest spot.',
      'Use 30–100 g silica per 1 g crude (more for close spots).',
      'Plug with cotton, add sand, pour in a silica slurry in eluent; tap until level.',
      'Load a narrow band in minimum solvent, or dry-load on silica.',
      'Elute, collect equal fractions, check by TLC, combine and evaporate.',
    ],
    tips: [
      'Amines streak: add 1% Et₃N, or use alumina.',
      'Acids tail: add 0.5–1% AcOH.',
      'Start less polar than the TLC system; increase stepwise.',
    ],
    mistakes: [
      'Letting the column run dry: the bed cracks.',
      'Loading in too much or too polar solvent: broad bands.',
      'Product at Rf > 0.5: runs fast and often comes off with impurities.',
    ],
  },

  tlc: {
    summary: 'Fastest check of reaction progress, purity and column solvent.',
    steps: [
      'Pencil baseline 1 cm from the bottom.',
      'Spot small and dilute: starting material, co-spot, reaction.',
      'Develop in a closed, saturated chamber; stop 1 cm from the top.',
      'Visualise: UV 254 nm, then a stain (KMnO₄, anisaldehyde, ninhydrin for amines).',
    ],
    tips: [
      'Co-spot confirms whether two close spots are the same compound.',
      'Mini-workup reaction samples (EtOAc/water) so salts do not streak.',
      'DMF/DMSO samples: dry the spot under vacuum before developing.',
    ],
    mistakes: [
      'Overloaded spots: streaks and merged spots.',
      'Solvent above the baseline: sample washes off.',
      'Trusting UV alone when a compound is not UV-active.',
    ],
  },

  nmr: {
    summary: 'Confirms structure and purity. A clean, dilute sample gives sharp spectra.',
    steps: [
      '5–10 mg (¹H) or 20–50 mg (¹³C) in 0.6 mL deuterated solvent.',
      'Filter through cotton if anything is undissolved.',
      'Reference to residual solvent (CDCl₃: 7.26 / 77.16 ppm).',
      'Report δ (multiplicity, J in Hz, integration).',
    ],
    tips: [
      'Check impurity tables for solvent and water peaks first.',
      'D₂O shake identifies OH and NH protons.',
      'NMR yield: weighed internal standard, long relaxation delay.',
      'Paramagnetic Co(II)/Mn(II) complexes give broad, shifted peaks.',
    ],
    mistakes: [
      'Too concentrated: poor shimming, broad lines.',
      'Old, acidic CDCl₃ with acid-sensitive compounds (filter through basic alumina).',
    ],
  },

  workup: {
    summary: 'Removes salts, metals and water-soluble reagents before purification.',
    steps: [
      'Quench slowly: water, sat. NH₄Cl (bases) or sat. NaHCO₃ (acids).',
      'Extract the aqueous layer 3× with EtOAc, Et₂O or DCM.',
      'Wash organics with water, then brine.',
      'Dry (Na₂SO₄/MgSO₄), filter, evaporate.',
    ],
    tips: [
      'Unsure which layer? Add a drop of water.',
      'Emulsion: add brine, or filter through Celite.',
      'DMF: wash with 5% aq. LiCl; DMSO: wash several times with water.',
      'Metal residues: filter through a short silica or Celite pad.',
    ],
    mistakes: [
      'Not venting, especially with NaHCO₃ (CO₂).',
      'Discarding a layer before finding the product.',
      'Losing amines in acid washes, or acids in base washes.',
    ],
  },

  'air-sensitive': {
    summary: 'Keeps O₂- and water-sensitive catalysts and reagents under N₂ or Ar on a Schlenk line or in a glovebox.',
    steps: [
      'Oven-dry glassware (>120 °C) or flame-dry under vacuum.',
      'Evacuate and refill with inert gas 3×.',
      'Use dry, degassed solvents (freeze–pump–thaw ×3 or sparge 20–30 min).',
      'Transfer liquids by syringe or cannula under positive pressure.',
      'Weigh solids in the glovebox or under inert-gas counterflow.',
    ],
    tips: [
      'Flush syringes and needles with inert gas 3× before use.',
      'Watch the bubbler to confirm positive pressure.',
      'Pyrophorics (t-BuLi): train first, never work alone.',
    ],
    mistakes: [
      'Opening a liquid-N₂ trap to air: liquid O₂ condenses and can explode.',
      'Heating a closed system: pressure builds.',
      'Old, cored septa letting air in.',
    ],
  },

  isolation: {
    summary: 'Crystallization often purifies solids better than a column, and gives crystals for X-ray.',
    steps: [
      'Find a solvent: soluble hot, poorly soluble cold.',
      'Dissolve in minimum hot solvent; hot-filter if needed.',
      'Cool slowly to room temperature, then on ice.',
      'Filter, wash with a little cold solvent, dry under vacuum.',
    ],
    tips: [
      'Two solvents: dissolve in good solvent, add anti-solvent to cloudiness, warm, cool.',
      'X-ray crystals: slow evaporation, vapour diffusion (DCM/pentane) or layering.',
      'No crystals? Scratch the glass or add a seed.',
    ],
    mistakes: [
      'Too much solvent: nothing crystallizes.',
      'Cooling too fast: oils or impure crystals.',
    ],
  },

  reactions: {
    summary: 'Plan, set up and monitor carefully so results are safe and reproducible.',
    steps: [
      'Calculate mmol and equivalents in the notebook before weighing.',
      'Check every reagent’s SDS and plan the quench.',
      'Set up: dry flask, stirring, inert gas if needed, temperature probe.',
      'Monitor by TLC, GC or crude NMR at set times.',
    ],
    tips: [
      'Test at 0.1–0.2 mmol before scaling up.',
      'Record the actual bath temperature, not the set point.',
      'New catalyst? Run a no-catalyst control.',
    ],
    mistakes: [
      'Heating a sealed vessel not rated for pressure.',
      'Weighing hygroscopic bases (KOtBu) in air: irreproducible results.',
    ],
  },

  reagents: {
    summary: 'Old, wet or impure reagents cause many failed reactions. Check before blaming the chemistry.',
    steps: [
      'Check purity, opening date and storage on the label.',
      'Titrate organolithiums; recrystallize NBS; distil aldehydes.',
      'Store cold, dark, dry or under inert gas as required.',
    ],
    tips: [
      'Write the opening date on every bottle.',
      'Keep KOtBu and NaH dry, ideally in the glovebox.',
    ],
    mistakes: [
      'Using old THF, Et₂O or dioxane without a peroxide test.',
      'Returning unused reagent to the stock bottle.',
    ],
  },

  safety: {
    summary: 'Know the hazards before you start.',
    steps: [
      'Read the SDS and do a risk assessment for new reactions.',
      'Lab coat, goggles, suitable gloves (nitrile does not resist every solvent).',
      'Work in the fume hood, sash low.',
      'Know the eyewash, shower, extinguisher and spill kit locations.',
    ],
    tips: [
      'Never work alone with hazardous reagents.',
      'Quench NaH, LiAlH₄ and alkali-metal residues before disposal.',
      'H₂ or pressure work: leak-test, use a blast shield.',
    ],
    mistakes: [
      'Mixing incompatible waste (e.g. HNO₃ with organics).',
      'Unattended overnight heating without approval and a cut-off.',
    ],
  },

  characterization: {
    summary: 'The data needed to prove identity and purity of a new compound.',
    steps: [
      'Molecules: ¹H, ¹³C (¹⁹F, ³¹P if present), HRMS (±5 ppm), IR, m.p.',
      'Metal complexes: elemental analysis (CHN ±0.4%), X-ray, magnetic moment if paramagnetic.',
      'Solid catalysts: PXRD, TEM/SEM, XPS, BET, ICP for metal loading.',
    ],
    tips: [
      'Check the target journal’s data requirements early.',
      'Save raw files (FIDs) under the notebook sample code.',
    ],
    mistakes: [
      'Not stating the ion ([M+H]⁺, [M+Na]⁺) for HRMS.',
      'Sending wet or impure samples for elemental analysis.',
    ],
  },
};
