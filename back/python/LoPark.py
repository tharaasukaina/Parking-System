import cv2
import pickle
import cvzone
import numpy as np

# The Video
cap = cv2.VideoCapture('C:\\Users\\ama\\Desktop\\done\\Graduation-Project\\back\\python\\video\\vid22.mp4')

with open('CarParkPoss', 'rb') as f:  # rb is read binary
    posList = pickle.load(f)

width, height = 110, 30

def checkParkingSpace(img, imgProc):
    counterSpace = 0

    for pos in posList:
        x, y = pos
        imgCrop = imgProc[y:y+height, x:x+width]
        countOfPix = cv2.countNonZero(imgCrop)
        cvzone.putTextRect(img, str(countOfPix), (x, y + height - 2),
                           colorR=(0, 0, 0), scale=0.7, thickness=1, offset=0) 
        
        if countOfPix < 1200:
            color = (0, 255, 0)  # Green
            thickness = 2
            counterSpace += 1
        else:
            color = (0, 0, 255)  # Red
            thickness = 1 
        cv2.rectangle(img, pos, (pos[0] + width, pos[1] + height), color, thickness)

    cvzone.putTextRect(img, f'Free Spaces : {counterSpace} from {len(posList)}', (40, 80),
                       colorR=(0, 79, 0), scale=3, thickness=2, offset=12)

while True:
    if cap.get(cv2.CAP_PROP_POS_FRAMES) == cap.get(cv2.CAP_PROP_FRAME_COUNT):
        cap.set(cv2.CAP_PROP_POS_FRAMES, 0)

    success, img = cap.read()
    if not success:
        break

    # تغيير حجم الفيديو إلى 800×500 بيكسل أولاً
    img_resized = cv2.resize(img, (800, 500))

    imgGray = cv2.cvtColor(img_resized, cv2.COLOR_BGR2GRAY)
    imgBlur = cv2.GaussianBlur(imgGray, (1, 1), 1)
    imgThreshold = cv2.adaptiveThreshold(imgBlur, 255,
                                         cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY_INV, 25, 16)
    imgMedian = cv2.medianBlur(imgThreshold, 3)
    kernel = np.ones((3, 3), np.uint8)
    imgDilation = cv2.dilate(imgMedian, kernel, iterations=1)

    checkParkingSpace(img_resized, imgDilation)

    cv2.imshow('video', img_resized)
    if cv2.waitKey(3) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
