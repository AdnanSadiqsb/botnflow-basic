import React, { useContext, useState } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Avatar,
    Menu,
    MenuItem,
    ListItemIcon,
    Divider,
    Switch,
    Tab,
    Tabs,
    Box,
    Paper,
    TextField,
    Select,
    InputAdornment,
    Button,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Chip,
    Card,
    CardContent,
    Typography,
    LinearProgress
} from '@mui/material';
import {
    Menu as MenuIcon,
    Search as SearchIcon,
    Notifications as NotificationsIcon,
    DarkMode as DarkModeIcon,
    LightMode as LightModeIcon,
    Person as PersonIcon,
    Settings as SettingsIcon,
    Logout as LogoutIcon,
    Language as LanguageIcon,
    CameraAlt as CameraAltIcon,
    Visibility as VisibilityIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Add as AddIcon,
    CreditCard as CreditCardIcon,
    CheckCircle as CheckCircleIcon,
    MoreVert as MoreVertIcon,
    Comment as CommentIcon,
    Phone as PhoneIcon,
    Email as EmailIcon,
    ShoppingCart as ShoppingCartIcon,
    Analytics as AnalyticsIcon,
    Support as SupportIcon,
    ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import { ContentContext } from '../../context/ContextProvider';
import General from './General';
import Channels from './Channels';
import Integration from './Integration';
import UserManagement from './UserManagement';
import Billing from './Billing';
import TeamManagement from './TeamManagement';

const Settings = () => {
    const { themeColor, secondaryThemeColor } = useContext(ContentContext)

    const [darkMode, setDarkMode] = useState(false);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [anchorElLang, setAnchorElLang] = useState(null);
    const [currentTab, setCurrentTab] = useState('general');
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const [smsActive, setSmsActive] = useState(true);
    const [smsSenderId, setSmsSenderId] = useState('CPAAS');
    const [smsApiKey, setSmsApiKey] = useState('•••••••••••••••••••');
    const [showSmsApiKey, setShowSmsApiKey] = useState(false);

    // State for WhatsApp channel
    const [whatsappActive, setWhatsappActive] = useState(true);
    const [whatsappNumber, setWhatsappNumber] = useState('+1 (555) 123-4567');
    const [whatsappApiKey, setWhatsappApiKey] = useState('•••••••••••••••••••');
    const [showWhatsappApiKey, setShowWhatsappApiKey] = useState(false);

    // State for Email channel
    const [emailActive, setEmailActive] = useState(true);
    const [emailFrom, setEmailFrom] = useState('notifications@cpaasportal.com');
    const [emailName, setEmailName] = useState('CPaaS Portal');

    // State for Voice channel
    const [voiceActive, setVoiceActive] = useState(false);
    const [voiceNumber, setVoiceNumber] = useState('');
    const [voiceApiKey, setVoiceApiKey] = useState('');
    const [showVoiceApiKey, setShowVoiceApiKey] = useState(false);

    const handleSaveChanges = () => {
        console.log('Saving changes...');
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleOpenLangMenu = (event) => {
        setAnchorElLang(event.currentTarget);
    };

    const handleCloseLangMenu = () => {
        setAnchorElLang(null);
    };

    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const tabStyle = (tabName) => ({
        color: dashboard === tabName ? themeColor : '',
        borderBottom: dashboard === tabName ? `2px solid ${themeColor}` : '2px solid transparent'
    });

    const tabs = [
        { id: 'general', label: 'General' },
        { id: 'channels', label: 'Channels' },
        { id: 'integrations', label: 'Integrations' },
        { id: 'user-management', label: 'User Management' },
        { id: 'team-management', label: 'Team Management' },
        { id: 'billing', label: 'Billing' },
    ];

    return (
        <div className={`flex flex-col min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
            {/* Main Content */}
            <main
                className={`flex-1 mt-16 p-3 transition-all duration-300`}
            >
                <div className="max-w-7xl mx-auto">
                    {/* Page Header */}
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-800 ">Profile Management</h1>
                        <p className=" dark:text-gray-600 mt-1">Manage your account settings and preferences</p>
                    </div>

                    <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
                        <div className="md:flex overflow-x-auto hide-scrollbar">
                            {tabs.map((tab) => {
                                const isActive = currentTab === tab.id;

                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setCurrentTab(tab.id)}
                                        className={`block md:py-3 md:px-4 p-1 border-b-2 font-medium text-sm whitespace-nowrap`}
                                        style={{
                                            borderColor: isActive ? themeColor : 'transparent',
                                            color: isActive ? themeColor : 'gray',
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!isActive) e.currentTarget.style.color = secondaryThemeColor;
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!isActive) e.currentTarget.style.color = 'gray';
                                        }}
                                    >
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Tab Content: General */}
                    {currentTab === 'general' && (
                        <General />
                    )}

                    {/* Tab Content: Channels */}
                    {currentTab === 'channels' && (
                        <Channels />
                    )}

                    {/* Tab Content: Integrations */}
                    {currentTab === 'integrations' && (
                        <Integration />
                    )}

                    {/* Tab Content: User Management */}
                    {currentTab === 'user-management' && (
                        <UserManagement />
                    )}

                    {/* Tab Content: User Management */}
                    {currentTab === 'team-management' && (
                        <TeamManagement />
                    )}

                    {/* Tab Content: Billing */}
                    {currentTab === 'billing' && (
                        <Billing />
                    )}
                </div>
            </main>
        </div>
    );
};

export default Settings;