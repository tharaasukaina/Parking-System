import cv2
import pickle
import os

# Update the image path to include the file name and extension
img_path = 'C:\\Users\\ama\\Desktop\\done\\Graduation-Project\\back\\python\\Photos\\img22.PNG'  # Replace 'your_image.jpg' with your actual image file name

# Print the image path to verify it
print(f"Image path: {img_path}")

# Check if the file exists and print its status
if not os.path.exists(img_path):
    print(f"File does not exist: {img_path}")
else:
    print(f"File exists: {img_path}")

width, height = 110, 30

# Use absolute path for the positions file
positions_file = 'C:\\Users\\ama\\Desktop\\done\\Graduation-Project\\back\\python\\CarParkPoss'

try:
    with open(positions_file, 'rb') as f:  # rb is read binary
        posList = pickle.load(f)
        print(f"Loaded positions: {posList}")
except FileNotFoundError:
    posList = []  # all spaces
    print(f"{positions_file} not found. Starting with an empty list.")

def mouseClick(events, x, y, flags, params):
    if events == cv2.EVENT_LBUTTONDOWN:  # create pos
        posList.append((x, y))
        print(f"Position added: {x, y}")

    if events == cv2.EVENT_RBUTTONDOWN:
        for i, pos in enumerate(posList):
            x1, y1 = pos
            if x1 < x < x1 + width and y1 < y < y1 + height:
                posList.pop(i)
                print(f"Position removed: {x, y}")

    # Ensure the positions are saved correctly
    try:
        with open(positions_file, 'wb') as f:  # wb is write binary
            pickle.dump(posList, f)
            print(f"Saved positions to {positions_file}: {posList}")
    except Exception as e:
        print(f"Error saving positions: {e}")

while True:
    img = cv2.imread(img_path)

    if img is None:
        print(f"Error: Unable to load image at {img_path}")
        break

    for pos in posList:
        cv2.rectangle(img, pos, (pos[0] + width, pos[1] + height), (255, 0, 255), 1)  # img, start, end, color, thickness

    cv2.imshow("image", img)
    cv2.setMouseCallback("image", mouseClick)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cv2.destroyAllWindows()
