from flask import Flask, Response, jsonify
from flask_cors import CORS
import cv2
import pickle
import cvzone
import numpy as np

app = Flask(__name__)
CORS(app)  # Initialize CORS

cap = cv2.VideoCapture('C:\\Users\\ama\\Desktop\\done\\Graduation-Project\\back\\python\\video\\vid22.mp4')

with open('C:\\Users\\ama\\Desktop\\done\\Graduation-Project\\back\\python\\CarParkPoss', 'rb') as f:
    posList = pickle.load(f)

width, height = 110, 30
free_spots = 0
reserved_spots = 0

def checkParkingSpace(imgProc, img):
    global free_spots, reserved_spots
    counterSpace = 0
    reservedSpace = 0

    for pos in posList:
        x, y = pos
        imgCrop = imgProc[y:y + height, x:x + width]
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
            reservedSpace += 1
        cv2.rectangle(img, pos, (pos[0] + width, pos[1] + height), color, thickness)

    free_spots = counterSpace
    reserved_spots = reservedSpace

    cvzone.putTextRect(img, f'Free Spaces : {counterSpace} from {len(posList)}', (40, 80),
                       colorR=(0, 79, 0), scale=3, thickness=2, offset=12)

def generate_frames():
    while True:
        success, img = cap.read()
        if not success:
            break

        img_resized = cv2.resize(img, (800, 500))

        imgGray = cv2.cvtColor(img_resized, cv2.COLOR_BGR2GRAY)
        imgBlur = cv2.GaussianBlur(imgGray, (1, 1), 1)
        imgThreshold = cv2.adaptiveThreshold(imgBlur, 255,
                                             cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY_INV, 25, 16)
        imgMedian = cv2.medianBlur(imgThreshold, 3)
        kernel = np.ones((3, 3), np.uint8)
        imgDilation = cv2.dilate(imgMedian, kernel, iterations=1)

        checkParkingSpace(imgDilation, img_resized)

        ret, buffer = cv2.imencode('.jpg', img_resized)
        frame = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/')
def index():
    return "Video feed is available at /video_feed"

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/stats')
def get_stats():
    return jsonify({'free_spots': free_spots, 'reserved_spots': reserved_spots})

if __name__ == '__main__':
    app.run(debug=True, port=5001)

