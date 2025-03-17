import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const tips = [
  "Start your day with a fiber-rich breakfast.",
  "Hydrate well to maintain stable blood sugar levels.",
  "Take a 10-minute walk after meals to improve glucose regulation.",
  "Include leafy greens like spinach and kale in your diet.",
  "Avoid sugary drinks — opt for herbal teas instead.",
];

const SwiperText = () => {
  return (
    <div className="bg-[#25BF76] rounded-xl shadow-md  mx-auto my-10 mt-15 ">

    <Swiper
      modules={[Pagination, Autoplay]}
      spaceBetween={40}
      slidesPerView={1}
      autoplay={{ delay: 3000 }}
      pagination={{ clickable: true }}
      className="rounded-lg"
    >
      {tips.map((tip, index) => (
        <SwiperSlide key={index}>
          <div className="bg-white p-5 w-full rounded-lg shadow-sm text-center">
            <p className="text-lg text-gray-700">{tip}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>

  </div>
  )
}

export default SwiperText
