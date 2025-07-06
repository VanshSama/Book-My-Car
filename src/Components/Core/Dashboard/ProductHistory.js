import { useState, useEffect } from 'react';
import { Car, Calendar, MapPin, Clock, User, Star, Filter, Search, Download, Eye, Edit, Trash2, Plus, CheckCircle, XCircle, AlertCircle, RefreshCw, Loader } from 'lucide-react';

export default function ProductHistory() {
  const [activeTab, setActiveTab] = useState('bookings');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [bookingHistory, setBookingHistory] = useState([]);
  const [uploadedCars, setUploadedCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // User ID - This would come from authentication context in a real app
  const userId = localStorage.getItem('userId') || 'user123';

  useEffect(() => {
    setIsVisible(true);
    fetchData();
  }, []);

  // Fetch booking history from API
  const fetchBookingHistory = async () => {
    try {
      const response = await fetch(`/api/bookings/user/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setBookingHistory(data.bookings || []);
    } catch (err) {
      console.error('Error fetching booking history:', err);
      setError('Failed to fetch booking history');

      // Fallback to mock data for demo
      setBookingHistory([
        {
          id: 'BK001',
          carName: 'BMW X5 2023',
          carImage: '/api/placeholder/200/150',
          bookingDate: '2024-06-28',
          startDate: '2024-07-01',
          endDate: '2024-07-05',
          location: 'Mumbai, Maharashtra',
          price: 15000,
          status: 'completed',
          rating: 5,
          vendor: 'Premium Cars Mumbai',
          vehicleType: 'car'
        },
        {
          id: 'BK002',
          carName: 'Royal Enfield Classic 350',
          carImage: '/api/placeholder/200/150',
          bookingDate: '2024-06-25',
          startDate: '2024-06-30',
          endDate: '2024-07-02',
          location: 'Delhi, NCR',
          price: 2500,
          status: 'active',
          rating: 0,
          vendor: 'Delhi Bike Rentals',
          vehicleType: 'bike'
        }
      ]);
    }
  };

  // Fetch uploaded vehicles from API
  const fetchUploadedVehicles = async () => {
    try {
      const response = await fetch(`/api/vehicles/owner/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUploadedCars(data.vehicles || []);
    } catch (err) {
      console.error('Error fetching uploaded vehicles:', err);
      setError('Failed to fetch uploaded vehicles');
      // Fallback to mock data for demo
      setUploadedCars([
        {
          id: 'UP001',
          carName: 'Honda City 2022',
          carImage: '/api/placeholder/200/150',
          uploadDate: '2024-05-15',
          pricePerDay: 2500,
          location: 'Gurgaon, Haryana',
          status: 'active',
          totalBookings: 12,
          totalEarnings: 30000,
          rating: 4.5,
          category: 'Sedan',
          vehicleType: 'car'
        },
        {
          id: 'UP002',
          carName: 'Yamaha R15 V4',
          carImage: '/api/placeholder/200/150',
          uploadDate: '2024-04-20',
          pricePerDay: 800,
          location: 'Jaipur, Rajasthan',
          status: 'booked',
          totalBookings: 8,
          totalEarnings: 6400,
          rating: 4.8,
          category: 'Sports Bike',
          vehicleType: 'bike'
        }
      ]);
    }
  };

  // Fetch all data
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      await Promise.all([
        fetchBookingHistory(),
        fetchUploadedVehicles()
      ]);
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  // Refresh data
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  // Rate a booking
  const rateBooking = async (bookingId, rating) => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}/rate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ rating, userId })
      });

      if (!response.ok) {
        throw new Error('Failed to submit rating');
      }

      // Update local state
      setBookingHistory(prev => 
        prev.map(booking => 
          booking.id === bookingId 
            ? { ...booking, rating }
            : booking
        )
      );
    } catch (err) {
      console.error('Error rating booking:', err);
      alert('Failed to submit rating. Please try again.');
    }
  };

  // Delete uploaded vehicle
  const deleteVehicle = async (vehicleId) => {
    // if (!confirm('Are you sure you want to delete this vehicle?')) return;

    try {
      const response = await fetch(`/api/vehicles/${vehicleId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete vehicle');
      }

      // Update local state
      setUploadedCars(prev => prev.filter(car => car.id !== vehicleId));
    } catch (err) {
      console.error('Error deleting vehicle:', err);
      alert('Failed to delete vehicle. Please try again.');
    }
  };

  // Export data to CSV
  const exportData = () => {
    const dataToExport = activeTab === 'bookings' ? filteredBookings : filteredUploads;
    const csv = convertToCSV(dataToExport);
    downloadCSV(csv, `${activeTab}_history.csv`);
  };

  const convertToCSV = (data) => {
    if (data.length === 0) return '';
    
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(item => Object.values(item).join(','));
    return [headers, ...rows].join('\n');
  };

  const downloadCSV = (csv, filename) => {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-500 text-white';
      case 'active': case 'booked': return 'bg-blue-500 text-white';
      case 'cancelled': return 'bg-red-500 text-white';
      case 'maintenance': return 'bg-yellow-500 text-black';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'active': case 'booked': return <Clock className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      case 'maintenance': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getVehicleIcon = (vehicleType) => {
    return vehicleType === 'bike' ? '🏍️' : '🚗';
  };

  const filteredBookings = bookingHistory.filter(booking => {
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    const matchesSearch = booking.carName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const filteredUploads = uploadedCars.filter(car => {
    const matchesStatus = filterStatus === 'all' || car.status === filterStatus;
    const matchesSearch = car.carName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-16 h-16 text-blue-500 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Loading Your Data...</h2>
          <p className="text-gray-400">Please wait while we fetch your booking history</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Animated Background */}
      <div className="absolute -z-10 inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-56 h-56 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-green-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 bg-clip-text text-transparent mb-4">
            📊 My Dashboard
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Track your bookings, manage your uploaded vehicles, and monitor your activity
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="border-[#DC2626] bg-[#e30022] bg-opacity-10 border-2 rounded-2xl p-4 mb-6 text-center">
            <p className="text-red-300">{error}</p>
            <button 
              onClick={handleRefresh}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Tab Navigation */}
        <div className={`flex justify-center mb-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gray-800 rounded-2xl p-2 border-2 border-gray-700">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                activeTab === 'bookings'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              🚗 My Bookings ({bookingHistory.length})
            </button>
            <button
              onClick={() => setActiveTab('uploads')}
              className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                activeTab === 'uploads'
                  ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              📤 My Vehicles ({uploadedCars.length})
            </button>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className={`bg-gray-800 rounded-2xl p-6 mb-8 border-2 border-gray-700 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search vehicles or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-all duration-300"
              />
            </div>
            
            <div className="flex gap-4 items-center">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="pl-10 pr-8 py-3 bg-gray-700 border-2 border-gray-600 rounded-xl text-white focus:border-purple-500 focus:outline-none appearance-none cursor-pointer"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="booked">Booked</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
              
              <button 
                onClick={handleRefresh}
                disabled={refreshing}
                className="bg-purple-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-purple-600 transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50"
              >
                <RefreshCw className={`w-5 h-5 inline mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              
              <button 
                onClick={exportData}
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-xl font-bold hover:from-green-600 hover:to-blue-600 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <Download className="w-5 h-5 inline mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="grid gap-6">
              {filteredBookings.length === 0 ? (
                <div className="text-center py-12 bg-gray-800 rounded-2xl border-2 border-gray-700">
                  <Car className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-400 mb-2">No bookings found</h3>
                  <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                </div>
              ) : (
                filteredBookings.map((booking, index) => (
                  <div
                    key={booking.id}
                    className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 border-2 border-gray-700 hover:border-blue-500 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/30"
                  >
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="lg:w-1/4">
                        <div className="bg-gray-700 rounded-xl h-40 flex items-center justify-center text-6xl">
                          {getVehicleIcon(booking.vehicleType)}
                        </div>
                      </div>
                      
                      <div className="lg:w-3/4">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-white mb-2">
                              {getVehicleIcon(booking.vehicleType)} {booking.carName}
                            </h3>
                            <p className="text-gray-400 flex items-center">
                              <MapPin className="w-4 h-4 mr-2" />
                              {booking.location}
                            </p>
                          </div>
                          <div className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 ${getStatusColor(booking.status)}`}>
                            {getStatusIcon(booking.status)}
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </div>
                        </div>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                          <div className="bg-gray-700 rounded-lg p-3">
                            <p className="text-gray-400 text-sm">Booking ID</p>
                            <p className="text-white font-bold">{booking.id}</p>
                          </div>
                          <div className="bg-gray-700 rounded-lg p-3">
                            <p className="text-gray-400 text-sm">Start Date</p>
                            <p className="text-white font-bold">{new Date(booking.startDate).toLocaleDateString()}</p>
                          </div>
                          <div className="bg-gray-700 rounded-lg p-3">
                            <p className="text-gray-400 text-sm">End Date</p>
                            <p className="text-white font-bold">{new Date(booking.endDate).toLocaleDateString()}</p>
                          </div>
                          <div className="bg-gray-700 rounded-lg p-3">
                            <p className="text-gray-400 text-sm">Total Amount</p>
                            <p className="text-green-400 font-bold">₹{booking.price?.toLocaleString()}</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-4">
                            <p className="text-gray-400">Vendor: <span className="text-white font-semibold">{booking.vendor}</span></p>
                            {booking.rating > 0 && (
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className={`w-4 h-4 ${i < booking.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} />
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                              <Eye className="w-4 h-4 inline mr-1" />
                              View
                            </button>
                            {booking.status === 'completed' && booking.rating === 0 && (
                              <button 
                                onClick={() => {
                                  const rating = prompt('Rate this booking (1-5 stars):');
                                  if (rating && rating >= 1 && rating <= 5) {
                                    rateBooking(booking.id, parseInt(rating));
                                  }
                                }}
                                className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors font-bold"
                              >
                                <Star className="w-4 h-4 inline mr-1" />
                                Rate
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Uploads Tab */}
        {activeTab === 'uploads' && (
          <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-white">My Uploaded Vehicles</h2>
              <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-xl font-bold hover:from-green-600 hover:to-blue-600 transition-all duration-300 hover:scale-105 shadow-lg">
                <Plus className="w-5 h-5 inline mr-2" />
                Add New Vehicle
              </button>
            </div>
            
            <div className="grid gap-6">
              {filteredUploads.length === 0 ? (
                <div className="text-center py-12 bg-gray-800 rounded-2xl border-2 border-gray-700">
                  <Car className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-400 mb-2">No vehicles found</h3>
                  <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                </div>
              ) : (
                filteredUploads.map((car, index) => (
                  <div
                    key={car.id}
                    className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 border-2 border-gray-700 hover:border-green-500 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-green-500/30"
                  >
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="lg:w-1/4">
                        <div className="bg-gray-700 rounded-xl h-40 flex items-center justify-center text-6xl">
                          {getVehicleIcon(car.vehicleType)}
                        </div>
                      </div>
                      
                      <div className="lg:w-3/4">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-white mb-2">
                              {getVehicleIcon(car.vehicleType)} {car.carName}
                            </h3>
                            <p className="text-gray-400 flex items-center">
                              <MapPin className="w-4 h-4 mr-2" />
                              {car.location}
                            </p>
                            <p className="text-blue-400 font-semibold">{car.category}</p>
                          </div>
                          <div className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 ${getStatusColor(car.status)}`}>
                            {getStatusIcon(car.status)}
                            {car.status.charAt(0).toUpperCase() + car.status.slice(1)}
                          </div>
                        </div>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
                          <div className="bg-gray-700 rounded-lg p-3">
                            <p className="text-gray-400 text-sm">Price/Day</p>
                            <p className="text-green-400 font-bold">₹{car.pricePerDay}</p>
                          </div>
                          <div className="bg-gray-700 rounded-lg p-3">
                            <p className="text-gray-400 text-sm">Total Bookings</p>
                            <p className="text-blue-400 font-bold">{car.totalBookings}</p>
                          </div>
                          <div className="bg-gray-700 rounded-lg p-3">
                            <p className="text-gray-400 text-sm">Total Earnings</p>
                            <p className="text-green-400 font-bold">₹{car.totalEarnings?.toLocaleString()}</p>
                          </div>
                          <div className="bg-gray-700 rounded-lg p-3">
                            <p className="text-gray-400 text-sm">Rating</p>
                            <p className="text-yellow-400 font-bold flex items-center">
                              <Star className="w-4 h-4 mr-1 fill-current" />
                              {car.rating}
                            </p>
                          </div>
                          <div className="bg-gray-700 rounded-lg p-3">
                            <p className="text-gray-400 text-sm">Upload Date</p>
                            <p className="text-white font-bold">{new Date(car.uploadDate).toLocaleDateString()}</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-end gap-2">
                          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                            <Eye className="w-4 h-4 inline mr-1" />
                            View
                          </button>
                          <button className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors font-bold">
                            <Edit className="w-4 h-4 inline mr-1" />
                            Edit
                          </button>
                          <button 
                            onClick={() => deleteVehicle(car.id)}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4 inline mr-1" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}