import React, { useState } from "react";
import { SubjectContext } from "./SubjectContext";
import SubjectManagement from "./SubjectManagement";
import FacultyManagement from "./FacultyManagement";

const App = () => {
  const [subjects, setSubjects] = useState([
    { id: 1, name: "Data Structures and Algorithms" },
    { id: 2, name: "Database Management Systems" },
    { id: 3, name: "Computer Networks" }
  ]);

  return (
    <SubjectContext.Provider value={{ subjects, setSubjects }}>
      <div className="min-h-screen bg-gray-100 p-6 space-y-12">
        <SubjectManagement />
        <FacultyManagement />
      </div>
    </SubjectContext.Provider>
  );
};

export default App;
