import React, { useState } from 'react';
import { Plus, BookOpen, Calendar, Settings } from 'lucide-react';
import { DataTable } from '../../components/dashboard/DataTable';
import { ContentModal } from '../../components/dashboard/ContentModal';
import { CategoryModal } from '../../components/dashboard/CategoryModal';
import { ManagementStatsCard } from '../../components/dashboard/ManagementStatsCard';
import { ImageUploadField } from '../../components/dashboard/ImageUploadField';
import { RichTextEditor } from '../../components/dashboard/RichTextEditor';
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  slug: string;
  content: string;
  tags: string[];
  status: 'published' | 'draft';
}
interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
  count: number;
}
const mockPosts: BlogPost[] = [
{
  id: '1',
  title: 'The Future of AI in Mobile Development 2026',
  excerpt:
  'How technology is transforming the way we build and interact with apps.',
  category: 'Mobile',
  date: '2026-01-15',
  readTime: '5 min',
  image:
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
  slug: 'future-of-ai-mobile-dev',
  content: 'Full blog post content goes here...',
  tags: ['AI', 'Mobile', 'Development'],
  status: 'published'
}];

const initialCategories: Category[] = [
{
  id: '1',
  name: 'Mobile',
  description: 'Mobile development',
  color: '#3B82F6',
  count: 12
},
{
  id: '2',
  name: 'AI',
  description: 'Artificial Intelligence',
  color: '#8B5CF6',
  count: 8
},
{
  id: '3',
  name: 'Web3',
  description: 'Blockchain & Web3',
  color: '#F59E0B',
  count: 5
},
{
  id: '4',
  name: 'Backend',
  description: 'Server side tech',
  color: '#10B981',
  count: 15
}];

export function BlogManagement() {
  const [posts, setPosts] = useState<BlogPost[]>(mockPosts);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    category: 'Mobile',
    date: new Date().toISOString().split('T')[0],
    readTime: '5 min',
    image: '',
    slug: '',
    content: '',
    tags: [] as string[],
    status: 'draft' as 'published' | 'draft'
  });
  const [tagInput, setTagInput] = useState('');
  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData(post);
    setIsModalOpen(true);
  };
  const handleDelete = (post: BlogPost) => {
    if (confirm(`Delete "${post.title}"?`)) {
      setPosts(posts.filter((p) => p.id !== post.id));
    }
  };
  const handleSave = () => {
    if (editingPost) {
      setPosts(
        posts.map((p) =>
        p.id === editingPost.id ?
        {
          ...formData,
          id: p.id
        } :
        p
        )
      );
    } else {
      setPosts([
      ...posts,
      {
        ...formData,
        id: Date.now().toString()
      }]
      );
    }
    handleCloseModal();
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPost(null);
    setFormData({
      title: '',
      excerpt: '',
      category: 'Mobile',
      date: new Date().toISOString().split('T')[0],
      readTime: '5 min',
      image: '',
      slug: '',
      content: '',
      tags: [],
      status: 'draft'
    });
    setTagInput('');
  };
  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()]
      });
      setTagInput('');
    }
  };
  const removeTag = (index: number) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((_, i) => i !== index)
    });
  };
  const columns = [
  {
    key: 'title',
    label: 'Post Title',
    render: (value: string, row: BlogPost) =>
    <div className="flex items-center gap-3">
          <img
        src={row.image}
        alt={value}
        className="w-12 h-12 rounded-lg object-cover" />

          <div className="max-w-md">
            <div className="font-bold text-white line-clamp-1">{value}</div>
            <div className="text-xs text-gray-400 line-clamp-1">
              {row.excerpt}
            </div>
          </div>
        </div>

  },
  {
    key: 'category',
    label: 'Category',
    render: (value: string) => {
      const cat = categories.find((c) => c.name === value);
      return (
        <span
          className="px-2 py-1 rounded-full text-xs font-bold"
          style={{
            backgroundColor: cat ? `${cat.color}20` : '#3B82F620',
            color: cat ? cat.color : '#3B82F6'
          }}>

            {value}
          </span>);

    }
  },
  {
    key: 'date',
    label: 'Date',
    render: (value: string) => new Date(value).toLocaleDateString()
  },
  {
    key: 'readTime',
    label: 'Read Time'
  },
  {
    key: 'status',
    label: 'Status',
    render: (value: string) =>
    <span
      className={`px-2 py-1 rounded-full text-xs font-bold ${value === 'published' ? 'bg-[color:var(--vibrant-green)]/20 text-[color:var(--vibrant-green)]' : 'bg-yellow-500/20 text-yellow-500'}`}>

          {value}
        </span>

  }];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Blog Management
          </h1>
          <p className="text-gray-400">Create and manage blog posts</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setIsCategoryModalOpen(true)}
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all">

            <Settings size={20} />
            Categories
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[color:var(--bright-red)] to-[color:var(--deep-red)] text-white font-bold hover:shadow-[0_0_20px_rgba(237,31,36,0.6)] transition-all">

            <Plus size={20} />
            New Post
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <ManagementStatsCard
          title="Total Posts"
          value={posts.length}
          icon={BookOpen}
          color="from-blue-500 to-cyan-500" />

        <ManagementStatsCard
          title="Published"
          value={posts.filter((p) => p.status === 'published').length}
          icon={BookOpen}
          color="from-green-500 to-emerald-500" />

        <ManagementStatsCard
          title="Drafts"
          value={posts.filter((p) => p.status === 'draft').length}
          icon={BookOpen}
          color="from-yellow-500 to-orange-500" />

        <ManagementStatsCard
          title="Categories"
          value={categories.length}
          icon={Calendar}
          color="from-purple-500 to-pink-500" />

      </div>

      <DataTable
        columns={columns}
        data={posts}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchable />


      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        categories={categories}
        onSave={setCategories}
        type="Blog" />


      <ContentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingPost ? 'Edit Blog Post' : 'Create New Post'}
        onSave={handleSave}
        saveLabel={editingPost ? 'Update' : 'Publish'}>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm text-gray-400 font-medium">
              Post Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
              setFormData({
                ...formData,
                title: e.target.value
              })
              }
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[color:var(--bright-red)] focus:outline-none"
              placeholder="The Future of AI in Mobile Development"
              required />

          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400 font-medium">
              Excerpt *
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) =>
              setFormData({
                ...formData,
                excerpt: e.target.value
              })
              }
              rows={2}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[color:var(--bright-red)] focus:outline-none resize-none"
              placeholder="Brief description of the post..."
              required />

          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-400 font-medium">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value
                })
                }
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[color:var(--bright-red)] focus:outline-none">

                {categories.map((cat) =>
                <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                )}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400 font-medium">
                Date *
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  date: e.target.value
                })
                }
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[color:var(--bright-red)] focus:outline-none"
                required />

            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400 font-medium">
                Read Time
              </label>
              <input
                type="text"
                value={formData.readTime}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  readTime: e.target.value
                })
                }
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[color:var(--bright-red)] focus:outline-none"
                placeholder="5 min" />

            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400 font-medium">
              URL Slug *
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) =>
              setFormData({
                ...formData,
                slug: e.target.value
              })
              }
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[color:var(--bright-red)] focus:outline-none"
              placeholder="future-of-ai-mobile-dev"
              required />

          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400 font-medium">Tags</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) =>
                e.key === 'Enter' && (e.preventDefault(), addTag())
                }
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[color:var(--bright-red)] focus:outline-none"
                placeholder="Add tag (press Enter)" />

              <button
                type="button"
                onClick={addTag}
                className="px-4 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors">

                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags.map((tag, i) =>
              <span
                key={i}
                className="px-3 py-1 bg-white/10 rounded-full text-sm text-white flex items-center gap-2">

                  {tag}
                  <button
                  type="button"
                  onClick={() => removeTag(i)}
                  className="hover:text-red-500">

                    ×
                  </button>
                </span>
              )}
            </div>
          </div>

          <ImageUploadField
            value={formData.image}
            onChange={(url) =>
            setFormData({
              ...formData,
              image: url
            })
            }
            label="Featured Image *" />


          <RichTextEditor
            value={formData.content}
            onChange={(content) =>
            setFormData({
              ...formData,
              content
            })
            }
            label="Post Content *"
            placeholder="Write your blog post content here..." />


          <div className="space-y-2">
            <label className="text-sm text-gray-400 font-medium">Status</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="published"
                  checked={formData.status === 'published'}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as 'published' | 'draft'
                  })
                  } />

                <span className="text-white">Published</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="draft"
                  checked={formData.status === 'draft'}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as 'published' | 'draft'
                  })
                  } />

                <span className="text-white">Draft</span>
              </label>
            </div>
          </div>
        </div>
      </ContentModal>
    </div>);

}