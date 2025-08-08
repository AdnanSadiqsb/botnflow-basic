import React, { useContext, useEffect, useState } from 'react'
import { ContentContext } from '../../context/ContextProvider';
import {
    Search as SearchIcon,
    Add as AddIcon,
    Edit,
    Delete,
} from '@mui/icons-material';
import useAxios from '../../utils/useAxios';
import getToken from '../../utils/GetToken';
import { toast } from 'react-toastify';

// User Modal Component for Add/Edit
function UserModal({ open, onClose, onUserSaved, userToEdit }) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        profilePicture: '',
        gender: '',
        address: '',
        phoneNumber: '',
        country: '',
        timezoneOffset: '',
        role: 'admin',
    });
    const [loading, setLoading] = useState(false);
    const [profilePreview, setProfilePreview] = useState('');
    const [profileFile, setProfileFile] = useState(null);

    // Timezone options for dropdown
    const timezoneOptions = [
        { value: 'UTC-8', label: 'USA (Pacific Time, UTC-8)' },
        { value: 'UTC-5', label: 'USA (Eastern Time, UTC-5)' },
        { value: 'UTC+1', label: 'France (CET, UTC+1)' },
        { value: 'UTC+1', label: 'Germany (CET, UTC+1)' },
        { value: 'UTC+0', label: 'UK (GMT, UTC+0)' },
        { value: 'UTC+2', label: 'South Africa (UTC+2)' },
        { value: 'UTC+5', label: 'Pakistan (UTC+5)' },
        { value: 'UTC+8', label: 'China (UTC+8)' },
        { value: 'UTC+9', label: 'Japan (UTC+9)' },
    ];

    useEffect(() => {
        if (userToEdit) {
            setFormData({
                firstName: userToEdit.firstName || '',
                lastName: userToEdit.lastName || '',
                profilePicture: userToEdit.profilePicture || '',
                gender: userToEdit.gender || '',
                address: userToEdit.address || '',
                phoneNumber: userToEdit.phoneNumber || '',
                country: userToEdit.country || '',
                timezoneOffset: userToEdit.timezoneOffset || '',
                role: userToEdit.role || 'admin',
            });
            setProfilePreview(userToEdit.profilePicture || '');
            setProfileFile(null);
        } else {
            setFormData({
                firstName: '',
                lastName: '',
                profilePicture: '',
                gender: '',
                address: '',
                phoneNumber: '',
                country: '',
                timezoneOffset: '',
                role: 'admin',
            });
            setProfilePreview('');
            setProfileFile(null);
        }
    }, [userToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setProfilePreview(URL.createObjectURL(file));
        setProfileFile(file);
    };

    const handleSubmit = async () => {
        if (!formData.firstName || !formData.lastName || !formData.phoneNumber) {
            toast.error('Please fill in all required fields!');
            return;
        }
        setLoading(true);
        try {
            const token = getToken();
            let dataToSend;
            let isEdit = userToEdit && userToEdit._id;
            if (profileFile) {
                dataToSend = new FormData();
                dataToSend.append('firstName', formData.firstName);
                dataToSend.append('lastName', formData.lastName);
                dataToSend.append('gender', formData.gender);
                dataToSend.append('address', formData.address);
                dataToSend.append('phoneNumber', formData.phoneNumber);
                dataToSend.append('country', formData.country);
                dataToSend.append('timezoneOffset', formData.timezoneOffset);
                dataToSend.append('role', formData.role);
                dataToSend.append('profilePicture', profileFile);
            } else {
                dataToSend = { ...formData };
                if (isEdit && !formData.profilePicture) {
                    delete dataToSend.profilePicture;
                }
            }

            let responseData, fetchError;
            if (isEdit) {
                [responseData, fetchError] = await useAxios(
                    'PATCH',
                    `users`,
                    token,
                    dataToSend,
                    profileFile ? { headers: { 'Content-Type': 'multipart/form-data' } } : undefined
                );
            } else {
                [responseData, fetchError] = await useAxios(
                    'POST',
                    'users',
                    token,
                    dataToSend,
                    profileFile ? { headers: { 'Content-Type': 'multipart/form-data' } } : undefined
                );
            }
            if (responseData) {
                toast.success(`User ${isEdit ? 'updated' : 'created'} successfully!`, { autoClose: 2000 });
                onUserSaved();
                onClose();
            } else {
                toast.error(fetchError?.message || `User ${isEdit ? 'update' : 'creation'} failed`, {
                    autoClose: 2000,
                });
            }
        } catch (err) {
            toast.error(err.message || 'Something went wrong', { autoClose: 2000 });
        } finally {
            setLoading(false);
        }
    };

    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black opacity-70" onClick={onClose}></div>
            <div className="bg-white rounded-lg max-w-md w-full p-6 relative z-50 mx-4" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                        {userToEdit ? 'Edit User' : 'Add New User'}
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        ×
                    </button>
                </div>
                <form className="space-y-2" onSubmit={e => e.preventDefault()}>
                    <div className="flex gap-2">
                        <input name="firstName" value={formData.firstName} onChange={handleChange} type="text" placeholder="First Name" className="w-1/2 px-3 py-1.5 border border-gray-300 rounded-lg" />
                        <input name="lastName" value={formData.lastName} onChange={handleChange} type="text" placeholder="Last Name" className="w-1/2 px-3 py-1.5 border border-gray-300 rounded-lg" />
                    </div>
                  
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    <input name="address" value={formData.address} onChange={handleChange} type="text" placeholder="Address" className="w-full px-3 py-1.5 border border-gray-300 rounded-lg" />
                    <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} type="text" placeholder="Phone Number" className="w-full px-3 py-1.5 border border-gray-300 rounded-lg" />
                    <input name="country" value={formData.country} onChange={handleChange} type="text" placeholder="Country" className="w-full px-3 py-1.5 border border-gray-300 rounded-lg" />
                    <select
                        name="timezoneOffset"
                        value={formData.timezoneOffset}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                        <option value="">Select Timezone</option>
                        {timezoneOptions.map(opt => (
                            <option key={opt.value + opt.label} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                    <select name="role" value={formData.role} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                        <option value="admin">Admin</option>
                        <option value="superadmin">Super Admin</option>
                        <option value="masteradmin">Master Admin</option>
                        <option value="developer">Developer</option>
                        <option value="viewer">Viewer</option>
                    </select>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleProfilePicChange}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        {profilePreview && (
                            <img src={profilePreview} alt="Preview" className="mt-2 h-16 w-16 rounded-full object-cover border" />
                        )}
                    </div>
                    <div className="flex justify-end">
                        <button type="button" onClick={handleSubmit} className="px-4 py-2 text-white rounded bg-blue-500 hover:bg-blue-600">
                            {loading ? (userToEdit ? 'Updating...' : 'Processing...') : (userToEdit ? 'Update User' : 'Create User')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function UserManagement() {
    const { themeColor, secondaryThemeColor } = useContext(ContentContext)
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const [userModalOpen, setUserModalOpen] = useState(false);
    const [userToEdit, setUserToEdit] = useState(null);

    const token = getToken();

    // Fetch users from API
    const getUsers = async (search = '', role = '') => {
        setLoading(true);
        try {
            let url = 'users';
            const params = [];
            if (search) params.push(`search=${encodeURIComponent(search)}`);
            if (role) params.push(`role=${encodeURIComponent(role)}`);
            if (params.length) url += `?${params.join('&')}`;
            const [responseData, fetchError] = await useAxios('GET', url, token);
            if (responseData) {
                // If API returns a single user object
                if (responseData.data.user) {
                    setUsers([responseData.data.user]);
                } else if (Array.isArray(responseData.data.users)) {
                    setUsers(responseData.data.users);
                } else {
                    setUsers([]);
                }
            } else {
                toast.error(fetchError?.message || `Error fetching users`, {
                    autoClose: 2000,
                });
            }
        } catch (err) {
            toast.error(err.message || 'Something went wrong', { autoClose: 2000 });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    // Debounced search and filter
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            getUsers(searchTerm, roleFilter);
        }, 400);
        return () => clearTimeout(delayDebounce);
    }, [searchTerm, roleFilter]);

    // Delete user
    const handleDelete = async (userId) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        setLoading(true);
        try {
            const [responseData, fetchError] = await useAxios('DELETE', `users/${userId}`, token);
            if (responseData) {
                toast.success('User deleted successfully!', { autoClose: 2000 });
                getUsers(searchTerm, roleFilter);
            } else {
                toast.error(fetchError?.message || 'Failed to delete user', { autoClose: 2000 });
            }
        } catch (err) {
            toast.error(err.message || 'Something went wrong', { autoClose: 2000 });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="space-y-6">
                <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-lg font-medium text-gray-800">User Management</h2>
                                <p className="text-gray-600">Manage users and permissions</p>
                            </div>
                            <button
                                type="button"
                                className="inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
                                style={{ backgroundColor: themeColor }}
                                onClick={() => { setUserToEdit(null); setUserModalOpen(true); }}
                                onMouseEnter={e => { e.currentTarget.style.backgroundColor = secondaryThemeColor; }}
                                onMouseLeave={e => { e.currentTarget.style.backgroundColor = themeColor; }}
                            >
                                <AddIcon className="mr-2" />
                                Add User
                            </button>
                        </div>

                        {/* Search and Role Filter */}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                            <div className="relative w-full md:w-64">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <SearchIcon className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Search users..."
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <select
                                    className="block w-full md:w-auto border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 py-2 px-3"
                                    value={roleFilter}
                                    onChange={e => setRoleFilter(e.target.value)}
                                >
                                    <option value="">All Roles</option>
                                    <option value="admin">Admin</option>
                                    <option value="superadmin">Super Admin</option>
                                    <option value="masteradmin">Master Admin</option>
                                    <option value="developer">Developer</option>
                                    <option value="viewer">Viewer</option>
                                </select>
                            </div>
                        </div>

                        {/* Users Table */}
                        <div className="overflow-x-auto w-[245px] md:w-[740px] lg:w-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {users.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="text-center py-6 text-gray-400">No users found.</td>
                                        </tr>
                                    )}
                                    {users.map(user => (
                                        <tr key={user._id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <img className="h-10 w-10 rounded-full" src={user.profilePicture || 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg'} alt="" />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</div>
                                                        <div className="text-sm text-gray-500">{user.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-xs text-gray-700">{user.phoneNumber}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-xs text-gray-700">{user.country}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    className="mr-3"
                                                    style={{ color: themeColor }}
                                                    onMouseEnter={e => { e.currentTarget.style.color = secondaryThemeColor; }}
                                                    onMouseLeave={e => { e.currentTarget.style.color = themeColor; }}
                                                    onClick={() => { setUserToEdit(user); setUserModalOpen(true); }}
                                                >
                                                    <Edit fontSize="small" />
                                                </button>
                                                <button
                                                    className="text-red-600 hover:text-red-900"
                                                    onClick={() => handleDelete(user._id)}
                                                >
                                                    <Delete fontSize="small" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <UserModal
                open={userModalOpen}
                onClose={() => setUserModalOpen(false)}
                onUserSaved={() => getUsers(searchTerm, roleFilter)}
                userToEdit={userToEdit}
            />
        </div>
    )
}

export default UserManagement
