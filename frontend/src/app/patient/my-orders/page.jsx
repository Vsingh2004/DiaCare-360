"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("my-orders")) || [];
    setOrders(savedOrders);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <p className="text-lg">Loading your orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center min-h-[80vh]">
          <p className="text-lg font-semibold">You have no orders yet 🧾</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>

        {orders.map((order, index) => (
          <div
            key={index}
            className="bg-white border border-gray-300 rounded-lg shadow-sm p-6 mb-8"
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <div>
                <h2 className="text-xl font-semibold mb-1">
                  Order #{index + 1}
                </h2>
                <p className="text-sm text-gray-500">
                  Placed on: {order.date || new Date().toLocaleString()}
                </p>
              </div>
              <button className="mt-2 md:mt-0 bg-red-100 text-gray-700 px-4 py-2 rounded-md hover:bg-red-200 transition-all">
                Track Order
              </button>
            </div>

            {/* Delivery Info */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Delivery Information</h3>
              <div className="text-sm text-gray-700 space-y-1">
                <p>
                  {order.customerInfo.firstName}{" "}
                  {order.customerInfo.lastName}
                </p>
                <p>{order.customerInfo.email}</p>
                <p>{order.customerInfo.phone}</p>
                <p>
                  {order.customerInfo.street}, {order.customerInfo.city},{" "}
                  {order.customerInfo.state} - {order.customerInfo.zipcode},{" "}
                  {order.customerInfo.country}
                </p>
              </div>
            </div>

            {/* Items Ordered */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Items Ordered</h3>
              <div className="divide-y">
                {order.cart.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between py-2 text-sm"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-gray-500">
                        ₹{item.price} × {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="border-t pt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Subtotal</span>
                <span>₹{order.totalAmount}</span>
              </div>
              <div className="flex justify-between text-sm mb-1">
                <span>Delivery Fee</span>
                <span>₹{order.deliveryFee}</span>
              </div>
              <div className="flex justify-between font-bold text-base">
                <span>Total</span>
                <span>₹{order.finalTotal}</span>
              </div>
              <div className="mt-3 flex items-center gap-2 text-sm">
                <span className="text-red-500 text-xl leading-none">&bull;</span>
                <span className="font-medium text-gray-700">{order.status || "Pending"}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MyOrders;
