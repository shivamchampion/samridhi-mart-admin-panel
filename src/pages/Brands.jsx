// src/pages/Brands.jsx
import { useState } from 'react';
import { 
  Plus, Search, Edit, Trash2, Briefcase, 
  Package, ArrowUpDown, X 
} from 'lucide-react';

const Brands = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  
  // Mock data for brands
  const brands = [
    {
      id: 'BRD001',
      name: 'Brand A',
      productCount: 15,
      active: true,
      createdAt: '2023-01-10'
    },
    {
      id: 'BRD002',
      name: 'Brand B',
      productCount: 10,
      active: true,
      createdAt: '2023-01-12'
    },
    {
      id: 'BRD003',
      name: 'Brand C',
      productCount: 8,
      active: true,
      createdAt: '2023-01-15'
    },
    {
      id: 'BRD004',
      name: 'Brand D',
      productCount: 5,
      active: false,
      createdAt: '2023-01-18'
    },
    {
      id: 'BRD005',
      name: 'Brand E',
      productCount: 12,
      active: true,
      createdAt: '2023-01-20'
    },
  ];

  const handleAddNew = () => {
    setSelectedBrand(null);
    setIsAddModalOpen(true);
  };

  const handleEdit = (brand) => {
    setSelectedBrand(brand);
    setIsAddModalOpen(true);
  };

  const handleDelete = (brandId) => {
    // Implement delete functionality
    console.log('Delete brand with ID:', brandId);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setSelectedBrand(null);
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
        <h1 className="text-2xl font-bold text-gray-800">Brands</h1>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={handleAddNew}
            className="px-4 py-2 flex items-center text-sm bg-[#3d5291] text-white rounded-md hover:bg-[#2d3e6d]"
          >
            <Plus size={16} className="mr-2" />
            Add Brand
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center bg-white px-3 py-2 rounded-lg border">
        <Search size={20} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search brands by name..."
          className="w-full ml-2 focus:outline-none"
        />
      </div>

      {/* Brands Table */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    Brand
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    Products
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
                    Created
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {brands.map((brand) => (
                <tr key={brand.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-[#3d5291] text-white rounded-full flex items-center justify-center">
                        <Briefcase size={18} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{brand.name}</div>
                        <div className="text-sm text-gray-500">{brand.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Package size={16} className="text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{brand.productCount} products</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      brand.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {brand.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-500">{brand.createdAt}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        onClick={() => handleEdit(brand)}
                        className="text-indigo-600 hover:text-indigo-900 p-1 rounded-full hover:bg-gray-100"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(brand.id)}
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
            Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">5</span> brands
          </div>
        </div>
      </div>
      
      {/* Add/Edit Brand Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                  {selectedBrand ? 'Edit Brand' : 'Add New Brand'}
                </h2>
                <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                  <X size={20} />
                </button>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Brand Name</label>
                  <input
                    type="text"
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    defaultValue={selectedBrand?.name || ''}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select 
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    defaultValue={selectedBrand?.active ? 'active' : 'inactive'}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
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
                  {selectedBrand ? 'Update Brand' : 'Add Brand'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Brands;