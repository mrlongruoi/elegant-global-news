
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ArticleCard from '@/components/articles/ArticleCard';
import { getArticlesByCategory } from '@/services/articleService';

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const formattedCategory = category ? category.charAt(0).toUpperCase() + category.slice(1) : '';
  
  const articles = getArticlesByCategory(formattedCategory);
  
  if (!category || articles.length === 0) {
    return (
      <Layout>
        <div className="container-news py-12">
          <h1 className="news-title mb-6">Category not found</h1>
          <p>Sorry, we couldn't find any articles in this category.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-news py-6">
        <h1 className="news-title mb-8 border-b border-news-200 pb-4">{formattedCategory.toUpperCase()}</h1>
        
        {articles.length > 0 && (
          <div className="mb-12">
            <ArticleCard article={articles[0]} variant="large" />
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.slice(1).map((article) => (
            <ArticleCard key={article.id} article={article} variant="medium" />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
