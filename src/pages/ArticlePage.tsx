
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import Layout from '@/components/layout/Layout';
import { fetchArticleBySlug, fetchLatestArticles } from '@/services/articles';
import ArticleCard, { Article } from '@/components/articles/ArticleCard';

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadArticle = async () => {
      if (!slug) return;
      
      try {
        setIsLoading(true);
        setError(null);
        
        const articleData = await fetchArticleBySlug(slug);
        if (articleData) {
          setArticle(articleData);
          
          // Also fetch related articles
          const latestArticles = await fetchLatestArticles(3);
          // Filter out the current article if it's in the latest
          setRelatedArticles(latestArticles.filter(a => a.id !== articleData.id));
        } else {
          setError('Article not found');
        }
      } catch (err) {
        console.error('Error fetching article:', err);
        setError('Failed to load article');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadArticle();
  }, [slug]);
  
  if (isLoading) {
    return (
      <Layout>
        <div className="container-news py-12 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-news-600"></div>
        </div>
      </Layout>
    );
  }
  
  if (error || !article) {
    return (
      <Layout>
        <div className="container-news py-12">
          <h1 className="news-title mb-6">Article not found</h1>
          <p>Sorry, we couldn't find the article you're looking for.</p>
          <Link to="/" className="text-news-600 hover:text-news-900 mt-4 inline-block">
            Return to home page
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="container-news py-8">
        <div className="max-w-3xl mx-auto">
          <Link to={`/${article.category.toLowerCase()}`} className="text-sm font-medium text-news-500 uppercase mb-2 inline-block">
            {article.category}
          </Link>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display leading-tight mb-4">
            {article.title}
          </h1>
          
          <div className="text-lg text-news-600 mb-6">
            {article.summary}
          </div>
          
          <div className="flex items-center justify-between mb-8 text-news-500 text-sm">
            <div>By {article.author}</div>
            <div>{format(article.publishedAt, 'MMMM d, yyyy')}</div>
          </div>
          
          <div className="aspect-[16/9] overflow-hidden mb-8">
            <img 
              src={article.imageUrl} 
              alt={article.title} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="prose max-w-none">
            {article.content ? (
              <div dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br />') }} />
            ) : (
              <>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <h2>The Implications</h2>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>
                <p>
                  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.
                </p>
                <blockquote>
                  "The world is changing at an unprecedented pace, and our institutions must adapt to meet these new challenges."
                </blockquote>
                <p>
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi.
                </p>
                <h2>Looking Ahead</h2>
                <p>
                  Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.
                </p>
                <p>
                  Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus.
                </p>
              </>
            )}
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-news-200">
          <h3 className="section-title mb-8">More Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((relatedArticle) => (
              <ArticleCard key={relatedArticle.id} article={relatedArticle} variant="small" />
            ))}
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default ArticlePage;
