import React, { useState } from 'react';
import { Plus, Briefcase } from 'lucide-react';
import { DataTable } from '../../components/dashboard/DataTable';
import { ContentModal } from '../../components/dashboard/ContentModal';
import { ManagementStatsCard } from '../../components/dashboard/ManagementStatsCard';
import { ImageUploadField } from '../../components/dashboard/ImageUploadField';
interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  client: string;
  image: string;
  stats: string;
  stack: string[];
  description: string;
  link: string;
}
const mockPortfolio: PortfolioItem[] = [
{
  id: '1',
  title: 'FinTech Super App',
  category: 'Mobile Apps',
  client: 'NeoBank',
  image:
  'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
  stats: '1M+ Active Users',
  stack: ['Flutter', 'Node.js', 'AWS', 'MongoDB'],
  description:
  'A comprehensive digital banking solution with AI-powered financial insights.',
  link: 'https://neobank.example.com'
}];

export function PortfolioManagement() {
  const [items, setItems] = useState<PortfolioItem[]>(mockPortfolio);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Mobile Apps',
    client: '',
    image: '',
    stats: '',
    stack: [] as string[],
    description: '',
    link: ''
  });
  const [stackInput, setStackInput] = useState('');
  const categories = [
  'Mobile Apps',
  'Web Apps',
  'Enterprise',
  'Blockchain',
  'AI/ML',
  'On-Demand'];

  const handleEdit = (item: PortfolioItem) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };
  const handleDelete = (item: PortfolioItem) => {
    if (confirm(`Delete "${item.title}"?`)) {
      setItems(items.filter((i) => i.id !== item.id));
    }
  };
  const handleSave = () => {
    if (editingItem) {
      setItems(
        items.map((i) =>
        i.id === editingItem.id ?
        {
          ...formData,
          id: i.id
        } :
        i
        )
      );
    } else {
      setItems([
      ...items,
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
    setEditingItem(null);
    setFormData({
      title: '',
      category: 'Mobile Apps',
      client: '',
      image: '',
      stats: '',
      stack: [],
      description: '',
      link: ''
    });
    setStackInput('');
  };
  const addStackItem = () => {
    if (stackInput.trim()) {
      setFormData({
        ...formData,
        stack: [...formData.stack, stackInput.trim()]
      });
      setStackInput('');
    }
  };
  const removeStackItem = (index: number) => {
    setFormData({
      ...formData,
      stack: formData.stack.filter((_, i) => i !== index)
    });
  };
  const columns = [
  {
    key: 'title',
    label: 'Project',
    render: (value: string, row: PortfolioItem) =>
    <div className="flex items-center gap-3">
          <img
        src={row.image}
        alt={value}
        className="w-12 h-12 rounded-lg object-cover" />

          <span className="font-bold text-white">{value}</span>
        </div>

  },
  {
    key: 'client',
    label: 'Client'
  },
  {
    key: 'category',
    label: 'Category',
    render: (value: string) =>
    <span className="px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-bold">
          {value}
        </span>

  },
  {
    key: 'stats',
    label: 'Key Metric'
  },
  {
    key: 'stack',
    label: 'Tech Stack',
    render: (value: string[]) =>
    <div className="flex flex-wrap gap-1">
          {value.slice(0, 3).map((tech, i) =>
      <span key={i} className="px-2 py-1 bg-white/10 rounded text-xs">
              {tech}
            </span>
      )}
          {value.length > 3 &&
      <span className="text-xs text-gray-400">+{value.length - 3}</span>
      }
        </div>

  }];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Portfolio Management
          </h1>
          <p className="text-gray-400">Manage your project showcase</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[color:var(--bright-red)] to-[color:var(--deep-red)] text-white font-bold hover:shadow-[0_0_20px_rgba(237,31,36,0.6)] transition-all">

          <Plus size={20} />
          Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ManagementStatsCard
          title="Total Projects"
          value={items.length}
          icon={Briefcase}
          color="from-blue-500 to-cyan-500" />

        <ManagementStatsCard
          title="Categories"
          value={new Set(items.map((i) => i.category)).size}
          icon={Briefcase}
          color="from-purple-500 to-pink-500" />

        <ManagementStatsCard
          title="Clients"
          value={new Set(items.map((i) => i.client)).size}
          icon={Briefcase}
          color="from-green-500 to-emerald-500" />

      </div>

      <DataTable
        columns={columns}
        data={items}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchable />


      <ContentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingItem ? 'Edit Project' : 'Add New Project'}
        onSave={handleSave}
        saveLabel={editingItem ? 'Update' : 'Create'}>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-400 font-medium">
                Project Title *
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
                placeholder="FinTech Super App"
                required />

            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400 font-medium">
                Client *
              </label>
              <input
                type="text"
                value={formData.client}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  client: e.target.value
                })
                }
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[color:var(--bright-red)] focus:outline-none"
                placeholder="NeoBank"
                required />

            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
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
                <option key={cat} value={cat}>
                    {cat}
                  </option>
                )}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400 font-medium">
                Key Metric
              </label>
              <input
                type="text"
                value={formData.stats}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  stats: e.target.value
                })
                }
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[color:var(--bright-red)] focus:outline-none"
                placeholder="1M+ Active Users" />

            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400 font-medium">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value
              })
              }
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[color:var(--bright-red)] focus:outline-none resize-none"
              placeholder="A comprehensive digital banking solution..."
              required />

          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400 font-medium">
              Tech Stack
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={stackInput}
                onChange={(e) => setStackInput(e.target.value)}
                onKeyPress={(e) =>
                e.key === 'Enter' && (e.preventDefault(), addStackItem())
                }
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[color:var(--bright-red)] focus:outline-none"
                placeholder="Add technology (press Enter)" />

              <button
                type="button"
                onClick={addStackItem}
                className="px-4 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors">

                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.stack.map((tech, i) =>
              <span
                key={i}
                className="px-3 py-1 bg-white/10 rounded-full text-sm text-white flex items-center gap-2">

                  {tech}
                  <button
                  type="button"
                  onClick={() => removeStackItem(i)}
                  className="hover:text-red-500">

                    ×
                  </button>
                </span>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400 font-medium">
              Project Link
            </label>
            <input
              type="url"
              value={formData.link}
              onChange={(e) =>
              setFormData({
                ...formData,
                link: e.target.value
              })
              }
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[color:var(--bright-red)] focus:outline-none"
              placeholder="https://example.com" />

          </div>

          <ImageUploadField
            value={formData.image}
            onChange={(url) =>
            setFormData({
              ...formData,
              image: url
            })
            }
            label="Project Image *" />

        </div>
      </ContentModal>
    </div>);

}