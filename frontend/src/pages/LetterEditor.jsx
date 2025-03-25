import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const LetterEditor = () => {
  const { letterId } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!letterId) return navigate("/dashboard");

    const fetchLetter = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/letters/getById/${letterId}`);
        const data = await response.json();
        if (data.success) {
          setTitle(data.letter.title);
          setContent(data.letter.content);
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    };

    fetchLetter();
  }, [letterId]);

  const saveLetter = async () => {
    await fetch(`http://localhost:5000/api/letters/update/${letterId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    navigate("/dashboard");
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Edit Letter</h1>
      <input value={title} onChange={(e) => setTitle(e.target.value)} className="border p-2 w-full mb-3" />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} className="border p-2 w-full mb-3" />
      <button onClick={saveLetter} className="bg-blue-500 text-white px-4 py-2">Save</button>
    </div>
  );
};

export default LetterEditor;
