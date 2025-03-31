
import { supabase } from '@/integrations/supabase/client';
import { Article } from '@/components/articles/ArticleCard';

// Helper function to map database article data to our Article interface
const mapArticleData = (article: any): Article => ({
  ...article,
  publishedAt: new Date(article.published_at),
  id: article.id.toString(),
  imageUrl: article.image_url,
  content: article.content
});

// Fetch all articles
export const fetchArticles = async (): Promise<Article[]> => {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }

  return data.map(mapArticleData);
};

// Fetch articles by category
export const fetchArticlesByCategory = async (category: string): Promise<Article[]> => {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('category', category)
    .order('published_at', { ascending: false });

  if (error) {
    console.error(`Error fetching articles in category ${category}:`, error);
    throw error;
  }

  return data.map(mapArticleData);
};

// Fetch a single article by slug
export const fetchArticleBySlug = async (slug: string): Promise<Article | null> => {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // PGRST116 indicates no rows returned
      return null;
    }
    console.error(`Error fetching article with slug ${slug}:`, error);
    throw error;
  }

  return mapArticleData(data);
};

// Fetch latest articles
export const fetchLatestArticles = async (count: number = 5): Promise<Article[]> => {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('published_at', { ascending: false })
    .limit(count);

  if (error) {
    console.error('Error fetching latest articles:', error);
    throw error;
  }

  return data.map(mapArticleData);
};

// Fetch featured articles (could be based on a featured flag or other criteria)
export const fetchFeaturedArticles = async (): Promise<Article[]> => {
  // For now, just return the latest 5 articles as featured
  return fetchLatestArticles(5);
};
