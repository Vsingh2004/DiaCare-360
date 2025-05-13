"use client";
import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import axios from "axios";

const PlaceOrder = () => {
  const { cart } = useCart();
  const router = useRouter();

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = totalAmount === 0 ? 0 : 2;
  const finalTotal = totalAmount + deliveryFee;

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // Dynamically load Razorpay script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const orderDetails = {
      customerInfo: data,
      cart,
      totalAmount,
      deliveryFee,
      finalTotal,
    };

    const res = await loadRazorpayScript();

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    try {
      // Step 1: Create order on backend
      const backendResponse = await axios.post("http://localhost:5000/order/place", {
        amount: finalTotal * 100, // in paise
      });

      const { id: orderId, amount, currency } = backendResponse.data;

      // Step 2: Launch Razorpay modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // public key
        amount: amount,
        currency: currency,
        name: "DiaCare 360",
        description: "Order Payment",
        image: "/logo.png", // Your logo
        order_id: orderId,
        handler: async function (response) {
          try {
            const verifyRes = await axios.post("http://localhost:5000/order/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderDetails: {
                ...orderDetails,
                date: new Date().toLocaleString(),
              },
            });

            if (verifyRes.data.success) {
              alert("Order placed successfully!");
              router.push("/my-orders");
            } else {
              alert("Payment verification failed.");
            }
          } catch (err) {
            console.error("Error verifying payment", err);
            alert("Payment verification error.");
          }
        },
        prefill: {
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          contact: data.phone,
        },
        notes: {
          address: `${data.street}, ${data.city}, ${data.state}`,
        },
        theme: {
          color: "#007bff",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error("Error placing order", err);
      alert("Error placing order. Please try again.");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <h1 className="text-2xl font-semibold">Your Cart is Empty 🛒</h1>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <form
        onSubmit={onSubmit}
        className="flex flex-col lg:flex-row gap-10 px-4 lg:px-20 py-10 w-full max-w-7xl mx-auto mt-10"
      >
        {/* LEFT - Delivery Info */}
        <div className="flex-1">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">Delivery Information</h2>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <input
                type="text"
                name="firstName"
                value={data.firstName}
                onChange={onChangeHandler}
                placeholder="First Name"
                required
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                name="lastName"
                value={data.lastName}
                onChange={onChangeHandler}
                placeholder="Last Name"
                required
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={onChangeHandler}
              placeholder="Email Address"
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              name="street"
              value={data.street}
              onChange={onChangeHandler}
              placeholder="Street Address"
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            <div className="flex gap-4">
              <input
                type="text"
                name="city"
                value={data.city}
                onChange={onChangeHandler}
                placeholder="City"
                required
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                name="state"
                value={data.state}
                onChange={onChangeHandler}
                placeholder="State"
                required
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex gap-4">
              <input
                type="text"
                name="zipcode"
                value={data.zipcode}
                onChange={onChangeHandler}
                placeholder="Zip Code"
                required
                className="w-full p-3 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                name="country"
                value={data.country}
                onChange={onChangeHandler}
                placeholder="Country"
                required
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
            <input
              type="text"
              name="phone"
              value={data.phone}
              onChange={onChangeHandler}
              placeholder="Phone Number"
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* RIGHT - Order Summary */}
        <div className="flex-1 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Order Summary</h2>
          <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto">
            {cart.map((item) => (
              <div key={item._id} className="flex justify-between items-center border-b pb-2">
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    ₹{item.price} × {item.quantity}
                  </p>
                </div>
                <p className="font-semibold">₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between mb-2">
              <p>Subtotal</p>
              <p>₹{totalAmount}</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>Delivery Fee</p>
              <p>₹{deliveryFee}</p>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <p>Total</p>
              <p>₹{finalTotal}</p>
            </div>
          </div>

          <Button type="submit" className="w-full mt-6 py-3 text-white">
            Pay & Place Order
          </Button>
        </div>
      </form>
    </>
  );
};

export default PlaceOrder;
