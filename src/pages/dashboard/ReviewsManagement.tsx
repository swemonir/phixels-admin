import React, { useState } from 'react';
import { Plus, Star } from 'lucide-react';
import { DataTable } from '../../components/dashboard/DataTable';
import { ContentModal } from '../../components/dashboard/ContentModal';
import { ManagementStatsCard } from '../../components/dashboard/ManagementStatsCard';
import { ImageUploadField } from '../../components/dashboard/ImageUploadField';
interface Review {
  id: string;
  name: string;
  role: string;
  image: string;
  rating: number;
  review: string;
  project: string;
  budget: string;
  duration: string;
  summary: string;
}
const mockReviews: Review[] = [
{
  id: '1',
  name: 'Sarah Mitchell',
  role: 'CEO, TechVenture Inc',
  image:
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&q=80',
  rating: 5,
  review:
  'Working with this team transformed our digital presence completely. They delivered a sophisticated e-commerce platform that increased our conversion rate by 145% within the first quarter. Their attention to detail and commitment to our success was exceptional.',
  project: 'E-commerce Platform Development',
  budget: '$35,000',
  duration: '3 months',
  summary:
  'Custom React-based e-commerce solution with advanced inventory management, payment gateway integration, and real-time analytics dashboard.'
},
{
  id: '2',
  name: 'Michael Chen',
  role: 'Founder, FinanceFlow',
  image:
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&q=80',
  rating: 5,
  review:
  'The mobile app they built exceeded all our expectations. The user experience is seamless, and our customer engagement has tripled since launch. They understood our vision perfectly and delivered a product that truly stands out in the market.',
  project: 'Financial Management Mobile App',
  budget: '$42,000',
  duration: '4 months',
  summary:
  'Cross-platform mobile application with secure authentication, real-time transaction tracking, budget planning tools, and comprehensive financial reporting.'
}];

export function ReviewsManagement() {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    image: '',
    rating: 5,
    review: '',
    project: '',
    budget: '',
    duration: '',
    summary: ''
  });
  const handleEdit = (review: Review) => {
    setEditingReview(review);
    setFormData(review);
    setIsModalOpen(true);
  };
  const handleDelete = (review: Review) => {
    if (confirm(`Delete review from "${review.name}"?`)) {
      setReviews(reviews.filter((r) => r.id !== review.id));
    }
  };
  const handleSave = () => {
    if (editingReview) {
      setReviews(
        reviews.map((r) =>
        r.id === editingReview.id ?
        {
          ...formData,
          id: r.id
        } :
        r
        )
      );
    } else {
      setReviews([
      ...reviews,
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
    setEditingReview(null);
    setFormData({
      name: '',
      role: '',
      image: '',
      rating: 5,
      review: '',
      project: '',
      budget: '',
      duration: '',
      summary: ''
    });
  };
  const columns = [
  {
    key: 'name',
    label: 'Reviewer',
    render: (value: string, row: Review) =>
    <div className="flex items-center gap-3">
          <img
        src={row.image}
        alt={value}
        className="w-12 h-12 rounded-full object-cover" />

          <div>
            <div className="font-bold text-white">{value}</div>
            <div className="text-xs text-gray-400">{row.role}</div>
          </div>
        </div>

  },
  {
    key: 'rating',
    label: 'Rating',
    render: (value: number) =>
    <div className="flex gap-1">
          {[...Array(5)].map((_, i) =>
      <Star
        key={i}
        size={14}
        className={
        i < value ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'
        } />

      )}
        </div>

  },
  {
    key: 'project',
    label: 'Project',
    render: (value: string) =>
    <span className="text-sm text-gray-300">{value}</span>

  },
  {
    key: 'budget',
    label: 'Budget',
    render: (value: string) =>
    <span className="font-bold text-[color:var(--vibrant-green)]">
          {value}
        </span>

  }];

  const averageRating =
  reviews.length > 0 ?
  (
  reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).
  toFixed(1) :
  '0.0';
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Reviews Management
          </h1>
          <p className="text-gray-400">
            Manage client testimonials and reviews
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[color:var(--bright-red)] to-[color:var(--deep-red)] text-white font-bold hover:shadow-[0_0_20px_rgba(237,31,36,0.6)] transition-all">

          <Plus size={20} />
          Add Review
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ManagementStatsCard
          title="Total Reviews"
          value={reviews.length}
          icon={Star}
          color="from-yellow-500 to-orange-500" />

        <ManagementStatsCard
          title="Average Rating"
          value={averageRating}
          icon={Star}
          color="from-green-500 to-emerald-500" />

        <ManagementStatsCard
          title="5-Star Reviews"
          value={reviews.filter((r) => r.rating === 5).length}
          icon={Star}
          color="from-purple-500 to-pink-500" />

      </div>

      <DataTable
        columns={columns}
        data={reviews}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchable />


      <ContentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingReview ? 'Edit Review' : 'Add New Review'}
        onSave={handleSave}
        saveLabel={editingReview ? 'Update' : 'Create'}>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-400 font-medium">
                Client Name *
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
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[color:var(--bright-red)] focus:outline-none"
                placeholder="Sarah Mitchell"
                required />

            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400 font-medium">
                Role/Company *
              </label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  role: e.target.value
                })
                }
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[color:var(--bright-red)] focus:outline-none"
                placeholder="CEO, TechVenture Inc"
                required />

            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400 font-medium">
              Rating *
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) =>
              <button
                key={star}
                type="button"
                onClick={() =>
                setFormData({
                  ...formData,
                  rating: star
                })
                }
                className="p-2 rounded-lg hover:bg-white/10 transition-colors">

                  <Star
                  size={24}
                  className={
                  star <= formData.rating ?
                  'fill-yellow-400 text-yellow-400' :
                  'text-gray-600'
                  } />

                </button>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400 font-medium">
              Review Text *
            </label>
            <textarea
              value={formData.review}
              onChange={(e) =>
              setFormData({
                ...formData,
                review: e.target.value
              })
              }
              rows={4}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[color:var(--bright-red)] focus:outline-none resize-none"
              placeholder="Write the client's review..."
              required />

          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-400 font-medium">
                Project Name *
              </label>
              <input
                type="text"
                value={formData.project}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  project: e.target.value
                })
                }
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[color:var(--bright-red)] focus:outline-none"
                placeholder="E-commerce Platform"
                required />

            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400 font-medium">
                Budget *
              </label>
              <input
                type="text"
                value={formData.budget}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  budget: e.target.value
                })
                }
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[color:var(--bright-red)] focus:outline-none"
                placeholder="$35,000"
                required />

            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400 font-medium">
                Duration *
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  duration: e.target.value
                })
                }
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[color:var(--bright-red)] focus:outline-none"
                placeholder="3 months"
                required />

            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400 font-medium">
              Project Summary *
            </label>
            <textarea
              value={formData.summary}
              onChange={(e) =>
              setFormData({
                ...formData,
                summary: e.target.value
              })
              }
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[color:var(--bright-red)] focus:outline-none resize-none"
              placeholder="Brief technical summary of the project..."
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
            label="Client Photo *" />

        </div>
      </ContentModal>
    </div>);

}