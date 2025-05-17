// "use client"
// import React, { useEffect, useState, useContext } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios';
// import { StoreContext } from '@/context/StoreContext';

// const VerifyPayment = () => {
//   const { token } = useContext(StoreContext);
//   const [loading, setLoading] = useState(true);
//   const [verificationStatus, setVerificationStatus] = useState(null);
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const query = new URLSearchParams(location.search);

//     const verifyPayment = async () => {
//       try {
//         const response = await axios.post('http://localhost:5000/order/verify', {
//           userId: token?.userId,
//           razorpay_payment_id: query.get('razorpay_payment_id'),
//           razorpay_order_id: query.get('razorpay_order_id'),
//           razorpay_signature: query.get('razorpay_signature'),
//         });

//         if (response.data.success) {
//           setVerificationStatus('✅ Payment verified successfully!');
//           setTimeout(() => {
//             navigate('/myorders');
//           }, 2000);
//         } else {
//           setVerificationStatus('❌ Payment verification failed.');
//           setTimeout(() => {
//             navigate('/');
//           }, 2000);
//         }
//       } catch (error) {
//         console.error('Verification error:', error);
//         setVerificationStatus('⚠️ An error occurred during verification.');
//         setTimeout(() => {
//           navigate('/');
//         }, 2000);
//       } finally {
//         setLoading(false);
//       }
//     };

//     verifyPayment();
//   }, [location.search, navigate, token?.userId]);

//   return (
//     <div className="flex flex-col justify-center items-center h-screen bg-white text-gray-800">
//       {loading ? (
//         <div className="flex flex-col items-center">
//           <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
//           <p className="mt-4 text-lg font-medium text-blue-600">Verifying Payment...</p>
//         </div>
//       ) : (
//         <div className="text-center text-xl font-semibold">
//           {verificationStatus}
//         </div>
//       )}
//     </div>
//   );
// };

// export default VerifyPayment;
