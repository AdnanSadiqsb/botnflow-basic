import React, { useContext } from 'react'
import { ContentContext } from '../../context/ContextProvider';
import {
    Search as SearchIcon,
    Add as AddIcon,
} from '@mui/icons-material';

function UserManagement() {
    const { themeColor, secondaryThemeColor } = useContext(ContentContext)

    return (
        <div>
            <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-lg font-medium text-gray-800 dark:text-white">User Management</h2>
                                <p className="text-gray-600 dark:text-gray-300">Manage users and permissions</p>
                            </div>
                            <button type="button" className="inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
                                style={{ backgroundColor: themeColor }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = secondaryThemeColor;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = themeColor;
                                }}>
                                <AddIcon className="mr-2" />
                                Add User
                            </button>
                        </div>

                        {/* Search and Filters */}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                            <div className="relative w-full md:w-64">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <SearchIcon className="text-gray-400" />
                                </div>
                                <input type="text" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Search users..." />
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <select className="block w-full md:w-auto border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 py-2 px-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                    <option value="">All Roles</option>
                                    <option value="admin">Admin</option>
                                    <option value="developer">Developer</option>
                                    <option value="viewer">Viewer</option>
                                </select>

                                <select className="block w-full md:w-auto border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 py-2 px-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                    <option value="">All Status</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                    <option value="pending">Pending</option>
                                </select>
                            </div>
                        </div>

                        {/* Users Table */}
                        <div className="overflow-x-auto w-[245px] md:w-[740px] lg:w-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            User
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Role
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Last Active
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    <img className="h-10 w-10 rounded-full" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" alt="" />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">Sarah Johnson</div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">sarah.johnson@example.com</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                                Admin
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                                Active
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            Just now
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button className="dark:text-blue-400 dark:hover:text-blue-300 mr-3"
                                                style={{ color: themeColor }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.color = secondaryThemeColor;
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.color = themeColor;
                                                }}>Edit</button>
                                            <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">Delete</button>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    <img className="h-10 w-10 rounded-full" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" alt="" />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">Michael Chen</div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">michael.chen@example.com</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                                Admin
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                                Active
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            2 hours ago
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button className="dark:text-blue-400 dark:hover:text-blue-300 mr-3"
                                                style={{ color: themeColor }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.color = secondaryThemeColor;
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.color = themeColor;
                                                }}>Edit</button>
                                            <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">Delete</button>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    <img className="h-10 w-10 rounded-full" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" alt="" />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">Emily Davis</div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">emily.davis@example.com</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                                Developer
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                                Active
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            1 day ago
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button className="dark:text-blue-400 dark:hover:text-blue-300 mr-3"
                                                style={{ color: themeColor }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.color = secondaryThemeColor;
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.color = themeColor;
                                                }}>Edit</button>
                                            <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">Delete</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserManagement
