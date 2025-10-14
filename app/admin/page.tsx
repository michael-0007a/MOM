'use client';

import { useState } from 'react';
import { LogIn, LogOut, Menu as MenuIcon, Image, Users, Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('menu');

  // Mock data
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Classic Vanilla', category: 'Classic', price: '$5.99' },
    { id: 2, name: 'Strawberry Dream', category: 'Fruity', price: '$6.49' },
    { id: 3, name: 'Chocolate Heaven', category: 'Chocolate', price: '$6.99' },
  ]);

  const [galleryImages, setGalleryImages] = useState([
    { id: 1, title: 'Classic Collection', type: 'milkshake' },
    { id: 2, title: 'Happy Customers', type: 'customer' },
    { id: 3, title: 'Berry Delights', type: 'milkshake' },
  ]);

  const [franchiseRequests, setFranchiseRequests] = useState([
    { id: 1, name: 'John Smith', email: 'john@example.com', city: 'Boston', status: 'Pending' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', city: 'Chicago', status: 'Approved' },
    { id: 3, name: 'Mike Wilson', email: 'mike@example.com', city: 'Austin', status: 'Pending' },
  ]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple authentication (in production, use proper authentication)
    if (loginData.username === 'admin' && loginData.password === 'admin123') {
      setIsLoggedIn(true);
      setLoginData({ username: '', password: '' });
    } else {
      alert('Invalid credentials! Use username: admin, password: admin123');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab('menu');
  };

  const handleDelete = (type: string, id: number) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      if (type === 'menu') {
        setMenuItems(menuItems.filter(item => item.id !== id));
      } else if (type === 'gallery') {
        setGalleryImages(galleryImages.filter(img => img.id !== id));
      } else if (type === 'franchise') {
        setFranchiseRequests(franchiseRequests.filter(req => req.id !== id));
      }
    }
  };

  // Login Page
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <LogIn className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-blue-800 mb-2">Admin Login</h1>
            <p className="text-gray-600">Access the admin dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={loginData.username}
                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-800 focus:outline-none transition-colors"
                placeholder="Enter username"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-800 focus:outline-none transition-colors"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-800"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-800 text-white py-4 rounded-full text-lg font-semibold hover:bg-blue-900 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Login
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-xl">
            <p className="text-sm text-gray-600 text-center">
              <strong>Demo credentials:</strong><br />
              Username: admin<br />
              Password: admin123
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-blue-800">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'menu', label: 'Menu Items', icon: MenuIcon },
              { id: 'gallery', label: 'Gallery', icon: Image },
              { id: 'franchise', label: 'Franchise Requests', icon: Users },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-800 text-blue-800'
                      : 'border-transparent text-gray-600 hover:text-blue-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-semibold">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Menu Items Tab */}
        {activeTab === 'menu' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Menu Items</h2>
              <button className="flex items-center space-x-2 bg-blue-800 text-white px-4 py-2 rounded-full hover:bg-blue-900 transition-colors">
                <Plus className="w-4 h-4" />
                <span>Add New Item</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-800">ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-800">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-800">Category</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-800">Price</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-800">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {menuItems.map((item) => (
                    <tr key={item.id} className="border-t border-gray-100 hover:bg-blue-50/50 transition-colors">
                      <td className="px-6 py-4 text-gray-700">{item.id}</td>
                      <td className="px-6 py-4 font-medium text-gray-800">{item.name}</td>
                      <td className="px-6 py-4 text-gray-700">{item.category}</td>
                      <td className="px-6 py-4 text-gray-700">{item.price}</td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete('menu', item.id)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Gallery Tab */}
        {activeTab === 'gallery' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Gallery Images</h2>
              <button className="flex items-center space-x-2 bg-blue-800 text-white px-4 py-2 rounded-full hover:bg-blue-900 transition-colors">
                <Plus className="w-4 h-4" />
                <span>Upload Image</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-800">ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-800">Title</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-800">Type</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-800">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {galleryImages.map((image) => (
                    <tr key={image.id} className="border-t border-gray-100 hover:bg-blue-50/50 transition-colors">
                      <td className="px-6 py-4 text-gray-700">{image.id}</td>
                      <td className="px-6 py-4 font-medium text-gray-800">{image.title}</td>
                      <td className="px-6 py-4 text-gray-700 capitalize">{image.type}</td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete('gallery', image.id)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Franchise Requests Tab */}
        {activeTab === 'franchise' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Franchise Requests</h2>
            </div>

            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-800">ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-800">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-800">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-800">City</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-800">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-800">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {franchiseRequests.map((request) => (
                    <tr key={request.id} className="border-t border-gray-100 hover:bg-blue-50/50 transition-colors">
                      <td className="px-6 py-4 text-gray-700">{request.id}</td>
                      <td className="px-6 py-4 font-medium text-gray-800">{request.name}</td>
                      <td className="px-6 py-4 text-gray-700">{request.email}</td>
                      <td className="px-6 py-4 text-gray-700">{request.city}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          request.status === 'Approved' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {request.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete('franchise', request.id)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

