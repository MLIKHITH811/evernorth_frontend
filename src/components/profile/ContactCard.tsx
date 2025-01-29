import { useState } from 'react';
import { ContactInfo } from '../../types/types';
import { Mail, Phone, MessageSquare } from 'lucide-react';

interface Props {
  contact: ContactInfo;
  onChange: (contact: ContactInfo) => void;
}

export default function ContactCard({ contact, onChange }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContact, setEditedContact] = useState({ ...contact, preferredContact: 'email' });
  const [hasChanges, setHasChanges] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [otp, setOtp] = useState<string | null>('012345');
  const [otpInput, setOtpInput] = useState('');
  const [isOtpPopupOpen, setIsOtpPopupOpen] = useState(false);
  const [otpVerifiedMessage, setOtpVerifiedMessage] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');

  const handleInputChange = (field: keyof ContactInfo, value: string) => {
    setEditedContact((prev) => {
      const updated = { ...prev, [field]: value };
      setHasChanges(JSON.stringify(updated) !== JSON.stringify(contact));
      setIsVerified(false);
      return updated;
    });

    // Validate email format
    if (field === 'email') {
      const emailValid = validateEmail(value);
      if (!emailValid) {
        setEmailError('Please enter a valid email address.');
      } else {
        setEmailError('');
      }
    }
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSave = () => {
    if (hasChanges && isVerified) {
      onChange(editedContact);
      setIsEditing(false);
      setHasChanges(false);
      setIsVerified(true);
    } else if (!isVerified) {
      alert('Please verify your email before saving changes.');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedContact({ ...contact, preferredContact: 'email' });
    setHasChanges(false);
  };

  const handleVerifyOtp = () => {
    if (otpInput === otp) {
      setIsVerified(true);
      setIsOtpPopupOpen(false);
      setOtpVerifiedMessage('Email successfully verified!');
      
      // Hide the success message after 5 seconds
      setTimeout(() => {
        setOtpVerifiedMessage('');
      }, 5000);
    } else {
      alert('Invalid OTP! Please try again.');
    }
  };

  const sendOtpToEmail = () => {
    // Only proceed if the email is valid
    if (!emailError && validateEmail(editedContact.email)) {
      setIsOtpPopupOpen(true);
    } else {
      setEmailError('Please enter a valid email address before requesting OTP.');
    }
  };

  return (
    <div className="p-8 relative">
      <div className="flex justify-between items-start mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">Contact Information</h2>
        {!isEditing && (
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            onClick={() => {
              setIsEditing(true);
              setEditedContact({ ...contact, preferredContact: 'email' });
              setHasChanges(false);
            }}
          >
            Edit
          </button>
        )}
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Mobile Number Section */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Mobile Number
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            {isEditing ? (
              <input
                type="tel"
                value={editedContact.mobileNumber}
                onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                disabled
                className={`pl-10 w-full rounded-lg border border-gray-300 shadow-sm py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  isVerified ? 'verified-field' : ''
                }`}
                placeholder="Enter your mobile number"
              />
            ) : (
              <p
                className={`pl-10 py-3 border border-gray-300 rounded-lg bg-gray-50 ${
                  isVerified ? 'verified-field' : ''
                }`}
              >
                {contact.mobileNumber || 'Not provided'}
              </p>
            )}
          </div>
        </div>

        {/* Email Address Section */}
        <label className="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          {isEditing ? (
            <input
              type="email"
              value={editedContact.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`pl-10 w-full rounded-lg border border-gray-300 shadow-sm py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                isVerified ? 'border-green-500 bg-green-50' : ''
              }`}
              placeholder="Enter your email address"
            />
          ) : (
            <p
              className={`pl-10 py-3 border border-gray-300 rounded-lg bg-gray-50 ${
                isVerified ? 'border-green-500 bg-green-50' : ''
              }`}
            >
              {contact.email || 'Not provided'}
            </p>
          )}
        </div>
        {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
        {isEditing && !isVerified && !emailError && (
          <button
            onClick={sendOtpToEmail}
            className="mt-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Verify
          </button>
        )}
      </div>

      {/* OTP Popup Modal */}
      {isOtpPopupOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold">Enter OTP</h3>
            <input
              type="text"
              value={otpInput}
              onChange={(e) => setOtpInput(e.target.value)}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Enter OTP"
            />
            <div className="mt-4 flex justify-end gap-4">
              <button
                onClick={() => setIsOtpPopupOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleVerifyOtp}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Verify OTP
              </button>
            </div>
          </div>
        </div>
      )}

      {/* OTP Verification Success Message */}
      {otpVerifiedMessage && (
        <div className="mt-4 text-green-500 font-medium">
          {otpVerifiedMessage}
        </div>
      )}

      {/* Preferred Contact Method Section */}
      <div className="space-y-4 pt-4">
        <label className="block text-sm font-medium text-gray-700">
          Preferred Contact Method
        </label>
        <div className="grid grid-cols-3 gap-4">
          {[
            { value: 'mobile', icon: Phone, label: 'Phone Call' },
            { value: 'email', icon: Mail, label: 'Email' },
            { value: 'text', icon: MessageSquare, label: 'Text Message' },
          ].map(({ value, icon: Icon, label }) => (
            <label
              key={value}
              className={`flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                editedContact.preferredContact === value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-200 hover:bg-gray-50'
              }`}
            >
              <input
                type="radio"
                name="contactMethod"
                value={value}
                disabled={!isEditing || value !== 'email'}
                checked={editedContact.preferredContact === value}
                onChange={(e) => handleInputChange('preferredContact', e.target.value)}
                className="sr-only"
              />
              <Icon
                className={`h-6 w-6 mb-2 ${
                  editedContact.preferredContact === value
                    ? 'text-blue-500'
                    : 'text-gray-400'
                }`}
              />
              <span
                className={`text-sm font-medium ${
                  editedContact.preferredContact === value
                    ? 'text-blue-700'
                    : 'text-gray-700'
                }`}
              >
                {label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Inline Save and Cancel Buttons */}
      {isEditing && (
        <div className="flex justify-end mt-6 gap-4">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className={`px-4 py-2 rounded-md transition ${
              hasChanges && isVerified
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            onClick={handleSave}
            disabled={!hasChanges || !isVerified}
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}
