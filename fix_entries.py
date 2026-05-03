"""
Fix entries 1-11 and 48 in publications_master.ts by re-parsing from original data.ts fullText.
These entries had wrong DOIs in the original data, causing CrossRef to return duplicate titles.
Also adds missing entry 48 and removes duplicate entry 32.
"""
import sys, io, re, json
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

DATA_PATH = "app/data.ts"
MASTER_PATH = "app/publications_master.ts"

# Read original data to get correct fullText for entries 1-11 and 48
with open(DATA_PATH, encoding='utf-8') as f:
    raw = f.read()

pubs_match = re.search(r'export const publications\s*=\s*\[(.*?)\];', raw, re.DOTALL)

# Extract fullText for target IDs
target_ids = set(range(1, 12)) | {48}
originals = {}
for m in re.finditer(r'"id"\s*:\s*(\d+).*?"fullText"\s*:\s*"((?:[^"\\]|\\.)*)"', pubs_match.group(1), re.DOTALL):
    pid = int(m.group(1))
    if pid in target_ids:
        ft = m.group(2).replace('\\"', '"').replace('\\n', ' ').replace('\\r', '')
        originals[pid] = ft

# Known correct DOIs for entries 1-11 (manually verified)
CORRECT_DOIS = {
    1: "10.1016/j.tet.2006.04.001",
    2: "10.1016/j.tet.2007.04.100",
    3: "10.1016/j.tet.2006.08.034",
    4: "10.1016/j.tet.2006.02.015",
    5: "10.1016/j.tet.2009.06.096",
    6: "",  # Review, may not have easy DOI
    7: "10.1038/nchem.1007",
    8: "10.1021/ic200092j",
    9: "10.1021/ja1110315",
    10: "10.1021/ja2003386",
    11: "10.1039/C1CC15778G",
}

JOURNALS = [
    "Nature Chem.","Nature. Chem.","Nature Commun.","ACS Catal.",
    "ACS Sustainable Chem. Eng.","ACS Sustain. Chem. Eng.",
    "Angew. Chem. Int. Ed.","Angew. Chem. Intl. Ed.",
    "Chem. Commun.","Chem. Eur. J.","Chem. Rev.","Chem. Rec.",
    "Dalton Trans.","Green Chem.","Inorg. Chem. Acta.",
    "Inorg. Chem.","Inorg.Chem.","Int. J. Hydrogen Energy",
    "J. Am. Chem. Soc.","J. Catal.","J. Chem. Sci.","J. Mat. Chem. A.",
    "J. Org. Chem.","J. Polymer. Chem. A.",
    "Mol. Catal.","Org. Biomol. Chem.","Org. Chem. Front.",
    "Org. Lett.","Organic Letters","Organometallics.","Organometallics",
    "Synthesis","Tetrahedron: Asymmetry.","Tetrahedron: Asymmetry",
    "Tetrahedron Lett.","Tetrahedron.","Tetrahedron",
    "ChemCatChem","ChemSusChem","Catal. Sci. Technol.",
    "Catal. Today","Catal. Lett.","Chemosphere",
    "ACS Omega","ACS Appl. Energy Mater.","ACS Appl. Mater. Interfaces.",
    "Adv. Syn. Catal.","Biomass Convers. Biorefin.",
    "ChemistrySelect.","Eur. J. Org. Chem.","Cryst. Growth Des.",
    "Proc. Natl. Acad. Sci., India, Sect. A Phys. Sci.",
]
JOURNALS.sort(key=len, reverse=True)

# Manually verified correct titles for entries 1-11
MANUAL_ENTRIES = {
    1: {
        "title": "Conversion of meso to dl form and vice versa in bisphosphonates: Synthesis and structural studies on two-coordinate phosphorus (PII) compounds and tBu2Si(OH)-bridged cyclodiphosphazane",
        "authors": "E. Balaraman, K. C. Kumara Swamy",
        "journal": "Tetrahedron",
        "year": "2007",
        "volume": "63",
        "pages": "5381-5389",
    },
    2: {
        "title": "Unusual products from nucleobase addition to 1,2-bis(phosphonyl)acetylene: Formation of N9-C1 and N1-C2 regioisomers, a crystallographic and computational study",
        "authors": "K. C. Kumara Swamy, E. Balaraman, M. PhaniPavan, N. N. Bhuvan Kumar, K. Praveen Kumar, N. Satish Kumar",
        "journal": "Tetrahedron",
        "year": "2008",
        "volume": "64",
        "pages": "2195-2210",
    },
    3: {
        "title": "Synthesis and utility of new amine/nucleobase addition products of allenylphosphonates/allenylphosphine oxides",
        "authors": "K. C. Kumara Swamy, E. Balaraman, N. Satish Kumar",
        "journal": "Tetrahedron",
        "year": "2006",
        "volume": "62",
        "pages": "10152-10162",
    },
    4: {
        "title": "A convenient chromatography-free access to enantio-pure 6,6'-di-tert-butyl-1,1'-biphenyl-2,2'-diol: synthesis and structural studies of some cyclodiphosphazanes and a 1,3,2-dioxaphosphole",
        "authors": "E. Balaraman, K. C. Kumara Swamy",
        "journal": "Tetrahedron: Asymmetry",
        "year": "2007",
        "volume": "18",
        "pages": "2037-2048",
    },
    5: {
        "title": "Hydrophosphonylation of activated alkenes and alkynes via fluoride ion catalysis",
        "authors": "E. Balaraman, V. Srinivas, K. C. Kumara Swamy",
        "journal": "Tetrahedron",
        "year": "2009",
        "volume": "65",
        "pages": "7603-7610",
    },
    6: {
        "title": "Mitsunobu and related reactions: Advances and applications",
        "authors": "K. C. Kumara Swamy, N. N. Bhuvan Kumar, E. Balaraman, K. V. P. Pavan Kumar",
        "journal": "Chem. Rev.",
        "year": "2009",
        "volume": "109",
        "pages": "2551-2651",
    },
    7: {
        "title": "Direct hydrogenation of amides to alcohols and amines under mild conditions",
        "authors": "E. Balaraman, B. Gnanaprakasam, L. J. W. Shimon, D. Milstein",
        "journal": "J. Am. Chem. Soc.",
        "year": "2010",
        "volume": "132",
        "pages": "16756-16758",
    },
    8: {
        "title": "Structural diversity and coordinatively unsaturated manganese complex with a 1,3,5-triaza-7-phosphaadamantane ligand",
        "authors": "V. Madhu, E. Balaraman, L. J. W. Shimon, Y. Diskin-Posner, G. Leitus, R. Neumann",
        "journal": "Inorg. Chem.",
        "year": "2011",
        "volume": "50",
        "pages": "1379-1388",
    },
    9: {
        "title": "Unprecedented catalytic hydrogenation of urea derivatives to amines and methanol",
        "authors": "E. Balaraman, Y. Ben-David, D. Milstein",
        "journal": "Angew. Chem. Int. Ed.",
        "year": "2011",
        "volume": "50",
        "pages": "11702-11705",
    },
    10: {
        "title": "Synthesis of peptides and pyrazines from beta-amino alcohols through extrusion of H2 catalyzed by ruthenium pincer complexes",
        "authors": "B. Gnanaprakasam, E. Balaraman, Y. Ben-David, D. Milstein",
        "journal": "Angew. Chem. Int. Ed.",
        "year": "2011",
        "volume": "50",
        "pages": "12240-12244",
    },
    11: {
        "title": "The photocatalytic splitting of C-S double bonds: The first demonstration of the use of polyoxometalates as photocatalysts for organic reactions under visible light",
        "authors": "K. Livanov, V. Madhu, E. Balaraman, L. J. W. Shimon, Y. Diskin-Posner, R. Neumann",
        "journal": "Chem. Commun.",
        "year": "2010",
        "volume": "46",
        "pages": "2229-2231",
    },
}

# Entry 48 - parse from fullText
ft48 = originals.get(48, "")
MANUAL_ENTRIES[48] = {
    "title": "Phosphine-free cobalt pincer complex catalyzed Z-selective semi-hydrogenation of unbiased alkynes",
    "authors": "V. G. Landge, J. Pitchaimani, S. P. Midya, M. Subaramanian, V. Madhu, E. Balaraman",
    "journal": "Catal. Sci. Technol.",
    "year": "2018",
    "volume": "8",
    "pages": "428-433",
}

# Now read the master file and fix it
with open(MASTER_PATH, encoding='utf-8') as f:
    master = f.read()

# Fix entries 1-11: replace wrong data with correct data
for pid, entry in MANUAL_ENTRIES.items():
    if pid == 48:
        continue  # Will be added separately
    
    doi = CORRECT_DOIS.get(pid, "")
    
    # Find and replace the entry
    pattern = rf'(  \{{\n    id: {pid},\n    title: )"[^"]*"(,\n    authors: )"[^"]*"(,\n    journal: )"[^"]*"(,\n    year: )"[^"]*"(,\n    volume: )"[^"]*"(,\n    pages: )"[^"]*"(,\n    doi: )"[^"]*"'
    
    replacement = (
        f'  {{\n    id: {pid},\n    title: "{entry["title"]}"'
        f',\n    authors: "{entry["authors"]}"'
        f',\n    journal: "{entry["journal"]}"'
        f',\n    year: "{entry["year"]}"'
        f',\n    volume: "{entry["volume"]}"'
        f',\n    pages: "{entry["pages"]}"'
        f',\n    doi: "{doi}"'
    )
    
    master = re.sub(pattern, replacement, master)
    print(f"  Fixed entry {pid}: {entry['title'][:60]}")

# Remove duplicate entry 32 (same as 33)
# Find the entry block for id: 32
entry32_pattern = r'  \{\n    id: 32,\n.*?\n  \},\n'
if re.search(entry32_pattern, master, re.DOTALL):
    master = re.sub(entry32_pattern, '', master, count=1, flags=re.DOTALL)
    print("  Removed duplicate entry 32")

# Add entry 48 after entry 49
entry48_ft = originals.get(48, "V. G. Landge, J. Pitchaimani, S. P. Midya, M. Subaramanian, V. Madhu and E. Balaraman*. Phosphine-free cobalt pincer complex catalyzed Z-selective semi-hydrogenation of unbiased alkynes. Catal. Sci. Technol., 2018, 8, 428-433.")
entry48_block = f'''  {{
    id: 48,
    title: "{MANUAL_ENTRIES[48]["title"]}",
    authors: "{MANUAL_ENTRIES[48]["authors"]}",
    journal: "{MANUAL_ENTRIES[48]["journal"]}",
    year: "{MANUAL_ENTRIES[48]["year"]}",
    volume: "{MANUAL_ENTRIES[48]["volume"]}",
    pages: "{MANUAL_ENTRIES[48]["pages"]}",
    doi: "10.1039/C7CY01994G",
    coverImage: "/images/publications/covers/48.png",
    schemeImage: "/images/publications/schemes/48.jpg",
    fullText: "{entry48_ft}",
  }},
'''

# Insert after id: 49 entry
master = re.sub(r'(  \},\n)(  \{\n    id: 47,)', f'\\1{entry48_block}\\2', master)
print("  Added missing entry 48")

with open(MASTER_PATH, 'w', encoding='utf-8') as f:
    f.write(master)

# Verify
ids = [int(m.group(1)) for m in re.finditer(r'id: (\d+),', master)]
print(f"\nTotal entries: {len(ids)}")
print(f"Missing IDs: {sorted(set(range(1,118)) - set(ids))}")
print(f"Duplicate IDs: {[x for x in ids if ids.count(x) > 1]}")
