import os
from PIL import Image

assets_dir = r"c:\Users\manas\OneDrive\Documents\Portfoliio site\public\assets"

def convert_to_webp(directory):
    for filename in os.listdir(directory):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            filepath = os.path.join(directory, filename)
            webp_path = os.path.join(directory, filename.rsplit('.', 1)[0] + '.webp')
            
            try:
                with Image.open(filepath) as img:
                    img.save(webp_path, 'webp', quality=85)
                print(f"Converted {filename} to {os.path.basename(webp_path)}")
                # os.remove(filepath) # Keep originals just in case, or delete them? Let's delete to save space
                os.remove(filepath)
            except Exception as e:
                print(f"Error converting {filename}: {e}")

if __name__ == "__main__":
    
    print("Converting images to WebP...")
    try:
        convert_to_webp(assets_dir)
        print("Image conversion complete.")
    except Exception as e:
        print("Pillow not installed or other error:", e)
        
    print("Optimization script finished.")
