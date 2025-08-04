import React, { useContext, useEffect, useState } from 'react'
import { ContentContext } from '../../context/ContextProvider';
import {
    Search as SearchIcon,
    Add as AddIcon,
    Edit,
    Delete,
} from '@mui/icons-material';
import CreateTeam from '../../component/modal/CreateTeam';
import useAxios from '../../utils/useAxios';
import getToken from '../../utils/GetToken';
import DeleteModal from '../../component/modal/DeleteModal';
import { toast } from 'react-toastify';

function TeamManagement() {
    const { themeColor, secondaryThemeColor } = useContext(ContentContext)
    const [selectedTeamId, setSelectedTeamId] = useState('')
    const [teamModal, setTeamModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [allTeam, setAllTeam] = useState([
        {
            id: 1,
            name: "Sarah Johnson",
            email: "sarah.johnson@example.com",
            role: "Admin",
            status: "Active",
            lastActive: "Just now",
            avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
        },
        {
            id: 2,
            name: "Michael Chen",
            email: "michael.chen@example.com",
            role: "Admin",
            status: "Active",
            lastActive: "2 hours ago",
            avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
        },
        {
            id: 3,
            name: "Emily Davis",
            email: "emily.davis@example.com",
            role: "Developer",
            status: "Active",
            lastActive: "1 day ago",
            avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg"
        }
    ]);

    const [loading, setLoading] = useState(false)
    const token = getToken()


    const handleTeamModal = () => {
        setTeamModal(!teamModal)
    }

    useEffect(() => {
        const getTeam = async () => {
            try {
                const [responseData, fetchError] = await useAxios('GET', 'teams', token);

                if (responseData) {
                    console.log('responseData', responseData.data.teams)
                    setAllTeam(responseData.data.teams)
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
    }, [])

    const handleDelete = async () => {
        try {
            const [responseData, error] = await useAxios('DELETE', `teams/${selectedTeamId}`, token);
            if (responseData) {
                toast.success("Team Deleted Successfully", { autoClose: 2000 });
                setShowDeleteModal(false);
                // const [updatedData] = await useAxios('GET', 'contacts', token, null);
                // if (updatedData) setData(updatedData.data.teams);
            } else {
                toast.error( error.message || "Failed to delete Team", { autoClose: 2000 });
            }
        } catch (error) {
            toast.error("Failed to delete Team", { autoClose: 2000 });
        }
    };

    return (
        <div>
            <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-lg font-medium text-gray-800 dark:text-white">Team Management</h2>
                                <p className="text-gray-600 dark:text-gray-300">Manage team and permissions</p>
                            </div>
                            <button type="button" className="inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
                                onClick={handleTeamModal}
                                style={{ backgroundColor: themeColor }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = secondaryThemeColor;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = themeColor;
                                }}>
                                <AddIcon className="mr-2" />
                                Create Team
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
                                    <option value="">All Teams</option>
                                    <option value="admin">Admin</option>
                                    <option value="developer">Developer</option>
                                    <option value="viewer">Viewer</option>
                                </select>
                            </div>
                        </div>

                        {/* Users Table */}
                        <div className="overflow-x-auto w-[245px] md:w-[740px] lg:w-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                                            Team ID
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                                            Team Name
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                                            Company
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-sm font-bold text-gray-500 uppercase tracking-wider">
                                            Total Members
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-right text-sm font-bold text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                    {allTeam.map(team => (
                                        <tr key={team.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <span className="text-gray-600 px-2 inline-flex text-xs leading-5 rounded-full">
                                                        {team?._id}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-gray-600 px-2 inline-flex text-xs leading-5 rounded-full">
                                                    {team.teamName}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                                                    {team?.companyId?.companyName}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                {Array.isArray(team.members) && team.members.length > 0
                                                    ? `${team.members.length} Members`
                                                    : 'No Members'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    className="dark:text-blue-400 dark:hover:text-blue-300 mr-3"
                                                    style={{ color: themeColor }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.color = secondaryThemeColor;
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.color = themeColor;
                                                    }}
                                                >
                                                    <Edit />
                                                </button>
                                                <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                                    onClick={() => {
                                                        setSelectedTeamId(team._id);
                                                        setShowDeleteModal(true);
                                                    }}>
                                                    <Delete />
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
            {teamModal && (
                <CreateTeam toggleModal={() => setTeamModal(!teamModal)} />
            )}
            {showDeleteModal && (
                <DeleteModal onClose={() => setShowDeleteModal(false)} onDelete={handleDelete} />
            )}
        </div>
    )
}

export default TeamManagement
