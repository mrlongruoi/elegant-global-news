
import React from 'react';
import { Link } from 'react-router-dom';
import ArticleCard, { Article } from '../articles/ArticleCard';

interface HeroSectionProps {
  mainArticle: Article;
  sideArticles: Article[];
}

const HeroSection = ({ mainArticle, sideArticles }: HeroSectionProps) => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Main Featured Article */}
      <div className="lg:col-span-8">
        <ArticleCard article={mainArticle} variant="large" />
      </div>
      
      {/* Side Articles */}
      <div className="lg:col-span-4 space-y-6">
        <h3 className="text-lg font-bold text-news-800 border-b border-news-200 pb-2">Latest News</h3>
        {sideArticles.map((article) => (
          <ArticleCard key={article.id} article={article} variant="medium" />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
