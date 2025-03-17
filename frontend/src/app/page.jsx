"use client";

import React from 'react';
import Hero from '@/components/Hero';
import Banner from '@/components/Banner';
import SwiperText from '@/components/SwiperText';
import ProductList from '@/components/ProductList';

const Home = () => {
  return (
  // hero start
  <div className=" mx-auto  px-4 md:px-8 pb-6 sm:pb-8 lg:pb-12 mt-10 ">

<Hero/>
<Banner/>
<ProductList/>
<SwiperText/>

    
  </div>
  )
}

export default Home