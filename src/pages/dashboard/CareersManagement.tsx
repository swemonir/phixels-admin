import React, { useState } from 'react';
import { Plus, Users, MapPin, Briefcase } from 'lucide-react';
import { DataTable } from '../../components/dashboard/DataTable';
import { ContentModal } from '../../components/dashboard/ContentModal';
import { ManagementStatsCard } from '../../components/dashboard/ManagementStatsCard';
import { RichTextEditor } from '../../components/dashboard/RichTextEditor';
interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full Time' | 'Part Time' | 'Contract';
  description: string;
  requirements: string[];
  responsibilities: string[];
  salaryRange: string;
  status: 'active' | 'closed';
}
const mockJobs: Job[] = [
{
  id: '1',
  title: 'Senior React Native Engineer',
  department: 'Engineering',
  location: 'Remote',
  type: 'Full Time',
  description: 'We are looking for an experienced React Native developer...',
  requirements: [
  '5+ years React Native',
  'TypeScript expert',
  'CI/CD experience'],

  responsibilities: ['Build mobile apps', 'Code reviews', 'Mentor juniors'],
  salaryRange: '$120K - $180K',
  status: 'active'
}];

export function CareersManagement() {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full Time' as 'Full Time' | 'Part Time' | 'Contract',
    description: '',
    requirements: [] as string[],
    responsibilities: [] as string[],
    salaryRange: '',
    status: 'active' as 'active' | 'closed'
  });
  const [reqInput, setReqInput] = useState('');
  const [respInput, setRespInput] = useState('');
  const departments = [
  'Engineering',
  'Design',
  'Product',
  'Marketing',
  'Sales',
  'Operations'];

  const handleEdit = (job: Job) => {
    setEditingJob(job);
    setFormData(job);
    setIsModalOpen(true);
  };
  const handleDelete = (job: Job) => {
    if (confirm(`Delete job "${job.title}"?`)) {
      setJobs(jobs.filter((j) => j.id !== job.id));
    }
  };
  const handleSave = () => {
    if (editingJob) {
      setJobs(
        jobs.map((j) =>
        j.id === editingJob.id ?
        {
          ...formData,
          id: j.id
        } :
        j
        )
      );
    } else {
      setJobs([
      ...jobs,
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
    setEditingJob(null);
    setFormData({
      title: '',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full Time',
      description: '',
      requirements: [],
      responsibilities: [],
      salaryRange: '',
      status: 'active'
    });
    setReqInput('');
    setRespInput('');
  };
  const addRequirement = () => {
    if (reqInput.trim()) {
      setFormData({
        ...formData,
        requirements: [...formData.requirements, reqInput.trim()]
      });
      setReqInput('');
    }
  };
  const removeRequirement = (index: number) => {
    setFormData({
      ...formData,
      requirements: formData.requirements.filter((_, i) => i !== index)
    });
  };
  const addResponsibility = () => {
    if (respInput.trim()) {
      setFormData({
        ...formData,
        responsibilities: [...formData.responsibilities, respInput.trim()]
      });
      setRespInput('');
    }
  };
  const removeResponsibility = (index: number) => {
    setFormData({
      ...formData,
      responsibilities: formData.responsibilities.filter((_, i) => i !== index)
    });
  };
  const columns = [
  {
    key: 'title',
    label: 'Job Title',
    render: (value: string) =>
    <span className="font-bold text-white">{value}</span>

  },
  {
    key: 'department',
    label: 'Department',
    render: (value: string) =>
    <span className="px-2 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold">
          {value}
        </span>

  },
  {
    key: 'location',
    label: 'Location',
    render: (value: string) =>
    <span className="flex items-center gap-1 text-gray-300">
          <MapPin size={14} /> {value}
        </span>

  },
  {
    key: 'type',
    label: 'Type'
  },
  {
    key: 'status',
    label: 'Status',
    render: (value: string) =>
    <span
      className={`px-2 py-1 rounded-full text-xs font-bold ${value === 'active' ? 'bg-[color:var(--vibrant-green)]/20 text-[color:var(--vibrant-green)]' : 'bg-gray-500/20 text-gray-400'}`}>

          {value}
        </span>

  }];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Careers Management
          </h1>
          <p className="text-gray-400">Manage job postings and applications</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[color:var(--bright-red)] to-[color:var(--deep-red)] text-white font-bold hover:shadow-[0_0_20px_rgba(237,31,36,0.6)] transition-all">

          <Plus size={20} />
          Post Job
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ManagementStatsCard
          title="Active Jobs"
          value={jobs.filter((j) => j.status === 'active').length}
          icon={Briefcase}
          color="from-green-500 to-emerald-500" />

        <ManagementStatsCard
          title="Total Postings"
          value={jobs.length}
          icon={Users}
          color="from-blue-500 to-cyan-500" />

        <ManagementStatsCard
          title="Departments"
          value={new Set(jobs.map((j) => j.department)).size}
          icon={Briefcase}
          color="from-purple-500 to-pink-500" />

      </div>

      <DataTable
        columns={columns}
        data={jobs}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchable />


      <ContentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingJob ? 'Edit Job Posting' : 'Create New Job'}
        onSave={handleSave}
        saveLabel={editingJob ? 'Update' : 'Post Job'}>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm text-gray-400 font-medium">
              Job Title *
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
              placeholder="Senior React Native Engineer"
              required />

          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-400 font-medium">
                Department *
              </label>
              <select
                value={formData.department}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  department: e.target.value
                })
                }
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[color:var(--bright-red)] focus:outline-none">

                {departments.map((dept) =>
                <option key={dept} value={dept}>
                    {dept}
                  </option>
                )}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400 font-medium">
                Location *
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  location: e.target.value
                })
                }
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[color:var(--bright-red)] focus:outline-none"
                placeholder="Remote / Hybrid / On-site"
                required />

            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-400 font-medium">
                Employment Type *
              </label>
              <select
                value={formData.type}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  type: e.target.value as any
                })
                }
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[color:var(--bright-red)] focus:outline-none">

                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400 font-medium">
                Salary Range
              </label>
              <input
                type="text"
                value={formData.salaryRange}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  salaryRange: e.target.value
                })
                }
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[color:var(--bright-red)] focus:outline-none"
                placeholder="$120K - $180K" />

            </div>
          </div>

          <RichTextEditor
            value={formData.description}
            onChange={(description) =>
            setFormData({
              ...formData,
              description
            })
            }
            label="Job Description *"
            placeholder="Describe the role, team, and what makes this opportunity exciting..." />


          <div className="space-y-2">
            <label className="text-sm text-gray-400 font-medium">
              Requirements
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={reqInput}
                onChange={(e) => setReqInput(e.target.value)}
                onKeyPress={(e) =>
                e.key === 'Enter' && (e.preventDefault(), addRequirement())
                }
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[color:var(--bright-red)] focus:outline-none"
                placeholder="Add requirement (press Enter)" />

              <button
                type="button"
                onClick={addRequirement}
                className="px-4 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors">

                Add
              </button>
            </div>
            <div className="space-y-2 mt-2">
              {formData.requirements.map((req, i) =>
              <div
                key={i}
                className="flex items-center gap-2 p-2 bg-white/5 rounded-lg">

                  <span className="flex-1 text-white text-sm">{req}</span>
                  <button
                  type="button"
                  onClick={() => removeRequirement(i)}
                  className="text-red-500 hover:text-red-400">

                    ×
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400 font-medium">
              Responsibilities
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={respInput}
                onChange={(e) => setRespInput(e.target.value)}
                onKeyPress={(e) =>
                e.key === 'Enter' && (e.preventDefault(), addResponsibility())
                }
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[color:var(--bright-red)] focus:outline-none"
                placeholder="Add responsibility (press Enter)" />

              <button
                type="button"
                onClick={addResponsibility}
                className="px-4 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors">

                Add
              </button>
            </div>
            <div className="space-y-2 mt-2">
              {formData.responsibilities.map((resp, i) =>
              <div
                key={i}
                className="flex items-center gap-2 p-2 bg-white/5 rounded-lg">

                  <span className="flex-1 text-white text-sm">{resp}</span>
                  <button
                  type="button"
                  onClick={() => removeResponsibility(i)}
                  className="text-red-500 hover:text-red-400">

                    ×
                  </button>
                </div>
              )}
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
                    status: e.target.value as 'active' | 'closed'
                  })
                  } />

                <span className="text-white">Active</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="closed"
                  checked={formData.status === 'closed'}
                  onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as 'active' | 'closed'
                  })
                  } />

                <span className="text-white">Closed</span>
              </label>
            </div>
          </div>
        </div>
      </ContentModal>
    </div>);

}