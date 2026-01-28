import { useState, useEffect } from 'react';
import { Briefcase } from 'lucide-react';
import { DataTable } from '../../components/dashboard/DataTable';
import { ManagementStatsCard } from '../../components/dashboard/ManagementStatsCard';
import { portfolioApi } from '../../services/api';
import type { PortfolioItem } from '../../types/types';

interface PortfolioDisplay extends PortfolioItem {
  id: string;
}

export function PortfolioManagement() {
  const [items, setItems] = useState<PortfolioDisplay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await portfolioApi.getAll();
      console.log(data);
      const displayData = data.map(p => ({
        ...p,
        id: p._id || p.id || '',
      }));
      setItems(displayData);
    } catch (err: any) {
      console.error('Error fetching portfolio:', err);
      setError(err.message || 'Failed to load portfolio');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      key: 'title',
      label: 'Project',
      render: (value: string, row: PortfolioDisplay) => (
        <div className="flex items-center gap-3">
          {row.image && (
            <img
              src={row.image}
              alt={value}
              className="w-12 h-12 rounded-lg object-cover" />
          )}
          <span className="font-bold text-white">{value}</span>
        </div>
      ),
    },
    {
      key: 'client',
      label: 'Client',
    },
    {
      key: 'category',
      label: 'Category',
      render: (value: string) => (
        <span className="px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-bold">
          {value}
        </span>
      ),
    },
    {
      key: 'stats',
      label: 'Key Metric',
    },
    {
      key: 'stack',
      label: 'Tech Stack',
      render: (value: string[]) => (
        <div className="flex flex-wrap gap-1">
          {value.slice(0, 3).map((tech, i) => (
            <span key={i} className="px-2 py-1 bg-white/10 rounded text-xs">
              {tech}
            </span>
          ))}
          {value.length > 3 && (
            <span className="text-xs text-gray-400">+{value.length - 3}</span>
          )}
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white text-lg">Loading portfolio...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Portfolio Management
          </h1>
          <p className="text-gray-400">View your project showcase</p>
          <p className="text-sm text-yellow-400 mt-1">
            Note: Portfolio is read-only from the API
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500 rounded-xl p-4 text-red-400">
          {error}
        </div>
      )}

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
        searchable />
    </div>
  );
}