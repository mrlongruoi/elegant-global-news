
import React from 'react';
import ArticleCard, { Article } from '../articles/ArticleCard';

interface HeroSectionProps {
  mainArticle: Article;
  sideArticles: Article[];
}

const HeroSection = ({ mainArticle, sideArticles }: HeroSectionProps) => {
  return (
    <section className="py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ArticleCard article={mainArticle} variant="large" />
        </div>
        
        <div className="space-y-6">
          {sideArticles.map((article) => (
            <ArticleCard key={article.id} article={article} variant="medium" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
