import re
with open('app/publications_master.ts', encoding='utf-8') as f:
    content = f.read()

years = {}
for m in re.finditer(r'id: (\d+),\s*\n\s*title: "[^"]*",\s*\n\s*authors: "[^"]*",\s*\n\s*journal: "[^"]*",\s*\n\s*year: "([^"]*)"', content):
    pid, year = int(m.group(1)), m.group(2)
    if year not in years:
        years[year] = []
    years[year].append(pid)

for year in sorted(years.keys(), reverse=True):
    ids = sorted(years[year], reverse=True)
    print(f"  {year}: IDs {ids}")
