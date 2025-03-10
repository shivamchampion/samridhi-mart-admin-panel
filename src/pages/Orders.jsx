// src/pages/Orders.jsx
import { useState } from 'react';
import {
    Search, Filter, ArrowUpDown, ChevronLeft,
    ChevronRight, Download, Eye, Calendar,
    ChevronsUpDown, X
} from 'lucide-react';

const Orders = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [dateRange, setDateRange] = useState({ from: '', to: '' });

    // Mock data for orders
    const orders = [
        {
            id: 'ORD001',
            retailer: {
                name: 'Retailer 1',
                storeName: 'Shop A',
                zone: 'North Zone',
                beat: 'Beat 1 - Larkui'
            },
            date: '2023-03-10',
            orderDay: 'Friday',
            deliveryDate: '2023-03-11',
            deliveryDay: 'Saturday',
            status: 'DELIVERED',
            amount: '₹8,500',
            creator: {
                entity: 'SALESMAN',
                name: 'John Doe'
            },
            items: [
                { id: 'ITEM001', product: 'Product 1', quantity: '2 Box (20 Mala)', price: '₹900', total: '₹1,800' },
                { id: 'ITEM002', product: 'Product 2', quantity: '5 Box (50 Mala)', price: '₹750', total: '₹3,750' },
                { id: 'ITEM003', product: 'Product 3', quantity: '3 Case (30 Piece)', price: '₹1,150', total: '₹2,950' }
            ]
        },
        {
            id: 'ORD002',
            retailer: {
                name: 'Retailer 2',
                storeName: 'Shop B',
                zone: 'South Zone',
                beat: 'Beat 2 - Central'
            },
            date: '2023-03-09',
            orderDay: 'Thursday',
            deliveryDate: '2023-03-10',
            deliveryDay: 'Friday',
            status: 'PENDING',
            amount: '₹4,200',
            creator: {
                entity: 'DISTRIBUTOR',
                name: 'Alex Johnson'
            },
            items: [
                { id: 'ITEM001', product: 'Product 1', quantity: '1 Box (10 Mala)', price: '₹900', total: '₹900' },
                { id: 'ITEM002', product: 'Product 5', quantity: '10 Carton (100 Pack)', price: '₹330', total: '₹3,300' }
            ]
        },
        {
            id: 'ORD003',
            retailer: {
                name: 'Retailer 3',
                storeName: 'Shop C',
                zone: 'East Zone',
                beat: 'Beat 3 - Market'
            },
            date: '2023-03-09',
            orderDay: 'Thursday',
            deliveryDate: '2023-03-10',
            deliveryDay: 'Friday',
            status: 'CONFIRMED',
            amount: '₹6,750',
            creator: {
                entity: 'SALESMAN',
                name: 'Robert Williams'
            },
            items: [
                { id: 'ITEM001', product: 'Product 2', quantity: '9 Box (90 Mala)', price: '₹750', total: '₹6,750' }
            ]
        },
        {
            id: 'ORD004',
            retailer: {
                name: 'Retailer 4',
                storeName: 'Shop D',
                zone: 'West Zone',
                beat: 'Beat 4 - Colony'
            },
            date: '2023-03-08',
            orderDay: 'Wednesday',
            deliveryDate: '2023-03-09',
            deliveryDay: 'Thursday',
            status: 'DELIVERED',
            amount: '₹3,450',
            creator: {
                entity: 'SALESMAN',
                name: 'Sarah Miller'
            },
            items: [
                { id: 'ITEM001', product: 'Product 4', quantity: '15 Bag (150 Kg)', price: '₹230', total: '₹3,450' }
            ]
        },
        {
            id: 'ORD005',
            retailer: {
                name: 'Retailer 5',
                storeName: 'Shop E',
                zone: 'North Zone',
                beat: 'Beat 5 - Main Road'
            },
            date: '2023-03-08',
            orderDay: 'Wednesday',
            deliveryDate: '2023-03-09',
            deliveryDay: 'Thursday',
            status: 'CREATED',
            amount: '₹5,200',
            creator: {
                entity: 'DISTRIBUTOR',
                name: 'Alex Johnson'
            },
            items: [
                { id: 'ITEM001', product: 'Product 1', quantity: '2 Box (20 Mala)', price: '₹900', total: '₹1,800' },
                { id: 'ITEM002', product: 'Product 3', quantity: '3 Case (30 Piece)', price: '₹1,150', total: '₹3,450' }
            ]
        },
    ];

    const handleViewOrder = (order) => {
        setSelectedOrder(order);
        setIsViewModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsViewModalOpen(false);
        setSelectedOrder(null);
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
                <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
                <div className="mt-4 sm:mt-0 flex flex-wrap gap-3">
                    <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="px-4 py-2 flex items-center text-sm bg-white border rounded-md hover:bg-gray-50"
                    >
                        <Filter size={16} className="mr-2" />
                        Filters
                    </button>
                    <button className="px-4 py-2 flex items-center text-sm bg-white border rounded-md hover:bg-gray-50">
                        <Download size={16} className="mr-2" />
                        Export
                    </button>
                </div>
            </div>

            {/* Filter Section */}
            {isFilterOpen && (
                <div className="bg-white p-4 rounded-lg border">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-medium">Filter Orders</h2>
                        <button onClick={() => setIsFilterOpen(false)} className="text-gray-500 hover:text-gray-700">
                            <X size={18} />
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                                <option value="">All Status</option>
                                <option value="CREATED">Created</option>
                                <option value="CONFIRMED">Confirmed</option>
                                <option value="PENDING">Pending</option>
                                <option value="DELIVERED">Delivered</option>
                            </select>
                        </div>
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
                                <option>Beat 2 - Central</option>
                                <option>Beat 3 - Market</option>
                                <option>Beat 4 - Colony</option>
                                <option>Beat 5 - Main Road</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Creator</label>
                            <select className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                                <option value="">All Creators</option>
                                <option value="SALESMAN">Salesman</option>
                                <option value="DISTRIBUTOR">Distributor</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
                            <div className="relative">
                                <input
                                    type="date"
                                    value={dateRange.from}
                                    onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                <Calendar size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                            <div className="relative">
                                <input
                                    type="date"
                                    value={dateRange.to}
                                    onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                                <Calendar size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>
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
                    placeholder="Search orders by ID, retailer, or creator..."
                    className="w-full ml-2 focus:outline-none"
                />
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-lg border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <div className="flex items-center">
                                        Order ID
                                        <ArrowUpDown size={14} className="ml-1" />
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <div className="flex items-center">
                                        Retailer
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
                                        Order Date
                                        <ArrowUpDown size={14} className="ml-1" />
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <div className="flex items-center">
                                        Status
                                        <ArrowUpDown size={14} className="ml-1" />
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <div className="flex items-center">
                                        Amount
                                        <ArrowUpDown size={14} className="ml-1" />
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <div className="flex items-center">
                                        Creator
                                        <ArrowUpDown size={14} className="ml-1" />
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm font-medium text-[#3d5291]">{order.id}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{order.retailer.name}</div>
                                        <div className="text-sm text-gray-500">{order.retailer.storeName}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{order.retailer.zone}</div>
                                        <div className="text-sm text-gray-500">{order.retailer.beat}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{order.date}</div>
                                        <div className="text-sm text-gray-500">{order.orderDay}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm font-medium">{order.amount}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{order.creator.entity}</div>
                                        <div className="text-sm text-gray-500">{order.creator.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => handleViewOrder(order)}
                                            className="text-[#3d5291] hover:underline"
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-3 flex items-center justify-between border-t">
                    <div className="text-sm text-gray-500">
                        Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">25</span> orders
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

            {/* View Order Modal */}
            {isViewModalOpen && selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b flex justify-between items-center">
                            <h2 className="text-xl font-semibold">
                                Order Details - {selectedOrder.id}
                            </h2>
                            <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Order Information */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-gray-50 p-4 rounded-md">
                                    <h3 className="text-sm font-medium text-gray-500 mb-2">Retailer Information</h3>
                                    <p className="text-sm font-medium">{selectedOrder.retailer.name}</p>
                                    <p className="text-sm text-gray-600">{selectedOrder.retailer.storeName}</p>
                                    <p className="text-sm text-gray-600 mt-1">{selectedOrder.retailer.zone}</p>
                                    <p className="text-sm text-gray-600">{selectedOrder.retailer.beat}</p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-md">
                                    <h3 className="text-sm font-medium text-gray-500 mb-2">Order Information</h3>
                                    <div className="flex justify-between mb-1">
                                        <p className="text-sm text-gray-600">Order Date:</p>
                                        <p className="text-sm font-medium">{selectedOrder.date} ({selectedOrder.orderDay})</p>
                                    </div>
                                    <div className="flex justify-between mb-1">
                                        <p className="text-sm text-gray-600">Delivery Date:</p>
                                        <p className="text-sm font-medium">{selectedOrder.deliveryDate} ({selectedOrder.deliveryDay})</p>
                                    </div>
                                    <div className="flex justify-between mb-1">
                                        <p className="text-sm text-gray-600">Status:</p>
                                        <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusColor(selectedOrder.status)}`}>
                                            {selectedOrder.status}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="text-sm text-gray-600">Total Amount:</p>
                                        <p className="text-sm font-medium">{selectedOrder.amount}</p>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-md">
                                    <h3 className="text-sm font-medium text-gray-500 mb-2">Creator Information</h3>
                                    <div className="flex justify-between mb-1">
                                        <p className="text-sm text-gray-600">Created By:</p>
                                        <p className="text-sm font-medium">{selectedOrder.creator.entity}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="text-sm text-gray-600">Name:</p>
                                        <p className="text-sm font-medium">{selectedOrder.creator.name}</p>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-xs text-gray-500">Created on: {selectedOrder.date}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div>
                                <h3 className="text-md font-medium mb-3">Order Items</h3>
                                <div className="bg-white border rounded-md overflow-hidden">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Product
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Quantity
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Unit Price
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Total
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {selectedOrder.items.map((item) => (
                                                <tr key={item.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {item.product}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {item.quantity}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {item.price}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                                                        {item.total}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tfoot className="bg-gray-50">
                                            <tr>
                                                <td colSpan="3" className="px-6 py-4 text-sm font-medium text-gray-900 text-right">
                                                    Total Amount:
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                                                    {selectedOrder.amount}
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>

                            {/* Order Status Timeline */}
                            <div>
                                <h3 className="text-md font-medium mb-3">Order Timeline</h3>
                                <div className="relative">
                                    <div className="absolute left-5 top-0 h-full w-0.5 bg-gray-200"></div>

                                    <div className="relative flex items-start mb-6">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 z-10">
                                            <span className="text-xs font-medium">1</span>
                                        </div>
                                        <div className="ml-6">
                                            <h4 className="text-sm font-medium">Order Created</h4>
                                            <p className="text-xs text-gray-500 mt-1">
                                                Created by {selectedOrder.creator.entity} - {selectedOrder.creator.name} on {selectedOrder.date}
                                            </p>
                                        </div>
                                    </div>

                                    <div className={`relative flex items-start mb-6 ${selectedOrder.status === 'CREATED' ? 'opacity-50' : ''}`}>
                                        <div className={`flex items-center justify-center w-10 h-10 rounded-full z-10 ${selectedOrder.status !== 'CREATED' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
                                            }`}>
                                            <span className="text-xs font-medium">2</span>
                                        </div>
                                        <div className="ml-6">
                                            <h4 className="text-sm font-medium">Order Confirmed</h4>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {selectedOrder.status !== 'CREATED' ? 'Confirmed by Admin on ' + selectedOrder.date : 'Pending confirmation'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className={`relative flex items-start mb-6 ${['CREATED', 'CONFIRMED'].includes(selectedOrder.status) ? 'opacity-50' : ''}`}>
                                        <div className={`flex items-center justify-center w-10 h-10 rounded-full z-10 ${!['CREATED', 'CONFIRMED'].includes(selectedOrder.status) ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-400'
                                            }`}>
                                            <span className="text-xs font-medium">3</span>
                                        </div>
                                        <div className="ml-6">
                                            <h4 className="text-sm font-medium">Pending Delivery</h4>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {!['CREATED', 'CONFIRMED'].includes(selectedOrder.status)
                                                    ? 'Order is ready for delivery on ' + selectedOrder.deliveryDate
                                                    : 'Waiting for processing'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className={`relative flex items-start ${selectedOrder.status !== 'DELIVERED' ? 'opacity-50' : ''}`}>
                                        <div className={`flex items-center justify-center w-10 h-10 rounded-full z-10 ${selectedOrder.status === 'DELIVERED' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                                            }`}>
                                            <span className="text-xs font-medium">4</span>
                                        </div>
                                        <div className="ml-6">
                                            <h4 className="text-sm font-medium">Order Delivered</h4>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {selectedOrder.status === 'DELIVERED'
                                                    ? 'Delivered on ' + selectedOrder.deliveryDate
                                                    : 'Waiting for delivery'}
                                            </p>
                                        </div>
                                    </div>
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
                            <button className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                                Print Invoice
                            </button>
                            {selectedOrder.status !== 'DELIVERED' && (
                                <button className="px-4 py-2 bg-[#3d5291] border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-[#2d3e6d]">
                                    Update Status
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Orders;