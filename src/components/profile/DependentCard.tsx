import { useState } from 'react';
import { Dependent } from '../../types/types';
import { Users, Plus, Trash2, Phone, Mail, AlertCircle, Edit } from 'lucide-react';

interface Props {
  dependents: Dependent[];
  onChange: (dependents: Dependent[]) => void;
}

export default function DependentSection({ dependents, onChange }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [newDependent, setNewDependent] = useState<Partial<Dependent>>({});
  const [editingDependent, setEditingDependent] = useState<Dependent | null>(null);
  const [errors, setErrors] = useState({
    name: '',
    relation: '',
    dateOfBirth: '',
    mobileNumber: '',
    email: ''
  });

  const handleAdd = () => {
    let isValid = true;
    const newErrors: any = {};

    if (!newDependent.name) {
      newErrors.name = 'Full Name is required';
      isValid = false;
    }
    if (!newDependent.relation) {
      newErrors.relation = 'Relation is required';
      isValid = false;
    }
    if (!newDependent.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of Birth is required';
      isValid = false;
    }
    if (!newDependent.mobileNumber) {
      newErrors.mobileNumber = 'Mobile Number is required';
      isValid = false;
    }
    if (!newDependent.email) {
      newErrors.email = 'Email Address is required';
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) return;

    if (dependents.length >= 4) {
      alert('Maximum 4 dependents allowed');
      return;
    }

    const dependentToAdd = {
      ...newDependent,
      id: Date.now().toString(),
      isEmergencyContact: false
    } as Dependent;

    onChange([...dependents, dependentToAdd]);
    setShowForm(false);
    setNewDependent({});
    setErrors({
      name: '',
      relation: '',
      dateOfBirth: '',
      mobileNumber: '',
      email: ''
    });
  };

  const handleDelete = (id: string) => {
    onChange(dependents.filter((dependent) => dependent.id !== id));
  };

  const toggleEmergencyContact = (id: string) => {
    onChange(
      dependents.map(dep => ({
        ...dep,
        isEmergencyContact: dep.id === id
      }))
    );
  };

  const handleEmergencySOS = () => {
    const emergencyContact = dependents.find(dep => dep.isEmergencyContact);
    if (emergencyContact) {
      alert(`Sending emergency alert to ${emergencyContact.name} at ${emergencyContact.mobileNumber}`);
    } else {
      alert('Please set an emergency contact first');
    }
  };

  const handleEdit = (dependent: Dependent) => {
    setEditingDependent(dependent);
    setNewDependent({ ...dependent });
    setShowForm(true);
  };
  
  const handleCancel = () => {
    setEditingDependent(null);
    setNewDependent({});
    setErrors({
      name: '',
      relation: '',
      dateOfBirth: '',
      mobileNumber: '',
      email: ''
    });
    setShowForm(false);
  };

  const handleSaveEdit = () => {
    if (editingDependent) {
      const updatedDependents = dependents.map(dep =>
        dep.id === editingDependent.id ? { ...dep, ...newDependent } : dep
      );
      onChange(updatedDependents);
      setEditingDependent(null);
      setNewDependent({});
      setShowForm(false);
      setErrors({
        name: '',
        relation: '',
        dateOfBirth: '',
        mobileNumber: '',
        email: ''
      });
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <Users className="h-8 w-8 text-blue-500 mr-3" />
          <h2 className="text-2xl font-semibold text-gray-900">Dependents</h2>
        </div>
        {!showForm && dependents.length < 4 && (
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Dependent
          </button>
        )}
      </div>

      {/* Show the form and hide dependent details when adding or editing a dependent */}
      {showForm && (
        <div className="mb-8 p-6 border rounded-lg bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900 mb-6">
            {editingDependent ? 'Edit Dependent' : 'Add New Dependent'}
          </h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                value={newDependent.name || ''}
                onChange={(e) =>
                  setNewDependent({ ...newDependent, name: e.target.value })
                }
                className={`w-full rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'} shadow-sm py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Enter full name"
              />
              {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Relation</label>
              <select
                value={newDependent.relation || ''}
                onChange={(e) =>
                  setNewDependent({ ...newDependent, relation: e.target.value })
                }
                className={`w-full rounded-lg border ${errors.relation ? 'border-red-500' : 'border-gray-300'} shadow-sm py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              >
                <option value="">Select Relation</option>
                <option value="spouse">Spouse</option>
                <option value="child">Child</option>
                <option value="parent">Parent</option>
                <option value="sibling">Sibling</option>
              </select>
              {errors.relation && <p className="text-xs text-red-500">{errors.relation}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                type="date"
                value={newDependent.dateOfBirth || ''}
                onChange={(e) =>
                  setNewDependent({ ...newDependent, dateOfBirth: e.target.value })
                }
                className={`w-full rounded-lg border ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'} shadow-sm py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.dateOfBirth && <p className="text-xs text-red-500">{errors.dateOfBirth}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  value={newDependent.mobileNumber || ''}
                  onChange={(e) =>
                    setNewDependent({ ...newDependent, mobileNumber: e.target.value })
                  }
                  className={`pl-10 w-full rounded-lg border ${errors.mobileNumber ? 'border-red-500' : 'border-gray-300'} shadow-sm py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="Enter mobile number"
                />
              </div>
              {errors.mobileNumber && <p className="text-xs text-red-500">{errors.mobileNumber}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={newDependent.email || ''}
                  onChange={(e) =>
                    setNewDependent({ ...newDependent, email: e.target.value })
                  }
                  className={`pl-10 w-full rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} shadow-sm py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="Enter email address"
                />
              </div>
              {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>

            <button
              onClick={editingDependent ? handleSaveEdit : handleAdd}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {editingDependent ? 'Save Changes' : 'Save'}
            </button>
          </div>
        </div>
      )}

  
{!showForm && dependents.length > 0 && (
  <div>
    {dependents.map((dependent) => (
      <div
        key={dependent.id}
        className={`mb-6 p-4 border p-4 rounded-lg ${
          dependent.isEmergencyContact ? 'border-green-500 bg-green-50' : ''
        }`}
      >
        <div className="flex justify-between items-center">
          <div>
            <p className="font-semibold">{dependent.name}</p>
            <p className="text-sm text-gray-500">{dependent.relation}</p>
            <p className="text-sm text-gray-500">Date of Birth: {dependent.dateOfBirth}</p>
            <p className="text-sm text-gray-500">Phone: {dependent.mobileNumber}</p>
            <p className="text-sm text-gray-500">Email: {dependent.email}</p>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleEdit(dependent)}
              className="text-blue-500 hover:text-blue-600 focus:outline-none"
            >
              <Edit className="h-5 w-5" />
            </button>
            <button
              onClick={() => handleDelete(dependent.id)}
              className="text-red-500 hover:text-red-600 focus:outline-none"
            >
              <Trash2 className="h-5 w-5" />
            </button>
            <button
              onClick={() => toggleEmergencyContact(dependent.id)}
              className={`${
                dependent.isEmergencyContact ? 'text-red-500' : 'text-gray-500'
              } hover:text-red-600 focus:outline-none`}
            >
              <AlertCircle className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
)}

        {/* Emergency SOS Button */}
        {!showForm && dependents.length > 0 && (
          <div className="mt-8 text-center">
            <button
              onClick={handleEmergencySOS}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-lg"
            >
              <AlertCircle className="h-5 w-5 mr-2" />
              Emergency SOS
            </button>
            <p className="mt-2 text-sm text-gray-500">
              Contact your emergency contact for help.
            </p>
          </div>
        )}

    </div>  
      
  );
}
