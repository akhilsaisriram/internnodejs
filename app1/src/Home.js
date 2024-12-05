import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Image, Spin } from "antd";

const Home = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [updatedStudent, setUpdatedStudent] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Check for authorization on mount
  useEffect(() => {
    if (!sessionStorage.getItem("isAllowed")) {
      console.log("Not authorized. Redirecting to login.");
      navigate("/login");
    }
  }, [navigate]);

  // Fetch students from the backend
  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/students");
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        setStudents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleEdit = (student) => {
    setEditingId(student._id);
    setUpdatedStudent(student);
  };

  const handleChange = (field, value) => {
    setUpdatedStudent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/students/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedStudent),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update student.");
      }
      setError("");
      const updatedData = await response.json();
      setStudents((prev) =>
        prev.map((student) =>
          student._id === editingId ? updatedData : student
        )
      );
      setEditingId(null);
    } catch (err) {
      setError(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/students/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete student.");
      }

      setStudents((prev) => prev.filter((student) => student._id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Student Management</h1>
        <button
          onClick={() => {
            sessionStorage.removeItem("isAllowed");
            navigate("/login");
          }}
          className="bg-red-500 text-white py-2 px-6 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {error && <p className="text-red-500 text-center mb-6">{error}</p>}

      {loading ? (
        <div className="flex justify-center">
          <Spin size="large" />
        </div>
      ) : students.length > 0 ? (
        <div className="flex flex-col overflow-auto">
          <table className="w-full bg-white shadow-md rounded-lg min-w-max">
            <thead className="bg-gray-200 text-gray-600 text-left">
              <tr>
                <th className="p-4">Photo</th>
                <th className="p-4">Name</th>
                <th className="p-4">Username</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Class</th>
                <th className="p-4">DOB</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id} className="border-b">
                  <td className="p-4">
                    {student.profilePhoto ? (
                      <Image
                        src={student.profilePhoto}
                        alt={student.name}
                        width={100}
                        height={100}
                      />
                    ) : (
                      <span className="text-gray-500">No Photo</span>
                    )}
                  </td>
                  {editingId === student._id ? (
                    <>
                      <td className="p-4">
                        <input
                          value={updatedStudent.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          className="border rounded p-2"
                        />
                      </td>
                      <td className="p-4">
                        <input
                          value={updatedStudent.username}
                          onChange={(e) =>
                            handleChange("username", e.target.value)
                          }
                          className="border rounded p-2"
                        />
                      </td>
                      <td className="p-4">
                        <input
                          value={updatedStudent.phone}
                          onChange={(e) => handleChange("phone", e.target.value)}
                          className="border rounded p-2"
                        />
                      </td>
                      <td className="p-4">
                        <input
                          value={updatedStudent.studentClass}
                          onChange={(e) =>
                            handleChange("studentClass", e.target.value)
                          }
                          className="border rounded p-2"
                        />
                      </td>
                      <td className="p-4">
                        <input
                          value={new Date(updatedStudent.dob)
                            .toISOString()
                            .substring(0, 10)}
                          onChange={(e) => handleChange("dob", e.target.value)}
                          className="border rounded p-2"
                          type="date"
                        />
                      </td>
                      <td className="p-4 flex gap-2">
                        <input
                          type="file"
                          onChange={(e) =>
                            handleChange("profilePhoto", URL.createObjectURL(e.target.files[0]))
                          }
                          className="border rounded p-2"
                        />
                        <input
                          type="password"
                          placeholder="New Password"
                          onChange={(e) =>
                            handleChange("password", e.target.value)
                          }
                          className="border rounded p-2"
                        />
                        <button
                          className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600"
                          onClick={handleSave}
                        >
                          Save
                        </button>
                        <button
                          className="bg-gray-500 text-white py-1 px-4 rounded hover:bg-gray-600"
                          onClick={handleCancel}
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-4">{student.name}</td>
                      <td className="p-4">{student.username}</td>
                      <td className="p-4">{student.phone}</td>
                      <td className="p-4">{student.studentClass}</td>
                      <td className="p-4">
                        {new Date(student.dob).toLocaleDateString()}
                      </td>
                      <td className="p-4 flex gap-2">
                        <button
                          className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
                          onClick={() => handleEdit(student)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600"
                          onClick={() => handleDelete(student._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No students found.</p>
      )}
    </div>
  );
};

export default Home;
