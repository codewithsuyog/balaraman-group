import re
import json

with open('app/data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# We need to find the publications array in data.ts and fix empty journals
# fullText has the format: "... . Journal Name, Year, Vol, Pages."
def fix_journal(match):
    full_match = match.group(0)
    journal_match = re.search(r'\"journal\":\s*\"\"', full_match)
    if not journal_match:
        return full_match
        
    fullText_match = re.search(r'\"fullText\":\s*\"(.*?)\"', full_match)
    if fullText_match:
        fullText = fullText_match.group(1)
        # Try to extract journal from fullText
        # Usually it's after the title, e.g. "Title. Journal, 2025,"
        # Look for a string before the year
        year_match = re.search(r'\.\s*([^,.]+),\s*20\d\d', fullText)
        if year_match:
            journal_name = year_match.group(1).strip()
            return full_match.replace('\"journal\": \"\"', f'\"journal\": \"{journal_name}\"')
    return full_match

# Find each object in the publications array
# This is a bit hacky but we can just use a regex for the objects
new_content = re.sub(r'\{\s*\"id\":\s*\d+,[\s\S]*?\}', fix_journal, content)

with open('app/data.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Fixed journals in data.ts")
