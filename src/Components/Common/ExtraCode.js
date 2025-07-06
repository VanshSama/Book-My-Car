<header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md z-50 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Car className="w-8 h-8 text-blue-600 mr-2" />
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                BookMyCar
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#home" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">Home</a>
                <a href="#cars" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">Cars</a>
                <a href="#services" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">Services</a>
                <a href="#about" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">About</a>
                <a href="#contact" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">Contact</a>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium hidden md:block">Login</button>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
                Book Now
              </button>
              <button 
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
          
          {mobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
                <a href="#home" className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-600">Home</a>
                <a href="#cars" className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-600">Cars</a>
                <a href="#services" className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-600">Services</a>
                <a href="#about" className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-600">About</a>
                <a href="#contact" className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-600">Contact</a>
              </div>
            </div>
          )}
        </nav>
      </header>