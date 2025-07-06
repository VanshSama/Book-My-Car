import { useState, useEffect } from 'react';
import { Car, Search, Users, Shield, Clock, Star, MapPin, CreditCard } from 'lucide-react';
import Footer from '../Components/Common/Footer';

export default function AboutSection() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Car className="w-8 h-8" />,
      title: "Easy Car Rental",
      description: "Browse and rent from thousands of vehicles in your area"
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "Smart Comparison",
      description: "Compare prices, features, and reviews across multiple providers"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Instant Booking",
      description: "Book your perfect car in just a few clicks, anytime"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Safe",
      description: "Protected transactions with verified car owners"
    }
  ];

  const stats = [
    { number: "50K+", label: "Happy Customers" },
    { number: "5K+", label: "Cars Available" },
    { number: "100+", label: "Cities Covered" },
    { number: "4.8★", label: "Average Rating" }
  ];

  return (
    <div className="min-h-screen bg-[#2E0854  ] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header Section */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-8 shadow-2xl">
            <Car className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-6">
            About BookMyCar
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Revolutionizing the car rental experience with cutting-edge technology, 
            unmatched convenience, and a commitment to making every journey extraordinary.
          </p>
        </div>

        {/* Mission Statement */}
        <div className={`bg-white/5 backdrop-blur-lg rounded-3xl p-8 md:p-12 mb-20 border border-white/10 shadow-2xl transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Our Mission
            </h2>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-4xl mx-auto">
              We believe that finding and booking the perfect car should be as simple as a few taps on your phone. 
              BookMyCar connects travelers with an extensive network of trusted car rental providers, 
              offering transparent pricing, real-time availability, and seamless booking experiences that put you in the driver's seat of your journey.
            </p>
          </div>
        </div>

        {/* Interactive Features Section */}
        <div className={`mb-20 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Why Choose BookMyCar?
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 cursor-pointer transition-all duration-500 hover:scale-105 hover:bg-white/10 ${
                  activeFeature === index ? 'ring-2 ring-purple-400 bg-white/10 scale-105' : ''
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center mb-4 transition-all duration-300 ${
                  activeFeature === index ? 'scale-110 shadow-lg shadow-purple-500/50' : 'group-hover:scale-110'
                }`}>
                  {feature.icon}
                </div>
                <h4 className="text-xl font-semibold mb-3 text-white group-hover:text-purple-200 transition-colors">
                  {feature.title}
                </h4>
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics Section */}
        <div className={`bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-lg rounded-3xl p-8 md:p-12 mb-20 border border-white/10 shadow-2xl transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-sm md:text-base font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Benefits */}
        <div className={`grid md:grid-cols-2 gap-8 mb-20 transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                <MapPin className="w-6 h-6" />
              </div>
              <h4 className="text-2xl font-bold text-white">Nationwide Coverage</h4>
            </div>
            <p className="text-gray-300 leading-relaxed">
              From bustling city centers to remote destinations, BookMyCar has you covered with an extensive network 
              spanning over 100 cities across the country. Whether you're planning a business trip or a weekend getaway, 
              find the perfect vehicle wherever your journey takes you.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                <CreditCard className="w-6 h-6" />
              </div>
              <h4 className="text-2xl font-bold text-white">Transparent Pricing</h4>
            </div>
            <p className="text-gray-300 leading-relaxed">
              No hidden fees, no surprise charges. Our intelligent comparison engine shows you real-time pricing 
              from multiple providers, helping you make informed decisions and get the best value for your money. 
              What you see is what you pay.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className={`text-center bg-[#8a2be2] rounded-lg transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 md:p-12 shadow-2xl">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Ready to Start Your Journey?
            </h3>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust BookMyCar for their transportation needs.
            </p>
            <button className="bg-white text-richblack-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
              Book Your Car Today
            </button>
          </div>
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}