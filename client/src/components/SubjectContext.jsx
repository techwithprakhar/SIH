import { createContext } from "react";

export const SubjectContext = createContext({
  subjects: [],
  setSubjects: () => {}
});




// use this in case of adding and initialising the value

// import React, { useState } from "react";
// import { SubjectContext } from "./components/SubjectContext";
// import SubjectManagement from "./components/SubjectManagement";
// import FacultyManagement from "./components/FacultyManagement";

// const App = () => {
//   const [subjects, setSubjects] = useState([
//     { id: 1, name: "Data Structures and Algorithms" },
//     { id: 2, name: "Database Management Systems" },
//     { id: 3, name: "Computer Networks" }
//   ]);

//   return (
//     <SubjectContext.Provider value={{ subjects, setSubjects }}>
//       <div className="min-h-screen bg-gray-100 p-6 space-y-12">
//         <SubjectManagement />
//         <FacultyManagement />
//       </div>
//     </SubjectContext.Provider>
//   );
// };

// export default App;
