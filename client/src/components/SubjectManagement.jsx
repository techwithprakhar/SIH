import React, { useContext, useState } from "react";
import { SubjectContext } from "./SubjectContext";

const semesters = [
  "1st Semester",
  "2nd Semester",
  "3rd Semester",
  "4th Semester",
  "5th Semester",
  "6th Semester",
  "7th Semester",
  "8th Semester",
];

const SubjectManagement = () => {
  const { subjects, setSubjects } = useContext(SubjectContext);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    credits: "",
    semester: "",
    department: "Computer Science",
    description: "",
  });

  const openForm = (subject = null) => {
    if (subject) {
      setEditId(subject.id);
      setFormData({
        name: subject.name,
        code: subject.code,
        credits: String(subject.credits),
        semester: subject.semester,
        department: subject.department,
        description: subject.description,
      });
    } else {
      setEditId(null);
      setFormData({
        name: "",
        code: "",
        credits: "",
        semester: "",
        department: "Computer Science",
        description: "",
      });
    }
    setShowForm(true);
  };

  const closeForm = () => setShowForm(false);

  const handleSave = () => {
    if (!formData.name || !formData.code || !formData.semester) return;
    const entry = {
      id: editId || Date.now(),
      ...formData,
      credits: parseInt(formData.credits) || 0,
    };
    if (editId) {
      setSubjects(subjects.map((s) => (s.id === editId ? entry : s)));
    } else {
      setSubjects([...subjects, entry]);
    }
    closeForm();
  };

  const handleDelete = (id) => setSubjects(subjects.filter((s) => s.id !== id));

  return (
    <div
      className="min-h-screen p-8"
      style={{
        background: `
          radial-gradient(circle at top left, rgba(104,29,148,0.35) 0%, transparent 40%),
          radial-gradient(circle at bottom right, rgba(0,212,255,0.35) 0%, transparent 40%),
          linear-gradient(135deg, #0a0a1a 0%, #000000 100%)
        `,
      }}
    >
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-black bg-gradient-to-r from-purple-700 via-pink-600 to-cyan-700 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(104,29,148,0.8)]">
            Manage Your Subjects
          </h2>
          <p className="text-gray-300 mt-2 max-w-lg">
            Add, edit, or remove subjects offered in your B.Tech curriculum.
          </p>
        </div>
        <button
          onClick={() => openForm()}
          className="px-6 py-3 rounded-full font-bold text-white bg-gradient-to-r from-purple-700 via-pink-600 to-cyan-700 shadow-[0_0_20px_rgba(104,29,148,0.8)] hover:shadow-[0_0_35px_rgba(204,65,122,1)] transition"
        >
          + Add Subject
        </button>
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((sub) => (
          <div
            key={sub.id}
            className="relative p-5 rounded-2xl bg-black/60 border border-purple-700 shadow-[0_0_25px_rgba(104,29,148,0.5)] hover:shadow-[0_0_45px_rgba(204,65,122,0.8)] transition"
          >
            <div className="absolute top-3 right-3 flex gap-2">
              <button
                onClick={() => openForm(sub)}
                className="text-green-400 hover:text-green-600"
                title="Edit Subject"
              >
                ✎
              </button>
              <button
                onClick={() => handleDelete(sub.id)}
                className="text-red-400 hover:text-red-600"
                title="Delete Subject"
              >
                ✖
              </button>
            </div>

            <h3 className="text-xl font-bold mb-1 text-white">{sub.name}</h3>
            <p className="text-gray-400 mb-1">
              Code: <span className="font-medium">{sub.code}</span>
            </p>
            <p className="text-cyan-300 mb-1">
              Department: <span className="font-medium">{sub.department}</span>
            </p>
            <p className="text-cyan-300 mb-1">
              Semester: <span className="font-medium">{sub.semester}</span>
            </p>
            <p className="text-cyan-300 mb-1">
              Credits: <span className="font-medium">{sub.credits}</span>
            </p>
            {sub.description && (
              <p className="text-gray-300 mt-1">{sub.description}</p>
            )}
          </div>
        ))}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-black/80 border border-purple-700 rounded-3xl p-8 w-full max-w-md shadow-[0_0_40px_rgba(104,29,148,0.8)]">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-cyan-700 bg-clip-text text-transparent">
              {editId ? "Edit Subject" : "Add New Subject"}
            </h3>

            <input
              type="text"
              placeholder="Subject Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full mb-3 px-4 py-2 rounded-xl bg-black/40 border border-purple-700 text-white focus:ring-2 focus:ring-pink-600"
            />

            <input
              type="text"
              placeholder="Code (e.g., CS401)"
              value={formData.code}
              onChange={(e) =>
                setFormData({ ...formData, code: e.target.value })
              }
              className="w-full mb-3 px-4 py-2 rounded-xl bg-black/40 border border-purple-700 text-white focus:ring-2 focus:ring-pink-600"
            />

            <div className="grid grid-cols-2 gap-3 mb-3">
              <input
                type="number"
                placeholder="Credits"
                value={formData.credits}
                onChange={(e) =>
                  setFormData({ ...formData, credits: e.target.value })
                }
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-purple-700 text-white focus:ring-2 focus:ring-pink-600"
              />
              <select
                value={formData.semester}
                onChange={(e) =>
                  setFormData({ ...formData, semester: e.target.value })
                }
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-purple-700 text-white focus:ring-2 focus:ring-pink-600"
              >
                <option value="">Select Semester</option>
                {semesters.map((sem) => (
                  <option key={sem} value={sem}>
                    {sem}
                  </option>
                ))}
              </select>
            </div>

            <textarea
              placeholder="Description (optional)"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full mb-4 px-4 py-2 rounded-xl bg-black/40 border border-purple-700 text-white focus:ring-2 focus:ring-pink-600"
            />

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={closeForm}
                className="px-5 py-2 rounded-xl border border-gray-600 hover:bg-gray-800 text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2 rounded-xl font-bold text-white bg-gradient-to-r from-purple-700 via-pink-600 to-cyan-700 shadow-[0_0_15px_rgba(104,29,148,0.8)] hover:shadow-[0_0_30px_rgba(204,65,122,1)] transition"
              >
                {editId ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectManagement;
