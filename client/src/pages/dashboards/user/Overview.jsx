export default function Overview() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-3">
        Welcome back, {userInfo?.name}! 👋
      </h2>
      <p className="text-gray-600">
        Here’s your personal space to stay updated with societies and events.
      </p>
    </div>
  );
}
