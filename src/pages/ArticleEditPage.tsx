
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
import { mockArticles } from '@/services/articleService';
import { Article } from '@/components/articles/ArticleCard';
import { toast } from 'sonner';

const categories = [
  'World', 'Politics', 'Business', 'Tech', 'Science', 
  'Culture', 'Opinion', 'Sports', 'Entertainment'
];

const ArticleEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isCreateMode = id === 'create';
  
  const [formData, setFormData] = useState<Partial<Article>>({
    title: '',
    summary: '',
    category: 'World',
    author: '',
    imageUrl: '',
    slug: '',
  });

  useEffect(() => {
    if (!isCreateMode && id) {
      const article = mockArticles.find(a => a.id === id);
      if (article) {
        setFormData({
          id: article.id,
          title: article.title,
          summary: article.summary,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isCreateMode) {
      toast.success('Article created successfully!');
    } else {
      toast.success('Article updated successfully!');
    }
    
    navigate('/admin');
  };

  return (
    <Layout>
      <div className="container-news py-8">
        <h1 className="news-title mb-6">
          {isCreateMode ? 'Create New Article' : 'Edit Article'}
        </h1>
        
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
            <Button type="submit">
              {isCreateMode ? 'Create Article' : 'Update Article'}
            </Button>
            <Button 
              type="button" 
              variant="outline"
              onClick={() => navigate('/admin')}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ArticleEditPage;
