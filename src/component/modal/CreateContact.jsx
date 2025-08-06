import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContentContext } from '../../context/ContextProvider';
import getToken from '../../utils/GetToken';
import useAxios from '../../utils/useAxios';

// First define the MultiSelectTags component
const MultiSelectTags = ({
  initialSelectedTags = [],
  onTagsChange,
  availableTags = [],
  isLoading = false,
  placeholder = "Select tags...",
  noOptionsMessage = "No tags available",
  loadingMessage = "Loading tags...",
  disabled = false
}) => {
  const [selectedTags, setSelectedTags] = useState(initialSelectedTags);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Sync with parent when initialSelectedTags changes
  useEffect(() => {
    setSelectedTags(initialSelectedTags);
  }, [initialSelectedTags]);

  const filteredTags = availableTags.filter(tag => 
    tag.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedTags.some(selected => selected._id === tag._id)
  );

  const handleTagSelect = (tag) => {
    const newSelectedTags = [...selectedTags, tag];
    setSelectedTags(newSelectedTags);
    onTagsChange(newSelectedTags);
    setSearchTerm('');
  };

  const handleTagRemove = (tagId) => {
    const newSelectedTags = selectedTags.filter(tag => tag._id !== tagId);
    setSelectedTags(newSelectedTags);
    onTagsChange(newSelectedTags);
  };

  return (
    <div className="relative w-full">
      <div className={`flex flex-wrap items-center gap-2 p-2 border ${isDropdownOpen ? 'border-blue-500' : 'border-gray-300'} rounded-lg bg-white min-h-12 transition-colors ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}>
        {selectedTags.map(tag => (
          <div 
            key={tag._id} 
            className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
          >
            <span>{tag.favicon}</span>
            <span>{tag.name}</span>
            <button 
              onClick={(e) => {
                e.preventDefault();
                handleTagRemove(tag._id);
              }}
              className="ml-1 text-blue-500 hover:text-blue-700 focus:outline-none"
              disabled={disabled}
            >
              ×
            </button>
          </div>
        ))}
        
        {!disabled && (
          <div className="relative flex-1 min-w-[120px]">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsDropdownOpen(true);
              }}
              onFocus={() => setIsDropdownOpen(true)}
              onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
              placeholder={selectedTags.length === 0 ? placeholder : ""}
              className="w-full p-1 outline-none bg-transparent"
              disabled={disabled}
            />
            
            {isDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                {isLoading ? (
                  <div className="p-2 text-gray-500">{loadingMessage}</div>
                ) : filteredTags.length === 0 ? (
                  <div className="p-2 text-gray-500">
                    {searchTerm ? noOptionsMessage : noOptionsMessage}
                  </div>
                ) : (
                  filteredTags.map(tag => (
                    <button
                      key={tag._id}
                      type="button"
                      onClick={() => handleTagSelect(tag)}
                      className="w-full text-left flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <span className="mr-2">{tag.favicon}</span>
                      <div>
                        <div className="font-medium">{tag.name}</div>
                        {tag.description && (
                          <div className="text-xs text-gray-500">{tag.description}</div>
                        )}
                      </div>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Then define the CreateContact component
function CreateContact({ toggleModal, contactToEdit = null, refreshContacts }) {
  const { userInfo } = useContext(ContentContext);
  const token = getToken();

  const channels = userInfo.companyId.companyIntegratedChannels || [];
  const companyName = userInfo.companyId.companyName || ' ';

  const [loading, setLoading] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [availableTags, setAvailableTags] = useState([]);
  const [isLoadingTags, setIsLoadingTags] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    clientEmail: '',
    clientBusinessDetail: '',
    gender: 'male',
    channel: '',
    tags: [],
  });

  const fetchTags = async (search = "") => {
    setIsLoadingTags(true);
    try {
      const [responseData] = await useAxios("GET", `tags`, token);
      if (responseData && responseData.data && Array.isArray(responseData.data.tags)) {
        setAvailableTags(responseData.data.tags);
      }
    } catch (error) {
      console.error("Error fetching tags:", error);
    } finally {
      setIsLoadingTags(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchTags();
  }, []);

  useEffect(() => {
    if (contactToEdit) {
      setFormData({
        firstName: contactToEdit.firstName || '',
        lastName: contactToEdit.lastName || '',
        phoneNumber: contactToEdit.phoneNumber || '',
        clientEmail: contactToEdit.clientEmail || '',
        clientBusinessDetail: contactToEdit.clientBusinessDetail || '',
        gender: contactToEdit.gender || 'male',
        channel: contactToEdit.channel || '',
        tags: contactToEdit.tags || [],
      });
      
      // Set the selected tags if they exist in the contact being edited
      if (contactToEdit.tags && Array.isArray(contactToEdit.tags)) {
        setSelectedTags(contactToEdit.tags);
      }
    }
  }, [contactToEdit]);

  const isFormDisabled = !contactToEdit && !formData.channel;

  const handlePhoneChange = (e) => {
    const { value } = e.target;
    const numericValue = value.replace(/\D/g, '');

    if (formData.channel === 'whatsapp') {
      let processedValue = numericValue;

      if (!processedValue.startsWith('92')) {
        processedValue = '92' + processedValue.replace(/^92/, '');
      }

      processedValue = processedValue.replace(/^920+/, '92');
      processedValue = processedValue.slice(0, 12);

      setFormData(prev => ({ ...prev, phoneNumber: processedValue }));
    } else if (formData.channel) {
      let processedValue = numericValue;

      if (!processedValue.startsWith('92')) {
        processedValue = '92' + processedValue.replace(/^92/, '');
      }

      processedValue = processedValue.slice(0, 12);
      setFormData(prev => ({ ...prev, phoneNumber: processedValue }));
    } else {
      setFormData(prev => ({ ...prev, phoneNumber: numericValue }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phoneNumber') {
      handlePhoneChange(e);
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const formatPhoneDisplay = (phoneNumber, channel) => {
    if (!phoneNumber) return '';

    if (channel === 'whatsapp') {
      return phoneNumber;
    } else if (channel) {
      return phoneNumber.length > 0 ? `+${phoneNumber}` : '';
    } else {
      return phoneNumber;
    }
  };

  const handleSubmit = async () => {
    const { firstName, lastName, phoneNumber, clientBusinessDetail, clientEmail, channel } = formData;

    if (!channel) {
      toast.error('Please select a channel!');
      return;
    }

    if (!firstName || !lastName || !phoneNumber || !clientEmail || !clientBusinessDetail) {
      toast.error('Please fill in all fields!');
      return;
    }

    if (phoneNumber.length !== 12) {
      toast.error('Phone number must be 12 digits (including 92 prefix)');
      return;
    }

    let fullData;

    // Format phone number based on channel before sending
    const formattedPhone = channel === 'whatsapp' ? phoneNumber : `+${phoneNumber}`;

    if (contactToEdit) {
      const { channel, channelId, ...rest } = formData;
      fullData = {
        ...rest,
        phoneNumber: formattedPhone,
        clientBusinessDetail: companyName,
        tags: selectedTags.map(tag => tag._id) // Send only tag IDs
      };
    } else {
      const selectedChannel = channels.find((ch) => ch.type === channel);
      fullData = {
        ...formData,
        phoneNumber: formattedPhone,
        channelId: selectedChannel?.channelId || null,
        clientBusinessDetail: companyName,
        tags: selectedTags.map(tag => tag._id) // Send only tag IDs
      };
    }

    try {
      setLoading(true);

      const method = contactToEdit ? 'PATCH' : 'POST';
      const url = contactToEdit ? `contacts/${contactToEdit._id}` : 'contacts';

      const [responseData, fetchError] = await useAxios(method, url, token, fullData);

      if (responseData) {
        if (refreshContacts) {
          refreshContacts();
        }
        toast.success(`Contact ${contactToEdit ? 'updated' : 'created'} successfully!`, { autoClose: 2000 });
        toggleModal();
      } else {
        toast.error(fetchError?.message || `Contact ${contactToEdit ? 'update' : 'creation'} failed`, {
          autoClose: 2000,
        });
      }
    } catch (err) {
      toast.error(err.message || 'Something went wrong', { autoClose: 2000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-70" onClick={toggleModal}></div>
      <div
        className="bg-white max-h-[80vh] overflow-y-auto rounded-lg max-w-md w-full p-6 relative z-50 mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {contactToEdit ? 'Edit Contact' : 'Add New Contact'}
          </h3>
          <button onClick={toggleModal} className="text-gray-400 hover:text-gray-600">
            <i className="fa-solid fa-times"></i>
          </button>
        </div>

        <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
          {!contactToEdit && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Channel</label>
              <select
                name="channel"
                value={formData.channel}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Channel</option>
                {channels
                  .filter((ch) => ch.type !== 'webchat')
                  .map((ch) => (
                    <option key={ch._id} value={ch.type}>
                      {ch.type.charAt(0).toUpperCase() + ch.type.slice(1)}
                    </option>
                  ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              name="phoneNumber"
              value={formatPhoneDisplay(formData.phoneNumber, formData.channel)}
              onChange={handleChange}
              type="text"
              className={`w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isFormDisabled ? 'bg-gray-100 cursor-not-allowed' : ''
                }`}
              maxLength={formData.channel === 'whatsapp' ? 12 : formData.channel ? 13 : undefined}
              disabled={isFormDisabled}
            />
            <p className="text-xs text-gray-500 mt-1">
              {!formData.channel ? 'Please select a channel first' :
                formData.channel === 'whatsapp'
                  ? 'Format: 92XXXXXXXXXX (12 digits total)'
                  : 'Format: +92XXXXXXXXXX (13 digits total)'}
            </p>
          </div>

          {[
            { label: 'First Name', name: 'firstName' },
            { label: 'Last Name', name: 'lastName' },
            { label: 'Client Email', name: 'clientEmail' },
            { label: 'Client Business Detail', name: 'clientBusinessDetail' },
          ].map(({ label, name }, i) => (
            <div key={i}>
              <label className="block text-sm font-medium text-gray-700">{label}</label>
              <input
                name={name}
                value={formData[name]}
                onChange={handleChange}
                type="text"
                className={`w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isFormDisabled ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                disabled={isFormDisabled}
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 ${isFormDisabled ? 'bg-gray-100 cursor-not-allowed' : ''
                }`}
              disabled={isFormDisabled}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
            <MultiSelectTags 
              initialSelectedTags={selectedTags}
              onTagsChange={setSelectedTags}
              availableTags={availableTags}
              isLoading={isLoadingTags}
              disabled={isFormDisabled}
            />
            
            {/* Display selected tags preview */}
            {selectedTags.length > 0 && (
              <div className="mt-2">
                <h3 className="text-sm font-medium text-gray-700 mb-1">Selected Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedTags.map(tag => (
                    <span 
                      key={tag._id}
                      className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                    >
                      <span className="mr-1">{tag.favicon}</span>
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSubmit}
              className={`px-4 py-2 text-white rounded hover:bg-blue-600 ${isFormDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500'
                }`}
              disabled={loading || isFormDisabled}
            >
              {loading ? 'Processing...' : contactToEdit ? 'Update Contact' : 'Save Contact'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateContact;