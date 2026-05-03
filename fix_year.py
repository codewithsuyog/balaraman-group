import json
import re

with open("app/data.ts", "r", encoding="utf-8") as f:
    data_content = f.read()

# Extract the publications JSON array from data.ts
pattern = r'export const publications = (\[.*?\]);'
match = re.search(pattern, data_content, re.DOTALL)
if match:
    pubs = json.loads(match.group(1))
    
    for pub in pubs:
        if 'fullText' in pub:
            # Find year typically placed after journal name or near the end.
            # E.g. "Org. Lett. 2025," or "(2025)"
            # Let's find a 4-digit number that represents a year (1990-2025)
            # Find all years
            years = re.findall(r'\b(19[9]\d|20[0-2]\d)\b', pub['fullText'])
            if years:
                # usually the first occurrence is the publication year, unless there is a citation in the title
                pub['year'] = years[-1] if len(years) > 1 else years[0]
                
                # Check if there is a match like "(2021)" or " 2021," or " 2021."
                better_year = re.search(r'[\s(](19[9]\d|20[0-2]\d)[.,)]', pub['fullText'])
                if better_year:
                    pub['year'] = better_year.group(1)

    new_pubs_str = "export const publications = " + json.dumps(pubs, indent=2, ensure_ascii=False) + ";"
    data_content = re.sub(pattern, new_pubs_str, data_content, flags=re.DOTALL)

    with open("app/data.ts", "w", encoding="utf-8") as f:
        f.write(data_content)
