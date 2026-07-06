import os
import glob

app_dir = r"c:\Website\Balaraman-Group\app"
files_to_check = glob.glob(os.path.join(app_dir, "**", "*.tsx"), recursive=True)

for file in files_to_check:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if "/logo.png" in content:
        content = content.replace("/logo.png", "/logo.webp")
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {file}")
