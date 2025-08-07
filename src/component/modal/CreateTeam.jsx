import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContentContext } from '../../context/ContextProvider';
import getToken from '../../utils/GetToken';
import useAxios from '../../utils/useAxios';

function CreateTeam({ toggleModal, onTeamCreated, contactToEdit = null }) {
  const { userInfo } = useContext(ContentContext);
  const token = getToken();
  const [admin, setAdmin] = useState([])
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    teamName: '',
    members: [],
  });

  // Prefill form if editing
  useEffect(() => {
    if (contactToEdit) {
      setFormData({
        teamName: contactToEdit.teamName || '',
        members: Array.isArray(contactToEdit.members)
          ? contactToEdit.members.map(m => typeof m === 'string' ? m : m._id)
          : [],
      });
    } else {
      setFormData({
        teamName: '',
        members: [],
      });
    }
  }, [contactToEdit]);

  useEffect(() => {
    const getTeam = async () => {
      try {
        const [responseData, fetchError] = await useAxios('GET', 'users/get-company-admins', token);

        if (responseData) {
          setAdmin(responseData.data.users)
        } else {
          toast.error(fetchError?.message || `Error fetching Data`, {
            autoClose: 2000,
          });
        }
      } catch (err) {
        toast.error(err.message || 'Something went wrong', { autoClose: 2000 });
      } finally {
        setLoading(false);
      }
    }

    getTeam()
  }, [token])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { teamName, members } = formData;

    if (!teamName || !members || members.length === 0) {
      toast.error('Please fill in all fields!');
      return;
    }

    try {
      setLoading(true);

      let responseData, fetchError;
      if (contactToEdit && contactToEdit._id) {
        // Edit mode: PATCH
        [responseData, fetchError] = await useAxios(
          'PATCH',
          `teams/${contactToEdit._id}`,
          token,
          formData
        );
      } else {
        // Add mode: POST
        [responseData, fetchError] = await useAxios(
          'POST',
          'teams',
          token,
          formData
        );
      }

      if (responseData) {
        toast.success(`Team ${contactToEdit ? 'updated' : 'created'} successfully!`, { autoClose: 2000 });
        toggleModal();
        onTeamCreated();
      } else {
        toast.error(fetchError?.message || `Team ${contactToEdit ? 'update' : 'creation'} failed`, {
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
        className="bg-white overflow-auto rounded-lg max-w-md w-full p-6 relative z-50 mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {contactToEdit ? 'Edit Team' : 'Add New Team'}
          </h3>
          <button onClick={toggleModal} className="text-gray-400 hover:text-gray-600">
            <i className="fa-solid fa-times"></i>
          </button>
        </div>

        <form className="space-y-2" onSubmit={e => e.preventDefault()}>

          <div>
            <label className="block text-sm font-medium text-gray-700">Team Name</label>
            <input
              name="teamName"
              value={formData.teamName}
              onChange={handleChange}
              type="text"
              className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Select Users</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              onChange={(e) => {
                const userId = e.target.value;
                if (userId && !formData.members.includes(userId)) {
                  setFormData(prev => ({
                    ...prev,
                    members: [...prev.members, userId]
                  }));
                }
              }}
              value=""
            >
              <option value="" disabled>Select a user</option>
              {admin.map((user, i) => (
                <option className='text-gray-700 font-medium' key={i} value={user._id}>
                  {user.username || user._id}
                </option>
              ))}
            </select>

            {/* Selected Users Display as Tags */}
            {formData.members.map((userId, i) => {
              const user = admin.find(u => u._id === userId);
              return (
                <span
                  key={i}
                  className="w-fit flex items-center mt-1 bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                >
                  {user?.username || userId}
                  <button
                    type="button"
                    className="ml-2 text-red-500 hover:text-red-700"
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        members: prev.members.filter(id => id !== userId)
                      }));
                    }}
                  >
                    ×
                  </button>
                </span>
              );
            })}
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 text-white rounded bg-blue-500 hover:bg-blue-600"
            >
              {loading ? (contactToEdit ? 'Updating...' : 'Processing...') : (contactToEdit ? 'Update Team' : 'Create Team')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTeam;