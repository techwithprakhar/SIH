import React, { useContext, useState } from "react";
import { SubjectContext } from "./SubjectContext";

const SubjectManagement = () => {
  const { subjects, setSubjects } = useContext(SubjectContext);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSub, setNewSub] = useState({
    name: "", code: "", credits: "", semester: "", department: "Computer Science", description: ""
  });

  const handleAdd = () => {
    if (!newSub.name || !newSub.code) return;
    const sub = { id: Date.now(), ...newSub, credits: parseInt(newSub.credits)||0 };
    setSubjects([...subjects, sub]);
    setNewSub({ name:"", code:"", credits:"", semester:"", department:"Computer Science", description:"" });
    setShowAddForm(false);
  };

  const handleDelete = (id) => {
    setSubjects(subjects.filter(s => s.id !== id));
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Subject Management</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >+ Add Subject</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map(sub => (
          <div key={sub.id} className="border p-4 rounded relative">
            <button
              onClick={() => handleDelete(sub.id)}
              className="absolute top-2 right-2 text-red-500"
            >✕</button>
            <h3 className="text-xl font-semibold">{sub.name}</h3>
            <p className="text-sm text-gray-600">{sub.code}</p>
            <p className="text-gray-700 mb-2">{sub.description}</p>
            <div className="text-sm text-gray-500">
              {sub.semester} • {sub.credits} Credits
            </div>
          </div>
        ))}
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Add New Subject</h3>
            <div className="space-y-3">
              <input
                type="text" placeholder="Name" value={newSub.name}
                onChange={e => setNewSub({...newSub, name: e.target.value})}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text" placeholder="Code" value={newSub.code}
                onChange={e => setNewSub({...newSub, code: e.target.value})}
                className="w-full border px-3 py-2 rounded"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number" placeholder="Credits" value={newSub.credits}
                  onChange={e => setNewSub({...newSub, credits: e.target.value})}
                  className="w-full border px-3 py-2 rounded"
                />
                <input
                  type="text" placeholder="Semester" value={newSub.semester}
                  onChange={e => setNewSub({...newSub, semester: e.target.value})}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <textarea
                placeholder="Description" value={newSub.description}
                onChange={e => setNewSub({...newSub, description: e.target.value})}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button onClick={() => setShowAddForm(false)} className="px-4 py-2 border rounded">Cancel</button>
              <button onClick={handleAdd} className="px-4 py-2 bg-green-600 text-white rounded">Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectManagement;
