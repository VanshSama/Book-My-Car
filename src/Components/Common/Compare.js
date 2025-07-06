import React, { useState, useEffect } from 'react';
import { Search, X, Plus, Car, Bike, Shuffle } from 'lucide-react';
import Footer from './Footer';

const Compare = () => {
  const [selectedVehicles, setSelectedVehicles] = useState([null, null, null, null]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [vehicleType, setVehicleType] = useState('cars');
  const [activeSlot, setActiveSlot] = useState(null);
  const [mixedMode, setMixedMode] = useState(false);

  // Enhanced vehicle data with more colorful pricing and features
  const vehicleDatabase = {
    cars: [
      {
        id: 1,
        name: 'Toyota Camry 2024',
        brand: 'Toyota',
        type: 'car',
        image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=250&fit=crop',
        price: '$28,400',
        engine: '2.5L 4-Cylinder',
        horsepower: '203 HP',
        fuelType: 'Gasoline',
        transmission: 'CVT',
        fuelEconomy: '32 mpg combined',
        seating: '5 passengers',
        drivetrain: 'FWD',
        length: '4885 mm',
        width: '1840 mm',
        height: '1445 mm',
        weight: '1590 kg',
        topSpeed: '180 km/h',
        acceleration: '8.4 sec (0-100 km/h)',
        category: 'Sedan',
        color: 'from-blue-400 to-blue-600'
      },
      {
        id: 2,
        name: 'Honda Accord 2024',
        brand: 'Honda',
        type: 'car',
        image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=250&fit=crop',
        price: '$27,295',
        engine: '1.5L Turbo 4-Cylinder',
        horsepower: '192 HP',
        fuelType: 'Gasoline',
        transmission: 'CVT',
        fuelEconomy: '35 mpg combined',
        seating: '5 passengers',
        drivetrain: 'FWD',
        length: '4906 mm',
        width: '1862 mm',
        height: '1450 mm',
        weight: '1555 kg',
        topSpeed: '190 km/h',
        acceleration: '7.8 sec (0-100 km/h)',
        category: 'Sedan',
        color: 'from-green-400 to-green-600'
      },
      {
        id: 3,
        name: 'BMW 3 Series 2024',
        brand: 'BMW',
        type: 'car',
        image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=250&fit=crop',
        price: '$36,350',
        engine: '2.0L Turbo 4-Cylinder',
        horsepower: '255 HP',
        fuelType: 'Gasoline',
        transmission: '8-Speed Automatic',
        fuelEconomy: '30 mpg combined',
        seating: '5 passengers',
        drivetrain: 'RWD',
        length: '4709 mm',
        width: '1827 mm',
        height: '1442 mm',
        weight: '1570 kg',
        topSpeed: '250 km/h',
        acceleration: '5.8 sec (0-100 km/h)',
        category: 'Luxury Sedan',
        color: 'from-purple-400 to-purple-600'
      },
      {
        id: 4,
        name: 'Tesla Model 3 2024',
        brand: 'Tesla',
        type: 'car',
        image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=250&fit=crop',
        price: '$38,990',
        engine: 'Electric Motor',
        horsepower: '283 HP',
        fuelType: 'Electric',
        transmission: 'Single-Speed',
        fuelEconomy: '132 MPGe combined',
        seating: '5 passengers',
        drivetrain: 'RWD',
        length: '4694 mm',
        width: '1849 mm',
        height: '1443 mm',
        weight: '1611 kg',
        topSpeed: '225 km/h',
        acceleration: '5.3 sec (0-100 km/h)',
        category: 'Electric Sedan',
        color: 'from-red-400 to-pink-600'
      }
    ],
    bikes: [
      {
        id: 1,
        name: 'Yamaha R1 2024',
        brand: 'Yamaha',
        type: 'bike',
        image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=250&fit=crop',
        price: '$17,399',
        engine: '998cc Inline-4',
        horsepower: '200 HP',
        fuelType: 'Gasoline',
        transmission: '6-Speed',
        fuelEconomy: '34 mpg',
        seating: '2 passengers',
        drivetrain: 'Chain',
        length: '2055 mm',
        width: '690 mm',
        height: '1165 mm',
        weight: '201 kg',
        topSpeed: '299 km/h',
        acceleration: '2.9 sec (0-100 km/h)',
        category: 'Supersport',
        color: 'from-orange-400 to-red-600'
      },
      {
        id: 2,
        name: 'Honda CBR1000RR 2024',
        brand: 'Honda',
        type: 'bike',
        image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=250&fit=crop',
        price: '$16,499',
        engine: '999cc Inline-4',
        horsepower: '189 HP',
        fuelType: 'Gasoline',
        transmission: '6-Speed',
        fuelEconomy: '37 mpg',
        seating: '2 passengers',
        drivetrain: 'Chain',
        length: '2065 mm',
        width: '720 mm',
        height: '1125 mm',
        weight: '195 kg',
        topSpeed: '290 km/h',
        acceleration: '3.1 sec (0-100 km/h)',
        category: 'Supersport',
        color: 'from-blue-400 to-indigo-600'
      },
      {
        id: 3,
        name: 'Kawasaki Ninja ZX-10R 2024',
        brand: 'Kawasaki',
        type: 'bike',
        image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=250&fit=crop',
        price: '$16,399',
        engine: '998cc Inline-4',
        horsepower: '203 HP',
        fuelType: 'Gasoline',
        transmission: '6-Speed',
        fuelEconomy: '32 mpg',
        seating: '2 passengers',
        drivetrain: 'Chain',
        length: '2085 mm',
        width: '750 mm',
        height: '1185 mm',
        weight: '207 kg',
        topSpeed: '300 km/h',
        acceleration: '2.8 sec (0-100 km/h)',
        category: 'Supersport',
        color: 'from-green-400 to-teal-600'
      },
      {
        id: 4,
        name: 'Ducati Panigale V4 2024',
        brand: 'Ducati',
        type: 'bike',
        image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=250&fit=crop',
        price: '$22,995',
        engine: '1103cc V4',
        horsepower: '214 HP',
        fuelType: 'Gasoline',
        transmission: '6-Speed',
        fuelEconomy: '30 mpg',
        seating: '2 passengers',
        drivetrain: 'Chain',
        length: '2075 mm',
        width: '750 mm',
        height: '1165 mm',
        weight: '195 kg',
        topSpeed: '305 km/h',
        acceleration: '2.7 sec (0-100 km/h)',
        category: 'Supersport',
        color: 'from-red-500 to-red-700'
      }
    ]
  };

  const getAllVehicles = () => {
    return [...vehicleDatabase.cars, ...vehicleDatabase.bikes];
  };

  const getVehicleList = () => {
    if (mixedMode) {
      return getAllVehicles();
    }
    return vehicleDatabase[vehicleType];
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length > 0) {
      setIsSearching(true);
      const vehicleList = getVehicleList();
      const results = vehicleList.filter(vehicle => 
        vehicle.name.toLowerCase().includes(query.toLowerCase()) ||
        vehicle.brand.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
      setIsSearching(false);
    } else {
      setSearchResults(getVehicleList().slice(0, 6));
    }
  };

  const addVehicleToComparison = (vehicle, slotIndex) => {
    const newSelectedVehicles = [...selectedVehicles];
    newSelectedVehicles[slotIndex] = vehicle;
    setSelectedVehicles(newSelectedVehicles);
    setSearchQuery('');
    setSearchResults([]);
    setActiveSlot(null);
  };

  const removeVehicleFromComparison = (slotIndex) => {
    const newSelectedVehicles = [...selectedVehicles];
    newSelectedVehicles[slotIndex] = null;
    setSelectedVehicles(newSelectedVehicles);
  };

  const openSearchForSlot = (slotIndex) => {
    setActiveSlot(slotIndex);
    setSearchQuery('');
    setSearchResults([]);
  };

  const toggleMixedMode = () => {
    setMixedMode(!mixedMode);
    setSelectedVehicles([null, null, null, null]);
    setSearchResults([]);
    setSearchQuery('');
  };

  const specifications = [
    { key: 'price', label: 'Price', icon: '💰' },
    { key: 'category', label: 'Category', icon: '🏷️' },
    { key: 'engine', label: 'Engine', icon: '⚙️' },
    { key: 'horsepower', label: 'Horsepower', icon: '🔥' },
    { key: 'topSpeed', label: 'Top Speed', icon: '⚡' },
    { key: 'acceleration', label: '0-100 km/h', icon: '🚀' },
    { key: 'fuelType', label: 'Fuel Type', icon: '⛽' },
    { key: 'transmission', label: 'Transmission', icon: '🔧' },
    { key: 'fuelEconomy', label: 'Fuel Economy', icon: '🌱' },
    { key: 'seating', label: 'Seating', icon: '👥' },
    { key: 'drivetrain', label: 'Drivetrain', icon: '🔗' },
    { key: 'length', label: 'Length', icon: '📏' },
    { key: 'width', label: 'Width', icon: '↔️' },
    { key: 'height', label: 'Height', icon: '↕️' },
    { key: 'weight', label: 'Weight', icon: '⚖️' }
  ];

  return (
    <div className="min-h-screen text-richblack-900 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-2 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-6 mb-6 border border-white/20">
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Ultimate Vehicle Comparison
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Compare cars and bikes side by side with detailed specifications
            </p>
          </div>
          
          {/* Vehicle Type Toggle */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6">
            <button
              onClick={() => {
                setVehicleType('cars');
                setMixedMode(false);
                setSelectedVehicles([null, null, null, null]);
                setSearchResults([]);
              }}
              className={`flex items-center px-3 sm:px-4 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                vehicleType === 'cars' && !mixedMode
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' 
                  : 'bg-white/70 text-gray-700 hover:bg-white border border-gray-200'
              }`}
            >
              <Car className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <span className="text-sm sm:text-base">Cars</span>
            </button>
            <button
              onClick={() => {
                setVehicleType('bikes');
                setMixedMode(false);
                setSelectedVehicles([null, null, null, null]);
                setSearchResults([]);
              }}
              className={`flex items-center px-3 sm:px-4 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                vehicleType === 'bikes' && !mixedMode
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg' 
                  : 'bg-white/70 text-gray-700 hover:bg-white border border-gray-200'
              }`}
            >
              <Bike className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <span className="text-sm sm:text-base">Bikes</span>
            </button>
            <button
              onClick={toggleMixedMode}
              className={`flex items-center px-3 sm:px-4 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                mixedMode
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                  : 'bg-white/70 text-gray-700 hover:bg-white border border-gray-200'
              }`}
            >
              <Shuffle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <span className="text-sm sm:text-base">Mixed</span>
            </button>
          </div>

          {/* Search Bar */}
          {activeSlot !== null && (
            <div className="relative mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={`Search ${mixedMode ? 'vehicles' : vehicleType} to add...`}
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/90 backdrop-blur-sm transition-all duration-300"
                />
              </div>
              
              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="top-full left-0 right-0 bg-white/95 backdrop-blur-md border-2 border-gray-200 rounded-xl shadow-2xl mt-2 max-h-80">
                  {searchResults.map((vehicle) => (
                    <div
                      key={`${vehicle.type}-${vehicle.id}`}
                      onClick={() => addVehicleToComparison(vehicle, activeSlot)}
                      className="flex items-center p-3 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 cursor-pointer border-b border-gray-100 transition-all rounded-lg duration-300"
                    >
                      <img
                        src={vehicle.image}
                        alt={vehicle.name}
                        className="w-16 h-10 object-cover rounded-lg mr-3 shadow-md"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 flex items-center">
                          {vehicle.name}
                          <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                            vehicle.type === 'car' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {vehicle.type === 'car' ? '🚗' : '🏍️'} {vehicle.type}
                          </span>
                        </div>
                        <div className="text-sm text-purple-600 font-semibold">{vehicle.price}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Comparison Grid */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/20">
          {/* Vehicle Selection Row */}
          <div className="overflow-x-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 min-w-full">
              <div className="p-4 bg-gradient-to-r from-gray-100 to-gray-200 font-bold text-gray-800 text-center lg:text-left border-b lg:border-b-0 lg:border-r border-gray-300">
                <span className="text-lg">🔍 Compare by:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:col-span-4">
                {selectedVehicles.map((vehicle, index) => (
                  <div key={index} className="p-4 border-b sm:border-r border-gray-200 lg:border-b-0 last:border-r-0">
                    {vehicle ? (
                      <div className="relative group">
                        <button
                          onClick={() => removeVehicleFromComparison(index)}
                          className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full w-7 h-7 flex items-center justify-center hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-110 shadow-lg"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <div className={`bg-gradient-to-br ${vehicle.color} p-1 rounded-xl shadow-lg`}>
                          <img
                            src={vehicle.image}
                            alt={vehicle.name}
                            className="w-full h-24 sm:h-32 object-cover rounded-lg"
                          />
                        </div>
                        <div className="mt-3 text-center">
                          <div className="flex justify-center mb-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              vehicle.type === 'car' 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {vehicle.type === 'car' ? '🚗' : '🏍️'} {vehicle.category}
                            </span>
                          </div>
                          <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-2">{vehicle.name}</h3>
                          <p className="text-lg font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                            {vehicle.price}
                          </p>
                          <div className="space-y-2 mt-3">
                            <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 px-4 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg font-medium text-sm">
                              Buy Now →
                            </button>
                            <button className="w-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:from-gray-200 hover:to-gray-300 transition-all duration-300 transform hover:scale-105 font-medium text-sm">
                              + Compare
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={() => openSearchForSlot(index)}
                        className="h-48 sm:h-64 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-purple-400 hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 transition-all duration-300 transform hover:scale-105 group"
                      >
                        <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-3 rounded-full mb-3 group-hover:scale-110 transition-transform duration-300">
                          <Plus className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                        </div>
                        <span className="text-gray-600 font-medium text-sm sm:text-base">
                          Add a {mixedMode ? 'vehicle' : vehicleType.slice(0, -1)}
                        </span>
                        <span className="text-gray-400 text-xs mt-1">Click to search</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Specifications Comparison */}
          <div className="p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 text-center">
              🔧 Detailed Specifications
            </h2>
            
            {/* Desktop/Tablet Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-xl shadow-lg overflow-hidden">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-100 to-gray-200">
                    <th className="text-left p-4 font-bold text-gray-800 border-b border-gray-300">
                      Specifications
                    </th>
                    {selectedVehicles.map((vehicle, index) => (
                      <th key={index} className="text-center p-4 font-bold text-gray-800 border-b border-l border-gray-300">
                        {vehicle ? (
                          <div className="flex flex-col items-center">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium mb-1 ${
                              vehicle.type === 'car' 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {vehicle.type === 'car' ? '🚗' : '🏍️'}
                            </span>
                            <span className="text-sm">{vehicle.name}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400">Empty Slot</span>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {specifications.map((spec, specIndex) => (
                    <tr key={spec.key} className={`hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 ${
                      specIndex % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'
                    }`}>
                      <td className="p-4 font-semibold text-gray-800 border-b border-gray-200">
                        <div className="flex items-center">
                          <span className="mr-2 text-lg">{spec.icon}</span>
                          <span>{spec.label}</span>
                        </div>
                      </td>
                      {selectedVehicles.map((vehicle, index) => (
                        <td key={index} className="p-4 text-center border-b border-l border-gray-200">
                          {vehicle ? (
                            <span className={`inline-block px-3 py-1 rounded-lg text-sm font-medium ${
                              spec.key === 'price' ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800' :
                              spec.key === 'horsepower' ? 'bg-gradient-to-r from-red-100 to-orange-100 text-red-800' :
                              spec.key === 'topSpeed' ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800' :
                              'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800'
                            }`}>
                              {vehicle[spec.key] || '-'}
                            </span>
                          ) : (
                            <span className="text-gray-400 text-sm">-</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {selectedVehicles.filter(vehicle => vehicle !== null).map((vehicle, vehicleIndex) => (
                <div key={vehicleIndex} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                  <div className={`bg-gradient-to-r ${vehicle.color} p-4 text-white`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-lg">{vehicle.name}</h3>
                        <span className="text-sm opacity-90">{vehicle.brand}</span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        vehicle.type === 'car' 
                          ? 'bg-white/20 text-white' 
                          : 'bg-white/20 text-white'
                      }`}>
                        {vehicle.type === 'car' ? '🚗 Car' : '🏍️ Bike'}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    {specifications.map((spec) => (
                      <div key={spec.key} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                        <div className="flex items-center">
                          <span className="mr-2 text-lg">{spec.icon}</span>
                          <span className="font-medium text-gray-700">{spec.label}</span>
                        </div>
                        <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
                          spec.key === 'price' ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800' :
                          spec.key === 'horsepower' ? 'bg-gradient-to-r from-red-100 to-orange-100 text-red-800' :
                          spec.key === 'topSpeed' ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800' :
                          'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800'
                        }`}>
                          {vehicle[spec.key] || '-'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              
              {selectedVehicles.filter(vehicle => vehicle !== null).length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🚗🏍️</div>
                  <p className="text-gray-500 text-lg">Add vehicles to see detailed comparison</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Additional Controls */}
        <div className="mt-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-6 border border-white/20">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-4">
              <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-medium">
                🚀 Jump To ▶
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-medium">
                💰 Price List
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-medium">
                ⭐ Reviews
              </button>
            </div>
            <div className="text-sm text-gray-600 text-center sm:text-right bg-gradient-to-r from-gray-100 to-gray-200 px-4 py-2 rounded-xl">
              <span className="font-medium">📊 Compare up to 4 {mixedMode ? 'vehicles' : vehicleType} side by side</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            🌟 Find your perfect {mixedMode ? 'vehicle' : vehicleType.slice(0, -1)} with our comprehensive comparison tool
          </p>
        </div>
        
        <div className='text-richblack-900'>
        <Footer />
        </div>
      </div>
    </div>
  );
};

export default Compare;