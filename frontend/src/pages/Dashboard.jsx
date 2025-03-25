import { useEffect, useState } from "react";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [letters, setLetters] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ Track loading state
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchLetters(user.uid);
      } else {
        setLoading(false); // ✅ Ensure loading stops if no user
      }
    });

    return () => unsubscribe(); // ✅ Cleanup on unmount
  }, []);

  const fetchLetters = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/letters/get/${userId}`);
      const data = await response.json();
      if (data.success) {
        setLetters(data.letters);
      }
    } catch (error) {
      console.error("Network error:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteLetter = async (letterId) => {
    if (!window.confirm("Are you sure you want to delete this letter?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/letters/delete/${letterId}`, { method: "DELETE" });
      const data = await response.json();
      if (data.success) {
        setLetters((prevLetters) => prevLetters.filter((letter) => letter.id !== letterId));
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>; // ✅ Show loading state

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Your Saved Letters</h1>
      {letters.length === 0 ? (
        <p className="text-gray-500">No letters found. Start writing a new letter!</p>
      ) : (
        <ul className="space-y-2">
          {letters.map((letter) => (
            <li key={letter.id} className="p-3 border rounded-md shadow-sm">
              <h2 className="text-lg font-semibold">{letter.title}</h2>
              <button onClick={() => navigate(`/editor/${letter.id}`)} className="text-blue-500 mr-2">Edit</button>
              <button onClick={() => deleteLetter(letter.id)} className="text-red-500">Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
