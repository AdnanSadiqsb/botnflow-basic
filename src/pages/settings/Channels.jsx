import React, { useContext, useState } from 'react'
import {
    Switch,
} from '@mui/material';
import {
    Visibility as VisibilityIcon,
    Comment as CommentIcon,
    Phone as PhoneIcon,
    Email as EmailIcon,
} from '@mui/icons-material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { ContentContext } from '../../context/ContextProvider';

function Channels() {
    const { themeColor, secondaryThemeColor } = useContext(ContentContext)

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
    const getChannelInfo = async () => {
        try {
            const token = getToken();

            if (isWhatsApp && whatsAppChannelId) {
                const [whatsAppData, whatsAppError] = await useFetch('GET', `channel/whatsapp/${whatsAppChannelId}`, token);
                if (whatsAppData) {
                    setIsDeleted(whatsAppData.isDeleted);
                }
            }

            if (isTwilio && twilioChannelId) {
                const [twilioData, twilioError] = await useFetch('GET', `channel/twilio/${twilioChannelId}`, token);
                if (twilioData) {
                    setIsTwilioDeleted(twilioData.isDeleted);
                }
            }

            if (isWebChat && webChatChannelId) {
                const [webChatData, webChatError] = await useFetch('GET', `channel/webchat/${webChatChannelId}`, token);
                if (webChatData) {
                    setIsWebChatDeleted(webChatData.isDeleted);
                }
            }
        } catch (error) {
            toast.error(error.message || 'Failed to get channel info');
        }
    };

    const handleConnect = async () => {
        try {
            const token = getToken();
            const [responseData, error] = await useFetch('PATCH', `channel/whatsapp/toggle-active-channel/${whatsAppChannelId}`, token);
            if (responseData) {
                window.location.reload();
            }
        } catch (error) {
            toast.error(error.message || 'Failed to disconnect WhatsApp');
        }
    };

    const handleTwilioConnect = async () => {
        try {
            const token = getToken();
            const [responseData, error] = await useFetch('PATCH', `channel/twilio/toggle-active-channel/${twilioChannelId}`, token);
            if (responseData) {
                window.location.reload();
            }
        } catch (error) {
            toast.error(error.message || 'Failed to disconnect WhatsApp');
        }
    };

    const handleWebChatContact = async () => {
        try {
            const token = getToken();
            const [responseData, error] = await useFetch('PATCH', `channel/webchat/toggle-active-channel/${webChatChannelId}`, token);
            if (responseData) {
                window.location.reload();
            }
        } catch (error) {
            toast.error(error.message || 'Failed to disconnect WhatsApp');
        }
    };

    const handleWebChatSubmit = async () => {
        const dataToSubmit = {
            ...webChatData,
            config: {
                webchat: {
                    ...webChatData.config.webchat,
                    allowedDomains: webChatData.config.webchat.allowedDomains
                        .split(',')
                        .map(domain => domain.trim())
                }
            }
        };

        try {
            const token = getToken();
            let responseData, error;

            if (isWebChatConnected && webChatChannelId) {
                // Update existing channel
                [responseData, error] = await useFetch(
                    'PATCH',
                    `channel/webchat/${webChatChannelId}`,
                    token,
                    dataToSubmit
                );
            } else {
                // Create new channel
                [responseData, error] = await useFetch(
                    'POST',
                    `channel/webchat`,
                    token,
                    dataToSubmit
                );
            }

            if (responseData) {
                toast.success(`WebChat ${isWebChatConnected ? 'updated' : 'created'} successfully`);
                window.location.reload();
            }
        } catch (error) {
            toast.error(error.message || 'Failed to process WebChat');
        }
        setwebChatModal(false);
    };

    const handleTwilioSubmit = async () => {
        const payload = {
            name: formData.name,
            type: 'twilio',
            config: {
                twilio: {
                    TWILIO_ACCOUNT_SID: formData.TWILIO_ACCOUNT_SID,
                    TWILIO_AUTH_TOKEN: formData.TWILIO_AUTH_TOKEN,
                    twilioNumber: formData.twilioNumber,
                }
            }
        };

        try {
            const token = getToken();
            let responseData, error;

            if (isTwilioConnected && twilioChannelId) {
                // Update existing channel
                [responseData, error] = await useFetch(
                    'PATCH',
                    `channel/twilio/${twilioChannelId}`,
                    token,
                    payload
                );
            } else {
                // Create new channel
                [responseData, error] = await useFetch(
                    'POST',
                    '/channel/twilio',
                    token,
                    payload
                );
            }

            if (responseData) {
                toast.success(`Twilio channel ${isTwilioConnected ? 'updated' : 'connected'} successfully`);
                setModalOpen(false);
                window.location.reload();
            } else {
                toast.error(error?.message || error?.error || error || 'Registration error');
                setModalOpen(false);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleWhatsAppChange = (e) => {
        const { name, value } = e.target;
        setWhatsAppFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleWhatsAppSubmit = async () => {
        const payload = {
            name: whatsAppFormData.name || "WhatsApp Business",
            type: "whatsapp",
            config: {
                whatsapp: {
                    ...whatsAppFormData,
                    apiVersion: "v18.0"
                }
            }
        };

        try {
            const token = getToken();
            let responseData, error;

            if (isWhatsAppConnected && whatsAppChannelId) {
                // Update existing channel
                [responseData, error] = await useFetch(
                    'PATCH',
                    `channel/whatsapp/${whatsAppChannelId}`,
                    token,
                    payload
                );
            } else {
                // Create new channel
                [responseData, error] = await useFetch(
                    'POST',
                    '/channel/whatsapp',
                    token,
                    payload
                );
            }

            if (responseData) {
                toast.success(`WhatsApp channel ${isWhatsAppConnected ? 'updated' : 'connected'} successfully`);
                window.location.reload();
                setWhatsAppModalOpen(false);
            } else {
                toast.error(error?.message || `Error ${isWhatsAppConnected ? 'updating' : 'connecting'} WhatsApp`);
                setWhatsAppModalOpen(false);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleConfirmDisconnect = async () => {
        const typeInput = disconnectInput.trim().toLowerCase();

        if (isWhatsApp && typeInput === 'whatsapp') {
            if (whatsAppTool) {
                try {
                    const token = getToken();
                    const [responseData, error] = await useFetch('DELETE', `channel/whatsapp/${whatsAppChannelId}`, token);
                    if (responseData) {
                        toast.success('WhatsApp disconnected successfully');
                        window.location.reload();
                    }
                } catch (error) {
                    toast.error(error.message || 'Failed to disconnect WhatsApp');
                }
            }
        } else if (!isWhatsApp && typeInput === 'twilio') {
            if (twilioTool) {
                try {
                    const token = getToken();
                    const [responseData, error] = await useFetch('DELETE', `channel/twilio/${twilioChannelId}`, token);
                    if (responseData) {
                        toast.success('Twilio disconnected successfully');
                        window.location.reload();
                    }
                } catch (error) {
                    toast.error(error.message || 'Failed to disconnect Twilio');
                }
            }
        } else if (!isWhatsApp && typeInput === 'webchat') {
            if (webChatTool) {
                try {
                    const token = getToken();
                    const [responseData, error] = await useFetch('DELETE', `channel/webchat/${webChatChannelId}`, token);
                    if (responseData) {
                        toast.success('webChat disconnected successfully');
                        window.location.reload();
                    }
                } catch (error) {
                    toast.error(error.message || 'Failed to disconnect Twilio');
                }
            }
        } else {
            toast.error('Incorrect input. Please type the correct channel name to confirm.');
        }

        setDisconnectConfirmModalOpen(false);
    };

return (
    <div>
        <div className="space-y-6 mb-10">
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-800 mb-4">Communication Channels</h2>
                    <p className="text-gray-600 mb-6">Configure your messaging channels and sender settings</p>

                    {/* SMS Channel */}
                    <div className="border-t border-gray-200 pt-4 mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                                <CommentIcon className="text-xl text-gray-700 mr-3" />
                                <h3 className="text-base font-medium text-gray-800">SMTP SMS</h3>
                            </div>
                            <div className="flex items-center">
                                <span className={`mr-3 text-sm ${smsActive ? 'text-green-600' : 'text-gray-500'} font-medium`}>
                                    {smsActive ? 'Active' : 'Inactive'}
                                </span>
                                <Switch
                                    checked={smsActive}
                                    onChange={() => setSmsActive(!smsActive)}
                                    color="primary"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label htmlFor="smsName" className="block text-sm font-medium text-gray-700 mb-1">Sender ID</label>
                                <input
                                    type="text"
                                    id="smsName"
                                    name="smsName"
                                    value={smsSenderId}
                                    onChange={(e) => setSmsSenderId(e.target.value)}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                                />
                            </div>
                            <div>
                                <label htmlFor="smsApiKey" className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
                                <div className="relative">
                                    <input
                                        type={showSmsApiKey ? "text" : "password"}
                                        id="smsApiKey"
                                        name="smsApiKey"
                                        value={smsApiKey}
                                        onChange={(e) => setSmsApiKey(e.target.value)}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2 pr-10"
                                    />
                                    <button
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
                                        onClick={() => setShowSmsApiKey(!showSmsApiKey)}
                                    >
                                        {showSmsApiKey ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* WhatsApp Channel */}
                    <div className="border-t border-gray-200 pt-4 mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                                <CommentIcon className="text-xl text-gray-700 mr-3" />
                                <h3 className="text-base font-medium text-gray-800">WhatsApp</h3>
                            </div>
                            <div className="flex items-center">
                                <span className={`mr-3 text-sm ${whatsappActive ? 'text-green-600' : 'text-gray-500'} font-medium`}>
                                    {whatsappActive ? 'Active' : 'Inactive'}
                                </span>
                                <Switch
                                    checked={whatsappActive}
                                    onChange={() => setWhatsappActive(!whatsappActive)}
                                    color="primary"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label htmlFor="waNumber" className="block text-sm font-medium text-gray-700 mb-1">Business Phone Number</label>
                                <input
                                    type="text"
                                    id="waNumber"
                                    name="waNumber"
                                    value={whatsappNumber}
                                    onChange={(e) => setWhatsappNumber(e.target.value)}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                                />
                            </div>
                            <div>
                                <label htmlFor="waApiKey" className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
                                <div className="relative">
                                    <input
                                        type={showWhatsappApiKey ? "text" : "password"}
                                        id="waApiKey"
                                        name="waApiKey"
                                        value={whatsappApiKey}
                                        onChange={(e) => setWhatsappApiKey(e.target.value)}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2 pr-10"
                                    />
                                    <button
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
                                        onClick={() => setShowWhatsappApiKey(!showWhatsappApiKey)}
                                    >
                                        {showWhatsappApiKey ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Email Channel */}
                    <div className="border-t border-gray-200 pt-4 mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                                <EmailIcon className="text-xl text-gray-700 mr-3" />
                                <h3 className="text-base font-medium text-gray-800">Email</h3>
                            </div>
                            <div className="flex items-center">
                                <span className={`mr-3 text-sm ${emailActive ? 'text-green-600' : 'text-gray-500'} font-medium`}>
                                    {emailActive ? 'Active' : 'Inactive'}
                                </span>
                                <Switch
                                    checked={emailActive}
                                    onChange={() => setEmailActive(!emailActive)}
                                    color="primary"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label htmlFor="emailFrom" className="block text-sm font-medium text-gray-700 mb-1">From Email</label>
                                <input
                                    type="email"
                                    id="emailFrom"
                                    name="emailFrom"
                                    value={emailFrom}
                                    onChange={(e) => setEmailFrom(e.target.value)}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                                />
                            </div>
                            <div>
                                <label htmlFor="emailName" className="block text-sm font-medium text-gray-700 mb-1">From Name</label>
                                <input
                                    type="text"
                                    id="emailName"
                                    name="emailName"
                                    value={emailName}
                                    onChange={(e) => setEmailName(e.target.value)}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Voice Channel */}
                    <div className="border-t border-gray-200 pt-4">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                                <PhoneIcon className="text-xl text-gray-700 mr-3" />
                                <h3 className="text-base font-medium text-gray-800">Voice</h3>
                            </div>
                            <div className="flex items-center">
                                <span className={`mr-3 text-sm ${voiceActive ? 'text-green-600' : 'text-gray-500'} font-medium`}>
                                    {voiceActive ? 'Active' : 'Inactive'}
                                </span>
                                <Switch
                                    checked={voiceActive}
                                    onChange={() => setVoiceActive(!voiceActive)}
                                    color="primary"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label htmlFor="voiceNumber" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input
                                    type="text"
                                    id="voiceNumber"
                                    name="voiceNumber"
                                    placeholder="Enter phone number"
                                    value={voiceNumber}
                                    onChange={(e) => setVoiceNumber(e.target.value)}
                                    className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2 ${!voiceActive ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={!voiceActive}
                                />
                            </div>
                            <div>
                                <label htmlFor="voiceApiKey" className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
                                <div className="relative">
                                    <input
                                        type={showVoiceApiKey ? "text" : "password"}
                                        id="voiceApiKey"
                                        name="voiceApiKey"
                                        placeholder="Enter API key"
                                        value={voiceApiKey}
                                        onChange={(e) => setVoiceApiKey(e.target.value)}
                                        className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border p-2 pr-10 ${!voiceActive ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        disabled={!voiceActive}
                                    />
                                    <button
                                        className={`absolute inset-y-0 right-0 pr-3 flex items-center ${!voiceActive ? 'text-gray-400' : 'text-gray-600'}`}
                                        onClick={() => setShowVoiceApiKey(!showVoiceApiKey)}
                                        disabled={!voiceActive}
                                    >
                                        {showVoiceApiKey ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-6 py-3 bg-gray-50 text-right">
                    <button
                        type="button"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
                        onClick={handleSaveChanges}
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
        </div>
    </div>
);

}

export default Channels
