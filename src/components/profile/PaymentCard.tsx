import { useState, useEffect } from 'react';
import { PaymentMethod } from '../../types/types';
import { CreditCard, Plus, Trash2, X, Save, Edit } from 'lucide-react';

interface Props {
  methods: PaymentMethod[];
  onChange: (methods: PaymentMethod[]) => void;
}

export default function PaymentMethods({ methods, onChange }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [newMethod, setNewMethod] = useState<Partial<PaymentMethod>>({
    type: 'credit',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [hasLocalChanges, setHasLocalChanges] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [editingMethod, setEditingMethod] = useState<PaymentMethod | null>(null);
  const [selectedMethodId, setSelectedMethodId] = useState<string | null>(null);

  // Validate payment method
  const validatePaymentMethod = () => {
    const validationErrors: Record<string, string> = {};
  
    if (newMethod.type === 'credit' || newMethod.type === 'debit') {
      if (!newMethod.cardNumber || !/^\d{16}$/.test(newMethod.cardNumber)) {
        validationErrors.cardNumber = 'Enter a valid 16-digit card number';
      }
      if (!newMethod.nameOnCard || newMethod.nameOnCard.length < 3) {
        validationErrors.nameOnCard = 'Name on card is required';
      }
      if (!newMethod.expiryDate || !/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(newMethod.expiryDate)) {
        validationErrors.expiryDate = 'Enter a valid expiry date (MM/YY)';
      }
    } else if (newMethod.type === 'upi') {
      if (!newMethod.upiId || !/^[a-zA-Z0-9.-]{2,256}@[a-zA-Z][a-zA-Z]{2,64}$/.test(newMethod.upiId)) {
        validationErrors.upiId = 'Enter a valid UPI ID';
      }
    } else if (newMethod.type === 'bank') {
      // Bank account number validation can vary between countries, typically between 10 and 18 digits
      if (!newMethod.bankAccountNumber || !/^\d{10,18}$/.test(newMethod.bankAccountNumber)) {
        validationErrors.bankAccountNumber = 'Enter a valid bank account number (10-18 digits)';
      }
  
      // Bank IFSC validation for India (11 characters) or adapt for other countries
      if (!newMethod.bankIFSC || !/^[A-Za-z]{2,4}[^A-Za-z]{7,}$/.test(newMethod.bankIFSC)) {
        validationErrors.bankIFSC = 'Enter a valid bank IFSC code (India example: AABCD@5678901)';
      }
  
      // Account holder name should be at least 3 characters, this can be adapted if necessary
      if (!newMethod.accountHolderName || newMethod.accountHolderName.length < 3) {
        validationErrors.accountHolderName = 'Account holder name is required (min. 3 characters)';
      }
    }
  
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };
  

  const handleSave = () => {
    if (!validatePaymentMethod()) return;
    
    let updatedMethods;
    if (editingMethod) {
      updatedMethods = methods.map((method) =>
        method.id === editingMethod.id ? { ...method, ...newMethod } : method
      );
    } else {
      updatedMethods = [
        ...methods,
        { ...newMethod, id: Date.now().toString() } as PaymentMethod,
      ];
    }

    onChange(updatedMethods);
    setHasLocalChanges(false);
    setShowForm(false);
    setIsEditable(false);
    setEditingMethod(null); // Reset editing mode
    setNewMethod({ type: 'credit' });
  };

  const handleEdit = (method: PaymentMethod) => {
    setIsEditable(true);
    setShowForm(true);
    setEditingMethod(method);
    setNewMethod({ ...method }); // Pre-populate form with existing details
  };

  const handleAddPayment = () => {
    if (methods.length >= 4) return; // Prevent adding more than 4 methods
    setIsEditable(true);
    setShowForm(true);
    setNewMethod({ type: 'credit' }); // Reset form for new method
    setEditingMethod(null); // No editing for new method
  };

  const handleCancel = () => {
    setShowForm(false);
    setIsEditable(false);
    setNewMethod({ type: 'credit' });
    setEditingMethod(null);
  };

  const handleDelete = (id: string) => {
    const updatedMethods = methods.filter((method) => method.id !== id);
    onChange(updatedMethods);
    setHasLocalChanges(true);
  };

  const handleSelectPayment = (id: string) => {
    setSelectedMethodId(id);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Payment Methods</h2>
        <div className="flex items-center gap-4">
          {methods.length < 4 && !showForm && (
            <button
              onClick={handleAddPayment}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Payment Method
            </button>
          )}
        </div>
      </div>

      {showForm && (
        <div className="mb-6 p-6 border rounded-lg bg-gray-50">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Payment Type
              </label>
              <select
                value={newMethod.type}
                onChange={(e) =>
                  setNewMethod({ ...newMethod, type: e.target.value as PaymentMethod['type'] })
                }
                className="w-full rounded-lg border border-gray-300 shadow-sm py-3 px-4 focus:ring-2 focus:ring-blue-500"
              >
                <option value="credit">Credit Card</option>
                <option value="debit">Debit Card</option>
                <option value="upi">UPI</option>
                <option value="bank">Bank Transfer</option>
              </select>
            </div>
            {newMethod.type !== 'upi' ? (
  <>
    { newMethod.type === 'bank' ? (
  <>
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Account Holder Name</label>
      <input
        type="text"
        value={newMethod.accountHolderName || ''}
        onChange={(e) =>
          setNewMethod({ ...newMethod, accountHolderName: e.target.value })
        }
        className={`w-full rounded-lg border ${
          errors.accountHolderName ? 'border-red-500' : 'border-gray-300'
        } shadow-sm py-3 px-4 focus:ring-2 focus:ring-blue-500`}
        placeholder="Enter account holder name"
        disabled={!isEditable}
      />
      {errors.accountHolderName && (
        <p className="text-red-500 text-sm">{errors.accountHolderName}</p>
      )}
    </div>

    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Bank Account Number
      </label>
      <input
        type="text"
        maxLength={16}
        value={newMethod.bankAccountNumber || ''}
        onChange={(e) =>
          setNewMethod({
            ...newMethod,
            bankAccountNumber: e.target.value.replace(/\D/g, ''),
          })
        }
        className={`w-full rounded-lg border ${
          errors.bankAccountNumber ? 'border-red-500' : 'border-gray-300'
        } shadow-sm py-3 px-4 focus:ring-2 focus:ring-blue-500`}
        placeholder="Enter bank account number"
        disabled={!isEditable}
      />
      {errors.bankAccountNumber && (
        <p className="text-red-500 text-sm">{errors.bankAccountNumber}</p>
      )}
    </div>

    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Bank IFSC Code</label>
      <input
        type="text"
        maxLength={11}
        value={newMethod.bankIFSC || ''}
        onChange={(e) =>
          setNewMethod({ ...newMethod, bankIFSC: e.target.value })
        }
        className={`w-full rounded-lg border ${
          errors.bankIFSC ? 'border-red-500' : 'border-gray-300'
        } shadow-sm py-3 px-4 focus:ring-2 focus:ring-blue-500`}
        placeholder="Enter bank IFSC code"
        disabled={!isEditable}
      />
      {errors.bankIFSC && (
        <p className="text-red-500 text-sm">{errors.bankIFSC}</p>
      )}
    </div>
  </>
) : (
      <>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Card Number</label>
          <input
            type="text"
            maxLength={16}
            value={newMethod.cardNumber || ''}
            onChange={(e) =>
              setNewMethod({ ...newMethod, cardNumber: e.target.value.replace(/\D/g, '') })
            }
            className={`w-full rounded-lg border ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'} shadow-sm py-3 px-4 focus:ring-2 focus:ring-blue-500`}
            placeholder="Enter 16-digit card number"
            disabled={!isEditable}
          />
          {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Name on Card</label>
          <input
            type="text"
            value={newMethod.nameOnCard || ''}
            onChange={(e) => setNewMethod({ ...newMethod, nameOnCard: e.target.value })}
            className={`w-full rounded-lg border ${errors.nameOnCard ? 'border-red-500' : 'border-gray-300'} shadow-sm py-3 px-4 focus:ring-2 focus:ring-blue-500`}
            placeholder="Enter name as shown on card"
            disabled={!isEditable}
          />
          {errors.nameOnCard && <p className="text-red-500 text-sm">{errors.nameOnCard}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
            <input
              type="text"
              value={newMethod.expiryDate || ''}
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length >= 2) {
                  value = value.slice(0, 2) + '/' + value.slice(2, 4);
                }
                setNewMethod({ ...newMethod, expiryDate: value });
              }}
              className={`w-full rounded-lg border ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'} shadow-sm py-3 px-4 focus:ring-2 focus:ring-blue-500`}
              placeholder="MM/YY"
              maxLength={5}
              disabled={!isEditable}
            />
            {errors.expiryDate && <p className="text-red-500 text-sm">{errors.expiryDate}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Card Type</label>
            <select
              value={newMethod.cardType || ''}
              onChange={(e) => setNewMethod({ ...newMethod, cardType: e.target.value })}
              className="w-full rounded-lg border border-gray-300 shadow-sm py-3 px-4 focus:ring-2 focus:ring-blue-500"
              disabled={!isEditable}
            >
              <option value="Visa">Visa</option>
              <option value="MasterCard">MasterCard</option>
              <option value="AmericanExpress">American Express</option>
            </select>
          </div>
        </div>
      </>
    )}
  </>
) : (
  <>
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">UPI ID</label>
      <input
        type="text"
        value={newMethod.upiId || ''}
        onChange={(e) => setNewMethod({ ...newMethod, upiId: e.target.value })}
        className={`w-full rounded-lg border ${errors.upiId ? 'border-red-500' : 'border-gray-300'} shadow-sm py-3 px-4 focus:ring-2 focus:ring-blue-500`}
        placeholder="Enter UPI ID"
        disabled={!isEditable}
      />
      {errors.upiId && <p className="text-red-500 text-sm">{errors.upiId}</p>}
    </div>
  </>
)}


            <div className="flex gap-4 justify-end">
              <button
                type="button"
                className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-200"
                onClick={handleCancel}
              >
                Cancel
              </button>

              <button
                type="button"
                className="px-4 py-2 bg-blue-600 text-white border border-transparent rounded-lg shadow-sm hover:bg-blue-700"
                onClick={handleSave}
              >
                {editingMethod ? 'Save Changes' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {!showForm && (
        <div className="space-y-6">
          {methods.map((method) => (
            <div
              key={method.id}
              className={`border p-4 rounded-lg ${selectedMethodId === method.id ? 'border-green-500 bg-green-50' : ''}`}
            >
              <div className="flex justify-between items-center">
              <div>
                    <div className="text-lg font-semibold">
                      {method.type === 'upi' 
                        ? method.upiId 
                        : method.type === 'bank' 
                        ? `Bank Account: ${'**** **** ' + method.bankAccountNumber?.slice(-4)}` 
                        : method.nameOnCard?.slice(-4)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {method.type === 'upi' 
                        ? 'UPI ID' 
                        : method.type === 'bank' 
                        ? `Bank IFSC: ${method.bankIFSC}` 
                        : 'Card ending in ' + method.cardNumber?.slice(-4)}
                    </div>
                </div>

                <div className="flex gap-4 items-center">
                  <input
                    type="radio"
                    name="payment-method"
                    checked={selectedMethodId === method.id}
                    onChange={() => handleSelectPayment(method.id)}
                    className="h-4 w-4 text-blue-600"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(method)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(method.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
