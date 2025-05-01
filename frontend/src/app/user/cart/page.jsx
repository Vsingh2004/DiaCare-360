"use client";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <h1 className="text-2xl font-semibold">Your Cart is Empty 🛒</h1>
        <Link href="/marketplace" className="mt-4 text-blue-600 hover:underline">
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-13">
      <Navbar />

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="grid grid-cols-7 gap-4 mb-4 border-b pb-4">
          <p className="text-gray-600">Items</p>
          <p className="col-span-2 text-gray-600">Title</p>
          <p className="text-gray-600">Price</p>
          <p className="text-gray-600">Quantity</p>
          <p className="text-gray-600">Total</p>
          <p className="text-gray-600">Remove</p>
        </div>

        {cart.map((item) => (
          <div key={item._id} className="grid grid-cols-7 gap-4 items-center py-4 border-b">
            <img src={item.image} alt={item.name} className="w-16 h-16 object-contain rounded-lg" />
            <div className="col-span-2">
              <h2 className="font-semibold">{item.name}</h2>
            </div>
            <p>₹{item.price}</p>
            <p>x {item.quantity}</p>
            <p>₹{item.price * item.quantity}</p>
            <Button
              variant="outline"
              onClick={() => removeFromCart(item._id)}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </Button>
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-center mt-8 space-y-4 lg:space-y-0 lg:space-x-6">
        <div className="bg-white shadow-md rounded-lg p-6 w-full lg:w-1/3">
          <h2 className="text-xl font-bold mb-6">Cart Totals</h2>
          <div className="flex justify-between mb-4">
            <p className="text-gray-600">Subtotal</p>
            <p>₹{totalAmount}</p>
          </div>
          <div className="flex justify-between mb-4">
            <p className="text-gray-600">Delivery Fee</p>
            <p>₹{totalAmount === 0 ? 0 : 2}</p>
          </div>
          <div className="flex justify-between font-bold mb-6">
            <p>Total</p>
            <p>₹{totalAmount === 0 ? 0 : totalAmount + 2}</p>
          </div>
          <Button variant="outline" className="w-full py-3" onClick={() => console.log("Proceeding to Checkout")}>
            Proceed to Checkout
          </Button>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 w-full lg:w-1/3">
          <h2 className="text-xl font-bold mb-6">Promo Code</h2>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Enter Promo Code"
              className="p-2 border rounded-lg w-full"
            />
            <Button className="w-24">Apply</Button>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <Button onClick={clearCart} className="text-red-500 hover:text-red-700">
          Clear Cart
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
