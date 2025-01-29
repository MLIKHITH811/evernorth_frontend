import React from 'react';
import { UserCircle2 } from 'lucide-react';
import evernorth from "../assets/evernorth.jpg"; 

const mockUser = {
  name: "Sarah Johnson",
  memberId: "MEM123456",
};

function Welcome() {
  const heroImageStyle: React.CSSProperties = {
    backgroundImage: `url(${evernorth})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Hero Image */}
          <div 
            className="h-64"
            style={heroImageStyle} 
          />
          
          {/* Content */}
          <div className="p-8">
            <div className="flex items-center justify-center -mt-20">
              <div className="bg-white p-2 rounded-full shadow-lg">
                <UserCircle2 size={64} className="text-teal-600" />
              </div>
            </div>
            <div className="text-center mt-6">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                Welcome, {mockUser.name}!
              </h1>
              <p className="text-gray-600 mb-8">
                A user-friendly platform to manage your health, track issues, and make payments
              </p>
              <div className="bg-gradient-to-r from-teal-500 to-blue-600 p-6 rounded-xl inline-block">
                <p className="text-teal-100 text-sm">MEMBER ID</p>
                <p className="text-white text-2xl font-mono tracking-wider">
                  {mockUser.memberId}
                </p>
              </div>
              <div className="mt-6">
                <a 
                  href="/profile-setup" 
                  className="px-6 py-3 bg-teal-600 text-white rounded-full shadow-md hover:bg-teal-700 transition-colors"
                >
                  Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
