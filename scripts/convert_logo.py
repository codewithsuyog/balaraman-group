import fitz
import os
from PIL import Image

pdf_path = r"c:\Website\Balaraman-Group\public\lab logo.pdf"
doc = fitz.open(pdf_path)
page = doc.load_page(0)
# Use a high resolution matrix
pix = page.get_pixmap(matrix=fitz.Matrix(4, 4))
img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
# if we want transparency, we should convert to RGBA, but the PDF might not have transparent background.
# let's try with RGBA
if pix.alpha:
    img = Image.frombytes("RGBA", [pix.width, pix.height], pix.samples)
else:
    # try to make white transparent
    img = img.convert("RGBA")
    datas = img.getdata()
    newData = []
    for item in datas:
        if item[0] > 240 and item[1] > 240 and item[2] > 240:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)
    img.putdata(newData)

# crop the image to remove extra whitespace if any
bbox = img.getbbox()
if bbox:
    img = img.crop(bbox)

# Create WebP
img.save(r"c:\Website\Balaraman-Group\public\logo.webp", "WEBP", quality=90)
# Create icon sizes
img.resize((192, 192)).save(r"c:\Website\Balaraman-Group\public\icon-192.png", "PNG")
img.resize((512, 512)).save(r"c:\Website\Balaraman-Group\public\icon-512.png", "PNG")
img.resize((180, 180)).save(r"c:\Website\Balaraman-Group\public\apple-touch-icon.png", "PNG")
img.resize((32, 32)).save(r"c:\Website\Balaraman-Group\public\favicon.ico", "ICO")
img.resize((32, 32)).save(r"c:\Website\Balaraman-Group\app\icon.png", "PNG")

print("Generated logo.webp and icons.")
