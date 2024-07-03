import "../style/Home.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../../node_modules/@fortawesome/fontawesome-free/css/all.min.css';
import about_boxes_2 from "../image/about-boxes-2.jpg";
import about_boxes_3 from "../image/about-boxes-3.jpg";
import about_boxes_1 from "../image/about-boxes-1.jpg";
import { Chart, registerables } from 'chart.js';
import { useRef, useEffect, useState } from 'react';
import axios from 'axios';

Chart.register(...registerables);
const Home = () => {
  const barChartRef = useRef(null);
  const doughnutChartRef = useRef(null);
  const barChartInstance = useRef(null);
  const doughnutChartInstance = useRef(null);
  const [freeSpots, setFreeSpots] = useState(0);
  const [reservedSpots, setReservedSpots] = useState(0);

  useEffect(() => {
    if (barChartRef.current) {
      if (barChartInstance.current) {
        barChartInstance.current.destroy();
      }
      const ctxBar = barChartRef.current.getContext('2d');
      barChartInstance.current = new Chart(ctxBar, {
        type: 'bar',
        data: {
          labels: ['Free spots', 'Reserved spots'],
          datasets: [{
            label: 'Parking Status',
            data: [freeSpots, reservedSpots],
            borderWidth: 1,
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)',
              'rgba(255, 99, 132, 1)'
            ],
          }]
        },
        options: {
          plugins: {
            legend: {
              display: true,
              labels: {
                color: 'white'
              }
            }
          }
        }
      });
    }

    if (doughnutChartRef.current) {
      if (doughnutChartInstance.current) {
        doughnutChartInstance.current.destroy();
      }
      const ctxDoughnut = doughnutChartRef.current.getContext('2d');
      doughnutChartInstance.current = new Chart(ctxDoughnut, {
        type: 'doughnut',
        data: {
          labels: ['Free spots', 'Reserved spots'],
          datasets: [{
            label: 'Parking Status',
            data: [freeSpots, reservedSpots],
            borderWidth: 1,
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)',
              'rgba(255, 99, 132, 1)'
            ],
          }]
        },
        options: {
          plugins: {
            legend: {
              display: true,
              labels: {
                color: 'white'
              }
            }
          }
        }
      });
    }

    const intervalId = setInterval(async () => {
      try {
        const response = await axios.get('http://localhost:5001/stats');
        const { free_spots, reserved_spots } = response.data;
        setFreeSpots(free_spots);
        setReservedSpots(reserved_spots);

        // تحديث البيانات في الرسوم البيانية
        if (barChartInstance.current) {
          barChartInstance.current.data.datasets[0].data = [free_spots, reserved_spots];
          barChartInstance.current.update();
        }

        if (doughnutChartInstance.current) {
          doughnutChartInstance.current.data.datasets[0].data = [free_spots, reserved_spots];
          doughnutChartInstance.current.update();
        }
      } catch (error) {
        console.error("There was an error fetching the stats!", error);
      }
    }, 5000); // تحديث البيانات كل 5 ثواني

    return () => clearInterval(intervalId); // تنظيف المؤقت عند إزالة التثبيت

  }, [freeSpots, reservedSpots]);
  return (
    <div>
      <section>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <div className="header-content">
                <div className="overlay">
                  <div className="header-content-item">
                  <h1>Find Spaces in NO Time</h1>
                    <p className="paragraphone">
                      Here is the best place to ensure that you do not waste your time searching for an empty space in the university's parking garage
                    </p>
                    <img
                      src="http://127.0.0.1:5001/video_feed"
                      alt="Live Feed"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
          {/* الاحصائيات chart */}
          <div className=' final curved-shape d-flex justify-content-center align-items-center '>
        <section className='statistics '>
          <div className='container'>
            <div className='content'>
              <div className='text'>
                <p className='chartHeading'>These are the parking statistics at this time:</p>
                <p className='chartText'>On our website, we allow you to know the statistics about parking to make it easier for you and to ensure that you do not waste your time</p>
              </div>
              <div className='chart'>
                <canvas ref={doughnutChartRef}></canvas>
              </div>
            </div>
          </div>
        </section>
      </div>
          {/* محتويات السيرفسيز */}
          <div className="about-boxes">
        <div className="container my-4">
          <div className="row">
            <div className="col-md-4 my-4 col-lg-4 d-flex align-items-stretch">
              <div className="card">
                <img src={about_boxes_1} className="card-img-top" alt="..." />
                <div className="card-icon">
                  <i className="fa-solid fa-calendar"></i>
                </div>
                <h5 className="card-title">Our Mission</h5>
                <span className="card-text">is to enhance urban parking by delivering an innovative, reliable, and sustainable Smart Parking System that improves convenience, reduces congestion, and minimizes environmental impact.</span>
              </div>
            </div>
            <div className="col-md-4 my-4 col-lg-4 d-flex align-items-stretch">
              <div className="card">
                <img src={about_boxes_2} className="card-img-top" alt="..." />
                <div className="card-icon">
                  <i className="fa-solid fa-calendar"></i>
                </div>
                <h5 className="card-title">Our Plan</h5>
                <span className="card-text">is to create a comprehensive Smart Parking System using image processing, real-time data analytics, to optimize parking space utilization and reduce search time.</span>
              </div>
            </div>
            <div className="col-md-4 my-4 col-lg-4 d-flex align-items-stretch">
              <div className="card">
                <img src={about_boxes_3} className="card-img-top" alt="..." />
                <div className="card-icon">
                  <i className="fa-solid fa-film"></i>
                </div>
                <h5 className="card-title">Our Vision</h5>
                <span className="card-text ms-0"> is to revolutionize urban mobility with an innovative, efficient, and user-friendly Smart Parking System that enhances convenience and supports sustainable university development.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

