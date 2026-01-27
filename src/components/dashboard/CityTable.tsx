import React from 'react';
import { MapPin } from 'lucide-react';
const cityData = [
{
  name: 'Dhaka',
  country: 'BD',
  visitors: 4521,
  conversion: '12.4%',
  trend: '+15%',
  funnel: [100, 60, 12]
},
{
  name: 'New York',
  country: 'US',
  visitors: 3210,
  conversion: '8.2%',
  trend: '+5%',
  funnel: [100, 45, 8]
},
{
  name: 'London',
  country: 'UK',
  visitors: 2105,
  conversion: '9.1%',
  trend: '+8%',
  funnel: [100, 50, 9]
},
{
  name: 'Toronto',
  country: 'CA',
  visitors: 1890,
  conversion: '7.5%',
  trend: '-2%',
  funnel: [100, 40, 7]
},
{
  name: 'Sydney',
  country: 'AU',
  visitors: 1200,
  conversion: '6.8%',
  trend: '+12%',
  funnel: [100, 35, 6]
},
{
  name: 'Berlin',
  country: 'DE',
  visitors: 980,
  conversion: '10.2%',
  trend: '+25%',
  funnel: [100, 55, 10]
}];

interface CityTableProps {
  onRowClick?: (data: any) => void;
}
export function CityTable({ onRowClick }: CityTableProps) {
  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-[10px] text-gray-500 uppercase tracking-wider">
              <th className="py-2 px-2 font-medium">City</th>
              <th className="py-2 px-2 font-medium text-right">Visitors</th>
              <th className="py-2 px-2 font-medium text-center">Funnel</th>
              <th className="py-2 px-2 font-medium text-right">Conv. Rate</th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {cityData.map((city) =>
            <tr
              key={city.name}
              onClick={() => onRowClick && onRowClick(city)}
              className="border-b border-white/5 hover:bg-white/5 transition-colors group cursor-pointer">

                <td className="py-2 px-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded bg-white/5 text-gray-500 group-hover:text-[color:var(--bright-red)] transition-colors">
                      <MapPin size={12} />
                    </div>
                    <div>
                      <div className="font-medium text-gray-300 group-hover:text-white">
                        {city.name}
                      </div>
                      <div className="text-[9px] text-gray-600">
                        {city.country}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-2 px-2 text-right">
                  <div className="font-mono text-gray-400">
                    {city.visitors.toLocaleString()}
                  </div>
                </td>
                <td className="py-2 px-2">
                  <div className="flex items-center justify-center gap-0.5 h-4">
                    {city.funnel.map((val, i) =>
                  <div
                    key={i}
                    className={`w-1.5 rounded-sm ${i === 0 ? 'bg-[color:var(--deep-navy)] h-full' : i === 1 ? 'bg-blue-800 h-3/4' : 'bg-[color:var(--bright-red)] h-1/2'}`}
                    title={`Stage ${i + 1}: ${val}%`} />

                  )}
                  </div>
                </td>
                <td className="py-2 px-2 text-right">
                  <span
                  className={`font-bold ${city.trend.startsWith('+') ? 'text-[color:var(--vibrant-green)]' : 'text-[color:var(--bright-red)]'}`}>

                    {city.conversion}
                  </span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>);

}