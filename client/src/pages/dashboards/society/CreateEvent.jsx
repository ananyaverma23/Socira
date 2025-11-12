import { useState } from "react";
import axios from "axios";

export default function CreateEvent() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [form, setForm] = useState({
    title: "",
    tagline: "",
    description: "",
    date: "",
    location: "",
    poster: "",
  });

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false); // ✅ used for upload state

  // Handle text input changes
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Handle image upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("poster", file);

    try {
      const { data } = await axios.post("http://localhost:8000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // ✅ Save full URL from backend response
      setForm({ ...form, poster: data.imageUrl });
      console.log("✅ Uploaded image:", data.imageUrl);
    } catch (error) {
      alert("❌ Image upload failed or server error.");
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  // Handle event creation
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://localhost:8000/api/events/create", {
        ...form,
        society: userInfo._id, // ✅ must match schema
      });
      alert("✅ Event posted successfully!");

      // Reset form
      setForm({
        title: "",
        tagline: "",
        description: "",
        date: "",
        location: "",
        poster: "",
      });
    } catch (err) {
      alert("❌ Error posting event");
      console.error("Post error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-indigo-600 mb-4">📝 Create a Post</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Description */}
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 h-28 resize-none"
          placeholder="What’s your society planning? ✨"
          required
        />

        {/* Title + Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400"
            placeholder="Event Title"
            required
          />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>

        {/* Location + Tagline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400"
            placeholder="Event Location"
            required
          />
          <input
            name="tagline"
            value={form.tagline}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400"
            placeholder="Tagline (optional)"
          />
        </div>

        {/* Upload Section */}
        <div className="border-dashed border-2 border-gray-300 rounded-lg p-4 text-center transition-all">
          {uploading ? (
            <p className="text-indigo-600 font-medium animate-pulse">
              Uploading image...
            </p>
          ) : (
            <>
              {form.poster ? (
                <img
                  src={form.poster}
                  alt="Event Poster"
                  className="w-full h-48 object-cover rounded-lg mb-3 shadow-sm"
                />
              ) : (
                <p className="text-gray-500 mb-2">
                  Drag & drop or click to upload event poster (optional)
                </p>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={uploading}
                className="mt-2 cursor-pointer text-indigo-600"
              />
            </>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || uploading}
          className={`w-full py-2 rounded-lg text-white transition duration-200 ${
            loading || uploading
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "Posting..." : "Post Event"}
        </button>
      </form>
    </div>
  );
}
