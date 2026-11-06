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

  glovebox: {
    summary: 'A sealed box of N₂ or Ar, kept below about 1 ppm O₂ and H₂O by a copper and molecular-sieve purifier. Best for weighing, storing and setting up air-sensitive work.',
    steps: [
      'Check the O₂ and H₂O readings (usually < 1 ppm) and box pressure before you start.',
      'Dry everything that goes in: oven-dried glassware and tools, dry degassed solvents.',
      'Antechamber: evacuate and refill 3× or more (about 5 min per vacuum for the small one, 20 min for the large).',
      'Never open both antechamber doors at once.',
      'Cap vials and close solvent bottles while working; take waste out through the antechamber.',
    ],
    tips: [
      'Weigh catalysts and bases (KOtBu, NaH) here, then seal the flask before taking it out.',
      'Paper, wipes and septa hold air and water: give them longer antechamber cycles.',
      'Log O₂/H₂O readings and every regeneration in the box logbook.',
      'Fine powders jumping? Use an anti-static gun or anti-static weighing boats.',
    ],
    mistakes: [
      'Using chlorinated solvents, thiols, phosphines or amines with the purifier on: they poison the catalyst. Turn circulation off, then purge.',
      'Bringing in water, alcohols or acetone.',
      'Sealed vials of air in the antechamber: loosen caps so air is pumped out, not carried in.',
      'Sharp tools near the gloves: one pinhole ruins the atmosphere. Check gloves often.',
    ],
  },

  practice: {
    summary: 'Habits that make results reproducible and your notebook useful to the next person.',
    steps: [
      'Write the plan (scheme, amounts, equivalents) before starting.',
      'Record what actually happened: times, temperatures, colour changes, deviations.',
      'Label every flask and vial: code, compound, date, initials.',
      'Link every spectrum and sample to its notebook page code.',
    ],
    tips: [
      'Note reagent supplier and batch when a result matters.',
      'Clean glassware straight after use; dried residues are much harder to remove.',
      'Repeat a key result before reporting it.',
    ],
    mistakes: [
      'Writing up from memory days later.',
      'Unlabelled vials in the fridge or glovebox.',
      'Reporting a yield from a single run or an impure sample.',
    ],
  },

  greener: {
    summary: 'Choose safer solvents and reagents and cut waste without losing performance.',
    steps: [
      'Check solvents in a selection guide (CHEM21, ACS GCI) before using them.',
      'Prefer catalytic over stoichiometric reagents.',
      'Run reactions more concentrated where safe; use less solvent for workup and columns.',
      'Think about atom economy: H₂ and water are the ideal by-products.',
    ],
    tips: [
      'Common swaps: 2-MeTHF or CPME for THF/Et₂O; heptane for hexane.',
      'Try EtOAc/ethanol–heptane eluents instead of DCM/MeOH, after checking the separation by TLC.',
      'Avoid benzene, CCl₄, chloroform and 1,4-dioxane where alternatives work.',
    ],
    mistakes: [
      'Swapping a solvent without re-checking solubility, boiling point and peroxide risk (2-MeTHF and CPME are ethers too).',
    ],
  },

  catalysis: {
    summary: 'Checks that show a catalyst is real, how active it is, and what the active species is.',
    steps: [
      'Controls: no catalyst, no ligand, metal salt only, no base.',
      'Report TON (mol product per mol catalyst) and TOF (TON per hour, from initial rates).',
      'Homogeneous? Use kinetics (induction periods), poisoning tests and the mercury test together.',
      'Heterogeneous: hot filtration test, ICP of the filtrate for leaching, recycling with characterization after use.',
      'Mechanism: kinetic orders, KIE, deuterium labelling, intermediates by NMR.',
    ],
    tips: [
      'Measure TOF at low conversion, where rates are still initial rates.',
      'For base-metal or metal-free claims, check trace metals (ICP-MS) in reagents.',
      'Use an internal standard for GC or NMR yields during kinetics.',
    ],
    mistakes: [
      'Calculating TOF from an end-point yield.',
      'Treating the mercury test as proof on its own: Hg can also react with molecular complexes.',
      'Recycling without checking leaching or activity per mass of catalyst.',
    ],
  },

  data: {
    summary: 'Reference values for planning reactions and explaining results.',
    steps: [
      'pKa: compare acid and base in the same solvent; DMSO and water values differ widely.',
      'Hammett: plot log(kX/kH) against σ; the slope ρ shows charge build-up in the rate-determining step.',
      'Cooling baths: pick the bath for your target temperature and check it with a thermometer.',
    ],
    tips: [
      'Ice/NaCl reaches about −20 °C; dry ice/acetone −78 °C; liquid N₂ −196 °C.',
      'Bordwell values are in DMSO; the Evans table lists several solvents.',
    ],
    mistakes: [
      'Mixing pKa values measured in different solvents.',
      'Reading ρ backwards: positive ρ means negative charge builds up in the transition state.',
    ],
  },

  flow: {
    summary: 'Pumping reagents through tubing gives better heat transfer, safer use of gases and hazardous intermediates, and simpler scale-up.',
    steps: [
      'Start from a batch reaction that works and stays fully dissolved (solids block tubing).',
      'Residence time = reactor volume ÷ total flow rate.',
      'Fit a back-pressure regulator to heat solvents above their boiling point.',
      'Discard the first 2–3 reactor volumes, then collect at steady state.',
    ],
    tips: [
      'Gases (H₂, CO₂, O₂): use a tube-in-tube reactor or a mass-flow controller for gas–liquid flow.',
      'Check that pumps, tubing and fittings suit your pressure and solvents.',
    ],
    mistakes: [
      'Precipitates clogging the reactor.',
      'Collecting product before steady state.',
    ],
  },

  learning: {
    summary: 'Build a background in organometallic chemistry and write your work up clearly.',
    steps: [
      'Learn the basics: electron counting, oxidation state, d-electron count.',
      'Know the elementary steps: oxidative addition, reductive elimination, migratory insertion, β-hydride elimination.',
      'Read recent papers in your area every week and note their controls and methods.',
      'Write as you go: schemes, tables and SI while experiments are fresh.',
    ],
    tips: [
      'Structure a paper as problem, what is new, evidence, limits.',
      'Follow the target journal’s SI template from the start.',
      'Ask a labmate to read your draft before the PI does.',
    ],
    mistakes: [
      'Writing the SI at the end from scattered notes.',
      'Overclaiming generality from a narrow substrate scope.',
    ],
  },
};
