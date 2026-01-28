import { useState, useEffect } from 'react';
import { Plus, Package } from 'lucide-react';
import { DataTable } from '../../components/dashboard/DataTable';
import { ContentModal } from '../../components/dashboard/ContentModal';
import { ManagementStatsCard } from '../../components/dashboard/ManagementStatsCard';
import { productsApi } from '../../services/api';
import type { Product } from '../../types/types';

// Extended Product type for UI display
interface ProductDisplay extends Product {
  id: string;
}

export function ProductsManagement() {
  const [products, setProducts] = useState<ProductDisplay[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductDisplay | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    pricing: 0,
    category: 'Template',
    features: [] as string[],
    images: [] as string[],
  });
  const [featureInput, setFeatureInput] = useState('');
  const [imageInput, setImageInput] = useState('');

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productsApi.getAll();
      console.log(data);
      // Convert _id to id for consistency with UI
      const displayData = data.map(p => ({
        ...p,
        id: p._id || p.id || '',
      }));
      setProducts(displayData);
    } catch (err: any) {
      console.error('Error fetching products:', err);
      setError(err.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: ProductDisplay) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      pricing: product.pricing,
      category: product.category,
      features: product.features,
      images: product.images,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (product: ProductDisplay) => {
    if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
      // Note: Delete endpoint not in Postman collection, just remove from UI
      setProducts(products.filter((p) => p.id !== product.id));
    }
  };

  const handleSave = async () => {
    try {
      setError(null);
      if (editingProduct) {
        // Note: Update endpoint not in Postman collection
        // Just update in UI for now
        setProducts(
          products.map((p) =>
            p.id === editingProduct.id
              ? { ...editingProduct, ...formData }
              : p
          )
        );
      } else {
        // Create new product
        const newProduct = await productsApi.create(formData);
        const displayProduct = {
          ...newProduct,
          id: newProduct._id || newProduct.id || Date.now().toString(),
        };
        setProducts([...products, displayProduct]);
      }
      handleCloseModal();
    } catch (err: any) {
      console.error('Error saving product:', err);
      setError(err.message || 'Failed to save product');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      pricing: 0,
      category: 'Template',
      features: [],
      images: [],
    });
    setFeatureInput('');
    setImageInput('');
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, featureInput.trim()],
      });
      setFeatureInput('');
    }
  };

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    });
  };

  const addImage = () => {
    if (imageInput.trim()) {
      setFormData({
        ...formData,
        images: [...formData.images, imageInput.trim()],
      });
      setImageInput('');
    }
  };

  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  const columns = [
    {
      key: 'name',
      label: 'Product Name',
      render: (value: string) => (
        <span className="font-bold text-white">{value}</span>
      ),
    },
    {
      key: 'description',
      label: 'Description',
      render: (value: string) => (
        <span className="text-gray-300 line-clamp-1">{value}</span>
      ),
    },
    {
      key: 'pricing',
      label: 'Price',
      render: (value: number) => (
        <span className="text-green-400 font-bold">${value}</span>
      ),
    },
    {
      key: 'category',
      label: 'Category',
      render: (value: string) => (
        <span className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold">
          {value}
        </span>
      ),
    },
    {
      key: 'features',
      label: 'Features',
      render: (value: string[]) => (
        <span className="text-gray-400">{value.length} features</span>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white text-lg">Loading products...</div>
      </div>
    );
  }

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
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[color:var(--bright-red)] to-[color:var(--deep-red)] text-white font-bold hover:shadow-[0_0_20px_rgba(237,31,36,0.6)] transition-all">
          <Plus size={20} />
          Add Product
        </button>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="bg-red-500/20 border border-red-500 rounded-xl p-4 text-red-400">
          {error}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ManagementStatsCard
          title="Total Products"
          value={products.length}
          icon={Package}
          color="from-blue-500 to-cyan-500" />
        <ManagementStatsCard
          title="Total Revenue"
          value={`$${products.reduce((sum, p) => sum + p.pricing, 0).toFixed(2)}`}
          icon={Package}
          color="from-green-500 to-emerald-500" />
        <ManagementStatsCard
          title="Categories"
          value={new Set(products.map(p => p.category)).size}
          icon={Package}
          color="from-purple-500 to-pink-500" />
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchable />

      {/* Add/Edit Modal */}
      <ContentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingProduct ? 'Edit Product' : 'Add New Product'}
        onSave={handleSave}
        saveLabel={editingProduct ? 'Update' : 'Create'}>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm text-gray-400 font-medium">
              Product Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[color:var(--bright-red)] focus:outline-none transition-colors"
              placeholder="SaaS Starter Kit"
              required />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400 font-medium">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[color:var(--bright-red)] focus:outline-none resize-none"
              placeholder="A complete starter kit for SaaS"
              required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-400 font-medium">
                Price *
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.pricing}
                onChange={(e) =>
                  setFormData({ ...formData, pricing: parseFloat(e.target.value) || 0 })
                }
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[color:var(--bright-red)] focus:outline-none"
                placeholder="49.99"
                required />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400 font-medium">
                Category *
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[color:var(--bright-red)] focus:outline-none"
                placeholder="Template"
                required />
            </div>
          </div>

          {/* Features */}
          <div className="space-y-2">
            <label className="text-sm text-gray-400 font-medium">
              Features
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[color:var(--bright-red)] focus:outline-none"
                placeholder="Add feature (press Enter)" />
              <button
                type="button"
                onClick={addFeature}
                className="px-4 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors">
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.features.map((feature, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm flex items-center gap-2">
                  {feature}
                  <button
                    type="button"
                    onClick={() => removeFeature(i)}
                    className="hover:text-red-500">
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Images */}
          <div className="space-y-2">
            <label className="text-sm text-gray-400 font-medium">
              Images (URLs)
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={imageInput}
                onChange={(e) => setImageInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addImage())}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[color:var(--bright-red)] focus:outline-none"
                placeholder="http://example.com/img.png" />
              <button
                type="button"
                onClick={addImage}
                className="px-4 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors">
                Add
              </button>
            </div>
            <div className="space-y-2 mt-2">
              {formData.images.map((img, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-2 bg-white/5 rounded-lg">
                  <span className="flex-1 text-white text-sm truncate">{img}</span>
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="text-red-500 hover:text-red-400">
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ContentModal>
    </div>
  );
}