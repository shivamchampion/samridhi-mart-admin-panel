// src/pages/Dashboard.jsx
import { useState } from 'react';
import {
    ShoppingBag, Package, Users, TrendingUp,
    ArrowUpRight, ArrowDownRight, Calendar,
    BarChart, Map
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    // Mock data - would be fetched from API in real implementation
    const [timeRange, setTimeRange] = useState('weekly');

    const stats = [
        {
            title: 'Total Orders',
            value: '512',
            change: '+12%',
            isPositive: true,
            icon: <ShoppingBag />,
            color: 'bg-blue-500'
        },
        {
            title: 'Products',
            value: '128',
            change: '+8%',
            isPositive: true,
            icon: <Package />,
            color: 'bg-green-500'
        },
        {
            title: 'Retailers',
            value: '432',
            change: '+15%',
            isPositive: true,
            icon: <Users />,
            color: 'bg-purple-500'
        },
        {
            title: 'Categories',
            value: '5',
            change: '+1',
            isPositive: true,
            icon: <Tag />,
            color: 'bg-purple-500'
        },
        {
            title: 'Brands',
            value: '5',
            change: '+2',
            isPositive: true,
            icon: <Briefcase />,
            color: 'bg-pink-500'
        },
        {
            title: 'Total Revenue',
            value: '₹1,24,500',
            change: '+9%',
            isPositive: true,
            icon: <TrendingUp />,
            color: 'bg-orange-500'
        }
    ];

    const recentOrders = [
        { id: 'ORD-001', retailer: 'Shop 1', date: '2023-03-08', status: 'DELIVERED', amount: '₹2,500' },
        { id: 'ORD-002', retailer: 'Shop 2', date: '2023-03-07', status: 'PENDING', amount: '₹1,850' },
        { id: 'ORD-003', retailer: 'Shop 3', date: '2023-03-07', status: 'CONFIRMED', amount: '₹3,200' },
        { id: 'ORD-004', retailer: 'Shop 4', date: '2023-03-06', status: 'DELIVERED', amount: '₹1,400' },
        { id: 'ORD-005', retailer: 'Shop 5', date: '2023-03-06', status: 'CREATED', amount: '₹2,100' },
    ];

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
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                <div className="mt-4 md:mt-0 flex items-center space-x-3">
                    <button
                        className={`px-4 py-2 text-sm rounded-md ${timeRange === 'daily' ? 'bg-[#3d5291] text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                        onClick={() => setTimeRange('daily')}
                    >
                        Daily
                    </button>
                    <button
                        className={`px-4 py-2 text-sm rounded-md ${timeRange === 'weekly' ? 'bg-[#3d5291] text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                        onClick={() => setTimeRange('weekly')}
                    >
                        Weekly
                    </button>
                    <button
                        className={`px-4 py-2 text-sm rounded-md ${timeRange === 'monthly' ? 'bg-[#3d5291] text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                        onClick={() => setTimeRange('monthly')}
                    >
                        Monthly
                    </button>
                    <button
                        className={`px-4 py-2 text-sm rounded-md ${timeRange === 'yearly' ? 'bg-[#3d5291] text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                        onClick={() => setTimeRange('yearly')}
                    >
                        Yearly
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">{stat.title}</p>
                                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                                <div className="flex items-center mt-2">
                                    {stat.isPositive ? (
                                        <ArrowUpRight size={16} className="text-green-500" />
                                    ) : (
                                        <ArrowDownRight size={16} className="text-red-500" />
                                    )}
                                    <span className={`text-sm ml-1 ${stat.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                                        {stat.change} from previous period
                                    </span>
                                </div>
                            </div>
                            <div className={`${stat.color} p-3 rounded-full text-white`}>
                                {stat.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts and Recent Orders */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Sales Chart */}
                <div className="bg-white p-6 rounded-lg shadow-sm border lg:col-span-2">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold">Sales Overview</h2>
                        <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-[#3d5291] mr-1"></div>
                            <span className="text-xs text-gray-500 mr-4">This Period</span>
                            <div className="w-3 h-3 rounded-full bg-gray-300 mr-1"></div>
                            <span className="text-xs text-gray-500">Previous Period</span>
                        </div>
                    </div>
                    <div className="h-64 flex items-center justify-center">
                        <div className="flex items-center">
                            <BarChart size={40} className="text-gray-300 mr-2" />
                            <p className="text-gray-500">Sales chart visualization will be implemented here</p>
                        </div>
                    </div>
                </div>

                {/* Top Selling Products */}
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold">Top Selling Products</h2>
                        <Link to="/products" className="text-[#3d5291] text-sm hover:underline">
                            View All
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {[
                            { name: 'Product A', category: 'Category 1', sold: 145 },
                            { name: 'Product B', category: 'Category 2', sold: 132 },
                            { name: 'Product C', category: 'Category 1', sold: 121 },
                            { name: 'Product D', category: 'Category 3', sold: 98 },
                        ].map((product, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 rounded bg-gray-200 flex items-center justify-center mr-3">
                                        <Package size={16} className="text-gray-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">{product.name}</p>
                                        <p className="text-xs text-gray-500">{product.category}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">{product.sold} units</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-lg font-semibold">Recent Orders</h2>
                    <Link to="/orders" className="text-[#3d5291] text-sm hover:underline">
                        View All Orders
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Retailer</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {recentOrders.map((order, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm font-medium text-[#3d5291]">{order.id}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm text-gray-700">{order.retailer}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm text-gray-500">{order.date}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm font-medium">{order.amount}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <button className="text-[#3d5291] hover:underline text-sm">View</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Distribution Map */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Zone Distribution</h2>
                    <Link to="/zones" className="text-[#3d5291] text-sm hover:underline">
                        Manage Zones
                    </Link>
          // Continuing from the previous code
                </div>
                <div className="h-64 flex items-center justify-center">
                    <div className="flex flex-col items-center">
                        <Map size={40} className="text-gray-300 mb-2" />
                        <p className="text-gray-500">Zone distribution map will be implemented here</p>
                        <div className="grid grid-cols-2 gap-4 mt-4 w-full max-w-md">
                            {[
                                { name: 'North Zone', beats: 7, retailers: 84, color: 'bg-blue-500' },
                                { name: 'South Zone', beats: 7, retailers: 56, color: 'bg-green-500' },
                                { name: 'East Zone', beats: 7, retailers: 63, color: 'bg-yellow-500' },
                                { name: 'West Zone', beats: 7, retailers: 72, color: 'bg-purple-500' },
                            ].map((zone, index) => (
                                <div key={index} className="flex items-center">
                                    <div className={`w-3 h-3 rounded-full ${zone.color} mr-2`}></div>
                                    <div>
                                        <p className="text-sm font-medium">{zone.name}</p>
                                        <p className="text-xs text-gray-500">{zone.retailers} retailers</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Today's Beat Schedule */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-lg font-semibold">Today's Beat Schedule</h2>
                    <Link to="/beats" className="text-[#3d5291] text-sm hover:underline">
                        View All Beats
                    </Link>
                </div>
                <div className="p-6">
                    <div className="flex items-center mb-4">
                        <Calendar className="text-[#3d5291] mr-2" size={20} />
                        <h3 className="text-md font-medium">Wednesday - Order Collection Day</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                            { name: 'Beat 1 - Larkui', salesman: 'John Doe', retailers: 12, status: 'In Progress' },
                            { name: 'Beat 2 - Central', salesman: 'Jane Smith', retailers: 8, status: 'Pending' },
                            { name: 'Beat 3 - Market', salesman: 'Robert Johnson', retailers: 15, status: 'Completed' },
                        ].map((beat, index) => (
                            <div key={index} className="border rounded-lg p-4">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-medium">{beat.name}</h4>
                                    <span className={`text-xs px-2 py-1 rounded-full ${beat.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                            beat.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                                                'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {beat.status}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 mt-1">Salesman: {beat.salesman}</p>
                                <p className="text-sm text-gray-500">Retailers: {beat.retailers}</p>
                                <div className="mt-3 flex justify-between items-center">
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full ${beat.status === 'Completed' ? 'bg-green-500' :
                                                    beat.status === 'In Progress' ? 'bg-blue-500' : 'bg-yellow-500'
                                                }`}
                                            style={{
                                                width: beat.status === 'Completed' ? '100%' :
                                                    beat.status === 'In Progress' ? '60%' : '0%'
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;