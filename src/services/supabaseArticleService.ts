import { supabase } from '@/integrations/supabase/client';
import { Article } from '@/components/articles/ArticleCard';

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

  // Convert the Supabase timestamp to JavaScript Date objects and map db columns to interface properties
  return data.map(article => ({
    ...article,
    publishedAt: new Date(article.published_at),
    // Ensure the id is a string as expected by the existing components
    id: article.id.toString(),
    // Map image_url to imageUrl for the interface
    imageUrl: article.image_url,
    // Keep content as is
    content: article.content
  }));
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

  return data.map(article => ({
    ...article,
    publishedAt: new Date(article.published_at),
    id: article.id.toString(),
    imageUrl: article.image_url,
    content: article.content
  }));
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

  return {
    ...data,
    publishedAt: new Date(data.published_at),
    id: data.id.toString(),
    imageUrl: data.image_url,
    content: data.content
  };
};

// Create a new article
export const createArticle = async (article: Omit<Article, 'id' | 'publishedAt'>): Promise<Article> => {
  const { data, error } = await supabase
    .from('articles')
    .insert([
      {
        title: article.title,
        summary: article.summary,
        content: article.content || '', // Using empty string as default if not provided
        category: article.category,
        author: article.author,
        slug: article.slug,
        image_url: article.imageUrl,
      }
    ])
    .select()
    .single();

  if (error) {
    console.error('Error creating article:', error);
    throw error;
  }

  return {
    ...data,
    publishedAt: new Date(data.published_at),
    id: data.id.toString(),
    imageUrl: data.image_url,
    content: data.content
  };
};

// Update an existing article
export const updateArticle = async (id: string, article: Partial<Article>): Promise<Article> => {
  const updateData: any = {};
  
  if (article.title) updateData.title = article.title;
  if (article.summary) updateData.summary = article.summary;
  if (article.content) updateData.content = article.content;
  if (article.category) updateData.category = article.category;
  if (article.author) updateData.author = article.author;
  if (article.slug) updateData.slug = article.slug;
  if (article.imageUrl) updateData.image_url = article.imageUrl;
  
  // Update the updated_at timestamp
  updateData.updated_at = new Date().toISOString();

  const { data, error } = await supabase
    .from('articles')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating article ${id}:`, error);
    throw error;
  }

  return {
    ...data,
    publishedAt: new Date(data.published_at),
    id: data.id.toString(),
    imageUrl: data.image_url,
    content: data.content
  };
};

// Delete an article
export const deleteArticle = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('articles')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(`Error deleting article ${id}:`, error);
    throw error;
  }
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

  return data.map(article => ({
    ...article,
    publishedAt: new Date(article.published_at),
    id: article.id.toString(),
    imageUrl: article.image_url,
    content: article.content
  }));
};

// Fetch featured articles (could be based on a featured flag or other criteria)
export const fetchFeaturedArticles = async (): Promise<Article[]> => {
  // For now, just return the latest 5 articles as featured
  return fetchLatestArticles(5);
};
