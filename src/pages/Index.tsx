
import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/sections/HeroSection';
import CategorySection from '@/components/sections/CategorySection';
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
      <div className="container-news bg-gray-50">
        {/* Hero Section */}
        <HeroSection mainArticle={mainArticle} sideArticles={sideArticles} />
        
        {/* Main Categories */}
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <CategorySection title="WORLD" articles={worldNews} viewAllLink="/world" />
            <CategorySection title="POLITICS" articles={politics} viewAllLink="/politics" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <CategorySection title="BUSINESS" articles={business} viewAllLink="/business" />
            <CategorySection title="TECHNOLOGY" articles={technology} viewAllLink="/tech" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <CategorySection title="OPINION" articles={opinion} viewAllLink="/opinion" />
            <CategorySection title="CULTURE" articles={culture} viewAllLink="/culture" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
