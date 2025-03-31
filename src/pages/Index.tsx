
import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/sections/HeroSection';
import CategorySection from '@/components/sections/CategorySection';
import { getLatestArticles, getArticlesByCategory, mockArticles } from '@/services/articleService';
import { AnimatedContainer } from '@/components/ui/animated-container';

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
        <AnimatedContainer type="fade" direction="up" duration={0.7}>
          <HeroSection mainArticle={mainArticle} sideArticles={sideArticles} />
        </AnimatedContainer>
        
        {/* Main Categories */}
        <AnimatedContainer 
          type="fade" 
          direction="up" 
          staggerChildren={true}
          staggerDelay={0.1}
          className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8"
        >
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <CategorySection title="WORLD" articles={worldNews} viewAllLink="/world" />
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <CategorySection title="POLITICS" articles={politics} viewAllLink="/politics" />
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <CategorySection title="BUSINESS" articles={business} viewAllLink="/business" />
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <CategorySection title="TECHNOLOGY" articles={technology} viewAllLink="/tech" />
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <CategorySection title="OPINION" articles={opinion} viewAllLink="/opinion" />
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <CategorySection title="CULTURE" articles={culture} viewAllLink="/culture" />
          </div>
        </AnimatedContainer>
      </div>
    </Layout>
  );
};

export default Index;
