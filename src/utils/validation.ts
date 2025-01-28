import { z } from 'zod';
import { UserProfile, ValidationErrors } from '../types/types';

export const phoneRegex = /^[0-9]{10}$/;
export const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export const cardNumberRegex = /^[0-9]{16}$/;
export const expiryDateRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
export const zipCodeRegex = /^[0-9]{5,6}$/;
export const nameRegex = /^[a-zA-Z\s]{2,50}$/;
export const bankAccountNumberRegex = /^\d{10,18}$/; 
export const bankIFSCRegex = /^[A-Za-z]{4}\d{7}$/; 
export const accountHolderNameRegex = /^[a-zA-Z\s]{3,50}$/;

export const validationSchemas = {
  memberValidation: z.object({
    memberId: z.string().min(5, 'Member ID must be at least 5 characters'),
    dateOfBirth: z.string().refine((date) => {
      const dob = new Date(date);
      const today = new Date();
      return dob < today;
    }, 'Invalid date of birth'),
    mobileNumber: z.string().regex(phoneRegex, 'Invalid mobile number'),
  }),

  personalInfo: z.object({
    fullName: z.string().regex(nameRegex, 'Name must be 2-50 characters, letters only'),
    dateOfBirth: z.string().refine((date) => {
      const dob = new Date(date);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      return age >= 18 && age <= 100;
    }, 'Age must be between 18 and 100 years'),
  }),

  contactInfo: z.object({
    mobileNumber: z.string().regex(phoneRegex, 'Invalid mobile number'),
    email: z.string().regex(emailRegex, 'Invalid email address'),
    preferredContact: z.enum(['mobile', 'email', 'text']),
  }),

  paymentMethod: z.object({
    type: z.enum(['credit', 'debit', 'upi', 'bank']), // Added 'bank' option
    cardNumber: z.string().regex(cardNumberRegex, 'Invalid card number').optional(),
    nameOnCard: z.string().min(3, 'Name is required').optional(),
    cardType: z.enum(['visa', 'mastercard']).optional(),
    expiryDate: z.string().regex(expiryDateRegex, 'Invalid expiry date (MM/YY)').optional(),
    upiId: z.string().min(5, 'Invalid UPI ID').optional(),
    bankAccountNumber: z.string().regex(bankAccountNumberRegex, 'Invalid bank account number (10-18 digits)').optional(),
    bankIFSC: z.string().regex(bankIFSCRegex, 'Invalid bank IFSC code (India example: ABCD1234567)').optional(),
    accountHolderName: z.string().regex(accountHolderNameRegex, 'Account holder name must be 3-50 characters, letters only').optional(),
  }),

  address: z.object({
    line1: z.string().min(5, 'Address line 1 is required'),
    line2: z.string().optional(),
    city: z.string().min(2, 'City is required'),
    state: z.string().min(2, 'State is required'),
    zipCode: z.string().regex(zipCodeRegex, 'Invalid ZIP code'),
    landmark: z.string().optional(),
  }),

  dependent: z.object({
    name: z.string().min(2, 'Name is required'),
    relation: z.enum(['spouse', 'child', 'parent', 'sibling']),
    dateOfBirth: z.string().refine((date) => {
      const dob = new Date(date);
      const today = new Date();
      return dob < today;
    }, 'Invalid date of birth'),
  }),
};

export const validateField = (
  schema: z.ZodType<any>,
  value: any
): { success: boolean; error?: string } => {
  try {
    schema.parse(value);
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message };
    }
    return { success: false, error: 'Validation failed' };
  }
};

export const validateProfile = (profile: UserProfile): ValidationErrors => {
  const errors: ValidationErrors = {};

  // Validate personal info
  try {
    validationSchemas.personalInfo.parse({
      fullName: profile.fullName,
      dateOfBirth: profile.dateOfBirth,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.errors.forEach((err) => {
        errors[err.path[0]] = err.message;
      });
    }
  }

  // Validate contact info
  try {
    validationSchemas.contactInfo.parse(profile.contact);
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.errors.forEach((err) => {
        errors[err.path[0]] = err.message;
      });
    }
  }

  // Validate payment methods
  profile.paymentMethods.forEach((method, index) => {
    try {
      validationSchemas.paymentMethod.parse(method);
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          errors[`paymentMethod${index}.${err.path[0]}`] = err.message;
        });
      }
    }
  });

  // Validate addresses
  profile.addresses.forEach((address, index) => {
    try {
      validationSchemas.address.parse(address);
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          errors[`address${index}.${err.path[0]}`] = err.message;
        });
      }
    }
  });

  // Validate dependents
  profile.dependents.forEach((dependent, index) => {
    try {
      validationSchemas.dependent.parse(dependent);
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          errors[`dependent${index}.${err.path[0]}`] = err.message;
        });
      }
    }
  });

  return errors;
};

export const validateMemberId = (memberId: string): string | null => {
  if (!memberId) return 'Member ID is required';
  if (memberId.length < 5) return 'Member ID must be at least 5 characters';
  if (!/^\d+$/.test(memberId)) return 'Member ID must contain only numbers';
  return null;
};

export const validateDOB = (dob: string): string | null => {
  if (!dob) return 'Date of Birth is required';
  
  const date = new Date(dob);
  const today = new Date();
  
  if (date > today) return 'Date of Birth cannot be in the future';
  
  const minDate = new Date();
  minDate.setFullYear(today.getFullYear() - 120);
  if (date < minDate) return 'Please enter a valid Date of Birth';
  
  return null;
};

export const validateMobile = (mobile: string): string | null => {
  if (!mobile) return 'Mobile number is required';
  if (!/^\d{10}$/.test(mobile)) return 'Mobile number must be 10 digits';
  return null;
};

export const validateOTP = (otp: string): string | null => {
  if (!otp) return 'OTP is required';
  if (!/^\d{6}$/.test(otp)) return 'OTP must be 6 digits';
  return null;
};