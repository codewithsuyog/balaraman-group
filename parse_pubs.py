import re
import json

with open("raw_pubs.txt", "r", encoding="utf-8") as f:
    text = f.read()

# split by \n\n or \n
blocks = re.split(r'\n\s*\n', text)

pubs = []
for block in blocks:
    block = block.strip()
    if not block:
        continue
    
    # Try to find ID at start
    match_id = re.match(r'^(\d+)\.\s+(.*)', block, re.DOTALL)
    if not match_id:
        continue
    
    pub_id = match_id.group(1)
    content = match_id.group(2).replace('\n', ' ').strip()
    
    doi = ""
    doi_match = re.search(r'(https?://doi\.org/[^\s]+)', content)
    if doi_match:
        doi = doi_match.group(1)
        content = content.replace(doi, '').strip()
    
    year_match = re.search(r'\b(19\d{2}|20\d{2})\b', content)
    year = year_match.group(1) if year_match else ""
    
    # Let's try to split into Authors, Title, Journal
    # Usually: Authors. Title. Journal Year Details
    # Let's split by first period that is followed by a space and a capital letter, but not after a single letter (like E. Balaraman).
    # Since Balaraman*. is common:
    
    parts = re.split(r'\.\s+(?=[A-Z])', content, maxsplit=2)
    authors = ""
    title = ""
    journal_details = ""
    
    # Actually, "E. Balaraman*." is often the end of authors.
    split_authors = re.split(r'\*\.\s+', content, maxsplit=1)
    if len(split_authors) == 2:
        authors = split_authors[0] + "*"
        rest = split_authors[1]
        
        # Now split rest into title and journal
        split_title = re.split(r'\.\s+(?=[A-Z])', rest, maxsplit=1)
        if len(split_title) == 2:
            title = split_title[0]
            journal_details = split_title[1]
        else:
            title = rest
    else:
        authors = content
        title = ""
        journal_details = ""

    pubs.append({
        "id": int(pub_id),
        "authors": authors.strip(),
        "title": title.strip(),
        "journal": journal_details.strip(),
        "year": year,
        "details": "",
        "doi": doi
    })

# Sort by ID descending
pubs.sort(key=lambda x: x["id"], reverse=True)

with open("parsed_pubs.json", "w", encoding="utf-8") as f:
    json.dump(pubs, f, indent=2, ensure_ascii=False)

# Now, read data.ts, replace the export const publications = [...] block with the new JSON.
with open("app/data.ts", "r", encoding="utf-8") as f:
    data_content = f.read()

import re
# find export const publications = [ ... ];
pattern = r'export const publications = \[.*?\];'
# We need re.DOTALL to match across newlines
new_pubs_str = "export const publications = " + json.dumps(pubs, indent=2, ensure_ascii=False) + ";"
data_content = re.sub(pattern, new_pubs_str, data_content, flags=re.DOTALL)

with open("app/data.ts", "w", encoding="utf-8") as f:
    f.write(data_content)

