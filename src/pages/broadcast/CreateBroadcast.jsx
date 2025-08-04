import React, { useContext, useState } from 'react';
import {
  ArrowBack,
  ArrowForward,
  RocketLaunch,
  Save,
  Notifications,
  Search,
  Dashboard,
  Email,
  Campaign,
  Chat,
  AccountTree,
  People,
  SmartToy,
  BroadcastOnHome,
  Upload,
  Check,
} from '@mui/icons-material';
import { WhatsApp, Phone } from '@mui/icons-material';
import { ContentContext } from '../../context/ContextProvider';

const CreateBroadcast = () => {
  const { themeColor, secondaryThemeColor } = useContext(ContentContext)
  const [selectedChannel, setSelectedChannel] = useState('whatsapp');
  const [whatsappOption, setWhatsappOption] = useState('template');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [voiceContactSource, setVoiceContactSource] = useState('existing');
  const [voiceBotSelection, setVoiceBotSelection] = useState('existing');
  const [newVoiceBotName, setNewVoiceBotName] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [scheduleOption, setScheduleOption] = useState('now');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [selectedFlow, setSelectedFlow] = useState('');

  const steps = [
    { id: 1, name: 'Select Channel' },
    { id: 2, name: 'Options' },
    { id: 3, name: 'Configuration' },
    { id: 4, name: 'Review & Launch' },
  ];

  const whatsappTemplates = [
    { id: 1, name: 'Welcome Message', preview: 'Welcome to our service! We are here to help you.' },
    { id: 2, name: 'Order Confirmation', preview: 'Your order #{{order_id}} has been confirmed.' },
    { id: 3, name: 'Product Inquiry', preview: 'Thank you for your interest in {{product_name}}.' },
  ];

  const getTemplatePreview = () => {
    return selectedTemplate
      ? whatsappTemplates.find((template) => template.id === selectedTemplate)?.preview
      : '';
  };

  const selectChannel = (channel) => {
    setSelectedChannel(channel);
  };

  const nextStep = () => {
    if (canProceed()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    return true;
  };

  const launchBroadcast = () => {
    alert('Broadcast launched successfully.');
  };

  const saveDraft = () => {
    alert('Broadcast saved as draft.');
  };

  return (
    <div className="mt-16 bg-gray-50">

      <div className="flex">
        {/* Main Content */}
        <main className="flex-1 bg-white">
          <div className="p-3">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Broadcast Campaign</h1>
              <p className="text-gray-600">Launch WhatsApp and Voice broadcasts to engage your audience</p>
            </div>

            {/* Progress Steps */}
            <div className="mb-8">
              <div className="hidden md:flex items-center justify-between mb-4">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${currentStep >= index + 1 ? 'text-white' : 'bg-gray-200 text-gray-600'
                        }`}
                      style={
                        currentStep >= index + 1
                          ? { backgroundColor: themeColor }
                          : {}
                      }
                    >
                      <span>{index + 1}</span>
                    </div>
                    <span
                      className={`ml-2 text-sm font-medium ${currentStep >= index + 1 ? '' : 'text-gray-500'
                        }`}
                      style={
                        currentStep >= index + 1
                          ? { color: themeColor }
                          : {}
                      }
                    >
                      {step.name}
                    </span>
                    {index < steps.length - 1 && (
                      <div
                        className="w-16 h-0.5 mx-4"
                        style={{
                          backgroundColor: currentStep > index + 1 ? themeColor : '#E5E7EB',
                        }}
                      ></div>
                    )}
                  </div>

                ))}
              </div>
            </div>

            {/* Step Content */}
            <div className="min-h-[300px]">
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Select Broadcast Channel</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div
                      onClick={() => selectChannel('whatsapp')}
                      className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${selectedChannel === 'whatsapp' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center">
                          <WhatsApp className="text-white text-2xl" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">WhatsApp Broadcast</h3>
                          <p className="text-gray-600">Send template messages to your WhatsApp contacts</p>
                        </div>
                      </div>
                    </div>

                    <div
                      onClick={() => selectChannel('voice')}
                      className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${selectedChannel === 'voice' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-orange-500 rounded-lg flex items-center justify-center">
                          <Phone className="text-white text-2xl" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Voice Broadcast</h3>
                          <p className="text-gray-600">Launch automated voice calls with IVR flows</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && selectedChannel === 'whatsapp' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">WhatsApp Broadcast Options</h2>

                  <div className="space-y-4">
                    <label className="flex items-start space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        checked={whatsappOption === 'template'}
                        onChange={() => setWhatsappOption('template')}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">Send Template Message</div>
                        <div className="text-sm text-gray-600 mt-1">
                          Use pre-approved WhatsApp message templates
                        </div>
                      </div>
                    </label>

                    {whatsappOption === 'template' && (
                      <div className="ml-6 space-y-4">
                        <select
                          value={selectedTemplate}
                          onChange={(e) => setSelectedTemplate(Number(e.target.value))}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        >
                          <option value="">Select a template</option>
                          {whatsappTemplates.map((template) => (
                            <option key={template.id} value={template.id}>
                              {template.name}
                            </option>
                          ))}
                        </select>

                        {selectedTemplate && (
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium text-gray-900 mb-2">Template Preview</h4>
                            <div className="bg-white p-3 rounded border text-sm">{getTemplatePreview()}</div>
                          </div>
                        )}
                      </div>
                    )}

                    <label className="flex items-start space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        checked={whatsappOption === 'active'}
                        onChange={() => setWhatsappOption('active')}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">Send to Active Contacts</div>
                        <div className="text-sm text-gray-600 mt-1">
                          Target contacts who messaged in the last 24 hours
                        </div>
                      </div>
                    </label>

                    {whatsappOption === 'active' && (
                      <div className="ml-6 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <select className="border border-gray-300 rounded-lg px-3 py-2">
                            <option>Filter by tags</option>
                            <option>VIP Customers</option>
                            <option>New Leads</option>
                          </select>
                          <select className="border border-gray-300 rounded-lg px-3 py-2">
                            <option>All Languages</option>
                            <option>English</option>
                            <option>Spanish</option>
                          </select>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <span className="text-sm text-blue-800">Estimated contacts: 1,247</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {currentStep === 2 && selectedChannel === 'voice' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Voice Broadcast Options</h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Contact Source</label>
                      <div className="space-y-3">
                        <label className="flex items-center space-x-3">
                          <input
                            type="radio"
                            checked={voiceContactSource === 'existing'}
                            onChange={() => setVoiceContactSource('existing')}
                            className="text-blue-600"
                          />
                          <span>Use existing portal contacts</span>
                        </label>
                        {voiceContactSource === 'existing' && (
                          <div className="ml-6">
                            <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                              <option>All Contacts</option>
                              <option>VIP Customers (234)</option>
                              <option>New Leads (456)</option>
                            </select>
                          </div>
                        )}

                        <label className="flex items-center space-x-3">
                          <input
                            type="radio"
                            checked={voiceContactSource === 'upload'}
                            onChange={() => setVoiceContactSource('upload')}
                            className="text-blue-600"
                          />
                          <span>Upload CSV file</span>
                        </label>
                        {voiceContactSource === 'upload' && (
                          <div className="ml-6">
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                              <Upload className="text-gray-400 text-2xl mb-2" />
                              <p className="text-gray-600">Drop CSV file here or click to browse</p>
                              <input type="file" className="hidden" accept=".csv" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Voice Bot Selection</label>

                      <div className="space-y-4">
                        <label className="flex items-center space-x-3">
                          <input
                            type="radio"
                            checked={voiceBotSelection === 'existing'}
                            onChange={() => setVoiceBotSelection('existing')}
                            className="text-blue-600"
                          />
                          <span>Use existing voice bot</span>
                        </label>
                        {voiceBotSelection === 'existing' && (
                          <div className="ml-6">
                            <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                              <option>Bot 1</option>
                              <option>Bot 2</option>
                              <option>Bot 3</option>
                            </select>
                          </div>
                        )}

                        <label className="flex items-center space-x-3">
                          <input
                            type="radio"
                            checked={voiceBotSelection === 'new'}
                            onChange={() => setVoiceBotSelection('new')}
                            className="text-blue-600"
                          />
                          <span>Create new voice bot</span>
                        </label>
                        {voiceBotSelection === 'new' && (
                          <div className="ml-6">
                            <input
                              type="text"
                              value={newVoiceBotName}
                              onChange={(e) => setNewVoiceBotName(e.target.value)}
                              placeholder="Enter bot name"
                              className="w-full border border-gray-300 rounded-lg px-3 py-2"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Broadcast Configuration</h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Schedule</label>
                      <div className="space-y-3">
                        <label className="flex items-center space-x-3">
                          <input
                            type="radio"
                            checked={scheduleOption === 'now'}
                            onChange={() => setScheduleOption('now')}
                            className="text-blue-600"
                          />
                          <span>Send Now</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input
                            type="radio"
                            checked={scheduleOption === 'later'}
                            onChange={() => setScheduleOption('later')}
                            className="text-blue-600"
                          />
                          <span>Schedule Later</span>
                        </label>
                        {scheduleOption === 'later' && (
                          <div className="ml-6 grid grid-cols-2 gap-4">
                            <input
                              type="date"
                              value={scheduledDate}
                              onChange={(e) => setScheduledDate(e.target.value)}
                              className="border border-gray-300 rounded-lg px-3 py-2"
                            />
                            <input
                              type="time"
                              value={scheduledTime}
                              onChange={(e) => setScheduledTime(e.target.value)}
                              className="border border-gray-300 rounded-lg px-3 py-2"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Flow Selection</label>
                      <select
                        value={selectedFlow}
                        onChange={(e) => setSelectedFlow(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      >
                        <option value="">Select a flow</option>
                        <option value="welcome">Welcome Flow</option>
                        <option value="support">Support Flow</option>
                        <option value="feedback">Feedback Collection</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Review & Launch</h2>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Broadcast Summary</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Channel:</span>
                        <span className="font-medium">
                          {selectedChannel === 'whatsapp' ? 'WhatsApp' : 'Voice'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium">
                          {selectedChannel === 'whatsapp'
                            ? whatsappOption === 'template'
                              ? 'Template Message'
                              : 'Active Contacts'
                            : 'Voice Broadcast'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Schedule:</span>
                        <span className="font-medium">
                          {scheduleOption === 'now'
                            ? 'Send Now'
                            : `Schedule for ${scheduledDate} at ${scheduledTime}`}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Estimated Contacts:</span>
                        <span className="font-medium">1,247</span>
                      </div>
                    </div>
                  </div>

                  <div className="md:flex md:space-x-4 items-center">
                    <button
                      onClick={launchBroadcast}
                      className="bg-green-600 w-full md:w-auto text-white px-6 py-3 h-12 rounded-lg font-medium hover:bg-green-700"
                    >
                      <RocketLaunch className="mr-2" /> Launch Broadcast
                    </button>
                    <button
                      onClick={saveDraft}
                      className="w-full h-12 md:w-auto mt-3 md:mt-0 text-white px-6 py-3 rounded-lg font-medium"
                      style={{ backgroundColor: themeColor }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = secondaryThemeColor;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = themeColor;
                      }}
                    >
                      <Save className="mr-2" /> Save as Draft
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Navigation Buttons */}
      <div className="md:flex justify-between pt-6 border-t border-gray-200 px-8 pb-8">
        {currentStep > 1 && (
          <button
            onClick={previousStep}
            className="w-full md:w-auto text-white px-6 py-2 rounded-lg"
            style={{ backgroundColor: themeColor }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = secondaryThemeColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = themeColor;
            }}
          >
            <ArrowBack className="mr-2" /> Previous
          </button>
        )}
        {currentStep === 1 && <div></div>}

        {currentStep < 4 && (
          <button
            onClick={nextStep}
            disabled={!canProceed()}
            // className={`text-white w-full md:w-auto mt-3 md:mt-0 px-6 py-2 rounded-lg ${canProceed() ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
            //   }`}
            className={`text-white w-full md:w-auto mt-3 md:mt-0 px-6 py-2 rounded-lg ${canProceed() ? '' : 'bg-gray-400 cursor-not-allowed'
              }`}
            style={
              canProceed()
                ? {
                  backgroundColor: themeColor,
                  transition: 'background-color 0.3s ease',
                }
                : {}
            }
            onMouseEnter={(e) => {
              if (canProceed()) e.currentTarget.style.backgroundColor = secondaryThemeColor;
            }}
            onMouseLeave={(e) => {
              if (canProceed()) e.currentTarget.style.backgroundColor = themeColor;
            }}
          >
            Next <ArrowForward className="ml-2" />
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateBroadcast;