import React, { useState } from 'react';
import { Plus, Package, Settings } from 'lucide-react';
import { DataTable } from '../../components/dashboard/DataTable';
import { ContentModal } from '../../components/dashboard/ContentModal';
import { CategoryModal } from '../../components/dashboard/CategoryModal';
import { ManagementStatsCard } from '../../components/dashboard/ManagementStatsCard';
interface Product {
  id: string;
  name: string;
  tagline: string;
  platform: string;
  category: string;
  users: string;
  rating: number;
  status: 'active' | 'draft';
}
interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
  count: number;
}
const mockProducts: Product[] = [
{
  id: '1',
  name: 'DevMark',
  tagline: 'Code snippet manager',
  platform: 'Web',
  category: 'Developer Tools',
  users: '50K+',
  rating: 4.8,
  status: 'active'
},
{
  id: '2',
  name: 'MasterApp',
  tagline: 'Productivity suite',
  platform: 'Android',
  category: 'Productivity',
  users: '200K+',
  rating: 4.9,
  status: 'active'
}];

const initialCategories: Category[] = [
{
  id: '1',
  name: 'Developer Tools',
  description: 'Tools for devs',
  color: '#3B82F6',
  count: 1
},
{
  id: '2',
  name: 'Productivity',
  description: 'Productivity apps',
  color: '#10B981',
  count: 1
},
{
  id: '3',
  name: 'Finance',
  description: 'Financial apps',
  color: '#F59E0B',
  count: 0
}];

export function ProductsManagement() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    platform: 'Web',
    category: 'Developer Tools',
    users: '',
    rating: 5,
    status: 'active' as 'active' | 'draft'
  });
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
    setIsModalOpen(true);
  };
  const handleDelete = (product: Product) => {
    if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
      setProducts(products.filter((p) => p.id !== product.id));
    }
  };
  const handleSave = () => {
    if (editingProduct) {
      setProducts(
        products.map((p) =>
        p.id === editingProduct.id ?
        {
          ...formData,
          id: p.id
        } :
        p
        )
      );
    } else {
      setProducts([
      ...products,
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
    setEditingProduct(null);
    setFormData({
      name: '',
      tagline: '',
      platform: 'Web',
      category: categories[0]?.name || '',
      users: '',
      rating: 5,
      status: 'active'
    });
  };
  const columns = [
  {
    key: 'name',
    label: 'Product Name',
    render: (value: string) =>
    <span className="font-bold text-white">{value}</span>

  },
  {
    key: 'tagline',
    label: 'Tagline'
  },
  {
    key: 'platform',
    label: 'Platform',
    render: (value: string) =>
    <span className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold">
          {value}
        </span>

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
    key: 'users',
    label: 'Users'
  },
  {
    key: 'rating',
    label: 'Rating',
    render: (value: number) =>
    <span className="flex items-center gap-1">⭐ {value}</span>

  },
  {
    key: 'status',
    label: 'Status',
    render: (value: string) =>
    <span
      className={`px-2 py-1 rounded-full text-xs font-bold ${value === 'active' ? 'bg-[color:var(--vibrant-green)]/20 text-[color:var(--vibrant-green)]' : 'bg-yellow-500/20 text-yellow-500'}`}>

          {value}
        </span>

  }];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Products Management
          </h1>
          <p className="text-gray-400">
            Manage your digital products and applications
          </p>
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
            Add Product
          </button>
        </div>
      </div>

      {/* Stats - Compact */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ManagementStatsCard
          title="Total Products"
          value={products.length}
          icon={Package}
          color="from-blue-500 to-cyan-500" />

        <ManagementStatsCard
          title="Active Products"
          value={products.filter((p) => p.status === 'active').length}
          icon={Package}
          color="from-green-500 to-emerald-500" />

        <ManagementStatsCard
          title="Draft Products"
          value={products.filter((p) => p.status === 'draft').length}
          icon={Package}
          color="from-yellow-500 to-orange-500" />

      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchable />


      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        categories={categories}
        onSave={setCategories}
        type="Product" />


      {/* Add/Edit Modal */}
      <ContentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingProduct ? 'Edit Product' : 'Add New Product'}
        onSave={handleSave}
        saveLabel={editingProduct ? 'Update' : 'Create'}>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-400 font-medium">
                Product Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value
                })
                }
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[color:var(--bright-red)] focus:outline-none transition-colors"
                placeholder="DevMark"
                required />

            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400 font-medium">
                Tagline *
              </label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  tagline: e.target.value
                })
                }
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[color:var(--bright-red)] focus:outline-none transition-colors"
                placeholder="Code snippet manager"
                required />

            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-400 font-medium">
                Platform *
              </label>
              <select
                value={formData.platform}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  platform: e.target.value
                })
                }
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[color:var(--bright-red)] focus:outline-none transition-colors">

                <option value="Web">Web</option>
                <option value="iOS">iOS</option>
                <option value="Android">Android</option>
                <option value="Chrome">Chrome Extension</option>
              </select>
            </div>
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
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[color:var(--bright-red)] focus:outline-none transition-colors">

                {categories.map((cat) =>
                <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                )}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-400 font-medium">Users</label>
              <input
                type="text"
                value={formData.users}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  users: e.target.value
                })
                }
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[color:var(--bright-red)] focus:outline-none transition-colors"
                placeholder="50K+" />

            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400 font-medium">
                Rating
              </label>
              <input
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  rating: parseFloat(e.target.value)
                })
                }
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[color:var(--bright-red)] focus:outline-none transition-colors" />

            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400 font-medium">Status</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="active"
                  checked={formData.status === 'active'}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as 'active' | 'draft'
                  })
                  }
                  className="text-[color:var(--bright-red)]" />

                <span className="text-white">Active</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="draft"
                  checked={formData.status === 'draft'}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as 'active' | 'draft'
                  })
                  }
                  className="text-[color:var(--bright-red)]" />

                <span className="text-white">Draft</span>
              </label>
            </div>
          </div>
        </div>
      </ContentModal>
    </div>);

}