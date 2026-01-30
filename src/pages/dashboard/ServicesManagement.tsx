import { useState, useEffect } from 'react';
import { Plus, Wrench } from 'lucide-react';
import { DataTable } from '../../components/dashboard/DataTable';
import { ContentModal } from '../../components/dashboard/ContentModal';
import { ManagementStatsCard } from '../../components/dashboard/ManagementStatsCard';
import { servicesApi } from '../../services/api';
import type { Service } from '../../types/types';

interface ServiceDisplay extends Service {
    id: string;
}

export function ServicesManagement() {
    const [services, setServices] = useState<ServiceDisplay[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingService, setEditingService] = useState<ServiceDisplay | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        features: [] as string[],
    });
    const [featureInput, setFeatureInput] = useState('');

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await servicesApi.getAll();
            const displayData = data.map(s => ({
                ...s,
                id: s._id || '',
                features: s.features || []
            }));
            setServices(displayData);
        } catch (err: any) {
            console.error('Error fetching services:', err);
            setError(err.message || 'Failed to load services');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (service: ServiceDisplay) => {
        setEditingService(service);
        setFormData({
            title: service.title,
            description: service.description,
            features: service.features || [],
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (service: ServiceDisplay) => {
        if (!window.confirm(`Are you sure you want to delete "${service.title}"?`)) return;

        try {
            await servicesApi.delete(service.id);
            setServices(services.filter((s) => s.id !== service.id));
        } catch (err: any) {
            console.error('Error deleting service:', err);
            alert(err.message || 'Failed to delete service');
        }
    };

    const handleSave = async () => {
        try {
            setError(null);
            const payload = {
                title: formData.title,
                description: formData.description,
                features: formData.features
            };

            if (editingService) {
                await servicesApi.update(editingService.id, payload);
            } else {
                await servicesApi.create(payload);
            }
            fetchServices();
            handleCloseModal();
        } catch (err: any) {
            console.error('Error saving service:', err);
            setError(err.message || 'Failed to save service');
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingService(null);
        setFormData({
            title: '',
            description: '',
            features: [],
        });
        setFeatureInput('');
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

    const columns = [
        {
            key: 'title',
            label: 'Service Name',
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
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-white text-lg">Loading services...</div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2">
                        Services Management
                    </h1>
                    <p className="text-gray-400">
                        Manage your service offerings
                    </p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[color:var(--bright-red)] to-[color:var(--deep-red)] text-white font-bold hover:shadow-[0_0_20px_rgba(237,31,36,0.6)] transition-all">
                    <Plus size={20} />
                    Add Service
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
                    title="Total Services"
                    value={services.length}
                    icon={Wrench}
                    color="from-blue-500 to-cyan-500" />
                <ManagementStatsCard
                    title="Total Features"
                    value={services.reduce((sum, s) => sum + (s.features?.length || 0), 0)}
                    icon={Wrench}
                    color="from-green-500 to-emerald-500" />
                <ManagementStatsCard
                    title="Avg Features"
                    value={services.length > 0
                        ? (services.reduce((sum, s) => sum + (s.features?.length || 0), 0) / services.length).toFixed(1)
                        : '0'}
                    icon={Wrench}
                    color="from-purple-500 to-pink-500" />
            </div>

            {/* Data Table */}
            <DataTable
                columns={columns}
                data={services}
                onEdit={handleEdit}
                onDelete={handleDelete}
                searchable />

            {/* Add/Edit Modal */}
            <ContentModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={editingService ? 'Edit Service' : 'Add New Service'}
                onSave={handleSave}
                saveLabel={editingService ? 'Update' : 'Create'}>
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm text-gray-400 font-medium">
                            Service Name *
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) =>
                                setFormData({ ...formData, title: e.target.value })
                            }
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[color:var(--bright-red)] focus:outline-none transition-colors"
                            placeholder="Web Development"
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
                            placeholder="Building websites and web applications"
                            required />
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
                                    className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm flex items-center gap-2">
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
                </div>
            </ContentModal>
        </div>
    );
}
