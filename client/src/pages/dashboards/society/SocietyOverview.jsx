export default function SocietyOverview() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-3xl font-bold text-indigo-600 mb-3">Welcome, {userInfo?.name}! 👋</h2>
      <p className="text-gray-600 mb-8">
        Here’s your society control center — manage events, connect with members, and keep your community thriving.
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-indigo-50 border border-indigo-100 p-5 rounded-xl shadow-sm hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-indigo-700">📅 Upcoming Events</h3>
          <p className="text-3xl font-bold mt-2 text-indigo-600">2</p>
          <p className="text-gray-500 text-sm mt-1">events scheduled this month</p>
        </div>

        <div className="bg-pink-50 border border-pink-100 p-5 rounded-xl shadow-sm hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-pink-700">👥 Members</h3>
          <p className="text-3xl font-bold mt-2 text-pink-600">34</p>
          <p className="text-gray-500 text-sm mt-1">active society members</p>
        </div>

        <div className="bg-green-50 border border-green-100 p-5 rounded-xl shadow-sm hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-green-700">Past Events</h3>
          <p className="text-3xl font-bold mt-2 text-green-600">12</p>
          <p className="text-gray-500 text-sm mt-1">Events already take place</p>
        </div>
      </div>

      {/* Quick Actions */}
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Quick Actions</h3>
      <div className="flex flex-wrap gap-4">
        <button
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition shadow"
          onClick={() => (window.location.href = "/society/dashboard/create-event")}
        >
          🗓️ Create Event
        </button>

        <button
          className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition shadow"
          onClick={() => (window.location.href = "/society/dashboard/chat")}
        >
          💬 Open Chat Room
        </button>

        <button
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition shadow"
          onClick={() => (window.location.href = "/society/dashboard/members")}
        >
          👥 View Members
        </button>
      </div>

      {/* Optional Section */}
      <div className="mt-10 bg-indigo-50 border border-indigo-100 p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-indigo-700 mb-2">📢 Latest Update</h3>
        <p className="text-gray-600">
          You recently hosted <span className="font-semibold">TechConnect 2025</span> — 120 students attended! 
          Keep your community engaged by planning your next event.
        </p>
      </div>
    </div>
  );
}
