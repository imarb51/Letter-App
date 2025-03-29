import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { auth } from "../services/firebase"; // Import Firebase auth

const LetterEditor = () => {
  const { letterId } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!letterId) {
      // New letter; no need to fetch anything
      return;
    }

    const fetchLetter = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/letters/getById/${letterId}`);
        const data = await response.json();
        if (data.success) {
          setTitle(data.letter.title);
          setContent(data.letter.content);
        } else {
          console.error("Letter not found");
          navigate("/dashboard"); // Redirect if letter doesn't exist
        }
      } catch (error) {
        console.error("Network error:", error);
        navigate("/dashboard");
      }
    };

    fetchLetter();
  }, [letterId, navigate]);

  const saveLetter = async () => {
    const userId = auth.currentUser?.uid; // Get current user's ID
    if (!userId) {
      console.error("User not authenticated");
      navigate("/login"); // Redirect to login if not authenticated
      return;
    }

    try {
      if (letterId) {
        // Update existing letter
        await fetch(`http://localhost:5000/api/letters/update/${letterId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, content }),
        });
      } else {
        // Create new letter
        await fetch(`http://localhost:5000/api/letters/save`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, title, content }),
        });
      }
      navigate("/dashboard");
    } catch (error) {
      console.error("Error saving letter:", error);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">{letterId ? "Edit Letter" : "Create Letter"}</h1>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full mb-3"
        placeholder="Title"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border p-2 w-full mb-3"
        placeholder="Content"
      />
      <button onClick={saveLetter} className="bg-blue-500 text-white px-4 py-2">
        Save
      </button>
    </div>
  );
};

export default LetterEditor;