import React from 'react'
import Categories from '@/components/Articles/Categories'  
import EditorsChoice from '@/components/Articles/EditorsChoice' 
import GridSection from '@/components/Articles/GridSection'
import InfiniteScroller from '@/components/Articles/InfiniteScroll'
import LatestNewsSection from '@/components/Articles/LatestNews'
import TopArticles from '@/components/Articles/TopArticles'

const page = () => {
  return (
    <div>
         <Categories></Categories>
         <EditorsChoice></EditorsChoice>
        <TopArticles></TopArticles>
      <GridSection></GridSection>
      <InfiniteScroller></InfiniteScroller>
      <LatestNewsSection></LatestNewsSection>
    
    </div>
  )
}

export default page
