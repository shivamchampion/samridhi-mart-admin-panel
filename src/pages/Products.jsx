// src/pages/Products.jsx
import { useState } from 'react';
import {
    Plus, Search, Filter, ArrowUpDown, Edit, Trash2,
    MoreVertical, ChevronLeft, ChevronRight, Download,
    Upload, Eye
} from 'lucide-react';

const Products = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Mock data for products
    const products = [
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
            conversion_factor_small_to_smallest: 12,
            stock: 25,
            active: true
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
            conversion_factor_small_to_smallest: 10,
            stock: 18,
            active: true
        },
        // ... other products
    ]

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setIsAddModalOpen(true);
    };

    const handleDelete = (productId) => {
        // Implement delete functionality
        console.log('Delete product with ID:', productId);
    };

    const handleAddNew = () => {
        setSelectedProduct(null);
        setIsAddModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsAddModalOpen(false);
        setSelectedProduct(null);
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
                <h1 className="text-2xl font-bold text-gray-800">Products</h1>
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
                    <button className="px-4 py-2 flex items-center text-sm bg-white border rounded-md hover:bg-gray-50">
                        <Upload size={16} className="mr-2" />
                        Import
                    </button>
                    <button
                        onClick={handleAddNew}
                        className="px-4 py-2 flex items-center text-sm bg-[#3d5291] text-white rounded-md hover:bg-[#2d3e6d]"
                    >
                        <Plus size={16} className="mr-2" />
                        Add Product
                    </button>
                </div>
            </div>

            {/* Filter Section */}
            {isFilterOpen && (
                <div className="bg-white p-4 rounded-lg border">
                    <h2 className="text-lg font-medium mb-4">Filter Products</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                                <option value="">All Categories</option>
                                <option>Category 1</option>
                                <option>Category 2</option>
                                <option>Category 3</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                            <select className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                                <option value="">All Brands</option>
                                <option>Brand A</option>
                                <option>Brand B</option>
                                <option>Brand C</option>
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
                    <div className="mt-4 flex justify-end">
                        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md mr-2">
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
                    placeholder="Search products by name, ID, brand..."
                    className="w-full ml-2 focus:outline-none"
                />
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-lg border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <div className="flex items-center">
                                        Product
                                        <ArrowUpDown size={14} className="ml-1" />
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <div className="flex items-center">
                                        Category/Brand
                                        <ArrowUpDown size={14} className="ml-1" />
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <div className="flex items-center">
                                        Units
                                        <ArrowUpDown size={14} className="ml-1" />
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <div className="flex items-center">
                                        Pricing
                                        <ArrowUpDown size={14} className="ml-1" />
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <div className="flex items-center">
                                        Stock
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
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 flex-shrink-0 bg-gray-200 rounded-md flex items-center justify-center">
                                                <span className="text-gray-500 text-xs font-medium">{product.id.slice(-2)}</span>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                                <div className="text-sm text-gray-500">{product.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{product.category}</div>
                                        <div className="text-sm text-gray-500">{product.brand}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">Big: {product.big_unit}</div>
                                        <div className="text-sm text-gray-500">Small: {product.small_unit} (1:{product.conversion_factor})</div>
                                        <div className="text-sm text-gray-500">Smallest: {product.smallest_unit} (1:{product.conversion_factor_small_to_smallest})</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">MRP: ₹{product.mrp}</div>
                                        <div className="text-sm text-gray-500">
                                            SP: ₹{product.sp_big_unit}/{product.big_unit}, ₹{product.sp_small_unit}/{product.small_unit}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{product.stock} {product.big_unit}</div>
                                        <div className="text-sm text-gray-500">{product.stock * product.conversion_factor} {product.small_unit}</div>
                                        <div className="text-sm text-gray-500">{product.stock * product.conversion_factor * product.conversion_factor_small_to_smallest} {product.smallest_unit}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${product.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }`}>
                                            {product.active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex items-center justify-end space-x-2">
                                            <button
                                                onClick={() => handleEdit(product)}
                                                className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-gray-100"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-gray-100"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                            <button className="text-gray-600 hover:text-gray-900 p-1 rounded-full hover:bg-gray-100">
                                                <Eye size={16} />
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
                        Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">42</span> products
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

            {/* Add/Edit Product Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b">
                            <h2 className="text-xl font-semibold">
                                {selectedProduct ? 'Edit Product' : 'Add New Product'}
                            </h2>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="p-6 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Basic Information */}
                                    <div className="col-span-2">
                                        <h3 className="text-lg font-medium mb-4">Basic Information</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                                                <input
                                                    type="text"
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                    defaultValue={selectedProduct?.name || ''}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Product ID</label>
                                                <input
                                                    type="text"
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                    defaultValue={selectedProduct?.id || ''}
                                                    disabled={!!selectedProduct}
                                                />
                                                {!selectedProduct && (
                                                    <p className="mt-1 text-xs text-gray-500">Leave empty for auto-generation</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Category and Brand */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                        <select
                                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            defaultValue={selectedProduct?.category || ''}
                                            required
                                        >
                                            <option value="">Select Category</option>
                                            <option>Category 1</option>
                                            <option>Category 2</option>
                                            <option>Category 3</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                                        <select
                                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            defaultValue={selectedProduct?.brand || ''}
                                            required
                                        >
                                            <option value="">Select Brand</option>
                                            <option>Brand A</option>
                                            <option>Brand B</option>
                                            <option>Brand C</option>
                                        </select>
                                    </div>

                                    {/* Units */}
                                    <div className="col-span-2">
                                        <h3 className="text-lg font-medium mb-4">Unit Information</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Big Unit</label>
                                                <input
                                                    type="text"
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                    defaultValue={selectedProduct?.big_unit || ''}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Small Unit</label>
                                                <input
                                                    type="text"
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                    defaultValue={selectedProduct?.small_unit || ''}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Smallest Unit</label>
                                                <input
                                                    type="text"
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                    defaultValue={selectedProduct?.smallest_unit || ''}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Big to Small Conversion</label>
                                                <input
                                                    type="number"
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                    defaultValue={selectedProduct?.conversion_factor || ''}
                                                    required
                                                />
                                                <p className="mt-1 text-xs text-gray-500">How many small units make 1 big unit</p>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Small to Smallest Conversion</label>
                                                <input
                                                    type="number"
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                    defaultValue={selectedProduct?.conversion_factor_small_to_smallest || ''}
                                                    required
                                                />
                                                <p className="mt-1 text-xs text-gray-500">How many smallest units make 1 small unit</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Pricing */}
                                    <div className="col-span-2">
                                        <h3 className="text-lg font-medium mb-4">Pricing Information</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">MRP</label>
                                                <div className="relative">
                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₹</span>
                                                    <input
                                                        type="number"
                                                        className="w-full pl-7 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                        defaultValue={selectedProduct?.mrp || ''}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Selling Price (Big Unit)</label>
                                                <div className="relative">
                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₹</span>
                                                    <input
                                                        type="number"
                                                        className="w-full pl-7 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                        defaultValue={selectedProduct?.sp_big_unit || ''}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Selling Price (Small Unit)</label>
                                                <div className="relative">
                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₹</span>
                                                    <input
                                                        type="number"
                                                        className="w-full pl-7 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                        defaultValue={selectedProduct?.sp_small_unit || ''}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* GST Information */}
                                    <div className="col-span-2">
                                        <h3 className="text-lg font-medium mb-4">GST Information</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">CGST (%)</label>
                                                <input
                                                    type="number"
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                    defaultValue={selectedProduct?.cgst || ''}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">SGST (%)</label>
                                                <input
                                                    type="number"
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                    defaultValue={selectedProduct?.sgst || ''}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">IGST (%)</label>
                                                <input
                                                    type="number"
                                                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                    defaultValue={selectedProduct?.igst || ''}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Commission */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Commission (%)</label>
                                        <input
                                            type="number"
                                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            defaultValue={selectedProduct?.commission || ''}
                                        />
                                        <p className="mt-1 text-xs text-gray-500">Fixed percentage for distributor commission</p>
                                    </div>

                                    {/* Status */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                        <select
                                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            defaultValue={selectedProduct?.active ? 'active' : 'inactive'}
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
                                    {selectedProduct ? 'Update Product' : 'Add Product'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Products;