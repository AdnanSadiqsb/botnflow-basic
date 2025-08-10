import { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComments, faChartLine, faMessage, faBullhorn, faSitemap, faUsers, faRobot,
  faSearch, faBell, faChevronDown, faDownload, faSync, faEdit, faPlus, faTrash,
  faBrain, faTags, faComment, faBolt, faFlask, faTimes, faPlay
} from '@fortawesome/free-solid-svg-icons';
import { ContentContext } from '../../context/ContextProvider';
import IntentActionsEditor from './IntentActionsEditor';

const AIAgent = () => {
  const { themeColor, secondaryThemeColor } = useContext(ContentContext)
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [activeTab, setActiveTab] = useState('training');
  const [testMessage, setTestMessage] = useState('');
  const [testResults, setTestResults] = useState(null);
  const [showCreateIntent, setShowCreateIntent] = useState(false);
  const [showAddEntity, setShowAddEntity] = useState(false);
  const [showAddAction, setShowAddAction] = useState(false);

  const tabs = [
    { id: 'training', name: 'Training Data', icon: faBrain },
    { id: 'entities', name: 'Entities', icon: faTags },
    { id: 'responses', name: 'Responses', icon: faComment },
    { id: 'actions', name: 'Actions', icon: faBolt },
    { id: 'test', name: 'Test', icon: faFlask }
  ];

  const [intents, setIntents] = useState([
    {
      id: 1,
      name: 'Greeting',
      language: 'English',
      active: true,
      utterances: 12,
      trainingData: {
        en: [
          { text: 'Hello' },
          { text: 'Hi there' },
          { text: 'Good morning' }
        ]
      },
      entities: [
        { id: 1, name: 'time', type: 'datetime', sample: '9:00 AM' }
      ],
      responses: {
        en: { text: 'Hello! How can I help you today?', randomize: false }
      },
      actions: [
        { id: 1, name: 'Log Interaction', type: 'webhook', description: 'Log user greeting to analytics' }
      ]
    },
    {
      id: 2,
      name: 'Order Status',
      language: 'English',
      active: true,
      utterances: 8,
      trainingData: {
        en: [
          { text: 'Where is my order?' },
          { text: 'Check order status' }
        ]
      },
      entities: [
        { id: 2, name: 'order_id', type: 'custom', sample: 'ORD123456' }
      ],
      responses: {
        en: { text: 'Let me check your order status for {{order_id}}', randomize: false }
      },
      actions: []
    }
  ]);
    const [selectedIntent, setSelectedIntent] = useState(intents[0]);

  const [newIntent, setNewIntent] = useState({
    name: '',
    language: 'English',
    description: '',
    active: true
  });

  const [newEntity, setNewEntity] = useState({
    name: '',
    type: 'custom',
    sample: ''
  });

  const [newAction, setNewAction] = useState({
    name: '',
    type: 'webhook',
    description: ''
  });

  const filteredIntents = intents.filter(intent =>
    intent.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectIntent = (intent) => {
    setSelectedIntent(intent);
    setActiveTab('training');
  };

  const addUtterance = () => {
    if (!selectedIntent.trainingData[selectedLanguage]) {
      const updatedIntent = {
        ...selectedIntent,
        trainingData: {
          ...selectedIntent.trainingData,
          [selectedLanguage]: []
        }
      };
      setSelectedIntent(updatedIntent);
    }

    const updatedIntent = {
      ...selectedIntent,
      trainingData: {
        ...selectedIntent.trainingData,
        [selectedLanguage]: [
          ...(selectedIntent.trainingData[selectedLanguage] || []),
          { text: '' }
        ]
      }
    };

    setSelectedIntent(updatedIntent);
    updateIntentInList(updatedIntent);
  };

  const removeUtterance = (index) => {
    const updatedTrainingData = [...selectedIntent.trainingData[selectedLanguage]];
    updatedTrainingData.splice(index, 1);

    const updatedIntent = {
      ...selectedIntent,
      trainingData: {
        ...selectedIntent.trainingData,
        [selectedLanguage]: updatedTrainingData
      }
    };

    setSelectedIntent(updatedIntent);
    updateIntentInList(updatedIntent);
  };

  const updateUtterance = (index, value) => {
    const updatedTrainingData = [...selectedIntent.trainingData[selectedLanguage]];
    updatedTrainingData[index].text = value;

    const updatedIntent = {
      ...selectedIntent,
      trainingData: {
        ...selectedIntent.trainingData,
        [selectedLanguage]: updatedTrainingData
      }
    };

    setSelectedIntent(updatedIntent);
    updateIntentInList(updatedIntent);
  };

  const updateIntentInList = (updatedIntent) => {
    setIntents(intents.map(intent =>
      intent.id === updatedIntent.id ? updatedIntent : intent
    ));
  };

  const testIntent = () => {
    setTestResults({
      intent: selectedIntent.name,
      confidence: '95%',
      entities: 'None detected'
    });
  };

  const exportIntents = () => {
    alert('Exporting intents...');
  };

  const syncAndPublish = () => {
    alert('Syncing and publishing...');
  };

  const bulkEdit = () => {
    alert('Bulk editing intents...');
  };

  const createIntent = () => {
    const intent = {
      id: Date.now(),
      name: newIntent.name,
      language: newIntent.language,
      active: newIntent.active,
      utterances: 0,
      trainingData: { en: [], es: [], fr: [] },
      entities: [],
      responses: {
        en: { text: '', randomize: false },
        es: { text: '', randomize: false },
        fr: { text: '', randomize: false }
      },
      actions: []
    };

    setIntents([...intents, intent]);
    setShowCreateIntent(false);
    setNewIntent({ name: '', language: 'English', description: '', active: true });
    setSelectedIntent(intent);
  };

  const addEntity = () => {
    if (!selectedIntent) return;

    const entity = {
      id: Date.now(),
      name: newEntity.name,
      type: newEntity.type,
      sample: newEntity.sample
    };

    const updatedIntent = {
      ...selectedIntent,
      entities: [...selectedIntent.entities, entity]
    };

    setSelectedIntent(updatedIntent);
    updateIntentInList(updatedIntent);
    setShowAddEntity(false);
    setNewEntity({ name: '', type: 'custom', sample: '' });
  };

  const addAction = () => {
    if (!selectedIntent) return;

    const action = {
      id: Date.now(),
      name: newAction.name,
      type: newAction.type,
      description: newAction.description
    };

    const updatedIntent = {
      ...selectedIntent,
      actions: [...selectedIntent.actions, action]
    };

    setSelectedIntent(updatedIntent);
    updateIntentInList(updatedIntent);
    setShowAddAction(false);
    setNewAction({ name: '', type: 'webhook', description: '' });
  };

  const deleteIntent = (intentId) => {
    if (confirm('Are you sure you want to delete this intent?')) {
      setIntents(intents.filter(intent => intent.id !== intentId));
      if (selectedIntent?.id === intentId) {
        setSelectedIntent(null);
      }
    }
  };

  const toggleIntentActive = () => {
    const updatedIntent = {
      ...selectedIntent,
      active: !selectedIntent.active
    };

    setSelectedIntent(updatedIntent);
    updateIntentInList(updatedIntent);
  };

  const updateResponseText = (value) => {
    const updatedIntent = {
      ...selectedIntent,
      responses: {
        ...selectedIntent.responses,
        [selectedLanguage]: {
          ...selectedIntent.responses[selectedLanguage],
          text: value
        }
      }
    };

    setSelectedIntent(updatedIntent);
    updateIntentInList(updatedIntent);
  };

  const toggleRandomizeResponses = () => {
    const updatedIntent = {
      ...selectedIntent,
      responses: {
        ...selectedIntent.responses,
        [selectedLanguage]: {
          ...selectedIntent.responses[selectedLanguage],
          randomize: !selectedIntent.responses[selectedLanguage].randomize
        }
      }
    };

    setSelectedIntent(updatedIntent);
    updateIntentInList(updatedIntent);
  };

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Main Content */}
      <main className=" mt-16 p-3">
        <div className="md:flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">AI Agent Management</h1>
            <p className="text-gray-600">Build and manage conversational AI intents</p>
          </div>
          <div className="flex space-x-3">
            <button onClick={exportIntents} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
              <FontAwesomeIcon icon={faDownload} className="mr-2" />Export
            </button>
            <button onClick={syncAndPublish} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <FontAwesomeIcon icon={faSync} className="mr-2" />Sync & Publish
            </button>
          </div>
        </div>

        <div className="lg:flex lg:space-x-6 ">
          {/* Left Panel: Intent Library */}
          <div className="flex-1 h-[1%] bg-white rounded-lg border border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="md:flex justify-between items-center mb-4 space-y-1 md:space-y-0">
                <h2 className="text-lg font-semibold text-gray-900">Intent Library</h2>
                <div className="flex space-x-2">
                  <button onClick={bulkEdit} className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200">
                    <FontAwesomeIcon icon={faEdit} className="mr-1" />Bulk Edit
                  </button>
                  <button onClick={() => setShowCreateIntent(true)} className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                    <FontAwesomeIcon icon={faPlus} className="mr-1" />Create
                  </button>
                </div>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search intents..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FontAwesomeIcon icon={faSearch} className="absolute right-3 top-3 text-gray-400" />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {filteredIntents.map(intent => (
                <div
                  key={intent.id}
                  onClick={() => selectIntent(intent)}
                  className={`p-4 border rounded-lg mb-3 cursor-pointer hover:bg-gray-100 ${selectedIntent?.id === intent.id ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
                    }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900">{intent.name}</h3>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${intent.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                        {intent.active ? 'Active' : 'Inactive'}
                      </span>
                      <button onClick={(e) => { e.stopPropagation(); deleteIntent(intent.id); }} className="text-red-600 hover:text-red-800">
                        <FontAwesomeIcon icon={faTrash} className="text-xs" />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{intent.language}</span>
                    <span>{intent.utterances} utterances</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel: Intent Configuration */}
          <div className={`flex-2 h-[1%] bg-white mt-3 lg:mt-0 rounded-lg border border-gray-200 ${!selectedIntent ? 'hidden' : ''}`}>
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">{selectedIntent?.name || 'Select an Intent'}</h2>
                <div className="flex space-x-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedIntent?.active || false}
                      onChange={toggleIntentActive}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Active</span>
                  </label>
                  <button className="text-red-600 hover:text-red-800">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="md:flex space-x-8 px-4">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                  >
                    <FontAwesomeIcon icon={tab.icon} className="mr-2" />
                    <span>{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* Training Data Tab */}
              {activeTab === 'training' && (
                <div className="space-y-4">
                  <div className="md:flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900">Training Utterances</h3>
                    <select
                      value={selectedLanguage}
                      onChange={(e) => setSelectedLanguage(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                    </select>
                  </div>

                  <div className="space-y-3">
                    {selectedIntent?.trainingData[selectedLanguage]?.map((utterance, index) => (
                      <div key={index} className="flex items-center space-x-3 md:p-3 p-0 bg-gray-50 rounded-lg">
                        <input
                          type="text"
                          value={utterance.text}
                          onChange={(e) => {
                            const updatedTrainingData = [...selectedIntent.trainingData[selectedLanguage]];
                            updatedTrainingData[index].text = e.target.value;
                            const updatedIntent = {
                              ...selectedIntent,
                              trainingData: {
                                ...selectedIntent.trainingData,
                                [selectedLanguage]: updatedTrainingData
                              }
                            };
                            setSelectedIntent(updatedIntent);
                            updateIntentInList(updatedIntent);
                          }}
                          className="px-2 py-2 border border-gray-300 rounded-lg"
                        />
                        <button onClick={() => removeUtterance(index)} className="text-red-600 hover:text-red-800">
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    ))}
                    <button onClick={addUtterance} className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400">
                      <FontAwesomeIcon icon={faPlus} className="mr-2" />Add Utterance
                    </button>
                  </div>
                </div>
              )}

              {/* Entity Extraction Tab */}
              {activeTab === 'entities' && (
                <div className="space-y-4">
                  <div className="md:flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900">Entity Configuration</h3>
                    <button onClick={() => setShowAddEntity(true)} className="mt-3 md:mt-0 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                      <FontAwesomeIcon icon={faPlus} className="mr-2" />Add Entity
                    </button>
                  </div>

                  <div className="overflow-x-auto w-[260px] md:w-full">
                    <table className="w-full border border-gray-200 rounded-lg">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Name</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Type</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Sample Value</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {selectedIntent?.entities?.map(entity => (
                          <tr key={entity.id}>
                            <td className="px-4 py-3 text-sm text-gray-900">{entity.name}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{entity.type}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{entity.sample}</td>
                            <td className="px-4 py-3 text-sm">
                              <button className="text-red-600 hover:text-red-800">
                                <FontAwesomeIcon icon={faTrash} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Response Settings Tab */}
              {activeTab === 'responses' && (
                <div className="space-y-4">
                 

                  <IntentActionsEditor />

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Response Text</label>
                      <textarea
                        value={selectedIntent?.responses[selectedLanguage]?.text || ''}
                        onChange={(e) => updateResponseText(e.target.value)}
                        rows="4"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter response text..."
                      />
                    </div>

                    <div className="flex items-center space-x-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedIntent?.responses[selectedLanguage]?.randomize || false}
                          onChange={toggleRandomizeResponses}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">Randomize responses</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions Tab */}
              {activeTab === 'actions' && (
                <div className="space-y-4">
                  <div className="md:flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900">Intent Actions</h3>
                    <button onClick={() => setShowAddAction(true)} className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                      <FontAwesomeIcon icon={faPlus} className="mr-2" />Add Action
                    </button>
                  </div>

                  <div className="space-y-3">
                    {selectedIntent?.actions?.map(action => (
                      <div key={action.id} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-medium text-gray-900">{action.name}</h4>
                            <p className="text-sm text-gray-600">{action.type}</p>
                          </div>
                          <button className="text-red-600 hover:text-red-800">
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                        <div className="text-sm text-gray-600">{action.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Test Intent Tab */}
              {activeTab === 'test' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Test Intent</h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Test Message</label>
                      <input
                        type="text"
                        value={testMessage}
                        onChange={(e) => setTestMessage(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter test message..."
                      />
                    </div>

                    <button onClick={testIntent} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      <FontAwesomeIcon icon={faPlay} className="mr-2" />Test
                    </button>

                    {testResults && (
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Results</h4>
                        <div className="space-y-2 text-sm">
                          <div><span className="font-medium">Intent:</span> <span>{testResults.intent}</span></div>
                          <div><span className="font-medium">Confidence:</span> <span>{testResults.confidence}</span></div>
                          <div><span className="font-medium">Entities:</span> <span>{testResults.entities}</span></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Create Intent Modal */}
      {showCreateIntent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-gray-100 opacity-70"
            onClick={() => setShowCreateIntent(false)}
          ></div>

          {/* Modal container */}
          <div className="bg-white rounded-lg p-6 w-96 max-w-full mx-4 relative z-50 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Create New Intent</h3>
              <button
                onClick={() => setShowCreateIntent(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); createIntent(); }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Intent Name</label>
                  <input
                    type="text"
                    value={newIntent.name}
                    onChange={(e) => setNewIntent({ ...newIntent, name: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="e.g., Book Appointment"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                  <select
                    value={newIntent.language}
                    onChange={(e) => setNewIntent({ ...newIntent, language: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={newIntent.description}
                    onChange={(e) => setNewIntent({ ...newIntent, description: e.target.value })}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Brief description of the intent"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="active-checkbox"
                    checked={newIntent.active}
                    onChange={(e) => setNewIntent({ ...newIntent, active: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="active-checkbox" className="ml-2 block text-sm text-gray-700">
                    Activate immediately
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowCreateIntent(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Create Intent
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Entity Modal */}
      {showAddEntity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Dark overlay with proper opacity */}
          <div
            className="fixed inset-0 bg-gray-100 opacity-70"
            onClick={() => setShowAddEntity(false)}
          ></div>

          {/* Modal container */}
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 relative z-50 shadow-2xl">
            <div className="flex justify-between items-center mb-4 pb-2 border-b">
              <h3 className="text-xl font-semibold text-gray-800">Add Entity</h3>
              <button
                onClick={() => setShowAddEntity(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
              >
                <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); addEntity(); }}>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Entity Name*</label>
                  <input
                    type="text"
                    value={newEntity.name}
                    onChange={(e) => setNewEntity({ ...newEntity, name: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="e.g., product_name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Entity Type*</label>
                  <select
                    value={newEntity.type}
                    onChange={(e) => setNewEntity({ ...newEntity, type: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')] bg-no-repeat bg-[center_right_1rem]"
                  >
                    <option value="custom">Custom</option>
                    <option value="datetime">Date/Time</option>
                    <option value="number">Number</option>
                    <option value="location">Location</option>
                    <option value="phone">Phone</option>
                    <option value="currency">Currency</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sample Value</label>
                  <input
                    type="text"
                    value={newEntity.sample}
                    onChange={(e) => setNewEntity({ ...newEntity, sample: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="e.g., iPhone 15"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-8 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddEntity(false)}
                  className="px-5 py-2.5 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 shadow-sm"
                >
                  Add Entity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Action Modal */}
      {showAddAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-gray-100 opacity-70"
            onClick={() => setShowAddAction(false)}
          >
          </div>

          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 relative z-50 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Add Action</h3>
              <button onClick={() => setShowAddAction(false)} className="text-gray-400 hover:text-gray-600">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); addAction(); }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Action Name</label>
                  <input
                    type="text"
                    value={newAction.name}
                    onChange={(e) => setNewAction({ ...newAction, name: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Send Email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Action Type</label>
                  <select
                    value={newAction.type}
                    onChange={(e) => setNewAction({ ...newAction, type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="webhook">Webhook/API Call</option>
                    <option value="flow">Trigger Flow</option>
                    <option value="tag">Assign Tag</option>
                    <option value="agent">Forward to Agent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={newAction.description}
                    onChange={(e) => setNewAction({ ...newAction, description: e.target.value })}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe what this action does"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button type="button" onClick={() => setShowAddAction(false)} className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">Add Action</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAgent;