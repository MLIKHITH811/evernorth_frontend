import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { UserProfile, ValidationErrors } from '../types/types';
import ProfileHeader from '../components/profile/ProfileHeader';
import ContactCard from '../components/profile/ContactCard';
import PaymentMethods from '../components/profile/PaymentCard';
import AddressSection from '../components/profile/AddressCard';
import HealthSection from '../components/profile/HealthCard';
import DependentSection from '../components/profile/DependentCard';
import { Phone, CreditCard, MapPin, Heart, Users } from 'lucide-react';
import { validateProfile } from '../utils/validation'; // Ensure correct path to validation.js
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const navigate = useNavigate(); // Initialize navigate for routing
  const [activeTab, setActiveTab] = useState('contact');
  const [profile, setProfile] = useState<UserProfile>({
    memberId: 'MEM123456',
    fullName: '',
    dateOfBirth: '',
    contact: {
      mobileNumber: '',
      email: '',
      preferredContact: 'mobile',
    },
    paymentMethods: [],
    addresses: [],
    healthInfo: {
      conditions: [],
      allergies: [],
      descriptions: {},
    },
    dependents: [],
  });

  const [originalProfile, setOriginalProfile] = useState<UserProfile>(profile);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  // Compare the current profile with the original profile to track changes
  useEffect(() => {
    if (JSON.stringify(profile) !== JSON.stringify(originalProfile)) {
      // Track unsaved changes if needed
    }
  }, [profile, originalProfile]);

  // Calculate profile completion progress
  const calculateProgress = () => {
    const fields = [
      !!profile.fullName,
      !!profile.dateOfBirth,
      !!profile.contact.email,
      !!profile.contact.mobileNumber,
      profile.paymentMethods.length > 0,
      profile.addresses.length > 0,
      profile.healthInfo.conditions.length > 0 || profile.healthInfo.allergies.length > 0,
    ];

    const completedFields = fields.filter(Boolean).length;
    return (completedFields / fields.length) * 100;
  };

  // Determine if there are unsaved changes
  const hasUnsavedChanges = JSON.stringify(profile) !== JSON.stringify(originalProfile);

  // Debugging line: check current active tab and validation errors
  useEffect(() => {
    console.log('Active Tab:', activeTab); // Debugging activeTab value
    console.log('Validation Errors:', validationErrors); // Debugging validation errors
  }, [activeTab, validationErrors]);

  // Render active tab content
  const renderActiveTab = () => {
    switch (activeTab) {
      case 'contact':
        return <ContactCard contact={profile.contact} onChange={(updatedContact) => setProfile({ ...profile, contact: updatedContact })} />;
      case 'payment':
        return <PaymentMethods methods={profile.paymentMethods} onChange={(updatedPaymentMethods) => setProfile({ ...profile, paymentMethods: updatedPaymentMethods })} />;
      case 'address':
        return <AddressSection addresses={profile.addresses} onChange={(updatedAddresses) => setProfile({ ...profile, addresses: updatedAddresses })} />;
      case 'health':
        return <HealthSection healthInfo={profile.healthInfo} onChange={(updatedHealthInfo) => setProfile({ ...profile, healthInfo: updatedHealthInfo })} />;
      case 'dependents':
        return <DependentSection dependents={profile.dependents} onChange={(updatedDependents) => setProfile({ ...profile, dependents: updatedDependents })} />;
      default:
        return <div>Invalid Tab Selected</div>; // Handle default case
    }
  };

  // Handle logout click
  const handleLogout = () => {
    navigate('/Home.html'); // Navigate to Home.html on logout
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Logout Button in top-right corner */}
      <div className="absolute top-4 right-4">
      <button
           onClick={handleLogout}
           className="px-4 py-2 bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white font-semibold rounded-xl shadow-lg transform transition-all hover:scale-105 hover:bg-gradient-to-r hover:from-white-600 hover:to-white-800 focus:outline-none focus:ring-2 focus:ring-white-600 focus:ring-offset-2"
         >
           Logout
        </button>

      </div>

      <div className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <ProfileHeader profile={profile} progress={calculateProgress()} hasUnsavedChanges={hasUnsavedChanges} />

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {Object.keys(validationErrors).length > 0 && (
            <div className="bg-red-100 text-red-700 p-4 mb-4 rounded-md">
              <ul>
                {Object.values(validationErrors).map((error, idx) => (
                  <li key={idx}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
            {/* Left Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
                <button
                  className={`w-full text-left p-4 rounded-md ${activeTab === 'contact' ? 'bg-blue-100 text-blue-700' : 'text-gray-700'}`}
                  onClick={() => setActiveTab('contact')}
                >
                  <Phone className="mr-3 inline-block w-5 h-5" /> Contact Information
                </button>
                <button
                  className={`w-full text-left p-4 rounded-md ${activeTab === 'payment' ? 'bg-blue-100 text-blue-700' : 'text-gray-700'}`}
                  onClick={() => setActiveTab('payment')}
                >
                  <CreditCard className="mr-3 inline-block w-5 h-5" /> Payment Methods
                </button>
                <button
                  className={`w-full text-left p-4 rounded-md ${activeTab === 'address' ? 'bg-blue-100 text-blue-700' : 'text-gray-700'}`}
                  onClick={() => setActiveTab('address')}
                >
                  <MapPin className="mr-3 inline-block w-5 h-5" /> Address Information
                </button>
                <button
                  className={`w-full text-left p-4 rounded-md ${activeTab === 'health' ? 'bg-blue-100 text-blue-700' : 'text-gray-700'}`}
                  onClick={() => setActiveTab('health')}
                >
                  <Heart className="mr-3 inline-block w-5 h-5" /> Health Information
                </button>
                <button
                  className={`w-full text-left p-4 rounded-md ${activeTab === 'dependents' ? 'bg-blue-100 text-blue-700' : 'text-gray-700'}`}
                  onClick={() => setActiveTab('dependents')}
                >
                  <Users className="mr-3 inline-block w-5 h-5" /> Dependents Information
                </button>
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:w-3/4">
              {renderActiveTab()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}