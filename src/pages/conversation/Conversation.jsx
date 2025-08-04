import { useState, useEffect, useContext } from "react";
import {
    WhatsApp as WhatsAppIcon,
    Sms as SmsIcon,
    Phone as PhoneIcon,
    Search as SearchIcon,
    VideoCall as VideoCallIcon,
    MoreVert as MoreVertIcon,
    //   Paperclip as AttachmentIcon,
    Send as SendIcon,
    Call as CallIcon,
    PersonAdd as PersonAddIcon,
    Add as AddIcon,
    Check as CheckIcon,
    DoneAll as DoneAllIcon,
    WhatsApp,
    Sms,
    Phone
} from "@mui/icons-material";
import { TextField, InputAdornment, IconButton, Button, Avatar, Divider } from "@mui/material";
import { ContentContext } from "../../context/ContextProvider";

const conversations = {
    john: {
        name: "John Smith",
        phone: "+1 (555) 123-4567",
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg",
        messages: [
            { type: "received", text: "Hi! I need help with my account setup.", time: "10:30 AM" },
            { type: "sent", text: "Hello John! I'd be happy to help you with that. What specific issue are you facing?", time: "10:32 AM" },
            { type: "received", text: "Thanks for the quick response!", time: "2:30 PM" },
        ],
    },
};
const Conversations = () => {
    const [selectedContact, setSelectedContact] = useState("john");
    const contact = conversations[selectedContact];
    const { themeColor, secondaryThemeColor } = useContext(ContentContext)
    const [tab, setTab] = useState("activity");
    const [active, setActive] = useState("whatsapp");

    const [startCall, setStartCall] = useState(false)

    const tabStyle = (tabName) => ({
        color: tab === tabName ? themeColor : '',
        borderBottom: tab === tabName ? `2px solid ${themeColor}` : '2px solid transparent'
    });

    const renderTabContent = () => {
        switch (tab) {
            case "activity":
                return (
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            <WhatsApp fontSize="small" className="text-green-500" />
                            <div className="flex-1">
                                <p className="text-sm font-medium">WhatsApp message</p>
                                <p className="text-xs text-gray-500">2:30 PM today</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            <Sms fontSize="small" className="text-blue-500" />
                            <div className="flex-1">
                                <p className="text-sm font-medium">SMS sent</p>
                                <p className="text-xs text-gray-500">10:32 AM today</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            <Phone fontSize="small" className="text-gray-500" />
                            <div className="flex-1">
                                <p className="text-sm font-medium">Call received</p>
                                <p className="text-xs text-gray-500">Yesterday 3:15 PM</p>
                            </div>
                        </div>
                    </div>
                );
            case "stats":
                return (
                    <div className="space-y-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                            <h4 className="text-sm font-medium text-gray-900 mb-3">Message Stats</h4>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Messages sent</span><span className="font-medium">24</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Messages received</span><span className="font-medium">18</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Delivery rate</span><span className="font-medium text-green-600">98%</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Response time</span><span className="font-medium">2 min avg</span>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case "notes":
                return (
                    <div className="space-y-4">
                        <div>
                            <h4 className="text-sm font-medium text-gray-900 mb-3">Tags</h4>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">VIP Customer</span>
                                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Premium</span>
                                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Support</span>
                                <button className="px-2 py-1 border border-gray-300 text-gray-600 text-xs rounded-full hover:bg-gray-50">
                                    <AddIcon fontSize="small" className="mr-1" />Add Tag
                                </button>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-gray-900 mb-3">Notes</h4>
                            <textarea
                                className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="Add notes about this contact..."
                            >
                                Customer contacted regarding billing issue. Resolved payment method problem. Very satisfied with support.
                            </textarea>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="lg:flex mt-16 overflow-hidden font-sans">
            {/* Left Panel */}
            <div className="flex">
                <div className="w-80 hidden bg-white border-r border-gray-200 md:flex flex-col">
                    <div className="border-b border-gray-200 p-4">
                        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                            <button
                                onClick={() => setActive("whatsapp")}
                                className={`flex-1 py-2 px-3 text-sm font-medium rounded-md ${active === "whatsapp"
                                        ? "bg-white shadow-sm"
                                        : "text-gray-600 hover:text-gray-900"
                                    }`}
                                style={active === "whatsapp" ? { color: themeColor } : {}}
                            >
                                <WhatsAppIcon fontSize="small" className="mr-1" /> WhatsApp
                            </button>

                            <button
                                onClick={() => setActive("sms")}
                                className={`flex-1 py-2 px-3 text-sm font-medium rounded-md ${active === "sms"
                                        ? "bg-white shadow-sm"
                                        : "text-gray-600 hover:text-gray-900"
                                    }`}
                                style={active === "sms" ? { color: themeColor } : {}}
                            >
                                <SmsIcon fontSize="small" className="mr-1" /> SMS
                            </button>

                            <button
                                onClick={() => setActive("voice")}
                                className={`flex-1 py-2 px-3 text-sm font-medium rounded-md ${active === "voice"
                                        ? "bg-white shadow-sm"
                                        : "text-gray-600 hover:text-gray-900"
                                    }`}
                                style={active === "voice" ? { color: themeColor } : {}}
                            >
                                <PhoneIcon fontSize="small" className="mr-1" /> Voice
                            </button>
                        </div>
                    </div>

                    <div className="p-4 border-b border-gray-200">
                        <div className="relative">
                            <TextField
                                placeholder="Search contacts..."
                                size="small"
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon className="text-gray-400" />
                                        </InputAdornment>
                                    ),
                                    className: "rounded-lg bg-white",
                                }}
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        <div
                            className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer bg-blue-50"
                            onClick={() => setSelectedContact("john")}
                        >
                            <div className="flex items-center space-x-3">
                                <Avatar src={contact.avatar} alt={contact.name} className="w-10 h-10" />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium text-gray-900 truncate">{contact.name}</p>
                                        <span className="text-xs text-gray-500">2:30 PM</span>
                                    </div>
                                    <p className="text-sm text-gray-500 truncate">Thanks for the quick response!</p>
                                </div>
                                <WhatsAppIcon className="text-green-500" fontSize="small" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Middle Panel */}
                <div className="flex-1 h-[78.5vh] flex flex-col bg-gray-50">
                    <div className="bg-white border-b border-gray-200 p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <Avatar src={contact.avatar} className="w-10 h-10" />
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">{contact.name}</h3>
                                    <p className="text-sm text-gray-500">{contact.phone}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <IconButton><PhoneIcon className="text-gray-600" /></IconButton>
                                <IconButton><VideoCallIcon className="text-gray-600" /></IconButton>
                                <IconButton><MoreVertIcon className="text-gray-600" /></IconButton>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {contact.messages.map((msg, i) => (
                            <div
                                key={i}
                                className={msg.type === "sent" ? "flex justify-end" : "flex justify-start"}
                            >
                                <div className="max-w-xs lg:max-w-md">
                                    <div
                                        className={`rounded-lg p-3 shadow-sm ${msg.type === "sent" ? "text-white" : "bg-white text-gray-900"}`}
                                        style={msg.type === "sent" ? { backgroundColor: themeColor } : {}}
                                    >

                                        <p className="text-sm">{msg.text}</p>
                                    </div>
                                    <div
                                        className={`text-xs text-gray-500 mt-1 ${msg.type === "sent" ? "text-right flex items-center justify-end gap-1" : ""
                                            }`}
                                    >
                                        {msg.time} {msg.type === "sent" && <DoneAllIcon fontSize="inherit" className="text-blue-400" />}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white border-t border-gray-200 p-4">
                        <div className="flex items-center space-x-3">
                            <TextField
                                placeholder="Type a message..."
                                size="small"
                                fullWidth
                                InputProps={{
                                    className: "rounded-lg",
                                }}
                            />
                            <IconButton className="bg-blue-600 hover:bg-blue-700 text-white">
                                <SendIcon />
                            </IconButton>
                        </div>
                    </div>
                </div>
            </div>
            {/* Right Panel */}
            <div className="w-80 hidden bg-white border-l border-gray-200 lg:flex flex-col">
                <div className="p-6 border-b border-gray-200 text-center">
                    <Avatar src={contact.avatar} className="w-20 h-20 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">{contact.name}</h3>
                    <p className="text-sm text-gray-500">{contact.phone}</p>
                    <div className="flex justify-center mt-3 space-x-2">
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Premium</span>
                    </div>
                </div>

                <div className="border-b border-gray-200">
                    <nav className="flex">
                        {["activity", "stats", "notes"].map((t) => (
                            <button
                                key={t}
                                style={tabStyle(t)}
                                className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition "text-blue-600 border-blue-600 text-gray-500 hover:text-gray-700 border-transparent"
                                    `}
                                onClick={() => setTab(t)}
                            >
                                {t.charAt(0).toUpperCase() + t.slice(1)}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="flex-1 overflow-y-auto p-4">{renderTabContent()}</div>

                <div className="p-4 border-t border-gray-200 space-y-2">
                    <button onMouseEnter={() => setStartCall(true)} onMouseLeave={() => setStartCall(false)} style={{
                        backgroundColor: startCall ? secondaryThemeColor : themeColor,
                    }} className="w-full text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                        <i className="fa-solid fa-phone mr-2"></i>Start Call
                    </button>
                    <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50">
                        <i className="fa-solid fa-user-plus mr-2"></i>Add to Campaign
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Conversations;