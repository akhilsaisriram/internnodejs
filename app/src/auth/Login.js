import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(sessionStorage.getItem("user"));

    if (storedUser && storedUser.username === username && storedUser.password === password) {
      sessionStorage.setItem("isAllowed", "true");
      navigate("/home");
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://media.istockphoto.com/id/1335894702/photo/little-girl-using-macbook.jpg?s=2048x2048&w=is&k=20&c=zxc88bLBIiXZK-f-bEQBY_K18n_ryUW354eG1RoFoZI=')",
      }}
    >
      <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 mb-4 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-6 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
