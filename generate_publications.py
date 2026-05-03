"""
generate_publications.py
Parses the fullText citation strings from data.ts and generates a clean,
structured publications.ts master file with: id, title, authors, journal,
year, volume, pages, doi, coverImage, schemeImage.
"""

import re
import os
import json

# ─── Known journal abbreviations (longest-match first for greedy search) ──────
JOURNALS = [
    "Nature Chem.", "Nature. Chem.", "Nature Commun.", "ACS Catal.",
    "ACS Sustainable Chem. Eng.", "ACS Sustain. Chem. Eng.",
    "ACS Appl. Energy Mater.", "ACS Appl. Mater. Interfaces.",
    "ACS Appl. Mater. Interfaces",
    "ACS Omega", "ACS Symposium Series",
    "Angew. Chem. Int. Ed.", "Angew. Chem. Intl. Ed.", "Angew. Chem.",
    "Adv. Syn. Catal.", "Adv. Synth. Catal.",
    "Biomass Convers. Biorefin.",
    "Catal. Sci. Technol.", "Catal. Today", "Catal. Lett.",
    "ChemCatChem.", "ChemCatChem",
    "ChemSusChem.", "ChemSusChem",
    "Chem. Asian J.", "Chem. Commun.", "Chem. Comm.",
    "Chem. Eur. J.", "Chem. Rev.", "Chem. Rec.",
    "Chemosphere",
    "Dalton Trans.",
    "Green Chem.",
    "Inorg. Chem. Acta.", "Inorg. Chem.",
    "Int. J. Hydrogen Energy",
    "J. Am. Chem. Soc.", "J. Catal.", "J. Chem. Sci.",
    "J. Mat. Chem. A.", "J. Org. Chem.",
    "J. Polymer. Chem. A.",
    "Mol. Catal.",
    "Org. Biomol. Chem.",
    "Org. Chem. Front.",
    "Org. Lett.",
    "Organometallics.",  "Organometallics",
    "Proc. Natl. Acad. Sci., India, Sect. A Phys. Sci.",
    "Synthesis",
    "Tetrahedron: Asymmetry.", "Tetrahedron: Asymmetry",
    "Tetrahedron.",  "Tetrahedron",
    "Top. Organomet. Chem.",
    "ChemistrySelect.",
    "Eur. J. Org. Chem.",
    "Cryst. Growth Des.",
    "Inorg. Chem.",
    "Int. J. Biol. Macromol.",
    "International Journal of Biological Macromolecules",
]
# Sort longest first
JOURNALS.sort(key=len, reverse=True)

# Image extension lookup table
COVER_EXTS = {
    "100": "jpg", "101": "jpg", "102": "jpg", "103": "jpg", "104": "jpg",
    "105": "png", "106": "png", "107": "jpg", "108": "png", "109": "jpg",
    "110": "jpg", "111": "jpg", "112": "gif", "113": "jpg", "114": "jpg",
    "115": "jpg", "116": "jpg", "117": "jpg",
    "28": "png",  "29": "jpg",  "30": "jpg",  "31": "jpg",  "32": "jpg",
    "33": "jpg",  "34": "jpg",  "35": "jpg",  "36": "jpg",  "37": "jpg",
    "38": "jpg",  "39": "jpg",  "40": "jpg",  "41": "jpg",  "42": "jpg",
    "43": "jpg",  "44": "jpg",  "45": "png",  "46": "jpg",  "47": "png",
    "48": "png",  "49": "jpg",  "50": "png",  "51": "jpg",  "52": "jpg",
    "53": "jpg",  "54": "jpg",  "55": "jpg",  "56": "jpg",  "57": "png",
    "58": "jpg",  "59": "jpg",  "60": "jpg",  "61": "jpg",  "62": "jpg",
    "63": "jpg",  "64": "jpg",  "65": "jpg",  "66": "jpg",  "67": "jpg",
    "68": "jpg",  "69": "jpg",  "70": "png",  "71": "jpg",  "72": "jpg",
    "73": "jpg",  "74": "png",  "75": "jpg",  "76": "jpg",  "77": "jpg",
    "78": "jpg",  "79": "png",  "80": "jpg",  "81": "jpg",  "82": "jpg",
    "83": "png",  "84": "jpg",  "85": "jpg",  "86": "png",  "87": "jpg",
    "88": "jpg",  "89": "jpg",  "90": "jpg",  "91": "jpg",  "92": "jpg",
    "93": "jpg",  "94": "jpg",  "95": "jpg",  "96": "jpg",  "97": "jpg",
    "98": "jpg",  "99": "jpg",
}

SCHEME_EXTS = {
    "100": "jpg", "101": "jpg", "102": "jpg", "103": "jpg", "104": "jpg",
    "105": "png", "106": "png", "107": "png", "108": "png", "109": "png",
    "110": "png", "111": "png", "112": "png", "113": "jpg", "114": "jpg",
    "115": "jpg", "116": "jpg", "117": "jpg",
    "28": "jpg",  "29": "jpg",  "31": "jpg",  "32": "jpg",  "33": "jpg",
    "34": "jpg",  "35": "jpg",  "36": "jpg",  "37": "jpg",  "38": "jpg",
    "39": "jpg",  "40": "jpg",  "41": "jpg",  "42": "jpg",  "43": "jpg",
    "44": "jpg",  "45": "jpg",  "46": "jpg",  "47": "jpg",  "48": "jpg",
    "49": "jpg",  "50": "jpg",  "51": "jpg",  "52": "jpg",  "53": "jpg",
    "54": "jpg",  "55": "jpg",  "56": "jpg",  "57": "jpg",  "58": "jpg",
    "59": "jpg",  "60": "jpg",  "61": "jpg",  "62": "jpg",  "63": "jpg",
    "64": "png",  "65": "png",  "66": "jpg",  "67": "png",  "68": "png",
    "69": "png",  "70": "png",  "71": "png",  "72": "png",  "75": "png",
    "76": "png",  "77": "png",  "78": "png",  "79": "png",  "81": "png",
    "82": "png",  "83": "png",  "84": "png",  "85": "png",  "86": "png",
    "87": "png",  "88": "png",  "89": "png",  "90": "png",  "91": "png",
    "92": "png",  "93": "jpg",  "94": "png",  "95": "gif",  "96": "jpg",
    "97": "jpg",  "98": "png",  "99": "png",
}


def find_journal_in_text(text):
    """Return (journal_name, position) or (None, -1)."""
    for j in JOURNALS:
        idx = text.find(j)
        if idx != -1:
            return j, idx
    return None, -1


def clean_doi(raw):
    """Strip leading/trailing junk from a DOI."""
    if not raw:
        return ""
    raw = raw.strip().rstrip(".")
    # Remove leading 'DOI:', 'doi:', 'https://doi.org/', etc.
    raw = re.sub(r"(?i)^(doi:|https?://doi\.org/)", "", raw).strip()
    # Remove trailing #
    raw = raw.rstrip("#")
    return raw


def extract_doi(text):
    """Extract a DOI from citation text."""
    # Pattern 1: DOI: or doi: or doi.org/
    m = re.search(
        r"(?:DOI:|doi:|https?://doi\.org/)\s*(10\.\d{4,}[^\s,;\"\']+)",
        text, re.IGNORECASE
    )
    if m:
        return clean_doi(m.group(1))
    # Pattern 2: bare 10.xxxx/... appearing anywhere
    m = re.search(r"\b(10\.\d{4,}/[^\s,;\"\']+)", text)
    if m:
        return clean_doi(m.group(1))
    return ""


def parse_citation(pub_id, fulltext):
    """
    Parse a raw citation string into structured fields.
    Returns dict with: id, title, authors, journal, year, volume, pages, doi, fullText
    """
    text = fulltext.strip()

    # ── 1. Extract DOI first (so we can strip it from text) ─────────────────
    doi = extract_doi(text)

    # ── 2. Find journal in text ──────────────────────────────────────────────
    journal, j_pos = find_journal_in_text(text)

    result = {
        "id": pub_id,
        "title": "",
        "authors": "",
        "journal": journal or "",
        "year": "",
        "volume": "",
        "pages": "",
        "doi": doi,
        "fullText": fulltext,
    }

    if journal and j_pos > 0:
        # Everything before the journal name = authors + title
        pre = text[:j_pos].strip().rstrip(",. ")

        # ── 3. Split authors / title ──────────────────────────────────────────
        # Heuristic: the title is the last sentence (ends with period or nothing),
        # while authors are separated by commas and have name-like patterns.
        # Strategy: find the last full-stop that is followed by a capital letter
        # which is NOT an abbreviation (like "J." or "E.").
        # We look for ". Title starts here" — capital word after ". "
        # but not "J. " or single-letter abbreviations.

        # Try to find a boundary between "Authors.*. Title starts"
        # A title boundary: ". [Capital word that is >1 char and not an abbrev]"
        title_start = -1
        # Walk backwards through periods in `pre`
        for m in re.finditer(r'\.\s+([A-Z][a-z]{2,})', pre):
            # Candidate: the part after this period could be the title start
            candidate_start = m.start() + 1  # skip the period
            # Check if what comes before looks like author list (has commas, has initials)
            before = pre[:m.start()]
            if re.search(r'\b[A-Z]\.\s', before) or re.search(r',\s*[A-Z]', before):
                title_start = candidate_start

        if title_start > 0:
            result["authors"] = pre[:title_start].strip().rstrip(",. ")
            result["title"] = pre[title_start:].strip().strip(".")
        else:
            # Fallback: no clear split — put everything in title, leave authors blank
            result["title"] = pre
            result["authors"] = ""

        # ── 4. Parse volume, year, pages from after-journal portion ──────────
        after = text[j_pos + len(journal):].strip().lstrip(",. ")
        # Remove DOI/URL portion
        after = re.sub(r"(?:DOI:|doi:|https?://\S+)\s*\S*", "", after, flags=re.IGNORECASE).strip()

        # Typical: "2024, 14, 11, 8294–8309" or "85, 11, 7181–7191 (2020)" etc.
        # Year: 4-digit in parens or standalone
        year_m = re.search(r'\((\d{4})\)', after)
        if year_m:
            result["year"] = year_m.group(1)
            after_no_year = after[:year_m.start()].strip()
        else:
            # Year may appear as first token after journal (e.g. "2025, 121, 42-69")
            year_m2 = re.search(r'\b(20\d{2}|19\d{2})\b', after)
            result["year"] = year_m2.group(1) if year_m2 else ""
            if year_m2:
                # Remove the year token so volume parsing doesn't pick it up
                after_no_year = after[:year_m2.start()] + after[year_m2.end():]
            else:
                after_no_year = after

        # Volume: first number after removing year
        vol_m = re.search(r',?\s*(\d+)\s*[,.]', after_no_year)
        if vol_m:
            result["volume"] = vol_m.group(1)

        # Pages: range with –, -, or em dash
        pages_m = re.search(r'(\d+)\s*[–\-—]\s*(\d+)', after)
        if pages_m:
            result["pages"] = f"{pages_m.group(1)}–{pages_m.group(2)}"

    else:
        # No known journal found — store raw text in title
        result["title"] = text
        result["authors"] = ""

    # ── 5. Clean up title ────────────────────────────────────────────────────
    result["title"] = result["title"].strip().rstrip(".,")
    result["authors"] = result["authors"].strip().rstrip(".,")

    return result


def image_path(pub_id, folder, ext_map):
    key = str(pub_id)
    ext = ext_map.get(key)
    if ext:
        return f"/images/publications/{folder}/{key}.{ext}"
    return ""


def main():
    data_path = os.path.join(os.path.dirname(__file__), "app", "data.ts")
    with open(data_path, encoding="utf-8") as f:
        raw = f.read()

    # ── Extract each publication block ──────────────────────────────────────
    # Find the publications array
    pubs_match = re.search(
        r'export const publications\s*=\s*\[(.*?)\];',
        raw, re.DOTALL
    )
    if not pubs_match:
        print("ERROR: Could not find publications array in data.ts")
        return

    pubs_text = pubs_match.group(1)

    # Split into individual objects (naive: split on "},\n  {")
    # Safer: find all id + fullText pairs
    entries = []
    for m in re.finditer(
        r'"id"\s*:\s*(\d+).*?"fullText"\s*:\s*"((?:[^"\\]|\\.)*)"\s*\}',
        pubs_text, re.DOTALL
    ):
        pub_id = int(m.group(1))
        full_text = m.group(2).replace('\\"', '"').replace('\\n', ' ').replace("\\r", "")
        entries.append((pub_id, full_text))

    print(f"Found {len(entries)} publications")

    parsed = []
    for pub_id, ft in entries:
        p = parse_citation(pub_id, ft)
        # Attach images
        p["coverImage"] = image_path(pub_id, "covers", COVER_EXTS)
        p["schemeImage"] = image_path(pub_id, "schemes", SCHEME_EXTS)
        parsed.append(p)

    # ── Verify: print a few entries ─────────────────────────────────────────
    for p in parsed[:5]:
        print(f"\n=== ID {p['id']} ===")
        print(f"  authors: {p['authors'][:80]}")
        print(f"  title  : {p['title'][:80]}")
        print(f"  journal: {p['journal']}")
        print(f"  year   : {p['year']}")
        print(f"  volume : {p['volume']}")
        print(f"  pages  : {p['pages']}")
        print(f"  doi    : {p['doi']}")
        print(f"  cover  : {p['coverImage']}")
        print(f"  scheme : {p['schemeImage']}")

    # ── Generate TypeScript output ───────────────────────────────────────────
    lines = []
    lines.append("// ============================================================")
    lines.append("// MASTER PUBLICATIONS FILE — auto-generated by generate_publications.py")
    lines.append("// ============================================================")
    lines.append("// Schema:")
    lines.append("//   id          : unique publication number (117 = most recent)")
    lines.append("//   title       : paper title only (no authors, no journal)")
    lines.append("//   authors     : full author list as published")
    lines.append("//   journal     : abbreviated journal name")
    lines.append("//   year        : publication year (string)")
    lines.append("//   volume      : journal volume")
    lines.append("//   pages       : page range (e.g. '8294–8309')")
    lines.append("//   doi         : bare DOI without prefix (e.g. '10.1021/...')")
    lines.append("//   coverImage  : path to /images/publications/covers/<id>.<ext>")
    lines.append("//   schemeImage : path to /images/publications/schemes/<id>.<ext>")
    lines.append("//   fullText    : original raw citation (for reference)")
    lines.append("// ============================================================\n")
    lines.append("export interface Publication {")
    lines.append("  id: number;")
    lines.append("  title: string;")
    lines.append("  authors: string;")
    lines.append("  journal: string;")
    lines.append("  year: string;")
    lines.append("  volume: string;")
    lines.append("  pages: string;")
    lines.append("  doi: string;")
    lines.append("  coverImage: string;")
    lines.append("  schemeImage: string;")
    lines.append("  fullText: string;")
    lines.append("}\n")
    lines.append("export const publications: Publication[] = [")

    for p in parsed:
        def esc(s):
            return s.replace("\\", "\\\\").replace('"', '\\"').replace("\n", " ").replace("\r", "")

        lines.append("  {")
        lines.append(f'    id: {p["id"]},')
        lines.append(f'    title: "{esc(p["title"])}",')
        lines.append(f'    authors: "{esc(p["authors"])}",')
        lines.append(f'    journal: "{esc(p["journal"])}",')
        lines.append(f'    year: "{esc(p["year"])}",')
        lines.append(f'    volume: "{esc(p["volume"])}",')
        lines.append(f'    pages: "{esc(p["pages"])}",')
        lines.append(f'    doi: "{esc(p["doi"])}",')
        lines.append(f'    coverImage: "{esc(p["coverImage"])}",')
        lines.append(f'    schemeImage: "{esc(p["schemeImage"])}",')
        lines.append(f'    fullText: "{esc(p["fullText"])}",')
        lines.append("  },")

    lines.append("];")
    lines.append("")

    out_path = os.path.join(os.path.dirname(__file__), "app", "publications.ts")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))

    print(f"\nDone! Written to: {out_path}")
    print(f"   Total entries: {len(parsed)}")


if __name__ == "__main__":
    main()
