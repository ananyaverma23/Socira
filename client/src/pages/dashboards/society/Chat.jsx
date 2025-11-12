export default function Chat() {
  return (
    <div className="bg-white shadow rounded-xl p-6 h-[calc(100vh-180px)] flex flex-col">
      <h2 className="text-2xl font-bold text-indigo-600 mb-4">💬 Society Chat Room</h2>

      {/* Chat Messages */}
      <div className="flex-1 bg-indigo-50 rounded-lg p-4 overflow-y-auto mb-4 shadow-inner">
        <p className="text-gray-600 italic text-center mt-20">
          No messages yet — start the conversation with your society team!
        </p>
      </div>

      {/* Chat Input */}
      <form className="flex gap-3">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          disabled
        />
        <button
          type="button"
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
          disabled
        >
          Send
        </button>
      </form>

      <p className="text-sm text-gray-500 mt-3 text-center italic">
        (Chat functionality coming soon!)
      </p>
    </div>
  );
}
