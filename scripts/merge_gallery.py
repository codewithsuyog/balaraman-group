import os
import shutil

gallery_dir = r"c:\Website\Balaraman-Group\public\images\gallery"
lab_memories_dir = r"c:\Website\Balaraman-Group\public\images\lab-memories"

if os.path.exists(lab_memories_dir):
    for filename in os.listdir(lab_memories_dir):
        src = os.path.join(lab_memories_dir, filename)
        dst = os.path.join(gallery_dir, filename)
        if not os.path.exists(dst):
            shutil.copy2(src, dst)
            print(f"Copied {filename} to gallery")
        else:
            print(f"Skipped {filename} (already in gallery)")
            
    # shutil.rmtree(lab_memories_dir)
    print("Merge complete")
