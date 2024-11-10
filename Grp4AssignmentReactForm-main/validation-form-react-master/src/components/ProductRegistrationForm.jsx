// import React, { useState } from 'react';
// import { Calendar, DollarSign, Package, FileText, Factory, AlertCircle } from 'lucide-react';
// import { Alert, AlertDescription } from '../components/ui/alert';

// const ProductRegistrationForm = () => {
//   const [formData, setFormData] = useState({
//     productName: '',
//     productPrice: '',
//     description: '',
//     fabricationDate: '',
//     expirationDate: '',
//     producedBy: ''
//   });

//   const [errors, setErrors] = useState({});
//   const [submitStatus, setSubmitStatus] = useState({ status: '', message: '' });

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.productName.trim()) {
//       newErrors.productName = 'Product name is required';
//     }

//     if (!formData.productPrice) {
//       newErrors.productPrice = 'Price is required';
//     } else if (isNaN(formData.productPrice) || formData.productPrice <= 0) {
//       newErrors.productPrice = 'Please enter a valid price';
//     }

//     if (!formData.description.trim()) {
//       newErrors.description = 'Description is required';
//     }

//     if (!formData.fabricationDate) {
//       newErrors.fabricationDate = 'Fabrication date is required';
//     }

//     if (!formData.expirationDate) {
//       newErrors.expirationDate = 'Expiration date is required';
//     } else if (new Date(formData.expirationDate) <= new Date(formData.fabricationDate)) {
//       newErrors.expirationDate = 'Expiration date must be after fabrication date';
//     }

//     if (!formData.producedBy.trim()) {
//       newErrors.producedBy = 'Producer name is required';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (validateForm()) {
//       try {
//         const response = await fetch('http://localhost:8080/api/products/new', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             ...formData,
//             productPrice: parseFloat(formData.productPrice)
//           })
//         });

//         if (response.ok) {
//           setSubmitStatus({
//             status: 'success',
//             message: 'Product registered successfully!'
//           });
//           // Reset form
//           setFormData({
//             productName: '',
//             productPrice: '',
//             description: '',
//             fabricationDate: '',
//             expirationDate: '',
//             producedBy: ''
//           });
//         } else {
//           throw new Error('Failed to register product');
//         }
//       } catch (error) {
//         setSubmitStatus({
//           status: 'error',
//           message: 'Failed to register product. Please try again.'
//         });
//       }
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: ''
//       }));
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full mx-auto space-y-8">
//         {/* Header */}
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Product Registration
//           </h2>
//           <p className="mt-2 text-center text-sm text-gray-600">
//             Enter the product details below
//           </p>
//         </div>

//         {/* Status Alert */}
//         {submitStatus.message && (
//           <Alert className={submitStatus.status === 'success' ? 'bg-green-50' : 'bg-red-50'}>
//             <AlertCircle className={`h-4 w-4 ${submitStatus.status === 'success' ? 'text-green-600' : 'text-red-600'}`} />
//             <AlertDescription className={submitStatus.status === 'success' ? 'text-green-700' : 'text-red-700'}>
//               {submitStatus.message}
//             </AlertDescription>
//           </Alert>
//         )}

//         {/* Form */}
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="rounded-md shadow-sm space-y-4">
//             {/* Product Name */}
//             <div>
//               <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
//                 Product Name
//               </label>
//               <div className="mt-1 relative rounded-md shadow-sm">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Package className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="text"
//                   name="productName"
//                   id="productName"
//                   value={formData.productName}
//                   onChange={handleChange}
//                   className={`block w-full pl-10 sm:text-sm rounded-md ${errors.productName
//                     ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
//                     : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
//                     }`}
//                   placeholder="Enter product name"
//                 />
//               </div>
//               {errors.productName && (
//                 <p className="mt-2 text-sm text-red-600">{errors.productName}</p>
//               )}
//             </div>

//             {/* Product Price */}
//             <div>
//               <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700">
//                 Price
//               </label>
//               <div className="mt-1 relative rounded-md shadow-sm">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <DollarSign className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="number"
//                   step="0.01"
//                   min="0"
//                   name="productPrice"
//                   id="productPrice"
//                   value={formData.productPrice}
//                   onChange={handleChange}
//                   className={`block w-full pl-10 sm:text-sm rounded-md ${errors.productPrice
//                     ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
//                     : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
//                     }`}
//                   placeholder="0.00"
//                 />
//               </div>
//               {errors.productPrice && (
//                 <p className="mt-2 text-sm text-red-600">{errors.productPrice}</p>
//               )}
//             </div>

//             {/* Description */}
//             <div>
//               <label htmlFor="description" className="block text-sm font-medium text-gray-700">
//                 Description
//               </label>
//               <div className="mt-1 relative rounded-md shadow-sm">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FileText className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <textarea
//                   name="description"
//                   id="description"
//                   rows="3"
//                   value={formData.description}
//                   onChange={handleChange}
//                   className={`block w-full pl-10 sm:text-sm rounded-md ${errors.description
//                     ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
//                     : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
//                     }`}
//                   placeholder="Enter product description"
//                 />
//               </div>
//               {errors.description && (
//                 <p className="mt-2 text-sm text-red-600">{errors.description}</p>
//               )}
//             </div>

//             {/* Fabrication Date */}
//             <div>
//               <label htmlFor="fabricationDate" className="block text-sm font-medium text-gray-700">
//                 Fabrication Date
//               </label>
//               <div className="mt-1 relative rounded-md shadow-sm">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Calendar className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="date"
//                   name="fabricationDate"
//                   id="fabricationDate"
//                   value={formData.fabricationDate}
//                   onChange={handleChange}
//                   className={`block w-full pl-10 sm:text-sm rounded-md ${errors.fabricationDate
//                     ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
//                     : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
//                     }`}
//                 />
//               </div>
//               {errors.fabricationDate && (
//                 <p className="mt-2 text-sm text-red-600">{errors.fabricationDate}</p>
//               )}
//             </div>

//             {/* Expiration Date */}
//             <div>
//               <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700">
//                 Expiration Date
//               </label>
//               <div className="mt-1 relative rounded-md shadow-sm">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Calendar className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="date"
//                   name="expirationDate"
//                   id="expirationDate"
//                   value={formData.expirationDate}
//                   onChange={handleChange}
//                   className={`block w-full pl-10 sm:text-sm rounded-md ${errors.expirationDate
//                     ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
//                     : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
//                     }`}
//                 />
//               </div>
//               {errors.expirationDate && (
//                 <p className="mt-2 text-sm text-red-600">{errors.expirationDate}</p>
//               )}
//             </div>

//             {/* Produced By */}
//             <div>
//               <label htmlFor="producedBy" className="block text-sm font-medium text-gray-700">
//                 Produced By
//               </label>
//               <div className="mt-1 relative rounded-md shadow-sm">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Factory className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="text"
//                   name="producedBy"
//                   id="producedBy"
//                   value={formData.producedBy}
//                   onChange={handleChange}
//                   className={`block w-full pl-10 sm:text-sm rounded-md ${errors.producedBy
//                     ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
//                     : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
//                     }`}
//                   placeholder="Enter producer name"
//                 />
//               </div>
//               {errors.producedBy && (
//                 <p className="mt-2 text-sm text-red-600">{errors.producedBy}</p>
//               )}
//             </div>
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//             >
//               Register Product
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ProductRegistrationForm;







import React, { useState } from 'react';
import { Calendar, DollarSign, Package, FileText, Factory, AlertCircle } from 'lucide-react';
import './ProductForm.css';
const ProductRegistrationForm = () => {
  const [formData, setFormData] = useState({
    productName: '',
    productPrice: '',
    description: '',
    fabricationDate: '',
    expirationDate: '',
    producedBy: ''
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState({ status: '', message: '' });

  const validateForm = () => {
    const newErrors = {};

    if (!formData.productName.trim()) {
      newErrors.productName = 'Product name is required';
    }

    if (!formData.productPrice) {
      newErrors.productPrice = 'Price is required';
    } else if (isNaN(formData.productPrice) || formData.productPrice <= 0) {
      newErrors.productPrice = 'Please enter a valid price';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.fabricationDate) {
      newErrors.fabricationDate = 'Fabrication date is required';
    }

    if (!formData.expirationDate) {
      newErrors.expirationDate = 'Expiration date is required';
    } else if (new Date(formData.expirationDate) <= new Date(formData.fabricationDate)) {
      newErrors.expirationDate = 'Expiration date must be after fabrication date';
    }

    if (!formData.producedBy.trim()) {
      newErrors.producedBy = 'Producer name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:8080/api/products/new', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            productPrice: parseFloat(formData.productPrice)
          })
        });

        if (response.ok) {
          setSubmitStatus({
            status: 'success',
            message: 'Product registered successfully!'
          });
          // Reset form
          setFormData({
            productName: '',
            productPrice: '',
            description: '',
            fabricationDate: '',
            expirationDate: '',
            producedBy: ''
          });
        } else {
          throw new Error('Failed to register product');
        }
      } catch (error) {
        setSubmitStatus({
          status: 'error',
          message: 'Failed to register product. Please try again.'
        });
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="registration-container">
      <div className="form-wrapper">
        {/* Header */}
        <div className="form-header">
          <h2>Product Registration</h2>
          <p>Enter the product details below</p>
        </div>

        {/* Status Alert */}
        {submitStatus.message && (
          <div className={`alert ${submitStatus.status === 'success' ? 'alert-success' : 'alert-error'}`}>
            <AlertCircle className="alert-icon" />
            <span>{submitStatus.message}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Product Name */}
          <div className="form-group">
            <label htmlFor="productName" className="form-label">
              Product Name
            </label>
            <div className="input-wrapper">
              <Package className="input-icon" />
              <input
                type="text"
                name="productName"
                id="productName"
                value={formData.productName}
                onChange={handleChange}
                className={`form-input ${errors.productName ? 'error' : ''}`}
                placeholder="Enter product name"
              />
            </div>
            {errors.productName && (
              <p className="error-message">{errors.productName}</p>
            )}
          </div>

          {/* Product Price */}
          <div className="form-group">
            <label htmlFor="productPrice" className="form-label">
              Price
            </label>
            <div className="input-wrapper">
              <DollarSign className="input-icon" />
              <input
                type="number"
                step="0.01"
                min="0"
                name="productPrice"
                id="productPrice"
                value={formData.productPrice}
                onChange={handleChange}
                className={`form-input ${errors.productPrice ? 'error' : ''}`}
                placeholder="0.00"
              />
            </div>
            {errors.productPrice && (
              <p className="error-message">{errors.productPrice}</p>
            )}
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <div className="input-wrapper">
              <FileText className="input-icon textarea-icon" />
              <textarea
                name="description"
                id="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                className={`form-textarea ${errors.description ? 'error' : ''}`}
                placeholder="Enter product description"
              />
            </div>
            {errors.description && (
              <p className="error-message">{errors.description}</p>
            )}
          </div>

          {/* Fabrication Date */}
          <div className="form-group">
            <label htmlFor="fabricationDate" className="form-label">
              Fabrication Date
            </label>
            <div className="input-wrapper">
              <Calendar className="input-icon" />
              <input
                type="date"
                name="fabricationDate"
                id="fabricationDate"
                value={formData.fabricationDate}
                onChange={handleChange}
                className={`form-input ${errors.fabricationDate ? 'error' : ''}`}
              />
            </div>
            {errors.fabricationDate && (
              <p className="error-message">{errors.fabricationDate}</p>
            )}
          </div>

          {/* Expiration Date */}
          <div className="form-group">
            <label htmlFor="expirationDate" className="form-label">
              Expiration Date
            </label>
            <div className="input-wrapper">
              <Calendar className="input-icon" />
              <input
                type="date"
                name="expirationDate"
                id="expirationDate"
                value={formData.expirationDate}
                onChange={handleChange}
                className={`form-input ${errors.expirationDate ? 'error' : ''}`}
              />
            </div>
            {errors.expirationDate && (
              <p className="error-message">{errors.expirationDate}</p>
            )}
          </div>

          {/* Produced By */}
          <div className="form-group">
            <label htmlFor="producedBy" className="form-label">
              Produced By
            </label>
            <div className="input-wrapper">
              <Factory className="input-icon" />
              <input
                type="text"
                name="producedBy"
                id="producedBy"
                value={formData.producedBy}
                onChange={handleChange}
                className={`form-input ${errors.producedBy ? 'error' : ''}`}
                placeholder="Enter producer name"
              />
            </div>
            {errors.producedBy && (
              <p className="error-message">{errors.producedBy}</p>
            )}
          </div>

          <button type="submit" className="submit-button">
            Register Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductRegistrationForm;