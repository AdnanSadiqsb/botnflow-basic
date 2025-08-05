import { useContext, useEffect, useState, useRef } from "react";
import {
    Add, Search, Group, PersonAdd, Person, EmojiEvents, Business,
    Visibility, Edit, Delete, Upload, Download, Close
} from "@mui/icons-material";
import { ContentContext } from "../../context/ContextProvider";
import useAxios from "../../utils/useAxios";
import CreateContact from "../../component/modal/CreateContact";
import DeleteModal from "../../component/modal/DeleteModal";
import { toast } from "react-toastify";
import getToken from "../../utils/GetToken";
import { exportToCSV } from "../../utils/exportToCSV";
import Loader from "../../component/Loader";
import ImportContactModal from "../../component/modal/ImportContactModal";
// import { debounce } from "lodash"; // Add this line if lodash is installed

const ITEMS_PER_PAGE = 5;

const Contacts = () => {
    const token = getToken();
    const { userInfo, themeColor, secondaryThemeColor } = useContext(ContentContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [importModal, setImportModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedContactId, setSelectedContactId] = useState(null);
    const [loading, setLoading] = useState(true); // loading true initially
    const [contactToEdit, setContactToEdit] = useState(null);
    const [hoveredTagContact, setHoveredTagContact] = useState(null);
    const [newTag, setNewTag] = useState("");
    const [data, setData] = useState([]);
    const tagModalRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [selectedChannel, setSelectedChannel] = useState('');
    const [previewContact, setPreviewContact] = useState(null);

    const channels = userInfo?.companyId?.companyIntegratedChannels || [];

    // Debounce searchTerm
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 400); // 400ms debounce
        return () => clearTimeout(handler);
    }, [searchTerm]);

    // Fetch contacts
    const getContact = async (search = '', channel = '', showLoading = false) => {
        if (showLoading) setLoading(true);
        const params = [];
        if (search) params.push(`search=${encodeURIComponent(search)}`);
        if (channel) params.push(`channel=${encodeURIComponent(channel)}`);
        const query = params.length ? `?${params.join('&')}` : '';
        const [responseData, fetchError] = await useAxios('GET', `contacts${query}`, token, null);
        if (responseData) {
            setData(responseData.data.contacts);
        } else {
            console.log(fetchError);
        }
        if (showLoading) setLoading(false);
    };

    // Initial fetch with loading
    useEffect(() => {
        getContact('', '', true);
        // eslint-disable-next-line
    }, []);

    // Fetch on search/filter change (no loading spinner)
    useEffect(() => {
        getContact(debouncedSearch, selectedChannel, false);
        setCurrentPage(1);
        // eslint-disable-next-line
    }, [debouncedSearch, selectedChannel]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (tagModalRef.current && !tagModalRef.current.contains(event.target)) {
                setHoveredTagContact(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        setContactToEdit(null);
    };

    const handleImport = () => {
        setImportModal(!importModal);
        // setContactToEdit(null);
    };

    // Remove filteredData, use data directly
    const paginatedData = data.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handleDelete = async () => {
        try {
            const [responseData] = await useAxios('DELETE', `contacts/${selectedContactId}`, token);
            if (responseData) {
                toast.success("Contact Deleted Successfully", { autoClose: 2000 });
                setShowDeleteModal(false);
                const [updatedData] = await useAxios('GET', 'contacts', token, null);
                if (updatedData) setData(updatedData.data.contacts);
            } else {
                toast.error("Failed to delete contact", { autoClose: 2000 });
            }
        } catch (error) {
            toast.error("Failed to delete contact", { autoClose: 2000 });
        }
    };

    const handleExport = () => {
        const headers = ["Name", "Client Email", "Phone", "Channel", "Tags"];

        const dataRows = data.map((user) => [
            `${user.firstName} ${user.lastName}`,
            user.clientEmail,
            user.phoneNumber,
            user.channel,
            Array.isArray(user.tags) ? user.tags.join(" | ") : "",
        ]);

        exportToCSV("users.csv", headers, dataRows);
    };


    const handleTagHover = (contact, event) => {
        setHoveredTagContact(contact);
    };

    const removeTag = async (contactId, tagToRemove) => {
        try {
            const updatedTags = hoveredTagContact.tags.filter(tag => tag !== tagToRemove);
            const payload = { tags: updatedTags };

            const [responseData] = await useAxios('PATCH', `contacts/${contactId}`, token, payload);
            if (responseData) {
                setData(prevData =>
                    prevData.map(contact =>
                        contact._id === contactId
                            ? { ...contact, tags: updatedTags }
                            : contact
                    )
                );
                setHoveredTagContact(prev => ({ ...prev, tags: updatedTags }));
                toast.success("Tag removed successfully", { autoClose: 2000 });
            }
        } catch (error) {
            toast.error("Failed to remove tag", { autoClose: 2000 });
        }
    };

    const addTag = async (contactId) => {
        const tag = newTag.trim();
        if (!tag) return;

        try {
            console.log("Adding tag:", tag);
            const updatedTags = [...(hoveredTagContact.tags || []), tag];
            const payload = { "tags": updatedTags };
            console.log("hovered tag contact", hoveredTagContact);
            const [responseData] = await useAxios('PATCH', `contacts/${contactId}`, token, payload);
            if (responseData) {
                setData(prevData =>
                    prevData.map(contact =>
                        contact._id === contactId
                            ? { ...contact, tags: updatedTags }
                            : contact
                    )
                );
                getContact(debouncedSearch, selectedChannel, false);
                setHoveredTagContact(prev => ({ ...prev, tags: updatedTags }));
                setNewTag("");
                toast.success("Tag added successfully", { autoClose: 2000 });
            }
        } catch (error) {
            toast.error("Failed to add tag", { autoClose: 2000 });
        }
    };

    const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="min-h-screen mt-16 bg-gray-50 font-sans">
            <div className="mb-6 p-3">
                <h1 className="text-2xl font-bold text-gray-900">Contact Management 123</h1>
                <p className="text-gray-600">Manage your contact groups and individual contacts</p>
            </div>

            <div className="lg:flex gap-6 py-3 pb-6 w-[97%] mx-auto">
                <div className="flex-1">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="p-4 border-b border-gray-200">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold text-gray-900">Tags</h2>
                                <button
                                    className="px-3 py-2 text-white text-sm rounded-lg flex items-center gap-1"
                                    style={{ backgroundColor: themeColor }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = secondaryThemeColor;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = themeColor;
                                    }}
                                >
                                    <Add fontSize="small" /> New 123
                                </button>
                            </div>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search groups..."
                                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg text-sm"
                                />
                                <Search className="absolute left-2.5 top-2.5 text-gray-400" fontSize="small" />
                            </div>
                        </div>

                        <div className="p-2 space-y-2">
                            {[
                                { name: "All Contacts", count: 1247, icon: <Group />, bg: "bg-blue-600", text: "text-white" },
                                { name: "Customers", count: 856, icon: <Person />, text: "text-green-500" },
                                { name: "Leads", count: 234, icon: <PersonAdd />, text: "text-yellow-500" },
                                { name: "VIP", count: 89, icon: <EmojiEvents />, text: "text-purple-500" },
                                { name: "Internal", count: 68, icon: <Business />, text: "text-blue-500" },
                            ].map((group, index) => (
                                <div
                                    key={index}
                                    className={`group-item rounded-lg p-3 cursor-pointer flex justify-between items-center ${index !== 0 ? "text-gray-900 hover:bg-gray-50" : ""}`}
                                    style={
                                        index === 0
                                            ? {
                                                backgroundColor: themeColor,
                                                color: "#fff",
                                            }
                                            : {}
                                    }
                                    onMouseEnter={(e) => {
                                        if (index === 0) e.currentTarget.style.backgroundColor = secondaryThemeColor;
                                    }}
                                    onMouseLeave={(e) => {
                                        if (index === 0) e.currentTarget.style.backgroundColor = themeColor;
                                    }}
                                >
                                    <div>
                                        <h3 className={`font-medium ${group.text}`}>{group.name}</h3>
                                        <p className={`text-sm ${group.text ? "opacity-80" : "text-gray-600"}`}>
                                            {group.count} contacts
                                        </p>
                                    </div>
                                    <div className={`${group.text}`}>{group.icon}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="md:flex-3 flex-2 mt-3 md:mt-0">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                        <div className="md:flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    placeholder="Search contacts..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-3 pr-3 py-2 border border-gray-300 rounded-lg w-40 md:w-64"
                                />

                                <select
                                    value={selectedChannel}
                                    onChange={(e) => setSelectedChannel(e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-lg"
                                >
                                    <option value="">All Channels</option>
                                    {channels.map((ch) => (
                                        <option key={ch._id} value={ch.type}>
                                            {ch.type.charAt(0).toUpperCase() + ch.type.slice(1)}
                                        </option>
                                    ))}
                                </select>

                            </div>
                            <div className="md:flex items-center space-x-2">
                                <div className="flex gap-2">
                                    <button
                                        className="px-3 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-1"
                                        onClick={handleExport}
                                    >
                                        <Download fontSize="small" /> Import
                                    </button>
                                    <button className="px-3 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-1" onClick={handleImport}>
                                        <Upload fontSize="small" /> Export
                                    </button>
                                </div>
                                <button
                                    onClick={toggleModal}
                                    className="px-3 py-2 text-white rounded-lg flex items-center gap-1 mt-3 md:mt-0"
                                    style={{ backgroundColor: themeColor }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = secondaryThemeColor;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = themeColor;
                                    }}
                                >
                                    <Add fontSize="small" /> Add Contact
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3"><input type="checkbox" /></th>
                                        <th className="px-4 py-3">Avatar</th>
                                        <th className="px-4 py-3">Name</th>
                                        <th className="px-4 py-3">Phone</th>
                                        <th className="px-4 py-3">Email</th>
                                        <th className="px-4 py-3">Channels</th>
                                        <th className="px-4 py-3">Tags</th>
                                        <th className="px-4 py-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 text-sm">
                                    {paginatedData.map((contact) => (
                                        <tr key={contact._id} className="hover:bg-gray-50">
                                            <td className="px-4 py-4"><input type="checkbox" /></td>
                                            <td className="px-4 py-4 ">
                                                <h1
                                                    className={`w-10 h-10 rounded-full flex justify-center items-center border-2 ${!contact.firstName ? 'border-gray-400' :
                                                        ['A', 'B', 'C', 'D'].includes(contact.firstName[0].toUpperCase()) ? 'border-blue-500' :
                                                            ['E', 'F', 'G', 'H'].includes(contact.firstName[0].toUpperCase()) ? 'border-green-500' :
                                                                ['I', 'J', 'K', 'L'].includes(contact.firstName[0].toUpperCase()) ? 'border-yellow-500' :
                                                                    ['M', 'N', 'O', 'P'].includes(contact.firstName[0].toUpperCase()) ? 'border-purple-500' :
                                                                        ['Q', 'R', 'S', 'T'].includes(contact.firstName[0].toUpperCase()) ? 'border-pink-500' :
                                                                            'border-red-500'
                                                        }`}
                                                >
                                                    <span className={`text-2xl font-semibold ${!contact.firstName ? 'text-gray-400' :
                                                        ['A', 'B', 'C', 'D'].includes(contact.firstName[0].toUpperCase()) ? 'text-blue-500' :
                                                            ['E', 'F', 'G', 'H'].includes(contact.firstName[0].toUpperCase()) ? 'text-green-500' :
                                                                ['I', 'J', 'K', 'L'].includes(contact.firstName[0].toUpperCase()) ? 'text-yellow-500' :
                                                                    ['M', 'N', 'O', 'P'].includes(contact.firstName[0].toUpperCase()) ? 'text-purple-500' :
                                                                        ['Q', 'R', 'S', 'T'].includes(contact.firstName[0].toUpperCase()) ? 'text-pink-500' :
                                                                            'text-red-500'
                                                        }`}>
                                                        {contact.firstName ? contact.firstName.slice(0, 1).toUpperCase() : "--"}
                                                    </span>
                                                </h1>
                                            </td>
                                            <td className="px-4 py-4 text-gray-900">
    <span className="block max-w-[100px] truncate whitespace-nowrap overflow-hidden">
        {contact.firstName || "--"}
    </span>
</td>
                                            <td className="px-4 py-4 text-gray-900">
                                                <span className="block max-w-[100px] truncate whitespace-nowrap overflow-hidden">
                                                    {contact.phoneNumber || "--"}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-gray-600">
                                                <span className="block max-w-[150px] truncate whitespace-nowrap overflow-hidden">
                                                    {contact.clientEmail || "--"}
                                                </span>
                                            </td>
                                            <td
                                                className={`px-4 py-4 ${contact.channel === 'twilio' ? 'text-blue-500' :
                                                    contact.channel === 'whatsapp' ? 'text-green-500' :
                                                        contact.channel === 'webchat' ? 'text-yellow-500' :
                                                            'text-gray-600'
                                                    }`}
                                            >
                                                {contact.channel}
                                            </td>
                                            <td className="px-4 py-4 relative">
                                                {Array.isArray(contact.tags) && contact.tags.filter(tag => tag?.trim()).length > 0 ? (
                                                    <div
                                                        className="flex flex-wrap gap-1"
                                                        onClick={(e) => handleTagHover(contact, e)}
                                                        style={{ cursor: "pointer" }}
                                                        title={contact.tags.join(", ")}
                                                    >
                                                        {contact.tags.slice(0, 2).map((tag, idx) => (
                                                            <span
                                                                key={idx}
                                                                className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${tag === 'Active'
                                                                        ? 'bg-green-100 text-green-800'
                                                                        : 'bg-blue-100 text-blue-800'
                                                                    }`}
                                                            >
                                                                {tag}
                                                            </span>
                                                        ))}
                                                        {contact.tags.length > 2 && (
                                                            <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                                +{contact.tags.length - 2}
                                                            </span>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-500 cursor-pointer" onClick={(e) => handleTagHover(contact, e)}>--</span>
                                                )}
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="flex space-x-2">
                                                    <Visibility
    fontSize="small"
    className="text-blue-600 hover:text-blue-800 cursor-pointer"
    onClick={() => setPreviewContact(contact)}
/>
                                                    <Edit
                                                        fontSize="small"
                                                        className="text-green-600 hover:text-green-800 cursor-pointer"
                                                        onClick={() => {
                                                            setContactToEdit(contact);
                                                            setIsModalOpen(true);
                                                        }}
                                                    />
                                                    <Delete
                                                        fontSize="small"
                                                        className="text-red-600 hover:text-red-800 cursor-pointer"
                                                        onClick={() => {
                                                            setSelectedContactId(contact._id);
                                                            setShowDeleteModal(true);
                                                        }}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="md:px-4 py-3 border-t border-gray-200 md:flex items-center justify-between">
                            <div className="text-sm text-gray-700">
                                Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, data.length)} of {data.length} contacts
                            </div>
                            <div className="flex space-x-2 mt-2 md:mt-0">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50"
                                >
                                    Previous
                                </button>
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`px-3 py-1 border rounded text-sm ${currentPage === i + 1 ? "text-white" : "text-gray-700 border-gray-300 hover:bg-gray-50"
                                            }`}
                                        style={currentPage === i + 1 ? { backgroundColor: themeColor } : {}}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                                <button
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                    className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tag Modal */}
            {hoveredTagContact && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black opacity-70"
                        onClick={() => setHoveredTagContact(null)}
                    ></div>

                    {/* Modal Content */}
                    <div
                        ref={tagModalRef}
                        className="bg-white rounded-lg max-w-md w-full p-6 relative z-50 mx-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="font-medium text-lg">Manage Tags</h4>
                            <button
                                onClick={() => setHoveredTagContact(null)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <Close fontSize="small" />
                            </button>
                        </div>

                        {/* Tags */}
                        <div className="mb-3 max-h-40 overflow-y-auto">
                            {hoveredTagContact.tags?.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {hoveredTagContact.tags.map((tag, idx) => (
                                        <span
                                            key={idx}
                                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                        >
                                            {tag}
                                            <Close
                                                fontSize="small"
                                                className="ml-1 cursor-pointer text-blue-600 hover:text-blue-800"
                                                onClick={() => removeTag(hoveredTagContact._id, tag)}
                                            />
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-sm">No tags yet</p>
                            )}
                        </div>

                        {/* Input */}
                        <div className="flex">
                            <input
                                type="text"
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                placeholder="Add new tag we23"
                                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-l focus:outline-none focus:ring-1 focus:ring-blue-500"
                                onKeyPress={(e) => e.key === 'Enter' && addTag(hoveredTagContact._id)}
                            />
                            <button
                                onClick={() => addTag(hoveredTagContact._id)}
                                className="px-3 py-2 text-sm bg-blue-500 text-white rounded-r hover:bg-blue-600"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            )}

            


            {isModalOpen && (
                <CreateContact
                    toggleModal={toggleModal}
                    contactToEdit={contactToEdit}
                    refreshContacts={() => getContact(debouncedSearch, selectedChannel, false)}
                />
            )}

            {showDeleteModal && (
                <DeleteModal onClose={() => setShowDeleteModal(false)} onDelete={handleDelete} />
            )}

            {importModal && (
                <ImportContactModal onClose={() => setImportModal(false)} />
            )}

            {previewContact && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="fixed inset-0 bg-black opacity-70"
                        onClick={() => setPreviewContact(null)}
                    ></div>
                    <div className="bg-white rounded-lg max-w-md w-full p-6 relative z-50 mx-4" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="font-medium text-lg">Contact Preview</h4>
                            <button
                                onClick={() => setPreviewContact(null)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <Close fontSize="small" />
                            </button>
                        </div>
                        <div className="space-y-2">
                            <div><strong>Name:</strong> {previewContact.firstName} {previewContact.lastName}</div>
                            <div><strong>Email:</strong> {previewContact.clientEmail}</div>
                            <div><strong>Phone:</strong> {previewContact.phoneNumber}</div>
                            <div><strong>Channel:</strong> {previewContact.channel}</div>
                            <div><strong>Business:</strong> {previewContact.clientBusinessDetail}</div>
                            <div><strong>Tags:</strong> {Array.isArray(previewContact.tags) && previewContact.tags.length > 0 ? previewContact.tags.join(", ") : "--"}</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Contacts;