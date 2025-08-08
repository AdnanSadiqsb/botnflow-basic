import React, { useContext, useState } from 'react';
import {
    ArrowForward as ArrowForwardIcon,
    Comment as CommentIcon,
    Phone as PhoneIcon,
    Email as EmailIcon,
    Chat as ChatIcon,
} from '@mui/icons-material';
import { Switch } from '@mui/material';
import { ContentContext } from '../../context/ContextProvider';
import useAxios from '../../utils/useAxios';
import getToken from '../../utils/GetToken';
import { toast } from 'react-toastify';

function Channels() {
    const { themeColor, secondaryThemeColor } = useContext(ContentContext);
    const token = getToken();

    // Modal state
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const [modalData, setModalData] = useState({});
    const [loading, setLoading] = useState(false);

    // Company channels from backend
    const [companyChannels, setCompanyChannels] = useState([
        { type: "twilio", channelId: "68516579b5e80164e8afed3e", _id: "6851657a89f52017ce797c4d" },
        { type: "whatsapp", channelId: "685176129f3bf18c37e3e6bc", _id: "6851761289f52017ce797d90" },
        { type: "webchat", channelId: "6868ce6049b18c222795cd4c", _id: "6868ce608eda478a86363818" },
        { type: "smtp", channelId: "689598e80f478e244e0b7eed", _id: "689598e98b0c9537512aa11f" }
    ]);

    // Helper to check if channel exists
    const getChannel = (type) => companyChannels.find(c => c.type === type);

    // Toggle active/inactive
    const handleToggleActive = async (type) => {
        const channel = getChannel(type);
        if (!channel) return;
        setLoading(true);
        try {
            const [responseData] = await useAxios(
                'PATCH',
                `channel/${type}/toggle-active-channel/`,
                token
            );
            if (responseData) {
                toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} channel toggled`);
            }
        } catch (error) {
            toast.error('Failed to toggle channel');
        }
        setLoading(false);
    };

    // Open modal for channel config and prefill if exists
    const openChannelModal = async (type) => {
        setModalType(type);
        setModalOpen(true);
        setModalData({});
        let url = '';
        if (type === 'twilio') url = 'channel/twilio/';
        if (type === 'smtp') url = 'channel/smtp/';
        if (type === 'webchat') url = 'channel/webchat/';
        if (type === 'whatsapp') url = 'channel/whatsapp/';
        if (getChannel(type)) {
            setLoading(true);
            try {
                const [responseData] = await useAxios('GET', url, token);
                if (responseData && responseData.data && responseData.data.channel) {
                    const channel = responseData.data.channel;
                    if (type === 'twilio') {
                        setModalData({
                            name: channel.name,
                            TWILIO_ACCOUNT_SID: channel.config.twilio.TWILIO_ACCOUNT_SID,
                            TWILIO_AUTH_TOKEN: channel.config.twilio.TWILIO_AUTH_TOKEN,
                            twilioNumber: channel.config.twilio.twilioNumber,
                            description: channel.description || "",
                        });
                    }
                    if (type === 'smtp') {
                        setModalData({
                            name: channel.name,
                            AWS_ACCESS_KEY_ID: channel.config.smtp.AWS_ACCESS_KEY_ID,
                            AWS_SECRET_ACCESS_KEY: channel.config.smtp.AWS_SECRET_ACCESS_KEY,
                            AWS_REGION: channel.config.smtp.AWS_REGION,
                            EMAIL_FROM: channel.config.smtp.EMAIL_FROM,
                            description: channel.description || "",
                        });
                    }
                    if (type === 'webchat') {
                        setModalData({
                            name: channel.name,
                            primaryColor: channel.config.webchat.primaryColor,
                            welcomeMessage: channel.config.webchat.welcomeMessage,
                            agentAvatar: channel.config.webchat.agentAvatar,
                            chatPosition: channel.config.webchat.chatPosition,
                            widgetTitle: channel.config.webchat.widgetTitle,
                            autoOpen: channel.config.webchat.autoOpen,
                            enableFileUpload: channel.config.webchat.enableFileUpload,
                            language: channel.config.webchat.language,
                            webhookUrl: channel.config.webchat.webhookUrl,
                            allowedDomains: channel.config.webchat.allowedDomains,
                            description: channel.description || "",
                        });
                    }
                    if (type === 'whatsapp') {
                        setModalData({
                            name: channel.name,
                            wabaId: channel.config.whatsapp.wabaId,
                            phoneNumberId: channel.config.whatsapp.phoneNumberId,
                            phoneNumber: channel.config.whatsapp.phoneNumber,
                            webhookVerifyToken: channel.config.whatsapp.webhookVerifyToken,
                            apiVersion: channel.config.whatsapp.apiVersion,
                            description: channel.description || "",
                        });
                    }
                }
            } catch (error) {
                toast.error('Failed to fetch channel info');
            }
            setLoading(false);
        }
    };

    // Submit handler for channel config
    const handleModalSubmit = async () => {
        setLoading(true);
        let url = '';
        let payload = {};
        let method = getChannel(modalType) ? 'PATCH' : 'POST';

        if (modalType === 'twilio') {
            url = 'channel/twilio';
            payload = {
                name: modalData.name || "Twilio Channel for ZingTel",
                type: "twilio",
                description: modalData.description || "",
                config: {
                    twilio: {
                        TWILIO_ACCOUNT_SID: modalData.TWILIO_ACCOUNT_SID || "",
                        TWILIO_AUTH_TOKEN: modalData.TWILIO_AUTH_TOKEN || "",
                        twilioNumber: modalData.twilioNumber || ""
                    }
                }
            };
        }
        if (modalType === 'smtp') {
            url = 'channel/smtp';
            payload = {
                name: modalData.name || "Smtp Channel for BotNFlow",
                type: "smtp",
                description: modalData.description || "Smtp channel to send email",
                config: {
                    smtp: {
                        AWS_ACCESS_KEY_ID: modalData.AWS_ACCESS_KEY_ID || "",
                        AWS_SECRET_ACCESS_KEY: modalData.AWS_SECRET_ACCESS_KEY || "",
                        AWS_REGION: modalData.AWS_REGION || "",
                        EMAIL_FROM: modalData.EMAIL_FROM || ""
                    }
                }
            };
        }
        if (modalType === 'webchat') {
            url = 'channel/webchat';
            payload = {
                name: modalData.name || "Webchat",
                type: "webchat",
                description: modalData.description || "",
                config: {
                    webchat: {
                        primaryColor: modalData.primaryColor || "#00b894",
                        welcomeMessage: modalData.welcomeMessage || "Welcome! Let us know how we can assist you.",
                        agentAvatar: modalData.agentAvatar || "",
                        chatPosition: modalData.chatPosition || "bottom-right",
                        widgetTitle: modalData.widgetTitle || "Support Chat",
                        autoOpen: modalData.autoOpen || true,
                        enableFileUpload: modalData.enableFileUpload || true,
                        language: modalData.language || "en",
                        webhookUrl: modalData.webhookUrl || "",
                        allowedDomains: modalData.allowedDomains || []
                    }
                }
            };
        }
        if (modalType === 'whatsapp') {
            url = 'channel/whatsapp';
            payload = {
                name: modalData.name || "WhatsApp Business Channel for ZingTel",
                type: "whatsapp",
                description: modalData.description || "",
                config: {
                    whatsapp: {
                        wabaId: modalData.wabaId || "",
                        phoneNumberId: modalData.phoneNumberId || "",
                        phoneNumber: modalData.phoneNumber || "",
                        webhookVerifyToken: modalData.webhookVerifyToken || "",
                        apiVersion: modalData.apiVersion || "v18.0"
                    }
                }
            };
        }

        try {

            if (method === 'PATCH') {
                // remove type key from payload
                delete payload.type;
            }
            const [responseData] = await useAxios(
                method,
                url,
                token,
                payload
            );
            if (responseData) {
                toast.success(`${modalType.charAt(0).toUpperCase() + modalType.slice(1)} channel ${method === 'POST' ? 'created' : 'updated'} successfully`);
                setModalOpen(false);
            }
        } catch (error) {
            toast.error('Failed to save channel');
        }
        setLoading(false);
    };

    // Channel card data
    const channelCards = [
        {
            type: 'twilio',
            icon: <PhoneIcon className="text-blue-600 text-xl" />,
            name: 'Twilio',
            desc: 'Send and receive SMS & voice calls using Twilio.',
            connect: () => openChannelModal('twilio'),
            active: !!getChannel('twilio'),
            toggle: () => handleToggleActive('twilio'),
        },
        {
            type: 'whatsapp',
            icon: <CommentIcon className="text-green-600 text-xl" />,
            name: 'WhatsApp',
            desc: 'Send and receive WhatsApp messages using your business number.',
            connect: () => openChannelModal('whatsapp'),
            active: !!getChannel('whatsapp'),
            toggle: () => handleToggleActive('whatsapp'),
        },
        {
            type: 'webchat',
            icon: <ChatIcon className="text-teal-600 text-xl" />,
            name: 'WebChat',
            desc: 'Chat with your users directly on your website.',
            connect: () => openChannelModal('webchat'),
            active: !!getChannel('webchat'),
            toggle: () => handleToggleActive('webchat'),
        },
        {
            type: 'smtp',
            icon: <EmailIcon className="text-indigo-600 text-xl" />,
            name: 'SMTP Email',
            desc: 'Send notifications and updates via email.',
            connect: () => openChannelModal('smtp'),
            active: !!getChannel('smtp'),
            toggle: () => handleToggleActive('smtp'),
        },
        // Coming soon channels
        {
            type: 'telegram',
            icon: <CommentIcon className="text-blue-400 text-xl" />,
            name: 'Telegram',
            desc: 'Send and receive Telegram messages.',
            comingSoon: true,
        },
        {
            type: 'messenger',
            icon: <CommentIcon className="text-blue-500 text-xl" />,
            name: 'Messenger',
            desc: 'Connect with users via Facebook Messenger.',
            comingSoon: true,
        },
    ];

    return (
        <div>
            <div className="space-y-6 mb-10">
                <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                    <div className="p-6">
                        <h2 className="text-lg font-medium text-gray-800 mb-4">Available Channels</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {channelCards.map((card, idx) => (
                                <div key={card.type} className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center mb-3">
                                            <div className={`w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-4`}>
                                                {card.icon}
                                            </div>
                                            <h4 className="font-medium text-gray-800">{card.name}</h4>
                                        </div>
                                        <p className="text-sm text-gray-500 mb-3">{card.desc}</p>
                                    </div>
                                    <div className="mt-auto pt-2 flex items-center justify-between">
                                        {card.comingSoon ? (
                                            <button className="text-sm font-medium px-4 py-2 rounded bg-gray-200 text-gray-500 cursor-not-allowed" disabled>
                                                Coming Soon
                                            </button>
                                        ) : (
                                            <>
                                                <button
                                                    className="text-sm font-medium"
                                                    style={{ color: themeColor }}
                                                    onClick={card.connect}
                                                    onMouseEnter={e => {
                                                        e.currentTarget.style.color = secondaryThemeColor;
                                                    }}
                                                    onMouseLeave={e => {
                                                        e.currentTarget.style.color = themeColor;
                                                    }}
                                                >
                                                    {card.active ? "View" : <>Connect <ArrowForwardIcon className="ml-1" fontSize="small" /></>}
                                                </button>
                                                <Switch
                                                    checked={card.active}
                                                    onChange={card.toggle}
                                                    color="primary"
                                                    disabled={!card.active || loading}
                                                />
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for channel config */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="fixed inset-0 bg-black opacity-60" onClick={() => setModalOpen(false)}></div>
                    <div className="bg-white rounded-lg max-w-md w-full p-6 relative z-50 mx-4" onClick={e => e.stopPropagation()}>
                        <h4 className="font-medium text-lg text-gray-800 mb-4">{modalType.charAt(0).toUpperCase() + modalType.slice(1)} Channel Configuration</h4>
                        {/* Render fields based on modalType */}
                        {modalType === 'twilio' && (
                            <>
                                <input className="w-full border border-gray-300 rounded-md p-2 mb-2" placeholder="Channel Name" value={modalData.name || ''} onChange={e => setModalData({ ...modalData, name: e.target.value })} />
                                <input className="w-full border border-gray-300 rounded-md p-2 mb-2" placeholder="Account SID" value={modalData.TWILIO_ACCOUNT_SID || ''} onChange={e => setModalData({ ...modalData, TWILIO_ACCOUNT_SID: e.target.value })} />
                                <input className="w-full border border-gray-300 rounded-md p-2 mb-2" placeholder="Auth Token" value={modalData.TWILIO_AUTH_TOKEN || ''} onChange={e => setModalData({ ...modalData, TWILIO_AUTH_TOKEN: e.target.value })} />
                                <input className="w-full border border-gray-300 rounded-md p-2 mb-2" placeholder="Twilio Number" value={modalData.twilioNumber || ''} onChange={e => setModalData({ ...modalData, twilioNumber: e.target.value })} />
                                <input className="w-full border border-gray-300 rounded-md p-2 mb-2" placeholder="Description" value={modalData.description || ''} onChange={e => setModalData({ ...modalData, description: e.target.value })} />
                            </>
                        )}
                        {modalType === 'smtp' && (
                            <>
                                <input className="w-full border border-gray-300 rounded-md p-2 mb-2" placeholder="Channel Name" value={modalData.name || ''} onChange={e => setModalData({ ...modalData, name: e.target.value })} />
                                <input className="w-full border border-gray-300 rounded-md p-2 mb-2" placeholder="AWS Access Key ID" value={modalData.AWS_ACCESS_KEY_ID || ''} onChange={e => setModalData({ ...modalData, AWS_ACCESS_KEY_ID: e.target.value })} />
                                <input className="w-full border border-gray-300 rounded-md p-2 mb-2" placeholder="AWS Secret Access Key" value={modalData.AWS_SECRET_ACCESS_KEY || ''} onChange={e => setModalData({ ...modalData, AWS_SECRET_ACCESS_KEY: e.target.value })} />
                                <input className="w-full border border-gray-300 rounded-md p-2 mb-2" placeholder="AWS Region" value={modalData.AWS_REGION || ''} onChange={e => setModalData({ ...modalData, AWS_REGION: e.target.value })} />
                                <input className="w-full border border-gray-300 rounded-md p-2 mb-2" placeholder="Email From" value={modalData.EMAIL_FROM || ''} onChange={e => setModalData({ ...modalData, EMAIL_FROM: e.target.value })} />
                                <input className="w-full border border-gray-300 rounded-md p-2 mb-2" placeholder="Description" value={modalData.description || ''} onChange={e => setModalData({ ...modalData, description: e.target.value })} />
                            </>
                        )}
                        {modalType === 'webchat' && (
                            <>
                                <input className="w-full border border-gray-300 rounded-md p-2 mb-2" placeholder="Channel Name" value={modalData.name || ''} onChange={e => setModalData({ ...modalData, name: e.target.value })} />
                                <input className="w-full border border-gray-300 rounded-md p-2 mb-2" placeholder="Primary Color" value={modalData.primaryColor || ''} onChange={e => setModalData({ ...modalData, primaryColor: e.target.value })} />
                                <input className="w-full border border-gray-300 rounded-md p-2 mb-2" placeholder="Welcome Message" value={modalData.welcomeMessage || ''} onChange={e => setModalData({ ...modalData, welcomeMessage: e.target.value })} />
                                <input className="w-full border border-gray-300 rounded-md p-2 mb-2" placeholder="Agent Avatar URL" value={modalData.agentAvatar || ''} onChange={e => setModalData({ ...modalData, agentAvatar: e.target.value })} />
                                <input className="w-full border border-gray-300 rounded-md p-2 mb-2" placeholder="Widget Title" value={modalData.widgetTitle || ''} onChange={e => setModalData({ ...modalData, widgetTitle: e.target.value })} />
                                <input className="w-full border border-gray-300 rounded-md p-2 mb-2" placeholder="Webhook URL" value={modalData.webhookUrl || ''} onChange={e => setModalData({ ...modalData, webhookUrl: e.target.value })} />
                                <input className="w-full border border-gray-300 rounded-md p-2 mb-2" placeholder="Description" value={modalData.description || ''} onChange={e => setModalData({ ...modalData, description: e.target.value })} />
                            </>
                        )}
                        {modalType === 'whatsapp' && (
                            <>
                                <input className="w-full border border-gray-300 rounded-md p-2 mb-2" placeholder="Channel Name" value={modalData.name || ''} onChange={e => setModalData({ ...modalData, name: e.target.value })} />
                                <input className="w-full border border-gray-300 rounded-md p-2 mb-2" placeholder="WABA ID" value={modalData.wabaId || ''} onChange={e => setModalData({ ...modalData, wabaId: e.target.value })} />
                                <input className="w-full border border-gray-300 rounded-md p-2 mb-2" placeholder="Phone Number ID" value={modalData.phoneNumberId || ''} onChange={e => setModalData({ ...modalData, phoneNumberId: e.target.value })} />
                                <input className="w-full border border-gray-300 rounded-md p-2 mb-2" placeholder="Phone Number" value={modalData.phoneNumber || ''} onChange={e => setModalData({ ...modalData, phoneNumber: e.target.value })} />
                                <input className="w-full border border-gray-300 rounded-md p-2 mb-2" placeholder="Webhook Verify Token" value={modalData.webhookVerifyToken || ''} onChange={e => setModalData({ ...modalData, webhookVerifyToken: e.target.value })} />
                                <input className="w-full border border-gray-300 rounded-md p-2 mb-2" placeholder="API Version" value={modalData.apiVersion || ''} onChange={e => setModalData({ ...modalData, apiVersion: e.target.value })} />
                                <input className="w-full border border-gray-300 rounded-md p-2 mb-2" placeholder="Description" value={modalData.description || ''} onChange={e => setModalData({ ...modalData, description: e.target.value })} />
                            </>
                        )}
                        <div className="flex justify-end gap-2 mt-4">
                            <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300" onClick={() => setModalOpen(false)} disabled={loading}>Cancel</button>
                            <button className="px-4 py-2 text-white rounded" style={{ backgroundColor: themeColor }} onClick={handleModalSubmit} disabled={loading}>
                                {loading ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Channels;
