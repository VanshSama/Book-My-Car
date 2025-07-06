import React, { useState, useEffect } from 'react';
import { Car, MapPin, Clock, Shield, Star, Phone, Mail, Menu, X, Calendar, Users, Fuel, Settings } from 'lucide-react';
import ProductCard from '../Components/Core/Home/ProductCard';
import Footer from '../Components/Common/Footer';

const CarRentalApp = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const mockCars = [
          {
            id: 1,
            make: 'BMW',
            model: '3 Series',
            year: 2023,
            type: 'Sedan',
            fuel_type: 'Petrol',
            transmission: 'Automatic',
            seats: 5,
            price_per_day: 2500,
            rating: 4.8,
            image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500&h=300&fit=crop',
            features: ['GPS Navigation', 'Bluetooth', 'AC', 'Power Steering']
          },
          {
            id: 2,
            make: 'Mercedes',
            model: 'C-Class',
            year: 2023,
            type: 'Sedan',
            fuel_type: 'Petrol',
            transmission: 'Automatic',
            seats: 5,
            price_per_day: 3000,
            rating: 4.9,
            image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=500&h=300&fit=crop',
            features: ['Premium Sound', 'Leather Seats', 'Sunroof', 'AC']
          },
          {
            id: 3,
            make: 'Audi',
            model: 'A4',
            year: 2023,
            type: 'Sedan',
            fuel_type: 'Petrol',
            transmission: 'Automatic',
            seats: 5,
            price_per_day: 2800,
            rating: 4.7,
            image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=500&h=300&fit=crop',
            features: ['Virtual Cockpit', 'Quattro AWD', 'LED Lights', 'AC']
          },
          {
            id: 4,
            make: 'Toyota',
            model: 'Fortuner',
            year: 2023,
            type: 'SUV',
            fuel_type: 'Diesel',
            transmission: 'Automatic',
            seats: 7,
            price_per_day: 3500,
            rating: 4.6,
            image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=500&h=300&fit=crop',
            features: ['4WD', '7 Seater', 'Hill Assist', 'AC']
          },
          {
            id: 5,
            make: 'Maruti',
            model: 'Swift',
            year: 2023,
            type: 'Hatchback',
            fuel_type: 'Petrol',
            transmission: 'Manual',
            seats: 5,
            price_per_day: 1200,
            rating: 4.3,
            image: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=500&h=300&fit=crop',
            features: ['Fuel Efficient', 'Compact', 'Easy Parking', 'AC']
          },
          {
            id: 6,
            make: 'Honda',
            model: 'City',
            year: 2023,
            type: 'Sedan',
            fuel_type: 'Petrol',
            transmission: 'CVT',
            seats: 5,
            price_per_day: 1800,
            rating: 4.5,
            image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=500&h=300&fit=crop',
            features: ['Spacious', 'Fuel Efficient', 'Safety Features', 'AC']
          }
        ];
        
        setTimeout(() => {
          setCars(mockCars);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching cars:', error);
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const categories = ['all', 'sedan', 'suv', 'hatchback'];
  
  const filteredCars = selectedCategory === 'all' 
    ? cars 
    : cars.filter(car => car.type.toLowerCase() === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 text-richblack-900">
      {/* Hero Section */}
      <section id="home" className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 flex items-center justify-center relative overflow-hidden pt-16">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-ping"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            Premium Car Rental
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              Made Simple
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto">
            Experience luxury and comfort with our premium fleet of vehicles. Book instantly, drive confidently.
          </p>
          
          {/* Booking Form */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-8 max-w-4xl mx-auto shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Select location"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input 
                    type="date"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Return Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input 
                    type="date"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Time</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input 
                    type="time"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
            
            <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-lg text-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
              Search Available Cars
            </button>
          </div>
        </div>
      </section>

      {/* Cars Section */}
      <section id="cars" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Premium Fleet
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Choose from our extensive collection of well-maintained, premium vehicles
            </p>
          </div>
          
          {/* Category Filter */}
          <div className="flex justify-center mb-12">
            <div className="flex space-x-4 bg-white rounded-full p-2 shadow-lg">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          {/* Cars Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCars.map((car) => (
                <ProductCard key={car.id} car={car} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-xl text-gray-600">
              We provide exceptional service with every booking
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Fully Insured</h3>
              <p className="text-gray-600">
                All our vehicles are fully insured with comprehensive coverage for your peace of mind.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-blue-50 hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">24/7 Support</h3>
              <p className="text-gray-600">
                Round-the-clock customer support to assist you whenever you need help.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Premium Quality</h3>
              <p className="text-gray-600">
                Well-maintained, clean, and modern vehicles for a premium driving experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className='text-white'>
        <Footer />
      </section>
    </div>
  );
};

export default CarRentalApp;