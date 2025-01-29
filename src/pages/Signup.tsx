// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { toast } from 'react-hot-toast';
// import { UserPlus, Calendar, Mail, Phone, User } from 'lucide-react';

// interface FormData {
//   fullName: string;
//   dob: string;
//   email: string;
//   mobile: string;
// }

// export default function Signup() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState<FormData>({
//     fullName: '',
//     dob: '',
//     email: '',
//     mobile: ''
//   });

//   const [errors, setErrors] = useState<Partial<FormData>>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const validateForm = (): boolean => {
//     const newErrors: Partial<FormData> = {};
//     let isValid = true;

//     // Full Name validation
//     if (!formData.fullName.trim()) {
//       newErrors.fullName = 'Full name is required';
//       isValid = false;
//     } else if (!/^[a-zA-Z\s]{2,50}$/.test(formData.fullName.trim())) {
//       newErrors.fullName = 'Please enter a valid name (2-50 characters, letters only)';
//       isValid = false;
//     }

//     // DOB validation
//     if (!formData.dob) {
//       newErrors.dob = 'Date of birth is required';
//       isValid = false;
//     } else {
//       const birthDate = new Date(formData.dob);
//       const today = new Date();
//       let age = today.getFullYear() - birthDate.getFullYear();
//       const monthDiff = today.getMonth() - birthDate.getMonth();

//       if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
//         age--;
//       }

//       if (age < 18) {
//         newErrors.dob = 'You must be at least 18 years old';
//         isValid = false;
//       } else if (age > 120) {
//         newErrors.dob = 'Please enter a valid date of birth';
//         isValid = false;
//       }
//     }

//     // Email validation
//     if (!formData.email) {
//       newErrors.email = 'Email is required';
//       isValid = false;
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = 'Please enter a valid email address';
//       isValid = false;
//     }

//     // Mobile validation
//     if (!formData.mobile) {
//       newErrors.mobile = 'Mobile number is required';
//       isValid = false;
//     } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
//       newErrors.mobile = 'Please enter a valid 10-digit mobile number';
//       isValid = false;
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       toast.error('Please fix the errors in the form');
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       toast.success('Account created successfully!');
//       navigate('/login');
//     } catch (error) {
//       toast.error('Something went wrong. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     // Clear error when user starts typing
//     if (errors[name as keyof FormData]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: undefined
//       }));
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">

//         <div className="flex justify-center">
//           <div className="rounded-full bg-blue-100 p-3">
//             <UserPlus className="h-12 w-12 text-blue-600" />
//           </div>
//         </div>
//         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//           Create your account
//         </h2>
//         <p className="mt-2 text-center text-sm text-gray-600">
//           Already have an account?{' '}
//           <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
//             Sign in
//           </Link>
//         </p>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <div>
//               <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
//                 Full Name
//               </label>
//               <div className="mt-1 relative rounded-md shadow-sm">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <User className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="text"
//                   name="fullName"
//                   id="fullName"
//                   autoComplete="name"
//                   value={formData.fullName}
//                   onChange={handleInputChange}
//                   className={`block w-full pl-10 pr-3 py-2 border ${
//                     errors.fullName ? 'border-red-300' : 'border-gray-300'
//                   } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
//                   placeholder="John Doe"
//                 />
//               </div>
//               {errors.fullName && (
//                 <p className="mt-2 text-sm text-red-600">{errors.fullName}</p>
//               )}
//             </div>

//             <div>
//               <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
//                 Date of Birth
//               </label>
//               <div className="mt-1 relative rounded-md shadow-sm">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Calendar className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="date"
//                   name="dob"
//                   id="dob"
//                   value={formData.dob}
//                   onChange={handleInputChange}
//                   max={new Date().toISOString().split('T')[0]}
//                   className={`block w-full pl-10 pr-3 py-2 border ${
//                     errors.dob ? 'border-red-300' : 'border-gray-300'
//                   } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
//                 />
//               </div>
//               {errors.dob && (
//                 <p className="mt-2 text-sm text-red-600">{errors.dob}</p>
//               )}
//             </div>

//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                 Email Address
//               </label>
//               <div className="mt-1 relative rounded-md shadow-sm">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Mail className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="email"
//                   name="email"
//                   id="email"
//                   autoComplete="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className={`block w-full pl-10 pr-3 py-2 border ${
//                     errors.email ? 'border-red-300' : 'border-gray-300'
//                   } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
//                   placeholder="you@example.com"
//                 />
//               </div>
//               {errors.email && (
//                 <p className="mt-2 text-sm text-red-600">{errors.email}</p>
//               )}
//             </div>

//             <div>
//               <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
//                 Mobile Number
//               </label>
//               <div className="mt-1 relative rounded-md shadow-sm">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Phone className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="tel"
//                   name="mobile"
//                   id="mobile"
//                   autoComplete="tel"
//                   value={formData.mobile}
//                   onChange={handleInputChange}
//                   className={`block w-full pl-10 pr-3 py-2 border ${
//                     errors.mobile ? 'border-red-300' : 'border-gray-300'
//                   } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
//                   placeholder="1234567890"
//                 />
//               </div>
//               {errors.mobile && (
//                 <p className="mt-2 text-sm text-red-600">{errors.mobile}</p>
//               )}
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
//                   isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
//                 }`}
//               >
//                 {isSubmitting ? 'Creating Account...' : 'Create Account'}
//               </button>
//             </div>
//           </form>

//           <div className="mt-6">
//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-300" />
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-2 bg-white text-gray-500">
//                   By signing up, you agree to our
//                 </span>
//               </div>
//             </div>

//             <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
//               <Link
//                 to="/terms"
//                 className="text-gray-600 hover:text-gray-900 text-center"
//               >
//                 Terms of Service
//               </Link>
//               <Link
//                 to="/privacy"
//                 className="text-gray-600 hover:text-gray-900 text-center"
//               >
//                 Privacy Policy
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { UserPlus, Calendar, Mail, Phone, User } from "lucide-react";
import axios from "axios";

interface FormData {
  fullName: string;
  dob: string;
  email: string;
  mobile: string;
}

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    dob: "",
    email: "",
    mobile: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    let isValid = true;

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
      isValid = false;
    } else if (!/^[a-zA-Z\s]{2,50}$/.test(formData.fullName.trim())) {
      newErrors.fullName =
        "Please enter a valid name (2-50 characters, letters only)";
      isValid = false;
    }

    // DOB validation
    if (!formData.dob) {
      newErrors.dob = "Date of birth is required";
      isValid = false;
    } else {
      const birthDate = new Date(formData.dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      if (age < 18) {
        newErrors.dob = "You must be at least 18 years old";
        isValid = false;
      } else if (age > 120) {
        newErrors.dob = "Please enter a valid date of birth";
        isValid = false;
      }
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Mobile validation
    if (!formData.mobile) {
      newErrors.mobile = "Mobile number is required";
      isValid = false;
    } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Assuming the formData contains the user's signup data
    localStorage.setItem('profileData', JSON.stringify(formData)); // Save data to localStorage
    
    // Proceed to redirect or notify success
    toast.success("Account created successfully!");
    navigate('/profile'); // Assuming you're using a navigation hook or `react-router`
  };
  
  
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="rounded-full bg-blue-100 p-3">
            <UserPlus className="h-12 w-12 text-blue-600" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  autoComplete="name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    errors.fullName ? "border-red-300" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  placeholder="John Doe"
                />
              </div>
              {errors.fullName && (
                <p className="mt-2 text-sm text-red-600">{errors.fullName}</p>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <label
                htmlFor="dob"
                className="block text-sm font-medium text-gray-700"
              >
                Date of Birth
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  name="dob"
                  id="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  max={new Date().toISOString().split("T")[0]}
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    errors.dob ? "border-red-300" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
              </div>
              {errors.dob && (
                <p className="mt-2 text-sm text-red-600">{errors.dob}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    errors.email ? "border-red-300" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Mobile */}
            <div>
              <label
                htmlFor="mobile"
                className="block text-sm font-medium text-gray-700"
              >
                Mobile Number
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="mobile"
                  id="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    errors.mobile ? "border-red-300" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  placeholder="1234567890"
                />
              </div>
              {errors.mobile && (
                <p className="mt-2 text-sm text-red-600">{errors.mobile}</p>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className={`w-full flex justify-center py-2 px-4 border ${
                  isSubmitting ? "bg-gray-400" : "bg-blue-600"
                } rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
