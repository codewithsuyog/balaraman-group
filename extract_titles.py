import re
import json


def extract_year(citation):
    """Extract the publication year (not years embedded in text like Nobel-2005)."""
    # Look for year in journal context: ", YEAR," or ". YEAR." or "(YEAR)" or "YEAR, vol"
    # These patterns indicate the publication year
    patterns = [
        r'[,\s]\(?((?:19|20)\d{2})\)?,\s*\d',   # ", 2024, 14," or "(2024), 14,"
        r'[,\s]\(?((?:19|20)\d{2})\)?\.',          # ", 2024." or ". 2024."
        r'[,\s]\(?((?:19|20)\d{2})\)?\s*$',        # ends with year
    ]
    for pat in patterns:
        m = re.search(pat, citation)
        if m:
            return m.group(1)
    # Fallback: first 4-digit year that looks like publication year (not in middle of text like "Nobel-2005")
    for m in re.finditer(r'\b((?:19|20)\d{2})\b', citation):
        y = int(m.group(1))
        if 1990 <= y <= 2030:
            # Check it's not preceded by a hyphen (like "Nobel-2005")
            start = m.start()
            if start > 0 and citation[start-1] == '-':
                continue
            return m.group(1)
    return ''


def extract_title_from_after_authors(after_authors):
    """
    Extract title from 'Title. Journal details, Year...'
    Uses segment-length heuristic: short segments (<= 30 chars) = journal abbreviation parts.
    """
    text = after_authors.strip()

    # Find year
    year_match = re.search(r'[,\s]\(?((?:19|20)\d{2})\)?[,.\s]', text)
    if not year_match:
        # No year - try first ". " split
        dot = text.find('. ')
        return text[:dot].strip() if dot > -1 else text.strip()

    # Text before the year
    before_year = text[:year_match.start()].strip().rstrip(',')

    # Split by ". " into segments
    parts = re.split(r'\. ', before_year)

    # Walk backward: short parts (< 30 chars, no colon) are journal abbreviation fragments
    journal_parts = []
    title_parts = []
    found_title = False

    for part in reversed(parts):
        clean = part.strip().rstrip('.,')
        if found_title:
            title_parts.insert(0, part)
        elif len(clean) > 30 or ':' in clean or '–' in clean or '—' in clean:
            # Long or has colon/dash — this is the title (or part of it)
            title_parts.insert(0, part)
            found_title = True
        else:
            journal_parts.insert(0, part)

    if not title_parts:
        # Fallback: everything is the title
        return before_year.strip()

    title = '. '.join(title_parts).strip().rstrip('.,')
    return title


def extract_parts(citation):
    citation = citation.strip()

    # Find where Balaraman's authorship ends
    balaraman_match = re.search(r'Balaraman[^.]*?\.\s+', citation)
    if not balaraman_match:
        return {'authors': '', 'title': '', 'journal': ''}

    authors = citation[:balaraman_match.end()].strip().rstrip('.')
    after_authors = citation[balaraman_match.end():]

    title = extract_title_from_after_authors(after_authors)

    return {'authors': authors, 'title': title}


def parse_raw_pubs(filename):
    with open(filename, 'r', encoding='utf-8', errors='replace') as f:
        content = f.read()

    # Split into blocks by the pub number pattern at start of line
    blocks = re.split(r'\n(?=\d{1,3}\.\s)', content)

    publications = []
    for block in blocks:
        block = block.strip()
        if not block:
            continue

        # Extract pub number
        num_match = re.match(r'^(\d{1,3})\.\s+', block)
        if not num_match:
            continue
        pub_id = int(num_match.group(1))

        lines = block.split('\n')

        # First line is the citation text
        citation_line = lines[0].strip()
        citation_text = re.sub(r'^\d{1,3}\.\s+', '', citation_line).strip()

        # Extract DOI from subsequent lines
        doi = ''
        for line in lines[1:]:
            line = line.strip()
            doi_match = re.search(r'(?:https?://doi\.org/|DOI:\s*|doi:\s*)(10\.\d{4,}/\S+)', line, re.IGNORECASE)
            if doi_match:
                doi = doi_match.group(1).rstrip('.,;) ')
                break
            bare_doi = re.search(r'\b(10\.\d{4,}/\S+)', line)
            if bare_doi:
                doi = bare_doi.group(1).rstrip('.,;) ')
                break

        # Extract year
        year = extract_year(citation_text)

        # Extract parts
        parts = extract_parts(citation_text)

        publications.append({
            'id': pub_id,
            'authors': parts['authors'],
            'title': parts['title'],
            'journal': '',
            'year': year,
            'details': '',
            'doi': doi,
            'fullText': citation_text
        })

    publications.sort(key=lambda x: x['id'], reverse=True)
    return publications


def generate_ts(publications, existing_header=''):
    lines = []
    if existing_header:
        lines.append(existing_header)
    lines.append('export const publications = [')
    for pub in publications:
        def esc(s):
            return (s or '').replace('\\', '\\\\').replace('"', '\\"').replace('\r', '').replace('\n', ' ')

        lines.append('  {')
        lines.append(f'    "id": {pub["id"]},')
        lines.append(f'    "authors": "{esc(pub["authors"])}",')
        lines.append(f'    "title": "{esc(pub["title"])}",')
        lines.append(f'    "journal": "{esc(pub["journal"])}",')
        lines.append(f'    "year": "{esc(pub["year"])}",')
        lines.append(f'    "details": "{esc(pub["details"])}",')
        lines.append(f'    "doi": "{esc(pub["doi"])}",')
        lines.append(f'    "fullText": "{esc(pub["fullText"])}"')
        lines.append('  },')
    lines.append('];')
    return '\n'.join(lines)


if __name__ == '__main__':
    pubs = parse_raw_pubs('raw_pubs.txt')

    # Verify titles
    print("=== TITLE VERIFICATION ===")
    for p in pubs[:10]:
        print(f"ID {p['id']} ({p['year']}):")
        try:
            print(f"  Title: {p['title'][:90]}")
        except UnicodeEncodeError:
            print(f"  Title: {p['title'][:90].encode('ascii', errors='replace').decode()}")
        print(f"  DOI:   {p['doi']}")
        print()

    # Read existing data.ts to preserve news, patents, piBio etc
    with open('app/data.ts', 'r', encoding='utf-8', errors='replace') as f:
        existing = f.read()

    # Find where publications array starts
    pub_start = existing.find('export const publications')
    header = existing[:pub_start].rstrip()

    # Find what comes after publications array
    pub_end_match = re.search(r'\nexport const (?!publications)', existing[pub_start:])
    if pub_end_match:
        footer = '\n' + existing[pub_start + pub_end_match.start():].lstrip()
    else:
        footer = ''

    ts_content = header + '\n\n' + generate_ts(pubs) + footer

    with open('app/data.ts', 'w', encoding='utf-8') as f:
        f.write(ts_content)

    print(f"✅ Updated app/data.ts with {len(pubs)} publications (titles + correct years)")
