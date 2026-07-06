import os
import glob
import re

app_dir = r"c:\Website\Balaraman-Group\app"
files = glob.glob(os.path.join(app_dir, "**", "*.tsx"), recursive=True)

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    modified = False
    
    # regex to find <img ...> and ensure loading="lazy" is present
    def replace_img(match):
        tag = match.group(0)
        # check if it already has loading
        if 'loading=' not in tag:
            tag = tag.replace('<img ', '<img loading="lazy" decoding="async" ')
        elif 'loading="lazy"' in tag and 'decoding=' not in tag:
            tag = tag.replace('loading="lazy"', 'loading="lazy" decoding="async"')
        return tag
        
    new_content = re.sub(r'<img [^>]+>', replace_img, content)
    
    if new_content != content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated images in {file}")
