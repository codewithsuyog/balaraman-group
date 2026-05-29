import re
with open('app/publications_master.ts', 'r', encoding='utf-8') as f:
    content = f.read()

pubs = re.split(r'\{\s*id:', content)[1:]
for p in pubs:
    if not re.search(r'title:\s*\"[^\"]+\"', p) and not re.search(r'title:\s*`[^`]+`', p):
        print('Missing title at pub id:', re.search(r'^(\d+)', p.strip()).group(1))
    if not re.search(r'authors:\s*\"[^\"]+\"', p) and not re.search(r'authors:\s*`[^`]+`', p):
        print('Missing authors at pub id:', re.search(r'^(\d+)', p.strip()).group(1))
