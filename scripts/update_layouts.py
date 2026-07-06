import os
import glob

app_dir = r"c:\Website\Balaraman-Group\app"
layout_files = glob.glob(os.path.join(app_dir, "*", "layout.tsx"))

for layout_file in layout_files:
    dir_name = os.path.basename(os.path.dirname(layout_file))
    with open(layout_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # check if canonical is already there
    if "alternates:" not in content:
        # find the end of openGraph or description
        if "openGraph: {" in content:
            # insert before openGraph
            content = content.replace("openGraph: {", f"alternates: {{\n    canonical: 'https://www.ebalaraman.com/{dir_name}',\n  }},\n  openGraph: {{")
        elif "description:" in content:
            # find first description and insert after
            idx = content.find("',", content.find("description:")) + 2
            content = content[:idx] + f"\n  alternates: {{\n    canonical: 'https://www.ebalaraman.com/{dir_name}',\n  }}," + content[idx:]
        else:
            # append before };
            idx = content.rfind("};")
            content = content[:idx] + f",\n  alternates: {{\n    canonical: 'https://www.ebalaraman.com/{dir_name}',\n  }}\n" + content[idx:]
            
        with open(layout_file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {layout_file}")
