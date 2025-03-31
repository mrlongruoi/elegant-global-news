
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from 'sonner';
import { fetchArticles, deleteArticle } from '@/services/articles';
import { Article } from '@/components/articles/ArticleCard';
import { supabase } from '@/integrations/supabase/client';

const AdminArticleList = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch articles when component mounts
  useEffect(() => {
    const loadArticles = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Check auth status
        const { data: { session } } = await supabase.auth.getSession();
        console.log('Current session for article list:', session?.user?.email);
        
        const data = await fetchArticles();
        console.log('Articles fetched successfully:', data.length);
        setArticles(data);
      } catch (error: any) {
        console.error('Error loading articles:', error);
        setError(error.message || 'Failed to load articles');
        toast.error('Failed to load articles: ' + (error.message || 'Unknown error'));
      } finally {
        setIsLoading(false);
      }
    };

    loadArticles();
  }, []);

  const handleDeleteClick = (id: string) => {
    setArticleToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!articleToDelete) return;
    
    try {
      setIsLoading(true);
      await deleteArticle(articleToDelete);
      
      // Update the state to remove the deleted article
      setArticles(articles.filter(article => article.id !== articleToDelete));
      toast.success('Article deleted successfully');
    } catch (error: any) {
      console.error('Error deleting article:', error);
      toast.error('Failed to delete article: ' + (error.message || 'Unknown error'));
    } finally {
      setDeleteDialogOpen(false);
      setArticleToDelete(null);
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <div className="py-4 text-center">Loading articles...</div>}
      
      {error && !isLoading && (
        <div className="py-4 text-center text-red-500">
          <p className="mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      )}
      
      {!isLoading && !error && articles.length === 0 && (
        <div className="py-4 text-center">
          <p className="text-muted-foreground mb-4">No articles found. Create your first article to get started.</p>
          <Button asChild>
            <Link to="/admin/create">Create New Article</Link>
          </Button>
        </div>
      )}
      
      {!isLoading && !error && articles.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Published</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles.map((article) => (
              <TableRow key={article.id}>
                <TableCell className="font-medium">
                  <Link 
                    to={`/article/${article.slug}`} 
                    className="hover:text-news-600 transition-colors"
                  >
                    {article.title.length > 50 ? `${article.title.substring(0, 50)}...` : article.title}
                  </Link>
                </TableCell>
                <TableCell>{article.category}</TableCell>
                <TableCell>{article.author}</TableCell>
                <TableCell>{format(article.publishedAt, 'MMM d, yyyy')}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/admin/edit/${article.id}`}>
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Link>
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDeleteClick(article.id)}
                      disabled={isLoading}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this article? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete} disabled={isLoading}>
              {isLoading ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminArticleList;
