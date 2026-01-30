import { useState, useEffect } from 'react';
import { Plus, FileText, Link as LinkIcon, ExternalLink } from 'lucide-react';
import { DataTable } from '../../components/dashboard/DataTable';
import { ContentModal } from '../../components/dashboard/ContentModal';
import { ManagementStatsCard } from '../../components/dashboard/ManagementStatsCard';
import { ImageUploadField } from '../../components/dashboard/ImageUploadField';
import { RichTextEditor } from '../../components/dashboard/RichTextEditor';
import { caseStudiesApi } from '../../services/api';
import type { CaseStudy } from '../../types/types';

interface CaseStudyDisplay extends CaseStudy {
  id: string;
}

export function CaseStudiesManagement() {
  const [studies, setStudies] = useState<CaseStudyDisplay[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudy, setEditingStudy] = useState<CaseStudyDisplay | null>(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: '',
    client: '',
    category: 'Web Development',
    challenge: '',
    solution: '',
    result: '',
    image: '',
    link: ''
  });

  const categories = [
    'Web Development', 'Mobile App', 'UI/UX Design', 'Digital Marketing',
    'SEO', 'Content Writing', 'Consulting'
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
        category: s.category || 'Uncategorized',
        result: s.result || '',
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
      title: study.title,
      client: study.client,
      category: study.category,
      challenge: study.challenge,
      solution: study.solution,
      result: study.result,
      image: study.image,
      link: study.link
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
      const payload = {
        title: form.title,
        client: form.client,
        category: form.category,
        challenge: form.challenge,
        solution: form.solution,
        result: form.result,
        image: form.image,
        link: form.link
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
      category: 'Web Development',
      challenge: '',
      solution: '',
      result: '',
      image: '',
      link: ''
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
            </div>
            <div className="text-xs text-gray-400">{row.client}</div>
          </div>
        </div>

    },
    {
      key: 'category',
      label: 'Category',
      render: (value: string) =>
        <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold">
          {value || 'N/A'}
        </span>

    },
    {
      key: 'result',
      label: 'Result',
      render: (value: string) =>
        <div className="font-bold text-[color:var(--vibrant-green)] line-clamp-2" dangerouslySetInnerHTML={{ __html: value }} />
    },
    {
      key: 'link',
      label: 'Link',
      render: (value: string) => (
        value ? (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2 py-1 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors flex items-center gap-1 w-fit"
          >
            <ExternalLink size={14} /> Visit
          </a>
        ) : <span className="text-gray-600 text-xs">No Link</span>
      ),
    }
  ];

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

          <div className="space-y-2">
            <label className="text-sm text-gray-400 font-medium">
              Project Link
            </label>
            <div className="relative">
              <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="url"
                value={form.link}
                onChange={(e) =>
                  setForm({
                    ...form,
                    link: e.target.value
                  })
                }
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:border-[color:var(--bright-red)] focus:outline-none"
                placeholder="https://example.com/case-study"
              />
            </div>
          </div>


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
            value={form.result}
            onChange={(val) =>
              setForm({
                ...form,
                result: val
              })
            }
            label="The Results"
            placeholder="What were the outcomes?..." />

        </div>
      </ContentModal>
    </div>);
}