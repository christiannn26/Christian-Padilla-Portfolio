import os
from PIL import Image
from pillow_heif import register_heif_opener

register_heif_opener()

src_dir = r"c:\WebsitePortfolio_Christian\img\ibex"
dst_dir = r"c:\WebsitePortfolio_Christian\portfolio-app\public\img\ibex"

os.makedirs(dst_dir, exist_ok=True)

for filename in os.listdir(src_dir):
    if filename.lower().endswith('.heic'):
        src_path = os.path.join(src_dir, filename)
        dst_filename = os.path.splitext(filename)[0] + ".jpg"
        dst_path = os.path.join(dst_dir, dst_filename)
        
        print(f"Converting {filename} -> {dst_filename}")
        img = Image.open(src_path)
        img.save(dst_path, format="JPEG", quality=90)
        
print("Done!")
