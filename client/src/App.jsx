import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserRoutes from './router/UserRoutes';
// We will add SocietyRoutes here later

function App() {
  return (
    <Routes>
      {/* All user-facing routes (/, /login, /profile, etc.) */}
      <Route path="/*" element={<UserRoutes />} />

      {/* All society-facing routes (/society/dashboard, etc.) */}
      {/* <Route path="/society/*" element={<SocietyRoutes />} /> */}
    </Routes>
  );
}

export default App;