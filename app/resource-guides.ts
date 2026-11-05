// Short lab guides shown above the links on the Resources page, keyed by topic id (see resources.ts).
// Written in our own words. Set reviewedBy to the lab member who checked a guide to remove its "Draft" label.
// Kept separate from resources.ts so regenerating the links never touches the guides.

export type Guide = {
  summary: string;
  steps: string[];
  tips: string[];
  mistakes: string[];
  reviewedBy?: string;
};

export const guides: Record<string, Guide> = {
  column: {
    summary:
      'A column separates compounds by how strongly they stick to silica (or alumina) while solvent runs through. A manual (gravity) column needs no equipment but is slow; a flash column uses gentle air pressure for speed and sharper bands.',
    steps: [
      'Choose the eluent by TLC: aim for an Rf of 0.2–0.35 for your compound, with at least 0.1 between it and the nearest spot.',
      'Size the column: roughly 30–100 g of silica per 1 g of crude, more when spots are close.',
      'Pack it: cotton or glass-wool plug, a layer of sand, then a slurry of silica in the starting eluent poured in one go. Tap or pressurise until the bed is level and firm. Never let the solvent fall below the top of the silica.',
      'Load a narrow band: dissolve the crude in the least possible eluent, or dry-load it (adsorb onto a little silica, evaporate, add the powder on top) if it dissolves poorly.',
      'Add a protective layer of sand, fill with eluent and run: by gravity for a manual column, or with gentle pressure for flash (solvent level falling about 5 cm per minute).',
      'Collect equal fractions, check them by TLC, combine the pure ones and evaporate.',
    ],
    tips: [
      'Start a little less polar than your TLC system and increase polarity in steps.',
      'Amines streak on silica: add about 1% triethylamine to the eluent, or use alumina.',
      'Carboxylic acids tail: add 0.5–1% acetic acid.',
      'Acid-sensitive compounds: pre-treat the silica with triethylamine or use neutral alumina.',
      'Spot every second or third fraction on one TLC plate to find your compound quickly.',
    ],
    mistakes: [
      'Letting the column run dry, which cracks the bed and ruins the separation.',
      'Loading in too much solvent, or a too-polar one, which gives broad bands.',
      'An uneven top surface, which makes slanted bands that overlap.',
      'Overloading the column for a difficult separation.',
      'Using a TLC system where your compound runs at Rf 0.5 or higher, so it comes off with the impurities.',
    ],
  },

  tlc: {
    summary:
      'TLC is the quickest way to follow a reaction, check purity and choose a solvent system for a column. It takes a few minutes and a few micrograms of material.',
    steps: [
      'Draw a pencil baseline about 1 cm from the bottom of the plate.',
      'Spot dilute solutions with a capillary, keeping spots 2–3 mm wide: starting material, a co-spot (both on one spot), and the reaction mixture.',
      'Develop in a closed chamber with a little solvent (below the baseline) and a piece of filter paper to saturate the air.',
      'Take the plate out when the front is about 1 cm from the top, and mark the front.',
      'Visualise under UV (254 nm) first, then with a stain such as KMnO₄, p-anisaldehyde, PMA, ninhydrin (amines) or iodine.',
      'Calculate Rf = distance moved by the spot ÷ distance moved by the solvent front.',
    ],
    tips: [
      'The co-spot shows whether two spots with similar Rf are really the same compound.',
      'Do a mini-workup on reaction samples (a drop in a vial with ethyl acetate and water) so salts do not streak.',
      'Samples in DMF or DMSO: dry the spot under vacuum or with a heat gun before developing.',
      'Run a 2D TLC to check whether a compound decomposes on silica before you put it on a column.',
    ],
    mistakes: [
      'Spots that are too concentrated, which streak and merge.',
      'Solvent above the baseline, which washes the sample off the plate.',
      'Marking the plate with a pen, whose ink runs with the solvent.',
      'Judging a reaction complete by UV alone when the starting material or product does not absorb UV.',
    ],
  },

  nmr: {
    summary:
      '¹H and ¹³C NMR confirm structure and purity. Good spectra start with a clean, well-prepared sample and end with careful processing.',
    steps: [
      'Dissolve about 5–10 mg (¹H) or 20–50 mg (¹³C) in about 0.6 mL of deuterated solvent; CDCl₃ is the usual choice.',
      'Filter through a cotton plug in a Pasteur pipette if any solid remains.',
      'Fill a clean, dry tube to 4–5 cm; cap and label it.',
      'Lock, shim and acquire. Reference to the residual solvent signal (CDCl₃: 7.26 ppm for ¹H, 77.16 ppm for ¹³C).',
      'Process: phase, baseline-correct, integrate and pick peaks.',
      'Report each signal as δ (multiplicity, J in Hz, integration).',
    ],
    tips: [
      'Identify solvent and water peaks with the impurity tables before assigning anything.',
      'Dry samples well under high vacuum to remove ethyl acetate, hexane and dichloromethane.',
      'Paramagnetic complexes (for example many Co(II) and Mn(II) species) give broad, shifted signals; other methods such as the Evans method may be more useful.',
      'Shake with a drop of D₂O to find exchangeable OH and NH protons.',
      'For NMR yields, add a weighed internal standard (such as 1,3,5-trimethoxybenzene) and use a long enough relaxation delay.',
    ],
    mistakes: [
      'Samples that are too concentrated, which shim poorly and give broad lines.',
      'Undissolved particles in the tube.',
      'Using old CDCl₃, which turns acidic, for acid-sensitive compounds; pass it through basic alumina first.',
      'Setting integrals without a proton of known count as the reference.',
    ],
  },

  workup: {
    summary:
      'Workup removes salts, catalyst residues and water-soluble reagents so the crude product is ready for purification.',
    steps: [
      'Quench slowly, with cooling if the reaction is exothermic: water, saturated NH₄Cl (bases, organometallics) or saturated NaHCO₃ (acids).',
      'Dilute with an organic solvent (ethyl acetate, diethyl ether or dichloromethane) and pour into a separatory funnel.',
      'Shake with frequent venting, let the layers separate and drain. Extract the aqueous layer two or three more times.',
      'Wash the combined organic layers with water, then brine.',
      'Dry over Na₂SO₄ or MgSO₄ and filter.',
      'Concentrate on the rotary evaporator.',
    ],
    tips: [
      'Unsure which layer is which? Add a few drops of water and watch where they go.',
      'Keep every layer until you have found your product.',
      'Emulsions: add brine, wait, add more solvent, or filter through Celite.',
      'DMF or DMSO: wash several times with water or 5% aqueous LiCl.',
      'Remove metal residues by filtering through a short pad of silica or Celite.',
    ],
    mistakes: [
      'Not venting, especially with bicarbonate, which releases CO₂.',
      'Throwing away the layer that holds the product.',
      'Losing a basic amine in an acid wash, or a carboxylic acid in a base wash.',
      'Heating the rotary evaporator bath too much and losing a volatile product.',
    ],
  },

  'air-sensitive': {
    summary:
      'Many organometallic catalysts and reagents react with oxygen or water. A Schlenk line or glovebox keeps them under nitrogen or argon from start to finish.',
    steps: [
      'Dry glassware in the oven (above 120 °C) and assemble it hot, or flame-dry it under vacuum.',
      'Cycle the flask three times: evacuate, then refill with inert gas.',
      'Use dry, degassed solvents, from a solvent purification system or freshly distilled; degas by freeze–pump–thaw or by sparging.',
      'Transfer liquids by syringe or cannula against a positive pressure of inert gas, through septa.',
      'Weigh solids in the glovebox, or add them under a counterflow of inert gas.',
      'Keep a bubbler on the line so you can see positive pressure, and never heat a closed system.',
    ],
    tips: [
      'Flush syringes and needles with inert gas three times before use.',
      'Freeze–pump–thaw (three cycles) degasses most thoroughly; 20–30 minutes of sparging is often enough.',
      'Store sensitive solids in the glovebox, labelled and dated.',
      'Get trained before using pyrophoric reagents such as t-BuLi, and never handle them alone.',
    ],
    mistakes: [
      'Opening a liquid-nitrogen-cooled trap to air: liquid oxygen condenses and can explode. Keep the line under vacuum or inert gas while the trap is cold.',
      'Old, cored septa and poorly greased joints that let air in.',
      'Pulling vacuum too fast on a flask of solvent or fine powder, which bumps it into the line.',
      'Heating a sealed flask, which builds pressure.',
    ],
  },

  isolation: {
    summary:
      'Crystallization can give very pure material, often more easily than a column for solids, and good single crystals give you an X-ray structure.',
    steps: [
      'Find a solvent in which the compound dissolves when hot but poorly when cold; test small amounts in vials.',
      'Dissolve the solid in the minimum of hot solvent.',
      'Filter hot if insoluble impurities remain.',
      'Cool slowly to room temperature, then in the fridge or an ice bath.',
      'Collect by vacuum filtration, wash with a little cold solvent and dry under vacuum.',
    ],
    tips: [
      'Two-solvent method: dissolve in a good solvent, add an anti-solvent dropwise until cloudy, warm until clear, then cool.',
      'For X-ray crystals try slow evaporation, vapour diffusion (for example dichloromethane with pentane) or layering, and leave them undisturbed.',
      'Start crystallization by scratching the glass or adding a seed crystal.',
      'Grow crystals of air-sensitive complexes in the glovebox or in a Schlenk tube.',
    ],
    mistakes: [
      'Too much solvent, so nothing crystallizes; concentrate and try again.',
      'Cooling too fast, which gives oils or small, impure crystals.',
      'Ignoring an oil: reheat, add more solvent or change the solvent.',
    ],
  },

  reactions: {
    summary:
      'Careful planning, setup and monitoring make reactions safer and results reproducible.',
    steps: [
      'Work out equivalents and amounts in your notebook before weighing (mmol, molar mass, density for liquids).',
      'Check the hazards of every reagent in its safety data sheet, and plan the quench.',
      'Set up a dry flask with a stir bar, condenser or septum, inert gas if needed, and a heating block or oil bath with a temperature probe.',
      'Add reagents in the planned order, noting times and observations.',
      'Monitor by TLC, GC or crude NMR at set times.',
      'Stop when complete, then quench and work up.',
    ],
    tips: [
      'Run a small test (0.1–0.2 mmol) before scaling up.',
      'Record the actual bath temperature, not the set point.',
      'For reactions under H₂ or CO₂ pressure, use rated autoclaves or pressure tubes behind a blast shield.',
      'When testing a new catalyst, run a control without it.',
    ],
    mistakes: [
      'Scaling up an exothermic reaction without a cooling plan.',
      'Heating a sealed vessel that is not rated for pressure.',
      'Weighing hygroscopic bases such as KOtBu in air, which makes results irreproducible.',
    ],
  },

  reagents: {
    summary:
      'Many failed reactions trace back to old, wet or impure reagents. Check quality before blaming the chemistry.',
    steps: [
      'Check the label: purity, the date the bottle was opened and the storage conditions.',
      'Read the safety data sheet for hazards and incompatibilities.',
      'Purify or titrate if needed: titrate organolithiums, recrystallize NBS, distil liquid aldehydes.',
      'Store properly: cold, dark, under inert gas or with desiccant as required, sealed with Parafilm.',
    ],
    tips: [
      'Write the opening date on every bottle.',
      'Bases such as KOtBu and NaH degrade in air; keep them in the glovebox.',
      'Use the ACS GCI reagent guides to find greener alternatives.',
    ],
    mistakes: [
      'Using peroxide-forming ethers (THF, diethyl ether, dioxane) past their date without testing for peroxides.',
      'Pouring unused reagent back into the stock bottle.',
    ],
  },

  safety: {
    summary:
      'Know the hazards before you start; most accidents come from a skipped check.',
    steps: [
      'Read the safety data sheets and do a risk assessment for every new reaction.',
      'Wear a lab coat, safety glasses or goggles, and gloves suited to the chemicals (nitrile does not protect against every solvent).',
      'Work in a fume hood with the sash low.',
      'Know where the eyewash, safety shower, fire extinguisher and spill kit are.',
      'Put waste in labelled, compatible containers, keeping halogenated waste separate and oxidizers away from organics.',
    ],
    tips: [
      'Never work alone with hazardous reagents, and tell someone when you work late.',
      'Quench reactive residues (NaH, LiAlH₄, alkali metals) carefully before disposal.',
      'For hydrogen and pressure work, leak-test the setup and use a blast shield.',
    ],
    mistakes: [
      'Mixing incompatible waste, such as nitric acid with organic solvents.',
      'Leaving heating unattended overnight without approval and a safety cut-off.',
      'Eating or drinking in the lab.',
    ],
  },

  characterization: {
    summary:
      'A new compound needs enough data to prove what it is and that it is pure. Molecules, metal complexes and solid catalysts each need a different set of techniques.',
    steps: [
      '¹H and ¹³C NMR, plus ¹⁹F or ³¹P when those nuclei are present.',
      'HRMS for the molecular formula, usually within 5 ppm of the calculated mass.',
      'IR for key groups such as C=O, N–H and metal carbonyls.',
      'Melting point for solids.',
      'Metal complexes: elemental analysis (C, H, N within 0.4%), single-crystal X-ray, and magnetic moment for paramagnetic species.',
      'Heterogeneous catalysts: PXRD, TEM or SEM, XPS, BET surface area, and ICP for metal loading.',
    ],
    tips: [
      "Check the target journal's characterization requirements before you finish the project.",
      'Save raw data files (FIDs, spectra) under the sample code from your notebook.',
    ],
    mistakes: [
      'Reporting the mass of an adduct or fragment without saying which ion it is ([M+H]⁺, [M+Na]⁺).',
      'Sending impure or wet samples for elemental analysis.',
    ],
  },
};
