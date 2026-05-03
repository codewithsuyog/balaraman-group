import json
import re

with open('raw_pubs_split.json', 'r', encoding='utf-8') as f:
    raw_pubs = json.load(f)

pubs = []
for p in raw_pubs:
    raw_text = p['raw'].replace('\n', ' ')
    
    # Extract DOI
    doi = ""
    doi_match = re.search(r'(https?://doi\.org/[^\s]+|10\.\d{4,9}/[-._;()/:A-Z0-9]+)', raw_text, re.IGNORECASE)
    if doi_match:
        doi = doi_match.group(1)
        raw_text = raw_text.replace(doi, '').strip()

    # Extract Year (usually a 4-digit number at the end of the citation like (2025) or 2025, or 2025.)
    year = ""
    year_match = re.findall(r'\b(19\d{2}|20\d{2})\b', raw_text)
    if year_match:
        year = year_match[-1] # Usually the last year is the publication year

    # Let's just put all the text into "title" so it renders perfectly without weird dot splitting, and keep authors/journal empty
    # Wait, the UI renders: {pub.authors}. {pub.title}. <span className="italic">{pub.journal}</span>, {pub.year}{pub.details}
    # If I put everything in `title`, and clear `year` (so it's not rendered twice), it will render:
    # . Full Title String Here. , 
    # To fix this, I can modify `app/publications/page.tsx` to just render `pub.fullText` if it exists.
    
    pubs.append({
        "id": p['id'],
        "authors": "",
        "title": "",
        "journal": "",
        "year": year,
        "details": "",
        "doi": doi,
        "fullText": raw_text
    })

pubs.sort(key=lambda x: x["id"], reverse=True)

# Replace data.ts
with open("app/data.ts", "r", encoding="utf-8") as f:
    data_content = f.read()

pattern = r'export const publications = \[.*?\];'
new_pubs_str = "export const publications = " + json.dumps(pubs, indent=2, ensure_ascii=False) + ";"
data_content = re.sub(pattern, new_pubs_str, data_content, flags=re.DOTALL)

with open("app/data.ts", "w", encoding="utf-8") as f:
    f.write(data_content)
