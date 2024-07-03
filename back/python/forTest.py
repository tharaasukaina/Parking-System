import cv2
import pickle
import cvzone
import numpy as np
import unittest

# The Video
cap = cv2.VideoCapture('C:\\Users\\ama\\Desktop\\done\\Graduation-Project\\back\\python\\video\\vid22.mp4')

with open('CarParkPoss', 'rb') as f:  # rb is read binary
    posList = pickle.load(f)

width, height = 110, 30

def checkParkingSpace(imgProc):
    counterSpace = 0

    for pos in posList:
        x, y = pos
        imgCrop = imgProc[y:y+height, x:x+width]
        countOfPix = cv2.countNonZero(imgCrop)
        
        if countOfPix < 1200:
            counterSpace += 1

    return counterSpace

class TestParkingSpace(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.cap = cv2.VideoCapture('C:\\Users\\ama\\Desktop\\done\\Graduation-Project\\back\\python\\video\\vid22.mp4')

        with open('CarParkPoss', 'rb') as f:
            cls.posList = pickle.load(f)
        cls.width, cls.height = 110, 30
        cls.expected_free_spots = [10, 11]  # مثال على القيم المتوقعة (عدل حسب بياناتك)

    def test_check_parking_space(self):
        correct_predictions = 0
        total_predictions = len(self.expected_free_spots)

        for expected_free_spots in self.expected_free_spots:
            success, img = self.cap.read()
            if not success:
                self.fail("Failed to read video frame")

            img_resized = cv2.resize(img, (800, 500))
            imgGray = cv2.cvtColor(img_resized, cv2.COLOR_BGR2GRAY)
            imgBlur = cv2.GaussianBlur(imgGray, (1, 1), 1)
            imgThreshold = cv2.adaptiveThreshold(imgBlur, 255,
                                                 cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY_INV, 25, 16)
            imgMedian = cv2.medianBlur(imgThreshold, 3)
            kernel = np.ones((3, 3), np.uint8)
            imgDilation = cv2.dilate(imgMedian, kernel, iterations=1)

            free_spots = checkParkingSpace(imgDilation)

            print(f"Expected: {expected_free_spots}, Actual: {free_spots}")

            if free_spots == expected_free_spots:
                correct_predictions += 1

        accuracy = (correct_predictions / total_predictions) * 100
        print(f"Accuracy: {accuracy}%")
        self.assertGreaterEqual(accuracy, 80, "Accuracy is lower than expected")

    @classmethod
    def tearDownClass(cls):
        cls.cap.release()

if __name__ == '__main__':
    unittest.main()
