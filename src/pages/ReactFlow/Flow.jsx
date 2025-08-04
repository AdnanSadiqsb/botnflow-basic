import React, { useContext, useState } from 'react';
import {
  Add,
  Search,
  KeyboardArrowDown,
  Apps,
  ViewList,
  Close,
  Edit,
  ContentCopy,
  Delete,
  Archive,
  SettingsBackupRestore,
  ChevronLeft,
  ChevronRight,
  Bolt,
  Code,
  Schedule,
  CalendarToday,
  Email,
  Phone,
  Chat,
  AccountCircle
} from '@mui/icons-material';
import { ContentContext } from '../../context/ContextProvider';

const FlowCard = ({ flow }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'archived':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getChannelIcon = (channel) => {
    switch (channel.toLowerCase()) {
      case 'whatsapp':
        return <WhatsAppIcon fontSize="small" className="mr-1" />;
      case 'email':
        return <Email fontSize="small" className="mr-1" />;
      case 'voice':
        return <Phone fontSize="small" className="mr-1" />;
      case 'webchat':
        return <Chat fontSize="small" className="mr-1" />;
      default:
        return null;
    }
  };

  const getTriggerIcon = (trigger) => {
    switch (trigger.toLowerCase()) {
      case 'incoming message':
        return <Bolt fontSize="small" className="mr-1" />;
      case 'api':
        return <Code fontSize="small" className="mr-1" />;
      case 'scheduled':
        return <Schedule fontSize="small" className="mr-1" />;
      case 'calendar event':
        return <CalendarToday fontSize="small" className="mr-1" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-4 border-b border-gray-100">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-lg mb-1">{flow.name}</h3>
          <div className="flex space-x-1">
            <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(flow.status)}`}>
              {flow.status}
            </span>
          </div>
        </div>
        <p className="text-gray-500 text-sm mb-3">Last modified: {flow.lastModified}</p>
        <div className="flex flex-wrap gap-2 mb-2">
          {flow.channels.map((channel, index) => (
            <span key={index} className={`${channel.color} text-xs px-2 py-1 rounded flex items-center`}>
              {getChannelIcon(channel.name)}
              {channel.name}
            </span>
          ))}
        </div>
        <div className="flex items-center text-sm text-gray-500">
          {getTriggerIcon(flow.trigger)}
          <span>Trigger: {flow.trigger}</span>
        </div>
      </div>
      <div className="px-4 py-3 bg-gray-50 flex justify-between items-center">
        <div className="flex items-center">
          {flow.creator.avatar ? (
            <img src={flow.creator.avatar} alt="Avatar" className="w-6 h-6 rounded-full mr-2" />
          ) : (
            <AccountCircle className="w-6 h-6 text-gray-400 mr-2" />
          )}
          <span className="text-sm text-gray-600">{flow.creator.name}</span>
        </div>
        <div className="flex space-x-2">
          <button className="text-gray-500 hover:text-primary-600" title="Edit">
            <Edit fontSize="small" />
          </button>
          <button className="text-gray-500 hover:text-primary-600" title="Duplicate">
            <ContentCopy fontSize="small" />
          </button>
          <button
            className="text-gray-500 hover:text-red-600"
            title="Delete"
            onClick={() => setShowDeleteModal(true)}
          >
            <Delete fontSize="small" />
          </button>
          {flow.status === 'Archived' ? (
            <button className="text-gray-500 hover:text-green-600" title="Restore">
              <SettingsBackupRestore fontSize="small" />
            </button>
          ) : (
            <button className="text-gray-500 hover:text-gray-700" title="Archive">
              <Archive fontSize="small" />
            </button>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black opacity-70"
            onClick={() => setShowDeleteModal(false)}
          ></div>

          <div
            className="bg-white rounded-lg max-w-md w-full p-6 relative z-50 mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Delete Flow</h3>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowDeleteModal(false)}
              >
                <Close />
              </button>
            </div>
            <p className="mb-6">Are you sure you want to delete this flow? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const WhatsAppIcon = ({ fontSize, className }) => (
  <span className={`${className}`}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={fontSize === 'small' ? '16' : '24'}
      height={fontSize === 'small' ? '16' : '24'}
      fill="currentColor"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  </span>
);

const Flow = () => {
  const { themeColor, secondaryThemeColor } = useContext(ContentContext)

  const flows = [
    {
      id: 1,
      name: "Welcome Sequence",
      status: "Active",
      lastModified: "May 15, 2023",
      channels: [
        { name: "WhatsApp", color: "bg-blue-100 text-blue-800" },
        { name: "Email", color: "bg-purple-100 text-purple-800" }
      ],
      trigger: "Incoming Message",
      creator: {
        name: "John Doe",
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
      }
    },
    {
      id: 2,
      name: "Support Ticket Workflow",
      status: "Draft",
      lastModified: "June 2, 2023",
      channels: [
        { name: "WhatsApp", color: "bg-blue-100 text-blue-800" },
        { name: "Voice", color: "bg-orange-100 text-orange-800" }
      ],
      trigger: "API",
      creator: {
        name: "Sarah Johnson",
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg"
      }
    },
    {
      id: 3,
      name: "Order Confirmation",
      status: "Active",
      lastModified: "June 10, 2023",
      channels: [
        { name: "Email", color: "bg-purple-100 text-purple-800" },
        { name: "Webchat", color: "bg-teal-100 text-teal-800" }
      ],
      trigger: "Scheduled",
      creator: {
        name: "Michael Chen",
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg"
      }
    },
    {
      id: 4,
      name: "Appointment Reminder",
      status: "Draft",
      lastModified: "June 5, 2023",
      channels: [
        { name: "WhatsApp", color: "bg-blue-100 text-blue-800" },
        { name: "Voice", color: "bg-orange-100 text-orange-800" }
      ],
      trigger: "Calendar Event",
      creator: {
        name: "Emily Wang",
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
      }
    },
    {
      id: 5,
      name: "Customer Feedback",
      status: "Archived",
      lastModified: "May 20, 2023",
      channels: [
        { name: "Email", color: "bg-purple-100 text-purple-800" }
      ],
      trigger: "Incoming Message",
      creator: {
        name: "Alex Rodriguez",
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg"
      }
    },
    {
      id: 6,
      name: "Lead Nurturing",
      status: "Active",
      lastModified: "June 12, 2023",
      channels: [
        { name: "WhatsApp", color: "bg-blue-100 text-blue-800" },
        { name: "Email", color: "bg-purple-100 text-purple-800" },
        { name: "Webchat", color: "bg-teal-100 text-teal-800" }
      ],
      trigger: "API",
      creator: {
        name: "Lisa Kim",
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg"
      }
    }
  ];

  return (
    <div className="bg-gray-50 font-sans text-gray-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Flows</h1>
          <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md flex items-center transition-all">
            <Add className="mr-2" />
            Create New Flow
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Search and Filters */}
        <section className="mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-grow">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search flows by name or tag"
                    className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              {/* Filter Buttons */}
              <div className="flex flex-wrap gap-2">
                {/* Channel Filter */}
                <div className="relative">
                  <button className="border border-gray-300 rounded-md px-3 py-2 bg-white flex items-center hover:bg-gray-50 transition-colors">
                    <span>Channel</span>
                    <KeyboardArrowDown className="ml-2 text-gray-500 text-xs" />
                  </button>
                </div>

                {/* Status Filter */}
                <div className="relative">
                  <button className="border border-gray-300 rounded-md px-3 py-2 bg-white flex items-center hover:bg-gray-50 transition-colors">
                    <span>Status</span>
                    <KeyboardArrowDown className="ml-2 text-gray-500 text-xs" />
                  </button>
                </div>

                {/* Created By Filter */}
                <div className="relative">
                  <button className="border border-gray-300 rounded-md px-3 py-2 bg-white flex items-center hover:bg-gray-50 transition-colors">
                    <span>Created By</span>
                    <KeyboardArrowDown className="ml-2 text-gray-500 text-xs" />
                  </button>
                </div>

                {/* Date Range Filter */}
                <div className="relative">
                  <button className="border border-gray-300 rounded-md px-3 py-2 bg-white flex items-center hover:bg-gray-50 transition-colors">
                    <span>Date Range</span>
                    <KeyboardArrowDown className="ml-2 text-gray-500 text-xs" />
                  </button>
                </div>

                {/* View Toggle */}
                <div className="relative ml-auto">
                  <div className="flex border border-gray-300 rounded-md overflow-hidden">
                    <button className="px-3 py-2  text-white flex items-center"
                      style={{ backgroundColor: themeColor }}
                    >
                      <Apps className="text-sm" />
                    </button>
                    <button className="px-3 py-2 bg-white hover:bg-gray-50 transition-colors flex items-center">
                      <ViewList className="text-sm text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Active Filters (Optional) */}
        <section className="mb-6">
          <div className="flex flex-wrap gap-2">
            <div className="bg-gray-100 rounded-full px-3 py-1 flex items-center text-sm">
              <span>Status: Active</span>
              <button className="ml-2 text-gray-500 hover:text-gray-700">
                <Close fontSize="small" />
              </button>
            </div>
            <div className="bg-gray-100 rounded-full px-3 py-1 flex items-center text-sm">
              <span>Channel: WhatsApp</span>
              <button className="ml-2 text-gray-500 hover:text-gray-700">
                <Close fontSize="small" />
              </button>
            </div>
          </div>
        </section>

        {/* Flow Grid */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {flows.map(flow => (
              <FlowCard key={flow.id} flow={flow} />
            ))}
          </div>
        </section>

        {/* Pagination */}
        <section className="md:flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Showing 1-6 of 24 flows
          </div>
          <div className="flex mt-3 md:mt-0">
            <button className="border border-gray-300 rounded-l-md px-3 py-1 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
              <ChevronLeft fontSize="small" />
            </button>
            <button style={{ backgroundColor: themeColor }} className="border-t border-b border-gray-300 px-3 py-1 text-white">1</button>
            <button className="border-t border-b border-gray-300 px-3 py-1 bg-white text-gray-700 hover:bg-gray-50">2</button>
            <button className="border-t border-b border-gray-300 px-3 py-1 bg-white text-gray-700 hover:bg-gray-50">3</button>
            <button className="border-t border-b border-gray-300 px-3 py-1 bg-white text-gray-700 hover:bg-gray-50">4</button>
            <button className="border border-gray-300 rounded-r-md px-3 py-1 bg-white text-gray-700 hover:bg-gray-50">
              <ChevronRight fontSize="small" />
            </button>
          </div>
        </section>

        {/* Empty State (Hidden when flows exist) */}
        <section className="flex flex-col items-center justify-center py-16 px-4">
          <div className="mb-6 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </div>
          <h2 className="text-xl font-medium text-gray-800 mb-2">No flows yet</h2>
          <p className="text-gray-600 mb-6 text-center max-w-md">Automate your first customer journey with a flow.</p>
          <button className="text-white px-4 py-2 rounded-md flex items-center transition-all"
            style={{ backgroundColor: themeColor }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = secondaryThemeColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = themeColor;
            }}
          >
            <Add className="mr-2" />
            Create New Flow
          </button>
        </section>
      </main>
    </div>
  );
};

export default Flow;