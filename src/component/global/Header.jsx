import { useContext, useEffect, useRef, useState } from 'react';
import {
  Menu as MenuIcon,
  HeadsetMic,
  ExpandMore,
  NotificationsNone,
  Language,
  PersonOutline,
  VpnKey,
  Shield,
  Logout,
  Message,
  Phone,
  Notifications,
} from '@mui/icons-material';
import SettingsInputSvideoIcon from '@mui/icons-material/SettingsInputSvideo';
import { useNavigate } from 'react-router-dom';
import { ContentContext } from '../../context/ContextProvider';

const Header = ({ onToggleSidebar, showSidebarButton, isSidebarOpen }) => {
  const { role, setRole, logoImage, setCustomizationModal } = useContext(ContentContext)
  const [dropdown, setDropdown] = useState('');
  const [currentStatus, setCurrentStatus] = useState('online');
  const navigate = useNavigate()

  const statusRef = useRef(null);
  const notificationRef = useRef(null);
  const languageRef = useRef(null);
  const userRef = useRef(null);

  const toggleDropdown = (name) => {
    setDropdown(dropdown === name ? '' : name);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (dropdown === 'status' && statusRef.current && !statusRef.current.contains(event.target)) ||
        (dropdown === 'notifications' && notificationRef.current && !notificationRef.current.contains(event.target)) ||
        (dropdown === 'language' && languageRef.current && !languageRef.current.contains(event.target)) ||
        (dropdown === 'user' && userRef.current && !userRef.current.contains(event.target))
      ) {
        setDropdown('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdown]);

  const handleRole = () => {
    setDropdown('');

    if (role === 'admin') {
      setRole('user');
      navigate('/contact');
    } else {
      setRole('admin');
      navigate('/agent-dashboard');
    }
  };

  const handleProfile = () => {
    setDropdown('');
    navigate('/setting')
  }
  const handleAPICredential = () => {
    setDropdown('');
    navigate('/api-credential')
  }
  const handleCustomization = () => {
    setDropdown('');
    setCustomizationModal(true)
  }


  const statuses = {
    online: 'bg-green-500',
    busy: 'bg-yellow-500',
    offline: 'bg-gray-500',
  };

  return (
    // <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50 h-16">
    // <header className={`fixed top-0 left-0 right-0 bg-white shadow-sm ${isSidebarOpen ? 'z-20' : 'z-50'} h-16`}>
    //   <div className="flex items-center justify-between px-4 h-full">
    //     {/* Left Side */}
    //     <div className="flex items-center">
    //       <button
    //         className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none"
    //         onClick={onToggleSidebar}
    //       >
    //         <MenuIcon fontSize="medium" />
    //       </button>
    //       <span className="ml-3 flex items-center cursor-pointer">
    //         <img src={logo} alt="" className='w-40 h-12' />
    //       </span>
    //     </div>

    //     {/* Right Side */}
    //     <div className="flex items-center space-x-4">
    //       <div className="relative" ref={statusRef}>
    //         <button
    //           className="flex items-center px-2 py-1 rounded-md hover:bg-gray-100 focus:outline-none"
    //           onClick={() => toggleDropdown('status')}
    //         >
    //           <div className={`w-3 h-3 rounded-full mr-2 ${statuses[currentStatus]}`} />
    //           <span className="text-sm font-medium capitalize">{currentStatus}</span>
    //           <ExpandMore className="ml-2 text-xs text-gray-500" />
    //         </button>
    //         {dropdown === 'status' && (
    //           <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
    //             {Object.keys(statuses).map((status) => (
    //               <span
    //                 key={status}
    //                 onClick={() => {
    //                   setCurrentStatus(status);
    //                   setDropdown('');
    //                 }}
    //                 className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
    //               >
    //                 <div className={`w-3 h-3 rounded-full mr-2 ${statuses[status]}`} />
    //                 <span className="capitalize">{status}</span>
    //               </span>
    //             ))}
    //           </div>
    //         )}
    //       </div>

    //       {/* Notifications */}
    //       <div className="relative" ref={notificationRef}>
    //         <button
    //           className="p-2 rounded-md hover:bg-gray-100 focus:outline-none relative"
    //           onClick={() => toggleDropdown('notifications')}
    //         >
    //           <NotificationsNone className="text-gray-600" />
    //           <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
    //         </button>
    //         {dropdown === 'notifications' && (
    //           <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
    //             <div className="px-4 py-2 font-medium text-gray-700 border-b border-gray-200">Notifications</div>
    //             <div className="max-h-64 overflow-y-auto">
    //               {[
    //                 {
    //                   icon: <Message className="text-blue-600" fontSize="small" />,
    //                   title: 'New message from John Doe',
    //                   time: '5 minutes ago',
    //                 },
    //                 {
    //                   icon: <Phone className="text-green-600" fontSize="small" />,
    //                   title: 'Missed call from Sarah Smith',
    //                   time: '20 minutes ago',
    //                 },
    //                 {
    //                   icon: <Notifications className="text-yellow-600" fontSize="small" />,
    //                   title: 'System maintenance scheduled',
    //                   time: '1 hour ago',
    //                 },
    //               ].map((item, i) => (
    //                 <span key={i} className="block px-4 py-3 text-sm hover:bg-gray-100 border-b border-gray-100 cursor-pointer">
    //                   <div className="flex items-start">
    //                     <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
    //                       {item.icon}
    //                     </div>
    //                     <div className="ml-3">
    //                       <p className="font-medium">{item.title}</p>
    //                       <p className="text-gray-500 text-xs mt-1">{item.time}</p>
    //                     </div>
    //                   </div>
    //                 </span>
    //               ))}
    //             </div>
    //             <span className="block px-4 py-2 text-sm text-blue-600 font-medium text-center border-t border-gray-200 cursor-pointer">
    //               View all notifications
    //             </span>
    //           </div>
    //         )}
    //       </div>

    //       {/* Language Selector */}
    //       <div className="relative" ref={languageRef}>
    //         <button
    //           className="flex items-center p-2 rounded-md hover:bg-gray-100 focus:outline-none"
    //           onClick={() => toggleDropdown('language')}
    //         >
    //           <Language className="text-gray-600 mr-1" fontSize="small" />
    //           <span className="text-sm font-medium">EN</span>
    //           <ExpandMore className="ml-1 text-xs text-gray-500" />
    //         </button>
    //         {dropdown === 'language' && (
    //           <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
    //             <span className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
    //               🇺🇸 <span className="ml-2">English</span>
    //             </span>
    //             <span className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
    //               🇦🇪 <span className="ml-2">Arabic</span>
    //             </span>
    //           </div>
    //         )}
    //       </div>

    //       {/* User Avatar */}
    //       <div className="relative" ref={userRef}>
    //         <button
    //           className="flex items-center focus:outline-none gap-2"
    //           onClick={() => toggleDropdown('user')}
    //         >
    //           <img
    //             src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
    //             alt="User avatar"
    //             className="h-8 w-8 rounded-full object-cover"
    //           />
    //           <div className='text-start '>
    //             <h1 className="font-normal text-md leading-[25px]">Sarah Johnson</h1>
    //             <h1 className="font-normal text-md text-gray-700 leading-[15px]">
    //               {role === 'admin' ? 'User' : 'Admin'}
    //             </h1>
    //           </div>

    //           <ExpandMore className="ml-1 text-xs text-gray-500" />
    //         </button>
    //         {dropdown === 'user' && (
    //           <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
    //             <div className="px-4 py-3 border-b border-gray-200">
    //               <p className="text-sm font-medium">John Doe</p>
    //               <p className="text-xs text-gray-500 mt-1">john.doe@example.com</p>
    //               <p className="text-xs text-gray-500 mt-1">Master Admin</p>
    //             </div>
    //             <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
    //               <PersonOutline className="mr-2 w-5 text-center" fontSize="small" />
    //               Profile & Settings
    //             </span>
    //             <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
    //               <VpnKey className="mr-2 w-5 text-center" fontSize="small" />
    //               API Credentials
    //             </span>
    //             <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={handleRole}>
    //               <Shield className="mr-2 w-5 text-center" fontSize="small" />
    //               {role === 'admin' ? 'Switch to User Mode' : 'Switch to Admin Mode'}
    //             </span>
    //             <div className="border-t border-gray-200 mt-1" />
    //             <span className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer">
    //               <Logout className="mr-2 w-5 text-center" fontSize="small" />
    //               Logout
    //             </span>
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </header>

    <header className={`fixed top-0 left-0 right-0 bg-white shadow-sm ${isSidebarOpen ? 'z-20' : 'z-50'} h-16`}>
      <div className="flex items-center justify-between px-2 sm:px-4 h-full">
        {/* Left Side */}
        <div className="flex items-center">
          {/* {showSidebarButton && ( */}
          <button
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none"
            onClick={onToggleSidebar}
          >
            <MenuIcon fontSize="medium" />
          </button>
          {/* )} */}
          <span className="ml-2 sm:ml-3 flex items-center cursor-pointer">
            <img
              src={logoImage}
              alt="logo"
              className="w-28 sm:w-36 md:w-40 h-auto max-h-12 object-contain"
            />
          </span>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Status Dropdown */}
          <div className="relative" ref={statusRef}>
            <button
              className="md:flex hidden items-center px-2 py-1 rounded-md hover:bg-gray-100 focus:outline-none text-xs sm:text-sm"
              onClick={() => toggleDropdown('status')}
            >
              <div className={`w-2.5 h-2.5 rounded-full mr-2 ${statuses[currentStatus]}`} />
              <span className="capitalize">{currentStatus}</span>
              <ExpandMore className="ml-1 text-xs text-gray-500" />
            </button>
            {dropdown === 'status' && (
              <div className="absolute right-0 mt-2 w-40 sm:w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                {Object.keys(statuses).map((status) => (
                  <span
                    key={status}
                    onClick={() => {
                      setCurrentStatus(status);
                      setDropdown('');
                    }}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    <div className={`w-3 h-3 rounded-full mr-2 ${statuses[status]}`} />
                    <span className="capitalize">{status}</span>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button
              className="p-2 rounded-md hover:bg-gray-100 focus:outline-none relative"
              onClick={() => toggleDropdown('notifications')}
            >
              <NotificationsNone className="text-gray-600" />
              <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            {dropdown === 'notifications' && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200 max-h-80 overflow-y-auto">
                <div className="px-4 py-2 font-medium text-gray-700 border-b border-gray-200">
                  Notifications
                </div>
                {[
                  {
                    icon: <Message className="text-blue-600" fontSize="small" />,
                    title: 'New message from John Doe',
                    time: '5 minutes ago',
                  },
                  {
                    icon: <Phone className="text-green-600" fontSize="small" />,
                    title: 'Missed call from Sarah Smith',
                    time: '20 minutes ago',
                  },
                  {
                    icon: <Notifications className="text-yellow-600" fontSize="small" />,
                    title: 'System maintenance scheduled',
                    time: '1 hour ago',
                  },
                ].map((item, i) => (
                  <span key={i} className="block px-4 py-3 text-sm hover:bg-gray-100 border-b border-gray-100 cursor-pointer">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        {item.icon}
                      </div>
                      <div className="ml-3">
                        <p className="font-medium">{item.title}</p>
                        <p className="text-gray-500 text-xs mt-1">{item.time}</p>
                      </div>
                    </div>
                  </span>
                ))}
                <span className="block px-4 py-2 text-sm text-blue-600 font-medium text-center border-t border-gray-200 cursor-pointer">
                  View all notifications
                </span>
              </div>
            )}
          </div>

          {/* Language Selector */}
          <div className="relative" ref={languageRef}>
            <button
              className="flex items-center p-2 rounded-md hover:bg-gray-100 focus:outline-none"
              onClick={() => toggleDropdown('language')}
            >
              <Language className="text-gray-600 mr-1" fontSize="small" />
              <span className="text-sm hidden sm:inline">EN</span>
              <ExpandMore className="ml-1 text-xs text-gray-500" />
            </button>
            {dropdown === 'language' && (
              <div className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                <span className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                  🇺🇸 <span className="ml-2">English</span>
                </span>
                <span className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                  🇦🇪 <span className="ml-2">Arabic</span>
                </span>
              </div>
            )}
          </div>

          {/* User Avatar */}
          <div className="relative" ref={userRef}>
            <button
              className="flex items-center focus:outline-none gap-2"
              onClick={() => toggleDropdown('user')}
            >
              <img
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
                alt="User avatar"
                className="h-8 w-8 rounded-full object-cover"
              />
              <div className="hidden sm:block text-start leading-tight">
                <p className="font-normal text-sm">Sarah Johnson</p>
                <p className="text-xs text-gray-700">{role === 'admin' ? 'User' : 'Admin'}</p>
              </div>
              <ExpandMore className="ml-1 text-xs text-gray-500" />
            </button>
            {dropdown === 'user' && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                <div className="px-4 py-3 border-b border-gray-200">
                  <div className='flex items-center gap-3'>
                    <img
                      src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
                      alt="User avatar"
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <p className="text-sm font-medium">John Doe</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">john.doe@example.com</p>
                  <p className="text-xs text-gray-500 mt-1">Master Admin</p>
                </div>
                <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={handleProfile}>
                  <PersonOutline className="mr-2 w-5" fontSize="small" />
                  Profile & Settings
                </span>
                <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={handleAPICredential}>
                  <VpnKey className="mr-2 w-5" fontSize="small" />
                  API Credentials
                </span>
                <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={handleCustomization}>
                  <SettingsInputSvideoIcon className="mr-2 w-5" fontSize="small" />
                  Customization
                </span>
                <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={handleRole}>
                  <Shield className="mr-2 w-5" fontSize="small" />
                  {role === 'admin' ? 'Switch to User Mode' : 'Switch to Admin Mode'}
                </span>
                <div className="border-t border-gray-200 mt-1" />
                <span className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer">
                  <Logout className="mr-2 w-5" fontSize="small" />
                  Logout
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
