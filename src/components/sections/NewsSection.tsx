
import React from 'react';
import { Link } from 'react-router-dom';
import ArticleCard, { Article } from '../articles/ArticleCard';

interface NewsSectionProps {
  title: string;
  articles: Article[];
  viewAllLink?: string;
}

const NewsSection = ({ title, articles, viewAllLink }: NewsSectionProps) => {
  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <section className="py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title">{title}</h2>
        {viewAllLink && (
          <Link to={viewAllLink} className="text-sm font-medium text-news-600 hover:text-news-900">
            View All
          </Link>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {articles.slice(0, 2).map((article) => (
          <ArticleCard key={article.id} article={article} variant="medium" />
        ))}
      </div>
      
      {articles.length > 2 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {articles.slice(2, 5).map((article) => (
            <ArticleCard key={article.id} article={article} variant="small" />
          ))}
        </div>
      )}
    </section>
  );
};

export default NewsSection;
