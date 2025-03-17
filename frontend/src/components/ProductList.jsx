import React from 'react'

const products = [
    { id: 1, name: "Blood Glucose Monitor", price: "₹1,999", img: "/images/glucose-monitor.jpg" },
    { id: 2, name: "Insulin Kit", price: "₹999", img: "/images/insulin-kit.jpg" },
    { id: 3, name: "Sugar-Free Cookies", price: "₹249", img: "/images/sugar-free-cookies.jpg" },
    { id: 4, name: "Fitness Band", price: "₹1,299", img: "/images/fitness-band.jpg" }
  ];

const ProductList = () => {
  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-12">
    <h2 className="text-3xl font-bold text-[#25BF76] text-center mb-4">
      Medically Approved Products in One Place
    </h2>
    <p className="text-gray-600 text-center mb-8">
      Ensure authenticity and reliability with our curated product selection.
    </p>

    {/* Responsive Grid Layout */}
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {products.map(product => (
        <div key={product.id} className="bg-white shadow-md rounded-2xl p-3 border border-gray-200 hover:shadow-lg transition duration-300">
          <img src={product.img} alt={product.name} className="w-full h-40 object-cover rounded-lg mb-3" />
          <h3 className="text-sm font-semibold text-gray-800">{product.name}</h3>
          <p className="text-[#25BF76] font-bold text-sm">{product.price}</p>
          <button className="mt-2 bg-[#25BF76] text-white px-3 py-1.5 text-sm rounded-xl hover:bg-green-700 transition">
            Add to Cart
          </button>
        </div>
      ))}
    </div>

    <div className="text-center mt-10">
      <a href="/shop" className="bg-[#25BF76] text-white px-6 py-3 rounded-full shadow-md hover:bg-green-700 transition">
        Shop Now
      </a>
    </div>
  </div>  
  )
}

export default ProductList;
