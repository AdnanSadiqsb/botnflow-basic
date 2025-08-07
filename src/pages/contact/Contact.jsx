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












const ITEMS_PER_PAGE = 5;

const Contacts = () => {
    const token = getToken();
    const { userInfo, themeColor, secondaryThemeColor } = useContext(ContentContext);
    const [activeTagIndex, setActiveTagIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [importModal, setImportModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedContactId, setSelectedContactId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [contactToEdit, setContactToEdit] = useState(null);
    const [hoveredTagContact, setHoveredTagContact] = useState(null);
    const [newTag, setNewTag] = useState("");
    const [data, setData] = useState([]);
    const [tags, setTags] = useState([]);
    const [tagsLoading, setTagsLoading] = useState(false);
    const tagModalRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [selectedChannel, setSelectedChannel] = useState('');
    const [previewContact, setPreviewContact] = useState(null);
    const [hoveredTagIndex, setHoveredTagIndex] = useState(null);
    const [tagSearch, setTagSearch] = useState('');
    const [debouncedTagSearch, setDebouncedTagSearch] = useState('');




    const [allTags, setAllTags] = useState([]);
const [selectedTags, setSelectedTags] = useState([]);

useEffect(() => {
  if (hoveredTagContact) {
    setSelectedTags(hoveredTagContact.tags || []);
  }
}, [hoveredTagContact]);



const toggleTag = (tagName) => {
  setSelectedTags((prev) =>
    prev.includes(tagName)
      ? prev.filter((tag) => tag !== tagName)
      : [...prev, tagName]
  );
};

const saveTagsToContact = async (contactId) => {
  try {
    await axios.patch(`/api/contacts/${contactId}`, {
      tags: selectedTags,
    });
    // Update UI or refetch contacts as needed
    setHoveredTagContact(null);
  } catch (err) {
    console.error("Failed to save tags", err);
  }
};

    // 2. Debounce the tag search input:
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedTagSearch(tagSearch);
        }, 400);
        return () => clearTimeout(handler);
    }, [tagSearch]);

    // 3. Fetch tags when debouncedTagSearch changes:
    useEffect(() => {
        fetchTags(debouncedTagSearch);
        // eslint-disable-next-line
    }, [debouncedTagSearch]);

    // Tag modal states
    const [isTagModalOpen, setIsTagModalOpen] = useState(false);
    const [newTagData, setNewTagData] = useState({
        name: "",
        description: "",
        favicon: "👑"
    });
    const [tagLoading, setTagLoading] = useState(false);

    // Tag delete modal states
    const [deleteTagModal, setDeleteTagModal] = useState(false);
    const [tagToDelete, setTagToDelete] = useState(null);

    const iconList = ["👑", "⭐", "🔥", "💼", "🎯", "💎", "🛡️", "🚀", "🎉", "🏆"];

    const channels = userInfo?.companyId?.companyIntegratedChannels || [];

    // Debounce searchTerm
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 400);
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

    // Fetch tags
    const fetchTags = async (search = "") => {
        setTagsLoading(true);
        const [responseData] = await useAxios("GET", `tags?search=${encodeURIComponent(search)}`, token);
        if (responseData && responseData.data && Array.isArray(responseData.data.tags)) {
            setTags(responseData.data.tags);
            setAllTags(responseData.data.tags);
        }
        setTagsLoading(false);
    };

    // Initial fetch
    useEffect(() => {
        getContact('', '', true);
        fetchTags();
        // eslint-disable-next-line
    }, []);

    // Fetch on search/filter change
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
    };

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
  if (!selectedTags || selectedTags.length === 0) return;

  try {
    const updatedTags = [...selectedTags]; // ✅ Correct way to copy selectedTags
    const payload = { tags: updatedTags };

    const [responseData] = await useAxios(
      'PATCH',
      `contacts/${contactId}`,
      token,
      payload
    );

    if (responseData) {
      // Update local contact state
      setData(prevData =>
        prevData.map(contact =>
          contact._id === contactId
            ? { ...contact, tags: updatedTags }
            : contact
        )
      );

      getContact(debouncedSearch, selectedChannel, false); // Optional: refetch
      setHoveredTagContact(prev => ({ ...prev, tags: updatedTags }));
      toast.success("Tags updated successfully", { autoClose: 2000 });
    }
  } catch (error) {
    console.error(error);
    toast.error("Failed to update tags", { autoClose: 2000 });
  }
};


    // Tag delete logic
    const handleDeleteTag = async () => {
        if (!tagToDelete) return;
        try {
            const [res] = await useAxios("DELETE", `tags/${tagToDelete._id}`, token);
            if (res && res.success) {
                toast.success("Tag deleted successfully!");
                setDeleteTagModal(false);
                setTagToDelete(null);
                fetchTags();
            } else {
                toast.error("Failed to delete tag");
            }
        } catch (err) {
            toast.error("Failed to delete tag");
        }
    };

    const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="min-h-screen mt-16 bg-gray-50 font-sans">
            <div className="mb-6 p-3">
                <h1 className="text-2xl font-bold text-gray-900">Contact Management</h1>
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
                                    onClick={() => setIsTagModalOpen(true)}
                                >
                                    <Add fontSize="small" /> New
                                </button>
                            </div>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search groups..."
                                    value={tagSearch}
                                    onChange={e => setTagSearch(e.target.value)}
                                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg text-sm"
                                />
                                <Search className="absolute left-2.5 top-2.5 text-gray-400" fontSize="small" />
                            </div>
                        </div>

                        <div className="p-2 space-y-2">
                            
                            {!tags.length ? (
                                <div className="text-center text-gray-400 py-8 text-sm">No groups found</div>
                            ) : (
                                tags.map((group, index) => (
                                    <div
                                        key={index}
                                        className={`group-item rounded-lg p-3 cursor-pointer flex justify-between items-center transition-colors duration-150 ${activeTagIndex === index
                                                ? "bg-blue-600 text-white"
                                                : "bg-white text-gray-900 hover:bg-gray-50"
                                            }`}
                                        onClick={() => setActiveTagIndex(index)}
                                        onMouseEnter={() => setHoveredTagIndex(index)}
                                        onMouseLeave={() => setHoveredTagIndex(null)}
                                    >
                                        <div>
                                            <h3 className="font-medium">{group.name}</h3>
                                            <p className={`text-sm ${activeTagIndex === index ? "text-white" : "text-gray-600"}`}>
                                                {group.contactCount} contacts
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {hoveredTagIndex === index && (
                                                <span
                                                    className="ml-2"
                                                    onClick={e => {
                                                        e.stopPropagation();
                                                        setTagToDelete(group);
                                                        setDeleteTagModal(true);
                                                    }}
                                                    onMouseEnter={e => (e.currentTarget.style.color = "#ef4444")}
                                                    onMouseLeave={e => (e.currentTarget.style.color = "")}
                                                >
                                                    <Delete
                                                        fontSize="small"
                                                        className="cursor-pointer"
                                                    />
                                                </span>
                                            )}
                                            <span>{group.favicon}</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
                {/* file chnage */}

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
                                        onClick={handleImport}
                                    >

                                        <Download fontSize="small" /> Import
                                    </button>
                                    <button className="px-3 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-1" 
                                  
                                        onClick={handleExport}
                                    >
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

            {/* Tag Delete Confirmation Modal */}
            {deleteTagModal && tagToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="fixed inset-0 bg-black opacity-70"
                        onClick={() => setDeleteTagModal(false)}
                    ></div>
                    <div className="bg-white rounded-lg max-w-sm w-full p-6 relative z-50 mx-4" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="font-medium text-lg">Delete Tag</h4>
                            <button
                                onClick={() => setDeleteTagModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <Close fontSize="small" />
                            </button>
                        </div>
                        <div className="mb-4">
                            Are you sure you want to delete the tag <span className="font-semibold">{tagToDelete.name}</span>?
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                onClick={() => setDeleteTagModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                onClick={handleDeleteTag}
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Tag Modal */}
            {hoveredTagContact && (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div
      className="fixed inset-0 bg-black opacity-70"
      onClick={() => setHoveredTagContact(null)}
    ></div>

    <div
      ref={tagModalRef}
      className="bg-white rounded-lg max-w-md w-full p-6 relative z-50 mx-4"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-medium text-lg">Manage Tags</h4>
        <button
          onClick={() => setHoveredTagContact(null)}
          className="text-gray-500 hover:text-gray-700"
        >
          <Close fontSize="small" />
        </button>
      </div>

      {/* Selected Tags Display */}
      <div className="mb-3 max-h-40 overflow-y-auto">
        {selectedTags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {selectedTags.map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {tag}
                <Close
                  fontSize="small"
                  className="ml-1 cursor-pointer text-blue-600 hover:text-blue-800"
                  onClick={() => toggleTag(tag)}
                />
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No tags yet</p>
        )}
      </div>

      {/* Multi-Select Tag Picker */}
      <div className="mb-4 border border-gray-300 rounded px-3 py-2">
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => {
            const isSelected = selectedTags.includes(tag.name);
            return (
              <div
                key={tag._id}
                onClick={() => toggleTag(tag.name)}
                className={`flex items-center text-sm border px-2 py-1 rounded cursor-pointer ${
                  isSelected
                    ? "bg-blue-100 text-blue-700 border-blue-300"
                    : "hover:bg-gray-100"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => {}}
                  className="mr-2"
                />
                {tag.favicon} {tag.name}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => addTag(hoveredTagContact._id)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save Tags
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

            {isTagModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="fixed inset-0 bg-black opacity-70"
                        onClick={() => setIsTagModalOpen(false)}
                    ></div>
                    <div className="bg-white rounded-lg max-w-md w-full p-6 relative z-50 mx-4" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="font-medium text-lg">Add New Tag</h4>
                            <button
                                onClick={() => setIsTagModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <Close fontSize="small" />
                            </button>
                        </div>
                        <form
                            className="space-y-4"
                            onSubmit={async (e) => {
                                e.preventDefault();
                                setTagLoading(true);
                                const [res, err] = await useAxios(
                                    "POST",
                                    "tags",
                                    token,
                                    newTagData
                                );
                                setTagLoading(false);
                                if (res && res.success) {
                                    toast.success("Tag added successfully!");
                                    setIsTagModalOpen(false);
                                    setNewTagData({ name: "", description: "", favicon: "👑" });
                                    fetchTags();
                                } else {
                                    toast.error(err?.message || "Failed to add tag");
                                }
                            }}
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    value={newTagData.name}
                                    onChange={e => setNewTagData(d => ({ ...d, name: e.target.value }))}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    value={newTagData.description}
                                    onChange={e => setNewTagData(d => ({ ...d, description: e.target.value }))}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                                <div className="flex flex-wrap gap-2">
                                    {iconList.map(icon => (
                                        <button
                                            type="button"
                                            key={icon}
                                            className={`text-2xl p-1 rounded ${newTagData.favicon === icon ? "bg-blue-100 border border-blue-400" : "hover:bg-gray-100"}`}
                                            onClick={() => setNewTagData(d => ({ ...d, favicon: icon }))}
                                        >
                                            {icon}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    disabled={tagLoading}
                                >
                                    {tagLoading ? "Adding..." : "Add Tag"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Contacts;