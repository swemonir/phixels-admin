import React, { useState } from 'react';
import {
  Users,
  Clock,
  CheckCircle,
  Percent,
  Filter,
  Download,
  Search,
  MoreVertical,
  Mail,
  Phone,
  Calendar,
  Folder,
  MessageSquare,
  Briefcase,
  Eye } from
'lucide-react';
import { ManagementStatsCard } from '../../components/dashboard/ManagementStatsCard';
import { DataTable } from '../../components/dashboard/DataTable';
import { LeadDetailModal } from '../../components/dashboard/LeadDetailModal';
import { ContactDetailModal } from '../../components/dashboard/ContactDetailModal';
import { NewsletterDetailModal } from '../../components/dashboard/NewsletterDetailModal';
import { JobDetailModal } from '../../components/dashboard/JobDetailModal';
// --- MOCK DATA ---
const mockLeads = [
{
  id: 'REQ-001',
  timestamp: '2024-03-15 10:30 AM',
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1 555 0123',
  country: 'USA',
  budget: '$5k - $10k',
  status: 'Confirmed',
  meetingDate: '2024-03-20',
  meetingTime: '14:00',
  folderUrl: '#',
  description:
  'Need a full website redesign with 3D elements and modern animations.'
},
{
  id: 'REQ-002',
  timestamp: '2024-03-14 09:15 AM',
  name: 'Sarah Smith',
  email: 'sarah@example.com',
  phone: '+44 20 7123 4567',
  country: 'UK',
  budget: '$10k - $20k',
  status: 'Pending',
  meetingDate: '',
  meetingTime: '',
  folderUrl: '#',
  description: 'E-commerce platform for luxury fashion brand.'
},
{
  id: 'REQ-003',
  timestamp: '2024-03-14 02:45 PM',
  name: 'Mike Johnson',
  email: 'mike@tech.co',
  phone: '+1 555 9876',
  country: 'Canada',
  budget: '$20k+',
  status: 'Confirmed',
  meetingDate: '2024-03-22',
  meetingTime: '10:00',
  folderUrl: '#',
  description: 'Enterprise SaaS dashboard development.'
},
{
  id: 'REQ-004',
  timestamp: '2024-03-13 11:20 AM',
  name: 'Emma Wilson',
  email: 'emma@creative.io',
  phone: '+61 400 123 456',
  country: 'Australia',
  budget: '$5k - $10k',
  status: 'Confirmed',
  meetingDate: '2024-03-21',
  meetingTime: '16:00',
  folderUrl: '#',
  description: 'Portfolio site for photography studio.'
},
{
  id: 'REQ-005',
  timestamp: '2024-03-13 08:00 AM',
  name: 'David Lee',
  email: 'david@startup.com',
  phone: '+65 9123 4567',
  country: 'Singapore',
  budget: '$10k - $20k',
  status: 'Pending',
  meetingDate: '',
  meetingTime: '',
  folderUrl: '#',
  description: 'Mobile app UI/UX design for fintech startup.'
},
{
  id: 'REQ-006',
  timestamp: '2024-03-12 04:30 PM',
  name: 'Lisa Chen',
  email: 'lisa@agency.net',
  phone: '+86 139 1234 5678',
  country: 'China',
  budget: '$20k+',
  status: 'Confirmed',
  meetingDate: '2024-03-23',
  meetingTime: '09:00',
  folderUrl: '#',
  description: 'Corporate branding and website overhaul.'
},
{
  id: 'REQ-007',
  timestamp: '2024-03-12 01:15 PM',
  name: 'Tom Brown',
  email: 'tom@retail.co',
  phone: '+1 555 4321',
  country: 'USA',
  budget: '$5k - $10k',
  status: 'Pending',
  meetingDate: '',
  meetingTime: '',
  folderUrl: '#',
  description: 'Shopify store setup and customization.'
},
{
  id: 'REQ-008',
  timestamp: '2024-03-11 10:00 AM',
  name: 'Anna White',
  email: 'anna@blog.com',
  phone: '+44 7700 900123',
  country: 'UK',
  budget: '< $5k',
  status: 'Confirmed',
  meetingDate: '2024-03-24',
  meetingTime: '11:00',
  folderUrl: '#',
  description: 'Personal blog with newsletter integration.'
},
{
  id: 'REQ-009',
  timestamp: '2024-03-11 09:45 AM',
  name: 'James Green',
  email: 'james@green.energy',
  phone: '+49 151 12345678',
  country: 'Germany',
  budget: '$10k - $20k',
  status: 'Pending',
  meetingDate: '',
  meetingTime: '',
  folderUrl: '#',
  description: 'Website for renewable energy company.'
},
{
  id: 'REQ-010',
  timestamp: '2024-03-10 03:20 PM',
  name: 'Sophie Martin',
  email: 'sophie@fashion.fr',
  phone: '+33 6 12 34 56 78',
  country: 'France',
  budget: '$20k+',
  status: 'Confirmed',
  meetingDate: '2024-03-25',
  meetingTime: '15:00',
  folderUrl: '#',
  description: 'High-end fashion lookbook and store.'
},
{
  id: 'REQ-011',
  timestamp: '2024-03-10 11:00 AM',
  name: 'Ryan Scott',
  email: 'ryan@fitness.com',
  phone: '+1 555 8765',
  country: 'USA',
  budget: '$5k - $10k',
  status: 'Pending',
  meetingDate: '',
  meetingTime: '',
  folderUrl: '#',
  description: 'Gym membership portal and landing page.'
},
{
  id: 'REQ-012',
  timestamp: '2024-03-09 02:00 PM',
  name: 'Maria Garcia',
  email: 'maria@travel.es',
  phone: '+34 600 123 456',
  country: 'Spain',
  budget: '$10k - $20k',
  status: 'Confirmed',
  meetingDate: '2024-03-26',
  meetingTime: '13:00',
  folderUrl: '#',
  description: 'Travel agency booking system UI.'
},
{
  id: 'REQ-013',
  timestamp: '2024-03-09 09:30 AM',
  name: 'Kevin Kim',
  email: 'kevin@tech.kr',
  phone: '+82 10 1234 5678',
  country: 'South Korea',
  budget: '$20k+',
  status: 'Pending',
  meetingDate: '',
  meetingTime: '',
  folderUrl: '#',
  description: 'Blockchain platform frontend.'
},
{
  id: 'REQ-014',
  timestamp: '2024-03-08 04:45 PM',
  name: 'Rachel Adams',
  email: 'rachel@foodie.com',
  phone: '+1 555 2468',
  country: 'USA',
  budget: '$5k - $10k',
  status: 'Confirmed',
  meetingDate: '2024-03-27',
  meetingTime: '10:30',
  folderUrl: '#',
  description: 'Restaurant chain website with ordering system.'
},
{
  id: 'REQ-015',
  timestamp: '2024-03-08 10:15 AM',
  name: 'Omar Ahmed',
  email: 'omar@dubai.ae',
  phone: '+971 50 123 4567',
  country: 'UAE',
  budget: '$20k+',
  status: 'Confirmed',
  meetingDate: '2024-03-28',
  meetingTime: '12:00',
  folderUrl: '#',
  description: 'Real estate luxury property showcase.'
}];

const mockMessages = [
{
  id: 'MSG-001',
  timestamp: '2024-03-15 11:00 AM',
  name: 'Alice Brown',
  email: 'alice@design.studio',
  phone: '+1 555 1111',
  country: 'USA',
  message:
  'Hi, we are interested in partnering with Phixels for a long-term design contract. Do you offer white-label services?',
  status: 'Unread'
},
{
  id: 'MSG-002',
  timestamp: '2024-03-14 03:30 PM',
  name: 'Bob Wilson',
  email: 'bob@wilson.co',
  phone: '+44 7700 111222',
  country: 'UK',
  message:
  'I found a bug on your portfolio page on mobile Safari. Just wanted to let you know.',
  status: 'Read'
},
{
  id: 'MSG-003',
  timestamp: '2024-03-13 09:00 AM',
  name: 'Charlie Davis',
  email: 'charlie@startup.io',
  phone: '+1 555 2222',
  country: 'Canada',
  message:
  'Can you send me your updated rate card for 2024? We have a project coming up.',
  status: 'Unread'
},
{
  id: 'MSG-004',
  timestamp: '2024-03-12 02:15 PM',
  name: 'Diana Evans',
  email: 'diana@art.gallery',
  phone: '+61 400 333 444',
  country: 'Australia',
  message:
  'Love your work! Are you available for a small branding project next month?',
  status: 'Read'
},
{
  id: 'MSG-005',
  timestamp: '2024-03-11 10:45 AM',
  name: 'Ethan Hunt',
  email: 'ethan@mission.imp',
  phone: '+1 555 3333',
  country: 'USA',
  message:
  'Urgent inquiry regarding a security dashboard UI. Please call me back.',
  status: 'Unread'
},
{
  id: 'MSG-006',
  timestamp: '2024-03-10 05:00 PM',
  name: 'Fiona Gallagher',
  email: 'fiona@shameless.tv',
  phone: '+1 555 4444',
  country: 'USA',
  message: 'Do you guys do video editing as well or just web design?',
  status: 'Read'
},
{
  id: 'MSG-007',
  timestamp: '2024-03-09 11:30 AM',
  name: 'George Martin',
  email: 'george@books.com',
  phone: '+44 7700 555666',
  country: 'UK',
  message:
  'I need a landing page for my new book launch. Simple, clean, fast.',
  status: 'Read'
},
{
  id: 'MSG-008',
  timestamp: '2024-03-08 01:20 PM',
  name: 'Hannah Lee',
  email: 'hannah@music.kr',
  phone: '+82 10 9999 8888',
  country: 'South Korea',
  message: 'Collaboration proposal for K-pop fan site.',
  status: 'Unread'
},
{
  id: 'MSG-009',
  timestamp: '2024-03-07 09:10 AM',
  name: 'Ian Wright',
  email: 'ian@football.uk',
  phone: '+44 7700 777888',
  country: 'UK',
  message: 'Just saying hi! Great website.',
  status: 'Read'
},
{
  id: 'MSG-010',
  timestamp: '2024-03-06 04:50 PM',
  name: 'Jack Bauer',
  email: 'jack@ctu.gov',
  phone: '+1 555 5555',
  country: 'USA',
  message: 'I need a website built in 24 hours. Is that possible?',
  status: 'Read'
}];

const mockNewsletter = Array.from(
  {
    length: 25
  },
  (_, i) => ({
    id: `SUB-${i + 1}`,
    email: `subscriber${i + 1}@example.com`,
    timestamp: `2024-03-${15 - i % 15}`,
    status: i % 5 === 0 ? 'Unsubscribed' : 'Active'
  })
);
const mockJobs = [
{
  id: 'JOB-001',
  timestamp: '2024-03-15',
  name: 'Alex Designer',
  email: 'alex@design.com',
  portfolio: 'https://dribbble.com/alex',
  jobTitle: 'Senior UI Designer',
  resumeUrl: '#',
  status: 'New'
},
{
  id: 'JOB-002',
  timestamp: '2024-03-14',
  name: 'Sam Developer',
  email: 'sam@dev.io',
  portfolio: 'https://github.com/sam',
  jobTitle: 'Frontend Developer',
  resumeUrl: '#',
  status: 'Reviewing'
},
{
  id: 'JOB-003',
  timestamp: '2024-03-13',
  name: 'Jordan PM',
  email: 'jordan@pm.co',
  portfolio: 'https://linkedin.com/in/jordan',
  jobTitle: 'Product Manager',
  resumeUrl: '#',
  status: 'Shortlisted'
},
{
  id: 'JOB-004',
  timestamp: '2024-03-12',
  name: 'Casey Writer',
  email: 'casey@copy.net',
  portfolio: 'https://medium.com/@casey',
  jobTitle: 'Copywriter',
  resumeUrl: '#',
  status: 'Rejected'
},
{
  id: 'JOB-005',
  timestamp: '2024-03-11',
  name: 'Taylor Art',
  email: 'taylor@art.com',
  portfolio: 'https://behance.net/taylor',
  jobTitle: 'Art Director',
  resumeUrl: '#',
  status: 'New'
},
{
  id: 'JOB-006',
  timestamp: '2024-03-10',
  name: 'Morgan Motion',
  email: 'morgan@motion.tv',
  portfolio: 'https://vimeo.com/morgan',
  jobTitle: 'Motion Designer',
  resumeUrl: '#',
  status: 'Reviewing'
},
{
  id: 'JOB-007',
  timestamp: '2024-03-09',
  name: 'Riley UX',
  email: 'riley@ux.org',
  portfolio: 'https://riley.ux',
  jobTitle: 'UX Researcher',
  resumeUrl: '#',
  status: 'New'
},
{
  id: 'JOB-008',
  timestamp: '2024-03-08',
  name: 'Quinn Fullstack',
  email: 'quinn@stack.dev',
  portfolio: 'https://github.com/quinn',
  jobTitle: 'Fullstack Engineer',
  resumeUrl: '#',
  status: 'Shortlisted'
}];

export function LeadManagement() {
  const [activeTab, setActiveTab] = useState<
    'leads' | 'messages' | 'newsletter' | 'jobs'>(
    'leads');
  const [searchTerm, setSearchTerm] = useState('');
  // Modal States
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [selectedSubscriber, setSelectedSubscriber] = useState<any>(null);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  // --- COLUMNS CONFIGURATION ---
  const leadColumns = [
  {
    key: 'name',
    label: 'Client Details',
    render: (value: string, row: any) =>
    <div
      onClick={() => setSelectedLead(row)}
      className="cursor-pointer group">

          <div className="font-bold text-white group-hover:text-[color:var(--bright-red)] transition-colors">
            {value}
          </div>
          <div className="text-xs text-gray-400">{row.email}</div>
        </div>

  },
  {
    key: 'status',
    label: 'Status',
    render: (value: string, row: any) =>
    <span
      onClick={() => setSelectedLead(row)}
      className={`cursor-pointer px-2 py-1 rounded-full text-xs font-bold ${value === 'Confirmed' ? 'bg-[color:var(--vibrant-green)]/20 text-[color:var(--vibrant-green)]' : 'bg-yellow-500/20 text-yellow-500'}`}>

          {value}
        </span>

  },
  {
    key: 'budget',
    label: 'Budget',
    render: (value: string, row: any) =>
    <span
      onClick={() => setSelectedLead(row)}
      className="text-gray-300 font-medium cursor-pointer">

          {value}
        </span>

  },
  {
    key: 'meetingDate',
    label: 'Meeting',
    render: (value: string, row: any) =>
    <div onClick={() => setSelectedLead(row)} className="cursor-pointer">
          {value ?
      <div className="flex items-center gap-1 text-xs text-gray-300">
              <Calendar size={12} />
              {value} at {row.meetingTime}
            </div> :

      <span className="text-xs text-gray-500 italic">Not booked</span>
      }
        </div>

  },
  {
    key: 'folderUrl',
    label: 'Actions',
    render: (value: string, row: any) =>
    <div className="flex items-center gap-2">
          <button
        onClick={() => setSelectedLead(row)}
        className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
        title="View Details">

            <Eye size={16} />
          </button>
          <a
        href={value}
        target="_blank"
        rel="noreferrer"
        className="p-2 hover:bg-white/10 rounded-lg transition-colors text-blue-400">

            <Folder size={16} />
          </a>
        </div>

  }];

  const messageColumns = [
  {
    key: 'name',
    label: 'Sender',
    render: (value: string, row: any) =>
    <div
      onClick={() => setSelectedMessage(row)}
      className="cursor-pointer group">

          <div className="font-bold text-white group-hover:text-blue-500 transition-colors">
            {value}
          </div>
          <div className="text-xs text-gray-400">{row.email}</div>
        </div>

  },
  {
    key: 'message',
    label: 'Message Preview',
    render: (value: string, row: any) =>
    <div
      onClick={() => setSelectedMessage(row)}
      className="cursor-pointer text-sm text-gray-300 truncate max-w-[300px]">

          {value}
        </div>

  },
  {
    key: 'status',
    label: 'Status',
    render: (value: string, row: any) =>
    <span
      onClick={() => setSelectedMessage(row)}
      className={`cursor-pointer px-2 py-1 rounded-full text-xs font-bold ${value === 'Unread' ? 'bg-blue-500/20 text-blue-500' : 'bg-gray-500/20 text-gray-400'}`}>

          {value}
        </span>

  },
  {
    key: 'timestamp',
    label: 'Date',
    render: (value: string, row: any) =>
    <span
      onClick={() => setSelectedMessage(row)}
      className="cursor-pointer text-xs text-gray-500">

          {value}
        </span>

  }];

  const newsletterColumns = [
  {
    key: 'email',
    label: 'Subscriber Email',
    render: (value: string, row: any) =>
    <div
      onClick={() => setSelectedSubscriber(row)}
      className="cursor-pointer font-bold text-white hover:text-purple-500 transition-colors">

          {value}
        </div>

  },
  {
    key: 'status',
    label: 'Status',
    render: (value: string, row: any) =>
    <span
      onClick={() => setSelectedSubscriber(row)}
      className={`cursor-pointer px-2 py-1 rounded-full text-xs font-bold ${value === 'Active' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>

          {value}
        </span>

  },
  {
    key: 'timestamp',
    label: 'Subscribed Date',
    render: (value: string, row: any) =>
    <span
      onClick={() => setSelectedSubscriber(row)}
      className="cursor-pointer text-xs text-gray-500">

          {value}
        </span>

  }];

  const jobColumns = [
  {
    key: 'name',
    label: 'Applicant',
    render: (value: string, row: any) =>
    <div
      onClick={() => setSelectedJob(row)}
      className="cursor-pointer group">

          <div className="font-bold text-white group-hover:text-pink-500 transition-colors">
            {value}
          </div>
          <div className="text-xs text-gray-400">{row.jobTitle}</div>
        </div>

  },
  {
    key: 'portfolio',
    label: 'Portfolio',
    render: (value: string, row: any) =>
    <a
      href={value}
      target="_blank"
      rel="noreferrer"
      className="text-xs text-blue-400 hover:underline truncate max-w-[150px] block">

          {value}
        </a>

  },
  {
    key: 'status',
    label: 'Status',
    render: (value: string, row: any) => {
      let colorClass = 'bg-gray-500/20 text-gray-400';
      if (value === 'New') colorClass = 'bg-blue-500/20 text-blue-500';
      if (value === 'Shortlisted')
      colorClass = 'bg-green-500/20 text-green-500';
      if (value === 'Rejected') colorClass = 'bg-red-500/20 text-red-500';
      return (
        <span
          onClick={() => setSelectedJob(row)}
          className={`cursor-pointer px-2 py-1 rounded-full text-xs font-bold ${colorClass}`}>

            {value}
          </span>);

    }
  },
  {
    key: 'id',
    label: 'Action',
    render: (value: string, row: any) =>
    <button
      onClick={() => setSelectedJob(row)}
      className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white">

          <Eye size={16} />
        </button>

  }];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">
            Lead Management
          </h1>
          <p className="text-gray-400">Track and manage all form submissions</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all">
            <Download size={16} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <ManagementStatsCard
          title="Total Leads"
          value={142}
          icon={Users}
          color="from-blue-500 to-cyan-500" />

        <ManagementStatsCard
          title="Pending (Step 1)"
          value={28}
          icon={Clock}
          color="from-yellow-500 to-orange-500" />

        <ManagementStatsCard
          title="Confirmed (Step 2)"
          value={114}
          icon={CheckCircle}
          color="from-green-500 to-emerald-500" />

        <ManagementStatsCard
          title="Conversion Rate"
          value="80.2%"
          icon={Percent}
          color="from-purple-500 to-pink-500" />

      </div>

      {/* Tabs */}
      <div className="border-b border-white/10 flex gap-6 overflow-x-auto no-scrollbar">
        {[
        {
          id: 'leads',
          label: 'Project Requests',
          icon: Users
        },
        {
          id: 'messages',
          label: 'Contact Messages',
          icon: MessageSquare
        },
        {
          id: 'newsletter',
          label: 'Newsletter',
          icon: Mail
        },
        {
          id: 'jobs',
          label: 'Job Applications',
          icon: Briefcase
        }].
        map((tab) =>
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id as any)}
          className={`pb-4 flex items-center gap-2 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id ? 'border-[color:var(--bright-red)] text-white' : 'border-transparent text-gray-400 hover:text-white'}`}>

            <tab.icon size={16} />
            {tab.label}
          </button>
        )}
      </div>

      {/* Content Area */}
      <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden min-h-[400px]">
        {/* Toolbar */}
        <div className="p-4 border-b border-white/10 flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative w-full sm:w-64">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              size={16} />

            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[color:var(--bright-red)]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} />

          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-gray-300 hover:text-white">
              <Filter size={14} />
              Filter
            </button>
          </div>
        </div>

        {/* Table Views */}
        {activeTab === 'leads' &&
        <DataTable
          columns={leadColumns}
          data={mockLeads}
          searchable={false} />

        }

        {activeTab === 'messages' &&
        <DataTable
          columns={messageColumns}
          data={mockMessages}
          searchable={false} />

        }

        {activeTab === 'newsletter' &&
        <DataTable
          columns={newsletterColumns}
          data={mockNewsletter}
          searchable={false} />

        }

        {activeTab === 'jobs' &&
        <DataTable columns={jobColumns} data={mockJobs} searchable={false} />
        }
      </div>

      {/* Modals */}
      <LeadDetailModal
        isOpen={!!selectedLead}
        onClose={() => setSelectedLead(null)}
        lead={selectedLead} />

      <ContactDetailModal
        isOpen={!!selectedMessage}
        onClose={() => setSelectedMessage(null)}
        message={selectedMessage} />

      <NewsletterDetailModal
        isOpen={!!selectedSubscriber}
        onClose={() => setSelectedSubscriber(null)}
        subscriber={selectedSubscriber} />

      <JobDetailModal
        isOpen={!!selectedJob}
        onClose={() => setSelectedJob(null)}
        application={selectedJob} />

    </div>);

}