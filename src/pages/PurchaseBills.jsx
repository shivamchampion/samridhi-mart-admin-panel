// src/pages/PurchaseBills.jsx
import { useState } from 'react';
import {
    Plus, Search, Filter, ArrowUpDown, Edit, Trash2,
    Calendar, FileText, X, ChevronLeft, ChevronRight,
    Download, Package, ArrowRight
} from 'lucide-react';

const PurchaseBills = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedBill, setSelectedBill] = useState(null);
    const [dateRange, setDateRange] = useState({ from: '', to: '' });
    const [productSearchQuery, setProductSearchQuery] = useState('');
    const [selectedProducts, setSelectedProducts] = useState([]);

    // Mock data for purchase bills
    const purchaseBills = [
        {
            id: 'PB001',
            billNumber: 'INV/2023/001',
            supplier: 'Supplier A',
            purchaseDate: '2023-03-05',
            totalItems: 5,
            totalAmount: '₹25,000',
            purchasedProducts: [
                { id: 'PROD001', name: 'Product 1', brand: 'Brand A', category: 'Category 1', quantityBigUnit: 10, bigUnit: 'Box', price: '₹450', total: '₹4,500' },
                { id: 'PROD002', name: 'Product 2', brand: 'Brand B', category: 'Category 2', quantityBigUnit: 15, bigUnit: 'Box', price: '₹750', total: '₹11,250' },
                { id: 'PROD003', name: 'Product 3', brand: 'Brand A', category: 'Category 1', quantityBigUnit: 5, bigUnit: 'Case', price: '₹1,150', total: '₹5,750' },
                { id: 'PROD004', name: 'Product 4', brand: 'Brand C', category: 'Category 3', quantityBigUnit: 8, bigUnit: 'Bag', price: '₹230', total: '₹1,840' },
                { id: 'PROD005', name: 'Product 5', brand: 'Brand B', category: 'Category 2', quantityBigUnit: 5, bigUnit: 'Carton', price: '₹330', total: '₹1,650' }
            ]
        },
        {
            id: 'PB002',
            billNumber: 'INV/2023/002',
            supplier: 'Supplier B',
            purchaseDate: '2023-03-08',
            totalItems: 3,
            totalAmount: '₹18,500',
            purchasedProducts: [
                { id: 'PROD001', name: 'Product 1', brand: 'Brand A', category: 'Category 1', quantityBigUnit: 8, bigUnit: 'Box', price: '₹450', total: '₹3,600' },
                { id: 'PROD002', name: 'Product 2', brand: 'Brand B', category: 'Category 2', quantityBigUnit: 12, bigUnit: 'Box', price: '₹750', total: '₹9,000' },
                { id: 'PROD005', name: 'Product 5', brand: 'Brand B', category: 'Category 2', quantityBigUnit: 18, bigUnit: 'Carton', price: '₹330', total: '₹5,940' }
            ]
        },
        {
            id: 'PB003',
            billNumber: 'INV/2023/003',
            supplier: 'Supplier C',
            purchaseDate: '2023-03-10',
            totalItems: 2,
            totalAmount: '₹12,300',
            purchasedProducts: [
                { id: 'PROD003', name: 'Product 3', brand: 'Brand A', category: 'Category 1', quantityBigUnit: 7, bigUnit: 'Case', price: '₹1,150', total: '₹8,050' },
                { id: 'PROD004', name: 'Product 4', brand: 'Brand C', category: 'Category 3', quantityBigUnit: 18, bigUnit: 'Bag', price: '₹230', total: '₹4,140' }
            ]
        },
        {
            id: 'PB004',
            billNumber: 'INV/2023/004',
            supplier: 'Supplier A',
            purchaseDate: '2023-03-12',
            totalItems: 1,
            totalAmount: '₹7,500',
            purchasedProducts: [
                { id: 'PROD002', name: 'Product 2', brand: 'Brand B', category: 'Category 2', quantityBigUnit: 10, bigUnit: 'Box', price: '₹750', total: '₹7,500' }
            ]
        },
        {
            id: 'PB005',
            billNumber: 'INV/2023/005',
            supplier: 'Supplier D',
            purchaseDate: '2023-03-15',
            totalItems: 4,
            totalAmount: '₹21,650',
            purchasedProducts: [
                { id: 'PROD001', name: 'Product 1', brand: 'Brand A', category: 'Category 1', quantityBigUnit: 12, bigUnit: 'Box', price: '₹450', total: '₹5,400' },
                { id: 'PROD003', name: 'Product 3', brand: 'Brand A', category: 'Category 1', quantityBigUnit: 8, bigUnit: 'Case', price: '₹1,150', total: '₹9,200' },
                { id: 'PROD004', name: 'Product 4', brand: 'Brand C', category: 'Category 3', quantityBigUnit: 12, bigUnit: 'Bag', price: '₹230', total: '₹2,760' },
                { id: 'PROD005', name: 'Product 5', brand: 'Brand B', category: 'Category 2', quantityBigUnit: 13, bigUnit: 'Carton', price: '₹330', total: '₹4,290' }
            ]
        }
    ];

    // Mock data for products that can be added to a purchase bill
    const availableProducts = [
        {
            id: 'PROD001',
            name: 'Product 1',
            brand: 'Brand A',
            category: 'Category 1',
            big_unit: 'Box',
            small_unit: 'Mala',
            smallest_unit: 'Piece',
            mrp: 500,
            sp_big_unit: 450,
            sp_small_unit: 45,
            conversion_factor: 10,
            conversion_factor_small_to_smallest: 12
        },
        {
            id: 'PROD002',
            name: 'Product 2',
            brand: 'Brand B',
            category: 'Category 2',
            big_unit: 'Box',
            small_unit: 'Mala',
            smallest_unit: 'Piece',
            mrp: 800,
            sp_big_unit: 750,
            sp_small_unit: 75,
            conversion_factor: 10,
            conversion_factor_small_to_smallest: 10
        },
        {
            id: 'PROD003',
            name: 'Product 3',
            brand: 'Brand A',
            category: 'Category 1',
            big_unit: 'Case',
            small_unit: 'Piece',
            smallest_unit: 'Unit',
            mrp: 1200,
            sp_big_unit: 1150,
            sp_small_unit: 115,
            conversion_factor: 10,
            conversion_factor_small_to_smallest: 1
        },
        {
            id: 'PROD004',
            name: 'Product 4',
            brand: 'Brand C',
            category: 'Category 3',
            big_unit: 'Bag',
            small_unit: 'Kg',
            smallest_unit: 'Gram',
            mrp: 250,
            sp_big_unit: 230,
            sp_small_unit: 23,
            conversion_factor: 10,
            conversion_factor_small_to_smallest: 1000
        },
        {
            id: 'PROD005',
            name: 'Product 5',
            brand: 'Brand B',
            category: 'Category 2',
            big_unit: 'Carton',
            small_unit: 'Pack',
            smallest_unit: 'Piece',
            mrp: 350,
            sp_big_unit: 330,
            sp_small_unit: 33,
            conversion_factor: 10,
            conversion_factor_small_to_smallest: 24
        }
    ];

    const handleAddNew = () => {
        setSelectedBill(null);
        setSelectedProducts([]);
        setIsAddModalOpen(true);
    };

    const handleView = (bill) => {
        setSelectedBill(bill);
        setIsViewModalOpen(true);
    };

    const handleDelete = (billId) => {
        // Implement delete functionality
        console.log('Delete purchase bill with ID:', billId);
    };

    const handleCloseModal = () => {
        setIsAddModalOpen(false);
        setIsViewModalOpen(false);
        setSelectedBill(null);
        setSelectedProducts([]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement form submission logic
        console.log('Form submitted');
        setIsAddModalOpen(false);
    };

    const handleAddProduct = (product) => {
        // Check if product is already in the list
        if (!selectedProducts.some(p => p.id === product.id)) {
            setSelectedProducts([...selectedProducts, {
                ...product,
                quantityBigUnit: 1,
                quantitySmallUnit: 0,
                quantitySmallestUnit: 0,
                totalPrice: product.sp_big_unit
            }]);
        }
        setProductSearchQuery('');
    };

    const handleRemoveProduct = (productId) => {
        setSelectedProducts(selectedProducts.filter(p => p.id !== productId));
    };

    const handleQuantityChange = (productId, field, value) => {
        setSelectedProducts(selectedProducts.map(product => {
            if (product.id === productId) {
                let updatedProduct = { ...product, [field]: value };
                // Calculate total price based on big unit price
                updatedProduct.totalPrice = updatedProduct.quantityBigUnit * product.sp_big_unit;
                return updatedProduct;
            }
            return product;
        }));
    };

    // Filter products based on search query
    const filteredProducts = availableProducts.filter(product =>
        product.name.toLowerCase().includes(productSearchQuery.toLowerCase()) ||
        product.id.toLowerCase().includes(productSearchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(productSearchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(productSearchQuery.toLowerCase())
    );

    // Calculate total amount of selected products
    const totalAmount = selectedProducts.reduce((sum, product) => sum + (product.quantityBigUnit * product.sp_big_unit), 0);

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-2xl font-bold text-gray-800">Purchase Bills</h1>
                <div className="mt-4 sm:mt-0 flex flex-wrap gap-3">
                    <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="px-4 py-2 flex items-center text-sm bg-white border rounded-md hover:bg-gray-50"
                    >
                        <Filter size={16} className="mr-2" />
                        Filter
                    </button>
                    <button className="px-4 py-2 flex items-center text-sm bg-white border rounded-md hover:bg-gray-50">
                        <Download size={16} className="mr-2" />
                        Export
                    </button>
                    <button
                        onClick={handleAddNew}
                        className="px-4 py-2 flex items-center text-sm bg-[#3d5291] text-white rounded-md hover:bg-[#2d3e6d]"
                    >
                        <Plus size={16} className="mr-2" />
                        Add Purchase Bill
                    </button>
                </div>
            </div>

            {/* Filter Section */}
            {isFilterOpen && (
                <div className="bg-white p-4 rounded-lg border">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-medium">Filter Purchase Bills</h2>
                        <button onClick={() => setIsFilterOpen(false)} className="text-gray-500 hover:text-gray-700">
                            <X size={18} />
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
                            <select className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                                <option value="">All Suppliers</option>
                                <option>Supplier A</option>
                                <option>Supplier B</option>
                                <option>Supplier C</option>
                                <option>Supplier D</option>
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
                    placeholder="Search purchase bills by ID, supplier..."
                    className="w-full ml-2 focus:outline-none"
                />
            </div>

            {/* Purchase Bills Table */}
            <div className="bg-white rounded-lg border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <div className="flex items-center">
                                        Bill Number
                                        <ArrowUpDown size={14} className="ml-1" />
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <div className="flex items-center">
                                        Supplier
                                        <ArrowUpDown size={14} className="ml-1" />
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <div className="flex items-center">
                                        Date
                                        <ArrowUpDown size={14} className="ml-1" />
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <div className="flex items-center">
                                        Items
                                        <ArrowUpDown size={14} className="ml-1" />
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <div className="flex items-center">
                                        Amount
                                        <ArrowUpDown size={14} className="ml-1" />
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {purchaseBills.map((bill) => (
                                <tr key={bill.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 bg-[#3d5291] text-white rounded-full flex items-center justify-center">
                                                <FileText size={18} />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{bill.billNumber}</div>
                                                <div className="text-sm text-gray-500">{bill.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm text-gray-900">{bill.supplier}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm text-gray-900">{bill.purchaseDate}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm text-gray-900">{bill.totalItems} items</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm font-medium">{bill.totalAmount}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex items-center justify-end space-x-2">
                                            <button
                                                onClick={() => handleView(bill)}
                                                className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-gray-100"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(bill.id)}
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
                        Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">5</span> bills
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

            {/* Add Purchase Bill Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-semibold">
                                    Add New Purchase Bill
                                </h2>
                                <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                                    <X size={20} />
                                </button>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Bill Number</label>
                                        <input
                                            type="text"
                                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
                                        <input
                                            type="text"
                                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Date</label>
                                        <div className="relative">
                                            <input
                                                type="date"
                                                className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                required
                                            />
                                            <Calendar size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <h3 className="text-lg font-medium mb-4">Add Products</h3>

                                    {/* Product Search */}
                                    <div className="relative mb-6">
                                        <div className="flex items-center bg-white px-3 py-2 rounded-lg border">
                                            <Search size={20} className="text-gray-400" />
                                            <input
                                                type="text"
                                                placeholder="Search products by name, ID, brand, category..."
                                                className="w-full ml-2 focus:outline-none"
                                                value={productSearchQuery}
                                                onChange={(e) => setProductSearchQuery(e.target.value)}
                                            />
                                        </div>

                                        {/* Search Results Dropdown */}
                                        {productSearchQuery && (
                                            <div className="absolute left-0 right-0 mt-1 bg-white border rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
                                                {filteredProducts.length > 0 ? (
                                                    filteredProducts.map((product) => (
                                                        <div
                                                            key={product.id}
                                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                                                            onClick={() => handleAddProduct(product)}
                                                        >
                                                            <div>
                                                                <div className="text-sm font-medium">{product.name}</div>
                                                                <div className="text-xs text-gray-500">{product.brand} | {product.category}</div>
                                                            </div>
                                                            <button
                                                                type="button"
                                                                className="text-[#3d5291] hover:bg-indigo-50 p-1 rounded"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleAddProduct(product);
                                                                }}
                                                            >
                                                                <Plus size={16} />
                                                            </button>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="px-4 py-3 text-sm text-gray-700">
                                                        No products found. Try a different search term.
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    {/* Selected Products Table */}
                                    <div className="border rounded-lg overflow-hidden">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Product
                                                    </th>
                                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Quantity (Big Unit)
                                                    </th>
                                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Unit Price
                                                    </th>
                                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Total
                                                    </th>
                                                    <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {selectedProducts.length > 0 ? (
                                                    selectedProducts.map((product) => (
                                                        <tr key={product.id}>
                                                            <td className="px-4 py-4 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <div className="h-8 w-8 bg-gray-200 rounded flex items-center justify-center">
                                                                        <Package size={16} className="text-gray-600" />
                                                                    </div>
                                                                    <div className="ml-3">
                                                                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                                                        <div className="text-xs text-gray-500">{product.brand} | {product.category}</div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-4 py-4 whitespace-nowrap">
                                                                <div className="flex items-center space-x-2">
                                                                    <input
                                                                        type="number"
                                                                        min="1"
                                                                        value={product.quantityBigUnit}
                                                                        onChange={(e) => handleQuantityChange(product.id, 'quantityBigUnit', parseInt(e.target.value) || 0)}
                                                                        className="w-20 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                                    />
                                                                    <span className="text-sm text-gray-500">{product.big_unit}</span>
                                                                </div>
                                                            </td>
                                                            <td className="px-4 py-4 whitespace-nowrap">
                                                                <span className="text-sm">₹{product.sp_big_unit}</span>
                                                            </td>
                                                            <td className="px-4 py-4 whitespace-nowrap">
                                                                <span className="text-sm font-medium">₹{product.quantityBigUnit * product.sp_big_unit}</span>
                                                            </td>
                                                            <td className="px-4 py-4 whitespace-nowrap text-right">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleRemoveProduct(product.id)}
                                                                    className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-gray-100"
                                                                >
                                                                    <Trash2 size={16} />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="5" className="px-4 py-6 text-center text-sm text-gray-500">
                                                            No products added yet. Search and add products above.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                            {selectedProducts.length > 0 && (
                                                <tfoot className="bg-gray-50">
                                                    <tr>
                                                        <td colSpan="3" className="px-4 py-3 text-right text-sm font-medium">
                                                            Total Amount:
                                                        </td>
                                                        <td colSpan="2" className="px-4 py-3 text-left text-sm font-bold">
                                                            ₹{totalAmount}
                                                        </td>
                                                    </tr>
                                                </tfoot>
                                            )}
                                        </table>
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
                                    disabled={selectedProducts.length === 0}
                                >
                                    Save Purchase Bill
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* View Purchase Bill Modal */}
            {isViewModalOpen && selectedBill && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-semibold">
                                    Purchase Bill Details - {selectedBill.billNumber}
                                </h2>
                                <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Bill Information */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-gray-50 p-4 rounded-md">
                                    <h3 className="text-sm font-medium text-gray-500 mb-2">Bill Details</h3>
                                    <p className="text-sm font-medium">{selectedBill.billNumber}</p>
                                    <p className="text-sm text-gray-600">{selectedBill.id}</p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-md">
                                    <h3 className="text-sm font-medium text-gray-500 mb-2">Supplier Information</h3>
                                    <p className="text-sm font-medium">{selectedBill.supplier}</p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-md">
                                    <h3 className="text-sm font-medium text-gray-500 mb-2">Purchase Information</h3>
                                    <div className="flex justify-between mb-1">
                                        <p className="text-sm text-gray-600">Date:</p>
                                        <p className="text-sm font-medium">{selectedBill.purchaseDate}</p>
                                    </div>
                                    <div className="flex justify-between mb-1">
                                        <p className="text-sm text-gray-600">Items:</p>
                                        <p className="text-sm font-medium">{selectedBill.totalItems}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="text-sm text-gray-600">Total Amount:</p>
                                        <p className="text-sm font-medium">{selectedBill.totalAmount}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Purchased Products */}
                            <div>
                                <h3 className="text-md font-medium mb-3">Purchased Products</h3>
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
                                            {selectedBill.purchasedProducts.map((product) => (
                                                <tr key={product.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="h-8 w-8 bg-gray-200 rounded flex items-center justify-center">
                                                                <Package size={16} className="text-gray-600" />
                                                            </div>
                                                            <div className="ml-3">
                                                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                                                <div className="text-xs text-gray-500">{product.brand} | {product.category}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="text-sm text-gray-900">{product.quantityBigUnit} {product.bigUnit}</span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="text-sm text-gray-900">{product.price}</span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                                        <span className="text-sm font-medium">{product.total}</span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tfoot className="bg-gray-50">
                                            <tr>
                                                <td colSpan="3" className="px-6 py-3 text-right text-sm font-medium">
                                                    Total Amount:
                                                </td>
                                                <td className="px-6 py-3 text-right text-sm font-bold">
                                                    {selectedBill.totalAmount}
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>

                            {/* Notes */}
                            <div className="bg-gray-50 p-4 rounded-md">
                                <h3 className="text-sm font-medium text-gray-700 mb-2">Notes</h3>
                                <p className="text-sm text-gray-600">
                                    This purchase bill has been recorded in the system. The stock levels for the respective products have been updated automatically.
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
                            <button className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                                Print Bill
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PurchaseBills;