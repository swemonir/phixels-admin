import React, { useState, useEffect } from 'react';
import { Plus, Users, MapPin, Briefcase } from 'lucide-react';
import { DataTable } from '../../components/dashboard/DataTable';
import { ContentModal } from '../../components/dashboard/ContentModal';
import { ManagementStatsCard } from '../../components/dashboard/ManagementStatsCard';
import { RichTextEditor } from '../../components/dashboard/RichTextEditor';
import { careersApi } from '../../services/api';
import type { Career } from '../../types/types';

interface CareerDisplay extends Career {
  id: string;
}

export function CareersManagement() {
  const [jobs, setJobs] = useState<CareerDisplay[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<CareerDisplay | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    jobTitle: '',
    jobType: 'Full-time',
    location: 'Remote',
    description: '',
    requirements: [] as string[],
  });
  const [reqInput, setReqInput] = useState('');

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await careersApi.getAll();
      const displayData = data.map(c => ({
        ...c,
        id: c._id || c.id || '',
      }));
      setJobs(displayData);
    } catch (err: any) {
      console.error('Error fetching careers:', err);
      setError(err.message || 'Failed to load careers');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (job: CareerDisplay) => {
    setEditingJob(job);
    setFormData({
      jobTitle: job.jobTitle,
      jobType: job.jobType,
      location: job.location,
      description: job.description,
      requirements: job.requirements,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (job: CareerDisplay) => {
    if (confirm(`Delete job "${job.jobTitle}"?`)) {
      setJobs(jobs.filter((j) => j.id !== job.id));
    }
  };

  const handleSave = async () => {
    try {
      setError(null);
      if (editingJob) {
        setJobs(
          jobs.map((j) =>
            j.id === editingJob.id
              ? { ...editingJob, ...formData }
              : j
          )
        );
      } else {
        const newCareer = await careersApi.create(formData);
        const displayCareer = {
          ...newCareer,
          id: newCareer._id || newCareer.id || Date.now().toString(),
        };
        setJobs([...jobs, displayCareer]);
      }
      handleCloseModal();
    } catch (err: any) {
      console.error('Error saving career:', err);
      setError(err.message || 'Failed to save career');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingJob(null);
    setFormData({
      jobTitle: '',
      jobType: 'Full-time',
      location: 'Remote',
      description: '',
      requirements: [],
    });
    setReqInput('');
  };

  const addRequirement = () => {
    if (reqInput.trim()) {
      setFormData({
        ...formData,
        requirements: [...formData.requirements, reqInput.trim()],
      });
      setReqInput('');
    }
  };

  const removeRequirement = (index: number) => {
    setFormData({
      ...formData,
      requirements: formData.requirements.filter((_, i) => i !== index),
    });
  };

  const columns = [
    {
      key: 'jobTitle',
      label: 'Job Title',
      render: (value: string) => (
        <span className="font-bold text-white">{value}</span>
      ),
    },
    {
      key: 'jobType',
      label: 'Type',
      render: (value: string) => (
        <span className="px-2 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold">
          {value}
        </span>
      ),
    },
    {
      key: 'location',
      label: 'Location',
      render: (value: string) => (
        <span className="flex items-center gap-1 text-gray-300">
          <MapPin size={14} /> {value}
        </span>
      ),
    },
    {
      key: 'description',
      label: 'Description',
      render: (value: string) => (
        <span className="text-gray-400 line-clamp-1">{value}</span>
      ),
    },
    {
      key: 'requirements',
      label: 'Requirements',
      render: (value: string[]) => (
        <span className="text-gray-400">{value.length} requirements</span>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white text-lg">Loading careers...</div>
      </div>
    );
  }

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

      {error && (
        <div className="bg-red-500/20 border border-red-500 rounded-xl p-4 text-red-400">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ManagementStatsCard
          title="Active Jobs"
          value={jobs.length}
          icon={Briefcase}
          color="from-green-500 to-emerald-500" />
        <ManagementStatsCard
          title="Total Postings"
          value={jobs.length}
          icon={Users}
          color="from-blue-500 to-cyan-500" />
        <ManagementStatsCard
          title="Locations"
          value={new Set(jobs.map((j) => j.location)).size}
          icon={MapPin}
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
              value={formData.jobTitle}
              onChange={(e) =>
                setFormData({ ...formData, jobTitle: e.target.value })
              }
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[color:var(--bright-red)] focus:outline-none"
              placeholder="Backend Engineer"
              required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-400 font-medium">
                Job Type *
              </label>
              <input
                type="text"
                value={formData.jobType}
                onChange={(e) =>
                  setFormData({ ...formData, jobType: e.target.value })
                }
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[color:var(--bright-red)] focus:outline-none"
                placeholder="Full-time"
                required />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400 font-medium">
                Location *
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[color:var(--bright-red)] focus:outline-none"
                placeholder="Remote"
                required />
            </div>
          </div>

          <RichTextEditor
            value={formData.description}
            onChange={(description) =>
              setFormData({ ...formData, description })
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
              {formData.requirements.map((req, i) => (
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
              ))}
            </div>
          </div>
        </div>
      </ContentModal>
    </div>
  );
}