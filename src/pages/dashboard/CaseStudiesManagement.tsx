import React, { useState } from 'react';
import { Plus, FileText, Star } from 'lucide-react';
import { DataTable } from '../../components/dashboard/DataTable';
import { ContentModal } from '../../components/dashboard/ContentModal';
import { ManagementStatsCard } from '../../components/dashboard/ManagementStatsCard';
import { ImageUploadField } from '../../components/dashboard/ImageUploadField';
interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  title: string;
  challenge: string;
  solution: string;
  result: string;
  image: string;
  featuredImage?: string;
  isFeatured: boolean;
}
const mockCaseStudies: CaseStudy[] = [
{
  id: '1',
  client: 'Global Logistics Co',
  industry: 'Supply Chain',
  title: 'Optimizing Last-Mile Delivery with AI',
  challenge:
  'Inefficient route planning leading to high fuel costs and delayed deliveries.',
  solution:
  'Developed an AI-powered routing engine integrated with driver mobile apps.',
  result: '30% Reduction in Fuel Costs',
  image:
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
  featuredImage:
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
  isFeatured: false
}];

export function CaseStudiesManagement() {
  const [studies, setStudies] = useState<CaseStudy[]>(mockCaseStudies);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudy, setEditingStudy] = useState<CaseStudy | null>(null);
  const [formData, setFormData] = useState({
    client: '',
    industry: 'Supply Chain',
    title: '',
    challenge: '',
    solution: '',
    result: '',
    image: '',
    featuredImage: '',
    isFeatured: false
  });
  const industries = [
  'Supply Chain',
  'Healthcare',
  'E-Commerce',
  'FinTech',
  'Education',
  'Energy',
  'Travel',
  'Manufacturing',
  'Food & Beverage',
  'Real Estate'];

  const toggleFeatured = (study: CaseStudy) => {
    setStudies(
      studies.map((s) =>
      s.id === study.id ?
      {
        ...s,
        isFeatured: !s.isFeatured
      } :
      s
      )
    );
  };
  const handleEdit = (study: CaseStudy) => {
    setEditingStudy(study);
    setFormData(study);
    setIsModalOpen(true);
  };
  const handleDelete = (study: CaseStudy) => {
    if (confirm(`Delete case study "${study.title}"?`)) {
      setStudies(studies.filter((s) => s.id !== study.id));
    }
  };
  const handleSave = () => {
    if (editingStudy) {
      setStudies(
        studies.map((s) =>
        s.id === editingStudy.id ?
        {
          ...formData,
          id: s.id
        } :
        s
        )
      );
    } else {
      setStudies([
      ...studies,
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
    setEditingStudy(null);
    setFormData({
      client: '',
      industry: 'Supply Chain',
      title: '',
      challenge: '',
      solution: '',
      result: '',
      image: '',
      featuredImage: '',
      isFeatured: false
    });
  };
  const columns = [
  {
    key: 'title',
    label: 'Case Study',
    render: (value: string, row: CaseStudy) =>
    <div className="flex items-center gap-3">
          <img
        src={row.image}
        alt={value}
        className="w-12 h-12 rounded-lg object-cover" />

          <div>
            <div className="font-bold text-white flex items-center gap-2">
              {value}
              {row.isFeatured &&
          <Star size={14} className="fill-yellow-400 text-yellow-400" />
          }
            </div>
            <div className="text-xs text-gray-400">{row.client}</div>
          </div>
        </div>

  },
  {
    key: 'industry',
    label: 'Industry',
    render: (value: string) =>
    <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold">
          {value}
        </span>

  },
  {
    key: 'result',
    label: 'Result',
    render: (value: string) =>
    <span className="font-bold text-[color:var(--vibrant-green)]">
          {value}
        </span>

  },
  {
    key: 'isFeatured',
    label: 'Featured',
    render: (value: boolean, row: CaseStudy) =>
    <button
      onClick={(e) => {
        e.stopPropagation();
        toggleFeatured(row);
      }}
      className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${value ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>

          {value ? 'Featured' : 'Set Featured'}
        </button>

  }];

  const featuredCount = studies.filter((s) => s.isFeatured).length;
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Case Studies Management
          </h1>
          <p className="text-gray-400">Manage your success stories</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[color:var(--bright-red)] to-[color:var(--deep-red)] text-white font-bold hover:shadow-[0_0_20px_rgba(237,31,36,0.6)] transition-all">

          <Plus size={20} />
          Add Case Study
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <ManagementStatsCard
          title="Total Case Studies"
          value={studies.length}
          icon={FileText}
          color="from-green-500 to-emerald-500" />

        <ManagementStatsCard
          title="Featured"
          value={featuredCount}
          icon={Star}
          color="from-yellow-500 to-orange-500" />

        <ManagementStatsCard
          title="Industries"
          value={new Set(studies.map((s) => s.industry)).size}
          icon={FileText}
          color="from-blue-500 to-cyan-500" />

        <ManagementStatsCard
          title="Clients"
          value={new Set(studies.map((s) => s.client)).size}
          icon={FileText}
          color="from-purple-500 to-pink-500" />

      </div>

      <DataTable
        columns={columns}
        data={studies}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchable />


      <ContentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingStudy ? 'Edit Case Study' : 'Add New Case Study'}
        onSave={handleSave}
        saveLabel={editingStudy ? 'Update' : 'Create'}>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-400 font-medium">
                Client Name *
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
                placeholder="Global Logistics Co"
                required />

            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400 font-medium">
                Industry *
              </label>
              <select
                value={formData.industry}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  industry: e.target.value
                })
                }
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[color:var(--bright-red)] focus:outline-none">

                {industries.map((ind) =>
                <option key={ind} value={ind}>
                    {ind}
                  </option>
                )}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400 font-medium">
              Case Study Title *
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
              placeholder="Optimizing Last-Mile Delivery with AI"
              required />

          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400 font-medium">
              Challenge *
            </label>
            <textarea
              value={formData.challenge}
              onChange={(e) =>
              setFormData({
                ...formData,
                challenge: e.target.value
              })
              }
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[color:var(--bright-red)] focus:outline-none resize-none"
              placeholder="Describe the client's challenge..."
              required />

          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400 font-medium">
              Solution *
            </label>
            <textarea
              value={formData.solution}
              onChange={(e) =>
              setFormData({
                ...formData,
                solution: e.target.value
              })
              }
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[color:var(--bright-red)] focus:outline-none resize-none"
              placeholder="Describe your solution..."
              required />

          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400 font-medium">
              Result/Impact *
            </label>
            <input
              type="text"
              value={formData.result}
              onChange={(e) =>
              setFormData({
                ...formData,
                result: e.target.value
              })
              }
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[color:var(--bright-red)] focus:outline-none"
              placeholder="30% Reduction in Fuel Costs"
              required />

          </div>

          <ImageUploadField
            value={formData.image}
            onChange={(url) =>
            setFormData({
              ...formData,
              image: url
            })
            }
            label="Case Study Image *" />


          <ImageUploadField
            value={formData.featuredImage}
            onChange={(url) =>
            setFormData({
              ...formData,
              featuredImage: url
            })
            }
            label="Featured Section Image (for Homepage)" />


          <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
            <input
              type="checkbox"
              id="isFeatured"
              checked={formData.isFeatured}
              onChange={(e) =>
              setFormData({
                ...formData,
                isFeatured: e.target.checked
              })
              }
              className="w-5 h-5 rounded border-white/20 bg-white/5 text-[color:var(--bright-red)] focus:ring-[color:var(--bright-red)] focus:ring-offset-0" />

            <label
              htmlFor="isFeatured"
              className="text-sm text-white font-medium cursor-pointer flex items-center gap-2">

              <Star size={16} className="text-yellow-400" />
              Show in Featured Section (Homepage)
            </label>
          </div>
        </div>
      </ContentModal>
    </div>);

}