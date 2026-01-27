import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  AlertTriangle,
  ArrowRight,
  MousePointer,
  Clock,
  Users,
  Calendar,
  AlertCircle } from
'lucide-react';
interface DropOffsModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export function DropOffsModal({ isOpen, onClose }: DropOffsModalProps) {
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm" />


        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
            y: 20
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0
          }}
          exit={{
            opacity: 0,
            scale: 0.95,
            y: 20
          }}
          className="relative w-full max-w-4xl bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">

          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10 bg-gradient-to-r from-[color:var(--bright-red)]/10 to-transparent">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[color:var(--bright-red)]/20 text-[color:var(--bright-red)]">
                <AlertCircle size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  Critical Drop-off Analysis
                </h2>
                <p className="text-sm text-gray-400">
                  Master Popup Funnel & Form Performance
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors">

              <X size={20} />
            </button>
          </div>

          <div className="p-6 overflow-y-auto max-h-[80vh]">
            {/* Master Popup Funnel */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <Users size={16} className="text-blue-500" />
                Master Popup Funnel (Last 30 Days)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Step 1: Viewed */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 relative overflow-hidden">
                  <div className="text-sm text-gray-400 mb-1">Popup Views</div>
                  <div className="text-2xl font-bold text-white">1,245</div>
                  <div className="mt-2 text-xs text-gray-500">
                    Total impressions
                  </div>
                  <div className="absolute right-0 top-0 bottom-0 w-1 bg-blue-500/50" />
                </div>

                {/* Step 2: Started (Step 1) */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 relative overflow-hidden">
                  <div className="text-sm text-gray-400 mb-1">
                    Step 1 Completed
                  </div>
                  <div className="text-2xl font-bold text-white">142</div>
                  <div className="mt-2 text-xs flex items-center gap-1 text-[color:var(--vibrant-green)]">
                    11.4% Conversion
                  </div>
                  <div className="absolute right-0 top-0 bottom-0 w-1 bg-yellow-500/50" />
                </div>

                {/* Step 3: Booked (Step 2) */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 relative overflow-hidden">
                  <div className="text-sm text-gray-400 mb-1">
                    Meeting Booked
                  </div>
                  <div className="text-2xl font-bold text-white">114</div>
                  <div className="mt-2 text-xs flex items-center gap-1 text-[color:var(--vibrant-green)]">
                    80.2% Completion Rate
                  </div>
                  <div className="absolute right-0 top-0 bottom-0 w-1 bg-[color:var(--vibrant-green)]/50" />
                </div>
              </div>

              {/* Visual Flow */}
              <div className="mt-4 flex items-center justify-between px-10 relative">
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/5 -z-10" />
                <div className="bg-[#0A0A0A] px-2 text-xs text-gray-500">
                  1,245 Views
                </div>
                <div className="bg-[#0A0A0A] px-2 text-xs text-[color:var(--bright-red)] font-bold flex items-center gap-1">
                  <AlertTriangle size={12} />
                  88.6% Drop-off
                </div>
                <div className="bg-[#0A0A0A] px-2 text-xs text-gray-500">
                  142 Leads
                </div>
                <div className="bg-[#0A0A0A] px-2 text-xs text-yellow-500 font-bold flex items-center gap-1">
                  <Clock size={12} />
                  19.8% Pending
                </div>
                <div className="bg-[#0A0A0A] px-2 text-xs text-[color:var(--vibrant-green)] font-bold">
                  114 Booked
                </div>
              </div>
            </div>

            {/* Critical Alerts */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                <AlertTriangle
                  size={16}
                  className="text-[color:var(--bright-red)]" />

                Critical Situations Required Attention
              </h3>

              <div className="p-4 rounded-xl bg-[color:var(--bright-red)]/10 border border-[color:var(--bright-red)]/20 flex items-start gap-4">
                <div className="p-2 rounded-lg bg-[color:var(--bright-red)]/20 text-[color:var(--bright-red)] shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white">
                    28 Leads Stuck at Step 1
                  </h4>
                  <p className="text-sm text-gray-400 mt-1">
                    These users filled out their details but did not book a
                    meeting. They are high-intent leads.
                  </p>
                  <button className="mt-3 text-xs font-bold text-[color:var(--bright-red)] hover:text-white transition-colors flex items-center gap-1">
                    View Pending Leads <ArrowRight size={12} />
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-start gap-4">
                <div className="p-2 rounded-lg bg-yellow-500/20 text-yellow-500 shrink-0">
                  <MousePointer size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white">
                    High Bounce Rate on Contact Form
                  </h4>
                  <p className="text-sm text-gray-400 mt-1">
                    65% of users who open the contact page leave without sending
                    a message. Consider simplifying the form.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-start gap-4">
                <div className="p-2 rounded-lg bg-blue-500/20 text-blue-500 shrink-0">
                  <Calendar size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white">
                    3 Job Applications Pending Review
                  </h4>
                  <p className="text-sm text-gray-400 mt-1">
                    Applications older than 7 days require immediate attention.
                  </p>
                  <button className="mt-3 text-xs font-bold text-blue-500 hover:text-white transition-colors flex items-center gap-1">
                    Review Applications <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>);

}