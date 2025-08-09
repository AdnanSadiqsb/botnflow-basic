import React, { useContext, useState } from 'react'
import {
    CameraAlt as CameraAltIcon,
    Close as CloseIcon
} from '@mui/icons-material';
import { ContentContext } from '../../context/ContextProvider';
import profile from '../../assets/images/profile.jpg'
import getToken from '../../utils/GetToken';
import useAxios from '../../utils/useAxios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { lightenColor } from '../../assets/Colors';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import logo from '../../assets/images/logo.png'
function General() {
    const { userInfo, themeColor, secondaryThemeColor, getUserInfo, setThemeColor, setSecondaryThemeColor } = useContext(ContentContext)
    const [logoImage, setLogoImage] = useState(logo);
    const navigate = useNavigate();
    const [companyData, setCompanyData] = useState({
        language: userInfo.companyId?.language || 'en',
        brandColor: userInfo.companyId?.brandColor || '',
    });
    const token = getToken();
    const [formData, setFormData] = useState({
        firstName: userInfo.firstName || '',
        lastName: userInfo.lastName || '',
        email: userInfo.email || '',
        phoneNumber: userInfo.phoneNumber || '',
        gender: userInfo.gender || 'male',
        country: userInfo.country || 'us',
        timezoneOffset: userInfo.timezoneOffset || 'est',
        address: userInfo.address || '',
        profilePicture: userInfo.profilePicture || '',
    });
    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setLogoImage(imageUrl);
        }
    }



    const handleColorChange = (e) => {
        const selectedColor = e.target.value;

        // Convert hex to RGB
        const hexToRgb = (hex) => {
            const bigint = parseInt(hex.slice(1), 16);
            const r = (bigint >> 16) & 255;
            const g = (bigint >> 8) & 255;
            const b = bigint & 255;
            return { r, g, b };
        };

        const { r, g, b } = hexToRgb(selectedColor);

        // Calculate brightness using a common formula
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;

        // Reject colors that are too light (brightness > 240)
        if (brightness > 180) {
            // alert("Please choose a darker color. White or very light colors are not allowed.");
            return;
        }

        setThemeColor(selectedColor);
        setSecondaryThemeColor(lightenColor(selectedColor));
        console.log("Selected Color:", selectedColor);
    };

    // Modal state for deactivation
    const [showDeactivateModal, setShowDeactivateModal] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCompanyChange = (e) => {
        const { name, value } = e.target;
        if (name === 'brandColor') {
            handleColorChange(e);
        }
        setCompanyData((prev) => ({ ...prev, [name]: value }));
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
            gender: formData.gender,
            country: formData.country,
            timezoneOffset: formData.timezoneOffset,
            address: formData.address, // <-- add address here
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

    const handleCompanyUpdate = async () => {
        const payload = {
            language: companyData.language,
            brandColor: companyData.brandColor,
        };

        try {
            const [responseData, fetchError] = await useAxios('PATCH', 'companies', token, payload);
            if (responseData) {
                toast.success("Company settings updated!", { autoClose: 2000 });
                getUserInfo()
            } else {
                console.log(fetchError);
                toast.error("Failed to update company settings", { autoClose: 2000 });
            }
        } catch (error) {
            toast.error("Failed to update company settings", { autoClose: 2000 });
        }
    };

    const handleDeactivateCompany = async () => {
        try {
            const [responseData, fetchError] = await useAxios('PATCH', 'companies/toggle-deletion', token, {});
            if (responseData && responseData.success) {
                toast.success("Company deactivated. You will be logged out.", { autoClose: 2000 });
                setShowDeactivateModal(false);

                getUserInfo();
                localStorage.removeItem('token');
                navigate("/");
            } else {
                toast.error("Failed to deactivate company", { autoClose: 2000 });
            }
        } catch (error) {
            toast.error("Failed to deactivate company", { autoClose: 2000 });
        }
    };

    return (
        <div>
            <div className="space-y-6">
                {/* Profile Section */}
                <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                    <div className="p-6">
                        <h2 className="text-lg font-medium text-gray-800 mb-4">Profile Information</h2>
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Avatar Section */}
                            <div className="flex flex-col items-center md:w-1/4">
                                <div className="mb-4">
                                    <div className="relative">
                                        <img
                                            key={formData.profilePicture}
                                            src={formData.profilePicture || profile}
                                            alt="User avatar"
                                            className="h-32 w-32 rounded-full object-cover border-4 border-gray-200"
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
                                    <h3 className="font-medium text-gray-800">{formData.firstName + ' ' + formData.lastName}</h3>
                                    <p className="text-gray-600 text-sm">{formData.role}</p>
                                </div>
                            </div>
                            {/* Form Section */}
                            <div className="md:w-3/4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                        <input onChange={handleChange} type="text" id="firstName" name="firstName" value={formData.firstName} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2 bg-white text-gray-900" />
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                        <input onChange={handleChange} type="text" id="lastName" name="lastName" value={formData.lastName} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2 bg-white text-gray-900" />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                        <input
                                            onChange={handleChange}
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            disabled={!!formData.email}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2 bg-white text-gray-900"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                        <input onChange={handleChange} type="tel" id="phone" name="phone" value={formData.phoneNumber} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2 bg-white text-gray-900" />
                                    </div>
                                    <div>
                                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                                        <select id="gender" name="gender" onChange={handleChange} value={formData.gender} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2 bg-white text-gray-900">
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                                        <select id="country" name="country" onChange={handleChange} value={formData.country} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2 bg-white text-gray-900">
                                            <option value="us">United States</option>
                                            <option value="ca">Canada</option>
                                            <option value="uk">United Kingdom</option>
                                            <option value="au">Australia</option>
                                            <option value="de">Germany</option>
                                            <option value="fr">France</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="timezoneOffset" className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                                        <select id="timezoneOffset" onChange={handleChange} value={formData.timezoneOffset} name="timezoneOffset" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2 bg-white text-gray-900">
                                            <option value="pst">Pacific Time (UTC-8)</option>
                                            <option value="mst">Mountain Time (UTC-7)</option>
                                            <option value="cst">Central Time (UTC-6)</option>
                                            <option value="est">Eastern Time (UTC-5)</option>
                                            <option value="gmt">GMT (UTC+0)</option>
                                            <option value="cet">Central European Time (UTC+1)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                        <input
                                            onChange={handleChange}
                                            type="text"
                                            id="address"
                                            name="address"
                                            value={formData.address}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2 bg-white text-gray-900"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-6 py-3 bg-gray-50 text-right">
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

            </div>
            {/* Brand Color & Language Settings */}
            <div className="bg-white shadow-sm rounded-lg overflow-hidden mt-5">
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-800 mb-4">Appearance Settings</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div>
                            <label htmlFor="brandColor" className="block text-sm font-medium text-gray-700 mb-1">Brand Color</label>
                            <div className="flex">
                                <input type="color" value={companyData.brandColor} onChange={handleCompanyChange} id="brandColor" name="brandColor" className="h-10 w-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                                <input type="text" value={companyData.brandColor} onChange={handleCompanyChange} name="brandColor" className="ml-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2 bg-white text-gray-900" />
                            </div>
                            <p className="mt-1 text-sm text-gray-500">This color will be used for the portal branding elements</p>
                        </div>
                        <div>
                            <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                            <select id="language" value={companyData.language} onChange={handleCompanyChange} name="language" className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2 bg-white text-gray-900">
                                <option value="en">English</option>
                                <option value="es">Español</option>
                                <option value="fr">Français</option>
                                <option value="de">Deutsch</option>
                                <option value="zh">中文</option>
                                <option value="ja">日本語</option>
                            </select>
                            <p className="mt-1 text-sm text-gray-500">This setting affects the portal interface language</p>
                        </div>
                        <div className="">
                            <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mb-1">Upload Logo:</label>

                            <div className="flex flex-col">
                                <label
                                    htmlFor="logo"
                                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer hover:bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500 transition"
                                >
                                    <UploadFileIcon className="w-4 h-4 text-blue-500" />
                                    <span>Upload logo</span>
                                </label>
                                <input
                                    type="file"
                                    id="logo"
                                    onChange={handleLogoUpload}
                                    className="hidden"
                                />
                            </div>
                        </div>
<div>
  <label
    htmlFor="logo_image"
    className="block text-sm font-medium text-gray-700 mb-1"
  >
    Logo
  </label>

  <div className="w-34 h-24 mt-2 mx-auto flex items-center justify-center border border-gray-300 rounded-lg bg-gray-50 overflow-hidden">
    {logoImage ? (
      <img
        src={logoImage}
        alt="Uploaded Logo"
        className="w-full h-full object-contain"
      />
    ) : (
      <span className="text-gray-400 text-sm font-medium">LOGO</span>
    )}
  </div>
</div>

                    </div>
                </div>
                <div className="px-6 py-3 bg-gray-50 text-right">
                    <button
                        type="button"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
                        style={{ backgroundColor: themeColor }}
                        onClick={handleCompanyUpdate}
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
            <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-red-200 mt-5 mb-20">
                <div className="p-6">
                    <h2 className="text-lg font-medium text-red-600 mb-4">Danger Zone</h2>
                    <div className="border-t border-b border-gray-200 py-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-base font-medium text-gray-800">Delete Account</h3>
                                <p className="text-sm text-gray-500">
                                    Permanently delete your account and all associated data. This action cannot be undone.
                                </p>
                            </div>
                            <button
                                type="button"
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                onClick={() => setShowDeactivateModal(true)}
                            >
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Deactivate Modal */}
            {showDeactivateModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="fixed inset-0 bg-black opacity-70"
                        onClick={() => setShowDeactivateModal(false)}
                    ></div>
                    <div className="bg-white rounded-lg max-w-md w-full p-6 relative z-50 mx-4" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="font-medium text-lg text-red-600">Deactivate Account</h4>
                            <button
                                onClick={() => setShowDeactivateModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <CloseIcon fontSize="small" />
                            </button>
                        </div>
                        <div className="mb-4 text-gray-700">
                            If you deactivate your account, you will no longer be able to login.<br />
                            Within <span className="font-semibold">30 days</span> you can activate the account again. After that, your account will be permanently deleted.
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                onClick={() => setShowDeactivateModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                onClick={handleDeactivateCompany}
                            >
                                Deactivate
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>

    )
}

export default General
