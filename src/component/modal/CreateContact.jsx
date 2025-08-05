import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContentContext } from '../../context/ContextProvider';
import getToken from '../../utils/GetToken';
import useAxios from '../../utils/useAxios';

function CreateContact({ toggleModal, contactToEdit = null, refreshContacts }) {
  const { userInfo } = useContext(ContentContext);
  const token = getToken();

  const channels = userInfo.companyId.companyIntegratedChannels || [];
  const companyName = userInfo.companyId.companyName || ' ';

  const [loading, setLoading] = useState(false);
  const [tagInput, setTagInput] = useState('');
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

  const handleAddTag = () => {
    const newTag = tagInput.trim();
    if (newTag && !formData.tags.includes(newTag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (index) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async () => {
    const { firstName, lastName, phoneNumber, clientBusinessDetail, clientEmail, channel, tags } = formData;

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
        phoneNumber: formattedPhone, // Use formatted phone number
        clientBusinessDetail: companyName,
      };
    } else {
      const selectedChannel = channels.find((ch) => ch.type === channel);
      fullData = {
        ...formData,
        phoneNumber: formattedPhone, // Use formatted phone number
        channelId: selectedChannel?.channelId || null,
        clientBusinessDetail: companyName,
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
            <label className="block text-sm font-medium text-gray-700">User Type Tags</label>
            <div className="flex flex-wrap gap-1 mb-2">
              {formData.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full flex items-center"
                >
                  {tag}
                  <button
                    type="button"
                    className="ml-1 text-blue-500 hover:text-blue-700"
                    onClick={() => handleRemoveTag(idx)}
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
            <div className="flex mt-1">
              <input
                type="text"
                placeholder="Add tag"
                className="w-full px-3 py-1.5 border border-gray-300 rounded-l-lg text-sm"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                disabled={isFormDisabled}
              />
              <button
                type="button"
                className={`px-3 py-1.5 text-sm rounded-r-lg ${isFormDisabled
                  ? 'bg-gray-200 cursor-not-allowed'
                  : 'bg-blue-200 hover:bg-blue-300'
                  }`}
                onClick={handleAddTag}
                disabled={isFormDisabled}
              >
                Add
              </button>
            </div>
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