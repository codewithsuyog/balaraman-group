"""
fix_publications.py - Uses CrossRef API to fetch CORRECT metadata for each publication.
This bypasses all regex parsing issues by getting title/authors/journal directly from DOI lookups.
"""
import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

import re, json, time, os, urllib.request, urllib.parse, urllib.error

DATA_PATH = os.path.join(os.path.dirname(__file__), "app", "data.ts")
OUT_PATH = os.path.join(os.path.dirname(__file__), "app", "publications_master.ts")

# Cover/scheme image extensions (from disk scan)
COVER_EXTS = {
    "28":"png","29":"jpg","30":"jpg","31":"jpg","32":"jpg","33":"jpg","34":"jpg","35":"jpg",
    "36":"jpg","37":"jpg","38":"jpg","39":"jpg","40":"jpg","41":"jpg","42":"jpg","43":"jpg",
    "44":"jpg","45":"png","46":"jpg","47":"png","48":"png","49":"jpg","50":"png","51":"jpg",
    "52":"jpg","53":"jpg","54":"jpg","55":"jpg","56":"jpg","57":"png","58":"jpg","59":"jpg",
    "60":"jpg","61":"jpg","62":"jpg","63":"jpg","64":"jpg","65":"jpg","66":"jpg","67":"jpg",
    "68":"jpg","69":"jpg","70":"png","71":"jpg","72":"jpg","73":"jpg","74":"png","75":"jpg",
    "76":"jpg","77":"jpg","78":"jpg","79":"png","80":"jpg","81":"jpg","82":"jpg","83":"png",
    "84":"jpg","85":"jpg","86":"png","87":"jpg","88":"jpg","89":"jpg","90":"jpg","91":"jpg",
    "92":"jpg","93":"jpg","94":"jpg","95":"jpg","96":"jpg","97":"jpg","98":"jpg","99":"jpg",
    "100":"jpg","101":"jpg","102":"jpg","103":"jpg","104":"jpg","105":"png","106":"png",
    "107":"jpg","108":"png","109":"jpg","110":"jpg","111":"jpg","112":"gif","113":"jpg",
    "114":"jpg","115":"jpg","116":"jpg","117":"jpg",
}
SCHEME_EXTS = {
    "28":"jpg","29":"jpg","31":"jpg","32":"jpg","33":"jpg","34":"jpg","35":"jpg","36":"jpg",
    "37":"jpg","38":"jpg","39":"jpg","40":"jpg","41":"jpg","42":"jpg","43":"jpg","44":"jpg",
    "45":"jpg","46":"jpg","47":"jpg","48":"jpg","49":"jpg","50":"jpg","51":"jpg","52":"jpg",
    "53":"jpg","54":"jpg","55":"jpg","56":"jpg","57":"jpg","58":"jpg","59":"jpg","60":"jpg",
    "61":"jpg","62":"jpg","63":"jpg","64":"png","65":"png","66":"jpg","67":"png","68":"png",
    "69":"png","70":"png","71":"png","72":"png","75":"png","76":"png","77":"png","78":"png",
    "79":"png","81":"png","82":"png","83":"png","84":"png","85":"png","86":"png","87":"png",
    "88":"png","89":"png","90":"png","91":"png","92":"png","93":"jpg","94":"png","95":"gif",
    "96":"jpg","97":"jpg","98":"png","99":"png","100":"jpg","101":"jpg","102":"jpg","103":"jpg",
    "104":"jpg","105":"png","106":"png","107":"png","108":"png","109":"png","110":"png",
    "111":"png","112":"png","113":"jpg","114":"jpg","115":"jpg","116":"jpg","117":"jpg",
}

def extract_all_dois(doi_field, fulltext):
    """Extract DOI from both the doi field and the fullText."""
    if doi_field and doi_field.strip() and doi_field.strip() != "#":
        d = doi_field.strip().rstrip(".#")
        d = re.sub(r"(?i)^(doi:|https?://doi\.org/)", "", d).strip()
        if d.startswith("10."):
            return d
    # Try fullText
    for pattern in [
        r"(?:DOI:|doi:|https?://doi\.org/)\s*(10\.\d{4,}/[^\s,;\"']+)",
        r"\b(10\.\d{4,}/[^\s,;\"']+)",
    ]:
        m = re.search(pattern, fulltext, re.IGNORECASE)
        if m:
            return m.group(1).rstrip(".#)")
    return ""

def query_crossref(doi):
    """Query CrossRef API for structured metadata."""
    url = f"https://api.crossref.org/works/{urllib.parse.quote(doi, safe='')}"
    req = urllib.request.Request(url, headers={
        "User-Agent": "BalaramanGroupWebsite/1.0 (mailto:eb.raman@iisertirupati.ac.in)"
    })
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            msg = data.get("message", {})
            title = ""
            if msg.get("title"):
                title = msg["title"][0]
                # Strip HTML tags CrossRef sometimes returns
                title = re.sub(r'<[^>]+>', '', title)
            authors_list = []
            for a in msg.get("author", []):
                given = a.get("given", "")
                family = a.get("family", "")
                if given and family:
                    authors_list.append(f"{given} {family}")
                elif family:
                    authors_list.append(family)
            authors = ", ".join(authors_list)
            journal = ""
            if msg.get("container-title"):
                journal = msg["container-title"][0]
            elif msg.get("short-container-title"):
                journal = msg["short-container-title"][0]
            year = ""
            dp = msg.get("published-print") or msg.get("published-online") or msg.get("published")
            if dp and dp.get("date-parts") and dp["date-parts"][0]:
                year = str(dp["date-parts"][0][0])
            volume = msg.get("volume", "")
            pages = msg.get("page", "").replace("-", "\u2013")
            return {
                "title": title, "authors": authors, "journal": journal,
                "year": year, "volume": volume, "pages": pages, "found": True
            }
    except Exception as e:
        print(f"  CrossRef error for {doi}: {e}")
        return {"found": False}

def parse_from_fulltext(fulltext):
    """Fallback parser for entries without DOIs - uses known journal list."""
    JOURNALS = [
        "Nature Chem.","Nature. Chem.","Nature Commun.","ACS Catal.",
        "ACS Sustainable Chem. Eng.","ACS Sustain. Chem. Eng.",
        "ACS Appl. Energy Mater.","ACS Appl. Mater. Interfaces.",
        "ACS Omega","ACS Symposium Series",
        "Angew. Chem. Int. Ed.","Angew. Chem. Intl. Ed.",
        "Adv. Syn. Catal.","Biomass Convers. Biorefin.",
        "Catal. Sci. Technol.","Catal. Today","Catal. Lett.",
        "ChemCatChem.","ChemCatChem","ChemSusChem.","ChemSusChem",
        "Chem. Asian J.","Chem. Commun.","Chem. Eur. J.","Chem. Rev.","Chem. Rec.",
        "Chemosphere","Dalton Trans.","Green Chem.",
        "Inorg. Chem. Acta.","Inorg. Chem.","Inorg.Chem.",
        "Int. J. Hydrogen Energy","International Journal of Biological Macromolecules",
        "J. Am. Chem. Soc.","J. Catal.","J. Chem. Sci.","J. Mat. Chem. A.",
        "J. Org. Chem.","J. Polymer. Chem. A.",
        "Mol. Catal.","Org. Biomol. Chem.","Org. Chem. Front.",
        "Org. Lett.","Organic Letters","Organometallics.","Organometallics",
        "Proc. Natl. Acad. Sci., India, Sect. A Phys. Sci.",
        "Synthesis","Tetrahedron: Asymmetry.","Tetrahedron: Asymmetry",
        "Tetrahedron.","Tetrahedron","Top. Organomet. Chem.",
        "ChemistrySelect.","Eur. J. Org. Chem.","Cryst. Growth Des.",
    ]
    JOURNALS.sort(key=len, reverse=True)
    
    text = fulltext.strip()
    journal = ""
    j_pos = -1
    for j in JOURNALS:
        idx = text.find(j)
        if idx != -1:
            journal = j
            j_pos = idx
            break
    
    result = {"title": "", "authors": "", "journal": journal, "year": "", "volume": "", "pages": ""}
    
    if journal and j_pos > 0:
        pre = text[:j_pos].strip().rstrip(",. ")
        after = text[j_pos + len(journal):].strip().lstrip(",. ")
        
        # For author/title split: find the LAST period followed by a space and 
        # an uppercase word that is 3+ chars (likely a title word, not an initial)
        best_split = -1
        for m in re.finditer(r'\.\s+([A-Z][a-z]{2,})', pre):
            before = pre[:m.start()]
            # Must have at least one comma (author separator) before this point
            if ',' in before:
                best_split = m.start() + 1
        
        if best_split > 0:
            result["authors"] = pre[:best_split].strip().rstrip(",. *")
            result["title"] = pre[best_split:].strip().strip(".")
        else:
            result["title"] = pre
        
        # Year
        ym = re.search(r'\((\d{4})\)', after)
        if ym:
            result["year"] = ym.group(1)
        else:
            ym2 = re.search(r'\b(20\d{2}|19\d{2})\b', after)
            if ym2:
                result["year"] = ym2.group(1)
        
        # Volume
        after_clean = re.sub(r'\b(20\d{2}|19\d{2})\b', '', after, count=1)
        vm = re.search(r'(\d+)\s*[,.]', after_clean)
        if vm:
            result["volume"] = vm.group(1)
        
        # Pages
        pm = re.search(r'(\d+)\s*[-\u2013\u2014]\s*(\d+)', after)
        if pm:
            result["pages"] = f"{pm.group(1)}\u2013{pm.group(2)}"
    else:
        result["title"] = text
    
    return result

def main():
    with open(DATA_PATH, encoding="utf-8") as f:
        raw = f.read()
    
    pubs_match = re.search(r'export const publications\s*=\s*\[(.*?)\];', raw, re.DOTALL)
    if not pubs_match:
        print("ERROR: Could not find publications array")
        return
    
    entries = []
    for m in re.finditer(
        r'"id"\s*:\s*(\d+).*?"fullText"\s*:\s*"((?:[^"\\]|\\.)*)"\s*\}',
        pubs_match.group(1), re.DOTALL
    ):
        pub_id = int(m.group(1))
        ft = m.group(2).replace('\\"', '"').replace('\\n', ' ').replace("\\r", "")
        # Also grab the doi field
        doi_match = re.search(rf'"id"\s*:\s*{pub_id}.*?"doi"\s*:\s*"([^"]*)"', pubs_match.group(1), re.DOTALL)
        doi_field = doi_match.group(1) if doi_match else ""
        entries.append((pub_id, ft, doi_field))
    
    print(f"Found {len(entries)} publications")
    
    results = []
    crossref_hits = 0
    fallback_count = 0
    
    for pub_id, fulltext, doi_field in entries:
        doi = extract_all_dois(doi_field, fulltext)
        
        rec = {
            "id": pub_id, "title": "", "authors": "", "journal": "",
            "year": "", "volume": "", "pages": "", "doi": doi,
            "fullText": fulltext,
            "coverImage": f"/images/publications/covers/{pub_id}.{COVER_EXTS.get(str(pub_id), 'jpg')}" if str(pub_id) in COVER_EXTS else "",
            "schemeImage": f"/images/publications/schemes/{pub_id}.{SCHEME_EXTS.get(str(pub_id), 'jpg')}" if str(pub_id) in SCHEME_EXTS else "",
        }
        
        if doi:
            print(f"  [{pub_id}] Querying CrossRef for {doi}...")
            cr = query_crossref(doi)
            if cr.get("found") and cr.get("title"):
                rec["title"] = cr["title"]
                rec["authors"] = cr["authors"]
                rec["journal"] = cr["journal"]
                rec["year"] = cr["year"]
                rec["volume"] = cr["volume"]
                rec["pages"] = cr["pages"]
                crossref_hits += 1
                print(f"       OK: {cr['title'][:70]}")
            else:
                print(f"       FALLBACK: CrossRef failed, using text parser")
                fb = parse_from_fulltext(fulltext)
                rec.update({k: fb[k] for k in ["title","authors","journal","year","volume","pages"]})
                fallback_count += 1
            time.sleep(0.3)  # Rate limit
        else:
            print(f"  [{pub_id}] No DOI - using text parser")
            fb = parse_from_fulltext(fulltext)
            rec.update({k: fb[k] for k in ["title","authors","journal","year","volume","pages"]})
            fallback_count += 1
        
        results.append(rec)
    
    print(f"\nCrossRef hits: {crossref_hits}, Fallback: {fallback_count}")
    
    # Generate TypeScript
    lines = []
    lines.append("// ================================================================")
    lines.append("// MASTER PUBLICATIONS FILE")
    lines.append("// Generated via CrossRef API + fallback parser")
    lines.append("// ================================================================\n")
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
    
    def esc(s):
        return str(s).replace("\\", "\\\\").replace('"', '\\"').replace("\n", " ").replace("\r", "")
    
    for r in results:
        lines.append("  {")
        lines.append(f'    id: {r["id"]},')
        lines.append(f'    title: "{esc(r["title"])}",')
        lines.append(f'    authors: "{esc(r["authors"])}",')
        lines.append(f'    journal: "{esc(r["journal"])}",')
        lines.append(f'    year: "{esc(r["year"])}",')
        lines.append(f'    volume: "{esc(r["volume"])}",')
        lines.append(f'    pages: "{esc(r["pages"])}",')
        lines.append(f'    doi: "{esc(r["doi"])}",')
        lines.append(f'    coverImage: "{esc(r["coverImage"])}",')
        lines.append(f'    schemeImage: "{esc(r["schemeImage"])}",')
        lines.append(f'    fullText: "{esc(r["fullText"])}",')
        lines.append("  },")
    
    lines.append("];")
    
    with open(OUT_PATH, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))
    
    print(f"\nWritten to: {OUT_PATH}")
    print(f"Total: {len(results)} publications")

if __name__ == "__main__":
    main()
