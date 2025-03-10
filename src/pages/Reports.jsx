// src/pages/Reports.jsx
import { useState } from 'react';
import {
    BarChart, PieChart, TrendingUp, Calendar,
    Download, ArrowDown, Filter, ChevronDown,
    FileText, ShoppingBag, Package, Users, MapPin,
    X
} from 'lucide-react';

const Reports = () => {
    const [activeTab, setActiveTab] = useState('sales');
    const [dateRange, setDateRange] = useState({ from: '', to: '' });
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleExport = (format) => {
        // Implement export functionality
        console.log(`Exporting in ${format} format`);
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
                <div className="mt-4 sm:mt-0 flex flex-wrap gap-3">
                    <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="px-4 py-2 flex items-center text-sm bg-white border rounded-md hover:bg-gray-50"
                    >
                        <Filter size={16} className="mr-2" />
                        Filter
                    </button>
                    <div className="relative">
                        <button
                            className="px-4 py-2 flex items-center text-sm bg-white border rounded-md hover:bg-gray-50"
                        >
                            <Download size={16} className="mr-2" />
                            Export
                            <ChevronDown size={14} className="ml-2" />
                        </button>
                        {/* Export Dropdown Menu */}
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 hidden">
                            <button
                                onClick={() => handleExport('pdf')}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                PDF
                            </button>
                            <button
                                onClick={() => handleExport('excel')}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Excel
                            </button>
                            <button
                                onClick={() => handleExport('csv')}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                CSV
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter Section */}
            {isFilterOpen && (
                <div className="bg-white p-4 rounded-lg border">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-medium">Filter Reports</h2>
                        <button onClick={() => setIsFilterOpen(false)} className="text-gray-500 hover:text-gray-700">
                            <X size={18} />
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

            {/* Report Tabs */}
            <div className="bg-white rounded-lg border">
                <div className="border-b">
                    <nav className="flex -mb-px" aria-label="Tabs">
                        <button
                            onClick={() => handleTabChange('sales')}
                            className={`py-4 px-6 text-sm font-medium border-b-2 ${activeTab === 'sales'
                                    ? 'border-[#3d5291] text-[#3d5291]'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            <TrendingUp size={16} className="inline-block mr-2" />
                            Sales Reports
                        </button>
                        <button
                            onClick={() => handleTabChange('inventory')}
                            className={`py-4 px-6 text-sm font-medium border-b-2 ${activeTab === 'inventory'
                                    ? 'border-[#3d5291] text-[#3d5291]'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            <Package size={16} className="inline-block mr-2" />
                            Inventory Reports
                        </button>
                        <button
                            onClick={() => handleTabChange('distributor')}
                            className={`py-4 px-6 text-sm font-medium border-b-2 ${activeTab === 'distributor'
                                    ? 'border-[#3d5291] text-[#3d5291]'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            <Users size={16} className="inline-block mr-2" />
                            Distributor Reports
                        </button>
                        <button
                            onClick={() => handleTabChange('beat')}
                            className={`py-4 px-6 text-sm font-medium border-b-2 ${activeTab === 'beat'
                                    ? 'border-[#3d5291] text-[#3d5291]'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            <MapPin size={16} className="inline-block mr-2" />
                            Beat Reports
                        </button>
                    </nav>
                </div>

                {/* Report Content */}
                <div className="p-6">
                    {/* Sales Reports */}
                    {activeTab === 'sales' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-medium text-gray-900">Sales Reports</h2>

                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="bg-white p-4 rounded-lg border">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-sm text-gray-500">Total Orders</p>
                                            <p className="text-2xl font-bold text-gray-900">452</p>
                                        </div>
                                        <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                                            <ShoppingBag size={20} className="text-blue-600" />
                                        </div>
                                    </div>
                                    <div className="mt-2 flex items-center text-sm">
                                        <ArrowDown size={14} className="text-red-500 rotate-180" />
                                        <span className="text-green-500 ml-1">12% increase</span>
                                        <span className="text-gray-500 ml-1">from last month</span>
                                    </div>
                                </div>

                                <div className="bg-white p-4 rounded-lg border">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-sm text-gray-500">Revenue</p>
                                            <p className="text-2xl font-bold text-gray-900">₹5,24,800</p>
                                        </div>
                                        <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                                            <TrendingUp size={20} className="text-green-600" />
                                        </div>
                                    </div>
                                    <div className="mt-2 flex items-center text-sm">
                                        <ArrowDown size={14} className="text-red-500 rotate-180" />
                                        <span className="text-green-500 ml-1">18% increase</span>
                                        <span className="text-gray-500 ml-1">from last month</span>
                                    </div>
                                </div>

                                <div className="bg-white p-4 rounded-lg border">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-sm text-gray-500">Orders Per Day</p>
                                            <p className="text-2xl font-bold text-gray-900">15.1</p>
                                        </div>
                                        <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                                            <Calendar size={20} className="text-purple-600" />
                                        </div>
                                    </div>
                                    <div className="mt-2 flex items-center text-sm">
                                        <ArrowDown size={14} className="text-red-500 rotate-180" />
                                        <span className="text-green-500 ml-1">9% increase</span>
                                        <span className="text-gray-500 ml-1">from last month</span>
                                    </div>
                                </div>

                                <div className="bg-white p-4 rounded-lg border">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-sm text-gray-500">Average Order Value</p>
                                            <p className="text-2xl font-bold text-gray-900">₹1,160</p>
                                        </div>
                                        <div className="h-10 w-10 bg-orange-100 rounded-full flex items-center justify-center">
                                            <PieChart size={20} className="text-orange-600" />
                                        </div>
                                    </div>
                                    <div className="mt-2 flex items-center text-sm">
                                        <ArrowDown size={14} className="text-red-500 rotate-180" />
                                        <span className="text-green-500 ml-1">5% increase</span>
                                        <span className="text-gray-500 ml-1">from last month</span>
                                    </div>
                                </div>
                            </div>

                            {/* Charts */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white p-4 rounded-lg border">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Sales Trend</h3>
                                    <div className="h-64 flex items-center justify-center">
                                        <div className="flex items-center">
                                            <BarChart size={40} className="text-gray-300 mr-2" />
                                            <p className="text-gray-500">Sales trend visualization will be implemented here</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white p-4 rounded-lg border">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Sales by Product Category</h3>
                                    <div className="h-64 flex items-center justify-center">
                                        <div className="flex items-center">
                                            <PieChart size={40} className="text-gray-300 mr-2" />
                                            <p className="text-gray-500">Category distribution visualization will be implemented here</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Available Reports */}
                            <div className="bg-white p-4 rounded-lg border">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Sales Reports</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {[
                                        {
                                            title: 'Daily Sales Report',
                                            description: 'View sales data for each day with detailed breakdown.',
                                            icon: <FileText size={20} className="text-[#3d5291]" />
                                        },
                                        {
                                            title: 'Monthly Sales Summary',
                                            description: 'Monthly consolidated sales figures with comparison.',
                                            icon: <BarChart size={20} className="text-[#3d5291]" />
                                        },
                                        {
                                            title: 'Product Sales Analysis',
                                            description: 'Detailed analysis of sales by product and category.',
                                            icon: <Package size={20} className="text-[#3d5291]" />
                                        },
                                        {
                                            title: 'Zone Performance',
                                            description: 'Sales performance analysis by geographic zones.',
                                            icon: <MapPin size={20} className="text-[#3d5291]" />
                                        },
                                        {
                                            title: 'Retailer Order History',
                                            description: 'Historical order data for each retailer.',
                                            icon: <ShoppingBag size={20} className="text-[#3d5291]" />
                                        },
                                        {
                                            title: 'Revenue Forecasting',
                                            description: 'Projected sales based on historical data patterns.',
                                            icon: <TrendingUp size={20} className="text-[#3d5291]" />
                                        },
                                    ].map((report, index) => (
                                        <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                                            <div className="flex items-start">
                                                <div className="mt-1 mr-3">
                                                    {report.icon}
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-900">{report.title}</h4>
                                                    <p className="text-xs text-gray-500 mt-1">{report.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Inventory Reports */}
                    {activeTab === 'inventory' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-medium text-gray-900">Inventory Reports</h2>

                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="bg-white p-4 rounded-lg border">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-sm text-gray-500">Total Products</p>
                                            <p className="text-2xl font-bold text-gray-900">128</p>
                                        </div>
                                        <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                                            <Package size={20} className="text-blue-600" />
                                        </div>
                                    </div>
                                    <div className="mt-2 flex items-center text-sm">
                                        <ArrowDown size={14} className="text-red-500 rotate-180" />
                                        <span className="text-green-500 ml-1">8% increase</span>
                                        <span className="text-gray-500 ml-1">from last month</span>
                                    </div>
                                </div>

                                <div className="bg-white p-4 rounded-lg border">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-sm text-gray-500">Stock Value</p>
                                            <p className="text-2xl font-bold text-gray-900">₹12,45,600</p>
                                        </div>
                                        <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                                            <TrendingUp size={20} className="text-green-600" />
                                        </div>
                                    </div>
                                    <div className="mt-2 flex items-center text-sm">
                                        <ArrowDown size={14} className="text-red-500 rotate-180" />
                                        <span className="text-green-500 ml-1">15% increase</span>
                                        <span className="text-gray-500 ml-1">from last month</span>
                                    </div>
                                </div>

                                <div className="bg-white p-4 rounded-lg border">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-sm text-gray-500">Low Stock Items</p>
                                            <p className="text-2xl font-bold text-gray-900">12</p>
                                        </div>
                                        <div className="h-10 w-10 bg-red-100 rounded-full flex items-center justify-center">
                                            <Package size={20} className="text-red-600" />
                                        </div>
                                    </div>
                                    <div className="mt-2 flex items-center text-sm">
                                        <ArrowDown size={14} className="text-green-500 rotate-0" />
                                        <span className="text-red-500 ml-1">3 more</span>
                                        <span className="text-gray-500 ml-1">from last week</span>
                                    </div>
                                </div>

                                <div className="bg-white p-4 rounded-lg border">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-sm text-gray-500">Inventory Turnover</p>
                                            <p className="text-2xl font-bold text-gray-900">3.5x</p>
                                        </div>
                                        <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                                            <PieChart size={20} className="text-purple-600" />
                                        </div>
                                    </div>
                                    <div className="mt-2 flex items-center text-sm">
                                        <ArrowDown size={14} className="text-red-500 rotate-180" />
                                        <span className="text-green-500 ml-1">0.5x increase</span>
                                        <span className="text-gray-500 ml-1">from last quarter</span>
                                    </div>
                                </div>
                            </div>

                            {/* Stock Distribution Chart */}
                            <div className="bg-white p-4 rounded-lg border">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Stock Distribution by Category</h3>
                                <div className="h-64 flex items-center justify-center">
                                    <div className="flex items-center">
                                        <PieChart size={40} className="text-gray-300 mr-2" />
                                        <p className="text-gray-500">Stock distribution visualization will be implemented here</p>
                                    </div>
                                </div>
                            </div>

                            {/* Available Reports */}
                            <div className="bg-white p-4 rounded-lg border">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Inventory Reports</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {[
                                        {
                                            title: 'Current Stock Report',
                                            description: 'Current stock levels for all products.',
                                            icon: <Package size={20} className="text-[#3d5291]" />
                                        },
                                        {
                                            title: 'Stock Movement Analysis',
                                            description: 'Track how stock levels have changed over time.',
                                            icon: <TrendingUp size={20} className="text-[#3d5291]" />
                                        },
                                        {
                                            title: 'Low Stock Alert',
                                            description: 'Products that are running low and need reordering.',
                                            icon: <FileText size={20} className="text-[#3d5291]" />
                                        },
                                        {
                                            title: 'Distributor Stock Allocation',
                                            description: 'Stock allocated to each distributor.',
                                            icon: <Users size={20} className="text-[#3d5291]" />
                                        },
                                        {
                                            title: 'Purchase History',
                                            description: 'History of all stock purchases and bills.',
                                            icon: <ShoppingBag size={20} className="text-[#3d5291]" />
                                        },
                                        {
                                            title: 'Inventory Valuation',
                                            description: 'Total value of current inventory by category.',
                                            icon: <BarChart size={20} className="text-[#3d5291]" />
                                        },
                                    ].map((report, index) => (
                                        <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                                            <div className="flex items-start">
                                                <div className="mt-1 mr-3">
                                                    {report.icon}
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-900">{report.title}</h4>
                                                    <p className="text-xs text-gray-500 mt-1">{report.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Distributor Reports */}
                    {activeTab === 'distributor' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-medium text-gray-900">Distributor Reports</h2>

                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="bg-white p-4 rounded-lg border">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-sm text-gray-500">Total Distributors</p>
                                            <p className="text-2xl font-bold text-gray-900">4</p>
                                        </div>
                                        <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                                            <Users size={20} className="text-blue-600" />
                                        </div>
                                    </div>
                                    <div className="mt-2 flex items-center text-sm">
                                        <span className="text-gray-500">Across all zones</span>
                                    </div>
                                </div>

                                <div className="bg-white p-4 rounded-lg border">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-sm text-gray-500">Total Commission</p>
                                            <p className="text-2xl font-bold text-gray-900">₹72,800</p>
                                        </div>
                                        <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                                            <TrendingUp size={20} className="text-green-600" />
                                        </div>
                                    </div>
                                    <div className="mt-2 flex items-center text-sm">
                                        <ArrowDown size={14} className="text-red-500 rotate-180" />
                                        <span className="text-green-500 ml-1">12% increase</span>
                                        <span className="text-gray-500 ml-1">from last month</span>
                                    </div>
                                </div>

                                <div className="bg-white p-4 rounded-lg border">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-sm text-gray-500">Average Stock</p>
                                            <p className="text-2xl font-bold text-gray-900">89 units</p>
                                        </div>
                                        <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                                            <Package size={20} className="text-purple-600" />
                                        </div>
                                    </div>
                                    <div className="mt-2 flex items-center text-sm">
                                        <span className="text-gray-500">Per distributor</span>
                                    </div>
                                </div>

                                <div className="bg-white p-4 rounded-lg border">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-sm text-gray-500">Order Fulfillment</p>
                                            <p className="text-2xl font-bold text-gray-900">95%</p>
                                        </div>
                                        <div className="h-10 w-10 bg-orange-100 rounded-full flex items-center justify-center">
                                            <ShoppingBag size={20} className="text-orange-600" />
                                        </div>
                                    </div>
                                    <div className="mt-2 flex items-center text-sm">
                                        <ArrowDown size={14} className="text-red-500 rotate-180" />
                                        <span className="text-green-500 ml-1">3% increase</span>
                                        <span className="text-gray-500 ml-1">from last month</span>
                                    </div>
                                </div>
                            </div>

                            {/* Charts */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white p-4 rounded-lg border">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Distributor Performance Comparison</h3>
                                    <div className="h-64 flex items-center justify-center">
                                        <div className="flex items-center">
                                            <BarChart size={40} className="text-gray-300 mr-2" />
                                            <p className="text-gray-500">Distributor performance visualization will be implemented here</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white p-4 rounded-lg border">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Commission Distribution</h3>
                                    <div className="h-64 flex items-center justify-center">
                                        <div className="flex items-center">
                                            <PieChart size={40} className="text-gray-300 mr-2" />
                                            <p className="text-gray-500">Commission distribution visualization will be implemented here</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Available Reports */}
                            <div className="bg-white p-4 rounded-lg border">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Distributor Reports</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {[
                                        {
                                            title: 'Distributor Performance',
                                            description: 'Performance metrics for each distributor.',
                                            icon: <Users size={20} className="text-[#3d5291]" />
                                        },
                                        {
                                            title: 'Commission Report',
                                            description: 'Detailed breakdown of distributor commissions.',
                                            icon: <TrendingUp size={20} className="text-[#3d5291]" />
                                        },
                                        {
                                            title: 'Stock Allocation',
                                            description: 'Current stock allocation to each distributor.',
                                            icon: <Package size={20} className="text-[#3d5291]" />
                                        },
                                        {
                                            title: 'Order Fulfillment Rate',
                                            description: 'Order fulfillment metrics for distributors.',
                                            icon: <ShoppingBag size={20} className="text-[#3d5291]" />
                                        },
                                        {
                                            title: 'Salesman Performance',
                                            description: 'Performance of salesmen under each distributor.',
                                            icon: <Users size={20} className="text-[#3d5291]" />
                                        },
                                        {
                                            title: 'Distributor Coverage',
                                            description: 'Zone and beat coverage for each distributor.',
                                            icon: <MapPin size={20} className="text-[#3d5291]" />
                                        },
                                    ].map((report, index) => (
                                        <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                                            <div className="flex items-start">
                                                <div className="mt-1 mr-3">
                                                    {report.icon}
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-900">{report.title}</h4>
                                                    <p className="text-xs text-gray-500 mt-1">{report.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Beat Reports */}
                    {activeTab === 'beat' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-medium text-gray-900">Beat Reports</h2>

                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="bg-white p-4 rounded-lg border">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-sm text-gray-500">Total Beats</p>
                                            <p className="text-2xl font-bold text-gray-900">28</p>
                                        </div>
                                        <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                                            <MapPin size={20} className="text-blue-600" />
                                        </div>
                                    </div>
                                    <div className="mt-2 flex items-center text-sm">
                                        <span className="text-gray-500">Across all zones</span>
                                    </div>
                                </div>

                                <div className="bg-white p-4 rounded-lg border">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-sm text-gray-500">Total Retailers</p>
                                            <p className="text-2xl font-bold text-gray-900">78</p>
                                        </div>
                                        <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                                            <Store size={20} className="text-green-600" />
                                        </div>
                                    </div>
                                    <div className="mt-2 flex items-center text-sm">
                                        <ArrowDown size={14} className="text-red-500 rotate-180" />
                                        <span className="text-green-500 ml-1">8% increase</span>
                                        <span className="text-gray-500 ml-1">from last month</span>
                                    </div>
                                </div>

                                <div className="bg-white p-4 rounded-lg border">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-sm text-gray-500">Average Order Value</p>
                                            <p className="text-2xl font-bold text-gray-900">₹1,250</p>
                                        </div>
                                        <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                                            <ShoppingBag size={20} className="text-purple-600" />
                                        </div>
                                    </div>
                                    <div className="mt-2 flex items-center text-sm">
                                        <span className="text-gray-500">Per beat</span>
                                    </div>
                                </div>

                                <div className="bg-white p-4 rounded-lg border">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-sm text-gray-500">Weekly Orders</p>
                                            <p className="text-2xl font-bold text-gray-900">112</p>
                                        </div>
                                        <div className="h-10 w-10 bg-orange-100 rounded-full flex items-center justify-center">
                                            <Calendar size={20} className="text-orange-600" />
                                        </div>
                                    </div>
                                    <div className="mt-2 flex items-center text-sm">
                                        <ArrowDown size={14} className="text-red-500 rotate-180" />
                                        <span className="text-green-500 ml-1">5% increase</span>
                                        <span className="text-gray-500 ml-1">from last week</span>
                                    </div>
                                </div>
                            </div>

                            {/* Beat Performance Chart */}
                            <div className="bg-white p-4 rounded-lg border">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Beat Performance by Day</h3>
                                <div className="h-64 flex items-center justify-center">
                                    <div className="flex items-center">
                                        <BarChart size={40} className="text-gray-300 mr-2" />
                                        <p className="text-gray-500">Beat performance visualization will be implemented here</p>
                                    </div>
                                </div>
                            </div>

                            {/* Available Reports */}
                            <div className="bg-white p-4 rounded-lg border">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Beat Reports</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {[
                                        {
                                            title: 'Beat Performance',
                                            description: 'Performance metrics for each beat.',
                                            icon: <MapPin size={20} className="text-[#3d5291]" />
                                        },
                                        {
                                            title: 'Retailer Distribution',
                                            description: 'Distribution of retailers across beats.',
                                            icon: <Store size={20} className="text-[#3d5291]" />
                                        },
                                        {
                                            title: 'Daily Beat Schedule',
                                            description: 'Schedule of order and delivery days for each beat.',
                                            icon: <Calendar size={20} className="text-[#3d5291]" />
                                        },
                                        {
                                            title: 'Salesman Coverage',
                                            description: 'Beat coverage for each salesman.',
                                            icon: <Users size={20} className="text-[#3d5291]" />
                                        },
                                        {
                                            title: 'Beat Order History',
                                            description: 'Historical order data for each beat.',
                                            icon: <ShoppingBag size={20} className="text-[#3d5291]" />
                                        },
                                        {
                                            title: 'Beat Growth Analysis',
                                            description: 'Growth metrics for each beat over time.',
                                            icon: <TrendingUp size={20} className="text-[#3d5291]" />
                                        },
                                    ].map((report, index) => (
                                        <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                                            <div className="flex items-start">
                                                <div className="mt-1 mr-3">
                                                    {report.icon}
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-900">{report.title}</h4>
                                                    <p className="text-xs text-gray-500 mt-1">{report.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Reports;