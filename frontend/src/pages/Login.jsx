import { useEffect, useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../services/firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const signIn = async () => {
    try {
      console.log("Google Sign-In Clicked");  // Debugging
      const result = await signInWithPopup(auth, provider);
      console.log("User Signed In:", result.user);
      localStorage.setItem("user", JSON.stringify(result.user));
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Login Error:", error);
    }
  };
  
  const signOut = () => {
    auth.signOut();
    localStorage.removeItem("user");
    setUser(null);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Welcome to Letter Editor</h1>
      {user ? (
        <div className="text-center">
          <p className="text-lg mb-4">Signed in as {user.displayName}</p>
          <button
            onClick={signOut}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Sign Out
          </button>
          <button
            onClick={() => console.log("Test Button Clicked")}
            className="bg-blue-500 text-white px-6 py-3 rounded-md"
          >
            Test Button
          </button>

        </div>
      ) : (
        <button
          onClick={signIn}
          className="bg-black text-white px-6 py-3 rounded-md text-lg"
        >
          Sign in with Google
        </button>
      )}
    </div>
  );
};

export default Login;
