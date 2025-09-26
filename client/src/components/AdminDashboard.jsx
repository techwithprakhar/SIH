import React from 'react';
import { Users, BookOpen, Calendar, Bell } from 'lucide-react';

const glowColors = {
  cyan: 'rgba(6,182,212,0.8)',
  orange: 'rgba(253,186,116,0.8)',
  red: 'rgba(248,113,113,0.8)',
  pink: 'rgba(204,65,122,0.8)',
  blue: 'rgba(59,130,246,0.8)',
};

const Dashboard = () => {
  const facultyData = [
    { name: 'Dr. Sarah Johnson', current: 15, max: 18 },
    { name: 'Prof. Michael Chen', current: 18, max: 20 },
    { name: 'Dr. Emma Wilson', current: 14, max: 16 },
  ];

  const classroomData = [
    { name: 'Room A101', percentage: 40, color: 'bg-cyan-400' },
    { name: 'Lab B201', percentage: 30, color: 'bg-orange-300' },
    { name: 'Room C301', percentage: 30, color: 'bg-red-400' },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6 font-sans">

      {/* Header Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Faculty', number: 3, gradient: 'from-purple-700 to-pink-600' },
            { label: 'Total Subjects', number: 8, gradient: 'from-pink-600 to-cyan-700' },
            { label: 'Total Classrooms', number: 3, gradient: 'from-cyan-700 to-blue-500' },
            { label: 'Total Batches', number: 3, gradient: 'from-yellow-400 to-orange-400' },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-black/80 border border-white/10 rounded-3xl p-6 text-center shadow-[0_0_50px_rgba(104,29,148,0.3)]
                        transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_80px_rgba(104,29,148,0.6)]"
            >
              <div
                className={`text-3xl md:text-4xl font-black text-transparent bg-gradient-to-r ${stat.gradient} bg-clip-text`}
              >
                {stat.number}
              </div>
              <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

        {/* Faculty Workload */}
        <div className="bg-black/80 border border-white/10 rounded-3xl p-6 shadow-[0_0_50px_rgba(104,29,148,0.3)]
          transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_80px_rgba(104,29,148,0.6)]">
          <h3 className="text-xl md:text-2xl font-black mb-6 text-transparent bg-gradient-to-r from-purple-700 via-pink-600 to-cyan-700 bg-clip-text">Faculty Workload Distribution</h3>
          <div className="space-y-6">
            {facultyData.map((faculty, index) => (
              <div key={index} className="space-y-2">
                <div className="text-sm md:text-base text-gray-400">{faculty.name}</div>
                <div className="flex items-center space-x-4">
                  <div className="flex-1 flex space-x-2">
                    <div className="flex-1">
                      <div className="bg-gray-900 rounded-xl h-8 relative overflow-hidden border border-white/10">
                        <div
                          className="bg-cyan-400 h-full rounded-xl"
                          style={{ width: `${(faculty.current / faculty.max) * 100}%` }}
                        ></div>
                        <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">{faculty.current}</div>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">Current Hours</div>
                    </div>
                    <div className="flex-1">
                      <div className="bg-orange-300 h-8 rounded-xl flex items-center justify-center text-xs font-medium text-gray-900">{faculty.max}</div>
                      <div className="text-xs text-gray-400 mt-1">Max Hours</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Classroom Utilization */}
        <div className="bg-black/80 border border-white/10 rounded-3xl p-6 shadow-[0_0_50px_rgba(6,182,212,0.3)]
          transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_80px_rgba(6,182,212,0.6)]">
          <h3 className="text-xl md:text-2xl font-black mb-6 text-transparent bg-gradient-to-r from-cyan-600 via-blue-500 to-purple-700 bg-clip-text">Classroom Utilization</h3>
          <div className="flex items-center justify-center">
            <div className="relative w-64 h-64">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="rgb(34 211 238)" strokeWidth="8" strokeDasharray="75 25" strokeDashoffset="25" className="transform -rotate-90 origin-center"/>
                <circle cx="50" cy="50" r="40" fill="none" stroke="rgb(253 186 116)" strokeWidth="8" strokeDasharray="56.25 43.75" strokeDashoffset="-50" className="transform -rotate-90 origin-center"/>
                <circle cx="50" cy="50" r="40" fill="none" stroke="rgb(248 113 113)" strokeWidth="8" strokeDasharray="37.5 62.5" strokeDashoffset="-106.25" className="transform -rotate-90 origin-center"/>
              </svg>
            </div>
          </div>
          <div className="mt-6 space-y-2">
            {classroomData.map((c, i) => (
              <div key={i} className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded ${c.color}`}></div>
                <span className="text-sm text-gray-400">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Management Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {title:'Faculty Management', desc:'Manage faculty members, their subjects, workload, and availability.', icon:<Users size={20}/>, number:3, color:'bg-blue-600'},
          {title:'Subject Management', desc:'Manage academic subjects, credits, and curriculum structure.', icon:<BookOpen size={20}/>, number:8, color:'bg-orange-600'},
          {title:'Timetable Generator', desc:'Generate optimized timetables using advanced algorithms.', icon:<Calendar size={20}/>, number:4, color:'bg-orange-500'},
          {title:'Notifications', desc:'Review class requests and notifications from faculty.', icon:<Bell size={20}/>, number:0, color:'bg-pink-600'},
        ].map((card, idx)=>(
          <div key={idx} className={`bg-black/80 border border-white/10 rounded-3xl p-6 shadow-[0_0_50px_rgba(104,29,148,0.3)]
            transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_80px_rgba(104,29,148,0.6)]`}>
            <div className="flex items-center space-x-3 mb-4">
              <div className={`${card.color} w-10 h-10 rounded-lg flex items-center justify-center`}>
                {card.icon}
              </div>
              <h3 className="text-lg md:text-xl font-semibold">{card.title}</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">{card.desc}</p>
            <div className="text-2xl md:text-3xl font-black text-transparent bg-gradient-to-r from-purple-700 via-pink-600 to-cyan-700 bg-clip-text">{card.number}</div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Dashboard;
