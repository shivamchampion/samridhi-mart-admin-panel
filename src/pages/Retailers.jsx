// src/pages/Retailers.jsx
import { useState } from 'react';
import {
    Plus, Search, Edit, Trash2, Store,
    Map, MapPin, Phone, Eye, Filter,
    ShoppingBag, ArrowUpDown, X, User,
    ChevronLeft, ChevronRight
} from 'lucide-react';

const Retailers = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedRetailer, setSelectedRetailer] = useState(null);

    // Mock data for retailers
    const retailers = [
        {
            id: 'RET001',
            firstName: 'Ramesh',
            lastName: 'Sharma',
            ownerName: 'Ramesh Sharma',
            storeName: 'Sharma General Store',
            aadharNumber: 'XXXX-XXXX-1234',
            phoneNumber: '+91 98765 43210',
            email: 'ramesh@example.com',
            address: {
                addressLine1: '123, Main Road',
                addressLine2: 'Near Bus Stand',
                city: 'Delhi',
                district: 'Central Delhi',
                pincode: '110001',
                state: 'Delhi'
            },
            zone: {
                id: 'ZONE001',
                name: 'North Zone'
            },
            beat: {
                id: 'BEAT001',
                name: 'Beat 1 - Larkui',
                orderDay: 'Monday',
                deliveryDay: 'Tuesday'
            },
            active: true,
            createdAt: '2023-01-05',
            imageUrl: null,
            orderStats: {
                totalOrders: 38,
                lastOrder: '2023-03-02',
                lastOrderValue: '₹4,500'
            }
        },
        {
            id: 'RET002',
            firstName: 'Suresh',
            lastName: 'Patel',
            ownerName: 'Suresh Patel',
            storeName: 'Patel Super Market',
            aadharNumber: 'XXXX-XXXX-5678',
            phoneNumber: '+91 87654 32109',
            email: 'suresh@example.com',
            address: {
                addressLine1: '456, Market Road',
                addressLine2: 'Commercial Area',
                city: 'Mumbai',
                district: 'Andheri',
                pincode: '400053',
                state: 'Maharashtra'
            },
            zone: {
                id: 'ZONE002',
                name: 'South Zone'
            },
            beat: {
                id: 'BEAT008',
                name: 'Beat 1 - Industrial',
                orderDay: 'Monday',
                deliveryDay: 'Tuesday'
            },
            active: true,
            createdAt: '2023-01-10',
            imageUrl: null,
            orderStats: {
                totalOrders: 42,
                lastOrder: '2023-03-05',
                lastOrderValue: '₹6,200'
            }
        },
        {
            id: 'RET003',
            firstName: 'Priya',
            lastName: 'Verma',
            ownerName: 'Priya Verma',
            storeName: 'Verma Retail Shop',
            aadharNumber: 'XXXX-XXXX-9012',
            phoneNumber: '+91 76543 21098',
            email: 'priya@example.com',
            address: {
                addressLine1: '789, College Road',
                addressLine2: 'Near Park',
                city: 'Bangalore',
                district: 'East Bangalore',
                pincode: '560038',
                state: 'Karnataka'
            },
            zone: {
                id: 'ZONE003',
                name: 'East Zone'
            },
            beat: {
                id: 'BEAT015',
                name: 'Beat 1 - University',
                orderDay: 'Monday',
                deliveryDay: 'Tuesday'
            },
            active: true,
            createdAt: '2023-01-15',
            imageUrl: null,
            orderStats: {
                totalOrders: 35,
                lastOrder: '2023-03-03',
                lastOrderValue: '₹5,300'
            }
        },
        {
            id: 'RET004',
            firstName: 'Rajesh',
            lastName: 'Kumar',
            ownerName: 'Rajesh Kumar',
            storeName: 'Kumar Provision Store',
            aadharNumber: 'XXXX-XXXX-3456',
            phoneNumber: '+91 65432 10987',
            email: 'rajesh@example.com',
            address: {
                addressLine1: '101, Temple Street',
                addressLine2: 'Old Town',
                city: 'Chennai',
                district: 'Central Chennai',
                pincode: '600001',
                state: 'Tamil Nadu'
            },
            zone: {
                id: 'ZONE004',
                name: 'West Zone'
            },
            beat: {
                id: 'BEAT022',
                name: 'Beat 1 - Western Mall',
                orderDay: 'Monday',
                deliveryDay: 'Tuesday'
            },
            active: false,
            createdAt: '2023-01-20',
            imageUrl: null,
            orderStats: {
                totalOrders: 22,
                lastOrder: '2023-02-15',
                lastOrderValue: '₹2,800'
            }
        },
    ];

    // Mock data for retailer order history
    const retailerOrders = [
        { id: 'ORD001', date: '2023-03-02', day: 'Thursday', items: 5, status: 'DELIVERED', value: '₹4,500' },
        { id: 'ORD002', date: '2023-02-23', day: 'Thursday', items: 4, status: 'DELIVERED', value: '₹3,200' },
        { id: 'ORD003', date: '2023-02-16', day: 'Thursday', items: 6, status: 'DELIVERED', value: '₹5,100' },
        { id: 'ORD004', date: '2023-02-09', day: 'Thursday', items: 3, status: 'DELIVERED', value: '₹2,800' },
        { id: 'ORD005', date: '2023-02-02', day: 'Thursday', items: 5, status: 'DELIVERED', value: '₹4,200' }
    ];

    const handleAddNew = () => {
        setSelectedRetailer(null);
        setIsAddModalOpen(true);
    };

    const handleEdit = (retailer) => {
        setSelectedRetailer(retailer);
        setIsAddModalOpen(true);
    };

    const handleView = (retailer) => {
        setSelectedRetailer(retailer);
        setIsViewModalOpen(true);
    };

    const handleDelete = (retailerId) => {
        // Implement delete functionality
        console.log('Delete retailer with ID:', retailerId);
    };

    const handleCloseModal = () => {
        setIsAddModalOpen(false);
        setIsViewModalOpen(false);
        setSelectedRetailer(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement form submission logic
        console.log('Form submitted');
        setIsAddModalOpen(false);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'DELIVERED': return 'bg-green-100 text-green-800';
            case 'PENDING': return 'bg-yellow-100 text-yellow-800';
            case 'CONFIRMED': return 'bg-blue-100 text-blue-800';
            case 'CREATED': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-2xl font-bold text-gray-800">Retailers</h1>
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
                        Add Retailer
                    </button>
                </div>
            </div>

            {/* Filter Section */}
            {isFilterOpen && (
                <div className="bg-white p-4 rounded-lg border">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-medium">Filter Retailers</h2>
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
                            <label className="block text-sm font-medium text-gray-700 mb-1">Beat</label>
                            <select className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                                <option value="">All Beats</option>
                                <option>Beat 1 - Larkui</option>
                                <option>Beat 1 - Industrial</option>
                                <option>Beat 1 - University</option>
                                <option>Beat 1 - Western Mall</option>
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
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                            <select className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                                <option value="">All Cities</option>
                                <option>Delhi</option>
                                <option>Mumbai</option>
                                <option>Bangalore</option>
                                <option>Chennai</option>
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
                    placeholder="Search retailers by name, store, phone..."
                    className="w-full ml-2 focus:outline-none"
                />
            </div>

            {/* Retailers Table */}
            <div className="bg-white rounded-lg border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <div className="flex items-center">
                                        Retailer
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
                                        Zone/Beat
                                        <ArrowUpDown size={14} className="ml-1" />
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <div className="flex items-center">
                                        Address
                                        <ArrowUpDown size={14} className="ml-1" />
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <div className="flex items-center">
                                        Orders
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
                            {retailers.map((retailer) => (
                                <tr key={retailer.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 bg-[#3d5291] text-white rounded-full flex items-center justify-center">
                                                <Store size={18} />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{retailer.storeName}</div>
                                                <div className="text-sm text-gray-500">{retailer.ownerName}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center text-sm text-gray-900 mb-1">
                                            <Phone size={14} className="text-gray-400 mr-1" />
                                            {retailer.phoneNumber}
                                        </div>
                                        <div className="text-sm text-gray-500">{retailer.email}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center mb-1">
                                            <Map size={14} className="text-gray-400 mr-1" />
                                            <span className="text-sm text-gray-900">{retailer.zone.name}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <MapPin size={14} className="text-gray-400 mr-1" />
                                            <span className="text-sm text-gray-500">{retailer.beat.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{retailer.address.city}, {retailer.address.state}</div>
                                        <div className="text-sm text-gray-500">{retailer.address.pincode}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            onClick={() => handleView(retailer)}
                                            className="text-sm text-[#3d5291] hover:underline flex items-center"
                                        >
                                            <ShoppingBag size={14} className="mr-1" />
                                            {retailer.orderStats.totalOrders} orders
                                        </button>
                                        <div className="text-sm text-gray-500">Last: {retailer.orderStats.lastOrder}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${retailer.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }`}>
                                            {retailer.active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex items-center justify-end space-x-2">
                                            <button
                                                onClick={() => handleView(retailer)}
                                                className="text-gray-600 hover:text-gray-900 p-1 rounded-full hover:bg-gray-100"
                                            >
                                                <Eye size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleEdit(retailer)}
                                                className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-gray-100"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(retailer.id)}
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
                        Showing <span className="font-medium">1</span> to <span className="font-medium">4</span> of <span className="font-medium">4</span> retailers
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

            {/* Add/Edit Retailer Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-semibold">
                                    {selectedRetailer ? 'Edit Retailer' : 'Add New Retailer'}
                                </h2>
                                <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                                    <X size={20} />
                                </button>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="p-6 space-y-6">
                                <div className="grid grid-cols-1 gap-6">
                                    {/* Owner Information */}
                                    <div>
                                        <h3 className="text-lg font-medium mb-4">Owner Information</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                                <input
                                                    type="text"
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                    defaultValue={selectedRetailer?.firstName || ''}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                                <input
                                                    type="text"
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                    defaultValue={selectedRetailer?.lastName || ''}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Owner Name</label>
                                                <input
                                                    type="text"
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                    defaultValue={selectedRetailer?.ownerName || ''}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Aadhar Number</label>
                                                <input
                                                    type="text"
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                    defaultValue={selectedRetailer?.aadharNumber || ''}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Store Information */}
                                    <div>
                                        <h3 className="text-lg font-medium mb-4">Store Information</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
                                                <input
                                                    type="text"
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                    defaultValue={selectedRetailer?.storeName || ''}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                                <input
                                                    type="text"
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                    defaultValue={selectedRetailer?.phoneNumber || ''}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                                <input
                                                    type="email"
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                    defaultValue={selectedRetailer?.email || ''}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Address */}
                                    <div>
                                        <h3 className="text-lg font-medium mb-4">Address</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1</label>
                                                <input
                                                    type="text"
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                    defaultValue={selectedRetailer?.address.addressLine1 || ''}
                                                    required
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 2</label>
                                                <input
                                                    type="text"
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                    defaultValue={selectedRetailer?.address.addressLine2 || ''}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                                <input
                                                    type="text"
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                    defaultValue={selectedRetailer?.address.city || ''}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                                                <input
                                                    type="text"
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                    defaultValue={selectedRetailer?.address.district || ''}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                                <input
                                                    type="text"
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                    defaultValue={selectedRetailer?.address.state || ''}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                                                <input
                                                    type="text"
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                    defaultValue={selectedRetailer?.address.pincode || ''}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Zone & Beat Assignment */}
                                    <div>
                                        <h3 className="text-lg font-medium mb-4">Zone & Beat Assignment</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Zone</label>
                                                <select
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                    defaultValue={selectedRetailer?.zone.id || ''}
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
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Beat</label>
                                                <select
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                    defaultValue={selectedRetailer?.beat.id || ''}
                                                    required
                                                >
                                                    <option value="">Select Beat</option>
                                                    <option value="BEAT001">Beat 1 - Larkui (Monday)</option>
                                                    <option value="BEAT008">Beat 1 - Industrial (Monday)</option>
                                                    <option value="BEAT015">Beat 1 - University (Monday)</option>
                                                    <option value="BEAT022">Beat 1 - Western Mall (Monday)</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Images */}
                                    <div>
                                        <h3 className="text-lg font-medium mb-4">Images</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Retailer Image</label>
                                                <div className="mt-1 flex items-center">
                                                    <div className="h-20 w-20 rounded-md border border-gray-300 bg-gray-100 flex items-center justify-center">
                                                        <User size={24} className="text-gray-400" />
                                                    </div>
                                                    <button
                                                        type="button"
                                                        className="ml-4 px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                                    >
                                                        Change
                                                    </button>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Shop Image</label>
                                                <div className="mt-1 flex items-center">
                                                    <div className="h-20 w-20 rounded-md border border-gray-300 bg-gray-100 flex items-center justify-center">
                                                        <Store size={24} className="text-gray-400" />
                                                    </div>
                                                    <button
                                                        type="button"
                                                        className="ml-4 px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                                    >
                                                        Change
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Status */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                        <select
                                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            defaultValue={selectedRetailer?.active ? 'active' : 'inactive'}
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
                                    {selectedRetailer ? 'Update Retailer' : 'Add Retailer'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* View Retailer Modal */}
            {isViewModalOpen && selectedRetailer && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-semibold">
                                    Retailer Details - {selectedRetailer.storeName}
                                </h2>
                                <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Retailer Information */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-gray-50 p-4 rounded-md">
                                    <h3 className="text-sm font-medium text-gray-500 mb-2">Store Information</h3>
                                    <p className="text-sm font-medium">{selectedRetailer.storeName}</p>
                                    <p className="text-sm text-gray-600">Owner: {selectedRetailer.ownerName}</p>
                                    <p className="text-sm text-gray-600 mt-1">ID: {selectedRetailer.id}</p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-md">
                                    <h3 className="text-sm font-medium text-gray-500 mb-2">Contact</h3>
                                    <p className="text-sm text-gray-600">Phone: {selectedRetailer.phoneNumber}</p>
                                    <p className="text-sm text-gray-600">Email: {selectedRetailer.email || 'N/A'}</p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-md">
                                    <h3 className="text-sm font-medium text-gray-500 mb-2">Zone & Beat</h3>
                                    <p className="text-sm text-gray-600">Zone: {selectedRetailer.zone.name}</p>
                                    <p className="text-sm text-gray-600">Beat: {selectedRetailer.beat.name}</p>
                                    <p className="text-sm text-gray-600">Order Day: {selectedRetailer.beat.orderDay}</p>
                                    <p className="text-sm text-gray-600">Delivery Day: {selectedRetailer.beat.deliveryDay}</p>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-md">
                                <h3 className="text-sm font-medium text-gray-500 mb-2">Address</h3>
                                <p className="text-sm text-gray-900">{selectedRetailer.address.addressLine1}</p>
                                {selectedRetailer.address.addressLine2 && (
                                    <p className="text-sm text-gray-900">{selectedRetailer.address.addressLine2}</p>
                                )}
                                <p className="text-sm text-gray-900">
                                    {selectedRetailer.address.city}, {selectedRetailer.address.district}, {selectedRetailer.address.state} - {selectedRetailer.address.pincode}
                                </p>
                            </div>

                            {/* Order History */}
                            <div>
                                <h3 className="text-lg font-medium mb-3">Order History</h3>
                                <div className="bg-white border rounded-lg overflow-hidden">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Order ID
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Date
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Items
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Status
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Value
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {retailerOrders.map((order) => (
                                                <tr key={order.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="text-sm font-medium text-[#3d5291]">{order.id}</span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{order.date}</div>
                                                        <div className="text-sm text-gray-500">{order.day}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="text-sm text-gray-900">{order.items} items</span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                                                            {order.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                                        <span className="text-sm font-medium">{order.value}</span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t bg-gray-50 flex justify-end space-x-3">
                            <button
                                onClick={handleCloseModal}
                                className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => {
                                    handleCloseModal();
                                    handleEdit(selectedRetailer);
                                }}
                                className="px-4 py-2 bg-[#3d5291] border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-[#2d3e6d]"
                            >
                                Edit Retailer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Retailers;