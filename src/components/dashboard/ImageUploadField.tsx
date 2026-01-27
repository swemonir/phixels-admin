import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
interface ImageUploadFieldProps {
  value: string;
  onChange: (url: string) => void;
  label: string;
}
export function ImageUploadField({
  value,
  onChange,
  label
}: ImageUploadFieldProps) {
  const [isDragging, setIsDragging] = useState(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // In production, handle file upload here
    const mockUrl =
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80';
    onChange(mockUrl);
  };
  return (
    <div className="space-y-2">
      <label className="text-sm text-gray-400 font-medium">{label}</label>

      {value ?
      <div className="relative group">
          <img
          src={value}
          alt="Preview"
          className="w-full h-48 object-cover rounded-xl border border-white/10" />

          <button
          onClick={() => onChange('')}
          className="absolute top-2 right-2 p-2 rounded-lg bg-black/80 text-white opacity-0 group-hover:opacity-100 transition-opacity">

            <X size={16} />
          </button>
        </div> :

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${isDragging ? 'border-[color:var(--bright-red)] bg-[color:var(--bright-red)]/5' : 'border-white/10 hover:border-white/20'}`}>

          <ImageIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-400 mb-2">Drag & drop an image or</p>
          <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste image URL"
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[color:var(--bright-red)] focus:outline-none transition-colors" />

        </div>
      }
    </div>);

}