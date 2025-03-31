
import React from 'react';
import { Link } from 'react-router-dom';
import ArticleCard, { Article } from '../articles/ArticleCard';
import { ChevronRight } from 'lucide-react';

interface HeroSectionProps {
  mainArticle: Article;
  sideArticles: Article[];
}

const HeroSection = ({ mainArticle, sideArticles }: HeroSectionProps) => {
  return (
    <section className="mb-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Featured Article */}
        <div className="lg:col-span-8 bg-white rounded-lg overflow-hidden shadow-sm">
          <ArticleCard article={mainArticle} variant="large" />
        </div>
        
        {/* Side Articles */}
        <div className="lg:col-span-4 bg-white rounded-lg shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-news-800 border-b border-news-200 pb-2">Latest News</h3>
            <Link to="/latest" className="text-sm text-news-600 hover:text-news-800 flex items-center">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="space-y-6">
            {sideArticles.map((article) => (
              <ArticleCard key={article.id} article={article} variant="medium" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
