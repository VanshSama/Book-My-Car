import React from 'react'
import { Star, Users, Fuel, Settings, Shield } from 'lucide-react'

const ProductCard = ({car}) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
      <div className="relative">
        <img 
          src={car.image} 
          alt={`${car.make} ${car.model}`}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
          <span className="text-sm font-semibold">{car.rating}</span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {car.make} {car.model}
        </h3>
        <p className="text-gray-600 mb-4">{car.year} • {car.type}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>{car.seats} Seats</span>
          </div>
          <div className="flex items-center space-x-2">
            <Fuel className="w-4 h-4" />
            <span>{car.fuel_type}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Settings className="w-4 h-4" />
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span>Insured</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-blue-600">₹{car.price_per_day}</span>
            <span className="text-gray-600">/day</span>
          </div>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
            Book Now
          </button>
        </div>
      </div>
    </div>
    )
}

export default ProductCard
