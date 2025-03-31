
import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

export interface Article {
  id: string;
  title: string;
  summary: string;
  category: string;
  author: string;
  publishedAt: Date;
  imageUrl: string;
  slug: string;
}

interface ArticleCardProps {
  article: Article;
  variant?: 'large' | 'medium' | 'small';
}

const ArticleCard = ({ article, variant = 'medium' }: ArticleCardProps) => {
  const { title, summary, category, author, publishedAt, imageUrl, slug } = article;
  
  if (variant === 'large') {
    return (
      <div className="mb-8">
        <Link to={`/article/${slug}`}>
          <div className="aspect-[16/9] overflow-hidden mb-4">
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
        <div className="space-y-2">
          <div className="text-sm font-medium text-news-500 uppercase">{category}</div>
          <Link to={`/article/${slug}`}>
            <h2 className="news-title">{title}</h2>
          </Link>
          <p className="text-lg text-news-600 line-clamp-3">{summary}</p>
          <div className="article-meta">
            By {author} • {format(publishedAt, 'MMMM d, yyyy')}
          </div>
        </div>
      </div>
    );
  }
  
  if (variant === 'medium') {
    return (
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <Link to={`/article/${slug}`} className="md:col-span-1">
          <div className="aspect-[4/3] overflow-hidden">
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
        <div className="md:col-span-2 space-y-2">
          <div className="text-xs font-medium text-news-500 uppercase">{category}</div>
          <Link to={`/article/${slug}`}>
            <h3 className="text-xl md:text-2xl font-bold font-display leading-tight">{title}</h3>
          </Link>
          <p className="text-news-600 text-base line-clamp-2">{summary}</p>
          <div className="article-meta">
            By {author} • {format(publishedAt, 'MMM d, yyyy')}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="mb-4">
      <div className="space-y-1">
        <div className="text-xs font-medium text-news-500 uppercase">{category}</div>
        <Link to={`/article/${slug}`}>
          <h3 className="text-base font-bold font-display leading-tight">{title}</h3>
        </Link>
        <div className="article-meta text-xs">
          {format(publishedAt, 'MMM d')}
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
