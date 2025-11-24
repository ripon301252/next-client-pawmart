import React, { useState } from "react";
import { toast } from "react-hot-toast";

const OrderModal = ({ item, userEmail, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConfirmOrder = async () => {
    if (!userEmail)
      return toast.error("You must be logged in to place an order");
    if (!address || !phone || !date)
      return toast.error("Please fill in all required fields!");

    setLoading(true);
    try {
      const orderData = {
        itemId: item._id,
        name: item.name,
        category: item.category,
        price: item.price,
        location: item.location,
        email: userEmail,
        quantity,
        address,
        phone,
        date,
        orderTime: new Date(),
      };

      const res = await fetch("https://pawmart-server-psi.vercel.app/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(" Order placed successfully!");
        onClose();
      } else {
        toast.error(data.message || "Failed to place order");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-3 backdrop-blur-sm">
      <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl shadow-2xl w-full max-w-lg sm:max-w-md md:max-w-xl overflow-hidden animate-scaleIn">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-md text-white p-3 sm:p-4 text-center border-b border-white/20">
          <h2 className="text-lg sm:text-xl font-bold">Confirm Your Order</h2>
          <p className="text-xs sm:text-sm opacity-80">
            Review and complete your order details below
          </p>
        </div>

        {/* Body */}
        <div className="p-4 flex flex-col md:flex-row gap-4 max-h-[75vh] overflow-y-auto">
          {/* Left Side */}
          <div className="flex-1 space-y-2 text-sm sm:text-base text-white">
            <p>
              <strong>Product:</strong> {item.name}
            </p>
            <p>
              <strong>Category:</strong> {item.category}
            </p>
            <p>
              <strong>Price:</strong>{" "}
              {item.price === 0 ? (
                <span className="text-green-400 font-semibold">
                  Free for Adoption 🐾
                </span>
              ) : (
                <span className="text-[#e0e0ff] font-semibold">
                  ৳ {item.price}
                </span>
              )}
            </p>
            <p>
              <strong>Location:</strong> {item.location}
            </p>

            {/* Inputs */}
            <div className="space-y-2">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Your Address"
                className="w-full bg-white/10 text-white placeholder-white/70 border border-white/30 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#5633e4] outline-none backdrop-blur-sm"
              />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number"
                className="w-full bg-white/10 text-white placeholder-white/70 border border-white/30 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#5633e4] outline-none backdrop-blur-sm"
              />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-white/10 text-white placeholder-white/70 border border-white/30 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#5633e4] outline-none backdrop-blur-sm"
              />
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full bg-white/10 text-white placeholder-white/70 border border-white/30 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#5633e4] outline-none backdrop-blur-sm"
              />
            </div>

            <button
              onClick={handleConfirmOrder}
              disabled={loading}
              className={`w-full mt-3 py-2.5 rounded-lg cursor-pointer font-semibold text-white transition-transform transform hover:scale-105 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#5b46b1] hover:bg-[#654dc7] hover:opacity-90"
              }`}
            >
              {loading ? "Placing Order..." : "Confirm Order"}
            </button>
          </div>

          {/* Right Side */}
          <div className="flex flex-col items-center gap-2 w-full md:w-48">
            <div className="w-full h-40 rounded-xl overflow-hidden shadow-md">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={onClose}
              className="w-full py-2 bg-[#5b46b1] hover:bg-[#654dc7] text-white rounded-lg font-medium text-sm transition-transform transform hover:scale-105 mt-1 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
