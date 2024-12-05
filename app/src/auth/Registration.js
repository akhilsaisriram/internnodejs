import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const user = { username, password };
    sessionStorage.setItem("user", JSON.stringify(user));
    alert("Registration successful!");
    navigate("/login");
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
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Register
        </h2>
        <form onSubmit={handleRegister}>
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
            className="w-full bg-green-500 text-white py-3 rounded hover:bg-green-600"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Registration;
