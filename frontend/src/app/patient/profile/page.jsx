// "use client";
// import React, { useState } from 'react';
// import EditProfile from '@/components/Patient/Profile/EditProfile';
// // import MyOrders from '@/components/Patient/Profile/MyOrders';
// // import Favorites from '@/components/Patient/Profile/Favorites';
// import SavedAddresses from '@/components/Patient/Profile/SavedAddresses';
// import LanguageSelector from '@/components/Patient/Profile/LanguageSelector';
// import Reviews from '@/components/Patient/Profile/Reviews';
// import FAQs from '@/components/Patient/Profile/FAQ';
// import Subscription from '@/components/Patient/Profile/Subscription';
// import SupportHelp from '@/components/Patient/Profile/SupportHelp';

// const ProfilePage = () => {
//   const [activeSection, setActiveSection] = useState('EditProfile');

//   const sections = [
//     { name: 'Edit Profile', component: <EditProfile /> },
//     // { name: 'My Orders', component: <MyOrders /> },
//     // { name: 'Favorites & Saved Items', component: <Favorites /> },
//     { name: 'Saved Addresses', component: <SavedAddresses /> },
//     { name: 'Select Language', component: <LanguageSelector /> },
//     { name: 'Reviews', component: <Reviews /> },
//     { name: 'Browse FAQs', component: <FAQs /> },
//     { name: 'Subscription & Membership', component: <Subscription /> },
//     { name: 'Support & Help', component: <SupportHelp /> },
//   ];

//   return (
//     <div className="flex flex-col md:flex-row gap-4 p-4 mt-15">
//       {/* Sidebar */}
//       <div className="w-full md:w-1/4 bg-white shadow-md rounded-lg p-4">
//         <h2 className="text-xl font-semibold mb-4 text-gray-800">Dashboard</h2>
//         <div className="space-y-2">
//           {sections.map((section, index) => (
//             <div
//               key={index}
//               className={`cursor-pointer p-5 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors ${
//                 activeSection === section.name ? 'bg-blue-500 text-white' : 'bg-gray-100'
//               }`}
//               onClick={() => setActiveSection(section.name)}
//             >
//               {section.name}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="w-full md:w-3/4 bg-white shadow-md rounded-lg p-4">
//         <div className="text-xl font-semibold text-gray-800 mb-4">
//           {activeSection}
//         </div>
//         <div className="border-t pt-4">
//           {sections.find((section) => section.name === activeSection)?.component}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;
