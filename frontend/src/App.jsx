import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "./screens/HomePage";
import AuthPage from "./screens/AuthPage";
import NotesListPage from "./screens/NotesListPage";
import CreateNotePage from "./screens/CreateNotePage";
import NoteViewPage from './screens/NoteViewPage';
import NoteEditorPage from "./screens/NoteEditorPage";

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
              <NotesListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notes/new"
          element={
            <ProtectedRoute>
              <CreateNotePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notes/:id" // Add this route for viewing a single note
          element={<ProtectedRoute><NoteViewPage /></ProtectedRoute>}
        />
        <Route
          path="/notes/:id/edit"
          element={<ProtectedRoute><NoteEditorPage /></ProtectedRoute>}
        />
      </Routes>

    </>
  );
}

export default App
