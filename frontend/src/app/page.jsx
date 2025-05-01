"use client";
import React from 'react';
import Hero from '@/components/Home/Hero';
import Banner from '@/components/Home/Banner';
import SwiperText from '@/components/Home/SwiperText';
import ProductList from '@/components/Home/ProductList';
import SmartMealPlanner from '@/components/Home/SmartMealPlanner';
import FactSection from '@/components/Home/FactSection';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Home = () => {
  return (
  // hero start
  <div className=" mx-auto  mt-10 ">
<Navbar/>
<Hero/>
<Banner/>
<ProductList/>
<SwiperText/>
<SmartMealPlanner/>
<FactSection/>
<Footer/>
  </div>
  )
}

export default Home