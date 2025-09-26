import React, { useContext, useState, useEffect } from "react";
import { SubjectContext } from "./SubjectContext";

const FacultyManagement = () => {
  const { subjects } = useContext(SubjectContext);

  const [list, setList] = useState([
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@college.edu",
      department: "Computer Science",
      subjects: ["Data Structures and Algorithms", "Database Management Systems"],
      availableHours: 15,
      allottedHours: 5,
      workload: 33,
    },
    {
      id: 2,
      name: "Prof. Michael Chen",
      email: "michael.chen@college.edu",
      department: "Mathematics",
      subjects: ["Computer Networks"],
      availableHours: 18,
      allottedHours: 6,
      workload: 33,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [newFac, setNewFac] = useState({
    name: "",
    email: "",
    department: "",
    subjects: [],
    availableHours: "",
    allottedHours: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const validNames = subjects.map((s) => s.name);
    setList((prev) =>
      prev.map((f) => ({
        ...f,
        subjects: f.subjects.filter((sub) => validNames.includes(sub)),
      }))
    );
  }, [subjects]);

  const toggleSubject = (sub) =>
    setNewFac((prev) => ({
      ...prev,
      subjects: prev.subjects.includes(sub)
        ? prev.subjects.filter((s) => s !== sub)
        : [...prev.subjects, sub],
    }));

  const computeWorkload = (allotted, available) => {
    const pct = available > 0 ? (allotted / available) * 100 : 0;
    return Math.min(Math.max(Math.round(pct), 0), 100);
  };

  const validate = () => {
    const errs = {};
    if (!newFac.name.trim()) errs.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newFac.email))
      errs.email = "Invalid email";
    ["availableHours", "allottedHours"].forEach((field) => {
      const val = Number(newFac[field]);
      if (Number.isNaN(val)) errs[field] = "Must be a number";
      else if (val < 0) errs[field] = "Cannot be negative";
    });
    if (
      !errs.availableHours &&
      !errs.allottedHours &&
      Number(newFac.allottedHours) > Number(newFac.availableHours)
    ) {
      errs.allottedHours = "Cannot exceed available hours";
    }
    return errs;
  };

  const openModal = (faculty = null) => {
    setErrors({});
    if (faculty) {
      setEditId(faculty.id);
      setNewFac({
        name: faculty.name,
        email: faculty.email,
        department: faculty.department,
        subjects: [...faculty.subjects],
        availableHours: String(faculty.availableHours),
        allottedHours: String(faculty.allottedHours),
      });
    } else {
      setEditId(null);
      setNewFac({
        name: "",
        email: "",
        department: "",
        subjects: [],
        availableHours: "",
        allottedHours: "",
      });
    }
    setShowModal(true);
  };

  const saveFaculty = () => {
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    const avail = Number(newFac.availableHours);
    const allot = Number(newFac.allottedHours);
    const workload = computeWorkload(allot, avail);

    const updated = {
      id: editId || Date.now(),
      name: newFac.name.trim(),
      email: newFac.email.trim(),
      department: newFac.department.trim(),
      subjects: newFac.subjects,
      availableHours: avail,
      allottedHours: allot,
      workload,
    };

    setList((prev) =>
      editId
        ? prev.map((f) => (f.id === editId ? updated : f))
        : [...prev, updated]
    );
    setShowModal(false);
  };

  const delFaculty = (id) => setList((prev) => prev.filter((f) => f.id !== id));

  return (
    <div
      className="min-h-screen p-8 text-white"
      style={{
        background: `
          radial-gradient(circle at top left, rgba(104,29,148,0.35) 0%, transparent 40%),
          radial-gradient(circle at bottom right, rgba(0,212,255,0.35) 0%, transparent 40%),
          linear-gradient(135deg, #0a0a1a 0%, #000000 100%)
        `,
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-4xl font-black bg-gradient-to-r from-purple-700 via-pink-600 to-cyan-700 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(104,29,148,0.8)]">
          Faculty Management
        </h2>
        <button
          onClick={() => openModal()}
          className="px-6 py-3 rounded-full font-bold text-white bg-gradient-to-r from-purple-700 via-pink-600 to-cyan-700 shadow-[0_0_20px_rgba(104,29,148,0.8)] hover:shadow-[0_0_35px_rgba(204,65,122,1)] transition"
        >
          + Add Faculty
        </button>
      </div>

      {/* Faculty Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {list.map((f) => (
          <div
            key={f.id}
            className="relative bg-black/60 border border-purple-700 p-6 rounded-2xl shadow-[0_0_30px_rgba(104,29,148,0.5)] hover:shadow-[0_0_50px_rgba(204,65,122,0.8)] transition"
          >
            <div className="absolute top-3 right-3 flex gap-3">
              <button
                onClick={() => openModal(f)}
                className="text-green-400 hover:text-green-600"
              >
                ✎
              </button>
              <button
                onClick={() => delFaculty(f.id)}
                className="text-red-400 hover:text-red-600"
              >
                ✖
              </button>
            </div>

            <h3 className="text-xl font-bold">{f.name}</h3>
            <p className="text-sm text-gray-400">{f.email}</p>
            <p className="text-cyan-300 mb-3">{f.department}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {f.subjects.map((s, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-xs rounded-full bg-gradient-to-r from-cyan-700 to-blue-600 text-white shadow"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">{f.availableHours}h</span>
              <div className="relative flex-1 h-3 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-3 ${
                    f.workload < 60
                      ? "bg-green-500"
                      : f.workload < 90
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${f.workload}%` }}
                />
                <span className="absolute inset-0 flex items-center justify-center text-xs text-white">
                  {f.workload}%
                </span>
              </div>
              <span className="text-xs text-gray-400">{f.allottedHours}h</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-black/80 border border-purple-700 rounded-3xl p-8 w-full max-w-md shadow-[0_0_40px_rgba(104,29,148,0.8)]">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-cyan-700 bg-clip-text text-transparent">
              {editId ? "Edit Faculty" : "Add New Faculty"}
            </h3>

            {/* Name */}
            <input
              type="text"
              placeholder="Full Name"
              value={newFac.name}
              onChange={(e) => setNewFac({ ...newFac, name: e.target.value })}
              className="w-full mb-3 px-4 py-2 rounded-xl bg-black/40 border border-purple-700 text-white focus:ring-2 focus:ring-pink-600"
            />
            {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}

            {/* Email */}
            <input
              type="email"
              placeholder="Email Address"
              value={newFac.email}
              onChange={(e) => setNewFac({ ...newFac, email: e.target.value })}
              className="w-full mb-3 px-4 py-2 rounded-xl bg-black/40 border border-purple-700 text-white focus:ring-2 focus:ring-pink-600"
            />
            {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}

            {/* Department */}
            <input
              type="text"
              placeholder="Department"
              value={newFac.department}
              onChange={(e) => setNewFac({ ...newFac, department: e.target.value })}
              className="w-full mb-3 px-4 py-2 rounded-xl bg-black/40 border border-purple-700 text-white focus:ring-2 focus:ring-pink-600"
            />

            {/* Subjects */}
            <div>
              <p className="mb-2 font-semibold">Select Subjects</p>
              <div className="grid grid-cols-2 gap-2">
                {subjects.map((s) => (
                  <label
                    key={s.id}
                    className={`px-3 py-1 rounded-xl border text-sm cursor-pointer transition ${
                      newFac.subjects.includes(s.name)
                        ? "bg-gradient-to-r from-cyan-700 to-blue-600 text-white border-cyan-500"
                        : "bg-black/40 text-gray-300 border-purple-700"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={newFac.subjects.includes(s.name)}
                      onChange={() => toggleSubject(s.name)}
                      className="hidden"
                    />
                    {s.name}
                  </label>
                ))}
              </div>
            </div>

            {/* Hours */}
            <div className="grid grid-cols-2 gap-3 mt-3">
              <input
                type="number"
                placeholder="Available Hours"
                value={newFac.availableHours}
                onChange={(e) =>
                  setNewFac({ ...newFac, availableHours: e.target.value })
                }
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-purple-700 text-white focus:ring-2 focus:ring-pink-600"
              />
              <input
                type="number"
                placeholder="Allotted Hours"
                value={newFac.allottedHours}
                onChange={(e) =>
                  setNewFac({ ...newFac, allottedHours: e.target.value })
                }
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-purple-700 text-white focus:ring-2 focus:ring-pink-600"
              />
            </div>
            {errors.availableHours && (
              <p className="text-red-400 text-sm">{errors.availableHours}</p>
            )}
            {errors.allottedHours && (
              <p className="text-red-400 text-sm">{errors.allottedHours}</p>
            )}

            {/* Modal Actions */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 rounded-xl border border-gray-600 hover:bg-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={saveFaculty}
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

export default FacultyManagement;
