import React, { useState } from "react";

const ClassManagement = () => {
  const [classes, setClasses] = useState([
    { id: 1, name: "CS-A", capacity: 60 },
    { id: 2, name: "CS-B", capacity: 55 },
  ]);

  const [newClass, setNewClass] = useState({ name: "", capacity: "" });
  const [showForm, setShowForm] = useState(false);

  const handleAddClass = () => {
    if (!newClass.name || !newClass.capacity) return;
    setClasses([
      ...classes,
      { id: classes.length + 1, name: newClass.name, capacity: parseInt(newClass.capacity) },
    ]);
    setNewClass({ name: "", capacity: "" });
    setShowForm(false);
  };

  const handleDeleteClass = (id) => {
    setClasses(classes.filter((c) => c.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Class Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-lg"
        >
          + Add Class
        </button>
      </div>

      {/* Add Class Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Add Class</h3>
            <input
              type="text"
              placeholder="Class Name (e.g., CS-A)"
              value={newClass.name}
              onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
              className="w-full mb-3 px-3 py-2 rounded bg-gray-700"
            />
            <input
              type="number"
              placeholder="Capacity"
              value={newClass.capacity}
              onChange={(e) => setNewClass({ ...newClass, capacity: e.target.value })}
              className="w-full mb-3 px-3 py-2 rounded bg-gray-700"
            />

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 bg-gray-600 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleAddClass}
                className="flex-1 bg-cyan-500 hover:bg-cyan-600 py-2 rounded-lg"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Class Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((c) => (
          <div key={c.id} className="bg-gray-800 p-5 rounded-xl shadow hover:shadow-cyan-500/30">
            <h3 className="text-lg font-bold">{c.name}</h3>
            <p className="text-gray-400">Capacity: {c.capacity}</p>
            <button
              onClick={() => handleDeleteClass(c.id)}
              className="mt-4 bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassManagement;
