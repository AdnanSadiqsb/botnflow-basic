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

// Resources for invite
const resourceOptions = [
    "Analytics",
    "Contacts",
    "Inbox",
    "Settings",
    "Broadcast",
    "Convo Bot",
    "Administration"
];

// Role options
const roleOptions = [
    { value: 'admin', label: 'Admin' },
    { value: 'superadmin', label: 'Super Admin' },
    { value: 'masteradmin', label: 'Master Admin' }
];

// Timezone options
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

// Country options (same as timezone countries)
const countryOptions = [
    { value: 'us', label: 'United States' },
    { value: 'fr', label: 'France' },
    { value: 'de', label: 'Germany' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'za', label: 'South Africa' },
    { value: 'pk', label: 'Pakistan' },
    { value: 'cn', label: 'China' },
    { value: 'jp', label: 'Japan' },
];

// Invite User Modal
function InviteUserModal({ open, onClose, onInvited }) {
    const [formData, setFormData] = useState({
        email: '',
        role: 'admin',
        resources: [],
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!open) {
            setFormData({
                email: '',
                role: 'admin',
                resources: [],
            });
        }
    }, [open]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Multiselect for resources using checkboxes
    const handleResourceCheckbox = (resource) => {
        setFormData(prev => {
            const exists = prev.resources.includes(resource);
            return {
                ...prev,
                resources: exists
                    ? prev.resources.filter(r => r !== resource)
                    : [...prev.resources, resource]
            };
        });
    };

    const handleSubmit = async () => {
        if (!formData.email || !formData.role || formData.resources.length === 0) {
            toast.error('Please fill all fields!');
            return;
        }
        setLoading(true);
        try {
            const token = getToken();
            const [responseData, fetchError] = await useAxios(
                'POST',
                'users/invite',
                token,
                formData
            );
            if (responseData && responseData.success) {
                toast.success('User invited successfully!', { autoClose: 2000 });
                onInvited();
                onClose();
            } else {
                toast.error(fetchError?.message || 'Failed to invite user', { autoClose: 2000 });
            }
        } catch (err) {
            toast.error('Something went wrong', { autoClose: 2000 });
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
                    <h3 className="text-lg font-semibold text-gray-900">Invite User</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">×</button>
                </div>
                <form className="space-y-2" onSubmit={e => e.preventDefault()}>
                    <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Email" className="w-full px-3 py-1.5 border border-gray-300 rounded-lg" />
                    <select name="role" value={formData.role} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                        {roleOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Resources</label>
                        <div className="grid grid-cols-2 gap-2">
                            {resourceOptions.map(res => (
                                <label key={res} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={formData.resources.includes(res)}
                                        onChange={() => handleResourceCheckbox(res)}
                                        className="form-checkbox h-4 w-4 text-blue-600"
                                    />
                                    <span className="text-sm">{res}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button type="button" onClick={handleSubmit} className="px-4 py-2 text-white rounded bg-blue-500 hover:bg-blue-600">
                            {loading ? 'Inviting...' : 'Invite User'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// Edit User Modal
function EditUserModal({ open, onClose, onUserSaved, userToEdit }) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        profilePicture: '',
        gender: '',
        address: '',
        phoneNumber: '',
        country: '',
        timezoneOffset: '',
    });
    const [loading, setLoading] = useState(false);
    const [profilePreview, setProfilePreview] = useState('');
    const [profileFile, setProfileFile] = useState(null);

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
            });
            setProfilePreview('');
            setProfileFile(null);
        }
    }, [userToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Upload profile picture to helper/upload and set URL
    const handleProfilePicChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setProfilePreview(URL.createObjectURL(file));
        setProfileFile(file);

        // Upload to API with {file: file}
        const token = getToken();
        const formDataUpload = new FormData();
        formDataUpload.append('file', file);
        try {
            const [responseData, fetchError] = await useAxios(
                'POST',
                'helper/upload',
                token,
                { file }, // send as {file: file}
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            if (responseData && responseData.files && responseData.files[0]?.url) {
                setFormData(prev => ({ ...prev, profilePicture: responseData.files[0].url }));
            } else {
                toast.error(fetchError?.message || 'Upload failed');
            }
        } catch (err) {
            toast.error('Upload failed');
        }
    };

    const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // show preview
    setProfilePreview(URL.createObjectURL(file));
    setProfileFile(file);

    const formDataImage = new FormData();
    formDataImage.append("file", file);

    try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/v2/helper/upload`, {
            method: "POST",
            body: formDataImage,
        });

        if (res.ok) {
            const data = await res.json();
            toast.success("Image uploaded");

            if (Array.isArray(data.files) && data.files[0]?.url) {
                setFormData(prev => ({
                    ...prev,
                    profilePicture: data.files[0].url // ✅ correct reference
                }));
            } else {
                console.error("Invalid response from upload API:", data);
            }
        } else {
            console.error("Upload failed with status:", res.status);
        }
    } catch (error) {
        console.error("Image upload failed:", error);
    }
};


    const handleSubmit = async () => {
        if (!formData.firstName || !formData.lastName || !formData.phoneNumber) {
            toast.error('Please fill in all required fields!');
            return;
        }
        setLoading(true);
        try {
            const token = getToken();
            let dataToSend = { ...formData };
            if (!formData.profilePicture) delete dataToSend.profilePicture;
            const [responseData, fetchError] = await useAxios(
                'PATCH',
                `users`,
                token,
                dataToSend
            );
            if (responseData) {
                toast.success('User updated successfully!', { autoClose: 2000 });
                onUserSaved();
                onClose();
            } else {
                toast.error(fetchError?.message || 'User update failed', { autoClose: 2000 });
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
                    <h3 className="text-lg font-semibold text-gray-900">Edit User</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">×</button>
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
                    <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                        <option value="">Select Country</option>
                        {countryOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
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
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        {profilePreview && (
                            <img src={profilePreview} alt="Preview" className="mt-2 h-16 w-16 rounded-full object-cover border" />
                        )}
                    </div>
                    <div className="flex justify-end">
                        <button type="button" onClick={handleSubmit} className="px-4 py-2 text-white rounded bg-blue-500 hover:bg-blue-600">
                            {loading ? 'Updating...' : 'Update User'}
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
    const [inviteModalOpen, setInviteModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [userToEdit, setUserToEdit] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const token = getToken();

    // Fetch users from API
    const getUsers = async (search = '', role = '') => {
        setLoading(true);
        try {
            let url = 'users/get-company-admins';
            const params = [];
            if (search) params.push(`search=${encodeURIComponent(search)}`);
            if (role) params.push(`role=${encodeURIComponent(role)}`);
            if (params.length) url += `?${params.join('&')}`;
            const [responseData, fetchError] = await useAxios('GET', url, token);
            if (responseData && responseData.data && Array.isArray(responseData.data.users)) {
                setUsers(responseData.data.users);
            } else {
                setUsers([]);
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

    // Delete user with confirmation modal
    const handleDelete = (userId) => {
        setUserToDelete(userId);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (!userToDelete) return;
        setLoading(true);
        try {
            const [responseData, fetchError] = await useAxios(
                'DELETE',
                `users/delete-administrator/${userToDelete}`,
                token
            );
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
            setShowDeleteModal(false);
            setUserToDelete(null);
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
                                onClick={() => setInviteModalOpen(true)}
                                onMouseEnter={e => { e.currentTarget.style.backgroundColor = secondaryThemeColor; }}
                                onMouseLeave={e => { e.currentTarget.style.backgroundColor = themeColor; }}
                            >
                                <AddIcon className="mr-2" />
                                Invite User
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
                                    {roleOptions.map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
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
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {users.length === 0 && (
                                        <tr>
                                            <td colSpan={7} className="text-center py-6 text-gray-400">No users found.</td>
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
                                                        <div className="text-sm font-medium text-gray-900">{user.firstName || user.username || 'N/A'} {user.lastName || ''}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-xs text-gray-700">{user.phoneNumber || 'N/A'}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-xs text-gray-700">{user.country || 'N/A'}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-xs text-gray-700">{user.email || 'N/A'}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`text-xs font-semibold ${user.isActive ? 'text-green-600' : 'text-red-600'}`}>
                                                    {user.isActive ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    className="mr-3"
                                                    style={{ color: themeColor }}
                                                    onMouseEnter={e => { e.currentTarget.style.color = secondaryThemeColor; }}
                                                    onMouseLeave={e => { e.currentTarget.style.color = themeColor; }}
                                                    onClick={() => { setUserToEdit(user); setEditModalOpen(true); }}
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
            <InviteUserModal
                open={inviteModalOpen}
                onClose={() => setInviteModalOpen(false)}
                onInvited={() => getUsers(searchTerm, roleFilter)}
            />
            <EditUserModal
                open={editModalOpen}
                onClose={() => { setEditModalOpen(false); setUserToEdit(null); }}
                onUserSaved={() => getUsers(searchTerm, roleFilter)}
                userToEdit={userToEdit}
            />

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="fixed inset-0 bg-black opacity-70" onClick={() => setShowDeleteModal(false)}></div>
                    <div className="bg-white rounded-lg max-w-md w-full p-6 relative z-50 mx-4" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="font-medium text-lg text-red-600">Delete User</h4>
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ×
                            </button>
                        </div>
                        <div className="mb-4 text-gray-700">
                            Are you sure you want to delete this user? This action cannot be undone.
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                onClick={() => setShowDeleteModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                onClick={confirmDelete}
                                disabled={loading}
                            >
                                {loading ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserManagement
