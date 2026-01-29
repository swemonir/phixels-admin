import { useState, useEffect } from 'react';
import { Plus, FileText, Star } from 'lucide-react';
import { DataTable } from '../../components/dashboard/DataTable';
import { ContentModal } from '../../components/dashboard/ContentModal';
import { ManagementStatsCard } from '../../components/dashboard/ManagementStatsCard';
import { ImageUploadField } from '../../components/dashboard/ImageUploadField';
import { RichTextEditor } from '../../components/dashboard/RichTextEditor';
import { caseStudiesApi } from '../../services/api';
import type { CaseStudy } from '../../types/types';

interface CaseStudyDisplay extends CaseStudy {
  id: string;
  category: string;
  featured: boolean;
  image: string;
  overview: string;
}

export function CaseStudiesManagement() {
  const [studies, setStudies] = useState<CaseStudyDisplay[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudy, setEditingStudy] = useState<CaseStudyDisplay | null>(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: '',
    client: '',
    overview: '',
    challenge: '',
    solution: '',
    results: '',
    technologies: [] as string[],
    image: '',
    featured: false,
    category: 'FinTech' // Default
  });

  const categories = [
    'FinTech', 'Healthcare', 'E-Commerce', 'Education',
    'Energy', 'Travel', 'Manufacturing', 'Real Estate'
  ];

  useEffect(() => {
    fetchStudies();
  }, []);

  const fetchStudies = async () => {
    try {
      setLoading(true);
      const data = await caseStudiesApi.getAll();
      const displayData = data.map((s: any) => ({
        ...s,
        id: s._id,
        client: s.client || '',
        title: s.title || '',
        category: 'Uncategorized',
        featured: false,
        image: s.image || '',
        overview: '', // API 'overview' might be missing
        challenge: s.challenge || '',
        solution: s.solution || '',
        results: s.results || '',
        technologies: s.technologies || []
      }));
      setStudies(displayData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (study: CaseStudyDisplay) => {
    setEditingStudy(study);
    setForm({
      title: study.title || '',
      client: study.client || '',
      overview: study.overview || '',
      challenge: study.challenge || '',
      solution: study.solution || '',
      results: study.results || '',
      technologies: study.technologies || [],
      image: study.image || '',
      featured: study.featured,
      category: study.category
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (study: CaseStudyDisplay) => {
    if (confirm(`Delete "${study.title}"?`)) {
      try {
        await caseStudiesApi.delete(study.id);
        setStudies(studies.filter(s => s.id !== study.id));
      } catch (err) {
        console.error(err);
        alert('Failed to delete');
      }
    }
  };

  const handleSave = async () => {
    try {
      const payload: any = {
        title: form.title,
        client: form.client,
        overview: form.overview,
        challenge: form.challenge,
        solution: form.solution,
        results: form.results,
        technologies: form.technologies,
        // image: form.image // map if needed
      };

      if (editingStudy) {
        await caseStudiesApi.update(editingStudy.id, payload);
      } else {
        await caseStudiesApi.create(payload);
      }
      fetchStudies();
      handleCloseModal();
    } catch (err) {
      console.error(err);
      alert('Failed to save');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingStudy(null);
    setForm({
      title: '',
      client: '',
      overview: '',
      challenge: '',
      solution: '',
      results: '',
      technologies: [],
      image: '',
      featured: false,
      category: 'FinTech'
    });
  };

  const columns = [
    {
      key: 'title',
      label: 'Case Study',
      render: (value: string, row: CaseStudyDisplay) =>
        <div className="flex items-center gap-3">
          <img
            src={row.image}
            alt={value}
            className="w-12 h-12 rounded-lg object-cover" />

          <div>
            <div className="font-bold text-white flex items-center gap-2">
              {value}
              {row.featured &&
                <Star size={14} className="fill-yellow-400 text-yellow-400" />
              }
            </div>
            <div className="text-xs text-gray-400">{row.client}</div>
          </div>
        </div>

    },
    {
      key: 'category', // Changed from industry if using category
      label: 'Category',
      render: (value: string) =>
        <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold">
          {value || 'N/A'}
        </span>

    },
    {
      key: 'results', // Changed from result to results
      label: 'Result',
      render: (value: string) =>
        <div className="font-bold text-[color:var(--vibrant-green)] line-clamp-2" dangerouslySetInnerHTML={{ __html: value }} />
    },
    {
      key: 'featured',
      label: 'Featured',
      render: (value: boolean, row: CaseStudyDisplay) =>
        <button
          onClick={(e) => {
            e.stopPropagation();
            // toggleFeatured(row); // Implement toggle if needed via API update
          }}
          className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${value ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>

          {value ? 'Featured' : 'Set Featured'}
        </button>

    }];

  if (loading) {
    return <div className="text-white p-4">Loading...</div>;
  }

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
          value={studies.filter(s => s.featured).length}
          icon={Star}
          color="from-yellow-500 to-orange-500" />
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
                value={form.client}
                onChange={(e) =>
                  setForm({
                    ...form,
                    client: e.target.value
                  })
                }
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[color:var(--bright-red)] focus:outline-none"
                placeholder="Global Logistics Co"
                required />

            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400 font-medium">
                Category *
              </label>
              <select
                value={form.category}
                onChange={(e) =>
                  setForm({
                    ...form,
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
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400 font-medium">
              Case Study Title *
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value
                })
              }
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[color:var(--bright-red)] focus:outline-none"
              placeholder="Optimizing Last-Mile Delivery with AI"
              required />

          </div>

          <ImageUploadField
            value={form.image}
            onChange={(url) =>
              setForm({
                ...form,
                image: url
              })
            }
            label="Project Thumbnail *" />


          <RichTextEditor
            value={form.overview}
            onChange={(val) =>
              setForm({
                ...form,
                overview: val
              })
            }
            label="Overview"
            placeholder="Project overview..." />

          <RichTextEditor
            value={form.challenge}
            onChange={(val) =>
              setForm({
                ...form,
                challenge: val
              })
            }
            label="The Challenge"
            placeholder="What was the problem?..." />

          <RichTextEditor
            value={form.solution}
            onChange={(val) =>
              setForm({
                ...form,
                solution: val
              })
            }
            label="The Solution"
            placeholder="How did we solve it?..." />

          <RichTextEditor
            value={form.results}
            onChange={(val) =>
              setForm({
                ...form,
                results: val
              })
            }
            label="The Results"
            placeholder="What were the outcomes?..." />


          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) =>
                  setForm({
                    ...form,
                    featured: e.target.checked
                  })
                }
                className="rounded border-white/10 bg-white/5 text-[color:var(--bright-red)] focus:ring-[color:var(--bright-red)]" />

              <span className="text-white">Feature this case study</span>
            </label>
          </div>
        </div>
      </ContentModal>
    </div>);
}