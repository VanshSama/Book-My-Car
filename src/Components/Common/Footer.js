import React from 'react'
import { Car, Phone, Mail, MapPin } from 'lucide-react'

const Footer = () => {
    return (
        <footer className=" py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-6">
                <Car className="w-8 h-8 mr-2" />
                <div className="text-2xl font-bold">BookMyCar</div>
              </div>
              <p className=" mb-6 max-w-md">
                Your trusted partner for premium car rentals. Experience luxury, comfort, and reliability with every journey.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10  rounded-full flex items-center justify-center transition-colors cursor-pointer">
                  <span className="text-sm font-bold">f</span>
                </div>
                <div className="w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer">
                  <span className="text-sm font-bold">t</span>
                </div>
                <div className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">i</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3 ">
                <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#cars" className="hover:text-white transition-colors">Cars</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
                <li><a href="about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
              <div className="space-y-3 ">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5" />
                  <span>+91 99999-99999</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5" />
                  <span>info@bookmycar.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5" />
                  <span>Delhi, India</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-row justify-between text-center ">
            <p>&copy; 2025 BookMyCar.</p>
            <p>All rights reserved.</p>
          </div>
        </div>
      </footer>
    )
}

export default Footer
