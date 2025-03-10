// src/components/Header.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell, Search, User, LogOut, Settings } from 'lucide-react';

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add logout logic here
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-10 bg-white border-b shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        {/* Left: Hamburger Menu (Mobile) and Search */}
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(true)}
            className="mr-4 md:hidden focus:outline-none"
          >
            <Menu size={24} />
          </button>

          <div className="hidden md:flex items-center px-3 py-2 bg-gray-100 rounded-md w-72">
            <Search size={18} className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none w-full text-sm"
            />
          </div>
        </div>

        {/* Right: Notifications and Profile */}
        <div className="flex items-center space-x-4">
          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setIsNotificationsOpen(!isNotificationsOpen);
                setIsProfileOpen(false);
              }}
              className="relative p-1 rounded-full hover:bg-gray-100 focus:outline-none"
            >
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              <Bell size={20} />
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-10 border">
                <div className="px-4 py-2 border-b">
                  <h3 className="text-sm font-semibold">Notifications</h3>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="px-4 py-3 hover:bg-gray-50 border-b">
                      <p className="text-sm font-medium">New order placed</p>
                      <p className="text-xs text-gray-500">Order #1234 has been created</p>
                      <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 text-center border-t">
                  <button className="text-sm text-[#3d5291] hover:underline">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setIsProfileOpen(!isProfileOpen);
                setIsNotificationsOpen(false);
              }}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full bg-[#3d5291] flex items-center justify-center text-white">
                <User size={16} />
              </div>
              <span className="hidden md:block text-sm font-medium">Admin User</span>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border">
                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <User size={16} className="mr-2" />
                  <span>My Profile</span>
                </button>
                <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <Settings size={16} className="mr-2" />
                  <span>Settings</span>
                </button>
                <div className="border-t my-1"></div>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  <LogOut size={16} className="mr-2" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search - Only visible on mobile */}
      <div className="md:hidden px-4 pb-3">
        <div className="flex items-center px-3 py-2 bg-gray-100 rounded-md">
          <Search size={18} className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-full text-sm"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;