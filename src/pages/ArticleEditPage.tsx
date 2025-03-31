
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Article } from '@/components/articles/ArticleCard';
import { toast } from 'sonner';
import { 
  fetchArticles, 
  createArticle, 
  updateArticle as updateArticleInDb
} from '@/services/supabaseArticleService';

const categories = [
  'World', 'Politics', 'Business', 'Tech', 'Science', 
  'Culture', 'Opinion', 'Sports', 'Entertainment'
];

const ArticleEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isCreateMode = id === 'create';
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState<Partial<Article>>({
    title: '',
    summary: '',
    content: '',
    category: 'World',
    author: '',
    imageUrl: '',
    slug: '',
  });

  useEffect(() => {
    // Only fetch article data if we're in edit mode
    if (!isCreateMode && id) {
      const loadArticle = async () => {
        try {
          setIsLoading(true);
          const articles = await fetchArticles();
          const article = articles.find(a => a.id === id);
          
          if (article) {
            setFormData({
              id: article.id,
              title: article.title,
              summary: article.summary,
              content: article.content || '',
              category: article.category,
              author: article.author,
              imageUrl: article.imageUrl,
              slug: article.slug,
              publishedAt: article.publishedAt,
            });
          } else {
            toast.error('Article not found');
            navigate('/admin');
          }
        } catch (error) {
          console.error('Error loading article:', error);
          toast.error('Failed to load article');
          navigate('/admin');
        } finally {
          setIsLoading(false);
        }
      };

      loadArticle();
    }
  }, [id, isCreateMode, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, category: value }));
  };

  const generateSlug = () => {
    if (formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.summary || !formData.category || 
        !formData.author || !formData.imageUrl || !formData.slug) {
      toast.error('All fields are required');
      return;
    }
    
    try {
      setIsLoading(true);
      
      if (isCreateMode) {
        await createArticle({
          title: formData.title || '',
          summary: formData.summary || '',
          content: formData.content || '',
          category: formData.category || 'World',
          author: formData.author || '',
          imageUrl: formData.imageUrl || '',
          slug: formData.slug || '',
        });
        toast.success('Article created successfully!');
      } else if (id) {
        await updateArticleInDb(id, formData);
        toast.success('Article updated successfully!');
      }
      
      navigate('/admin');
    } catch (error) {
      console.error('Error saving article:', error);
      toast.error('Failed to save article');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container-news py-8">
        <h1 className="news-title mb-6">
          {isCreateMode ? 'Create New Article' : 'Edit Article'}
        </h1>
        
        {isLoading && !isCreateMode ? (
          <div className="text-center py-8">Loading article data...</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="summary">Summary</Label>
              <Textarea
                id="summary"
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                rows={3}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={10}
                placeholder="Enter full article content here"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={handleSelectChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                required
              />
              {formData.imageUrl && (
                <div className="mt-2 aspect-[16/9] max-h-[200px] overflow-hidden rounded-md">
                  <img 
                    src={formData.imageUrl} 
                    alt="Article preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={generateSlug}
                >
                  Generate from Title
                </Button>
              </div>
            </div>
            
            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (isCreateMode ? 'Creating...' : 'Updating...') : (isCreateMode ? 'Create Article' : 'Update Article')}
              </Button>
              <Button 
                type="button" 
                variant="outline"
                onClick={() => navigate('/admin')}
                disabled={isLoading}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>
    </Layout>
  );
};

export default ArticleEditPage;
