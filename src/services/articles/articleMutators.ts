
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

  return mapArticleData(data);
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

  return mapArticleData(data);
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
