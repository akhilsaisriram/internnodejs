import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import aa from "./istockphoto-1335894702-2048x2048-transformed.jpeg";

const Registration = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [name, setName] = useState(""); // New state for name
  const [errorMessage, setErrorMessage] = useState(""); // State to store error messages
  const navigate = useNavigate();

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear any existing error messages

    const newUser = {
      username,
      name, // Include name in the user object
      password,
      profilePhoto,
      phone,
      dob,
      studentClass,
    };

    try {
      console.log(newUser);

      const response = await fetch("http://localhost:5000/students/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        alert("Registration successful!");
        navigate("/login");
      } else {
        const data = await response.json();
        setErrorMessage(data.message || "Registration failed"); // Set error message
      }
    } catch (error) {
      console.error("Error registering user:", error);
      setErrorMessage("An error occurred during registration. Please try again later."); // Generic error message
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${aa})`,
      }}
    >
      <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Register
        </h2>
        {errorMessage && (
          <div className="mb-4 text-red-600 text-center font-medium">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleRegister}>
          <div className="flex mb-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-1/2 p-3 border rounded mr-2"
              required
            />
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-1/2 p-3 border rounded"
              required
            />
          </div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-4 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 mb-4 border rounded"
            required
          />
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full p-3 mb-4 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Class"
            value={studentClass}
            onChange={(e) => setStudentClass(e.target.value)}
            className="w-full p-3 mb-4 border rounded"
            required
          />
          <div className="mb-4">
            <label className="block mb-2">Profile Photo</label>
            <input
              type="file"
              onChange={handlePhotoChange}
              className="w-full p-2 border rounded"
            />
            {profilePhoto && (
              <img
                src={profilePhoto}
                alt="Profile preview"
                className="mt-2 max-h-40 object-cover"
              />
            )}
          </div>
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
