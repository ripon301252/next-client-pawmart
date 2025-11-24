import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-hot-toast";
import { Typewriter } from "react-simple-typewriter";

const EditListing = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "Pets",
    price: 0,
    location: "",
    description: "",
    image: "",
    date: "",
    email: user?.email || "",
  });

  const [isPets, setIsPets] = useState(true);
  const [loading, setLoading] = useState(true);

  // Fetch listing
  useEffect(() => {
    fetch(`https://pawmart-server-psi.vercel.app/stores/details/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          name: data.name || "",
          category: data.category || "Pets",
          price: data.price || 0,
          location: data.location || "",
          description: data.description || "",
          image: data.image || "",
          date: data.date || "",
          email: data.email || user?.email || "",
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load listing!");
        setLoading(false);
      });
  }, [id, user?.email]);

  // Disable price if category is Pets
  useEffect(() => {
    setIsPets(formData.category === "Pets");
    if (formData.category === "Pets") {
      setFormData((prev) => ({ ...prev, price: 0 }));
    }
  }, [formData.category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.location || !formData.image) {
      toast.error("Please fill all required fields!");
      return;
    }

    try {
      const res = await fetch(
        `https://pawmart-server-psi.vercel.app/stores/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error("Failed to update listing");

      await res.json();
      toast.success("Listing updated successfully!");
      navigate("/myListing");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update listing!");
    }
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-700 dark:text-gray-200">
        Loading...
      </p>
    );

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-8">
      <div className="flex justify-center items-center mb-6">
        <h2 className="text-4xl sm:text-4xl font-bold  text-white dark:text-gray-100">
          🐾
          <Typewriter
            words={[" Edit Listing"]}
            loop={true}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </h2>
      </div>

      <form
        onSubmit={handleUpdate}
        className="flex flex-col gap-4 bg-white backdrop-blur-lg bg-white/10 p-6 sm:p-8 rounded-2xl shadow-lg"
      >
        <input
          type="text"
          name="name"
          placeholder="Product / Pet Name *"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5633e4] backdrop-blur-lg bg-white/10 dark:border-gray-100 transition"
          required
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg text-white focus:outline-none focus:ring-2  focus:ring-[#5633e4] backdrop-blur-lg bg-white/10 dark:border-gray-100 transition"
        >
          <option className="text-black">Pets</option>
          <option className="text-black">Pet Food</option>
          <option className="text-black">Accessories</option>
          <option className="text-black">Pet Care Products</option>
        </select>

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          min="0"
          disabled={isPets}
          className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5633e4] transition ${
            isPets
              ? "bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
              : "backdrop-blur-lg bg-white/10 dark:border-gray-100"
          }`}
        />

        <input
          type="text"
          name="location"
          placeholder="Location *"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5633e4] backdrop-blur-lg bg-white/10 dark:border-gray-100 transition"
          required
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5633e4] backdrop-blur-lg bg-white/10 dark:border-gray-100 transition"
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL *"
          value={formData.image}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5633e4] backdrop-blur-lg bg-white/10 dark:border-gray-100 transition"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5633e4] backdrop-blur-lg bg-white/10 dark:border-gray-100 transition"
          rows={4}
        ></textarea>

        <input
          type="email"
          name="email"
          value={formData.email}
          readOnly
          className="w-full p-3 border rounded-lg backdrop-blur-lg bg-white/10 dark:text-gray-300 cursor-not-allowed"
        />

        <button
          type="submit"
          className="mt-3 bg-gradient-to-r from-[#5633e4] to-[#654dc7] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-transform transform hover:scale-105"
        >
          Update Listing
        </button>
      </form>
    </div>
  );
};

export default EditListing;
