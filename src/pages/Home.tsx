import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Menu, X, ChevronLeft, ChevronRight, 
  Heart, Shield, Clock 
} from 'lucide-react';
import securestorage from '../assets/pic1.jpg';
import logo from "../assets/logo.jpg"; 

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselItems = [
    {
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2070",
      title: "Comprehensive Healthcare Solutions",
      description: "Access world-class healthcare services tailored to your needs"
    },
    {
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=2080",
      title: "Personalized Care Plans",
      description: "Get customized healthcare plans designed specifically for you"
    },
    {
      image: securestorage,
      title: "Secure Data Storage",
      description: "Safeguard your personal health data with top-level encryption and privacy standards"
    }
  ];

  const benefits = [
    {
      icon: <Heart className="h-8 w-8 text-blue-500" />,
      title: "Personalized Care",
      description: "Tailored healthcare solutions that adapt to your unique needs"
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-500" />,
      title: "Secure & Private",
      description: "Your health information is protected with industry-leading security"
    },
    {
      icon: <Clock className="h-8 w-8 text-blue-500" />,
      title: "Quick Access",
      description: "Instant access to your health records and care providers"
    }
  ];

  const faqs = [
    {
      question: "How do I set up my health profile?",
      answer: "Setting up your profile is easy! Simply click on 'Sign Up', verify your identity, and follow our guided setup process."
    },
    {
      question: "Is my health information secure?",
      answer: "Yes, we use industry-leading encryption and security measures to protect your personal health information."
    },
    {
      question: "Can I add family members to my account?",
      answer: "Absolutely! You can add up to 4 dependents to your account and manage their healthcare needs."
    },
    {
      question: "How quickly can I access care?",
      answer: "With Evernorth, you can access virtual care 24/7 and schedule in-person appointments based on availability."
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // Auto-slide every 5 seconds
    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    }, []);

    const handleLogout = () => {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      navigate("/"); // Redirect to home page after logout
    };

    return (
      <div className="min-h-screen bg-white">
        <header className="bg-white shadow-sm fixed w-full top-0 z-50">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="flex items-center">
                  <img src={logo} alt="Evernorth Logo" className="h-8 w-8" />
                  <span className="ml-2 text-xl font-bold text-gray-900">Evernorth</span>
                </Link>
                <div className="hidden md:flex ml-10 space-x-8">
                  <Link to="/about" className="text-gray-600 hover:text-gray-900">About Us</Link>
                  <Link to="/services" className="text-gray-600 hover:text-gray-900">Services</Link>
                  <Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
                  <Link to="/resources" className="text-gray-600 hover:text-gray-900">Resources</Link>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-4">
              {!isAuthenticated ? (
                <>
                <Link to="/login" className="px-4 py-2 text-gray-600 hover:text-gray-900">Sign In</Link>
                <Link to="/signup" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Sign Up</Link>
              </>
                ) : (
                  <>
                    <Link to="/profile-setup" className="px-4 py-2 text-gray-600 hover:text-gray-900">Profile</Link>
                    <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Logout</button>
                  </>
                  
                )}
                  
              </div>
              <div className="md:hidden flex items-center">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-gray-900">
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </nav>

          {isMenuOpen && (
            <div className="md:hidden bg-white border-t">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link to="/about" className="block px-3 py-2 text-gray-600 hover:text-gray-900">About Us</Link>
                <Link to="/services" className="block px-3 py-2 text-gray-600 hover:text-gray-900">Services</Link>
                <Link to="/contact" className="block px-3 py-2 text-gray-600 hover:text-gray-900">Contact</Link>
                <Link to="/resources" className="block px-3 py-2 text-gray-600 hover:text-gray-900">Resources</Link>
                <Link to="/login" className="block px-3 py-2 text-gray-600 hover:text-gray-900">Sign In</Link>
                <Link to="/register" className="block px-3 py-2 text-blue-600 hover:text-blue-700">Sign Up</Link>
              </div>
            </div>
          )}
        </header>

        <main className="pt-16">
          <div className="relative h-[600px] overflow-hidden">
            <div className="flex transition-transform duration-500 ease-in-out h-full" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {carouselItems.map((item, index) => (
                <div key={index} className="min-w-full relative">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="text-center text-white px-4">
                      <h1 className="text-4xl md:text-5xl font-bold mb-4">{item.title}</h1>
                      <p className="text-xl md:text-2xl mb-8">{item.description}</p>
                      <Link to="/signup" className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors">Get Started</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75">
              <ChevronRight className="h-6 w-6" />
            </button>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {carouselItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 w-2 rounded-full ${currentSlide === index ? 'bg-blue-600' : 'bg-white'}`}
                />
              ))}
            </div>
          </div>

          {/* Benefits Section */}
          <section className="bg-gray-100 py-16">
            <div className="container mx-auto text-center">
              <h2 className="text-3xl font-semibold mb-8">Why Choose Us?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex flex-col items-center">
                    {benefit.icon}
                    <h3 className="text-xl font-semibold mt-4">{benefit.title}</h3>
                    <p className="mt-2">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQs Section */}
          <section className="py-16">
            <div className="container mx-auto text-center">
              <h2 className="text-3xl font-semibold mb-8">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <details key={index} className="group">
                    <summary className="cursor-pointer text-xl font-medium">{faq.question}</summary>
                    <p className="mt-2 text-gray-600">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-blue-600 text-white py-16">
            <div className="container mx-auto text-center">
              <h2 className="text-3xl font-semibold mb-4">Ready to take control of your health?</h2>
              <Link to="/signup" className="bg-white text-blue-600 px-8 py-3 rounded-md hover:bg-gray-200 transition-colors">Get Started</Link>
            </div>
          </section>
        </main>

        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto text-center">
            <p>&copy; 2025 Evernorth Healthcare. All rights reserved.</p>
            <div className="mt-4">
              <a href="https://facebook.com" className="text-white mx-2">Facebook</a>
              <a href="https://twitter.com" className="text-white mx-2">Twitter</a>
              <a href="https://linkedin.com" className="text-white mx-2">LinkedIn</a>
            </div>
          </div>
        </footer>
      </div>
    );
  };

  return <Navbar />;
}
