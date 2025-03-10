// src/pages/Salesmen.jsx
import { useState } from 'react';
import {
    Plus, Search, Edit, Trash2, User,
    Map, Calendar, MapPin, Phone,
    ArrowUpDown, X, Filter,
    ChevronLeft, ChevronRight, ShoppingBag
} from 'lucide-react';

const Salesmen = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isPerformanceModalOpen, setIsPerformanceModalOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedSalesman, setSelectedSalesman] = useState(null);

    // Mock data for salesmen
    const salesmen = [
        {
            id: 'SALES001',
            firstName: 'John',
            lastName: 'Doe',
            phoneNumber: '+91 98765 43210',
            uid: 'UID001',
            distributor: {
                id: 'DIST001',
                name: 'Alex Johnson'
            },
            zone: {
                id: 'ZONE001',
                name: 'North Zone'
            },
            beats: [
                { id: 'BEAT001', name: 'Beat 1 - Larkui', orderDay: 'Monday' },
                { id: 'BEAT002', name: 'Beat 2 - Central', orderDay: 'Tuesday' },
                { id: 'BEAT005', name: 'Beat 5 - Main Road', orderDay: 'Friday' }
            ],
            active: true,
            createdAt: '2023-01-05',
            performance: {
                totalOrders: 128,
                totalRetailers: 32,
                monthlyOrders: 42,
                monthlyValue: '₹62,500'
            }
        },
        {
            id: 'SALES003',
            firstName: 'James',
            lastName: 'Wilson',
            phoneNumber: '+91 87654 32109',
            uid: 'UID003',
            distributor: {
                id: 'DIST002',
                name: 'Michael Brown'
            },
            zone: {
                id: 'ZONE002',
                name: 'South Zone'
            },
            beats: [
                { id: 'BEAT008', name: 'Beat 1 - Industrial', orderDay: 'Monday' },
                { id: 'BEAT009', name: 'Beat 2 - Crossings', orderDay: 'Tuesday' },
                { id: 'BEAT010', name: 'Beat 3 - Complex', orderDay: 'Wednesday' },
                { id: 'BEAT014', name: 'Beat 7 - Gardens', orderDay: 'Sunday' }
            ],
            active: true,
            createdAt: '2023-01-10',
            performance: {
                totalOrders: 96,
                totalRetailers: 24,
                monthlyOrders: 34,
                monthlyValue: '₹48,200'
            }
        },
        {
            id: 'SALES005',
            firstName: 'Patricia',
            lastName: 'Taylor',
            phoneNumber: '+91 76543 21098',
            uid: 'UID005',
            distributor: {
                id: 'DIST003',
                name: 'Jennifer Davis'
            },
            zone: {
                id: 'ZONE003',
                name: 'East Zone'
            },
            beats: [
                { id: 'BEAT015', name: 'Beat 1 - University', orderDay: 'Monday' },
                { id: 'BEAT016', name: 'Beat 2 - East Market', orderDay: 'Tuesday' },
                { id: 'BEAT017', name: 'Beat 3 - Shopping Mall', orderDay: 'Wednesday' },
                { id: 'BEAT021', name: 'Beat 7 - Service Road', orderDay: 'Sunday' }
            ],
            active: true,
            createdAt: '2023-01-15',
            performance: {
                totalOrders: 112,
                totalRetailers: 28,
                monthlyOrders: 38,
                monthlyValue: '₹54,600'
            }
        },
        {
            id: 'SALES007',
            firstName: 'Charles',
            lastName: 'Allen',
            phoneNumber: '+91 65432 10987',
            uid: 'UID007',
            distributor: {
                id: 'DIST004',
                name: 'Robert Martin'
            },
            zone: {
                id: 'ZONE004',
                name: 'West Zone'
            },
            beats: [
                { id: 'BEAT022', name: 'Beat 1 - Western Mall', orderDay: 'Monday' },
                { id: 'BEAT023', name: 'Beat 2 - Suburb', orderDay: 'Tuesday' },
                { id: 'BEAT024', name: 'Beat 3 - Main Street', orderDay: 'Wednesday' },
                { id: 'BEAT028', name: 'Beat 7 - West End', orderDay: 'Sunday' }
            ],
            active: false,
            createdAt: '2023-01-20',
            performance: {
                totalOrders: 64,
                totalRetailers: 16,
                monthlyOrders: 22,
                monthlyValue: '₹28,500'
            }
        },
    ];

    // Mock data for salesman performance details
    const performanceDetails = {
        dailyOrders: [
            { date: 'Mar 1', orders: 2, value: '₹3,200' },
            { date: 'Mar 2', orders: 3, value: '₹4,500' },
            { date: 'Mar 3', orders: 1, value: '₹1,800' },
            { date: 'Mar 4', orders: 4, value: '₹6,200' },
            { date: 'Mar 5', orders: 2, value: '₹3,500' }
        ],
        beatPerformance: [
            { beat: 'Beat 1 - Larkui', retailers: 12, orders: 18, value: '₹22,800' },
            { beat: 'Beat 2 - Central', retailers: 8, orders: 14, value: '₹18,400' },
            { beat: 'Beat 5 - Main Road', retailers: 12, orders: 10, value: '₹21,300' }
        ]
    };

    const handleAddNew = () => {
        setSelectedSalesman(null);
        setIsAddModalOpen(true);
    };

    const handleEdit = (salesman) => {
        setSelectedSalesman(salesman);
        setIsAddModalOpen(true);
    };

    const handleViewPerformance = (salesman) => {
        setSelectedSalesman(salesman);
        setIsPerformanceModalOpen(true);
    };

    const handleDelete = (salesmanId) => {
        // Implement delete functionality
        console.log('Delete salesman with ID:', salesmanId);
    };

    const handleCloseModal = () => {
        setIsAddModalOpen(false);
        setIsPerformanceModalOpen(false);
        setSelectedSalesman(null);
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
                <h1 className="text-2xl font-bold text-gray-800">Salesmen</h1>
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
                        Add Salesman
                    </button>
                </div>
            </div>

            {/* Filter Section */}
            {isFilterOpen && (
                <div className="bg-white p-4 rounded-lg border">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-medium">Filter Salesmen</h2>
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
                            <label className="block text-sm font-medium text-gray-700 mb-1">Distributor</label>
                            <select className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                                <option value="">All Distributors</option>
                                <option>Alex Johnson</option>
                                <option>Michael Brown</option>
                                <option>Jennifer Davis</option>
                                <option>Robert Martin</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                                <option value="">All Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
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
                    placeholder="Search salesmen by name, phone..."
                    className="w-full ml-2 focus:outline-none"
                />
            </div>

            {/* Salesmen Table */}
            <div className="bg-white rounded-lg border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <div className="flex items-center">
                                        Salesman
                                        <ArrowUpDown size={14} className="ml-1" />
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <div className="flex items-center">
                                        Contact
                                        <ArrowUpDown size={14} className="ml-1" />
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <div className="flex items-center">
                                        Distributor
                                        <ArrowUpDown size={14} className="ml-1" />
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <div className="flex items-center">
                                        Zone/Beats
                                        <ArrowUpDown size={14} className="ml-1" />
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <div className="flex items-center">
                                        Performance
                                        <ArrowUpDown size={14} className="ml-1" />
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <div className="flex items-center">
                                        Status
                                        <ArrowUpDown size={14} className="ml-1" />
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {salesmen.map((salesman) => (
                                <tr key={salesman.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 bg-[#3d5291] text-white rounded-full flex items-center justify-center">
                                                <User size={18} />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{salesman.firstName} {salesman.lastName}</div>
                                                <div className="text-sm text-gray-500">{salesman.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center text-sm text-gray-900">
                                            <Phone size={14} className="text-gray-400 mr-1" />
                                            {salesman.phoneNumber}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{salesman.distributor.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center mb-1">
                                            <Map size={14} className="text-gray-400 mr-1" />
                                            <span className="text-sm text-gray-900">{salesman.zone.name}</span>
                                        </div>
                                        <div className="text-sm text-gray-500">{salesman.beats.length} beats assigned</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            onClick={() => handleViewPerformance(salesman)}
                                            className="text-sm text-[#3d5291] hover:underline flex items-center"
                                        >
                                            <ShoppingBag size={14} className="mr-1" />
                                            {salesman.performance.monthlyOrders} orders ({salesman.performance.monthlyValue})
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${salesman.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }`}>
                                            {salesman.active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex items-center justify-end space-x-2">
                                            <button
                                                onClick={() => handleEdit(salesman)}
                                                className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-gray-100"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(salesman.id)}
                                                className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-gray-100"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-3 flex items-center justify-between border-t">
                    <div className="text-sm text-gray-500">
                        Showing <span className="font-medium">1</span> to <span className="font-medium">4</span> of <span className="font-medium">4</span> salesmen
                    </div>
                    <div className="flex space-x-2">
                        <button className="px-3 py-1 border rounded bg-white text-gray-600 hover:bg-gray-50 flex items-center">
                            <ChevronLeft size={16} />
                            <span className="ml-1">Previous</span>
                        </button>
                        <button className="px-3 py-1 border rounded bg-white text-gray-600 hover:bg-gray-50 flex items-center">
                            <span className="mr-1">Next</span>
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Add/Edit Salesman Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-semibold">
                                    {selectedSalesman ? 'Edit Salesman' : 'Add New Salesman'}
                                </h2>
                                <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                                    <X size={20} />
                                </button>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="p-6 space-y-6">
                                <div className="grid grid-cols-1 gap-6">
                                    {/* Basic Information */}
                                    <div>
                                        <h3 className="text-lg font-medium mb-4">Basic Information</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                                <input
                                                    type="text"
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                    defaultValue={selectedSalesman?.firstName || ''}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                                <input
                                                    type="text"
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                    defaultValue={selectedSalesman?.lastName || ''}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                                <input
                                                    type="text"
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                    defaultValue={selectedSalesman?.phoneNumber || ''}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
                                                <input
                                                    type="text"
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                    defaultValue={selectedSalesman?.uid || ''}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Assignment */}
                                    <div>
                                        <h3 className="text-lg font-medium mb-4">Assignment</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Distributor</label>
                                                <select
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                    defaultValue={selectedSalesman?.distributor.id || ''}
                                                    required
                                                >
                                                    <option value="">Select Distributor</option>
                                                    <option value="DIST001">Alex Johnson</option>
                                                    <option value="DIST002">Michael Brown</option>
                                                    <option value="DIST003">Jennifer Davis</option>
                                                    <option value="DIST004">Robert Martin</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Zone</label>
                                                <select
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                    defaultValue={selectedSalesman?.zone.id || ''}
                                                    required
                                                >
                                                    <option value="">Select Zone</option>
                                                    <option value="ZONE001">North Zone</option>
                                                    <option value="ZONE002">South Zone</option>
                                                    <option value="ZONE003">East Zone</option>
                                                    <option value="ZONE004">West Zone</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Beat Assignment */}
                                    <div>
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-lg font-medium">Beat Assignment</h3>
                                            <button
                                                type="button"
                                                className="text-[#3d5291] text-sm hover:underline"
                                            >
                                                Assign All Beats
                                            </button>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-md">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                                                    <div key={day} className="flex items-start">
                                                        <input
                                                            type="checkbox"
                                                            id={`day-${day}`}
                                                            className="mt-0.5 h-4 w-4 text-[#3d5291] focus:ring-indigo-500 border-gray-300 rounded"
                                                            defaultChecked={selectedSalesman?.beats.some(beat => beat.orderDay === day)}
                                                        />
                                                        <label htmlFor={`day-${day}`} className="ml-2 block text-sm text-gray-700">
                                                            {day}
                                                            {selectedSalesman?.beats.filter(beat => beat.orderDay === day).map(beat => (
                                                                <div key={beat.id} className="text-xs text-gray-500 mt-0.5">{beat.name}</div>
                                                            ))}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Status */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                        <select
                                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            defaultValue={selectedSalesman?.active ? 'active' : 'inactive'}
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
                                    {selectedSalesman ? 'Update Salesman' : 'Add Salesman'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Performance Modal */}
            {isPerformanceModalOpen && selectedSalesman && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-semibold">
                                    Performance - {selectedSalesman.firstName} {selectedSalesman.lastName}
                                </h2>
                                <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Performance Summary */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="bg-gray-50 p-4 rounded-md text-center">
                                    <p className="text-sm text-gray-500">Total Orders</p>
                                    <p className="text-2xl font-bold text-gray-900">{selectedSalesman.performance.totalOrders}</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-md text-center">
                                    <p className="text-sm text-gray-500">Total Retailers</p>
                                    <p className="text-2xl font-bold text-gray-900">{selectedSalesman.performance.totalRetailers}</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-md text-center">
                                    <p className="text-sm text-gray-500">Monthly Orders</p>
                                    <p className="text-2xl font-bold text-gray-900">{selectedSalesman.performance.monthlyOrders}</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-md text-center">
                                    <p className="text-sm text-gray-500">Monthly Value</p>
                                    <p className="text-2xl font-bold text-gray-900">{selectedSalesman.performance.monthlyValue}</p>
                                </div>
                            </div>

                            {/* Daily Orders Table */}
                            <div>
                                <h3 className="text-lg font-medium mb-3">Recent Orders</h3>
                                <div className="bg-white border rounded-lg overflow-hidden">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Date
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Orders
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Value
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {performanceDetails.dailyOrders.map((day, index) => (
                                                <tr key={index} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="text-sm font-medium text-gray-900">{day.date}</span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="text-sm text-gray-900">{day.orders} orders</span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                                        <span className="text-sm font-medium">{day.value}</span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Beat Performance Table */}
                            <div>
                                <h3 className="text-lg font-medium mb-3">Beat Performance</h3>
                                <div className="bg-white border rounded-lg overflow-hidden">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Beat
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Retailers
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Orders
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Value
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {performanceDetails.beatPerformance.map((beat, index) => (
                                                <tr key={index} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <MapPin size={16} className="text-gray-400 mr-2" />
                                                            <span className="text-sm font-medium text-gray-900">{beat.beat}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="text-sm text-gray-900">{beat.retailers}</span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="text-sm text-gray-900">{beat.orders}</span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                                        <span className="text-sm font-medium">{beat.value}</span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t bg-gray-50 flex justify-end">
                            <button
                                onClick={handleCloseModal}
                                className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Salesmen;