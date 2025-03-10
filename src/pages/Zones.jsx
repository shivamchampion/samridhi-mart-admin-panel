// src/pages/Zones.jsx
import { useState } from 'react';
import { 
  Plus, Search, Edit, Trash2, Map, 
  MapPin, Users, Store, ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SearchInput from '../components/SearchInput';

const Zones = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedZone, setSelectedZone] = useState(null);
  const [expandedZone, setExpandedZone] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data for zones
  const zones = [
    {
      id: 'ZONE001',
      name: 'North Zone',
      description: 'Northern area of the city covering downtown and suburbs',
      distributorName: 'Alex Johnson',
      distributorId: 'DIST001',
      beats: [
        { id: 'BEAT001', name: 'Beat 1 - Larkui', orderDay: 'Monday', deliveryDay: 'Tuesday', salesmanName: 'John Doe', retailerCount: 12 },
        { id: 'BEAT002', name: 'Beat 2 - Central', orderDay: 'Tuesday', deliveryDay: 'Wednesday', salesmanName: 'John Doe', retailerCount: 8 },
        { id: 'BEAT003', name: 'Beat 3 - Market', orderDay: 'Wednesday', deliveryDay: 'Thursday', salesmanName: 'Sarah Miller', retailerCount: 15 },
        { id: 'BEAT004', name: 'Beat 4 - Colony', orderDay: 'Thursday', deliveryDay: 'Friday', salesmanName: 'Sarah Miller', retailerCount: 10 },
        { id: 'BEAT005', name: 'Beat 5 - Main Road', orderDay: 'Friday', deliveryDay: 'Saturday', salesmanName: 'John Doe', retailerCount: 9 },
        { id: 'BEAT006', name: 'Beat 6 - Highway', orderDay: 'Saturday', deliveryDay: 'Monday', salesmanName: 'Robert Williams', retailerCount: 7 },
        { id: 'BEAT007', name: 'Beat 7 - Business Park', orderDay: 'Sunday', deliveryDay: 'Monday', salesmanName: 'Robert Williams', retailerCount: 11 },
      ],
      active: true,
      createdAt: '2023-01-15'
    },
    {
      id: 'ZONE002',
      name: 'South Zone',
      description: 'Southern region including industrial area and residential complexes',
      distributorName: 'Michael Brown',
      distributorId: 'DIST002',
      beats: [
        { id: 'BEAT008', name: 'Beat 1 - Industrial', orderDay: 'Monday', deliveryDay: 'Tuesday', salesmanName: 'James Wilson', retailerCount: 6 },
        { id: 'BEAT009', name: 'Beat 2 - Crossings', orderDay: 'Tuesday', deliveryDay: 'Wednesday', salesmanName: 'James Wilson', retailerCount: 8 },
        { id: 'BEAT010', name: 'Beat 3 - Complex', orderDay: 'Wednesday', deliveryDay: 'Thursday', salesmanName: 'James Wilson', retailerCount: 10 },
        { id: 'BEAT011', name: 'Beat 4 - Apartments', orderDay: 'Thursday', deliveryDay: 'Friday', salesmanName: 'David Clarke', retailerCount: 7 },
        { id: 'BEAT012', name: 'Beat 5 - South Mall', orderDay: 'Friday', deliveryDay: 'Saturday', salesmanName: 'David Clarke', retailerCount: 12 },
        { id: 'BEAT013', name: 'Beat 6 - Tech Park', orderDay: 'Saturday', deliveryDay: 'Monday', salesmanName: 'David Clarke', retailerCount: 5 },
        { id: 'BEAT014', name: 'Beat 7 - Gardens', orderDay: 'Sunday', deliveryDay: 'Monday', salesmanName: 'James Wilson', retailerCount: 8 },
      ],
      active: true,
      createdAt: '2023-01-20'
    },
    {
      id: 'ZONE003',
      name: 'East Zone',
      description: 'Eastern region with university area and shopping districts',
      distributorName: 'Jennifer Davis',
      distributorId: 'DIST003',
      beats: [
        { id: 'BEAT015', name: 'Beat 1 - University', orderDay: 'Monday', deliveryDay: 'Tuesday', salesmanName: 'Patricia Taylor', retailerCount: 9 },
        { id: 'BEAT016', name: 'Beat 2 - East Market', orderDay: 'Tuesday', deliveryDay: 'Wednesday', salesmanName: 'Patricia Taylor', retailerCount: 11 },
        { id: 'BEAT017', name: 'Beat 3 - Shopping Mall', orderDay: 'Wednesday', deliveryDay: 'Thursday', salesmanName: 'Patricia Taylor', retailerCount: 14 },
        { id: 'BEAT018', name: 'Beat 4 - Residential', orderDay: 'Thursday', deliveryDay: 'Friday', salesmanName: 'Thomas Harris', retailerCount: 8 },
        { id: 'BEAT019', name: 'Beat 5 - Park Area', orderDay: 'Friday', deliveryDay: 'Saturday', salesmanName: 'Thomas Harris', retailerCount: 6 },
        { id: 'BEAT020', name: 'Beat 6 - Food Street', orderDay: 'Saturday', deliveryDay: 'Monday', salesmanName: 'Thomas Harris', retailerCount: 7 },
        { id: 'BEAT021', name: 'Beat 7 - Service Road', orderDay: 'Sunday', deliveryDay: 'Monday', salesmanName: 'Patricia Taylor', retailerCount: 5 },
      ],
      active: true,
      createdAt: '2023-02-05'
    },
    {
      id: 'ZONE004',
      name: 'West Zone',
      description: 'Western territory with commercial centers and suburban communities',
      distributorName: 'Robert Martin',
      distributorId: 'DIST004',
      beats: [
        { id: 'BEAT022', name: 'Beat 1 - Western Mall', orderDay: 'Monday', deliveryDay: 'Tuesday', salesmanName: 'Charles Allen', retailerCount: 10 },
        { id: 'BEAT023', name: 'Beat 2 - Suburb', orderDay: 'Tuesday', deliveryDay: 'Wednesday', salesmanName: 'Charles Allen', retailerCount: 7 },
        { id: 'BEAT024', name: 'Beat 3 - Main Street', orderDay: 'Wednesday', deliveryDay: 'Thursday', salesmanName: 'Charles Allen', retailerCount: 9 },
        { id: 'BEAT025', name: 'Beat 4 - Office Park', orderDay: 'Thursday', deliveryDay: 'Friday', salesmanName: 'Linda White', retailerCount: 6 },
        { id: 'BEAT026', name: 'Beat 5 - Commercial', orderDay: 'Friday', deliveryDay: 'Saturday', salesmanName: 'Linda White', retailerCount: 8 },
        { id: 'BEAT027', name: 'Beat 6 - Riverside', orderDay: 'Saturday', deliveryDay: 'Monday', salesmanName: 'Linda White', retailerCount: 5 },
        { id: 'BEAT028', name: 'Beat 7 - West End', orderDay: 'Sunday', deliveryDay: 'Monday', salesmanName: 'Charles Allen', retailerCount: 4 },
      ],
      active: false,
      createdAt: '2023-02-10'
    },
  ];

  const handleAddNew = () => {
    setSelectedZone(null);
    setIsAddModalOpen(true);
  };

  const handleEdit = (zone) => {
    setSelectedZone(zone);
    setIsAddModalOpen(true);
  };

  const handleDelete = (zoneId) => {
    // Implement delete functionality
    console.log('Delete zone with ID:', zoneId);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setSelectedZone(null);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement form submission logic
    console.log('Form submitted');
    setIsAddModalOpen(false);
  };

  const toggleExpandZone = (zoneId) => {
    setExpandedZone(expandedZone === zoneId ? null : zoneId);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Zones Management</h1>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={handleAddNew}
            className="px-4 py-2 flex items-center text-sm bg-[#3d5291] text-white rounded-md hover:bg-[#2d3e6d] shadow-sm"
          >
            <Plus size={16} className="mr-2" />
            Add Zone
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <SearchInput 
        placeholder="Search zones by name, distributor..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Zones Cards */}
      <div className="grid grid-cols-1 gap-6">
        {zones.map((zone) => (
          <div key={zone.id} className={`bg-white rounded-lg border overflow-hidden shadow-sm ${!zone.active ? 'opacity-70' : ''}`}>
            <div className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-start">
                    <div className="h-10 w-10 bg-[#3d5291] text-white rounded-full flex items-center justify-center">
                      <Map size={20} />
                    </div>
                    <div className="ml-4">
                      <h2 className="text-lg font-medium text-gray-900">{zone.name}</h2>
                      <p className="text-sm text-gray-500">{zone.description}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 sm:mt-0 flex items-center space-x-4">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    zone.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {zone.active ? 'Active' : 'Inactive'}
                  </span>
                  
                  <button 
                    onClick={() => handleEdit(zone)}
                    className="text-gray-600 hover:text-gray-900 p-1 rounded-full hover:bg-gray-100"
                  >
                    <Edit size={16} />
                  </button>
                  
                  <button 
                    onClick={() => handleDelete(zone.id)}
                    className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-gray-100"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-6">
                <div className="flex items-center">
                  <Users size={18} className="text-gray-400" />
                  <span className="ml-2 text-sm text-gray-600">Distributor: <span className="font-medium">{zone.distributorName}</span></span>
                </div>
                <div className="flex items-center mt-2 sm:mt-0">
                  <MapPin size={18} className="text-gray-400" />
                  <span className="ml-2 text-sm text-gray-600">Beats: <span className="font-medium">{zone.beats.length}</span></span>
                </div>
                <div className="flex items-center mt-2 sm:mt-0">
                  <Store size={18} className="text-gray-400" />
                  <span className="ml-2 text-sm text-gray-600">Retailers: <span className="font-medium">
                    {zone.beats.reduce((total, beat) => total + beat.retailerCount, 0)}
                  </span></span>
                </div>
                <button
                  onClick={() => toggleExpandZone(zone.id)}
                  className="mt-4 sm:mt-0 text-[#3d5291] text-sm font-medium flex items-center hover:underline"
                >
                  {expandedZone === zone.id ? 'Hide Beats' : 'View Beats'}
                  <ChevronRight size={16} className={`ml-1 transform transition-transform ${expandedZone === zone.id ? 'rotate-90' : ''}`} />
                </button>
              </div>
              
              {/* Beats List (Expanded View) */}
              {expandedZone === zone.id && (
                <div className="mt-6 border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-md font-medium">Beats</h3>
                    <Link to="/beats" className="text-[#3d5291] text-sm hover:underline">
                      Manage All Beats
                    </Link>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Beat Name
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Schedule
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Salesman
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Retailers
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {zone.beats.map((beat) => (
                          <tr key={beat.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <MapPin size={16} className="text-gray-400 mr-2" />
                                <div>
                                  <div className="text-sm font-medium text-gray-900">{beat.name}</div>
                                  <div className="text-xs text-gray-500">{beat.id}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">Order: {beat.orderDay}</div>
                              <div className="text-sm text-gray-500">Delivery: {beat.deliveryDay}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm text-gray-900">{beat.salesmanName}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm text-gray-900">{beat.retailerCount} retailers</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                              <Link to={`/beats?id=${beat.id}`} className="text-[#3d5291] hover:underline">
                                View
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Add/Edit Zone Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">
                {selectedZone ? 'Edit Zone' : 'Add New Zone'}
              </h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  {/* Basic Information */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Zone Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2 form-group">
                        <label className="form-label">Zone Name</label>
                        <input
                          type="text"
                          className="form-input"
                          defaultValue={selectedZone?.name || ''}
                          required
                        />
                      </div>
                      <div className="md:col-span-2 form-group">
                        <label className="form-label">Description</label>
                        <textarea
                          rows={3}
                          className="form-textarea"
                          defaultValue={selectedZone?.description || ''}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Distributor Assignment */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Distributor Assignment</h3>
                    <div className="form-group">
                      <label className="form-label">Assigned Distributor</label>
                      <select 
                        className="form-select"
                        defaultValue={selectedZone?.distributorId || ''}
                        required
                      >
                        <option value="">Select Distributor</option>
                        <option value="DIST001">Alex Johnson</option>
                        <option value="DIST002">Michael Brown</option>
                        <option value="DIST003">Jennifer Davis</option>
                        <option value="DIST004">Robert Martin</option>
                      </select>
                    </div>
                  </div>
                  
                  {/* Status */}
                  <div className="form-group">
                    <label className="form-label">Status</label>
                    <select 
                      className="form-select"
                      defaultValue={selectedZone?.active ? 'active' : 'inactive'}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="p-6 border-t bg-gray-50 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#3d5291] border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-[#2d3e6d]"
                >
                  {selectedZone ? 'Update Zone' : 'Add Zone'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Zones;