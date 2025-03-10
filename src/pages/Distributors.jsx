// src/pages/Distributors.jsx
import { useState } from 'react';
import {
    Plus, Search, Edit, Trash2, Users,
    Map, Tag, Package, ArrowUpDown, X,
    Filter, ChevronLeft, ChevronRight,
    ShoppingBag, Truck, BarChart
} from 'lucide-react';

const Distributors = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isStockModalOpen, setIsStockModalOpen] = useState(false);
    const [isCommissionModalOpen, setIsCommissionModalOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedDistributor, setSelectedDistributor] = useState(null);

    // Mock data for distributors
    const distributors = [
        {
            id: 'DIST001',
            firstName: 'Alex',
            lastName: 'Johnson',
            displayName: 'Alex Johnson',
            email: 'alex@example.com',
            phoneNumber: '+91 98765 43210',
            zone: {
                id: 'ZONE001',
                name: 'North Zone'
            },
            active: true,
            createdAt: '2023-01-05',
            totalRetailers: 25,
            totalSalesmen: 3,
            currentStock: 120,
            monthlyCommission: '₹24,500'
        },
        {
            id: 'DIST002',
            firstName: 'Michael',
            lastName: 'Brown',
            displayName: 'Michael Brown',
            email: 'michael@example.com',
            phoneNumber: '+91 87654 32109',
            zone: {
                id: 'ZONE002',
                name: 'South Zone'
            },
            active: true,
            createdAt: '2023-01-10',
            totalRetailers: 18,
            totalSalesmen: 2,
            currentStock: 85,
            monthlyCommission: '₹18,200'
        },
        {
            id: 'DIST003',
            firstName: 'Jennifer',
            lastName: 'Davis',
            displayName: 'Jennifer Davis',
            email: 'jennifer@example.com',
            phoneNumber: '+91 76543 21098',
            zone: {
                id: 'ZONE003',
                name: 'East Zone'
            },
            active: true,
            createdAt: '2023-01-15',
            totalRetailers: 22,
            totalSalesmen: 3,
            currentStock: 105,
            monthlyCommission: '₹21,800'
        },
        {
            id: 'DIST004',
            firstName: 'Robert',
            lastName: 'Martin',
            displayName: 'Robert Martin',
            email: 'robert@example.com',
            phoneNumber: '+91 65432 10987',
            zone: {
                id: 'ZONE004',
                name: 'West Zone'
            },
            active: false,
            createdAt: '2023-01-20',
            totalRetailers: 12,
            totalSalesmen: 2,
            currentStock: 45,
            monthlyCommission: '₹8,500'
        },
    ];

    // Mock data for distributor stock
    const distributorStock = [
        { id: 'PROD001', name: 'Product 1', brand: 'Brand A', category: 'Category 1', quantity: 30, unit: 'Box' },
        { id: 'PROD002', name: 'Product 2', brand: 'Brand B', category: 'Category 2', quantity: 25, unit: 'Box' },
        { id: 'PROD003', name: 'Product 3', brand: 'Brand A', category: 'Category 1', quantity: 20, unit: 'Case' },
        { id: 'PROD004', name: 'Product 4', brand: 'Brand C', category: 'Category 3', quantity: 15, unit: 'Bag' },
        { id: 'PROD005', name: 'Product 5', brand: 'Brand B', category: 'Category 2', quantity: 30, unit: 'Carton' }
    ];

    // Mock data for distributor commission
    const distributorCommission = [
        { id: 'PROD001', name: 'Product 1', brand: 'Brand A', soldQuantity: 120, commission: '₹5,400' },
        { id: 'PROD002', name: 'Product 2', brand: 'Brand B', soldQuantity: 85, commission: '₹6,800' },
        { id: 'PROD003', name: 'Product 3', brand: 'Brand A', soldQuantity: 55, commission: '₹7,150' },
        { id: 'PROD004', name: 'Product 4', brand: 'Brand C', soldQuantity: 70, commission: '₹1,750' },
        { id: 'PROD005', name: 'Product 5', brand: 'Brand B', soldQuantity: 105, commission: '₹3,465' }
    ];

    const handleAddNew = () => {
        setSelectedDistributor(null);
        setIsAddModalOpen(true);
    };

    const handleEdit = (distributor) => {
        setSelectedDistributor(distributor);
        setIsAddModalOpen(true);
    };

    const handleViewStock = (distributor) => {
        setSelectedDistributor(distributor);
        setIsStockModalOpen(true);
    };

    const handleViewCommission = (distributor) => {
        setSelectedDistributor(distributor);
        setIsCommissionModalOpen(true);
    };

    const handleDelete = (distributorId) => {
        // Implement delete functionality
        console.log('Delete distributor with ID:', distributorId);
    };

    const handleCloseModal = () => {
        setIsAddModalOpen(false);
        setIsStockModalOpen(false);
        setIsCommissionModalOpen(false);
        setSelectedDistributor(null);
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
                <h1 className="text-2xl font-bold text-gray-800">Distributors</h1>
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
                        Add Distributor
                    </button>
                </div>
            </div>

            {/* Filter Section */}
            {isFilterOpen && (
                <div className="bg-white p-4 rounded-lg border">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-medium">Filter Distributors</h2>
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
                    placeholder="Search distributors by name, email, phone..."
                    className="w-full ml-2 focus:outline-none"
                />
            </div>

            {/* Distributors Table */}
            <div className="bg-white rounded-lg border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <div className="flex items-center">
                                        Distributor
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
                                        Zone
                                        <ArrowUpDown size={14} className="ml-1" />
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <div className="flex items-center">
                                        Retailers/Salesmen
                                        <ArrowUpDown size={14} className="ml-1" />
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <div className="flex items-center">
                                        Stock/Commission
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
                            {distributors.map((distributor) => (
                                <tr key={distributor.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 bg-[#3d5291] text-white rounded-full flex items-center justify-center">
                                                <Users size={18} />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{distributor.displayName}</div>
                                                <div className="text-sm text-gray-500">{distributor.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{distributor.email}</div>
                                        <div className="text-sm text-gray-500">{distributor.phoneNumber}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <Map size={16} className="text-gray-400 mr-2" />
                                            <span className="text-sm text-gray-900">{distributor.zone.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{distributor.totalRetailers} retailers</div>
                                        <div className="text-sm text-gray-500">{distributor.totalSalesmen} salesmen</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            onClick={() => handleViewStock(distributor)}
                                            className="text-sm text-[#3d5291] hover:underline flex items-center mb-1"
                                        >
                                            <Package size={14} className="mr-1" />
                                            {distributor.currentStock} items
                                        </button>
                                        <button
                                            onClick={() => handleViewCommission(distributor)}
                                            className="text-sm text-[#3d5291] hover:underline flex items-center"
                                        >
                                            <BarChart size={14} className="mr-1" />
                                            {distributor.monthlyCommission}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${distributor.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }`}>
                                            {distributor.active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex items-center justify-end space-x-2">
                                            <button
                                                onClick={() => handleEdit(distributor)}
                                                className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-gray-100"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(distributor.id)}
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
                        Showing <span className="font-medium">1</span> to <span className="font-medium">4</span> of <span className="font-medium">4</span> distributors
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

            {/* Add/Edit Distributor Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-semibold">
                                    {selectedDistributor ? 'Edit Distributor' : 'Add New Distributor'}
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
                                                    defaultValue={selectedDistributor?.firstName || ''}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                                <input
                                                    type="text"
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                    defaultValue={selectedDistributor?.lastName || ''}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                                                <input
                                                    type="text"
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                    defaultValue={selectedDistributor?.displayName || ''}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Contact Information */}
                                    <div>
                                        <h3 className="text-lg font-medium mb-4">Contact Information</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                                <input
                                                    type="email"
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                    defaultValue={selectedDistributor?.email || ''}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                                <input
                                                    type="text"
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                    defaultValue={selectedDistributor?.phoneNumber || ''}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Zone Assignment */}
                                    <div>
                                        <h3 className="text-lg font-medium mb-4">Zone Assignment</h3>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Zone</label>
                                            <select
                                                className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                defaultValue={selectedDistributor?.zone.id || ''}
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

                                    {/* Status */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                        <select
                                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            defaultValue={selectedDistributor?.active ? 'active' : 'inactive'}
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
                                    {selectedDistributor ? 'Update Distributor' : 'Add Distributor'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* View Stock Modal */}
            {isStockModalOpen && selectedDistributor && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-semibold">
                                    Current Stock - {selectedDistributor.displayName}
                                </h2>
                                <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="mb-6 flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">Inventory Summary</h3>
                                    <p className="text-sm text-gray-500">Total Products: {distributorStock.length} | Total Items: {selectedDistributor.currentStock}</p>
                                </div>
                                <button className="px-4 py-2 flex items-center text-sm bg-[#3d5291] text-white rounded-md hover:bg-[#2d3e6d]">
                                    <Plus size={16} className="mr-2" />
                                    Allocate Stock
                                </button>
                            </div>

                            <div className="bg-white border rounded-lg overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Product
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Category & Brand
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Quantity
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {distributorStock.map((item) => (
                                            <tr key={item.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="h-8 w-8 bg-gray-200 rounded flex items-center justify-center">
                                                            <Package size={16} className="text-gray-600" />
                                                        </div>
                                                        <div className="ml-3">
                                                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                                            <div className="text-xs text-gray-500">{item.id}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{item.category}</div>
                                                    <div className="text-sm text-gray-500">{item.brand}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="text-sm font-medium text-gray-900">{item.quantity} {item.unit}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-6 bg-gray-50 p-4 rounded-md">
                                <h4 className="text-sm font-medium text-gray-700 mb-2">Notes</h4>
                                <p className="text-sm text-gray-600">
                                    Stock levels are automatically updated when orders are created or when new stock is allocated to the distributor.
                                </p>
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

            {/* View Commission Modal */}
            {isCommissionModalOpen && selectedDistributor && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-semibold">
                                    Monthly Commission - {selectedDistributor.displayName}
                                </h2>
                                <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="mb-6">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-medium text-gray-900">Commission Summary</h3>
                                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                        Total: {selectedDistributor.monthlyCommission}
                                    </div>
                                </div>
                                <p className="text-sm text-gray-500 mt-1">Period: March 1 - March 31, 2023</p>
                            </div>

                            <div className="bg-white border rounded-lg overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Product
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Brand
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Sold Quantity
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Commission
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {distributorCommission.map((item) => (
                                            <tr key={item.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="h-8 w-8 bg-gray-200 rounded flex items-center justify-center">
                                                            <Package size={16} className="text-gray-600" />
                                                        </div>
                                                        <div className="ml-3">
                                                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                                            <div className="text-xs text-gray-500">{item.id}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="text-sm text-gray-900">{item.brand}</span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="text-sm text-gray-900">{item.soldQuantity} units</span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                                    <span className="text-sm font-medium text-gray-900">{item.commission}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot className="bg-gray-50">
                                        <tr>
                                            <td colSpan="3" className="px-6 py-3 text-right text-sm font-medium">
                                                Total Commission:
                                            </td>
                                            <td className="px-6 py-3 text-right text-sm font-bold">
                                                {selectedDistributor.monthlyCommission}
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>

                            <div className="mt-6 bg-gray-50 p-4 rounded-md">
                                <h4 className="text-sm font-medium text-gray-700 mb-2">Commission Policy</h4>
                                <p className="text-sm text-gray-600">
                                    Commissions are calculated based on the fixed percentage set for each product and are processed on a monthly basis.
                                    Payment will be processed within the first week of the following month.
                                </p>
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
                                className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Export Report
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Distributors;