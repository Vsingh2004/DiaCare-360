"use client";

import React from 'react';
import Hero from '@/components/Hero';
import Banner from '@/components/Banner';
import SwiperText from '@/components/SwiperText';
import ProductList from '@/components/ProductList';
import SmartMealPlanner from '@/components/SmartMealPlanner';
import FactSection from '@/components/FactSection';


const Home = () => {
  return (
  // hero start
  <div className=" mx-auto  mt-10 ">

<Hero/>
<Banner/>
<ProductList/>
<SwiperText/>
<SmartMealPlanner/>
<FactSection/>
  </div>
  )
}

export default Home