import fitz
import os
from PIL import Image

pdf_path = r"public/Sustainable Chemistry via Catalysis logo.pdf"
doc = fitz.open(pdf_path)
page = doc[0]

# Use a 4x matrix for ultra sharp high resolution (4408x5360)
pix = page.get_pixmap(matrix=fitz.Matrix(4, 4), alpha=True)
img = Image.frombytes("RGBA", [pix.width, pix.height], pix.samples)

# Crop tight to content
bbox = img.getbbox()
if bbox:
    img = img.crop(bbox)

print("Cropped size:", img.size)

# Create high-res WebP logo
img.save(r"public/logo.webp", "WEBP", quality=95, lossless=False)
print("Saved public/logo.webp")

# Helper to create centered square icon with padding
def make_square_icon(image, size, padding_ratio=0.08):
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    avail_size = int(size * (1 - 2 * padding_ratio))
    w, h = image.size
    scale = min(avail_size / w, avail_size / h)
    new_w = int(w * scale)
    new_h = int(h * scale)
    resized = image.resize((new_w, new_h), Image.Resampling.LANCZOS)
    offset_x = (size - new_w) // 2
    offset_y = (size - new_h) // 2
    canvas.paste(resized, (offset_x, offset_y), resized)
    return canvas

# Create icon sizes
icon512 = make_square_icon(img, 512)
icon512.save(r"public/icon-512.png", "PNG")
icon512.save(r"public/icon-512.webp", "WEBP", quality=95)

icon192 = make_square_icon(img, 192)
icon192.save(r"public/icon-192.png", "PNG")
icon192.save(r"public/icon-192.webp", "WEBP", quality=95)

icon180 = make_square_icon(img, 180)
icon180.save(r"public/apple-touch-icon.png", "PNG")
icon180.save(r"public/apple-touch-icon.webp", "WEBP", quality=95)

icon32 = make_square_icon(img, 32, padding_ratio=0.04)
icon32.save(r"public/favicon.ico", format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])

icon512.save(r"app/icon.png", "PNG")

print("Generated high-res logo.webp and all square icons.")
