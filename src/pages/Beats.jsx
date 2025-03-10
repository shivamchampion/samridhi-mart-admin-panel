// src/pages/Beats.jsx
import { useState } from 'react';
import {
    Plus, Search, Edit, Trash2, MapPin,
    Map, Calendar, User, Store, X, Filter
} from 'lucide-react';

const Beats = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedBeat, setSelectedBeat] = useState(null);

    // Mock data for beats
    const beats = [
        {
            id: 'BEAT001',
            name: 'Beat 1 - Larkui',
            zone: {
                id: 'ZONE001',
                name: 'North Zone'
            },
            orderDay: 'Monday',
            deliveryDay: 'Tuesday',
            salesman: {
                id: 'SALES001',
                name: 'John Doe',
                phone: '+91 98765 43210'
            },
            retailerCount: 12,
            active: true,
            createdAt: '2023-01-15'
        },
        {
            id: 'BEAT002',
            name: 'Beat 2 - Central',
            zone: {
                id: 'ZONE001',
                name: 'North Zone'
            },
            orderDay: 'Tuesday',
            deliveryDay: 'Wednesday',
            salesman: {
                id: 'SALES001',
                name: 'John Doe',
                phone: '+91 98765 43210'
            },
            retailerCount: 8,
            active: true,
            createdAt: '2023-01-15'
        },
        {
            id: 'BEAT008',
            name: 'Beat 1 - Industrial',
            zone: {
                id: 'ZONE002',
                name: 'South Zone'
            },
            orderDay: 'Monday',
            deliveryDay: 'Tuesday',
            salesman: {
                id: 'SALES003',
                name: 'James Wilson',
                phone: '+91 87654 32109'
            },
            retailerCount: 6,
            active: true,
            createdAt: '2023-01-20'
        },
        {
            id: 'BEAT015',
            name: 'Beat 1 - University',
            zone: {
                id: 'ZONE003',
                name: 'East Zone'
            },
            orderDay: 'Monday',
            deliveryDay: 'Tuesday',
            salesman: {
                id: 'SALES005',
                name: 'Patricia Taylor',
                phone: '+91 76543 21098'
            },
            retailerCount: 9,
            active: true,
            createdAt: '2023-02-05'
        },
        {
            id: 'BEAT022',
            name: 'Beat 1 - Western Mall',
            zone: {
                id: 'ZONE004',
                name: 'West Zone'
            },
            orderDay: 'Monday',
            deliveryDay: 'Tuesday',
            salesman: {
                id: 'SALES007',
                name: 'Charles Allen',
                phone: '+91 65432 10987'
            },
            retailerCount: 10,
            active: false,
            createdAt: '2023-02-10'
        },
    ];

    const handleAddNew = () => {
        setSelectedBeat(null);
        setIsAddModalOpen(true);
    };

    const handleEdit = (beat) => {
        setSelectedBeat(beat);
        setIsAddModalOpen(true);
    };

    const handleDelete = (beatId) => {
        // Implement delete functionality
        console.log('Delete beat with ID:', beatId);
    };

    const handleCloseModal = () => {
        setIsAddModalOpen(false);
        setSelectedBeat(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement form submission logic
        console.log('Form submitted');
        setIsAddModalOpen(false);
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-2xl font-bold text-gray-800">Beats Management</h1>
                <div className="mt-4 sm:mt-0 flex flex-wrap gap-3">
                    <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="px-4 py-2 flex items-center text-sm bg-white border rounded-md hover:bg-gray-50"
                    >
                        <Filter size={16} className="mr-2" />
                        Filter
                    </button>
                    <button
                        onClick={handleAddNew}
                        className="px-4 py-2 flex items-center text-sm bg-[#3d5291] text-white rounded-md hover:bg-[#2d3e6d]"
                    >
                        <Plus size={16} className="mr-2" />
                        Add Beat
                    </button>
                </div>
            </div>

            {/* Filter Section */}
            {isFilterOpen && (
                <div className="bg-white p-4 rounded-lg border">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-medium">Filter Beats</h2>
                        <button onClick={() => setIsFilterOpen(false)} className="text-gray-500 hover:text-gray-700">
                            <X size={18} />
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Zone</label>
                            <select className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                                <option value="">All Zones</option>
                                <option>North Zone</option>
                                <option>South Zone</option>
                                <option>East Zone</option>
                                <option>West Zone</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Order Day</label>
                            <select className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                                <option value="">All Days</option>
                                <option>Monday</option>
                                <option>Tuesday</option>
                                <option>Wednesday</option>
                                <option>Thursday</option>
                                <option>Friday</option>
                                <option>Saturday</option>
                                <option>Sunday</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Salesman</label>
                            <select className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                                <option value="">All Salesmen</option>
                                <option>John Doe</option>
                                <option>James Wilson</option>
                                <option>Patricia Taylor</option>
                                <option>Charles Allen</option>
                            </select>
                        </div>
                    </div>
                    <div className="mt-4 flex justify-end space-x-3">
                        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md">
                            Reset
                        </button>
                        <button className="px-4 py-2 bg-[#3d5291] text-white rounded-md">
                            Apply Filters
                        </button>
                    </div>
                </div>
            )}

            {/* Search Bar */}
            <div className="flex items-center bg-white px-3 py-2 rounded-lg border">
                <Search size={20} className="text-gray-400" />
                <input
                    type="text"
                    placeholder="Search beats by name, salesman..."
                    className="w-full ml-2 focus:outline-none"
                />
            </div>

            {/* Beats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {beats.map((beat) => (
                    <div key={beat.id} className={`bg-white rounded-lg border overflow-hidden ${!beat.active ? 'opacity-70' : ''}`}>
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-start">
                                    <div className="h-10 w-10 bg-[#3d5291] text-white rounded-full flex items-center justify-center">
                                        <MapPin size={20} />
                                    </div>
                                    <div className="ml-4">
                                        <h2 className="text-lg font-medium text-gray-900">{beat.name}</h2>
                                        <div className="flex items-center mt-1">
                                            <Map size={14} className="text-gray-400" />
                                            <span className="ml-1 text-sm text-gray-500">{beat.zone.name}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => handleEdit(beat)}
                                        className="text-gray-600 hover:text-gray-900 p-1 rounded-full hover:bg-gray-100"
                                    >
                                        <Edit size={16} />
                                    </button>

                                    <button
                                        onClick={() => handleDelete(beat.id)}
                                        className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-gray-100"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>

                            <div className="mt-4 space-y-3">
                                <div className="bg-gray-50 p-3 rounded-md flex items-start">
                                    <Calendar size={16} className="text-gray-400 mt-0.5" />
                                    <div className="ml-3">
                                        <h3 className="text-sm font-medium text-gray-900">Schedule</h3>
                                        <p className="text-sm text-gray-500">Order: <span className="font-medium">{beat.orderDay}</span></p>
                                        <p className="text-sm text-gray-500">Delivery: <span className="font-medium">{beat.deliveryDay}</span></p>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-3 rounded-md flex items-start">
                                    <User size={16} className="text-gray-400 mt-0.5" />
                                    <div className="ml-3">
                                        <h3 className="text-sm font-medium text-gray-900">Salesman</h3>
                                        <p className="text-sm text-gray-500">{beat.salesman.name}</p>
                                        <p className="text-sm text-gray-500">{beat.salesman.phone}</p>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-3 rounded-md flex items-start">
                                    <Store size={16} className="text-gray-400 mt-0.5" />
                                    <div className="ml-3">
                                        <h3 className="text-sm font-medium text-gray-900">Retailers</h3>
                                        <p className="text-sm text-gray-500">{beat.retailerCount} retailers assigned</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 flex justify-between items-center">
                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${beat.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                    {beat.active ? 'Active' : 'Inactive'}
                                </span>

                                <span className="text-xs text-gray-500">
                                    Created on {beat.createdAt}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add/Edit Beat Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b">
                            <h2 className="text-xl font-semibold">
                                {selectedBeat ? 'Edit Beat' : 'Add New Beat'}
                            </h2>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="p-6 space-y-6">
                                <div className="grid grid-cols-1 gap-6">
                                    {/* Basic Information */}
                                    <div>
                                        <h3 className="text-lg font-medium mb-4">Beat Information</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Beat Name</label>
                                                <input
                                                    type="text"
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                    defaultValue={selectedBeat?.name || ''}
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Zone</label>
                                                <select
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                    defaultValue={selectedBeat?.zone.id || ''}
                                                    required
                                                >
                                                    <option value="">Select Zone</option>
                                                    <option value="ZONE001">North Zone</option>
                                                    <option value="ZONE002">South Zone</option>
                                                    <option value="ZONE003">East Zone</option>
                                                    <option value="ZONE004">West Zone</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Salesman</label>
                                                <select
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                    defaultValue={selectedBeat?.salesman.id || ''}
                                                    required
                                                >
                                                    <option value="">Select Salesman</option>
                                                    <option value="SALES001">John Doe</option>
                                                    <option value="SALES003">James Wilson</option>
                                                    <option value="SALES005">Patricia Taylor</option>
                                                    <option value="SALES007">Charles Allen</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Schedule Information */}
                                    <div>
                                        <h3 className="text-lg font-medium mb-4">Schedule Information</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Order Day</label>
                                                <select
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                    defaultValue={selectedBeat?.orderDay || ''}
                                                    required
                                                >
                                                    <option value="">Select Day</option>
                                                    <option>Monday</option>
                                                    <option>Tuesday</option>
                                                    <option>Wednesday</option>
                                                    <option>Thursday</option>
                                                    <option>Friday</option>
                                                    <option>Saturday</option>
                                                    <option>Sunday</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Day</label>
                                                <select
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                    defaultValue={selectedBeat?.deliveryDay || ''}
                                                    required
                                                >
                                                    <option value="">Select Day</option>
                                                    <option>Monday</option>
                                                    <option>Tuesday</option>
                                                    <option>Wednesday</option>
                                                    <option>Thursday</option>
                                                    <option>Friday</option>
                                                    <option>Saturday</option>
                                                    <option>Sunday</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Status */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                        <select
                                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            defaultValue={selectedBeat?.active ? 'active' : 'inactive'}
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
                                    {selectedBeat ? 'Update Beat' : 'Add Beat'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Beats;