import json
import os
import cv2
import numpy as np

# Define directories
image_dir = "./drone_images_downscaled/"  # Where your .jpg files are
json_dir = "./masked_images/"  # Where your .json files are
mask_dir = "./masks/"  # Where .png masks will be saved
os.makedirs(mask_dir, exist_ok=True)

# Class mapping (updated for your labels)
class_map = {
    "Background": 0,  # Unlabeled areas
    "Hyacinth": 1,  # Water hyacinth
    "Water": 2,  # Water
}

# Process each JSON file
for json_file in os.listdir(json_dir):
    if json_file.endswith(".json"):
        # Load JSON
        json_path = os.path.join(json_dir, json_file)
        with open(json_path, "r") as f:
            data = json.load(f)

        # Extract image filename from imagePath and normalize path
        image_filename = os.path.basename(data["imagePath"]).replace("\\", "/")
        image_path = os.path.join(image_dir, image_filename)
        print(f"Looking for image: {image_path}")

        # Load image to get dimensions
        if not os.path.exists(image_path):
            print(f"Error: Image not found at {image_path}, skipping {json_file}")
            continue
        image = cv2.imread(image_path)
        if image is None:
            print(f"Error: Failed to load image {image_path}, skipping {json_file}")
            continue
        height, width = image.shape[:2]
        print(f"Image size: {width}x{height}")

        # Create empty mask
        mask = np.zeros((height, width), dtype=np.uint8)

        # Fill mask with class IDs
        for shape in data["shapes"]:
            label = shape["label"]
            print(f"Processing shape with label: {label}")
            if label in class_map:
                points = np.array(shape["points"], dtype=np.int32)  # Convert to int32
                print(f"Points: {points}")
                cv2.fillPoly(mask, [points], class_map[label])
            else:
                print(f"Warning: Unknown label '{label}' in {json_file}, skipping")

        # Check mask contents
        unique_values = np.unique(mask)
        print(f"Mask unique values: {unique_values}")
        if len(unique_values) == 1 and unique_values[0] == 0:
            print(f"Warning: Mask for {json_file} is all zeros (black)")

        # Save mask
        mask_filename = json_file.replace(".json", "_mask.png")
        mask_path = os.path.join(mask_dir, mask_filename)
        cv2.imwrite(mask_path, mask)
        print(f"Saved mask: {mask_path}")

print("Mask generation complete!")
