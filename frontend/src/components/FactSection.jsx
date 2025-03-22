import React from 'react';
import { FaChartLine, FaHeartbeat, FaUsers } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import Chart from  'chart.js/auto';

const FactSection = () => {
    const data = {
        labels: ['2010', '2015', '2020', '2023'],
        datasets: [
            {
                label: 'Diabetes Cases in India (in millions)',
                data: [70, 85, 95, 101],
                backgroundColor: '#25BF76',
                borderColor: '#25BF76',
                borderWidth: 3,
                tension: 0.3,
                fill: true
            }
        ]
    };

    const deathData = {
        labels: ['2000', '2010', '2020', '2023'],
        datasets: [
            {
                label: 'Diabetes-Related Deaths in India (per year)',
                data: [1.2, 1.8, 2.5, 3.0],
                backgroundColor: '#FF6B6B',
                borderColor: '#FF6B6B',
                borderWidth: 3,
                tension: 0.3,
                fill: true
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
            y: { beginAtZero: true },
            x: { grid: { display: false } }
        }
    };

    return (
        <section className=" py-16  text-gray-700">
            <div className=" px-10 md:px-30 mx-auto text-center">
                <motion.h2 
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl font-bold text-white bg-[#25BF76] py-3 rounded-lg mb-6"
                >
                    Empowering the Diabetic Community
                </motion.h2>

                <p className="text-lg mb-12">
                    Diabetes is one of the most pressing global health concerns, requiring effective management for a healthier lifestyle.
                </p>

                {/* Chart & Visual Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    <div className="bg-[#F0FDF4] p-8 rounded-2xl shadow-lg">
                        <h3 className="text-2xl font-bold text-[#25BF76] mb-4">Rising Cases in India</h3>
                        <Line data={data} options={options} />
                        <p className="mt-4">Over 101 million Indians suffer from diabetes, and the number is steadily rising.</p>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="bg-[#E6FAF0] p-6 rounded-2xl shadow-md text-left">
                            <FaHeartbeat className="text-3xl text-[#25BF76] mb-2" />
                            <h3 className="text-xl font-bold mb-2">Health Risks</h3>
                            <p>Uncontrolled diabetes increases the risk of heart disease, stroke, kidney failure, and vision loss.</p>
                        </div>

                        <div className="bg-[#F0FDF4] p-6 rounded-2xl shadow-md text-left">
                            <FaUsers className="text-3xl text-[#25BF76] mb-2" />
                            <h3 className="text-xl font-bold mb-2">Lack of Awareness</h3>
                            <p>Only 15% of diabetic patients in India monitor their blood glucose regularly, increasing health risks.</p>
                        </div>
                    </div>
                </div>

                {/* Additional Chart Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mt-12">
                <div className="flex flex-col gap-6">
                        <div className="bg-[#E6FAF0] p-6 rounded-2xl shadow-md text-left">
                            <FaHeartbeat className="text-3xl text-[#25BF76] mb-2" />
                            <h3 className="text-xl font-bold mb-2">Diabetes Capital of the World.</h3>
                            <p>India accounts for nearly 17% of global diabetes cases, earning it the title of the "Diabetes Capital of the World."
                            </p>
                        </div>

                        <div className="bg-[#F0FDF4] p-6 rounded-2xl shadow-md text-left">
                            <FaUsers className="text-3xl text-[#25BF76] mb-2" />
                            <h3 className="text-xl font-bold mb-2">Rising Cases</h3>
                            <p>The number of diabetic patients has been steadily rising, making India one of the top 3 countries with the highest diabetes burden,</p>
                        </div>
                    </div>

                    <div className="bg-[#FFF3F3] p-8 rounded-2xl shadow-lg">
                        <h3 className="text-2xl font-bold text-[#FF6B6B] mb-4">Rising Diabetes-Related Deaths</h3>
                        <Line data={deathData} options={options} />
                        <p className="mt-4">Diabetes-related deaths in India are steadily increasing, posing a serious health risk.</p>
                    </div>
                </div>

                {/* Video Placeholder Section */}
                <div className="mt-12 w-full">
                    <h3 className=" text-2xl font-bold text-[#25BF76] mb-8">Why Diabetes Management Matters</h3>
                    <div className=" bg-gray-300  shadow-2xl w-full h-[400px] flex items-center justify-center rounded-lg">
                        <video src="./video1.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover"/>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FactSection;