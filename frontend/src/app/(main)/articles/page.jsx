"use client"

import React, { useEffect, useState } from 'react';
import Categories from '@/components/Articles/Categories';
import EditorsChoice from '@/components/Articles/EditorsChoice';
// import GridSection from '@/components/Articles/GridSection';
// import InfiniteScroller from '@/components/Articles/InfiniteScroll';
import LatestNewsSection from '@/components/Articles/LatestNews';
import TopArticles from '@/components/Articles/TopArticles';

const Page = () => {
  const [categories, setCategories] = useState([]);
  const [editorsChoice, setEditorsChoice] = useState([]);
  // const [gridSection, setGridSection] = useState([]);
  // const [infiniteScroller, setInfiniteScroller] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const [topArticles, setTopArticles] = useState([]);

  // Fetch articles for each section
  useEffect(() => {
    const fetchArticlesBySection = async (section) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/getbysection/${section}`);
      const data = await response.json();
      return data;
    };

    const fetchData = async () => {
      setEditorsChoice(await fetchArticlesBySection('EditorsChoice'));
      // setGridSection(await fetchArticlesBySection('GridSection'));
      // setInfiniteScroller(await fetchArticlesBySection('InfiniteScroller'));
      setTopArticles(await fetchArticlesBySection('TopArticles'));
    };

    fetchData();
  }, []);

  return (
    <div>
      <Categories />
      <EditorsChoice articles={editorsChoice} />
      <TopArticles articles={topArticles} />
      {/* <GridSection articles={gridSection} /> */}
      {/* <InfiniteScroller articles={infiniteScrolle*r} /> */}
      <LatestNewsSection />
    </div>
  );
};

export default Page;
