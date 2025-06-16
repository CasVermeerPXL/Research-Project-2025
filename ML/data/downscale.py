import cv2
import os

input_dir = "drone_images/"
output_dir = "drone_images_downscaled/"
os.makedirs(output_dir, exist_ok=True)

target_size = (1024, 1024)  # Desired resolution

for filename in os.listdir(input_dir):
    if filename.endswith(".JPG"):
        # Load image
        img = cv2.imread(os.path.join(input_dir, filename))
        # Resize
        img_resized = cv2.resize(img, target_size, interpolation=cv2.INTER_AREA)
        # Save
        cv2.imwrite(os.path.join(output_dir, filename), img_resized)
