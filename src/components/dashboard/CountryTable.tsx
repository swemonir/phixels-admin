import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
const countries = [
{
  code: 'US',
  name: 'United States',
  visitors: '12,450',
  conversions: '850',
  rate: '6.8%',
  trend: 'up'
},
{
  code: 'GB',
  name: 'United Kingdom',
  visitors: '8,200',
  conversions: '620',
  rate: '7.5%',
  trend: 'up'
},
{
  code: 'CA',
  name: 'Canada',
  visitors: '5,100',
  conversions: '310',
  rate: '6.0%',
  trend: 'down'
},
{
  code: 'DE',
  name: 'Germany',
  visitors: '4,800',
  conversions: '290',
  rate: '6.0%',
  trend: 'neutral'
},
{
  code: 'AU',
  name: 'Australia',
  visitors: '3,200',
  conversions: '240',
  rate: '7.5%',
  trend: 'up'
}];

interface CountryTableProps {
  onRowClick?: (data: any) => void;
}
export function CountryTable({ onRowClick }: CountryTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/10 text-[10px] text-gray-500 uppercase tracking-wider">
            <th className="py-2 px-2 font-medium">Country</th>
            <th className="py-2 px-2 font-medium text-right">Visitors</th>
            <th className="py-2 px-2 font-medium text-right">Conv.</th>
            <th className="py-2 px-2 font-medium text-right">Rate</th>
            <th className="py-2 px-2 font-medium text-right">Trend</th>
          </tr>
        </thead>
        <tbody className="text-xs">
          {countries.map((country) =>
          <tr
            key={country.code}
            onClick={() => onRowClick && onRowClick(country)}
            className="border-b border-white/5 hover:bg-white/5 transition-colors group cursor-pointer">

              <td className="py-2 px-2">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-3.5 bg-gray-700 rounded-sm flex items-center justify-center text-[8px] text-gray-400">
                    {country.code}
                  </div>
                  <span className="text-gray-300 group-hover:text-white transition-colors">
                    {country.name}
                  </span>
                </div>
              </td>
              <td className="py-2 px-2 text-right text-gray-400 font-mono">
                {country.visitors}
              </td>
              <td className="py-2 px-2 text-right text-[color:var(--bright-red)] font-bold">
                {country.conversions}
              </td>
              <td className="py-2 px-2 text-right text-gray-300">
                {country.rate}
              </td>
              <td className="py-2 px-2 text-right">
                <div className="flex justify-end">
                  {country.trend === 'up' &&
                <ArrowUpRight
                  size={14}
                  className="text-[color:var(--vibrant-green)]" />

                }
                  {country.trend === 'down' &&
                <ArrowDownRight
                  size={14}
                  className="text-[color:var(--bright-red)]" />

                }
                  {country.trend === 'neutral' &&
                <Minus size={14} className="text-gray-600" />
                }
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>);

}