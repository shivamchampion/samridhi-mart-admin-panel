// src/components/Sidebar.jsx
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, Package, Tag, Briefcase, FileText, Map, 
  MapPin, Users, User, ShoppingBag, BarChart2, 
  Menu, X, ChevronDown, ChevronRight 
} from 'lucide-react';
import { useState } from 'react';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const toggleSubmenu = (menu) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  const isActive = (path) => location.pathname === path;
  
  const isSubActive = (paths) => paths.some(path => location.pathname === path);

  const menuItems = [
    { 
      name: 'Dashboard', 
      path: '/', 
      icon: <Home size={20} /> 
    },
    { 
      name: 'Inventory', 
      icon: <Package size={20} />,
      submenu: [
        { name: 'Products', path: '/products' },
        { name: 'Categories', path: '/categories' },
        { name: 'Brands', path: '/brands' },
        { name: 'Purchase Bills', path: '/purchase-bills' },
      ]
    },
    { 
      name: 'Distribution', 
      icon: <Map size={20} />,
      submenu: [
        { name: 'Zones', path: '/zones' },
        { name: 'Beats', path: '/beats' },
      ]
    },
    { 
      name: 'Users', 
      icon: <Users size={20} />,
      submenu: [
        { name: 'Distributors', path: '/distributors' },
        { name: 'Salesmen', path: '/salesmen' },
        { name: 'Retailers', path: '/retailers' },
      ]
    },
    { 
      name: 'Orders', 
      path: '/orders', 
      icon: <ShoppingBag size={20} /> 
    },
    { 
      name: 'Reports', 
      path: '/reports', 
      icon: <BarChart2 size={20} /> 
    },
  ];

  return (
    <>
      {/* Mobile Sidebar Backdrop */}
      <div
        className={`fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity md:hidden ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 flex-shrink-0 bg-white border-r transform transition-transform duration-200 ease-in-out md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-4 bg-[#3d5291] text-white">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo.png" alt="Samridhi Mart" className="h-8 w-auto" />
            <span className="text-xl font-semibold">Samridhi Mart</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden focus:outline-none"
          >
            <X size={24} />
          </button>
        </div>

        {/* Sidebar Content */}
        <nav className="mt-4 px-2 space-y-1 overflow-y-auto h-[calc(100vh-64px)] pb-20">
          {menuItems.map((item, index) => (
            <div key={index}>
              {item.submenu ? (
                <div className="mb-1">
                  <button
                    onClick={() => toggleSubmenu(item.name)}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium rounded-md transition-colors
                    ${isSubActive(item.submenu.map(sub => sub.path)) 
                      ? 'bg-indigo-50 text-[#3d5291]' 
                      : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <div className="flex items-center">
                      <span className="mr-3">{item.icon}</span>
                      {item.name}
                    </div>
                    {openSubmenu === item.name ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                  </button>
                  
                  <div className={`mt-1 space-y-1 ${openSubmenu === item.name ? 'block' : 'hidden'}`}>
                    {item.submenu.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        to={subItem.path}
                        className={`pl-12 pr-4 py-2 flex items-center text-sm font-medium rounded-md
                        ${isActive(subItem.path) 
                          ? 'bg-indigo-50 text-[#3d5291]' 
                          : 'text-gray-600 hover:bg-gray-100'}`}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors
                  ${isActive(item.path) 
                    ? 'bg-indigo-50 text-[#3d5291]' 
                    : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;