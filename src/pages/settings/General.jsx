import React, { useContext, useState } from 'react'
import {
    CameraAlt as CameraAltIcon,
} from '@mui/icons-material';
import { ContentContext } from '../../context/ContextProvider';
import profile from '../../assets/images/profile.jpg'
import getToken from '../../utils/GetToken';
import useAxios from '../../utils/useAxios';
import { toast } from 'react-toastify';

function General() {
    const { userInfo, themeColor, secondaryThemeColor } = useContext(ContentContext)
    console.log(userInfo)

    const token = getToken();
    const [formData, setFormData] = useState({
        firstName: userInfo.firstName || '',
        lastName: userInfo.lastName || '',
        email: userInfo.email || '',
        phoneNumber: userInfo.phoneNumber || '',
        gender: userInfo.gender || 'male',
        address: userInfo.address || '',
        profilePicture: userInfo.profilePicture || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const previewUrl = URL.createObjectURL(file);
        setFormData((prev) => ({
            ...prev,
            profilePicture: previewUrl,
        }));

        const formDataImage = new FormData();
        formDataImage.append("file", file);

        try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/v2/helper/upload`, {
                method: "POST",
                body: formDataImage,
            });
            if (res.status == 200) {
                toast.success("Image uploaded")
                const data = await res.json();
                if (Array.isArray(data.files) && data.files[0]?.url) {
                    setFormData((prev) => ({
                        ...prev,
                        profilePicture: data.files[0].url,
                    }));
                } else {
                    console.error("Invalid response from upload API:", data);
                }
            }
        } catch (error) {
            console.error("Image upload failed:", error);
        }
    };

    const handleProfileUpdate = async () => {
        const payload = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            profilePicture: formData.profilePicture,
            // gender: formData.gender,
            // address: formData.address,
            phoneNumber: formData.phoneNumber,
        };

        try {
            const [responseData, fetchError] = await useAxios('PATCH', `users`, token, payload);
            if (responseData) {
                toast.success("Profile Update Successfully", { autoClose: 2000 })
            }
            else {
                console.log(fetchError)
                toast.error("Failed to delete contact", { autoClose: 2000 });
            }
        } catch (error) {
            toast.error("Failed to update profile", { autoClose: 2000 });
        }
    };

    return (
        <div>
            <div className="space-y-6">
                {/* Profile Section */}
                <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
                    <div className="p-6">
                        <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Profile Information</h2>

                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Avatar Section */}
                            <div className="flex flex-col items-center md:w-1/4">
                                <div className="mb-4">
                                    <div className="relative">
                                        <img
                                            key={formData.profilePicture}
                                            src={formData.profilePicture || profile}
                                            alt="User avatar"
                                            className="h-32 w-32 rounded-full object-cover border-4 border-gray-200 dark:border-gray-600"
                                        />

                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            style={{ display: 'none' }}
                                            id="profile-upload"
                                        />
                                        <label htmlFor="profile-upload" className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 shadow-md hover:bg-blue-700 cursor-pointer">
                                            <CameraAltIcon fontSize="small" />
                                        </label>

                                    </div>
                                </div>
                                <div className="text-center">
                                    <h3 className="font-medium text-gray-800 dark:text-white">{formData.firstName + ' ' + formData.lastName}</h3>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm">{formData.role}</p>
                                </div>
                            </div>

                            {/* Form Section */}
                            <div className="md:w-3/4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name</label>
                                        <input onChange={handleChange} type="text" id="firstName" name="firstName" value={formData.firstName} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                                    </div>

                                    <div>
                                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name</label>
                                        <input onChange={handleChange} type="text" id="lastName" name="lastName" value={formData.lastName} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                                        <input onChange={handleChange} type="email" id="email" name="email" value={formData.email} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                                        <input onChange={handleChange} type="tel" id="phone" name="phone" value={formData.phoneNumber} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                                    </div>

                                    <div>
                                        <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Country</label>
                                        <select id="country" name="country" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                            <option value="us">United States</option>
                                            <option value="ca">Canada</option>
                                            <option value="uk">United Kingdom</option>
                                            <option value="au">Australia</option>
                                            <option value="de">Germany</option>
                                            <option value="fr">France</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Timezone</label>
                                        <select id="timezone" name="timezone" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                            <option value="pst">Pacific Time (UTC-8)</option>
                                            <option value="mst">Mountain Time (UTC-7)</option>
                                            <option value="cst">Central Time (UTC-6)</option>
                                            <option value="est" selected>Eastern Time (UTC-5)</option>
                                            <option value="gmt">GMT (UTC+0)</option>
                                            <option value="cet">Central European Time (UTC+1)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-right">
                        <button type="button" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
                            style={{ backgroundColor: themeColor }}
                            onClick={handleProfileUpdate}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = secondaryThemeColor;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = themeColor;
                            }}
                        >
                            Save Changes
                        </button>
                    </div>
                </div>

                {/* Brand Color & Language Settings */}
                <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
                    <div className="p-6">
                        <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Appearance Settings</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="brandColor" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Brand Color</label>
                                <div className="flex">
                                    <input type="color" id="brandColor" name="brandColor" value="#0284c7" className="h-10 w-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                                    <input type="text" value="#0284c7" className="ml-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                                </div>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">This color will be used for the portal branding elements</p>
                            </div>

                            <div>
                                <label htmlFor="language" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Language</label>
                                <select id="language" name="language" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                    <option value="en" selected>English</option>
                                    <option value="es">Español</option>
                                    <option value="fr">Français</option>
                                    <option value="de">Deutsch</option>
                                    <option value="zh">中文</option>
                                    <option value="ja">日本語</option>
                                </select>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">This setting affects the portal interface language</p>
                            </div>
                        </div>
                    </div>

                    <div className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-right">
                        <button type="button" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
                            style={{ backgroundColor: themeColor }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = secondaryThemeColor;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = themeColor;
                            }}
                        >
                            Save Changes
                        </button>
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden border border-red-200 dark:border-red-700">
                    <div className="p-6">
                        <h2 className="text-lg font-medium text-red-600 dark:text-red-400 mb-4">Danger Zone</h2>

                        <div className="border-t border-b border-gray-200 dark:border-gray-600 py-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-base font-medium text-gray-800 dark:text-white">Delete Account</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Permanently delete your account and all associated data. This action cannot be undone.</p>
                                </div>
                                <button type="button" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                    Delete Account
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default General
