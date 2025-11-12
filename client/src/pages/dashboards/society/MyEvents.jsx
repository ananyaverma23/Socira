import { useEffect, useState } from "react";
import axios from "axios";
import { X } from "lucide-react";

export default function MyEvents() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/events/society/${userInfo._id}`
        );
        setEvents(res.data);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [userInfo._id]);

  // Delete event
  const handleDelete = async (eventId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8000/api/events/${eventId}`);
      setEvents(events.filter((e) => e._id !== eventId));
    } catch (err) {
      console.error("Error deleting event:", err);
      alert("Failed to delete event");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64 text-indigo-600 text-lg font-medium">
        Loading your events...
      </div>
    );

  return (
    <div className="bg-white shadow rounded-xl p-8 w-full min-h-screen overflow-hidden">
      <h2 className="text-3xl font-bold text-indigo-700 mb-8 border-b pb-2">
        📋 My Events
      </h2>

      {events.length === 0 ? (
        <div className="text-center text-gray-600 mt-20">
          <p className="text-lg">You haven’t created any events yet.</p>
          <a
            href="/society/dashboard/create-event"
            className="text-indigo-600 underline font-medium mt-2 inline-block"
          >
            Create one now!
          </a>
        </div>
      ) : (
        <div className="flex flex-col gap-6 w-full">
          {events.map((event) => (
            <div
              key={event._id}
              className="flex flex-col sm:flex-row items-start sm:items-stretch w-full bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-transform duration-300 transform hover:-translate-y-1 hover:scale-[1.01] overflow-hidden"
            >
              {/* Poster (Left side) */}
              {event.poster && event.poster.trim() !== "" && (
                <div className="flex-shrink-0 w-full sm:w-64 h-48 sm:h-auto mb-4 sm:mb-0 sm:mr-6 overflow-hidden rounded-xl">
                  <img
                    src={
                      event.poster.startsWith("http")
                        ? event.poster
                        : `http://localhost:8000${event.poster}`
                    }
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              )}

              {/* Event Info (Right side) */}
              <div className="flex-1 min-w-0 flex flex-col justify-between w-full">
                <div className="overflow-hidden">
                  <h3 className="text-xl font-semibold text-indigo-700 mb-1 truncate sm:whitespace-normal sm:break-words">
                    {event.title}
                  </h3>
                  {event.tagline && (
                    <p className="text-indigo-500 italic text-sm mb-2 break-words">
                      {event.tagline}
                    </p>
                  )}
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed overflow-hidden text-ellipsis line-clamp-3 break-words">
                    {event.description}
                  </p>
                </div>

                <div className="mt-4 text-sm text-gray-500 flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
                  <p className="truncate sm:whitespace-normal sm:break-words">
                    📅 {new Date(event.date).toLocaleDateString("en-IN")} | 📍{" "}
                    {event.location}
                  </p>
                  <div className="flex gap-3 mt-3 sm:mt-0 flex-shrink-0">
                    <button
                      onClick={() => setSelectedEvent(event)}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition font-medium"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      {selectedEvent && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 px-4"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col relative overflow-hidden animate-fadeUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Image */}
            {selectedEvent.poster && (
              <div className="relative w-full h-64 flex-shrink-0 overflow-hidden">
                <img
                  src={
                    selectedEvent.poster.startsWith("http")
                      ? selectedEvent.poster
                      : `http://localhost:8000${selectedEvent.poster}`
                  }
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover transform transition-transform duration-500 scale-105 hover:scale-110"
                />
                {/* Gradient overlay for better text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
              </div>
            )}

            {/* Scrollable Content */}
            <div className="p-6 space-y-4 overflow-y-auto flex-1">
              <h2 className="text-2xl font-bold text-indigo-700 break-words">
                {selectedEvent.title}
              </h2>
              {selectedEvent.tagline && (
                <p className="text-indigo-500 italic text-sm">{selectedEvent.tagline}</p>
              )}
              <p className="text-gray-700 leading-relaxed whitespace-pre-line text-[15px] break-words">
                {selectedEvent.description}
              </p>
              <div className="text-sm text-gray-500 mt-4">
                📅{" "}
                {new Date(selectedEvent.date).toLocaleDateString("en-IN", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
                <br />
                📍 {selectedEvent.location}
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-3 right-3 bg-white/80 hover:bg-white text-gray-600 hover:text-indigo-600 transition rounded-full p-2 shadow-sm backdrop-blur-sm"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
