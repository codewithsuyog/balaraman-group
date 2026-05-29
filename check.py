import re
with open('app/publications_master.ts', 'r', encoding='utf-8') as f:
    content = f.read()

pubs = re.split(r'\{\s*id:', content)[1:]
no_title = 0
no_authors = 0
for p in pubs:
    if not re.search(r'title:\s*\"[^\"]+\"', p) and not re.search(r'title:\s*`[^`]+`', p):
        no_title += 1
    if not re.search(r'authors:\s*\"[^\"]+\"', p) and not re.search(r'authors:\s*`[^`]+`', p):
        no_authors += 1

print('Missing titles:', no_title)
print('Missing authors:', no_authors)
