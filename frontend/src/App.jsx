import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "./screens/HomePage";
import AuthPage from "./screens/AuthPage";

const ProtectedRoute = ({ children }) => {
  const { isAuth } = useSelector((state) => state.auth);
  return isAuth ? children : <Navigate to="/auth" />;
};

function App() {
  const modalOpen = useSelector(s => s.auth.authModalOpen);
  console.log(modalOpen)
  const { isAuth } = useSelector(s => s.auth);

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={isAuth ? "/notes" : "/auth"} />} />
        <Route path="/auth" element={isAuth ? <Navigate to="/notes" /> : <AuthPage />} />
        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />  
      </Routes>
    </>
  );
}

export default App
