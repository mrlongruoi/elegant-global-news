
import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/sections/HeroSection';
import NewsSection from '@/components/sections/NewsSection';
import { getLatestArticles, getArticlesByCategory, mockArticles } from '@/services/articleService';

const Index = () => {
  // Get the main article and side articles for the hero section
  const mainArticle = mockArticles[0];
  const sideArticles = mockArticles.slice(1, 3);
  
  // Get articles by category
  const worldNews = getArticlesByCategory('World');
  const politics = getArticlesByCategory('Politics');
  const business = getArticlesByCategory('Business'); 
  const technology = getArticlesByCategory('Tech');
  const opinion = getArticlesByCategory('Opinion');
  const culture = getArticlesByCategory('Culture');

  return (
    <Layout>
      <div className="container-news">
        <HeroSection mainArticle={mainArticle} sideArticles={sideArticles} />
        
        <hr className="divider" />
        
        <NewsSection title="WORLD" articles={worldNews} viewAllLink="/world" />
        
        <hr className="divider" />
        
        <NewsSection title="POLITICS" articles={politics} viewAllLink="/politics" />
        
        <hr className="divider" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <NewsSection title="BUSINESS" articles={business} viewAllLink="/business" />
          <NewsSection title="TECHNOLOGY" articles={technology} viewAllLink="/tech" />
        </div>
        
        <hr className="divider" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <NewsSection title="OPINION" articles={opinion} viewAllLink="/opinion" />
          <NewsSection title="CULTURE" articles={culture} viewAllLink="/culture" />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
