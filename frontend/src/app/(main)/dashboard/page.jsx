import React from 'react'
import Sidebar from '@/components/Dashboard/Sidebar';
import SmartMealPlanner from '@/components/Dashboard/SmartMealPlanner';
import Topbar from '@/components/Dashboard/Topbar';

const page = () => {
  return (
    <div>
      <Sidebar/>
      <SmartMealPlanner/>
      <Topbar/>
    </div>
  )
}

export default page
