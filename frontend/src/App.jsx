import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LetterEditor from "./pages/LetterEditor";
import Login from "./pages/Login";
import { auth } from "./services/firebase"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/editor" element={<LetterEditor />} />
        <Route path="/editor/:letterId" element={<LetterEditor />} />
        <Route path="*" element={<h1 className="text-center text-red-500">404 - Page Not Found</h1>} />

      </Routes>
    </Router>
  );
}

export default App;
