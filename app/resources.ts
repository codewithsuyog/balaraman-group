// Resources page data. Every link was checked when added; a monthly GitHub Action
// (.github/workflows/check-links.yml) reports any that break. Add a link by adding one line.

export type Resource = { title: string; url: string };
export type ResourceGroup = { id: string; title: string; description: string; items: Resource[] };

export const resourceGroups: ResourceGroup[] = [
  {
    id: "nmr-analysis",
    title: "NMR and analysis",
    description: "Identify impurities, quantify yields and characterise new compounds and complexes.",
    items: [
      { title: "NMR shifts of trace impurities in organometallic solvents (Fulmer 2010)", url: "https://doi.org/10.1021/om100106e" },
      { title: "NMR shifts of trace impurities, industrial solvents (Babij 2016)", url: "https://doi.org/10.1021/acs.oprd.5b00417" },
      { title: "NMR shifts of common lab solvents as trace impurities (Gottlieb 1997)", url: "https://doi.org/10.1021/jo971176v" },
      { title: "Hans Reich NMR collection (1H, 13C, 19F, 31P, coupling constants)", url: "https://organicchemistrydata.org/hansreich/resources/nmr/" },
      { title: "Spectral Database for Organic Compounds (SDBS)", url: "https://sdbs.db.aist.go.jp/" },
      { title: "Quantitative 1H NMR and purity (Pauli 2014)", url: "https://doi.org/10.1021/jm500734a" },
      { title: "Common contaminants in mass spectrometry (Keller 2008)", url: "https://doi.org/10.1016/j.aca.2008.04.043" },
      { title: "Elemental analysis expectations for organometallics (editorial 2016)", url: "https://doi.org/10.1021/acs.organomet.6b00720" },
      { title: "Growing single crystals for X-ray (Spingler 2012)", url: "https://doi.org/10.1039/C1CE05624G" },
    ],
  },
  {
    id: "purification",
    title: "Purification",
    description: "Flash columns done well: choosing silica or alternatives, solvent systems, compounds that streak or stick, plus prep TLC, recrystallization and workups.",
    items: [
      { title: "Flash chromatography: the original method (Still 1978)", url: "https://doi.org/10.1021/jo00408a041" },
      { title: "How to run a flash column", url: "https://www.chem.rochester.edu/notvoodoo/pages/chromatography.php?page=flash_column" },
      { title: "Tips for flash column chromatography", url: "https://www.chem.rochester.edu/notvoodoo/pages/chromatography.php?page=flash_column_tips" },
      { title: "Troubleshooting flash column chromatography", url: "https://www.chem.rochester.edu/notvoodoo/pages/chromatography.php?page=flash_column_troubleshooting" },
      { title: "Choosing the solid phase for a column", url: "https://www.chem.rochester.edu/notvoodoo/pages/chromatography.php?page=solid_phase" },
      { title: "Solvent systems for flash columns", url: "https://www.chem.rochester.edu/notvoodoo/pages/chromatography.php?page=solvent_systems" },
      { title: "Running a small-scale flash column", url: "https://www.chem.rochester.edu/notvoodoo/pages/chromatography.php?page=small_scale_flash" },
      { title: "Reverse-phase (C18) flash chromatography for polar compounds (PDF)", url: "https://www.chem.rochester.edu/notvoodoo/documents/C18-RP-FC-Procedure.pdf" },
      { title: "Rookie mistakes in column chromatography", url: "https://www.chem.rochester.edu/notvoodoo/pages/rookie_mistakes.php?page=column_chromatography" },
      { title: "How to run a preparative TLC", url: "https://www.chem.rochester.edu/notvoodoo/pages/chromatography.php?page=run_prep_tlc" },
      { title: "Troubleshooting TLC", url: "https://www.chem.rochester.edu/notvoodoo/pages/chromatography.php?page=tlc_troubleshooting" },
      { title: "Recrystallization: tips and tricks", url: "https://www.chem.rochester.edu/notvoodoo/pages/purification.php?page=crystallization" },
      { title: "Distillation at reduced pressure", url: "https://www.chem.rochester.edu/notvoodoo/pages/purification.php?page=reduced_pressures" },
      { title: "Removing triphenylphosphine oxide after a reaction", url: "https://www.chem.rochester.edu/notvoodoo/pages/workup.php?page=removing_tpp" },
      { title: "Workup tips", url: "https://www.chem.rochester.edu/notvoodoo/pages/workup.php?page=workup_tips" },
    ],
  },
  {
    id: "air-sensitive-techniques",
    title: "Air-sensitive techniques",
    description: "Schlenk lines, vacuum, cannula transfer, freeze-pump-thaw, dry solvents and reactive reagents.",
    items: [
      { title: "Schlenk line survival guide (vacuum, cold trap, cannula, freeze-pump-thaw)", url: "https://schlenklinesurvivalguide.com/" },
      { title: "An illustrated guide to Schlenk line techniques (Borys 2023)", url: "https://doi.org/10.1021/acs.organomet.2c00535" },
      { title: "Safe solvent purification systems (Pangborn 1996)", url: "https://doi.org/10.1021/om9503712" },
      { title: "Drying solvents with molecular sieves (Williams 2010)", url: "https://doi.org/10.1021/jo101589h" },
      { title: "Handling air-sensitive reagents (Sigma-Aldrich AL-134)", url: "https://www.sigmaaldrich.com/US/en/technical-documents/technical-article/chemistry-and-synthesis/reaction-design-and-optimization/handling-air-sensitive-reagents" },
      { title: "Safe handling of organolithium reagents (Schwindeman 2014)", url: "https://doi.org/10.1016/j.jchas.2014.01.003" },
    ],
  },
  {
    id: "safety",
    title: "Safety",
    description: "Hazard assessment, hydrogenation and pressure work, and greener choices of solvents and reagents.",
    items: [
      { title: "Prudent Practices in the Laboratory (free book)", url: "https://nap.nationalacademies.org/catalog/12654" },
      { title: "ACS: Identifying and evaluating hazards in research labs", url: "https://www.acs.org/about/governance/committees/chemical-safety/hazard-assessment.html" },
      { title: "PubChem laboratory chemical safety summaries", url: "https://pubchem.ncbi.nlm.nih.gov/" },
      { title: "Hazards of laboratory-scale hydrogenations (Chandra 2016)", url: "https://doi.org/10.1016/j.jchas.2015.10.019" },
      { title: "CHEM21 solvent selection guide (Prat 2016)", url: "https://doi.org/10.1039/C5GC01008J" },
      { title: "ACS GCI Pharmaceutical Roundtable solvent tool", url: "https://acsgcipr.org/tools/solvent-tool/" },
      { title: "ACS GCI reagent guides", url: "https://reagents.acsgcipr.org/" },
    ],
  },
  {
    id: "catalysis-toolkit",
    title: "Catalysis toolkit",
    description: "Tests and definitions every catalysis project needs: homogeneity, leaching, TON/TOF, kinetics.",
    items: [
      { title: "Homogeneous or heterogeneous? Distinguishing true catalysts (Widegren 2003)", url: "https://doi.org/10.1016/S1381-1169(02)00728-8" },
      { title: "Leaching and the hot filtration test (Sheldon 1998)", url: "https://doi.org/10.1021/ar9700163" },
      { title: "Turning over definitions: TON and TOF (Kozuch 2012)", url: "https://doi.org/10.1021/cs3005264" },
      { title: "Kinetic isotope effects in C-H activation (Simmons 2012)", url: "https://doi.org/10.1002/anie.201107334" },
      { title: "Steric effects of phosphine ligands (Tolman 1977)", url: "https://doi.org/10.1021/cr60307a002" },
      { title: "Kinetics for synthetic chemists (Collum)", url: "https://collum.chem.cornell.edu/" },
    ],
  },
  {
    id: "data",
    title: "Data",
    description: "Reference tables for pKa, substituent effects, solvents and cooling baths.",
    items: [
      { title: "Bordwell and Evans pKa tables", url: "https://organicchemistrydata.org/hansreich/resources/pka/" },
      { title: "Hammett substituent constants (Hansch 1991)", url: "https://doi.org/10.1021/cr00002a004" },
      { title: "Cooling bath temperatures", url: "https://en.wikipedia.org/wiki/List_of_cooling_baths" },
      { title: "ACS Division of Organic Chemistry data collection", url: "https://organicchemistrydata.org/" },
    ],
  },
  {
    id: "experimental",
    title: "Experimental",
    description: "Everyday bench techniques: chromatography, TLC, workups and mass calculations.",
    items: [
      { title: "TLC stains", url: "https://www.reachdevices.com/TLC_stains.html" },
      { title: "Not Voodoo: practical tips for the lab (Rochester)", url: "https://www.chem.rochester.edu/notvoodoo/" },
      { title: "Isotope pattern and exact mass calculator (ChemCalc)", url: "https://www.chemcalc.org/" },
    ],
  },
  {
    id: "flow-chemistry",
    title: "Flow chemistry",
    description: "Getting started with continuous flow, including reactions with gases such as H₂ and CO₂.",
    items: [
      { title: "The Hitchhiker's Guide to Flow Chemistry (Plutschack 2017)", url: "https://doi.org/10.1021/acs.chemrev.7b00183" },
      { title: "How to approach flow chemistry (Guidi 2020)", url: "https://doi.org/10.1039/C9CS00832B" },
      { title: "Using gases such as H2 and CO2 in flow (Mallia 2016)", url: "https://doi.org/10.1021/acs.oprd.5b00222" },
    ],
  },
  {
    id: "learning",
    title: "Learning",
    description: "Organometallic chemistry and named reactions, for coursework and group meetings.",
    items: [
      { title: "The Organometallic HyperTextBook", url: "https://www.ilpi.com/organomet/" },
      { title: "LibreTexts: Organometallic chemistry", url: "https://chem.libretexts.org/Bookshelves/Inorganic_Chemistry/Organometallic_Chemistry_(Evans)" },
      { title: "Organic Chemistry Portal: named reactions", url: "https://www.organic-chemistry.org/namedreactions/" },
      { title: "SynArchive", url: "https://www.synarchive.com/" },
    ],
  },
  {
    id: "writing-presenting",
    title: "Writing and presenting",
    description: "Writing papers and following journal style.",
    items: [
      { title: "Whitesides' group: writing a paper", url: "https://doi.org/10.1002/adma.200400767" },
      { title: "ACS guide to scholarly communication", url: "https://pubs.acs.org/doi/book/10.1021/acsguide" },
    ],
  },
];
